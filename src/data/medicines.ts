import kidneyImg from "@/assets/medicine-kidney.jpg";
import bloodImg from "@/assets/medicine-blood.jpg";
import digestiveImg from "@/assets/medicine-digestive.jpg";
import urinaryImg from "@/assets/medicine-urinary.jpg";

export type IssueKey =
  | "kidney"
  | "liver"
  | "blood"
  | "digestive"
  | "urinary"
  | "joints"
  | "respiratory"
  | "skin"
  | "general";

export interface Medicine {
  slug: string;
  name: string;
  hindi?: string;
  tagline: string;
  category: IssueKey;
  image: string;
  details: string;
  usage?: string;
  purpose?: string;
  timeframe?: string;
  benefits?: string[];
  precautions?: string;
  /** True for the small handful surfaced on the homepage strip. */
  featured?: boolean;
}

const fallbackImageFor = (cat: IssueKey): string => {
  switch (cat) {
    case "kidney":
    case "urinary":
      return kidneyImg;
    case "blood":
    case "skin":
      return bloodImg;
    case "digestive":
    case "liver":
      return digestiveImg;
    default:
      return urinaryImg;
  }
};

// Curated list — names sourced from the in-house product catalog.
// Copy is intentionally generic & compliant; replace as real product details land.
export const medicines: Medicine[] = [
  {
    slug: "vrikowin",
    name: "Vrikowin",
    tagline: "Kidney health support",
    category: "kidney",
    image: kidneyImg,
    details: "Proprietary kidney-support formulation with classical herbs traditionally used to support renal function and healthy creatinine levels.",
    usage: "2 teaspoons twice daily after meals.",
    purpose: "Supports kidney function and renal wellness.",
    timeframe: "Most patients notice improvements within 4–6 weeks.",
    benefits: ["Supports natural kidney function", "Promotes healthy urine output", "100% herbal · zero side-effects"],
    precautions: "Consult an Ayurvedic practitioner before starting.",
    featured: true,
  },
  {
    slug: "urostan",
    name: "Urostan",
    tagline: "Urinary tract support",
    category: "urinary",
    image: urinaryImg,
    details: "Ayurvedic formula with Varun, Gokhru and Pashanbhed for urinary comfort and healthy stone management.",
    usage: "2 teaspoons thrice daily with plenty of water.",
    purpose: "Supports urinary tract comfort.",
    timeframe: "Symptomatic relief in 2–4 weeks.",
    benefits: ["Supports urinary tract health", "Natural diuretic support", "GMP-certified quality"],
    precautions: "Increase water intake. Consult a practitioner for large stones.",
    featured: true,
  },
  {
    slug: "ykrit-cure",
    name: "Ykrit Cure",
    tagline: "Liver support",
    category: "liver",
    image: digestiveImg,
    details: "Hepato-supportive formulation traditionally used for liver wellness and detoxification.",
    featured: true,
  },
  {
    slug: "raktashodhak",
    name: "Raktashodhak Syrup",
    hindi: "रक्तशोधक सिरप",
    tagline: "Blood purification support",
    category: "blood",
    image: bloodImg,
    details: "Traditional blood purification with Neem, Manjistha and Sariva, supporting natural detoxification and skin health.",
    usage: "2 teaspoons twice daily after meals.",
    purpose: "Supports natural blood detoxification.",
    timeframe: "Visible skin improvements typically in 3–8 weeks.",
    benefits: ["Supports blood purification", "Promotes clear skin", "Aids detoxification"],
    precautions: "Avoid during acute illness without practitioner guidance.",
    featured: true,
  },
  { slug: "appticure", name: "Appticure", tagline: "Appetite support", category: "digestive", image: fallbackImageFor("digestive"), details: "Supports healthy appetite and digestive comfort." },
  { slug: "ark-kasni", name: "Ark Kasni", tagline: "Liver wellness", category: "liver", image: fallbackImageFor("liver"), details: "Classical Ark preparation traditionally used for liver support." },
  { slug: "ark-makoy", name: "Ark Makoy", tagline: "Liver & spleen support", category: "liver", image: fallbackImageFor("liver"), details: "Traditional Ark Makoy supporting liver and spleen function." },
  { slug: "ark-punarnava", name: "Ark Punarnava", tagline: "Kidney & fluid balance", category: "kidney", image: fallbackImageFor("kidney"), details: "Punarnava-based Ark traditionally used for kidney and fluid balance." },
  { slug: "avr", name: "AVR", tagline: "General wellness tonic", category: "general", image: fallbackImageFor("general"), details: "Proprietary general wellness formulation." },
  { slug: "chitrak-leham", name: "Chitrak Leham", tagline: "Digestive fire support", category: "digestive", image: fallbackImageFor("digestive"), details: "Classical leham for healthy agni and digestion." },
  { slug: "colinor", name: "Colinor", tagline: "Colon comfort", category: "digestive", image: fallbackImageFor("digestive"), details: "Supports colon comfort and regularity." },
  { slug: "colispadmin", name: "Colispadmin", tagline: "Digestive comfort", category: "digestive", image: fallbackImageFor("digestive"), details: "Proprietary digestive comfort formulation." },
  { slug: "jatherzyme", name: "Jatherzyme (JJ)", tagline: "Digestive enzyme support", category: "digestive", image: fallbackImageFor("digestive"), details: "Enzyme-style digestive support." },
  { slug: "kushmandavleham", name: "Kushmandavleham", tagline: "Respiratory & vitality", category: "respiratory", image: fallbackImageFor("respiratory"), details: "Classical Kushmanda leham for respiratory wellness and vitality." },
  { slug: "purexime", name: "Purexime", tagline: "Detox support", category: "blood", image: fallbackImageFor("blood"), details: "Supports natural detoxification." },
  { slug: "renewal-g", name: "Renewal-G", tagline: "Renal renewal support", category: "kidney", image: fallbackImageFor("kidney"), details: "Kidney renewal support formulation." },
  { slug: "respocare", name: "Respocare", tagline: "Respiratory support", category: "respiratory", image: fallbackImageFor("respiratory"), details: "Supports respiratory comfort and clear airways." },
  { slug: "rumate", name: "Rumate", tagline: "Joint comfort", category: "joints", image: fallbackImageFor("joints"), details: "Supports joint comfort and mobility." },
  { slug: "sanigdha", name: "Sanigdha", tagline: "Skin & glow", category: "skin", image: fallbackImageFor("skin"), details: "Supports healthy, glowing skin." },
  { slug: "synergy", name: "Synergy", tagline: "Daily wellness", category: "general", image: fallbackImageFor("general"), details: "Daily wellness blend." },
  { slug: "udarin", name: "Udarin", tagline: "Abdominal comfort", category: "digestive", image: fallbackImageFor("digestive"), details: "Supports abdominal comfort." },
  { slug: "vrr", name: "VRR", tagline: "Renal & urinary", category: "kidney", image: fallbackImageFor("kidney"), details: "Supports renal and urinary wellness." },
];

export const issueChips: { key: IssueKey | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "kidney", label: "Kidney" },
  { key: "urinary", label: "Urinary" },
  { key: "liver", label: "Liver" },
  { key: "digestive", label: "Digestive" },
  { key: "blood", label: "Blood / Skin" },
  { key: "joints", label: "Joints" },
  { key: "respiratory", label: "Respiratory" },
  { key: "general", label: "General wellness" },
];

const WHATSAPP_NUMBER = "919414636560";

export const whatsappConsultUrl = (med: Medicine) => {
  const text = `Namaste! I would like to consult about *${med.name}* (${med.tagline}). Please share more details and guidance.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};

export const whatsappGeneralUrl = (note?: string) => {
  const text = note
    ? `Namaste! ${note}`
    : "Namaste! I'd like to book a free Ayurvedic consultation.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};
