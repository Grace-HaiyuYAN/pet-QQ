import { motion } from "framer-motion";
import type { EmployeeStatus, PetMood } from "../../data/mockData";

const moodEmoji: Record<PetMood, string> = {
  happy: "😊",
  thinking: "🤔",
  greeting: "🙂",
};

const statusTone: Record<EmployeeStatus, string> = {
  efficient: "status-efficient",
  tired: "status-tired",
  overload: "status-overload",
  normal: "status-normal",
};

interface PetAvatarProps {
  mood?: PetMood;
  emoji?: string;
  status?: EmployeeStatus;
  small?: boolean;
}

export function PetAvatar({
  mood = "happy",
  emoji,
  status = "normal",
  small = false,
}: PetAvatarProps) {
  return (
    <motion.div
      className={`pet-avatar ${statusTone[status]} ${small ? "pet-avatar-small" : ""}`}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 2.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <div className="pet-orb-core">
        <span className="pet-orb-emoji">{emoji ?? moodEmoji[mood]}</span>
      </div>
      <div className="pet-orb-glow" />
    </motion.div>
  );
}
