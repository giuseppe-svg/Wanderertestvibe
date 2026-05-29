interface IconProps {
  className?: string;
}

export function BasharCircuitry({ className = "h-6 w-6" }: IconProps) {
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
      
      {/* Outer nodes */}
      <circle cx="12" cy="4" r="1" />
      <circle cx="20" cy="12" r="1" />
      <circle cx="12" cy="20" r="1" />
      <circle cx="4" cy="12" r="1" />
      
      {/* Diagonal nodes */}
      <circle cx="17" cy="7" r="0.8" />
      <circle cx="17" cy="17" r="0.8" />
      <circle cx="7" cy="17" r="0.8" />
      <circle cx="7" cy="7" r="0.8" />
      
      {/* Connections from center */}
      <line x1="12" y1="9" x2="12" y2="4" />
      <line x1="15" y1="12" x2="20" y2="12" />
      <line x1="12" y1="15" x2="12" y2="20" />
      <line x1="9" y1="12" x2="4" y2="12" />
      
      {/* Diagonal connections */}
      <line x1="14" y1="10" x2="17" y2="7" />
      <line x1="14" y1="14" x2="17" y2="17" />
      <line x1="10" y1="14" x2="7" y2="17" />
      <line x1="10" y1="10" x2="7" y2="7" />
    </svg>
  );
}
