import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RechartsRadarChart,
  ResponsiveContainer,
} from "recharts";

interface RadarMetricChartProps {
  metrics: {
    output: number;
    collaboration: number;
    learning: number;
    attendance: number;
    aiUsage: number;
  };
}

export function RadarMetricChart({ metrics }: RadarMetricChartProps) {
  const data = [
    { subject: "业务产出", value: metrics.output },
    { subject: "协作指数", value: metrics.collaboration },
    { subject: "学习成长", value: metrics.learning },
    { subject: "出勤稳定", value: metrics.attendance },
    { subject: "AI 使用", value: metrics.aiUsage },
  ];

  return (
    <div className="radar-shell">
      <ResponsiveContainer width="100%" height={260}>
        <RechartsRadarChart data={data}>
          <PolarGrid stroke="rgba(79, 94, 84, 0.18)" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#4d5b54", fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          <Radar
            dataKey="value"
            stroke="#ff8a5b"
            fill="#ffb38f"
            fillOpacity={0.45}
            strokeWidth={2}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}
