import { StartTaskHandler, TaskFinishedHandler, TaskFailedHandler } from './types';
import { ToolResult } from './tools/tool-result';
import { serializeNode } from './serialization/serialization';
import { getNodeInfo } from './tools/read/get-node-info';
import { createRectangle } from './tools/create/create-rectangle';
import { safeToolProcessor } from './tools/safe-tool-processor';
import { GetNodeInfoParams, CreateRectangleParams, MoveNodeParams, ResizeNodeParams, DeleteNodeParams, CloneNodeParams, CreateFrameParams, CreateTextParams, SetFillColorParams, SetStrokeColorParams, SetCornerRadiusParams } from '@shared/types';
import { emit, on } from '@create-figma-plugin/utilities';
import { getSelection } from 'tools/read/get-selection';
import { moveNode } from 'tools/update/move-node';
import { resizeNode } from 'tools/update/resize-node';
import { deleteNode } from 'tools/delete/delete-node';
import { cloneNode } from 'tools/create/clone-node';
import { createFrame } from 'tools/create/create-frame';
import { createText } from 'tools/create/create-text';
import { setFillColor } from 'tools/update/set-fill-color';
import { setStrokeColor } from 'tools/update/set-stroke-color';
import { setCornerRadius } from 'tools/update/set-corner-radius';

function main() {

  on<StartTaskHandler>('START_TASK', async function (task: StartTaskHandler) {
    try {
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

      if (task.command === 'delete-node') {
        result = await safeToolProcessor<DeleteNodeParams>(deleteNode)(task.args as DeleteNodeParams);
      }

      if (task.command === 'clone-node') {
        result = await safeToolProcessor<CloneNodeParams>(cloneNode)(task.args as CloneNodeParams);
      }

      if (task.command === 'create-frame') {
        result = await safeToolProcessor<CreateFrameParams>(createFrame)(task.args as CreateFrameParams);
      }

      if (task.command === 'create-text') {
        result = await safeToolProcessor<CreateTextParams>(createText)(task.args as CreateTextParams);
      }

      if (task.command === 'set-fill-color') {
        result = await safeToolProcessor<SetFillColorParams>(setFillColor)(task.args as SetFillColorParams);
      }

      if (task.command === 'set-stroke-color') {
        result = await safeToolProcessor<SetStrokeColorParams>(setStrokeColor)(task.args as SetStrokeColorParams);
      }

      if (task.command === 'set-corner-radius') {
        result = await safeToolProcessor<SetCornerRadiusParams>(setCornerRadius)(task.args as SetCornerRadiusParams);
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
    }
    catch (error) {
      console.error(error);
      emit<TaskFailedHandler>('TASK_FAILED', {
        name: 'TASK_FAILED',
        taskId: task.taskId,
        content: error instanceof Error ? error.message : JSON.stringify(error),
        isError: true
      })
    }
  })


  const additionalData = `<div id='data' />`;
  const html = `${additionalData}${__html__}`;
  figma.showUI(`${html}`, { width: 500, height: 405 });
}

main();