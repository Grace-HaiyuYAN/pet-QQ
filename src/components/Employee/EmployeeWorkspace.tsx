import { BookOpenText, Clock3, Coffee, ListTodo, UsersRound } from "lucide-react";
import { Card } from "../shared/Card";
import { Button } from "../shared/Button";
import { PetAvatar } from "../Pet/PetAvatar";
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
  const knowledgeSamples = [
    {
      title: "《办公宠物 Demo 演示脚本》",
      link: "kb://demo/pet-script",
      push: "资料推送：3 分钟速读版 + 讲解提纲",
    },
    {
      title: "《AI 任务拆解模板库》",
      link: "kb://templates/task-breakdown",
      push: "资料推送：今日拆解参考 + 常用话术",
    },
    {
      title: "《员工关怀节奏建议》",
      link: "kb://hr/care-playbook",
      push: "资料推送：节奏清单 + 提醒卡片",
    },
  ];

  const knowledgeList = assistantState.knowledgeDocs.length
    ? assistantState.knowledgeDocs.map((doc, index) => ({
        title: doc.title,
        reason: doc.reason,
        link: knowledgeSamples[index % knowledgeSamples.length].link,
        push: knowledgeSamples[index % knowledgeSamples.length].push,
      }))
    : knowledgeSamples;

  const colleagueSuggestions = assistantState.collaborators.length
    ? assistantState.collaborators.map((person) => ({
        kind: "同事推荐",
        name: person.name,
        meta: person.focus,
        reason: person.reason,
      }))
    : [
        {
          kind: "同事推荐",
          name: "Mia",
          meta: "员工画像 · 数据分析",
          reason: "可以补全管理端的数据解读与叙事。",
        },
      ];

  const socialList = [
    colleagueSuggestions[0],
    {
      kind: "活动推荐",
      name: "AI 任务拆解分享会",
      meta: "周三 16:00 · 会议室 2",
      reason: "适合快速验证 Demo 的任务拆解玩法。",
    },
    {
      kind: "社团推荐",
      name: "效率工具社",
      meta: "每周 Demo day · 周五",
      reason: "可收集更多桌面助理同类案例。",
    },
  ];

  return (
    <section className="employee-workspace">
      <div className="employee-workspace-header">
        <div>
          <span className="eyebrow">员工看板</span>
          <h2>最近任务完成的不错！继续努力噢～</h2>
          <p>你的节奏正在慢慢变稳，今天也继续把关键事项往前推一点点。</p>
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
              {knowledgeList.map((doc) => (
                <div key={doc.title} className="workspace-doc-card">
                  <strong>{doc.title}</strong>
                  {"reason" in doc && doc.reason ? <span>{doc.reason}</span> : null}
                  <a className="workspace-doc-link" href={doc.link}>
                    {doc.link}
                  </a>
                  <span className="workspace-doc-push">{doc.push}</span>
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
              {socialList.map((item) => (
                <div key={`${item.kind}-${item.name}`} className="workspace-social-card">
                  <div className="workspace-social-header">
                    <span className="workspace-social-tag">{item.kind}</span>
                    <div>
                      <strong>{item.name}</strong>
                      <span>{item.meta}</span>
                    </div>
                  </div>
                  <p>{item.reason}</p>
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
              <PetAvatar mood="greeting" status="efficient" />
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
