import { StartTaskHandler, TaskFinishedHandler, TaskFailedHandler } from './types';
import { ToolResult } from './tools/tool-result';
import { serializeNode } from './serialization/serialization';
import { getNodeInfo } from './tools/read/get-node-info';
import { createRectangle } from './tools/create/create-rectangle';
import { safeToolProcessor } from './tools/safe-tool-processor';
import { GetNodeInfoParams, CreateRectangleParams } from '@shared/types';
import { emit, on } from '@create-figma-plugin/utilities';

function main() {

  on<StartTaskHandler>('START_TASK', async function (task: StartTaskHandler) {
    console.log('start-task', task)

    let result: ToolResult = {
      isError: true,
      content: "Tool not found"
    };

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


  const additionalData = `<div id='data' />`;
  const html = `${additionalData}${__html__}`;
  figma.showUI(`${html}`, { width: 500, height: 405 });
}

main();