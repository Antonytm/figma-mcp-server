import { emit, loadFontsAsync, on, once, showUI } from '@create-figma-plugin/utilities'

import { InsertCodeHandler, StartTaskHandler, TaskFailedHandler, TaskFinishedHandler } from './types'
import { io } from 'socket.io-client'
import { serializeNode } from './serializers/serialization'
import { safeToolProcessor } from './tools/safe-tool-processor'
import { CreateRectangleParams, GetNodeInfoParams } from '@shared/types'
import { getNodeInfo } from './tools/read/get-node-info'
import { ToolResult } from './tools/tool-result'
import { createRectangle } from './tools/create/create-rectangle'



export default async function () {
  once<InsertCodeHandler>('INSERT_CODE', async function (code: string) {
    const text = figma.createText()
    await loadFontsAsync([text])
    text.characters = code
    figma.currentPage.selection = [text]
    figma.viewport.scrollAndZoomIntoView([text])
    figma.closePlugin()
  })

  on<StartTaskHandler>('START_TASK', async function (task: StartTaskHandler) {
    console.log('start-task', task)

    let result: ToolResult = {
      isError: true,
      content: "Tool not found"
    };
    if (task.command === 'get-selection') {
      const selection = figma.currentPage.selection;
      console.log('selection', selection)

      // Serialize all selected nodes
      const serializedSelection = await Promise.all(selection.map(node => serializeNode(node)));

      emit<TaskFinishedHandler>('TASK_FINISHED', {
        name: 'TASK_FINISHED',
        taskId: task.taskId,
        content: JSON.stringify(serializedSelection),
        isError: false
      })
    }

    if (task.command === 'get-node-info') {
      result = await safeToolProcessor<GetNodeInfoParams>(getNodeInfo)(task.args as GetNodeInfoParams);
    }

    if (task.command === 'create-rectangle') {
      result = await safeToolProcessor<CreateRectangleParams>(createRectangle)(task.args as CreateRectangleParams);
    }

    if (result) {
      if (result.isError) {
        emit<TaskFailedHandler>('TASK_FAILED', {
          name: 'TASK_FAILED',
          taskId: task.taskId,
          content: result.content,
          isError: result.isError
        })
      }
      else {
        emit<TaskFinishedHandler>('TASK_FINISHED', {
          name: 'TASK_FINISHED',
          taskId: task.taskId,
          content: result.content,
          isError: result.isError
        })
      }
    }
  })


  //const data = await response.json()
  //console.log('response from MCP server:', data)
  showUI({ height: 232, width: 320 })
}

