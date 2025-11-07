import { StartTaskHandler, TaskFinishedHandler, TaskFailedHandler } from './types';
import { ToolResult } from './tools/tool-result';
import { serializeNode } from './serialization/serialization';
import { getNodeInfo } from './tools/read/get-node-info';
import { createRectangle } from './tools/create/create-rectangle';
import { safeToolProcessor } from './tools/safe-tool-processor';
import { GetNodeInfoParams, CreateRectangleParams, MoveNodeParams, ResizeNodeParams } from '@shared/types';
import { emit, on } from '@create-figma-plugin/utilities';
import { getSelection } from 'tools/read/get-selection';
import { moveNode } from 'tools/update/move-node';
import { resizeNode } from 'tools/update/resize-node';

function main() {

  on<StartTaskHandler>('START_TASK', async function (task: StartTaskHandler) {
    console.log('start-task', task)

    let result: ToolResult = {
      isError: true,
      content: "Tool not found"
    };

    if (task.command === 'get-selection') {
      result = await safeToolProcessor<void>(getSelection)();
    }

    if (task.command === 'get-node-info') {
      result = await safeToolProcessor<GetNodeInfoParams>(getNodeInfo)(task.args as GetNodeInfoParams);
    }

    if (task.command === 'create-rectangle') {
      result = await safeToolProcessor<CreateRectangleParams>(createRectangle)(task.args as CreateRectangleParams);
    }

    if (task.command === 'move-node') {
      result = await safeToolProcessor<MoveNodeParams>(moveNode)(task.args as MoveNodeParams);
    }

    if (task.command === 'resize-node') {
      result = await safeToolProcessor<ResizeNodeParams>(resizeNode)(task.args as ResizeNodeParams);
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


  const additionalData = `<div id='data' />`;
  const html = `${additionalData}${__html__}`;
  figma.showUI(`${html}`, { width: 500, height: 405 });
}

main();