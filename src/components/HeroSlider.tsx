import { useCallback, useEffect, useState } from 'react';
import { slides } from '../data/slides';

const AUTO_PLAY_INTERVAL = 6000;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent((index + slides.length) % slides.length);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [isTransitioning],
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [next]);

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
            <a href={slide.ctaLink} className="btn-hero">
              {slide.ctaText}
              <svg className="h-5 w-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={prev}
        aria-label="الشريحة السابقة"
        className="btn-nav-icon-hero absolute right-4 top-1/2 z-20 h-12 w-12 -translate-y-1/2 sm:right-8"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <button
        type="button"
        onClick={next}
        aria-label="الشريحة التالية"
        className="btn-nav-icon-hero absolute left-4 top-1/2 z-20 h-12 w-12 -translate-y-1/2 sm:left-8"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

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
