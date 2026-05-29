interface IconProps {
  className?: string;
}

export function FlowerOfLife({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Center circle */}
      <circle cx="12" cy="12" r="3" />
      
      {/* First ring - 6 circles around center */}
      <circle cx="12" cy="9" r="3" />
      <circle cx="14.6" cy="10.5" r="3" />
      <circle cx="14.6" cy="13.5" r="3" />
      <circle cx="12" cy="15" r="3" />
      <circle cx="9.4" cy="13.5" r="3" />
      <circle cx="9.4" cy="10.5" r="3" />
      
      {/* Outer petals (partial circles for the hexagonal pattern) */}
      <circle cx="12" cy="6" r="3" />
      <circle cx="17.2" cy="9" r="3" />
      <circle cx="17.2" cy="15" r="3" />
      <circle cx="12" cy="18" r="3" />
      <circle cx="6.8" cy="15" r="3" />
      <circle cx="6.8" cy="9" r="3" />
    </svg>
  );
}
