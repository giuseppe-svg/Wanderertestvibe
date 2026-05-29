interface IconProps {
  className?: string;
}

export function AmanitaMuscaria({ className = "h-6 w-6" }: IconProps) {
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
      {/* Mushroom cap */}
      <path d="M5 12 Q5 6, 12 6 Q19 6, 19 12 Q19 14, 17 15 L7 15 Q5 14, 5 12 Z" />
      
      {/* Dots on cap */}
      <circle cx="12" cy="9" r="0.5" />
      <circle cx="9" cy="10.5" r="0.5" />
      <circle cx="15" cy="10.5" r="0.5" />
      <circle cx="10" cy="13" r="0.5" />
      <circle cx="14" cy="13" r="0.5" />
      
      {/* Stem */}
      <path d="M10 15 L10 20 L14 20 L14 15" />
      
      {/* Gills suggestion */}
      <line x1="7" y1="14" x2="9" y2="15" />
      <line x1="12" y1="13.5" x2="12" y2="15" />
      <line x1="17" y1="14" x2="15" y2="15" />
      
      {/* Base */}
      <path d="M9 20 L9 21 L15 21 L15 20" />
    </svg>
  );
}
