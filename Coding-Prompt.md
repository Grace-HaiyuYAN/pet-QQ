# AI 办公宠物助手 Demo - Coding Prompt

## 项目概述
创建一个"AI 办公宠物助手"的 Web Demo，包含桌面宠物、员工任务面板、HR 管理看板三个核心界面。

## 技术栈
- React 18 + TypeScript
- Tailwind CSS
- Framer Motion（动画）
- Vite（构建工具）
- Recharts（图表，用于 HR 看板）

## 功能需求

### 1. 桌面宠物组件
- 一个可爱的卡通宠物形象（可用 emoji 或 SVG 简笔画）
- 宠物有呼吸动画（轻微上下浮动）
- 宠物有不同状态表情：开心、思考、打招呼
- 单击宠物：显示随机问候语气泡
- 双击宠物：展开任务面板

### 2. 任务面板（员工端）
展开后显示三栏布局：

**左栏 - 今日任务**
- 任务列表，每项可勾选完成
- 点击任务可展开 AI 拆解的子任务
- 示例数据：3-5 个模拟任务

**中栏 - AI 对话**
- 聊天界面，模拟与 AI 助手对话
- 预设 3-5 条问答（如"帮我拆解任务"、"今天有什么会议"）
- 打字机效果展示 AI 回复

**右栏 - 智能推荐**
- 知识库推荐：相关文档链接
- 协作者推荐：在做类似任务的同事头像

### 3. HR 看板（管理端）- 重点完善
通过顶部 Tab 切换到 HR 视图，包含以下模块：

**3.1 团队状态总览**
- 宠物矩阵布局（3x3 或 4x3 网格）
- 每个格子是一个员工的宠物头像
- 不同表情代表不同状态：
  - 😊 开心绿框 = 高效工作中
  - 😴 困倦黄框 = 可能疲劳
  - 🔥 冒火红框 = 任务过载
  - 😐 平静灰框 = 正常状态
- 悬停显示员工姓名和当前任务
- 点击可展开员工详情卡片

**3.2 员工画像卡片（点击宠物后展开）**
- 头像 + 姓名 + 职位 + 入职时间
- 贡献度雷达图（5 维）：
  - 业务产出
  - 协作指数
  - 学习成长
  - 出勤稳定性
  - AI 使用率
- 风险预警标签（条件显示）：
  - 红色标签：离职风险
  - 橙色标签：倦怠风险
  - 黄色标签：过载风险
- 近期动态：最近完成的任务、获得的成就

**3.3 AI 建议中心**
- 建议卡片列表，每条包含：
  - 建议内容（如"张三近两周任务完成率下降 30%，建议关注"）
  - 依据数据（如"任务完成率：45% → 15%"）
  - 置信度标签（高/中/低）
  - 操作按钮：采纳 | 忽略 | 稍后
- 模拟数据 4-6 条建议

**3.4 人文关怀记录**
- 时间线形式展示已触发的关怀
- 每条记录包含：
  - 触发时间
  - 触发原因（如"连续加班 5 天"）
  - 关怀动作（如"推送休息提醒"）
  - 员工反馈状态（已读/已响应/无反馈）

**3.5 数据统计卡片（顶部）**
- 团队人数
- 本周任务完成率（环形图）
- 平均工作时长
- 活跃度趋势（小型折线图）

### 4. 人文关怀功能
- 喝水提醒：每隔一段时间宠物弹出"记得喝水哦~"
- 休息提醒：工作一段时间后提醒休息
- 成就系统：完成任务获得积分，宠物庆祝动画

### 5. 授权设置（员工端设置入口）
- 数据共享开关：是否允许管理者查看工作数据
- 授权状态提示：当前授权范围说明
- 随时可撤回授权

## UI/UX 要求
- 整体风格：圆润、可爱、低饱和度配色
- 宠物区域：右下角固定定位，不遮挡主要内容
- 面板动画：展开/收起有平滑过渡
- HR 看板：专业但不冰冷，保持与宠物风格统一
- 响应式：支持桌面端展示

## 项目结构
```
src/
├── components/
│   ├── Pet/
│   │   ├── Pet.tsx              # 宠物主组件
│   │   ├── PetBubble.tsx        # 气泡对话
│   │   └── PetAvatar.tsx        # 宠物头像（复用于 HR 看板）
│   ├── Panel/
│   │   ├── TaskPanel.tsx        # 任务面板
│   │   ├── ChatPanel.tsx        # AI 对话
│   │   └── RecommendPanel.tsx   # 推荐栏
│   ├── Dashboard/
│   │   ├── HRDashboard.tsx      # HR 看板主组件
│   │   ├── TeamStatusGrid.tsx   # 团队状态网格
│   │   ├── EmployeeCard.tsx     # 员工画像卡片
│   │   ├── AISuggestions.tsx    # AI 建议中心
│   │   ├── CareTimeline.tsx     # 人文关怀记录
│   │   └── StatsCards.tsx       # 数据统计卡片
│   ├── Settings/
│   │   └── PrivacySettings.tsx  # 授权设置
│   └── shared/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── RadarChart.tsx       # 雷达图组件
│       └── Badge.tsx            # 标签组件
├── data/
│   └── mockData.ts              # 模拟数据
├── hooks/
│   └── useReminder.ts           # 提醒 Hook
├── App.tsx
└── main.tsx
```

## 模拟数据示例

```typescript
// 员工数据
const employees = [
  {
    id: 1,
    name: "张三",
    avatar: "😊",
    position: "前端工程师",
    status: "efficient", // efficient | tired | overload | normal
    joinDate: "2024-03-15",
    currentTask: "完成用户中心页面",
    metrics: {
      output: 85,
      collaboration: 72,
      learning: 68,
      attendance: 95,
      aiUsage: 80
    },
    risks: [], // ["turnover", "burnout", "overload"]
    recentTasks: ["完成登录模块", "修复支付bug"]
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
      aiUsage: 35
    },
    risks: ["burnout"],
    recentTasks: ["数据库迁移"]
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
      aiUsage: 95
    },
    risks: ["overload"],
    recentTasks: ["需求评审", "竞品分析", "用户调研"]
  }
];

// AI 建议数据
const aiSuggestions = [
  {
    id: 1,
    content: "李四近两周任务完成率下降 30%，建议关注是否需要支援",
    data: "任务完成率：85% → 55%",
    confidence: "high",
    status: "pending" // pending | accepted | ignored | deferred
  },
  {
    id: 2,
    content: "王五连续 5 天工作超 10 小时，建议提醒休息并分担任务",
    data: "日均工作：11.2 小时",
    confidence: "high",
    status: "pending"
  },
  {
    id: 3,
    content: "张三本月协作指数提升 50%，可考虑晋升评估",
    data: "协作指数：48 → 72",
    confidence: "medium",
    status: "pending"
  },
  {
    id: 4,
    content: "建议为李四安排 AI 工具培训，提升工作效率",
    data: "AI 使用率：35%（团队平均 70%）",
    confidence: "medium",
    status: "pending"
  }
];

// 人文关怀记录
const careRecords = [
  {
    id: 1,
    time: "2026-04-11 18:30",
    employee: "王五",
    trigger: "连续加班 5 天",
    action: "宠物推送休息提醒",
    feedback: "已读"
  },
  {
    id: 2,
    time: "2026-04-10 15:00",
    employee: "李四",
    trigger: "任务完成率持续下降",
    action: "通知直属上级关注",
    feedback: "已响应"
  },
  {
    id: 3,
    time: "2026-04-09 11:00",
    employee: "张三",
    trigger: "连续工作 3 小时",
    action: "宠物提醒喝水休息",
    feedback: "已响应"
  }
];

// 团队统计
const teamStats = {
  totalMembers: 12,
  weeklyCompletionRate: 78,
  avgWorkHours: 8.5,
  activityTrend: [65, 72, 68, 80, 75, 82, 78] // 近7天
};

// 员工端任务
const tasks = [
  { id: 1, title: "完成产品 Demo 设计", subtasks: ["梳理需求", "绘制原型", "开发实现"], completed: false },
  { id: 2, title: "准备面试材料", subtasks: ["整理设计文档", "录制演示视频"], completed: false },
  { id: 3, title: "团队周会", time: "14:00", completed: true }
];

// AI 对话预设
const aiResponses = {
  "帮我拆解任务": "好的！我帮你把「完成产品 Demo」拆解为：\n1. 梳理核心需求 (30min)\n2. 绘制 UI 原型 (1h)\n3. 开发实现 (2h)",
  "今天有什么会议": "你今天有 1 个会议：\n📅 14:00 团队周会（会议室 A）",
  "推荐相关文档": "根据你当前的任务，推荐以下文档：\n📄 产品设计规范 v2.0\n📄 React 最佳实践\n📄 Demo 案例参考"
};
```

## 视觉参考
- 宠物风格：类似 QQ 宠物的 Q 版卡通风格
- 配色方案：
  - 主色：#6366F1（靛蓝）
  - 辅色：#F0F9FF（浅蓝背景）
  - 高效状态：#10B981（绿色）
  - 疲劳状态：#F59E0B（黄色）
  - 过载状态：#EF4444（红色）
  - 正常状态：#6B7280（灰色）
- 圆角：大圆角（16px+）营造亲和感
- HR 看板：保持可爱风格，但信息密度更高

## 交互流程
1. 页面加载 → 宠物出现在右下角，播放入场动画
2. 宠物闲置 → 呼吸动画 + 偶尔变换表情
3. 单击宠物 → 弹出随机问候气泡
4. 双击宠物 → 展开任务面板（默认员工端）
5. 点击面板外部 → 收起面板
6. 顶部 Tab 切换 → 员工端 ↔ HR 端
7. HR 端点击员工宠物 → 展开员工画像卡片
8. AI 建议操作 → 点击采纳/忽略/稍后，卡片状态更新

## 额外加分项
- 宠物可拖拽位置
- 深色模式支持
- 宠物养成进度条
- 音效反馈（可选）
- 员工画像卡片的雷达图动画
- HR 看板数据的动态刷新效果

## 实现优先级
1. **P0 - 核心体验**：宠物 + 员工任务面板
2. **P1 - HR 看板**：团队状态网格 + 员工画像卡片
3. **P2 - 管理功能**：AI 建议中心 + 人文关怀记录
4. **P3 - 增强体验**：数据统计 + 授权设置

请先初始化项目，然后按优先级逐步实现，确保每个阶段都可演示。
