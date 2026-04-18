import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Shield, FlaskConical, Heart, Users } from "lucide-react";
import clinicImg from "@/assets/clinic-interior.jpg";

const pillars = [
  { icon: FlaskConical, title: "Charak Samhita Based", desc: "Proprietary formulations rooted in classical Ayurvedic texts" },
  { icon: Shield, title: "GMP Certified", desc: "In-house manufacturing since 2009 — 100% herbal, zero side-effects" },
  { icon: Heart, title: "Patient First", desc: "Personalized care plans for every individual" },
  { icon: Users, title: "80,000+ Patients", desc: "Three decades of trusted care across India" },
];

const AboutSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="about" className="py-section">
      <div className="container-section">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="rounded-3xl overflow-hidden">
              <img
                src={clinicImg}
                alt="Kamleshwar Ayurvedic clinic consultation"
                loading="lazy"
                width={1200}
                height={800}
                className="w-full h-[400px] md:h-[520px] object-cover"
              />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-4 md:right-8 card-glass p-5 pr-10 shadow-xl">
              <p className="font-display text-3xl text-primary">30+</p>
              <p className="font-body text-sm text-muted-foreground">Years of Healing · Since 1995</p>
            </div>
          </div>

          {/* Text */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="label-tag">Our Legacy</p>
            <h2 className="heading-lg mt-3 text-foreground">
              Rooted in tradition,{" "}
              <em className="italic">driven by results</em>
            </h2>
            <p className="body-lg mt-6 max-w-lg">
              Since 1995, Kamleshwar Ayurvedic Pharmacy has been at the forefront of kidney
              health and blood purification. Our Charak Samhita-based formulations are
              manufactured in-house since 2009 — 100% herbal, with zero side-effects.
            </p>

            <a
              href="#certifications"
              className="inline-flex items-center gap-2 mt-6 text-sm font-body font-medium text-primary hover:underline"
            >
              View our certifications →
            </a>

            <div className="grid grid-cols-2 gap-5 mt-10">
              {pillars.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="group">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-3 group-hover:bg-primary/15 transition-colors duration-300">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-body font-semibold text-sm text-foreground">{title}</h3>
                  <p className="font-body text-xs text-muted-foreground mt-1 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
