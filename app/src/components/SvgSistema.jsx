// Diagrama gráfico del sistema solar autónomo. Toma los valores del
// dimensionamiento en vivo (datos) para etiquetar cada componente.
const fmt = (v, dec = 0) =>
  Number.isFinite(v) && v > 0
    ? v.toLocaleString("es-CO", { maximumFractionDigits: dec })
    : "—";

export default function SvgSistema({ datos }) {
  const d = datos || {};
  const nPaneles = d.nPaneles || 0;
  const ppanel =
    d.potenciaArreglo && nPaneles ? Math.round(d.potenciaArreglo / nPaneles) : 450;
  const vpanel = d.vpanel || 24;
  const tension = d.tension || 24;
  const ah = d.ah || 0;
  const amp = d.ampControlador || 0;
  const wat = d.watInversor || 0;

  const valorPanel = nPaneles > 0 ? `${nPaneles} × ${ppanel} Wp` : "Panel solar";
  const valorBateria = ah > 0 ? `${tension} V · ${fmt(ah)} Ah` : `${tension} V`;
  const valorControlador = amp > 0 ? `${amp} A` : "según tu arreglo";
  const valorInversor = wat > 0 ? `≥ ${fmt(wat)} W` : "según tu consumo";

  const rayos = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <svg
      className="svg-sistema"
      viewBox="0 0 1000 700"
      role="img"
      aria-label="Diagrama del sistema solar autónomo: panel, controlador de carga, banco de baterías, inversor y aparatos"
    >
      <defs>
        <linearGradient id="gPanel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1d4ed8" />
          <stop offset="1" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="gBat" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b4a61" />
          <stop offset="1" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id="gInv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>
        <filter id="sombraCaja" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.18" />
        </filter>
        <marker
          id="flecha"
          markerWidth="9"
          markerHeight="9"
          refX="6.5"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L7,3 L0,6 Z" fill="#94a3b8" />
        </marker>
      </defs>

      {/* Sol */}
      <g>
        <circle cx="70" cy="66" r="26" fill="#fbbf24" />
        {rayos.map((a) => {
          const rad = (a * Math.PI) / 180;
          return (
            <line
              key={a}
              x1={70 + 32 * Math.cos(rad)}
              y1={66 + 32 * Math.sin(rad)}
              x2={70 + 44 * Math.cos(rad)}
              y2={66 + 44 * Math.sin(rad)}
              stroke="#f59e0b"
              strokeWidth="4"
              strokeLinecap="round"
            />
          );
        })}
      </g>
      <line x1="94" y1="92" x2="150" y2="128" stroke="#fbbf24" strokeWidth="3" strokeDasharray="6 6" />

      {/* Panel solar */}
      <g filter="url(#sombraCaja)">
        <rect x="65" y="120" width="270" height="160" rx="12" fill="url(#gPanel)" stroke="#1e3a8a" strokeWidth="2" />
      </g>
      <g stroke="#bfdbfe" strokeWidth="1.5" opacity="0.7">
        <line x1="155" y1="130" x2="155" y2="270" />
        <line x1="245" y1="130" x2="245" y2="270" />
        <line x1="75" y1="200" x2="325" y2="200" />
      </g>
      <rect x="100" y="226" width="200" height="42" rx="12" fill="#ffffff" opacity="0.94" />
      <text x="200" y="245" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e3a8a">
        PANEL SOLAR
      </text>
      <text x="200" y="261" textAnchor="middle" fontSize="12" fill="#1d4ed8">
        {valorPanel} · {vpanel} V
      </text>

      {/* Panel -> Controlador */}
      <line className="flujo" x1="200" y1="280" x2="200" y2="378" markerEnd="url(#flecha)" />
      <text x="212" y="332" fontSize="12" fill="#64748b">corriente CC</text>

      {/* Controlador */}
      <g filter="url(#sombraCaja)">
        <rect x="95" y="380" width="210" height="122" rx="12" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
      </g>
      <rect x="115" y="398" width="170" height="40" rx="6" fill="#0f172a" />
      <circle cx="132" cy="418" r="4" fill="#4ade80" />
      <text x="200" y="423" textAnchor="middle" fontSize="15" fontWeight="700" fill="#4ade80">
        {valorControlador}
      </text>
      <text x="200" y="463" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">
        CONTROLADOR
      </text>
      <text x="200" y="481" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">
        DE CARGA
      </text>

      {/* Controlador -> Batería */}
      <line className="flujo" x1="305" y1="441" x2="428" y2="441" markerEnd="url(#flecha)" />

      {/* Banco de baterías */}
      <g filter="url(#sombraCaja)">
        <rect x="430" y="380" width="230" height="122" rx="12" fill="url(#gBat)" stroke="#0f172a" strokeWidth="2" />
      </g>
      <rect x="470" y="368" width="22" height="14" rx="3" fill="#94a3b8" />
      <rect x="598" y="368" width="22" height="14" rx="3" fill="#94a3b8" />
      <text x="481" y="352" textAnchor="middle" fontSize="14" fontWeight="700" fill="#dc2626">+</text>
      <text x="609" y="352" textAnchor="middle" fontSize="16" fontWeight="700" fill="#cbd5e1">−</text>
      <text x="545" y="432" textAnchor="middle" fontSize="14" fontWeight="700" fill="#ffffff">
        BANCO DE
      </text>
      <text x="545" y="452" textAnchor="middle" fontSize="14" fontWeight="700" fill="#ffffff">
        BATERÍAS
      </text>
      <text x="545" y="478" textAnchor="middle" fontSize="13" fill="#cbd5e1">
        {valorBateria}
      </text>

      {/* Batería -> Inversor */}
      <line className="flujo" x1="660" y1="441" x2="768" y2="441" markerEnd="url(#flecha)" />
      <text x="714" y="429" textAnchor="middle" fontSize="12" fill="#64748b">24 V CC</text>

      {/* Inversor */}
      <g filter="url(#sombraCaja)">
        <rect x="770" y="380" width="210" height="122" rx="12" fill="url(#gInv)" stroke="#b45309" strokeWidth="2" />
      </g>
      <path
        d="M796 414 q11 -16 22 0 t22 0 t22 0 t22 0 t22 0"
        fill="none"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <text x="875" y="453" textAnchor="middle" fontSize="14" fontWeight="700" fill="#ffffff">
        INVERSOR
      </text>
      <text x="875" y="478" textAnchor="middle" fontSize="13" fill="#fff7ed">
        {valorInversor}
      </text>

      {/* Inversor -> Aparatos */}
      <line className="flujo" x1="875" y1="502" x2="875" y2="578" markerEnd="url(#flecha)" />
      <text x="887" y="545" fontSize="12" fill="#64748b">110/120 V CA</text>

      {/* Aparatos */}
      <g filter="url(#sombraCaja)">
        <rect x="600" y="580" width="350" height="90" rx="12" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
      </g>
      <text x="775" y="604" textAnchor="middle" fontSize="12" fontWeight="700" fill="#475569">
        APARATOS · 110/120 V CA
      </text>
      {[
        { x: 612, t: "Licuadora" },
        { x: 724, t: "Luces" },
        { x: 836, t: "Cargadores" }
      ].map((p) => (
        <g key={p.t}>
          <rect x={p.x} y="616" width="102" height="42" rx="8" fill="#ffffff" stroke="#e2e8f0" />
          <text x={p.x + 51} y="642" textAnchor="middle" fontSize="12" fill="#334155">
            {p.t}
          </text>
        </g>
      ))}

      {/* Puesta a tierra */}
      <line x1="200" y1="502" x2="200" y2="524" stroke="#64748b" strokeWidth="2" />
      <line x1="178" y1="524" x2="222" y2="524" stroke="#64748b" strokeWidth="2" />
      <line x1="186" y1="531" x2="214" y2="531" stroke="#64748b" strokeWidth="2" />
      <line x1="194" y1="538" x2="206" y2="538" stroke="#64748b" strokeWidth="2" />
      <text x="200" y="556" textAnchor="middle" fontSize="11" fill="#64748b">tierra</text>
    </svg>
  );
}
