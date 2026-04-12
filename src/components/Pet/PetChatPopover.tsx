import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle, Send, X } from "lucide-react";

export function PetChatPopover({
  open,
  onSubmit,
  onClose,
}: {
  open: boolean;
  onSubmit: (input: string) => Promise<void>;
  onClose: () => void;
}) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    setLoading(true);
    try {
      await onSubmit(trimmed);
      setInput("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.section
          className="pet-chat-popover"
          initial={{ opacity: 0, x: 24, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 16, scale: 0.98 }}
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
            <div className="pet-chat-composer">
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
            </div>
          </div>
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}
