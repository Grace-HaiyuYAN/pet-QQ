interface DesktopBridge {
  openDashboard: () => Promise<void>;
  toggleDashboard: () => Promise<void>;
  isElectron: () => Promise<boolean>;
  resizePetWindow: (expanded: boolean) => Promise<void>;
  chatWithAssistant: (input: string) => Promise<{
    reply: string;
    subtasks: string[];
    knowledgeDocs: Array<{ title: string; reason: string }>;
    collaborators: Array<{ name: string; focus: string; reason: string }>;
  }>;
  getAssistantState: () => Promise<{
    reply: string;
    subtasks: string[];
    knowledgeDocs: Array<{ title: string; reason: string }>;
    collaborators: Array<{ name: string; focus: string; reason: string }>;
  }>;
}

declare global {
  interface Window {
    desktopBridge?: DesktopBridge;
  }
}

export {};
