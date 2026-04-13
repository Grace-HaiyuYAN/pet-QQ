import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutDashboard, PawPrint, ShieldCheck, ShieldOff } from "lucide-react";
import { HRDashboard } from "./components/Dashboard/HRDashboard";
import { EmployeeWorkspace } from "./components/Employee/EmployeeWorkspace";
import { Pet } from "./components/Pet/Pet";
import { PetChatPopover } from "./components/Pet/PetChatPopover";
import { useReminder } from "./hooks/useReminder";
import { taskItems, type PetMood } from "./data/mockData";

type ViewMode = "employee" | "management";
type AssistantState = {
  reply: string;
  subtasks: string[];
  knowledgeDocs: Array<{ title: string; reason: string }>;
  collaborators: Array<{ name: string; focus: string; reason: string }>;
};

export default function App({
  shellMode = "dashboard",
}: {
  shellMode?: "pet" | "dashboard";
}) {
  const [viewMode, setViewMode] = useState<ViewMode>("employee");
  const [chatOpen, setChatOpen] = useState(false);
  const [tasks, setTasks] = useState(taskItems);
  const [sharingEnabled, setSharingEnabled] = useState(true);
  const [assistantState, setAssistantState] = useState<AssistantState>({
    reply: "我已经准备好帮你拆任务、推知识库和找协作者了。",
    subtasks: [],
    knowledgeDocs: [],
    collaborators: [],
  });
  const [workMinutes, setWorkMinutes] = useState(83);
  const { reminder, dismiss } = useReminder();

  const totalPoints = tasks
    .filter((task) => task.completed)
    .reduce((sum, task) => sum + task.points, 0);

  const mood = useMemo<PetMood>(() => {
    if (reminder) return "greeting";
    if (chatOpen) return "thinking";
    return tasks.filter((task) => task.completed).length >= 2 ? "happy" : "greeting";
  }, [chatOpen, reminder, tasks]);

  useEffect(() => {
    document.body.classList.toggle("desktop-pet-body", shellMode === "pet");
    return () => document.body.classList.remove("desktop-pet-body");
  }, [shellMode]);

  useEffect(() => {
    if (shellMode !== "pet") return;
    void window.desktopBridge?.resizePetWindow(chatOpen);
  }, [chatOpen, shellMode]);

  useEffect(() => {
    void window.desktopBridge?.getAssistantState().then((state) => {
      if (state) setAssistantState(state);
    });

    const interval = window.setInterval(() => {
      setWorkMinutes((value) => value + 1);
      void window.desktopBridge?.getAssistantState().then((state) => {
        if (state) setAssistantState(state);
      });
    }, 60000);

    return () => window.clearInterval(interval);
  }, []);

  const handlePetClick = () => {
    setChatOpen(true);
  };

  const handleToggleTask = (id: number) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const handleAssistantSubmit = async (input: string): Promise<AssistantState | null> => {
    try {
      const response = await window.desktopBridge?.chatWithAssistant(input);
      if (!response) return null;

      setAssistantState(response);
      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  if (shellMode === "pet") {
    return (
      <main className="pet-window-shell">
        {chatOpen ? (
          <PetChatPopover
            open={chatOpen}
            onSubmit={handleAssistantSubmit}
            onClose={() => setChatOpen(false)}
          />
        ) : (
          <Pet
            mood={mood}
            message={null}
            onSingleClick={handlePetClick}
            onDoubleClick={() => {
              dismiss();
              setChatOpen(false);
              void window.desktopBridge?.openDashboard();
            }}
            onDismissBubble={() => {}}
          />
        )}
      </main>
    );
  }

  return (
    <main className="app-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />

      <div className="dashboard-strip">
        <div className="strip-tabs">
          <button
            type="button"
            className={viewMode === "employee" ? "strip-tab active" : "strip-tab"}
            onClick={() => setViewMode("employee")}
          >
            <PawPrint size={14} />
            员工工作台
          </button>
          <button
            type="button"
            className={viewMode === "management" ? "strip-tab active" : "strip-tab"}
            onClick={() => setViewMode("management")}
          >
            <LayoutDashboard size={14} />
            管理端
          </button>
        </div>
        <button
          type="button"
          className="strip-sharing"
          onClick={() => setSharingEnabled((value) => !value)}
          aria-pressed={sharingEnabled}
        >
          <span>数据共享</span>
          <span className={sharingEnabled ? "strip-badge on" : "strip-badge off"}>
            {sharingEnabled ? <ShieldCheck size={14} /> : <ShieldOff size={14} />}
            {sharingEnabled ? "已授权" : "已关闭"}
          </span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === "employee" ? (
          <motion.section
            key="employee"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="employee-view"
          >
            <EmployeeWorkspace
              tasks={tasks}
              totalPoints={totalPoints}
              workMinutes={workMinutes}
              assistantState={assistantState}
              onToggleTask={handleToggleTask}
            />
          </motion.section>
        ) : (
          <motion.div
            key="management"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <HRDashboard />
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
