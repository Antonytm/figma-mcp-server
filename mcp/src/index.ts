#!/usr/bin/env node
import { envStartSchema, type EnvStartConfig } from './config.js';
import { startSTDIO } from './stdio.js';
import { startStreamableHTTP } from './streamable-http.js';
import 'dotenv/config.js';

const ENV: EnvStartConfig = envStartSchema.parse(process.env);

try {
    if(ENV.TRANSPORT === "streamable-http") {
        await startStreamableHTTP();
    }
    else {
        await startSTDIO();
    }
} catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
}