import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { getServer } from './server.js';
import { config, PORT } from './config.js';
import { Server } from 'socket.io';
import http from 'http';

export async function startSTDIO() {
    try {
        const httpServer = http.createServer();
        const socketServer = new Server(httpServer, {
            cors: {
                origin: "*",
                methods: ["GET", "POST", "OPTIONS"],
                allowedHeaders: ["*"],
                credentials: false
            },
            transports: ['polling', 'websocket'],
            allowUpgrades: true,
            cookie: false,
            serveClient: false,
            pingTimeout: 60000,
            pingInterval: 25000
        });
        
        const server = await getServer(socketServer);
        const transport = new StdioServerTransport();
        await server.connect(transport);
    } catch (error) {
        console.error('Error starting STDIO server:', error);
        throw error;
    }
}