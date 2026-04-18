import { Leaf } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  const links = [
    {
      title: t("footer.navigate"),
      items: [
        { label: t("nav.about"), href: "#about" },
        { label: t("nav.journey"), href: "#journey" },
        { label: t("nav.medicines"), href: "#medicines" },
        { label: t("nav.certifications"), href: "#certifications" },
        { label: t("nav.results"), href: "#testimonials" },
        { label: t("locations.tag"), href: "#locations" },
      ],
    },
    {
      title: t("footer.contact"),
      items: [
        { label: "+91-9414636560", href: "tel:+919414636560" },
        { label: "kamleshwarayurved@gmail.com", href: "mailto:kamleshwarayurved@gmail.com" },
        { label: "Tonk Road, Jaipur", href: "#locations" },
      ],
    },
  ];

  return (
    <footer className="py-16 md:py-20" style={{ background: "hsl(160 15% 12%)", color: "hsl(38 20% 80%)" }}>
      <div className="container-section">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2 min-w-0">
            <div className="flex items-center gap-2.5 mb-5">
              <Leaf size={22} style={{ color: "hsl(160 35% 50%)" }} />
              <span className="font-display text-xl italic" style={{ color: "hsl(38 20% 92%)" }}>
                Kamleshwar
              </span>
            </div>
            <p className="font-body text-sm leading-relaxed max-w-sm opacity-70">{t("footer.tagline")}</p>
          </div>
          {links.map((group) => (
            <div key={group.title} className="min-w-0">
              <h4 className="font-body font-semibold text-sm mb-5" style={{ color: "hsl(38 20% 92%)" }}>
                {group.title}
              </h4>
              <nav className="flex flex-col gap-3">
                {group.items.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="font-body text-sm opacity-60 hover:opacity-100 transition-opacity duration-300 break-all sm:break-words"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t text-center" style={{ borderColor: "hsl(0 0% 100% / 0.08)" }}>
          <p className="font-body text-xs opacity-40">
            © {new Date().getFullYear()} Kamleshwar Ayurvedic Pharmacy. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
