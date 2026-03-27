import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Jaipur",
    text: "After years of kidney health concerns, Kamleshwar's Ayurvedic approach has supported my wellness journey tremendously. I feel more energetic and healthier than ever.",
  },
  {
    name: "Priya Sharma",
    location: "Delhi",
    text: "The blood purification formulation has been a part of my routine for months. My skin feels clearer and I feel more balanced overall. Truly authentic Ayurveda.",
  },
  {
    name: "Meera Patel",
    location: "Mumbai",
    text: "I was skeptical at first, but the personalized consultation and natural medicines genuinely helped support my health. The team is caring and professional.",
  },
  {
    name: "Sunil Verma",
    location: "Lucknow",
    text: "Their holistic approach to kidney wellness is remarkable. The medicines are pure and the results speak for themselves. Highly recommended.",
  },
];

const stats = [
  { value: "100+", label: "Testimonials" },
  { value: "20+", label: "Years" },
  { value: "GMP", label: "Certified" },
];

const TestimonialsSection = () => (
  <section id="testimonials" className="bg-secondary/50 section-padding">
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <span className="text-xs font-semibold tracking-widest uppercase text-accent">Patient Stories</span>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">Real Results</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="card-elevated p-6 md:p-8"
          >
            <Quote size={24} className="text-primary/30 mb-4" />
            <p className="text-muted-foreground leading-relaxed italic">"{t.text}"</p>
            <div className="mt-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-display font-bold text-primary text-sm">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.location}</p>
              </div>
              <div className="ml-auto flex gap-0.5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} className="text-accent fill-accent" />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center gap-12 md:gap-20">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-3xl md:text-4xl font-display font-bold text-primary">{s.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
