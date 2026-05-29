interface IconProps {
  className?: string;
}

export function Merkaba({ className = "h-6 w-6" }: IconProps) {
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
      {/* Upward tetrahedron */}
      <path d="M12 3 L20 17 L4 17 Z" />
      
      {/* Downward tetrahedron */}
      <path d="M12 21 L4 7 L20 7 Z" />
      
      {/* Center connections */}
      <line x1="12" y1="3" x2="12" y2="21" />
      <line x1="4" y1="7" x2="20" y2="17" />
      <line x1="20" y1="7" x2="4" y2="17" />
      
      {/* Center circle */}
      <circle cx="12" cy="12" r="1.5" />
    </svg>
  );
}
