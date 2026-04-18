import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const milestones = [
  { year: "1995", title: "Practice Begins", desc: "Founder begins his Ayurvedic medical practice." },
  { year: "1996", title: "Panchkarma Centre, Jaipur", desc: "Opens his first dedicated Panchkarma centre in Jaipur." },
  { year: "1998", title: "Government Posting, Himachal", desc: "Serves in a government medical posting in Himachal Pradesh." },
  { year: "1999", title: "Hometown Clinic, Nohar", desc: "Establishes the flagship Kamleshwar clinic in his hometown of Nohar." },
  { year: "2002–2007", title: "Sirsa Camps", desc: "Years of free Ayurvedic health camps across Sirsa, Haryana." },
  { year: "2009", title: "Manufacturing Begins", desc: "Launches in-house, GMP-certified manufacturing of proprietary formulations." },
  { year: "2009–2017", title: "Ganganagar Camps", desc: "Continuous community health camps across Ganganagar, Rajasthan." },
  { year: "2011–2018", title: "Gurugram & Mahendragarh Camps", desc: "Expanding reach with regular camps in Gurugram and Mahendragarh." },
  { year: "Today", title: "80,000+ Patients", desc: "30 years of practice, three clinics, and a trusted name across North India." },
];

const JourneySection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="journey" className="py-section bg-secondary/30">
      <div className="container-section" ref={ref}>
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="label-tag">Our Journey</p>
          <h2 className="heading-lg mt-3 text-foreground">
            Three decades of <em className="italic">healing</em>
          </h2>
          <p className="body-lg mt-4">
            From a single practice in 1995 to 80,000+ patients across India — a story of trust, tradition, and tenacity.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* center line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" aria-hidden />

          <div className="space-y-10">
            {milestones.map((m, i) => {
              const left = i % 2 === 0;
              return (
                <div
                  key={m.year}
                  className={`relative flex md:items-center transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  {/* dot */}
                  <span className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary ring-4 ring-background z-10" />

                  <div
                    className={`pl-12 md:pl-0 md:w-1/2 ${
                      left ? "md:pr-12 md:text-right" : "md:pl-12 md:ml-auto"
                    }`}
                  >
                    <p className="label-tag">{m.year}</p>
                    <h3 className="font-display text-xl md:text-2xl text-foreground mt-1">{m.title}</h3>
                    <p className="font-body text-sm text-muted-foreground mt-2 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
