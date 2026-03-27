import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const locations = [
  { city: "Jaipur", address: "Main Branch — Tonk Road, Jaipur, Rajasthan", phone: "+91-9414636560" },
  { city: "Delhi", address: "Consultation Center — Lajpat Nagar, New Delhi", phone: "+91-9414636560" },
  { city: "Lucknow", address: "Partner Clinic — Hazratganj, Lucknow, UP", phone: "+91-9414636560" },
  { city: "Mumbai", address: "Consultation Center — Andheri West, Mumbai", phone: "+91-9414636560" },
];

const LocationsSection = () => (
  <section id="locations" className="section-padding">
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <span className="text-xs font-semibold tracking-widest uppercase text-accent">Our Presence</span>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">Find Us Near You</h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {locations.map((loc, i) => (
          <motion.div
            key={loc.city}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="card-elevated p-6 text-center"
          >
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <MapPin className="text-primary" size={22} />
            </div>
            <h3 className="font-bold text-foreground text-lg">{loc.city}</h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{loc.address}</p>
            <a href={`tel:${loc.phone.replace(/[^+\d]/g, "")}`} className="inline-block mt-3 text-sm font-semibold text-primary hover:underline">
              {loc.phone}
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default LocationsSection;
