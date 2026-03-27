import { Leaf } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground section-padding">
    <div className="section-container">
      <div className="grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Leaf size={24} />
            <span className="font-display text-xl font-bold">Kamleshwar</span>
          </div>
          <p className="text-sm opacity-70 leading-relaxed max-w-xs">
            Authentic Ayurvedic wellness for kidney health, blood purification, and holistic healing. GMP-certified since 2003.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <nav className="flex flex-col gap-2">
            {["Home", "About", "Medicines", "Testimonials", "Locations", "Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                {l}
              </a>
            ))}
          </nav>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <div className="space-y-2 text-sm opacity-70">
            <p>+91-9414636560</p>
            <p>kamleshwarayurved@gmail.com</p>
            <p>Tonk Road, Jaipur, Rajasthan</p>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-xs opacity-50">
        © {new Date().getFullYear()} Kamleshwar Ayurvedic Pharmacy. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
