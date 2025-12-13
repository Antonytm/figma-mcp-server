import { StartTaskHandler, TaskFinishedHandler, TaskFailedHandler } from './types';
import { ToolResult } from './tools/tool-result';
import { serializeNode } from './serialization/serialization';
import { getNodeInfo } from './tools/read/get-node-info';
import { getAllComponents } from './tools/read/get-all-components';
import { createRectangle } from './tools/create/create-rectangle';
import { safeToolProcessor } from './tools/safe-tool-processor';
import { GetNodeInfoParams, GetAllComponentsParams, CreateRectangleParams, MoveNodeParams, ResizeNodeParams, DeleteNodeParams, CloneNodeParams, CreateFrameParams, CreateTextParams, SetFillColorParams, SetStrokeColorParams, SetCornerRadiusParams, SetLayoutParams, CreateInstanceParams, AddComponentPropertyParams, EditComponentPropertyParams, DeleteComponentPropertyParams, SetInstancePropertiesParams, SetNodeComponentPropertyReferencesParams, CreateComponentParams, SetParentIdParams, GetPagesParams } from '@shared/types';
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
import { setLayout } from 'tools/update/set-layout';
import { createInstance } from 'tools/create/create-instance';
import { addComponentProperty } from 'tools/create/add-component-property';
import { editComponentProperty } from 'tools/update/edit-component-property';
import { deleteComponentProperty } from 'tools/delete/delete-component-property';
import { setInstanceProperties } from 'tools/update/set-instance-properties';
import { setNodeComponentPropertyReferences } from 'tools/update/set-node-component-property-references';
import { createComponent } from 'tools/create/create-component';
import { setParentId } from 'tools/update/set-parent-id';
import { getPages } from 'tools/read/get-pages';

function main() {

  on<StartTaskHandler>('START_TASK', async function (task: StartTaskHandler) {
    try {
      console.log('start-task', task)
      await figma.loadAllPagesAsync();

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

      if (task.command === 'get-all-components') {
        result = await safeToolProcessor<GetAllComponentsParams>(getAllComponents)(task.args as GetAllComponentsParams);
      }

      if (task.command === 'get-pages') {
        result = await safeToolProcessor<GetPagesParams>(getPages)(task.args as GetPagesParams);
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

      if (task.command === 'create-instance') {
        result = await safeToolProcessor<CreateInstanceParams>(createInstance)(task.args as CreateInstanceParams);
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
      if (task.command === 'set-layout') {
        result = await safeToolProcessor<SetLayoutParams>(setLayout)(task.args as SetLayoutParams);
      }

      if (task.command === 'add-component-property') {
        result = await safeToolProcessor<AddComponentPropertyParams>(addComponentProperty)(task.args as AddComponentPropertyParams);
      }

      if (task.command === 'edit-component-property') {
        result = await safeToolProcessor<EditComponentPropertyParams>(editComponentProperty)(task.args as EditComponentPropertyParams);
      }

      if (task.command === 'delete-component-property') {
        result = await safeToolProcessor<DeleteComponentPropertyParams>(deleteComponentProperty)(task.args as DeleteComponentPropertyParams);
      }

      if (task.command === 'set-instance-properties') {
        result = await safeToolProcessor<SetInstancePropertiesParams>(setInstanceProperties)(task.args as SetInstancePropertiesParams);
      }

      if (task.command === 'set-node-component-property-references') {
        result = await safeToolProcessor<SetNodeComponentPropertyReferencesParams>(setNodeComponentPropertyReferences)(task.args as SetNodeComponentPropertyReferencesParams);
      }

      if (task.command === 'create-component') {
        result = await safeToolProcessor<CreateComponentParams>(createComponent)(task.args as CreateComponentParams);
      }

      if (task.command === 'set-parent-id') {
        result = await safeToolProcessor<SetParentIdParams>(setParentId)(task.args as SetParentIdParams);
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