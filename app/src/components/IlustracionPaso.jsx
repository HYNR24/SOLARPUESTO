// Miniaturas SVG para los capítulos del manual de instalación. Cada una
// representa gráficamente el elemento que se instala en ese paso.
export default function IlustracionPaso({ tipo }) {
  const comun = { viewBox: "0 0 150 120", className: "ilustracion-paso", "aria-hidden": true };

  if (tipo === "panel") {
    return (
      <svg {...comun}>
        <circle cx="30" cy="24" r="11" fill="#fbbf24" />
        <g stroke="#f59e0b" strokeWidth="3" strokeLinecap="round">
          <line x1="30" y1="4" x2="30" y2="9" />
          <line x1="10" y1="24" x2="15" y2="24" />
          <line x1="45" y1="9" x2="42" y2="12" />
        </g>
        <rect x="32" y="42" width="86" height="52" rx="6" fill="#2563eb" stroke="#1e3a8a" strokeWidth="2" />
        <g stroke="#bfdbfe" strokeWidth="1.4" opacity="0.8">
          <line x1="61" y1="46" x2="61" y2="90" />
          <line x1="90" y1="46" x2="90" y2="90" />
          <line x1="36" y1="68" x2="114" y2="68" />
        </g>
        <line x1="48" y1="94" x2="40" y2="112" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
        <line x1="102" y1="94" x2="110" y2="112" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  if (tipo === "cableado") {
    return (
      <svg {...comun}>
        <path d="M18 42 C58 10 92 74 132 42" fill="none" stroke="#dc2626" strokeWidth="5" strokeLinecap="round" />
        <path d="M18 70 C58 102 92 38 132 70" fill="none" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
        <rect x="124" y="30" width="16" height="24" rx="4" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
        <rect x="124" y="58" width="16" height="24" rx="4" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
      </svg>
    );
  }

  if (tipo === "controlador") {
    return (
      <svg {...comun}>
        <rect x="33" y="28" width="84" height="64" rx="9" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
        <rect x="44" y="38" width="62" height="22" rx="4" fill="#0f172a" />
        <circle cx="55" cy="49" r="3.5" fill="#4ade80" />
        <circle cx="55" cy="78" r="6" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
        <circle cx="75" cy="78" r="6" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
        <line x1="14" y1="60" x2="30" y2="60" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
        <line x1="120" y1="60" x2="136" y2="60" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (tipo === "bateria") {
    return (
      <svg {...comun}>
        <rect x="30" y="40" width="90" height="52" rx="7" fill="#334155" stroke="#0f172a" strokeWidth="2" />
        <rect x="48" y="31" width="13" height="11" rx="3" fill="#94a3b8" />
        <rect x="89" y="31" width="13" height="11" rx="3" fill="#94a3b8" />
        <text x="54.5" y="20" textAnchor="middle" fontSize="15" fontWeight="700" fill="#dc2626">+</text>
        <text x="95.5" y="20" textAnchor="middle" fontSize="17" fontWeight="700" fill="#475569">−</text>
        <rect x="40" y="56" width="30" height="24" rx="3" fill="#22c55e" />
        <rect x="76" y="56" width="30" height="24" rx="3" fill="#64748b" />
      </svg>
    );
  }

  if (tipo === "inversor") {
    return (
      <svg {...comun}>
        <rect x="30" y="32" width="90" height="60" rx="9" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
        <path
          d="M40 62 q9 -15 18 0 t18 0 t18 0 t18 0"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <rect x="30" y="30" width="90" height="6" rx="3" fill="#b45309" opacity="0.4" />
      </svg>
    );
  }

  // cargas
  return (
    <svg {...comun}>
      <circle cx="92" cy="52" r="18" fill="#fbbf24" />
      <rect x="84" y="68" width="16" height="10" rx="2" fill="#94a3b8" />
      <line x1="92" y1="30" x2="92" y2="26" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
      <rect x="24" y="52" width="34" height="30" rx="8" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
      <line x1="18" y1="60" x2="26" y2="60" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
      <line x1="18" y1="74" x2="26" y2="74" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
      <path d="M60 66 q14 10 30 0" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
