import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Instagram, Facebook } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const PHONE = "+919414636560";
const WHATSAPP = "919414636560";

// Crisp WhatsApp glyph (white on green)
const WhatsAppIcon = ({ size = 26 }: { size?: number }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M19.11 17.27c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.21 5.1 4.5.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
    <path d="M27.32 4.66C24.32 1.66 20.34 0 16.1 0 7.39 0 .3 7.09.3 15.8c0 2.78.73 5.5 2.11 7.89L0 32l8.51-2.23a15.79 15.79 0 0 0 7.59 1.93h.01c8.71 0 15.8-7.09 15.8-15.8 0-4.22-1.65-8.19-4.59-11.24zM16.11 29c-2.41 0-4.78-.65-6.85-1.87l-.49-.29-5.05 1.32 1.35-4.92-.32-.51A13.1 13.1 0 0 1 2.93 15.8C2.93 8.55 8.86 2.62 16.1 2.62c3.51 0 6.81 1.37 9.29 3.85a13.05 13.05 0 0 1 3.85 9.29c0 7.27-5.91 13.24-13.13 13.24z" />
  </svg>
);

// Solid filled phone (handset)
const PhoneIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M19.23 15.26l-2.54-.29a1.5 1.5 0 0 0-1.27.43l-1.84 1.84a14.06 14.06 0 0 1-6.82-6.82l1.85-1.85a1.5 1.5 0 0 0 .43-1.27l-.29-2.52A1.5 1.5 0 0 0 7.26 3.4H4.83A1.49 1.49 0 0 0 3.34 5C3.85 14.34 9.66 20.15 19 20.66a1.5 1.5 0 0 0 1.6-1.49V16.74a1.5 1.5 0 0 0-1.37-1.48z" />
  </svg>
);

// Twitter / X (filled)
const XIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const extras = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/", bg: "linear-gradient(135deg, hsl(330 75% 55%), hsl(15 90% 55%))" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com/", bg: "hsl(220 75% 50%)" },
  { icon: XIcon, label: "X (Twitter)", href: "https://x.com/", bg: "hsl(0 0% 8%)" },
];

const FloatingButtons = () => {
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 240);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease }}
          className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3"
        >
          {/* Expanded socials */}
          <AnimatePresence>
            {expanded &&
              extras.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.6, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.6, y: 12 }}
                    transition={{ delay: i * 0.05, duration: 0.25, ease }}
                    className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-200"
                    style={{ background: s.bg, color: "hsl(0 0% 100%)" }}
                    aria-label={s.label}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
          </AnimatePresence>

          {/* Phone — accent (warm copper) */}
          <motion.a
            href={`tel:${PHONE}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease, delay: 0.05 }}
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform duration-200"
            style={{ background: "hsl(var(--accent))", color: "hsl(var(--accent-foreground))" }}
            aria-label="Call us"
          >
            <PhoneIcon size={22} />
          </motion.a>

          {/* WhatsApp — official green */}
          <motion.a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease, delay: 0.1 }}
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform duration-200"
            style={{ background: "hsl(142 70% 45%)", color: "hsl(0 0% 100%)" }}
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppIcon size={26} />
          </motion.a>

          {/* Expand toggle */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-10 h-10 rounded-full bg-card border border-border shadow-md flex items-center justify-center hover:bg-muted transition-colors duration-200"
            aria-label={expanded ? "Hide social links" : "Show more contact options"}
            aria-expanded={expanded}
          >
            <motion.div animate={{ rotate: expanded ? 45 : 0 }} transition={{ duration: 0.25, ease }}>
              {expanded ? <X size={16} className="text-foreground" /> : <Plus size={16} className="text-foreground" />}
            </motion.div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingButtons;
