import { useState, useRef } from "react";
import { Star, Play, X, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Jaipur, Rajasthan",
    text: "After years of kidney health concerns, Kamleshwar's personalized Ayurvedic approach gave me a new lease on life. Their genuine care and authentic medicines made all the difference.",
    rating: 5,
    videoId: "dQw4w9WgXcQ",
    hasVideo: true,
  },
  {
    name: "Priya Sharma",
    location: "New Delhi",
    text: "The blood purification formulation transformed my skin health within months. I finally found something natural that actually works. The team is incredibly supportive.",
    rating: 5,
    hasVideo: false,
  },
  {
    name: "Meera Patel",
    location: "Mumbai, Maharashtra",
    text: "I was skeptical about Ayurveda until I visited Kamleshwar. The personalized consultation, genuine medicines, and follow-up care convinced me. Truly authentic healing.",
    rating: 5,
    videoId: "dQw4w9WgXcQ",
    hasVideo: true,
  },
  {
    name: "Sunil Verma",
    location: "Lucknow, UP",
    text: "Their holistic approach to kidney wellness is remarkable. After 6 months, my reports showed significant improvement. I recommend Kamleshwar to everyone I know.",
    rating: 5,
    hasVideo: false,
  },
  {
    name: "Anita Desai",
    location: "Ahmedabad, Gujarat",
    text: "The Urostan syrup has been life-changing for my urinary health concerns. No side effects, just pure Ayurvedic care. The clinic staff are warm and professional.",
    rating: 5,
    videoId: "dQw4w9WgXcQ",
    hasVideo: true,
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

const TestimonialsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [videoPlaying, setVideoPlaying] = useState<string | null>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.8;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section id="testimonials" className="py-section">
      <div ref={ref}>
        <div className="container-section">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="label-tag">Patient Stories</p>
              <h2 className="heading-lg mt-3 text-foreground">
                Real <em className="italic">results,</em> real people
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:bg-card transition-colors duration-300"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:bg-card transition-colors duration-300"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable cards */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-5 sm:px-8 lg:px-12 pb-4"
          style={{ scrollbarWidth: "none" }}
        >
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`flex-shrink-0 w-[320px] sm:w-[380px] snap-start card-glass p-7 flex flex-col justify-between transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div>
                <Quote size={28} className="text-primary/15 mb-4" />
                <p className="font-body text-sm text-foreground leading-relaxed">"{t.text}"</p>
              </div>

              <div className="mt-6">
                {/* Video thumbnail */}
                {t.hasVideo && (
                  <button
                    onClick={() => setVideoPlaying(t.videoId || null)}
                    className="w-full mb-4 relative group rounded-xl overflow-hidden bg-muted aspect-video"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${t.videoId}/hqdefault.jpg`}
                      alt={`${t.name} video testimonial`}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center group-hover:bg-foreground/40 transition-colors duration-300">
                      <div className="w-12 h-12 rounded-full bg-background/90 flex items-center justify-center">
                        <Play size={18} className="text-primary ml-0.5" />
                      </div>
                    </div>
                  </button>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-body font-semibold text-sm text-foreground">{t.name}</p>
                    <p className="font-body text-xs text-muted-foreground mt-0.5">{t.location}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} size={12} className="text-accent fill-accent" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust stats */}
        <div className="container-section mt-16">
          <div
            className={`grid grid-cols-3 gap-8 md:gap-16 text-center py-10 border-y border-border/50 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {[
              { value: "5,000+", label: "Patients Helped" },
              { value: "20+", label: "Years of Practice" },
              { value: "4", label: "Locations" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl md:text-4xl text-primary">{s.value}</p>
                <p className="font-body text-xs sm:text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {videoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "hsl(160 15% 12% / 0.85)" }}
            onClick={() => setVideoPlaying(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease }}
              className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${videoPlaying}?autoplay=1`}
                title="Patient testimonial video"
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
              <button
                onClick={() => setVideoPlaying(null)}
                className="absolute top-3 right-3 w-9 h-9 bg-background/80 rounded-full flex items-center justify-center"
                aria-label="Close video"
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TestimonialsSection;
