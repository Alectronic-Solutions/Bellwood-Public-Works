"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface HomeHeroProps {
  heading: string;
  mission: string;
}

export function HomeHero({ heading, mission }: HomeHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let ticking = false;

    function handleScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (rect) {
          setOffset(rect.top * 0.3);
        }
        ticking = false;
      });
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={sectionRef} className="relative h-72 w-full overflow-hidden sm:h-[28rem] lg:h-[36rem]">
      <div className="absolute inset-0 -top-16 -bottom-16" style={{ transform: `translateY(${offset}px)` }}>
        <Image
          src="/images/hero/hero-home.jpg"
          alt="An aerial view of a Bellwood Public Works construction crew in hard hats and safety vests inspecting a reinforced concrete work site"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-gov-navy/20" aria-hidden="true" />
      <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-center px-4 sm:px-6">
        <div className="max-w-xl bg-gov-navy px-4 py-4 sm:px-8 sm:py-8">
          <h1 className="text-2xl font-bold text-white sm:text-4xl lg:text-5xl">{heading}</h1>
          <p className="mt-3 text-base text-white sm:text-lg">{mission}</p>
        </div>
      </div>
    </div>
  );
}
