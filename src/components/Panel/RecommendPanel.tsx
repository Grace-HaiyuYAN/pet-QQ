import { BookOpenText, UsersRound } from "lucide-react";
import {
  collaborators,
  knowledgeRecommendations,
} from "../../data/mockData";
import { Card } from "../shared/Card";

export function RecommendPanel() {
  return (
    <Card className="panel-column" tone="highlight">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">智能推荐</span>
          <h3>文档与协作者都帮你找好了</h3>
        </div>
      </div>

      <section className="recommend-section">
        <div className="section-title">
          <BookOpenText size={16} />
          <span>知识库推荐</span>
        </div>
        <div className="recommend-list">
          {knowledgeRecommendations.map((item) => (
            <div key={item} className="recommend-card">
              <strong>{item}</strong>
              <span>点击后可查看相关沉淀与案例</span>
            </div>
          ))}
        </div>
      </section>

      <section className="recommend-section">
        <div className="section-title">
          <UsersRound size={16} />
          <span>协作者推荐</span>
        </div>
        <div className="collaborator-list">
          {collaborators.map((item) => (
            <div key={item.name} className="collaborator-card">
              <span className="collaborator-emoji">{item.emoji}</span>
              <div>
                <strong>{item.name}</strong>
                <span>当前聚焦：{item.focus}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Card>
  );
}
