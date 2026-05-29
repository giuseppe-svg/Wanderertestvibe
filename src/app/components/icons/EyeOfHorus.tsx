interface IconProps {
  className?: string;
}

export function EyeOfHorus({ className = "h-6 w-6" }: IconProps) {
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
      {/* Eye outline */}
      <path d="M3 12 Q3 8, 12 8 Q21 8, 21 12" />
      <path d="M3 12 Q3 16, 12 16 Q21 16, 21 12" />
      
      {/* Pupil */}
      <circle cx="12" cy="12" r="2.5" />
      
      {/* Decorative spiral under eye */}
      <path d="M12 16 Q13 17, 13 18 Q13 19, 12 19" />
      
      {/* Left decorative line */}
      <path d="M3 12 L2 14" />
      
      {/* Right decorative line */}
      <path d="M21 12 L22 13 L21 14" />
      
      {/* Eyebrow */}
      <path d="M6 7 Q12 6, 18 7" />
    </svg>
  );
}
