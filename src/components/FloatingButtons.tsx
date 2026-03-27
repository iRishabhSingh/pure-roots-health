import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, X, Instagram } from "lucide-react";

const socials = [
  { icon: Phone, label: "Call Us", href: "tel:+919414636560", color: "bg-primary" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/", color: "bg-accent" },
];

const FloatingButtons = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {expanded &&
          socials.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              transition={{ delay: i * 0.08 }}
              className={`${s.color} text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform`}
              aria-label={s.label}
            >
              <s.icon size={20} />
            </motion.a>
          ))}
      </AnimatePresence>

      {/* WhatsApp main */}
      <a
        href="https://wa.me/919414636560"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[hsl(142,70%,40%)] text-primary-foreground w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
        aria-label="WhatsApp"
      >
        <MessageCircle size={26} />
      </a>

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="bg-foreground text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="More options"
      >
        {expanded ? <X size={18} /> : <span className="text-xs font-bold">+</span>}
      </button>
    </div>
  );
};

export default FloatingButtons;
