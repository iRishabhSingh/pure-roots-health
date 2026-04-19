import { MapPin, Phone, Navigation } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface Location {
  cityKey: "nohar" | "jaipur" | "sirsa";
  city: string;
  state: string;
  address: string;
  phone: string;
  isPrimary?: boolean;
  // lat/lon for static map preview & directions link
  lat: number;
  lon: number;
}

const locations: Location[] = [
  { cityKey: "nohar", city: "Nohar", state: "Rajasthan", address: "Founding Clinic — established 1999", phone: "+91-9414636560", isPrimary: true, lat: 29.1812, lon: 74.7723 },
  { cityKey: "jaipur", city: "Jaipur", state: "Rajasthan", address: "Panchkarma Centre — established 1996", phone: "+91-9414636560", lat: 26.9124, lon: 75.7873 },
  { cityKey: "sirsa", city: "Sirsa", state: "Haryana", address: "Consultation Centre", phone: "+91-9414636560", lat: 29.5353, lon: 75.0238 },
];

// Free OpenStreetMap static tile via the official tile server preview area.
// Uses staticmap.openstreetmap.de — no API key, returns a real PNG.
const staticMapUrl = (lat: number, lon: number) =>
  `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lon}&zoom=13&size=600x240&maptype=mapnik&markers=${lat},${lon},red-pushpin`;

const directionsUrl = (lat: number, lon: number, label: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}&destination_place_id=${encodeURIComponent(label)}`;

const LocationsSection = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="locations" className="py-section bg-secondary/40">
      <div className="container-section" ref={ref}>
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="label-tag">{t("locations.tag")}</p>
          <h2 className="heading-lg mt-3 text-foreground">
            {t("locations.title_1")} <em className="italic">{t("locations.title_em")}</em>
          </h2>
          <p className="body-lg mt-4">{t("locations.subtitle")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {locations.map((loc, i) => (
            <article
              key={loc.city}
              className={`card-glass overflow-hidden flex flex-col transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } ${loc.isPrimary ? "ring-1 ring-primary/20" : ""}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Static map thumbnail — no JS, no iframe */}
              <a
                href={directionsUrl(loc.lat, loc.lon, `${loc.city}, ${loc.state}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block h-40 bg-muted overflow-hidden group"
                aria-label={`${t("locations.open_maps")} — ${loc.city}`}
              >
                <img
                  src={staticMapUrl(loc.lat, loc.lon)}
                  alt={`Map of ${loc.city}, ${loc.state}`}
                  loading="lazy"
                  width={600}
                  height={240}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Hide broken map tile gracefully
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 bg-background/90 backdrop-blur rounded-full px-3 py-1 text-[11px] font-body font-semibold text-foreground">
                  <MapPin size={12} className="text-primary" />
                  {loc.city}
                </div>
                {loc.isPrimary && (
                  <span className="absolute top-3 right-3 font-body text-[10px] font-semibold tracking-wider uppercase bg-primary text-primary-foreground px-2.5 py-1 rounded-full">
                    {t("locations.main")}
                  </span>
                )}
              </a>

              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-display text-xl text-foreground">{loc.city}</h3>
                <p className="font-body text-xs text-muted-foreground mt-0.5">{loc.state}</p>
                <p className="font-body text-sm text-muted-foreground mt-3 leading-relaxed flex-1">
                  {loc.address}
                </p>

                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border/60">
                  <a
                    href={`tel:${loc.phone.replace(/[^+\d]/g, "")}`}
                    className="flex items-center gap-2 font-body text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    <Phone size={14} className="text-primary" />
                    {loc.phone}
                  </a>
                  <a
                    href={directionsUrl(loc.lat, loc.lon, `${loc.city}, ${loc.state}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-body text-sm font-medium text-primary hover:underline"
                  >
                    <Navigation size={14} />
                    {t("locations.directions")}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;
