import { useState, useEffect } from "react";
import { Menu, X, Leaf } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.journey"), href: "#journey" },
    { label: t("nav.medicines"), href: "#medicines" },
    { label: t("nav.certifications"), href: "#certifications" },
    { label: t("nav.results"), href: "#testimonials" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-9 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/90 backdrop-blur-xl shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container-section flex items-center justify-between h-16 md:h-20 gap-4">
        <a href="#home" className="flex items-center gap-2.5 group flex-shrink-0">
          <Leaf className="h-6 w-6 text-primary transition-transform duration-300 group-hover:rotate-12" />
          <span className="font-display text-xl text-foreground italic">Kamleshwar</span>
        </a>

        <div className="hidden lg:flex items-center gap-6 xl:gap-10 min-w-0">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-body text-[13px] font-medium tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300 whitespace-nowrap"
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary text-[13px] px-5 xl:px-6 py-2.5 whitespace-nowrap">
            {t("nav.book")}
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-foreground p-1 flex-shrink-0"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden bg-background/95 backdrop-blur-xl"
          >
            <div className="container-section py-6 flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="font-body text-base font-medium text-foreground py-3 border-b border-border/30"
                >
                  {l.label}
                </motion.a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-4 text-center">
                {t("nav.book")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
