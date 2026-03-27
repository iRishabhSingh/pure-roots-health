import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(10, "Enter a valid phone number").max(15),
  concern: z.string().trim().min(1, "Please describe your concern").max(500),
});

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", phone: "", concern: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    const msg = encodeURIComponent(`Hi, I'm ${form.name}. My concern: ${form.concern}. Phone: ${form.phone}`);
    window.open(`https://wa.me/919414636560?text=${msg}`, "_blank");
    toast.success("Redirecting to WhatsApp...");
    setForm({ name: "", phone: "", concern: "" });
  };

  return (
    <section id="contact" className="bg-secondary/50 section-padding">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-semibold tracking-widest uppercase text-accent">Get In Touch</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">Your Journey to Healing</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Experience authentic Ayurveda. Get a personalized consultation and genuine medicines tailored to your needs.
            </p>

            <div className="mt-8 space-y-5">
              {[
                { icon: Phone, label: "+91-9414636560", href: "tel:+919414636560" },
                { icon: Mail, label: "kamleshwarayurved@gmail.com", href: "mailto:kamleshwarayurved@gmail.com" },
                { icon: MapPin, label: "Tonk Road, Jaipur, Rajasthan", href: "#locations" },
              ].map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <span className="text-sm">{label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            onSubmit={handleSubmit}
            className="card-elevated p-6 md:p-8 space-y-5"
          >
            {[
              { key: "name", label: "Full Name", type: "text", placeholder: "Your name" },
              { key: "phone", label: "Phone Number", type: "tel", placeholder: "+91 XXXXX XXXXX" },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label className="text-sm font-medium text-foreground">{label}</label>
                <input
                  type={type}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder}
                  className="mt-1.5 w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all text-sm"
                />
                {errors[key] && <p className="text-xs text-destructive mt-1">{errors[key]}</p>}
              </div>
            ))}
            <div>
              <label className="text-sm font-medium text-foreground">Health Concern</label>
              <textarea
                value={form.concern}
                onChange={(e) => setForm({ ...form, concern: e.target.value })}
                placeholder="Briefly describe your health concern..."
                rows={4}
                className="mt-1.5 w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all text-sm resize-none"
              />
              {errors.concern && <p className="text-xs text-destructive mt-1">{errors.concern}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <Send size={16} />
              Send via WhatsApp
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
