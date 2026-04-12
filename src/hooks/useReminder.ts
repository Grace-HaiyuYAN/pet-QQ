import { useEffect, useState } from "react";

const reminderMessages = [
  "记得喝水哦，脑袋会更清醒。",
  "已经工作一阵啦，伸个懒腰吧。",
  "你刚刚完成得很好，给自己一点小奖励。",
];

export function useReminder() {
  const [reminder, setReminder] = useState<string | null>(reminderMessages[0]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      const next =
        reminderMessages[Math.floor(Math.random() * reminderMessages.length)];
      setReminder(next);
    }, 9000);

    return () => window.clearInterval(interval);
  }, []);

  return { reminder, dismiss: () => setReminder(null) };
}
