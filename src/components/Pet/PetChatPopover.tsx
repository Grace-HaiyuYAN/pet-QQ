import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle, Send, X } from "lucide-react";

type AssistantResult = {
  reply: string;
  subtasks: string[];
  knowledgeDocs: Array<{ title: string; reason: string }>;
  collaborators: Array<{ name: string; focus: string; reason: string }>;
};

export function PetChatPopover({
  open,
  onSubmit,
  onClose,
}: {
  open: boolean;
  onSubmit: (input: string) => Promise<AssistantResult | null>;
  onClose: () => void;
}) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [submittedInput, setSubmittedInput] = useState("");
  const [chainResult, setChainResult] = useState<AssistantResult | null>(null);

  const fallbackResult = (goal: string): AssistantResult => ({
    reply: "DEMO演示",
    subtasks: [
      `识别目标：${goal}`,
      "拆成 3 个最小可执行动作",
      "整理知识库与协作建议",
    ],
    knowledgeDocs: [{ title: "DEMO演示", reason: "当前未接入可用 API，先展示静态拆解流程。" }],
    collaborators: [{ name: "DEMO演示", focus: "待接入 AI 输出", reason: "后续这里会展示真实的 AI 拆解结果。" }],
  });

  const handleSubmit = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    setLoading(true);
    try {
      const response = await onSubmit(trimmed);
      setSubmittedInput(trimmed);
      setChainResult(response ?? fallbackResult(trimmed));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.section
          layout
          className={submittedInput ? "pet-chat-popover pet-chat-popover-result" : "pet-chat-popover"}
          initial={{ opacity: 0, x: 24, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 16, scale: 0.98 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
        >
          <button
            type="button"
            className="pet-chat-close"
            onClick={onClose}
            aria-label="关闭聊天框"
          >
            <X size={14} />
          </button>
          <div className="pet-chat-input-row">
            <motion.div layout className="pet-chat-composer">
              <AnimatePresence mode="wait">
                {submittedInput ? (
                  <motion.div
                    key="chain"
                    className="pet-thought-chain"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  >
                    <div className="pet-chain-head">
                      <span className="pet-chain-label">思维链</span>
                      <strong>{chainResult?.reply ?? "DEMO演示"}</strong>
                    </div>
                    <div className="pet-chain-goal">
                      <span>输入目标</span>
                      <p>{submittedInput}</p>
                    </div>
                    <div className="pet-chain-steps">
                      {(chainResult?.subtasks.length ? chainResult.subtasks : ["DEMO演示"]).map((step, index) => (
                        <div key={`${step}-${index}`} className="pet-chain-step">
                          <span>{index + 1}</span>
                          <p>{step}</p>
                        </div>
                      ))}
                    </div>
                    <div className="pet-chain-footer">
                      <span>输出结果</span>
                      <strong>{chainResult?.reply ?? "DEMO演示"}</strong>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="input"
                    className="pet-chat-compose-state"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  >
                    <textarea
                      className="pet-chat-input"
                      value={input}
                      rows={2}
                      onChange={(event) => setInput(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.shiftKey) {
                          event.preventDefault();
                          void handleSubmit();
                        }
                      }}
                      placeholder="例如：帮我拆解今天 Demo"
                    />
                    <button
                      type="button"
                      className="pet-chat-send-icon"
                      onClick={() => void handleSubmit()}
                      disabled={loading}
                      aria-label="发送消息"
                    >
                      {loading ? (
                        <LoaderCircle size={18} className="spin" />
                      ) : (
                        <Send size={18} />
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}
