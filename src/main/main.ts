import { app, BrowserWindow, ipcMain, dialog } from "electron";
import path from "path";
import fs from "fs/promises";

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      devTools: process.env.NODE_ENV === "development" ? true : false,
    },
  });

  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, "../../dist/renderer/index.html"));
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// IPC Handlers
ipcMain.handle("open-file", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [
      {
        name: "Text Files",
        extensions: ["txt", "text", "md", "json", "js", "ts", "html", "css"],
      },
      { name: "All Files", extensions: ["*"] },
    ],
  });

  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0];
  }
  return null;
});

ipcMain.handle("read-file", async (_, filePath) => {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return { success: true, content };
  } catch (error) {
    return { success: false, error: (error as any)?.message || "" };
  }
});

ipcMain.handle("save-file", async (_, { filePath, content }) => {
  try {
    await fs.writeFile(filePath, content);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
});

ipcMain.handle("save-as-file", async (_, content) => {
  try {
    const result = await dialog.showSaveDialog({
      title: "Save as",
      defaultPath: path.join(app.getPath("documents"), "new_file.txt"),
      filters: [
        {
          name: "Text Files",
          extensions: ["txt", "text", "md", "json", "js", "ts", "html", "css"],
        },
        { name: "All Files", extensions: ["*"] },
      ],
    });

    if (result.canceled) {
      return;
    }

    const filePath = result.filePath;
    await fs.writeFile(filePath, content);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
});
