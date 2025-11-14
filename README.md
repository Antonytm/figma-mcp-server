# Figma Model Context protocol server

## Usage

### STDIO Transport (standard input output)

1. Configure MCP server in your client
```
"Figma": {
    "command": "npx",
    "args": ["@antonytm/figma-mcp-server@latest"]
}
```
2. Open Figma file in Figma MCP plugin
3. Plugin should show you message: *Connected to MCP server*
4. You are ready to use MCP server in your client

### Streamable HTTP Transport
Figma MCP server could be run using two types of transport: `stdio` and `streamable-http`. It is configured via environment variable `TRANSPORT`.

1. Start MCP server in terminal
a. Windows CMD: `set TRANSPORT=streamable-http&&npx @antonytm/figma-mcp-server@latest`
b. Windows PowerShell: `$env:TRANSPORT = "streamable-http"; npx @antonytm/figma-mcp-server@latest`
c. macOS Bash: `TRANSPORT=streamable-http npx @antonytm/figma-mcp-server@latest`
2. Open `http://localhost:38450/mcp` in browser. Expected result: `Invalid or missing session ID`
3. Open Figma file in Figma MCP plugin
4. Plugin should show you message: *Connected to MCP server*
5. Configure MCP server in your client
```
"Figma": {
    "url": "http://127.0.0.1:38450/mcp"
}
```
6. You should be able to use MCP server

## Development

### MCP server
1. `cd mcp`
2. `npm run dev`

### Plugin
1. `cd plugin`
2. `npm run dev`
3. Open Figma
4. Plugins > Development > Import plugin from manifest ...
5. Select `manifest.json` from `plugin\manifest.json`
6. Start plugin
7. You should see *Connected to MCP server* message

## Tools

TBD

## Alternatives

If your tasks could be done by [official Figma MCP server](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server), please use it.

Before starting this project, I made a search for my idea to implement Figma MCP server using Figma plugin and sockets as protocol for communication. And I found [this one](https://github.com/grab/cursor-talk-to-figma-mcp). Initially, I thought to fork it and change for my needs. But, there are few things that I don't like: requirement to run separate server for socket, everything located in one file, very hard to maintain, JavaScript(not TypeScript or Python). But, you always can consider that server as an alternative.