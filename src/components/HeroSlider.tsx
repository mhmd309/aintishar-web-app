import { useCallback, useEffect, useRef, useState } from 'react';
import { slides } from '../data/slides';
import { isSafeHref } from '../utils/security';

const AUTO_PLAY_INTERVAL = 6000;
const TRANSITION_MS = 500;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const isTransitioningRef = useRef(false);

  const goTo = useCallback((index: number) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setCurrent(((index % slides.length) + slides.length) % slides.length);
    window.setTimeout(() => {
      isTransitioningRef.current = false;
    }, TRANSITION_MS);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, AUTO_PLAY_INTERVAL);
    return () => window.clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section id="home" className="relative h-screen min-h-[600px] w-full overflow-hidden">
      {slides.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={index !== current}
        >
          <img src={s.image} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-slate-900/90 via-slate-900/65 to-slate-900/35" />
        </div>
      ))}

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div key={slide.id} className="max-w-2xl animate-fade-in">
            <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              {slide.heading}
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-gray-200 sm:text-xl">
              {slide.description}
            </p>
            {isSafeHref(slide.ctaLink) ? (
              <a href={slide.ctaLink} className="btn-hero">
                {slide.ctaText}
                <svg className="h-5 w-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            ) : (
              <span className="btn-hero cursor-default">{slide.ctaText}</span>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`الانتقال إلى الشريحة ${index + 1}`}
            aria-current={index === current ? 'true' : undefined}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === current
                ? 'w-8 bg-primary-400'
                : 'w-2.5 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
