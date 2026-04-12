import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { EmployeeStatus, PetMood } from "../../data/mockData";

const moodFace: Record<PetMood, string> = {
  happy: "૮ • ﻌ - ა",
  thinking: "૮ ˶- ﻌ -˶ა",
  greeting: "૮ ˶ᵔ ᵕ ᵔ˶ ა",
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
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 2.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
    >
      <div className="pet-ears">
        <span />
        <span />
      </div>
      <div className="pet-face">
        <span className="pet-face-text">{emoji ?? moodFace[mood]}</span>
      </div>
      <div className="pet-blush">
        <span />
        <span />
      </div>
      {!small && (
        <div className="pet-crown">
          <Sparkles size={14} />
        </div>
      )}
    </motion.div>
  );
}
