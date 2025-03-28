import { readonly } from "vue";

export function useElectronApi() {
  const api = window.electronAPI;

  return readonly({
    openFile: api.openFile,
    saveFile: api.saveFile,
    readFile: api.readFile,
  });
}
