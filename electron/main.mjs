import { app, BrowserWindow, ipcMain, screen } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = !app.isPackaged;
const rendererUrl = isDev
  ? process.env.VITE_DEV_SERVER_URL || "http://127.0.0.1:5173"
  : `file://${path.join(__dirname, "../dist/index.html")}`;

let petWindow;
let dashboardWindow;
let petAnimationTimer = null;

const PET_COLLAPSED_SIZE = { width: 360, height: 220 };
const PET_EXPANDED_SIZE = { width: 360, height: 560 };

const assistantState = {
  reply: "我已经准备好帮你拆任务、推知识库和找协作者了。",
  subtasks: [
    "明确今天最重要的交付目标",
    "把任务拆成 3 到 5 个最小执行动作",
    "先完成一个能展示结果的版本",
  ],
  knowledgeDocs: [
    { title: "《隐形管理与员工授权边界》", reason: "适合补演示中的隐私说明。" },
    { title: "《AI 办公助手任务拆解模板》", reason: "可直接参考拆解结构。" },
  ],
  collaborators: [
    { name: "Mia", focus: "员工画像分析", reason: "适合帮你收口管理端故事线。" },
    { name: "Rex", focus: "统计看板", reason: "可补充团队指标解释。" },
  ],
};

const apiConfig = {
  baseUrl: "https://zenmux.ai/api/v1",
  apiKey:
    "sk-ai-v1-bd76f7f26e71cfae596139c3d4f98079272b8c242010e067adc5a6f2732e4db9",
  model: "moonshotai/kimi-k2.5",
};

function buildUrl(mode) {
  if (isDev) {
    return `${rendererUrl}/?mode=${mode}`;
  }

  return `${rendererUrl}?mode=${mode}`;
}

function createPetWindow() {
  const { workArea } = screen.getPrimaryDisplay();

  petWindow = new BrowserWindow({
    width: PET_COLLAPSED_SIZE.width,
    height: PET_COLLAPSED_SIZE.height,
    x: workArea.x + workArea.width - 390,
    y: workArea.y + workArea.height - 260,
    frame: false,
    transparent: true,
    resizable: false,
    movable: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    hasShadow: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  petWindow.loadURL(buildUrl("pet"));
}

function createDashboardWindow() {
  dashboardWindow = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 1100,
    minHeight: 760,
    show: false,
    title: "AI 办公宠物助手",
    backgroundColor: "#FAFAFA",
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  dashboardWindow.loadURL(buildUrl("dashboard"));

  dashboardWindow.on("close", (event) => {
    if (!app.isQuiting) {
      event.preventDefault();
      dashboardWindow.hide();
    }
  });
}

function showDashboard() {
  if (!dashboardWindow) return;
  if (dashboardWindow.isMinimized()) {
    dashboardWindow.restore();
  }
  dashboardWindow.show();
  dashboardWindow.moveTop();
  dashboardWindow.setAlwaysOnTop(true);
  dashboardWindow.focus();
  setTimeout(() => {
    dashboardWindow?.setAlwaysOnTop(false);
  }, 200);
}

function resizePetWindow(expanded) {
  if (!petWindow) return;

  const { workArea } = screen.getPrimaryDisplay();
  const nextSize = expanded ? PET_EXPANDED_SIZE : PET_COLLAPSED_SIZE;
  const from = petWindow.getBounds();
  const to = {
    x: workArea.x + workArea.width - nextSize.width - 20,
    y: workArea.y + workArea.height - nextSize.height - 20,
    width: nextSize.width,
    height: nextSize.height,
  };

  if (petAnimationTimer) {
    clearInterval(petAnimationTimer);
    petAnimationTimer = null;
  }

  const steps = 10;
  let currentStep = 0;

  petAnimationTimer = setInterval(() => {
    currentStep += 1;
    const progress = currentStep / steps;
    const eased = 1 - (1 - progress) * (1 - progress);

    petWindow?.setBounds({
      x: Math.round(from.x + (to.x - from.x) * eased),
      y: Math.round(from.y + (to.y - from.y) * eased),
      width: Math.round(from.width + (to.width - from.width) * eased),
      height: Math.round(from.height + (to.height - from.height) * eased),
    });

    if (currentStep >= steps) {
      clearInterval(petAnimationTimer);
      petAnimationTimer = null;
      petWindow?.setBounds(to);
    }
  }, 16);
}

function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;

    try {
      return JSON.parse(jsonMatch[0]);
    } catch {
      return null;
    }
  }
}

app.whenReady().then(() => {
  createPetWindow();
  createDashboardWindow();

  ipcMain.handle("desktop:open-dashboard", () => {
    showDashboard();
  });

  ipcMain.handle("desktop:toggle-dashboard", () => {
    if (!dashboardWindow) return;

    if (dashboardWindow.isVisible()) {
      dashboardWindow.hide();
      return;
    }

    showDashboard();
  });

  ipcMain.handle("desktop:is-electron", () => true);
  ipcMain.handle("desktop:resize-pet-window", (_, expanded) => {
    resizePetWindow(Boolean(expanded));
  });
  ipcMain.handle("assistant:get-state", () => assistantState);
  ipcMain.handle("assistant:chat", async (_, userInput) => {
    const response = await fetch(`${apiConfig.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiConfig.apiKey}`,
      },
      body: JSON.stringify({
        model: apiConfig.model,
        temperature: 0.4,
        messages: [
          {
            role: "system",
            content:
              "你是一个桌面办公宠物助手。请基于用户输入输出 JSON，不要输出 markdown。JSON 格式必须为 {\"reply\":string,\"subtasks\":string[],\"knowledgeDocs\":[{\"title\":string,\"reason\":string}],\"collaborators\":[{\"name\":string,\"focus\":string,\"reason\":string}] }。subtasks 返回 3 到 5 条，knowledgeDocs 返回 2 到 4 条，collaborators 返回 2 到 3 条。内容使用简体中文，语气温和、明确、可执行。",
          },
          {
            role: "user",
            content: userInput,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Assistant API failed: ${response.status} ${errorText}`);
    }

    const payload = await response.json();
    const content = payload.choices?.[0]?.message?.content ?? "";
    const parsed = safeJsonParse(content);

    if (!parsed) {
      throw new Error("Assistant API returned non-JSON content");
    }

    assistantState.reply = parsed.reply || assistantState.reply;
    assistantState.subtasks = Array.isArray(parsed.subtasks)
      ? parsed.subtasks.slice(0, 5)
      : assistantState.subtasks;
    assistantState.knowledgeDocs = Array.isArray(parsed.knowledgeDocs)
      ? parsed.knowledgeDocs.slice(0, 4)
      : assistantState.knowledgeDocs;
    assistantState.collaborators = Array.isArray(parsed.collaborators)
      ? parsed.collaborators.slice(0, 3)
      : assistantState.collaborators;

    return assistantState;
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createPetWindow();
      createDashboardWindow();
    } else {
      showDashboard();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("before-quit", () => {
  app.isQuiting = true;
});
