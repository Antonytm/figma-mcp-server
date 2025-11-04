import { loadFontsAsync, once, showUI } from '@create-figma-plugin/utilities'

import { InsertCodeHandler } from './types'
import express from 'express'
import http from 'http'
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js'
import { isInitializeRequest } from '@modelcontextprotocol/sdk/types'
import { io } from 'socket.io-client'


export default async function () {
  once<InsertCodeHandler>('INSERT_CODE', async function (code: string) {
    const text = figma.createText()
    await loadFontsAsync([text])
    text.characters = code
    figma.currentPage.selection = [text]
    figma.viewport.scrollAndZoomIntoView([text])
    figma.closePlugin()
  })

  const socket1 = io("ws://example.com/my-namespace", {
    reconnectionDelayMax: 10000,
    auth: {
      token: "123"
    },
    query: {
      "my-key": "my-value"
    }
  });

  const socket = io('ws://example.com')
  socket.on('connect', () => {
    console.log('connected to MCP server')
  })
  socket.on('disconnect', () => {
    console.log('disconnected from MCP server')
  })
  socket.on('message', (message: string) => {
    console.log('message from MCP server:', message)
  })
  console.log('connecting to MCP server')
  socket.connect();
  console.log('connected to MCP server')
  socket.emit('initialize', {
    version: '1.0.0',
    name: 'Figma MCP Server',
    description: 'A MCP server for Figma',
  })
  console.log('initialized MCP server');
  //call localhost:3001/mcp
  const response = await fetch('http://localhost:3001/mcp')
  //const data = await response.json()
  //console.log('response from MCP server:', data)
  showUI({ height: 232, width: 320 })
}

