import { AnimatePresence, motion } from "framer-motion";
import type { TaskItem } from "../../data/mockData";
import { TaskPanel } from "./TaskPanel";
import { ChatPanel } from "./ChatPanel";
import { RecommendPanel } from "./RecommendPanel";

interface TaskPanelShellProps {
  open: boolean;
  tasks: TaskItem[];
  expandedTaskId: number | null;
  onToggleTask: (id: number) => void;
  onToggleExpanded: (id: number) => void;
  totalPoints: number;
}

export function TaskPanelShell(props: TaskPanelShellProps) {
  return (
    <AnimatePresence>
      {props.open ? (
        <motion.section
          className="task-panel-shell"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.3 }}
        >
          <TaskPanel {...props} />
          <ChatPanel />
          <RecommendPanel />
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}
