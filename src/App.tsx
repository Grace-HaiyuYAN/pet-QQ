import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, User, LayoutDashboard } from "lucide-react";
import { HRDashboard } from "./components/Dashboard/HRDashboard";
import { TaskPanelShell } from "./components/Panel/TaskPanelShell";
import { Pet } from "./components/Pet/Pet";
import { useReminder } from "./hooks/useReminder";
import { petGreetings, taskItems, type PetMood } from "./data/mockData";

type ViewMode = "employee" | "hr";

export default function App() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("employee");
  const [bubbleMessage, setBubbleMessage] = useState<string | null>(null);
  const [tasks, setTasks] = useState(taskItems);
  const [expandedTaskId, setExpandedTaskId] = useState<number | null>(null);
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

  const handlePetDoubleClick = () => {
    setPanelOpen(true);
    setBubbleMessage(null);
    dismiss();
  };

  const handleToggleTask = (id: number) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const handleClosePanel = () => {
    setPanelOpen(false);
  };

  return (
    <main className="app-shell">
      {/* 简洁背景 */}
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />

      {/* 主页面：简洁引导 */}
      <AnimatePresence>
        {!panelOpen && (
          <motion.section
            className="landing-hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
          >
            <div className="landing-content">
              <span className="eyebrow">AI 办公宠物助手</span>
              <h1>
                双击右下角的<span className="gradient-text">小宠物</span>
                <br />
                开始体验
              </h1>
              <p className="landing-hint">
                单击打招呼 · 双击展开面板
              </p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* 主面板：双击宠物后展开 */}
      <AnimatePresence>
        {panelOpen && (
          <motion.div
            className="main-panel-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClosePanel}
          >
            <motion.section
              className="main-panel"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 面板头部：Tab 切换 */}
              <header className="panel-header">
                <nav className="panel-tabs">
                  <button
                    type="button"
                    className={`panel-tab ${viewMode === "employee" ? "active" : ""}`}
                    onClick={() => setViewMode("employee")}
                  >
                    <User size={16} />
                    我的工作台
                  </button>
                  <button
                    type="button"
                    className={`panel-tab ${viewMode === "hr" ? "active" : ""}`}
                    onClick={() => setViewMode("hr")}
                  >
                    <LayoutDashboard size={16} />
                    HR 看板
                  </button>
                </nav>
                <button
                  type="button"
                  className="panel-close"
                  onClick={handleClosePanel}
                  aria-label="关闭面板"
                >
                  <X size={20} />
                </button>
              </header>

              {/* 面板内容 */}
              <div className="panel-body">
                <AnimatePresence mode="wait">
                  {viewMode === "employee" ? (
                    <motion.div
                      key="employee"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="panel-view"
                    >
                      <TaskPanelShell
                        open={true}
                        tasks={tasks}
                        expandedTaskId={expandedTaskId}
                        onToggleTask={handleToggleTask}
                        onToggleExpanded={(id) =>
                          setExpandedTaskId((current) =>
                            current === id ? null : id,
                          )
                        }
                        totalPoints={totalPoints}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="hr"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="panel-view"
                    >
                      <HRDashboard />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 桌面宠物：始终显示 */}
      <Pet
        mood={mood}
        message={bubbleMessage ?? reminder}
        onSingleClick={handlePetClick}
        onDoubleClick={handlePetDoubleClick}
        onDismissBubble={() => setBubbleMessage(null)}
      />
    </main>
  );
}
