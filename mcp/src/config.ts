import path from "path";
import { z } from "zod";

export const envStartSchema = z.object({
    //* The transport to use for the server. Can be one of 'stdio' or 'streamable-http'.
    //* If not specified, the default is 'stdio'.
    //* The 'stdio' transport is used for local work.
    //* The 'streamable-http' transport is used for HTTP-based communication.
    TRANSPORT: z.string().default("stdio").optional().transform((val) => {
        if (val?.toLowerCase() === "streamable-http") return "streamable-http";
        return "stdio";
    })
});

export const filePaths = {
    indexPath: path.join(process.cwd(), 'mcp-all', 'mcp-search-index.json'),
    mcpConfigPath: path.join(process.cwd(), 'mcp-all', 'mcp-config.json'),
}

export type EnvStartConfig = z.infer<typeof envStartSchema>;

export const config = { ...envStartSchema.parse(process.env), ...filePaths };

export type Config = z.infer<typeof envStartSchema> & typeof filePaths;