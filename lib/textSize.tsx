"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "bpw-text-size";
const MIN_STEP = 0;
const MAX_STEP = 2;

interface TextSizeContextValue {
  step: number;
  increase: () => void;
  decrease: () => void;
  reset: () => void;
}

const TextSizeContext = createContext<TextSizeContextValue | null>(null);

export function TextSizeProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? Number.parseInt(stored, 10) : 0;
    if (!Number.isNaN(parsed) && parsed >= MIN_STEP && parsed <= MAX_STEP) {
      setStep(parsed);
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = step === 0 ? "" : `${100 + step * 12.5}%`;
    window.localStorage.setItem(STORAGE_KEY, String(step));
  }, [step]);

  const value = useMemo<TextSizeContextValue>(
    () => ({
      step,
      increase: () => setStep((current) => Math.min(MAX_STEP, current + 1)),
      decrease: () => setStep((current) => Math.max(MIN_STEP, current - 1)),
      reset: () => setStep(0),
    }),
    [step],
  );

  return <TextSizeContext.Provider value={value}>{children}</TextSizeContext.Provider>;
}

export function useTextSize() {
  const context = useContext(TextSizeContext);
  if (!context) {
    throw new Error("useTextSize must be used within a TextSizeProvider");
  }
  return context;
}
