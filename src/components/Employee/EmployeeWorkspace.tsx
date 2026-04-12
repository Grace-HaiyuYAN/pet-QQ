import { BookOpenText, Clock3, Coffee, ListTodo, UsersRound } from "lucide-react";
import { Card } from "../shared/Card";
import { Button } from "../shared/Button";
import type { TaskItem } from "../../data/mockData";

interface AssistantState {
  reply: string;
  subtasks: string[];
  knowledgeDocs: Array<{ title: string; reason: string }>;
  collaborators: Array<{ name: string; focus: string; reason: string }>;
}

export function EmployeeWorkspace({
  tasks,
  totalPoints,
  workMinutes,
  assistantState,
  onToggleTask,
}: {
  tasks: TaskItem[];
  totalPoints: number;
  workMinutes: number;
  assistantState: AssistantState;
  onToggleTask: (id: number) => void;
}) {
  const completedCount = tasks.filter((task) => task.completed).length;
  const hours = Math.floor(workMinutes / 60);
  const minutes = workMinutes % 60;
  const restHint =
    workMinutes >= 120
      ? "已经持续专注较久，建议站起来走一走并喝点水。"
      : "状态稳定，建议 25 分钟后做一次短休息。";

  return (
    <section className="employee-workspace">
      <div className="employee-workspace-header">
        <div>
          <span className="eyebrow">员工看板</span>
          <h2>今天先把最值得展示的结果做出来</h2>
          <p>{assistantState.reply}</p>
        </div>
      </div>

      <div className="employee-split-layout">
        <div className="employee-task-grid">
          <Card className="workspace-panel workspace-progress-card" tone="highlight">
            <div className="workspace-panel-header">
              <span className="eyebrow">总体任务进度</span>
              <strong>{completedCount}/{tasks.length}</strong>
            </div>
            <div className="progress-hero-number">{totalPoints} pts</div>
            <p>已完成任务会累计成就积分，方便演示宠物激励系统。</p>
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill"
                style={{ width: `${(completedCount / tasks.length) * 100}%` }}
              />
            </div>
          </Card>

          <Card className="workspace-panel" tone="soft">
            <div className="workspace-panel-title">
              <ListTodo size={18} />
              <div>
                <span className="eyebrow">To-do List</span>
                <h3>AI 拆解后的执行清单</h3>
              </div>
            </div>
            <div className="workspace-check-list">
              {tasks.map((task) => (
                <button
                  key={task.id}
                  type="button"
                  className={`workspace-check-item ${task.completed ? "is-complete" : ""}`}
                  onClick={() => onToggleTask(task.id)}
                >
                  <span className="workspace-check-indicator" />
                  <div>
                    <strong>{task.title}</strong>
                    <span>{task.subtasks.join(" · ")}</span>
                  </div>
                </button>
              ))}
              {assistantState.subtasks.map((task, index) => (
                <div key={`${task}-${index}`} className="workspace-generated-item">
                  {task}
                </div>
              ))}
            </div>
          </Card>

          <Card className="workspace-panel">
            <div className="workspace-panel-title">
              <BookOpenText size={18} />
              <div>
                <span className="eyebrow">知识库推荐</span>
                <h3>先看这些资料会更快</h3>
              </div>
            </div>
            <div className="workspace-doc-list">
              {assistantState.knowledgeDocs.map((doc) => (
                <div key={doc.title} className="workspace-doc-card">
                  <strong>{doc.title}</strong>
                  <span>{doc.reason}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="workspace-panel">
            <div className="workspace-panel-title">
              <UsersRound size={18} />
              <div>
                <span className="eyebrow">社交推荐</span>
                <h3>这些同事可能正好能帮上忙</h3>
              </div>
            </div>
            <div className="workspace-social-list">
              {assistantState.collaborators.map((person) => (
                <div key={person.name} className="workspace-social-card">
                  <div>
                    <strong>{person.name}</strong>
                    <span>{person.focus}</span>
                  </div>
                  <p>{person.reason}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="status-board-card" tone="highlight">
          <div className="workspace-panel-title">
            <Clock3 size={18} />
            <div>
              <span className="eyebrow">状态看板</span>
              <h3>你的宠物正在陪你专注</h3>
            </div>
          </div>
          <div className="status-pet-stage">
            <div className="status-pet-orb">
              <div className="status-pet-face">૮ ˶ᵔ ᵕ ᵔ˶ ა</div>
            </div>
          </div>
          <div className="status-metric-card">
            <span>当前持续工作时长</span>
            <strong>
              {hours} 小时 {minutes} 分钟
            </strong>
          </div>
          <div className="status-reminder-card">
            <Coffee size={18} />
            <p>{restHint}</p>
          </div>
          <Button variant="secondary">稍后提醒我站立休息</Button>
        </Card>
      </div>
    </section>
  );
}
