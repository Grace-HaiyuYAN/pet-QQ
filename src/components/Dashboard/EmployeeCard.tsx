import type { EmployeeRecord } from "../../data/mockData";
import { Badge } from "../shared/Badge";
import { Card } from "../shared/Card";
import { RadarMetricChart } from "../shared/RadarChart";

const riskLabelMap = {
  turnover: { text: "离职风险", variant: "danger" as const },
  burnout: { text: "倦怠风险", variant: "warning" as const },
  overload: { text: "过载风险", variant: "gold" as const },
};

export function EmployeeCard({ employee }: { employee: EmployeeRecord }) {
  return (
    <Card className="employee-card" tone="soft">
      <div className="employee-card-header">
        <div>
          <span className="eyebrow">员工画像</span>
          <h3>{employee.name}</h3>
          <p>
            {employee.position} · 入职 {employee.joinDate}
          </p>
        </div>
        <div className="risk-row">
          {employee.risks.length === 0 ? (
            <Badge variant="success">状态稳定</Badge>
          ) : (
            employee.risks.map((risk) => {
              const item = riskLabelMap[risk];
              return (
                <Badge key={risk} variant={item.variant}>
                  {item.text}
                </Badge>
              );
            })
          )}
        </div>
      </div>
      <RadarMetricChart metrics={employee.metrics} />
      <div className="employee-meta-grid">
        <div>
          <span>当前任务</span>
          <strong>{employee.currentTask}</strong>
        </div>
        <div>
          <span>近期成就</span>
          <strong>{employee.achievement}</strong>
        </div>
      </div>
      <div className="recent-task-list">
        {employee.recentTasks.map((task) => (
          <span key={task}>{task}</span>
        ))}
      </div>
    </Card>
  );
}
