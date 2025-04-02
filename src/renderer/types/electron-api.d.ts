export interface ElectronAPI {
  openFile: () => Promise<string | null>;
  saveFile: (
    filePath: string,
    content: string
  ) => Promise<{ success: boolean; error?: Error }>;
  readFile: (
    filePath: string
  ) => Promise<{ success: boolean; content?: string; error?: string }>;
  saveAsFile: (
    content: string
  ) => Promise<{ success: boolean; error?: string }>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
