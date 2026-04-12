import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BellRing, LayoutDashboard, PawPrint, Sparkles } from "lucide-react";
import { HRDashboard } from "./components/Dashboard/HRDashboard";
import { TaskPanelShell } from "./components/Panel/TaskPanelShell";
import { Pet } from "./components/Pet/Pet";
import { PrivacySettings } from "./components/Settings/PrivacySettings";
import { Button } from "./components/shared/Button";
import { Card } from "./components/shared/Card";
import { useReminder } from "./hooks/useReminder";
import { petGreetings, taskItems, type PetMood } from "./data/mockData";

type ViewMode = "employee" | "hr";

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>("employee");
  const [panelOpen, setPanelOpen] = useState(true);
  const [bubbleMessage, setBubbleMessage] = useState<string | null>(petGreetings[0]);
  const [tasks, setTasks] = useState(taskItems);
  const [expandedTaskId, setExpandedTaskId] = useState<number | null>(taskItems[0].id);
  const [sharingEnabled, setSharingEnabled] = useState(true);
  const { reminder, dismiss } = useReminder();

  const completedCount = tasks.filter((task) => task.completed).length;
  const totalPoints = tasks
    .filter((task) => task.completed)
    .reduce((sum, task) => sum + task.points, 0);

  const mood = useMemo<PetMood>(() => {
    if (reminder) return "greeting";
    if (panelOpen) return "thinking";
    return completedCount >= 2 ? "happy" : "greeting";
  }, [completedCount, panelOpen, reminder]);

  const handlePetClick = () => {
    const message =
      petGreetings[Math.floor(Math.random() * petGreetings.length)];
    setBubbleMessage(message);
  };

  const handleToggleTask = (id: number) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  return (
    <main className="app-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />

      <section className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">AI 办公宠物助手 Demo</span>
          <h1>让管理藏在宠物陪伴里，让关怀真正被感知。</h1>
          <p>
            员工看到的是一个会提醒、会拆解任务、会推荐协作资源的桌面伙伴；
            管理者看到的是带有人文温度的洞察看板。
          </p>
          <div className="hero-actions">
            <Button onClick={() => setViewMode("employee")}>
              <PawPrint size={16} />
              员工端
            </Button>
            <Button variant="secondary" onClick={() => setViewMode("hr")}>
              <LayoutDashboard size={16} />
              HR 看板
            </Button>
          </div>
        </div>

        <Card className="hero-summary" tone="highlight">
          <div className="summary-top">
            <span className="eyebrow">MVP 体验</span>
            <Sparkles size={16} />
          </div>
          <div className="summary-metrics">
            <div>
              <strong>{completedCount}/4</strong>
              <span>今日任务进度</span>
            </div>
            <div>
              <strong>{sharingEnabled ? "已授权" : "未授权"}</strong>
              <span>数据共享状态</span>
            </div>
            <div>
              <strong>82%</strong>
              <span>团队任务完成率</span>
            </div>
          </div>
          <p>
            双击右下角宠物可展开员工面板，顶部 Tab 可切换到管理视图。
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
          className={viewMode === "hr" ? "top-tab active" : "top-tab"}
          onClick={() => setViewMode("hr")}
        >
          HR / 管理看板
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
                <span className="eyebrow">今天的节奏</span>
                <h2>优先收口 Demo 演示链路</h2>
                <p>
                  宠物会在不打断工作的前提下提醒喝水、整理任务优先级，并给出文档和协作者建议。
                </p>
                <div className="overview-row">
                  <div>
                    <BellRing size={16} />
                    <span>{reminder ?? "提醒已关闭，点击宠物可再次唤起。"}</span>
                  </div>
                </div>
              </Card>
              <PrivacySettings
                sharingEnabled={sharingEnabled}
                onToggle={() => setSharingEnabled((value) => !value)}
              />
            </div>

            <TaskPanelShell
              open={panelOpen}
              tasks={tasks}
              expandedTaskId={expandedTaskId}
              onToggleTask={handleToggleTask}
              onToggleExpanded={(id) =>
                setExpandedTaskId((current) => (current === id ? null : id))
              }
              totalPoints={totalPoints}
            />
          </motion.section>
        ) : (
          <motion.div
            key="hr"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <HRDashboard />
          </motion.div>
        )}
      </AnimatePresence>

      <Pet
        mood={mood}
        message={bubbleMessage ?? reminder}
        onSingleClick={handlePetClick}
        onDoubleClick={() => {
          setPanelOpen((value) => !value);
          dismiss();
        }}
        onDismissBubble={() => setBubbleMessage(null)}
      />
    </main>
  );
}
