#!/usr/bin/env node
import { envStartSchema, type EnvStartConfig } from './config.js';
import { startSTDIO } from './stdio.js';
import { startStreamableHTTP } from './streamable-http.js';
import 'dotenv/config.js';

const ENV: EnvStartConfig = envStartSchema.parse(process.env);

if(ENV.TRANSPORT === "streamable-http") {
    startStreamableHTTP();
}
else {
    startSTDIO();
}