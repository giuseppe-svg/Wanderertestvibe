interface IconProps {
  className?: string;
}

export function TreeOfLife({ className = "h-6 w-6" }: IconProps) {
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
      {/* 10 Sephirot nodes */}
      {/* Top - Kether */}
      <circle cx="12" cy="3" r="1.2" />
      
      {/* Second row - Chokmah and Binah */}
      <circle cx="8" cy="6" r="1.2" />
      <circle cx="16" cy="6" r="1.2" />
      
      {/* Third row - Chesed and Geburah */}
      <circle cx="8" cy="10" r="1.2" />
      <circle cx="16" cy="10" r="1.2" />
      
      {/* Center - Tiferet */}
      <circle cx="12" cy="12" r="1.2" />
      
      {/* Fourth row - Netzach and Hod */}
      <circle cx="8" cy="16" r="1.2" />
      <circle cx="16" cy="16" r="1.2" />
      
      {/* Fifth row - Yesod */}
      <circle cx="12" cy="19" r="1.2" />
      
      {/* Bottom - Malkuth */}
      <circle cx="12" cy="22" r="1.2" />
      
      {/* Paths connecting the Sephirot */}
      <line x1="12" y1="3" x2="8" y2="6" />
      <line x1="12" y1="3" x2="16" y2="6" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="8" y1="6" x2="8" y2="10" />
      <line x1="16" y1="6" x2="16" y2="10" />
      <line x1="8" y1="6" x2="12" y2="12" />
      <line x1="16" y1="6" x2="12" y2="12" />
      <line x1="8" y1="10" x2="16" y2="10" />
      <line x1="8" y1="10" x2="12" y2="12" />
      <line x1="16" y1="10" x2="12" y2="12" />
      <line x1="8" y1="10" x2="8" y2="16" />
      <line x1="16" y1="10" x2="16" y2="16" />
      <line x1="12" y1="12" x2="8" y2="16" />
      <line x1="12" y1="12" x2="16" y2="16" />
      <line x1="12" y1="12" x2="12" y2="19" />
      <line x1="8" y1="16" x2="16" y2="16" />
      <line x1="8" y1="16" x2="12" y2="19" />
      <line x1="16" y1="16" x2="12" y2="19" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  );
}
