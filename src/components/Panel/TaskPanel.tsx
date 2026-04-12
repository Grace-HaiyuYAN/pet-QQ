import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, CircleCheckBig, Sparkles } from "lucide-react";
import type { TaskItem } from "../../data/mockData";
import { Card } from "../shared/Card";

interface TaskPanelProps {
  tasks: TaskItem[];
  expandedTaskId: number | null;
  onToggleTask: (id: number) => void;
  onToggleExpanded: (id: number) => void;
  totalPoints: number;
}

export function TaskPanel({
  tasks,
  expandedTaskId,
  onToggleTask,
  onToggleExpanded,
  totalPoints,
}: TaskPanelProps) {
  return (
    <Card className="panel-column" tone="soft">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">今日任务</span>
          <h3>拆成更容易完成的小步</h3>
        </div>
        <div className="point-pill">
          <Sparkles size={14} />
          <span>{totalPoints} 积分</span>
        </div>
      </div>
      <div className="task-list">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            layout
            className={`task-card ${task.completed ? "task-complete" : ""}`}
          >
            <button
              className="task-main"
              type="button"
              onClick={() => onToggleExpanded(task.id)}
            >
              <span
                className={`task-check ${task.completed ? "task-check-active" : ""}`}
                onClick={(event) => {
                  event.stopPropagation();
                  onToggleTask(task.id);
                }}
              >
                {task.completed ? <CircleCheckBig size={16} /> : null}
              </span>
              <div className="task-copy">
                <strong>{task.title}</strong>
                <span>{task.points} pts</span>
              </div>
              <ChevronDown
                size={16}
                className={expandedTaskId === task.id ? "rotate-180" : ""}
              />
            </button>
            <AnimatePresence>
              {expandedTaskId === task.id ? (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="subtask-list"
                >
                  {task.subtasks.map((subtask) => (
                    <li key={subtask}>{subtask}</li>
                  ))}
                </motion.ul>
              ) : null}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
