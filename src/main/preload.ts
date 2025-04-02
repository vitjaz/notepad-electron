import { contextBridge, ipcRenderer } from "electron";
import { ElectronAPI } from "../renderer/types/electron-api";

const api = {
  openFile: () => ipcRenderer.invoke("open-file"),
  readFile: (filePath: string) => ipcRenderer.invoke("read-file", filePath),
  saveFile: (filePath: string, content: string) =>
    ipcRenderer.invoke("save-file", { filePath, content }),
  saveAsFile: (content) => ipcRenderer.invoke("save-as-file", content),
} satisfies ElectronAPI;

contextBridge.exposeInMainWorld("electronAPI", api);
