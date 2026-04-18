import { Leaf } from "lucide-react";

const links = [
  { title: "Navigate", items: [
    { label: "About", href: "#about" },
    { label: "Our Journey", href: "#journey" },
    { label: "Medicines", href: "#medicines" },
    { label: "Certifications", href: "#certifications" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Locations", href: "#locations" },
  ]},
  { title: "Contact", items: [
    { label: "+91-9414636560", href: "tel:+919414636560" },
    { label: "kamleshwarayurved@gmail.com", href: "mailto:kamleshwarayurved@gmail.com" },
    { label: "Tonk Road, Jaipur", href: "#locations" },
  ]},
];

const Footer = () => (
  <footer className="py-16 md:py-20" style={{ background: "hsl(160 15% 12%)", color: "hsl(38 20% 80%)" }}>
    <div className="container-section">
      <div className="grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5 mb-5">
            <Leaf size={22} style={{ color: "hsl(160 35% 50%)" }} />
            <span className="font-display text-xl italic" style={{ color: "hsl(38 20% 92%)" }}>Kamleshwar</span>
          </div>
          <p className="font-body text-sm leading-relaxed max-w-sm opacity-70">
            Authentic Ayurvedic wellness for kidney health, blood purification, and holistic healing. GMP-certified pharmacy serving 80,000+ patients since 1995.
          </p>
        </div>
        {links.map((group) => (
          <div key={group.title}>
            <h4 className="font-body font-semibold text-sm mb-5" style={{ color: "hsl(38 20% 92%)" }}>
              {group.title}
            </h4>
            <nav className="flex flex-col gap-3">
              {group.items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-body text-sm opacity-60 hover:opacity-100 transition-opacity duration-300"
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
          © {new Date().getFullYear()} Kamleshwar Ayurvedic Pharmacy. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
