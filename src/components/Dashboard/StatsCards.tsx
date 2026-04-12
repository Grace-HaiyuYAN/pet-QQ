import {
  Area,
  AreaChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { completionStats, workTrend } from "../../data/mockData";
import { Card } from "../shared/Card";

export function StatsCards() {
  return (
    <div className="stats-grid">
      <Card className="stat-card">
        <span className="eyebrow">团队人数</span>
        <strong>{completionStats.teamSize}</strong>
        <p>本周有 7 位成员触发了关怀策略</p>
      </Card>
      <Card className="stat-card chart-card">
        <span className="eyebrow">任务完成率</span>
        <div className="pie-wrap">
          <ResponsiveContainer width="100%" height={120}>
            <PieChart>
              <Pie
                data={[
                  { name: "完成", value: completionStats.completionRate },
                  { name: "剩余", value: 100 - completionStats.completionRate },
                ]}
                dataKey="value"
                innerRadius={34}
                outerRadius={50}
                stroke="none"
                startAngle={90}
                endAngle={-270}
                fill="#ff8a5b"
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="pie-center">{completionStats.completionRate}%</div>
        </div>
      </Card>
      <Card className="stat-card">
        <span className="eyebrow">平均工作时长</span>
        <strong>{completionStats.averageHours}h</strong>
        <p>较上周下降 0.7h，疲劳风险有缓解</p>
      </Card>
      <Card className="stat-card chart-card">
        <span className="eyebrow">活跃度趋势</span>
        <ResponsiveContainer width="100%" height={120}>
          <AreaChart data={workTrend}>
            <defs>
              <linearGradient id="activeFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7bc6a4" stopOpacity={0.7} />
                <stop offset="100%" stopColor="#7bc6a4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="active"
              stroke="#4fa06f"
              strokeWidth={2}
              fill="url(#activeFill)"
            />
            <Tooltip />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
