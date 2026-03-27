import { useState } from "react";
import { Send, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(10, "Enter a valid phone number").max(15),
  concern: z.string().trim().min(1, "Please describe your concern").max(500),
});

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", phone: "", concern: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { ref, isVisible } = useScrollReveal();

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
    <section id="contact" className="py-section">
      <div className="container-section" ref={ref}>
        {/* CTA Banner */}
        <div
          className={`rounded-3xl p-10 md:p-16 mb-20 text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ background: "linear-gradient(135deg, hsl(160 35% 22%), hsl(160 30% 16%))" }}
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary-foreground leading-tight">
            Start your healing journey <em className="italic">today</em>
          </h2>
          <p className="font-body text-sm md:text-base mt-4 max-w-md mx-auto" style={{ color: "hsl(38 25% 75%)" }}>
            Get a free personalized consultation from our Ayurvedic experts. No obligation, just guidance.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a href="https://wa.me/919414636560" target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              WhatsApp Us
              <ArrowRight size={16} />
            </a>
            <a href="tel:+919414636560" className="btn-outline border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10">
              <Phone size={16} />
              Call Now
            </a>
          </div>
        </div>

        {/* Form + Info */}
        <div
          className={`grid lg:grid-cols-5 gap-14 lg:gap-20 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Info */}
          <div className="lg:col-span-2">
            <p className="label-tag">Get In Touch</p>
            <h2 className="heading-md mt-3 text-foreground font-display">
              We'd love to <em className="italic">hear from you</em>
            </h2>
            <p className="body-lg mt-4 text-sm">
              Fill out the form or reach us directly. Our team responds within 24 hours.
            </p>
            <div className="mt-10 space-y-6">
              {[
                { icon: Phone, label: "+91-9414636560", href: "tel:+919414636560" },
                { icon: Mail, label: "kamleshwarayurved@gmail.com", href: "mailto:kamleshwarayurved@gmail.com" },
                { icon: MapPin, label: "Tonk Road, Jaipur, Rajasthan", href: "#locations" },
              ].map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-300">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <span className="font-body text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5">
            {[
              { key: "name", label: "Full Name", type: "text", placeholder: "Your name" },
              { key: "phone", label: "Phone Number", type: "tel", placeholder: "+91 XXXXX XXXXX" },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label className="font-body text-sm font-medium text-foreground">{label}</label>
                <input
                  type={type}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder}
                  className="mt-2 w-full px-5 py-3.5 rounded-xl bg-card/60 border border-border text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all duration-300 font-body text-sm"
                />
                {errors[key] && <p className="font-body text-xs text-destructive mt-1.5">{errors[key]}</p>}
              </div>
            ))}
            <div>
              <label className="font-body text-sm font-medium text-foreground">Health Concern</label>
              <textarea
                value={form.concern}
                onChange={(e) => setForm({ ...form, concern: e.target.value })}
                placeholder="Briefly describe your health concern..."
                rows={4}
                className="mt-2 w-full px-5 py-3.5 rounded-xl bg-card/60 border border-border text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all duration-300 font-body text-sm resize-none"
              />
              {errors.concern && <p className="font-body text-xs text-destructive mt-1.5">{errors.concern}</p>}
            </div>
            <button type="submit" className="btn-primary w-full sm:w-auto">
              <Send size={15} />
              Send Consultation Request
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
