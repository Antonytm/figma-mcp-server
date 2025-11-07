import { EventHandler } from '@create-figma-plugin/utilities'
import { FromPluginMessage } from '@shared/types'


export interface StartTaskHandler extends EventHandler {
  name: 'START_TASK'
  taskId: string
  command: string
  args: any
}

export interface TaskFinishedHandler extends EventHandler, FromPluginMessage {
  name: 'TASK_FINISHED'
}

export interface TaskFailedHandler extends EventHandler, FromPluginMessage {
  name: 'TASK_FAILED'
}

export type SceneNodeType =   | 'RECTANGLE'
  | 'RECTANGLE'
  | 'CIRCLE'
  | 'ELLIPSE'
  | 'VECTOR'
  | 'TEXT'
  | 'FRAME'
  | 'GROUP'
  | 'STAMP'
  | 'CONNECTOR'
  | 'STAR';