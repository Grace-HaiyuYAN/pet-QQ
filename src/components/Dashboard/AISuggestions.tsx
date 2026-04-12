import type { SuggestionRecord, SuggestionState } from "../../data/mockData";
import { Badge } from "../shared/Badge";
import { Button } from "../shared/Button";
import { Card } from "../shared/Card";

const confidenceMap = {
  high: "danger" as const,
  medium: "warning" as const,
  low: "neutral" as const,
};

export function AISuggestions({
  suggestions,
  onUpdate,
}: {
  suggestions: SuggestionRecord[];
  onUpdate: (id: number, status: SuggestionState) => void;
}) {
  return (
    <Card className="suggestions-card">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">AI 建议中心</span>
          <h3>让干预动作更像支持，而不是监控</h3>
        </div>
      </div>
      <div className="suggestion-list">
        {suggestions.map((item) => (
          <div key={item.id} className="suggestion-item">
            <div className="suggestion-head">
              <strong>{item.content}</strong>
              <Badge variant={confidenceMap[item.confidence]}>
                置信度 {item.confidence}
              </Badge>
            </div>
            <p>{item.data}</p>
            <div className="suggestion-actions">
              <Button onClick={() => onUpdate(item.id, "accepted")}>采纳</Button>
              <Button variant="secondary" onClick={() => onUpdate(item.id, "ignored")}>
                忽略
              </Button>
              <Button variant="ghost" onClick={() => onUpdate(item.id, "deferred")}>
                稍后
              </Button>
              {item.status !== "pending" ? (
                <span className="suggestion-status">已标记：{item.status}</span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
