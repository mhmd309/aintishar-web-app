interface BrandIconProps {
  className?: string;
}

/** أيقونة دوائر متوسعة — ترمز لمعنى «انتشار» */
export default function BrandIcon({ className = 'h-6 w-6' }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="1.75" fill="currentColor" />
      <circle
        cx="12"
        cy="12"
        r="4.25"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.9"
      />
      <circle
        cx="12"
        cy="12"
        r="7.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.65"
      />
      <circle
        cx="12"
        cy="12"
        r="10.25"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}
