export function HappySun({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Rays */}
      <g className="origin-center animate-spin" style={{ animationDuration: '20s' }}>
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
          <line
            key={angle}
            x1="100" y1="100" x2="100" y2="15"
            stroke="#FCD34D"
            strokeWidth="8"
            strokeLinecap="round"
            transform={`rotate(${angle} 100 100)`}
            opacity="0.7"
          />
        ))}
      </g>
      {/* Face circle */}
      <circle cx="100" cy="100" r="55" fill="#FBBF24" />
      <circle cx="100" cy="100" r="50" fill="#FCD34D" />
      {/* Rosy cheeks */}
      <circle cx="70" cy="112" r="10" fill="#FB923C" opacity="0.4" />
      <circle cx="130" cy="112" r="10" fill="#FB923C" opacity="0.4" />
      {/* Eyes - happy closed */}
      <path d="M 75 92 Q 82 82, 90 92" stroke="#92400E" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M 110 92 Q 118 82, 125 92" stroke="#92400E" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {/* Big smile */}
      <path d="M 78 108 Q 100 135, 122 108" stroke="#92400E" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Sunglasses shine */}
      <circle cx="80" cy="86" r="2" fill="white" opacity="0.6" />
      <circle cx="116" cy="86" r="2" fill="white" opacity="0.6" />
    </svg>
  );
}

export function CryingCloud({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 200" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Cloud body */}
      <ellipse cx="110" cy="90" rx="70" ry="45" fill="#CBD5E1" />
      <circle cx="65" cy="85" r="35" fill="#CBD5E1" />
      <circle cx="155" cy="85" r="35" fill="#CBD5E1" />
      <circle cx="90" cy="60" r="30" fill="#E2E8F0" />
      <circle cx="130" cy="55" r="32" fill="#E2E8F0" />
      {/* Inner highlight */}
      <ellipse cx="110" cy="80" rx="50" ry="25" fill="#E2E8F0" opacity="0.5" />
      {/* Sad eyes */}
      <ellipse cx="88" cy="85" rx="7" ry="9" fill="#475569" />
      <ellipse cx="132" cy="85" rx="7" ry="9" fill="#475569" />
      {/* Eye shine */}
      <circle cx="91" cy="82" r="3" fill="white" />
      <circle cx="135" cy="82" r="3" fill="white" />
      {/* Sad eyebrows */}
      <path d="M 75 72 Q 82 68, 95 74" stroke="#475569" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 145 72 Q 138 68, 125 74" stroke="#475569" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Wobbly sad mouth */}
      <path d="M 96 105 Q 110 95, 124 105" stroke="#475569" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Tears */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0; 0 20; 0 0" dur="1.5s" repeatCount="indefinite" />
        <ellipse cx="82" cy="100" rx="3" ry="5" fill="#60A5FA" opacity="0.8" />
      </g>
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 5; 0 25; 0 5" dur="1.5s" repeatCount="indefinite" />
        <ellipse cx="138" cy="100" rx="3" ry="5" fill="#60A5FA" opacity="0.8" />
      </g>
      {/* Rain drops */}
      <g opacity="0.5">
        <g>
          <animateTransform attributeName="transform" type="translate" values="0 0; 0 40; 0 0" dur="1s" repeatCount="indefinite" />
          <ellipse cx="80" cy="135" rx="2.5" ry="5" fill="#60A5FA" />
        </g>
        <g>
          <animateTransform attributeName="transform" type="translate" values="0 10; 0 50; 0 10" dur="1.2s" repeatCount="indefinite" />
          <ellipse cx="110" cy="140" rx="2.5" ry="5" fill="#60A5FA" />
        </g>
        <g>
          <animateTransform attributeName="transform" type="translate" values="0 5; 0 45; 0 5" dur="0.9s" repeatCount="indefinite" />
          <ellipse cx="140" cy="135" rx="2.5" ry="5" fill="#60A5FA" />
        </g>
      </g>
    </svg>
  );
}

export function SleepyMoon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Stars */}
      <g opacity="0.7">
        <g>
          <animateTransform attributeName="transform" type="scale" values="1; 0.5; 1" dur="2s" repeatCount="indefinite" additive="sum" />
          <text x="30" y="40" fontSize="18" fill="#FDE68A">&#x2B50;</text>
        </g>
        <g>
          <animateTransform attributeName="transform" type="scale" values="0.5; 1; 0.5" dur="2.5s" repeatCount="indefinite" additive="sum" />
          <text x="160" y="50" fontSize="14" fill="#FDE68A">&#x2B50;</text>
        </g>
        <g>
          <animateTransform attributeName="transform" type="scale" values="1; 0.7; 1" dur="1.8s" repeatCount="indefinite" additive="sum" />
          <text x="150" y="160" fontSize="12" fill="#FDE68A">&#x2B50;</text>
        </g>
      </g>
      {/* Moon body */}
      <circle cx="100" cy="100" r="55" fill="#FDE68A" />
      <circle cx="130" cy="80" r="45" fill="#312E81" /> {/* Dark cutout for crescent */}
      {/* Face on the crescent */}
      {/* Closed sleepy eyes */}
      <path d="M 68 90 Q 75 85, 82 90" stroke="#92400E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 88 82 Q 95 77, 102 82" stroke="#92400E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Little smile */}
      <path d="M 72 102 Q 82 110, 92 102" stroke="#92400E" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Rosy cheek */}
      <circle cx="72" cy="106" r="6" fill="#FB923C" opacity="0.3" />
      {/* Zzz */}
      <g fill="#C4B5FD" fontFamily="Nunito, sans-serif" fontWeight="bold">
        <g>
          <animateTransform attributeName="transform" type="translate" values="0 0; -5 -10; -5 -10" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1; 1; 0" dur="2s" repeatCount="indefinite" />
          <text x="95" y="70" fontSize="18">z</text>
        </g>
        <g>
          <animateTransform attributeName="transform" type="translate" values="0 0; -8 -15; -8 -15" dur="2s" repeatCount="indefinite" begin="0.4s" />
          <animate attributeName="opacity" values="1; 1; 0" dur="2s" repeatCount="indefinite" begin="0.4s" />
          <text x="105" y="58" fontSize="14">z</text>
        </g>
        <g>
          <animateTransform attributeName="transform" type="translate" values="0 0; -10 -18; -10 -18" dur="2s" repeatCount="indefinite" begin="0.8s" />
          <animate attributeName="opacity" values="1; 1; 0" dur="2s" repeatCount="indefinite" begin="0.8s" />
          <text x="112" y="48" fontSize="11">z</text>
        </g>
      </g>
    </svg>
  );
}

export function SearchingBird({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 180" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="100" cy="110" rx="40" ry="35" fill="#FCD34D" />
      {/* Belly */}
      <ellipse cx="100" cy="118" rx="25" ry="22" fill="#FEF3C7" />
      {/* Head */}
      <circle cx="100" cy="70" r="30" fill="#FCD34D" />
      {/* Eyes - looking around */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="-3 0; 3 0; -3 0" dur="1.5s" repeatCount="indefinite" />
        <circle cx="88" cy="65" r="8" fill="white" />
        <circle cx="112" cy="65" r="8" fill="white" />
        <circle cx="90" cy="66" r="4" fill="#1E293B" />
        <circle cx="114" cy="66" r="4" fill="#1E293B" />
        <circle cx="91" cy="64" r="1.5" fill="white" />
        <circle cx="115" cy="64" r="1.5" fill="white" />
      </g>
      {/* Beak */}
      <path d="M 96 76 L 100 84 L 104 76" fill="#FB923C" />
      {/* Wings flapping */}
      <g>
        <animateTransform attributeName="transform" type="rotate" values="-10 65 100; 10 65 100; -10 65 100" dur="0.6s" repeatCount="indefinite" />
        <ellipse cx="55" cy="105" rx="22" ry="12" fill="#F59E0B" />
      </g>
      <g>
        <animateTransform attributeName="transform" type="rotate" values="10 135 100; -10 135 100; 10 135 100" dur="0.6s" repeatCount="indefinite" />
        <ellipse cx="145" cy="105" rx="22" ry="12" fill="#F59E0B" />
      </g>
      {/* Feet */}
      <line x1="88" y1="142" x2="82" y2="160" stroke="#FB923C" strokeWidth="3" strokeLinecap="round" />
      <line x1="112" y1="142" x2="118" y2="160" stroke="#FB923C" strokeWidth="3" strokeLinecap="round" />
      {/* Question mark */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0; 0 -5; 0 0" dur="1s" repeatCount="indefinite" />
        <text x="125" y="50" fontSize="24" fill="#92400E" fontWeight="bold" fontFamily="Nunito, sans-serif">?</text>
      </g>
    </svg>
  );
}
