import { EventHandler } from '@create-figma-plugin/utilities'

export interface RunCodeHandler extends EventHandler {
  name: 'RUN_CODE'
  handler: (context: AppContext) => void
}

export interface SaveCodeHandler extends EventHandler {
  name: 'SAVE_CODE'
  handler: (context: AppContext) => void
}

export interface DownloadCodeHandler extends EventHandler {
  name: 'DOWNLOAD_CODE'
  handler: (context: AppContext) => void
}

export interface AutosaveCodeHandler extends EventHandler {
  name: 'AUTOSAVE_CODE'
  handler: (context: AppContext) => void
}

export interface LoadAutosaveCodeHandler extends EventHandler {
  name: 'LOAD_AUTOSAVE_CODE'
  handler: (context: AppContext) => void
}

export interface UpdateIdCodeHandler extends EventHandler {
  name: 'UPDATE_FRAME_ID'
  handler: (context: AppContext) => void
}

export interface SelectionChangeHandler extends EventHandler {
  name: 'SELECTION_CHANGE',
  handler: (appContext: AppContext) => void
}

export interface AngleChangeHandler extends EventHandler {
  name: 'ANGLE_CHANGE',
  handler: (appContext: AppContext) => void
}


export interface AppContext {
  code: string;
  title: string;
  id: string;
}

export interface PluginData {
  code: string;
  title: string;
  id: string;
}

export type FromPluginMessage = {
  taskId: string;
  isError: boolean;
  content: any;
}

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