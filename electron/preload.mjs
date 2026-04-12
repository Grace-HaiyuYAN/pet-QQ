import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("desktopBridge", {
  openDashboard: () => ipcRenderer.invoke("desktop:open-dashboard"),
  toggleDashboard: () => ipcRenderer.invoke("desktop:toggle-dashboard"),
  isElectron: () => ipcRenderer.invoke("desktop:is-electron"),
  resizePetWindow: (expanded) =>
    ipcRenderer.invoke("desktop:resize-pet-window", expanded),
  chatWithAssistant: (input) => ipcRenderer.invoke("assistant:chat", input),
  getAssistantState: () => ipcRenderer.invoke("assistant:get-state"),
});
