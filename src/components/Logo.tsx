interface LogoProps {
  className?: string;
  showText?: boolean;
  showTagline?: boolean;
  variant?: 'default' | 'light';
}

export default function Logo({
  className = '',
  showText = true,
  showTagline = false,
  variant = 'default',
}: LogoProps) {
  const textClass =
    variant === 'light' ? 'text-white' : 'text-gray-900 dark:text-white';

  const accentClass =
    variant === 'light' ? 'text-primary-300' : 'text-primary-600 dark:text-primary-400';

  const taglineClass =
    variant === 'light' ? 'text-gray-300' : 'text-gray-500 dark:text-gray-400';

  return (
    <a href="#home" className={`flex items-center gap-2.5 ${className}`}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg shadow-primary-500/30">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-6 w-6 text-white"
          aria-hidden="true"
        >
          <path
            d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`text-xl font-bold leading-tight ${textClass}`}>
            إنت<span className={accentClass}>شار</span>
          </span>
          {showTagline && (
            <span className={`text-xs font-medium leading-tight ${taglineClass}`}>
              للبرمجيات والتسويق الإلكتروني
            </span>
          )}
        </div>
      )}
    </a>
  );
}
