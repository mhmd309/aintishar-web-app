import { Children, type CSSProperties, type ReactNode } from 'react';

interface StatsMarqueeProps {
  children: ReactNode;
}

export default function StatsMarquee({ children }: StatsMarqueeProps) {
  const items = Children.toArray(children);
  const style = { '--stats-count': items.length } as CSSProperties;

  return (
    <div className="stats-marquee" style={style}>
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
