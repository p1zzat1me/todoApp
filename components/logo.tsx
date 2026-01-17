"use client";

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 64, className = "" }: LogoProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        {/* Background circle with gradient */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        
        {/* Outer circle */}
        <circle
          cx="32"
          cy="32"
          r="30"
          fill="url(#logoGradient)"
          className="transition-all duration-300"
        />
        
        {/* Checkmark - Professional style */}
        <path
          d="M20 32 L28 40 L44 24"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* Subtle inner circle for depth */}
        <circle
          cx="32"
          cy="32"
          r="26"
          fill="none"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
