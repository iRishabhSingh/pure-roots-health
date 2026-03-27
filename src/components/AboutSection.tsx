import { motion } from "framer-motion";
import { FlaskConical, Heart, CheckCircle } from "lucide-react";

const features = [
  { icon: FlaskConical, title: "Patented Formulas", desc: "Proprietary Ayurvedic formulations backed by years of research and traditional wisdom." },
  { icon: Heart, title: "Patient First", desc: "Your health and trust come before profit. Personalized care for every individual." },
  { icon: CheckCircle, title: "Proven Results", desc: "Hundreds of verified testimonials from patients who experienced holistic wellness." },
];

const AboutSection = () => (
  <section id="about" className="bg-secondary/50 section-padding">
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <span className="text-xs font-semibold tracking-widest uppercase text-accent">Our Legacy</span>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">Rooted in Tradition, Driven by Results</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          For over two decades, Kamleshwar Ayurvedic Pharmacy has been supporting kidney health and holistic wellness through authentic Ayurvedic management. Our GMP-certified processes ensure purity in every formulation.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="card-elevated p-8 text-center"
          >
            <div className="mx-auto w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
              <Icon className="text-primary" size={28} />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
