import express from "express";
import { generateUUID } from "./utils.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js"
import { getServer } from "./server.js";
import { config, PORT } from "./config.js";
import { Server } from "socket.io";
import http from "http";

export async function startStreamableHTTP() { 
    const app = express();
    app.use(express.json());

    // Add CORS middleware for Express routes
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, mcp-session-id');
        if (req.method === 'OPTIONS') {
            res.sendStatus(200);
        } else {
            next();
        }
    });

    // Create HTTP server
    const httpServer = http.createServer(app);
    
    // Create Socket.IO server attached to HTTP server
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST", "OPTIONS"],
            allowedHeaders: ["*"],
            credentials: false
        },
        // Allow both transports - Socket.IO needs polling for initial handshake
        transports: ['polling', 'websocket'],
        allowUpgrades: true, // Allow upgrade from polling to websocket
        // Disable secure connections
        cookie: false,
        serveClient: false,
        // Connection timeout
        pingTimeout: 60000,
        pingInterval: 25000
    });
    
    io.on('connection', (socket) => {
        try {
            console.log('a user connected:', socket.id);
            socket.on('disconnect', (reason) => {
                try {
                    console.log('a user disconnected:', socket.id, reason);
                } catch (error) {
                    console.error('Error in disconnect handler:', error);
                }
            });
            socket.on('error', (error) => {
                console.error('Socket error:', error);
            });
        } catch (error) {
            console.error('Error in connection handler:', error);
        }
    });
    
    io.engine.on('connection_error', (err) => {
        console.error('Socket.IO connection error:', err);
        console.error('Error details:', err.req?.headers, err.context);
    });

    // Map to store transports by session ID
    const transports: { [sessionId: string]: StreamableHTTPServerTransport } = {};

    const server = await getServer(io);

    app.post('/mcp', async (req: express.Request, res: express.Response) => {
        try {
            // Inspector adds "Bearer" to the authorization header, so we need to strip it 

            // Check for existing session ID
            const sessionId = req.headers['mcp-session-id'] as string | undefined;
            let transport: StreamableHTTPServerTransport;

            if (sessionId && transports[sessionId]) {
                // Reuse existing transport
                transport = transports[sessionId];
            } else if (!sessionId && isInitializeRequest(req.body)) {
                // New initialization request
                transport = new StreamableHTTPServerTransport({
                    sessionIdGenerator: () => generateUUID(),
                    onsessioninitialized: (sessionId) => {
                        // Store the transport by session ID
                        transports[sessionId] = transport;
                    }
                });

                // Clean up transport when closed
                transport.onclose = () => {
                    if (transport.sessionId) {
                        delete transports[transport.sessionId];
                    }
                };

                await server.connect(transport);
            } else {
                // Invalid request
                res.status(400).json({
                    jsonrpc: '2.0',
                    error: {
                        code: -32000,
                        message: 'Bad Request: No valid session ID provided',
                    },
                    id: null,
                });
                return;
            }

            // Handle the request
            await transport.handleRequest(req, res, req.body);
        } catch (error) {
            console.error('Error handling MCP POST request:', error);
            if (!res.headersSent) {
                res.status(500).json({
                    jsonrpc: '2.0',
                    error: {
                        code: -32603,
                        message: 'Internal server error',
                    },
                    id: null,
                });
            }
        }
    });

    // Reusable handler for GET and DELETE requests
    const handleSessionRequest = async (req: express.Request, res: express.Response) => {
        try {
            const sessionId = req.headers['mcp-session-id'] as string | undefined;
            if (!sessionId || !transports[sessionId]) {
                res.status(400).send('Invalid or missing session ID');
                return;
            }

            const transport = transports[sessionId];
            await transport.handleRequest(req, res);
        } catch (error) {
            console.error('Error handling session request:', error);
            if (!res.headersSent) {
                res.status(500).send('Internal server error');
            }
        }
    };

    // Handle GET requests for server-to-client notifications via SSE
    app.get('/mcp', handleSessionRequest);

    // Handle DELETE requests for session termination
    app.delete('/mcp', handleSessionRequest);

    // Start the HTTP server (Socket.IO will use this)
    httpServer.listen(PORT, () => {
        console.log(`Server listening on http://localhost:${PORT}`);
    });

    //async each 1 second, send a message to all connected clients
    setInterval(() => {
        const clients = Array.from(io.sockets.sockets.keys());
        console.log('Connected clients:', clients);
    }, 10000);
}