import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { chatSeed } from "../../data/mockData";
import { Card } from "../shared/Card";
import { Button } from "../shared/Button";

type ChatMessage = (typeof chatSeed)[number];

const quickPrompts = ["帮我拆解任务", "今天有什么会议", "给我一句鼓励"];

export function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [displayedReply, setDisplayedReply] = useState("");

  const latestAssistant = useMemo(
    () => [...messages].reverse().find((message) => message.role === "assistant"),
    [messages],
  );

  useEffect(() => {
    setMessages(chatSeed);
  }, []);

  useEffect(() => {
    if (!latestAssistant) return;
    setDisplayedReply("");
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setDisplayedReply(latestAssistant.content.slice(0, index));
      if (index >= latestAssistant.content.length) {
        window.clearInterval(timer);
      }
    }, 16);

    return () => window.clearInterval(timer);
  }, [latestAssistant]);

  return (
    <Card className="panel-column">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">AI 对话</span>
          <h3>像同桌一样帮你理顺今天</h3>
        </div>
      </div>
      <div className="chat-stream">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`chat-bubble ${message.role}`}
          >
            {message.role === "assistant" && message.id === latestAssistant?.id
              ? displayedReply
              : message.content}
          </motion.div>
        ))}
      </div>
      <div className="quick-prompt-row">
        {quickPrompts.map((prompt) => (
          <Button key={prompt} variant="ghost" className="quick-prompt">
            {prompt}
          </Button>
        ))}
      </div>
    </Card>
  );
}
