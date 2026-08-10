import { COMPANY } from '../data/company';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  variant?: 'default' | 'light';
}

export default function Logo({
  className = '',
}: LogoProps) {
  return (
    <a
      href="#home"
      className={`flex items-center ${className}`}
      aria-label={COMPANY.name}
    >
      <img
        src="/إنتشار.png"
        alt={COMPANY.name}
        className="block h-10 w-32 object-contain sm:h-12 sm:w-40"
        loading="eager"
      />
    </a>
  );
}
