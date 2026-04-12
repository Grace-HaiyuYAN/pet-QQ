import { careRecords } from "../../data/mockData";
import { Badge } from "../shared/Badge";
import { Card } from "../shared/Card";

export function CareTimeline() {
  return (
    <Card className="timeline-card" tone="highlight">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">人文关怀记录</span>
          <h3>把异常变成更及时的照顾动作</h3>
        </div>
      </div>
      <div className="timeline-list">
        {careRecords.map((record) => (
          <div key={record.id} className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-content">
              <div className="timeline-meta">
                <strong>{record.employee}</strong>
                <span>{record.time}</span>
              </div>
              <p>{record.trigger}</p>
              <p>{record.action}</p>
              <Badge variant={record.feedback === "无反馈" ? "warning" : "success"}>
                {record.feedback}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
