import { useEffect, useState, useCallback } from "react";

const KEY = "font_scale";
const STEPS = [0.9, 1, 1.125, 1.25] as const;
type Scale = (typeof STEPS)[number];

const isScale = (v: number): v is Scale => (STEPS as readonly number[]).includes(v);

export function useFontScale() {
  const [scale, setScale] = useState<Scale>(1);

  useEffect(() => {
    const stored = parseFloat(localStorage.getItem(KEY) || "1");
    const next = isScale(stored) ? stored : 1;
    setScale(next);
    document.documentElement.style.fontSize = `${next * 100}%`;
  }, []);

  const apply = useCallback((next: Scale) => {
    setScale(next);
    document.documentElement.style.fontSize = `${next * 100}%`;
    localStorage.setItem(KEY, String(next));
  }, []);

  const dec = useCallback(() => {
    const i = STEPS.indexOf(scale);
    if (i > 0) apply(STEPS[i - 1]);
  }, [scale, apply]);

  const inc = useCallback(() => {
    const i = STEPS.indexOf(scale);
    if (i < STEPS.length - 1) apply(STEPS[i + 1]);
  }, [scale, apply]);

  const reset = useCallback(() => apply(1), [apply]);

  return { scale, dec, inc, reset, canDec: scale > STEPS[0], canInc: scale < STEPS[STEPS.length - 1] };
}
