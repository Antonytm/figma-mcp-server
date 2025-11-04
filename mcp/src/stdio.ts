import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { getServer } from './server.js';
import { config } from './config.js';
export async function startSTDIO() {
    const server = await getServer(config);
    const transport = new StdioServerTransport();
    await server.connect(transport);
}