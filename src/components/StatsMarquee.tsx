import { Children, type CSSProperties, type ReactNode } from 'react';

interface StatsMarqueeProps {
  children: ReactNode;
}

export default function StatsMarquee({ children }: StatsMarqueeProps) {
  const items = Children.toArray(children);
  const style = { '--stats-count': items.length } as CSSProperties;

  return (
    <div
      className="stats-marquee rounded-2xl bg-gradient-to-r from-primary-600 via-primary-500 to-primary-700 py-2 shadow-lg shadow-primary-500/25 dark:from-primary-900 dark:via-primary-800 dark:to-primary-700"
      style={style}
    >
      <div className="stats-marquee-track">
        {items.map((child, index) => (
          <div key={`set-a-${index}`} className="stats-marquee-item">
            {child}
          </div>
        ))}
        {items.map((child, index) => (
          <div key={`set-b-${index}`} className="stats-marquee-item" aria-hidden="true">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
