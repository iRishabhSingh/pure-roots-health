import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, X, Instagram } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const socials = [
  { icon: Phone, label: "Call Us", href: "tel:+919414636560" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/" },
];

const FloatingButtons = () => {
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease }}
          className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3"
        >
          <AnimatePresence>
            {expanded &&
              socials.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.6, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.6, y: 12 }}
                  transition={{ delay: i * 0.06, duration: 0.3, ease }}
                  className="w-12 h-12 rounded-full bg-foreground text-primary-foreground flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-200"
                  aria-label={s.label}
                >
                  <s.icon size={20} />
                </motion.a>
              ))}
          </AnimatePresence>

          {/* WhatsApp pill */}
          <a
            href="https://wa.me/919414636560"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp shadow-xl py-3 px-5 gap-2.5 text-[13px]"
          >
            <MessageCircle size={20} />
            <span className="hidden sm:inline">Chat on WhatsApp</span>
          </a>

          {/* Expand button */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-10 h-10 rounded-full bg-card border border-border shadow-md flex items-center justify-center hover:bg-muted transition-colors duration-200"
            aria-label="More contact options"
          >
            <motion.div
              animate={{ rotate: expanded ? 45 : 0 }}
              transition={{ duration: 0.25, ease }}
            >
              {expanded ? <X size={16} /> : <span className="font-body text-sm font-bold text-foreground">+</span>}
            </motion.div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingButtons;
