import { AnimatePresence, motion } from "framer-motion";

export function PetBubble({
  message,
  onClose,
}: {
  message: string | null;
  onClose?: () => void;
}) {
  return (
    <AnimatePresence>
      {message ? (
        <motion.div
          className="pet-bubble"
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <p>{message}</p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
