import { MapPin, Phone } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const locations = [
  { city: "Nohar", state: "Rajasthan", address: "Founding Clinic — established 1999", phone: "+91-9414636560", isPrimary: true },
  { city: "Jaipur", state: "Rajasthan", address: "Panchkarma Centre — established 1996", phone: "+91-9414636560", isPrimary: false },
  { city: "Sirsa", state: "Haryana", address: "Consultation Centre", phone: "+91-9414636560", isPrimary: false },
];

const LocationsSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="locations" className="py-section bg-secondary/40">
      <div className="container-section" ref={ref}>
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="label-tag">Our Presence</p>
          <h2 className="heading-lg mt-3 text-foreground">
            Find us <em className="italic">near you</em>
          </h2>
          <p className="body-lg mt-4">Visit us at any of our locations for a personalized consultation.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {locations.map((loc, i) => (
            <div
              key={loc.city}
              className={`card-glass p-6 relative overflow-hidden transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } ${loc.isPrimary ? "ring-1 ring-primary/20" : ""}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {loc.isPrimary && (
                <span className="absolute top-4 right-4 font-body text-[10px] font-semibold tracking-wider uppercase bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                  Main
                </span>
              )}
              <div className="w-11 h-11 rounded-full bg-primary/8 flex items-center justify-center mb-5">
                <MapPin size={20} className="text-primary" />
              </div>
              <h3 className="font-display text-2xl text-foreground">{loc.city}</h3>
              <p className="font-body text-xs text-muted-foreground mt-0.5">{loc.state}</p>
              <p className="font-body text-sm text-muted-foreground mt-3 leading-relaxed">{loc.address}</p>
              <a
                href={`tel:${loc.phone.replace(/[^+\d]/g, "")}`}
                className="mt-4 flex items-center gap-2 font-body text-sm font-medium text-primary hover:underline"
              >
                <Phone size={14} />
                {loc.phone}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;
