import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  PawPrint,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { HRDashboard } from "./components/Dashboard/HRDashboard";
import { EmployeeWorkspace } from "./components/Employee/EmployeeWorkspace";
import { Pet } from "./components/Pet/Pet";
import { PetChatPopover } from "./components/Pet/PetChatPopover";
import { PrivacySettings } from "./components/Settings/PrivacySettings";
import { Button } from "./components/shared/Button";
import { Card } from "./components/shared/Card";
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
  const completedCount = tasks.filter((task) => task.completed).length;

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

  const handleAssistantSubmit = async (input: string) => {
    try {
      const response = await window.desktopBridge?.chatWithAssistant(input);
      if (!response) return;

      setAssistantState(response);
    } catch (error) {
      console.error(error);
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

      <section className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">AI 办公宠物助手 Demo</span>
          <h1>
            让管理藏在宠物陪伴里，让
            <span className="gradient-text headline-accent">关怀</span>
            真正被感知。
          </h1>
          <p>
            单击桌面悬浮宠物进入轻对话，双击进入员工大面板；在 APP
            内还可以切到管理端，看团队状态与员工画像。
          </p>
          <div className="hero-actions">
            <Button onClick={() => setViewMode("employee")}>
              <PawPrint size={16} />
              员工看板
            </Button>
            <Button variant="secondary" onClick={() => setViewMode("management")}>
              <LayoutDashboard size={16} />
              管理端
            </Button>
          </div>
        </div>

        <Card className="hero-summary" tone="highlight">
          <div className="summary-top">
            <span className="eyebrow">MVP 体验</span>
            <Sparkles size={16} />
          </div>
          <div className="hero-visual" aria-hidden="true">
            <motion.div
              className="hero-ring"
              animate={{ rotate: 360 }}
              transition={{
                duration: 60,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
            <div className="hero-orbit-dot hero-orbit-dot-a" />
            <div className="hero-orbit-dot hero-orbit-dot-b" />
            <motion.div
              className="hero-float-card hero-float-primary"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <span className="eyebrow">Effort</span>
              <strong>{completedCount}/4</strong>
              <p>今日任务已推进</p>
            </motion.div>
            <motion.div
              className="hero-float-card hero-float-secondary"
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 4.4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <TrendingUp size={16} />
              <strong>82%</strong>
              <p>团队完成率</p>
            </motion.div>
            <div className="hero-dot-grid">
              {Array.from({ length: 9 }).map((_, index) => (
                <span key={index} />
              ))}
            </div>
            <div className="hero-accent-block" />
          </div>
          <div className="summary-metrics">
            <div>
              <strong>{sharingEnabled ? "已授权" : "未授权"}</strong>
              <span>数据共享状态</span>
            </div>
            <div>
              <strong>{assistantState.knowledgeDocs.length || 2}</strong>
              <span>已推送建议资源</span>
            </div>
          </div>
          <p>
            员工看板聚焦执行与状态，管理端聚焦团队洞察，但底部任务区保持一致。
          </p>
        </Card>
      </section>

      <div className="top-tab-row">
        <button
          type="button"
          className={viewMode === "employee" ? "top-tab active" : "top-tab"}
          onClick={() => setViewMode("employee")}
        >
          员工工作台
        </button>
        <button
          type="button"
          className={viewMode === "management" ? "top-tab active" : "top-tab"}
          onClick={() => setViewMode("management")}
        >
          管理端
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
            <div className="employee-grid">
              <Card className="employee-overview">
                <span className="eyebrow">员工入口</span>
                <h2>你的悬浮宠物已经连上 AI 助手</h2>
                <p>{assistantState.reply || "现在可以从悬浮球发起任务拆解与建议请求。"}</p>
                <div className="overview-row"><div><span>{reminder ?? "双击悬浮宠物可进入大面板。"}</span></div></div>
              </Card>
              <PrivacySettings
                sharingEnabled={sharingEnabled}
                onToggle={() => setSharingEnabled((value) => !value)}
              />
            </div>
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
            <div className="management-task-section">
              <EmployeeWorkspace
                tasks={tasks}
                totalPoints={totalPoints}
                workMinutes={workMinutes}
                assistantState={assistantState}
                onToggleTask={handleToggleTask}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
