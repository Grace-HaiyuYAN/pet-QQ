import { useMemo } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircleMore } from "lucide-react";
import { PetAvatar } from "./PetAvatar";
import { PetBubble } from "./PetBubble";
import type { PetMood } from "../../data/mockData";

interface PetProps {
  mood: PetMood;
  message: string | null;
  onSingleClick: () => void;
  onDoubleClick: () => void;
  onDismissBubble: () => void;
}

export function Pet({
  mood,
  message,
  onSingleClick,
  onDoubleClick,
  onDismissBubble,
}: PetProps) {
  const label = useMemo(() => {
    if (mood === "thinking") return "思考中";
    if (mood === "greeting") return "陪伴中";
    return "状态很好";
  }, [mood]);

  return (
    <div className="pet-dock">
      <PetBubble message={message} onClose={onDismissBubble} />
      <motion.button
        className="pet-launcher"
        onClick={onSingleClick}
        onDoubleClick={onDoubleClick}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="pet-launcher-text">
          <span className="eyebrow">Office Pet</span>
          <strong>QQ 宠物 · AI 助手</strong>
          <span>{label}</span>
        </div>
        <PetAvatar mood={mood} status="efficient" />
        <div className="pet-launcher-icons">
          <MessageCircleMore size={16} />
          <Heart size={16} />
        </div>
      </motion.button>
    </div>
  );
}
