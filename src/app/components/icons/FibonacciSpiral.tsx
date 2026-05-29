interface IconProps {
  className?: string;
}

export function FibonacciSpiral({ className = "h-6 w-6" }: IconProps) {
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
      {/* Golden ratio spiral - single clean stroke */}
      <path
        d="M12 12
           A 1 1 0 0 1 13 12
           A 2 2 0 0 1 13 14
           A 3 3 0 0 0 10 14
           A 5 5 0 0 0 10 9
           A 8 8 0 0 1 18 9
           A 13 13 0 0 1 18 22"
        fill="none"
      />
    </svg>
  );
}
