export type PetMood = "happy" | "thinking" | "greeting";
export type EmployeeStatus = "efficient" | "tired" | "overload" | "normal";
export type EmployeeRisk = "turnover" | "burnout" | "overload";
export type SuggestionState = "pending" | "accepted" | "ignored" | "deferred";

export interface TaskItem {
  id: number;
  title: string;
  points: number;
  completed: boolean;
  subtasks: string[];
}

export interface EmployeeRecord {
  id: number;
  name: string;
  avatar: string;
  position: string;
  status: EmployeeStatus;
  joinDate: string;
  currentTask: string;
  metrics: {
    output: number;
    collaboration: number;
    learning: number;
    attendance: number;
    aiUsage: number;
  };
  risks: EmployeeRisk[];
  recentTasks: string[];
  achievement: string;
}

export interface SuggestionRecord {
  id: number;
  content: string;
  data: string;
  confidence: "high" | "medium" | "low";
  status: SuggestionState;
}

export interface CareRecord {
  id: number;
  time: string;
  employee: string;
  trigger: string;
  action: string;
  feedback: "已读" | "已响应" | "无反馈";
}

export const petGreetings = [
  "今天也一起把任务变轻一点吧。",
  "我已经帮你盯着喝水提醒啦。",
  "双击我可以打开任务面板哦。",
  "先专注一小步，再慢慢赢回来。",
];

export const taskItems: TaskItem[] = [
  {
    id: 1,
    title: "完成办公宠物 Demo 首屏",
    points: 30,
    completed: false,
    subtasks: ["整理视觉方向", "搭建宠物浮层", "完成动效调优"],
  },
  {
    id: 2,
    title: "准备下午面试演示脚本",
    points: 20,
    completed: true,
    subtasks: ["提炼亮点", "准备 3 个追问", "补充隐私边界说明"],
  },
  {
    id: 3,
    title: "同步本周 HR 关注名单",
    points: 15,
    completed: false,
    subtasks: ["汇总高风险标签", "确认关怀动作", "形成建议摘要"],
  },
  {
    id: 4,
    title: "更新 AI 知识库推荐逻辑",
    points: 25,
    completed: false,
    subtasks: ["梳理搜索词", "对齐热门文档", "补充协作者推荐"],
  },
];

export const chatSeed = [
  {
    id: 1,
    role: "user" as const,
    content: "帮我拆解一下今天的 Demo 任务",
  },
  {
    id: 2,
    role: "assistant" as const,
    content:
      "建议先完成桌面宠物和面板切换，再补 HR 看板，最后把人文关怀提醒串起来，这样演示路径最顺。",
  },
  {
    id: 3,
    role: "user" as const,
    content: "今天有什么会议需要注意？",
  },
  {
    id: 4,
    role: "assistant" as const,
    content:
      "15:00 有产品评审，17:30 前需要提交演示链接。我已经把高优先级任务放进左侧列表了。",
  },
];

export const knowledgeRecommendations = [
  "《隐形管理与员工授权边界》",
  "《如何用 AI 做任务拆解》",
  "《倦怠预警指标设计手册》",
];

export const collaborators = [
  { name: "Mia", emoji: "🦊", focus: "员工画像" },
  { name: "Rex", emoji: "🐼", focus: "统计看板" },
  { name: "June", emoji: "🐰", focus: "AI 对话" },
];

export const employees: EmployeeRecord[] = [
  {
    id: 1,
    name: "张三",
    avatar: "😊",
    position: "前端工程师",
    status: "efficient",
    joinDate: "2024-03-15",
    currentTask: "完成用户中心页面",
    metrics: {
      output: 85,
      collaboration: 72,
      learning: 68,
      attendance: 95,
      aiUsage: 80,
    },
    risks: [],
    recentTasks: ["完成登录模块", "修复支付 bug", "搭建演示环境"],
    achievement: "连续两周高质量交付",
  },
  {
    id: 2,
    name: "李四",
    avatar: "😴",
    position: "后端工程师",
    status: "tired",
    joinDate: "2023-08-20",
    currentTask: "API 性能优化",
    metrics: {
      output: 65,
      collaboration: 58,
      learning: 45,
      attendance: 88,
      aiUsage: 35,
    },
    risks: ["burnout"],
    recentTasks: ["数据库迁移", "重试队列治理"],
    achievement: "稳定撑住了高峰流量",
  },
  {
    id: 3,
    name: "王五",
    avatar: "🔥",
    position: "产品经理",
    status: "overload",
    joinDate: "2024-01-10",
    currentTask: "Q2 规划",
    metrics: {
      output: 90,
      collaboration: 88,
      learning: 75,
      attendance: 92,
      aiUsage: 95,
    },
    risks: ["overload"],
    recentTasks: ["需求评审", "竞品分析", "用户调研"],
    achievement: "本月推动两次跨团队协作",
  },
  {
    id: 4,
    name: "赵六",
    avatar: "😐",
    position: "HRBP",
    status: "normal",
    joinDate: "2022-11-01",
    currentTask: "季度组织氛围回访",
    metrics: {
      output: 78,
      collaboration: 82,
      learning: 64,
      attendance: 91,
      aiUsage: 73,
    },
    risks: [],
    recentTasks: ["完善 onboarding 流程", "推动满意度问卷"],
    achievement: "关怀响应满意度提升 18%",
  },
  {
    id: 5,
    name: "钱七",
    avatar: "😊",
    position: "设计师",
    status: "efficient",
    joinDate: "2025-01-18",
    currentTask: "重做数据看板视觉",
    metrics: {
      output: 84,
      collaboration: 79,
      learning: 86,
      attendance: 93,
      aiUsage: 88,
    },
    risks: [],
    recentTasks: ["交付品牌海报", "梳理组件库"],
    achievement: "拿下季度最佳协作者",
  },
  {
    id: 6,
    name: "孙八",
    avatar: "😴",
    position: "数据分析师",
    status: "tired",
    joinDate: "2023-05-06",
    currentTask: "整理离职风险指标",
    metrics: {
      output: 62,
      collaboration: 68,
      learning: 70,
      attendance: 84,
      aiUsage: 67,
    },
    risks: ["burnout"],
    recentTasks: ["清洗考勤数据", "搭建趋势模型"],
    achievement: "完成新的人效指标看板",
  },
  {
    id: 7,
    name: "周九",
    avatar: "🔥",
    position: "测试工程师",
    status: "overload",
    joinDate: "2024-07-09",
    currentTask: "版本回归测试",
    metrics: {
      output: 74,
      collaboration: 66,
      learning: 58,
      attendance: 90,
      aiUsage: 51,
    },
    risks: ["overload"],
    recentTasks: ["修复冒烟脚本", "跟进线上问题"],
    achievement: "关键版本零阻塞发版",
  },
  {
    id: 8,
    name: "吴十",
    avatar: "😐",
    position: "运营经理",
    status: "normal",
    joinDate: "2022-06-30",
    currentTask: "筹备 AI 黑客松",
    metrics: {
      output: 80,
      collaboration: 85,
      learning: 69,
      attendance: 89,
      aiUsage: 76,
    },
    risks: ["turnover"],
    recentTasks: ["上线活动页", "跟进报名转化"],
    achievement: "活动参与率环比提升 35%",
  },
  {
    id: 9,
    name: "郑十一",
    avatar: "😊",
    position: "客户成功",
    status: "efficient",
    joinDate: "2025-02-14",
    currentTask: "整理客户复盘模板",
    metrics: {
      output: 88,
      collaboration: 90,
      learning: 83,
      attendance: 94,
      aiUsage: 81,
    },
    risks: [],
    recentTasks: ["完成季度回访", "交付培训材料"],
    achievement: "客户满意度达 96%",
  },
];

export const aiSuggestions: SuggestionRecord[] = [
  {
    id: 1,
    content: "李四近两周任务完成率下降 30%，建议关注是否需要支援",
    data: "任务完成率：85% → 55%",
    confidence: "high",
    status: "pending",
  },
  {
    id: 2,
    content: "王五连续 5 天工作超 10 小时，建议提醒休息并分担任务",
    data: "日均工作：11.2 小时",
    confidence: "high",
    status: "pending",
  },
  {
    id: 3,
    content: "张三本月协作指数提升 50%，可考虑晋升评估",
    data: "协作指数：48 → 72",
    confidence: "medium",
    status: "pending",
  },
  {
    id: 4,
    content: "建议为李四安排 AI 工具培训，提升工作效率",
    data: "AI 使用率：35%（团队平均 70%）",
    confidence: "medium",
    status: "pending",
  },
  {
    id: 5,
    content: "吴十近期参与度稳定但情绪波动，建议发起一次成长沟通",
    data: "敬业度问卷：72 → 61",
    confidence: "low",
    status: "pending",
  },
];

export const careRecords: CareRecord[] = [
  {
    id: 1,
    time: "2026-04-11 18:30",
    employee: "王五",
    trigger: "连续加班 5 天",
    action: "宠物推送休息提醒",
    feedback: "已读",
  },
  {
    id: 2,
    time: "2026-04-10 15:00",
    employee: "李四",
    trigger: "任务完成率持续下降",
    action: "通知直属上级关注",
    feedback: "已响应",
  },
  {
    id: 3,
    time: "2026-04-09 11:00",
    employee: "张三",
    trigger: "连续工作 3 小时",
    action: "宠物提醒喝水休息",
    feedback: "已响应",
  },
  {
    id: 4,
    time: "2026-04-08 20:10",
    employee: "周九",
    trigger: "回归任务堆积",
    action: "建议协作者支援",
    feedback: "无反馈",
  },
];

export const workTrend = [
  { day: "Mon", active: 62 },
  { day: "Tue", active: 78 },
  { day: "Wed", active: 75 },
  { day: "Thu", active: 89 },
  { day: "Fri", active: 72 },
];

export const completionStats = {
  teamSize: 48,
  completionRate: 82,
  averageHours: 8.6,
};
