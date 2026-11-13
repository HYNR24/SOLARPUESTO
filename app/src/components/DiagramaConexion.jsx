import { useEffect, useState } from "react";

const ISO = { cx: 390, cy: 80, sx: 0.866, sy: 0.5 };
const ip = (x, y, z = 0) => ({
  x: ISO.cx + (x - y) * ISO.sx,
  y: ISO.cy + (x + y) * ISO.sy - z
});
const pts = (...puntos) => puntos.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
const ruta = (puntos) =>
  puntos.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");

const C = {
  pos: "#dc2626",
  neg: "#334155",
  ca: "#f59e0b",
  tierra: "#16a34a",
  panel: "#2563eb",
  bateria: "#334155",
  inversor: "#f59e0b",
  texto: "#0f172a",
  suave: "#64748b",
  borde: "#94a3b8"
};

const PAL = {
  panel: { top: "#60a5fa", right: "#2563eb", left: "#1d4ed8", stroke: "#1e3a8a" },
  controlador: { top: "#f8fafc", right: "#e2e8f0", left: "#cbd5e1", stroke: "#94a3b8" },
  bateria: { top: "#64748b", right: "#334155", left: "#1e293b", stroke: "#0f172a" },
  inversor: { top: "#fbbf24", right: "#f59e0b", left: "#d97706", stroke: "#b45309" },
  cargas: { top: "#f8fafc", right: "#e2e8f0", left: "#cbd5e1", stroke: "#94a3b8" },
  carga: { top: "#f8fafc", right: "#e2e8f0", left: "#cbd5e1", stroke: "#94a3b8" },
  regleta: { top: "#f1f5f9", right: "#cbd5e1", left: "#94a3b8", stroke: "#64748b" },
  ca: { top: "#fef3c7", right: "#fbbf24", left: "#f59e0b", stroke: "#b45309" },
  fusible: { top: "#fed7aa", right: "#fb923c", left: "#ea580c", stroke: "#c2410c" },
  salida: { top: "#bbf7d0", right: "#86efac", left: "#4ade80", stroke: "#15803d" }
};

const PASOS = {
  panel: [
    { foco: ip(280, 60, 66), texto: "Conecta el cable rojo del panel al borne PV+ del controlador. Usa el conector MC4." },
    { foco: ip(280, 60, 36), texto: "Conecta el cable negro al borne PV−. Nunca unas el positivo con el negativo." },
    { foco: ip(340, 105, 60), texto: "Aprieta los dos bornes del controlador. El panel nunca se conecta directo a la batería." }
  ],
  cableado: [
    { foco: ip(150, 50, 35), texto: "Del panel al controlador usa cable de 4 a 6 mm²: rojo al positivo y negro al negativo." },
    { foco: ip(180, 195, 22), texto: "De la batería al inversor usa cable de 10 a 25 mm²." },
    { foco: ip(160, 185, 30), texto: "Instala el fusible o breaker en el positivo, cerca del borne de la batería." }
  ],
  controlador: [
    { foco: ip(170, 100, 65), texto: "Conecta primero la batería al controlador, en BAT+ y BAT−." },
    { foco: ip(300, 100, 60), texto: "Conecta después el panel, en PV+ y PV−." },
    { foco: ip(235, 145, 24), texto: "El borne LOAD es solo para cargas pequeñas; no lo uses para el inversor." }
  ],
  bateria: [
    { foco: ip(80, 137, 45), texto: "Une el negativo de la batería A con el positivo de la batería B. Así obtienes 24 V." },
    { foco: ip(-60, 240, 12), texto: "Del positivo libre saca el cable con fusible hacia el controlador y el inversor." },
    { foco: ip(280, 137, 15), texto: "El negativo libre va directo al borne negativo del controlador y del inversor." }
  ],
  inversor: [
    { foco: ip(160, 85, 60), texto: "El positivo de la batería pasa por el fusible o breaker y llega al borne + del inversor." },
    { foco: ip(160, 85, 30), texto: "El negativo de la batería va directo al borne − del inversor." },
    { foco: ip(335, 88, 48), texto: "La salida CA va a los aparatos. Nunca la conectes a la batería." }
  ],
  cargas: [
    { foco: ip(80, 102, 30), texto: "Conecta la salida CA del inversor a la regleta." },
    { foco: ip(185, 100, 25), texto: "Reparte los aparatos en la regleta, sin sobrecargar un solo tomacorriente." },
    { foco: ip(250, 40, 20), texto: "Enciende primero los de menor consumo y deja la licuadora para el final." }
  ]
};

function Texto({ x, y, children, size = 12, weight = 600, fill = C.texto, anchor = "middle" }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={fill}>
      {children}
    </text>
  );
}

function PisoIso() {
  const x0 = -120;
  const x1 = 430;
  const y0 = -40;
  const y1 = 240;
  const esquinas = [ip(x0, y0), ip(x1, y0), ip(x1, y1), ip(x0, y1)];
  const lineasX = [-120, -10, 100, 210, 320, 430];
  const lineasY = [-40, 30, 100, 170, 240];

  return (
    <g>
      <polygon points={pts(...esquinas)} fill="#eef2f7" opacity="0.55" />
      {lineasX.map((x) => (
        <line
          key={`x-${x}`}
          x1={ip(x, y0).x}
          y1={ip(x, y0).y}
          x2={ip(x, y1).x}
          y2={ip(x, y1).y}
          stroke="#dbe3ec"
          strokeWidth="1"
        />
      ))}
      {lineasY.map((y) => (
        <line
          key={`y-${y}`}
          x1={ip(x0, y).x}
          y1={ip(x0, y).y}
          x2={ip(x1, y).x}
          y2={ip(x1, y).y}
          stroke="#dbe3ec"
          strokeWidth="1"
        />
      ))}
    </g>
  );
}

function Sombra({ x, y, w, d }) {
  const centro = ip(x + w / 2, y + d / 2, 0);
  const rx = Math.max(24, (w + d) * 0.24);
  return (
    <ellipse
      cx={centro.x}
      cy={centro.y + 4}
      rx={rx}
      ry={rx * 0.24}
      fill="#0f172a"
      opacity="0.08"
    />
  );
}

function IsoCaja({
  x,
  y,
  w,
  d,
  h,
  pal = PAL.controlador,
  label,
  sub,
  labelFill = C.texto,
  subFill = C.suave,
  labelSize = 11,
  children
}) {
  const A = ip(x, y, h);
  const B = ip(x + w, y, h);
  const Ctop = ip(x, y + d, h);
  const D = ip(x + w, y + d, h);
  const b = ip(x + w, y, 0);
  const c = ip(x, y + d, 0);
  const dd = ip(x + w, y + d, 0);
  const frente = ip(x + w / 2, y + d, h * 0.58);

  return (
    <g>
      <Sombra x={x} y={y} w={w} d={d} />
      <polygon points={pts(B, D, dd, b)} fill={pal.right} stroke={pal.stroke} strokeWidth="1.4" />
      <polygon points={pts(Ctop, D, dd, c)} fill={pal.left} stroke={pal.stroke} strokeWidth="1.4" />
      <polygon points={pts(A, B, D, Ctop)} fill={pal.top} stroke={pal.stroke} strokeWidth="1.4" />
      {label && (
        <Texto x={frente.x} y={frente.y} size={labelSize} weight="700" fill={labelFill}>
          {label}
        </Texto>
      )}
      {sub && (
        <Texto x={frente.x} y={frente.y + 13} size="9.5" weight="500" fill={subFill}>
          {sub}
        </Texto>
      )}
      {children}
    </g>
  );
}

function Caja({ x, y, w, h, fill, stroke = C.borde, rx = 10, children }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} stroke={stroke} strokeWidth="2" />
      {children}
    </g>
  );
}

function IsoPanel({ x0, y0, x1, y1, h = 48, label = "PANEL SOLAR", sub = "450 Wp · 24 V" }) {
  const TL = ip(x0, y0, h);
  const TR = ip(x1, y0, h);
  const BR = ip(x1, y1, 0);
  const BL = ip(x0, y1, 0);
  const grosor = 8;
  const TLb = { x: TL.x, y: TL.y + grosor };
  const TRb = { x: TR.x, y: TR.y + grosor };
  const BRb = { x: BR.x, y: BR.y + grosor };
  const BLb = { x: BL.x, y: BL.y + grosor };
  const centro = {
    x: (TL.x + TR.x + BR.x + BL.x) / 4,
    y: (TL.y + TR.y + BR.y + BL.y) / 4
  };
  const lineas = [];

  for (let i = 1; i < 4; i += 1) {
    const f = i / 4;
    lineas.push([ip(x0 + (x1 - x0) * f, y0, h), ip(x0 + (x1 - x0) * f, y1, 0)]);
  }
  for (let i = 1; i < 3; i += 1) {
    const f = i / 3;
    const z = h * (1 - f);
    lineas.push([ip(x0, y0 + (y1 - y0) * f, z), ip(x1, y0 + (y1 - y0) * f, z)]);
  }

  return (
    <g>
      <Sombra x={x0} y={y0} w={x1 - x0} d={y1 - y0} />
      <line x1={TL.x} y1={TL.y} x2={ip(x0, y0, 0).x} y2={ip(x0, y0, 0).y} stroke="#475569" strokeWidth="3" />
      <line x1={TR.x} y1={TR.y} x2={ip(x1, y0, 0).x} y2={ip(x1, y0, 0).y} stroke="#475569" strokeWidth="3" />
      <polygon points={pts(TLb, TRb, BRb, BLb)} fill={PAL.panel.left} opacity="0.8" />
      <polygon points={pts(TL, TR, BR, BL)} fill={PAL.panel.top} stroke={PAL.panel.stroke} strokeWidth="2.5" />
      {lineas.map(([a, b], i) => (
        <line
          key={`panel-${i}`}
          x1={a.x}
          y1={a.y}
          x2={b.x}
          y2={b.y}
          stroke="#dbeafe"
          strokeWidth="1"
          opacity="0.7"
        />
      ))}
      <Texto x={centro.x} y={centro.y - 2} size="12" weight="700" fill="#ffffff">
        {label}
      </Texto>
      <Texto x={centro.x} y={centro.y + 13} size="9.5" weight="500" fill="#dbeafe">
        {sub}
      </Texto>
    </g>
  );
}

function Etiqueta({ x, y, children, size = 9, weight = 700, fill = C.texto, anchor = "middle" }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={size}
      fontWeight={weight}
      fill={fill}
      stroke="#ffffff"
      strokeWidth="3.5"
      paintOrder="stroke"
    >
      {children}
    </text>
  );
}

function Cable({ from, via = [], to, color, marker = false, width = 4 }) {
  const d = ruta([from, ...via, to]);
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke="#ffffff"
        strokeWidth={width + 4}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.92"
      />
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
        markerEnd={marker ? "url(#flechaConexion)" : undefined}
        className="cable-animado"
      />
    </g>
  );
}

function Conector({ p, color, label, anchor = "start" }) {
  const ancho = label ? Math.max(25, label.length * 5.4 + 9) : 0;
  const x = anchor === "end" ? p.x - 11 - ancho : p.x + 11;

  return (
    <g>
      <circle cx={p.x} cy={p.y} r="7" fill="#ffffff" stroke={color} strokeWidth="2.5" />
      <circle cx={p.x} cy={p.y} r="2.6" fill={color} />
      {label && (
        <g>
          <rect
            x={x}
            y={p.y - 7}
            width={ancho}
            height="14"
            rx="7"
            fill="#ffffff"
            stroke={color}
            strokeOpacity="0.45"
          />
          <Texto x={x + ancho / 2} y={p.y + 3} size="8" weight="800" fill={color}>
            {label}
          </Texto>
        </g>
      )}
    </g>
  );
}

function Fusible({ p, label = "fusible" }) {
  return (
    <g>
      <rect x={p.x - 13} y={p.y - 9} width="26" height="18" rx="5" fill="#ffffff" stroke={C.ca} strokeWidth="2.5" />
      <line x1={p.x - 8} y1={p.y} x2={p.x + 8} y2={p.y} stroke={C.ca} strokeWidth="3" strokeLinecap="round" />
      <Etiqueta x={p.x} y={p.y - 14} size="8.5" fill="#b45309">
        {label}
      </Etiqueta>
    </g>
  );
}

function Sol({ x = 105, y = 55 }) {
  return (
    <g>
      <circle cx={x} cy={y} r="16" fill="#fbbf24" className="sol-animado" />
      <g stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" className="rayos-animados">
        <line x1={x} y1={y - 26} x2={x} y2={y - 20} />
        <line x1={x - 26} y1={y} x2={x - 20} y2={y} />
        <line x1={x + 20} y1={y} x2={x + 26} y2={y} />
        <line x1={x - 18} y1={y - 18} x2={x - 14} y2={y - 14} />
        <line x1={x + 14} y1={y - 18} x2={x + 18} y2={y - 14} />
        <line x1={x - 18} y1={y + 18} x2={x - 14} y2={y + 14} />
        <line x1={x + 14} y1={y + 14} x2={x + 18} y2={y + 18} />
      </g>
    </g>
  );
}

function Foco({ x, y, n }) {
  return (
    <g className="foco-paso" aria-hidden="true">
      <circle cx={x} cy={y} r="20" className="foco-anillo" />
      <circle cx={x} cy={y} r="6" className="foco-punto" />
      <circle cx={x + 20} cy={y - 20} r="11" className="foco-num" />
      <text x={x + 20} y={y - 16} textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff">
        {n}
      </text>
    </g>
  );
}

function Marco({ tipo, pasos, children }) {
  const [paso, setPaso] = useState(0);
  const [reproduciendo, setReproduciendo] = useState(false);
  const total = pasos.length;
  const activo = pasos[paso];

  useEffect(() => {
    setPaso(0);
    setReproduciendo(false);
  }, [pasos]);

  useEffect(() => {
    if (!reproduciendo) return undefined;
    const timer = setTimeout(() => {
      if (paso < total - 1) setPaso((p) => p + 1);
      else setReproduciendo(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, [reproduciendo, paso, total]);

  const ir = (n) => {
    setReproduciendo(false);
    setPaso(Math.max(0, Math.min(total - 1, n)));
  };

  const alternar = () => {
    if (!reproduciendo && paso === total - 1) setPaso(0);
    setReproduciendo((r) => !r);
  };

  return (
    <div className="conexion-animada">
      <svg
        viewBox="0 0 800 460"
        className="diagrama-conexion"
        role="img"
        aria-label={`Conexión: ${tipo}`}
      >
        <defs>
          <marker
            id="flechaConexion"
            markerWidth="9"
            markerHeight="9"
            refX="7"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L7,3 L0,6 Z" fill="#64748b" />
          </marker>
        </defs>
        <rect x="1" y="1" width="798" height="458" rx="16" fill="#f8fafc" stroke="#e2e8f0" />
        <PisoIso />
        {children}
        <Foco x={activo.foco.x} y={activo.foco.y} n={paso + 1} />
        <g transform="translate(22 438)">
          <line x1="0" y1="0" x2="18" y2="0" stroke={C.pos} strokeWidth="4" strokeLinecap="round" />
          <Texto x="24" y="4" size="10" weight="500" fill="#475569" anchor="start">Positivo (+)</Texto>
          <line x1="100" y1="0" x2="118" y2="0" stroke={C.neg} strokeWidth="4" strokeLinecap="round" />
          <Texto x="124" y="4" size="10" weight="500" fill="#475569" anchor="start">Negativo (−)</Texto>
          <line x1="202" y1="0" x2="220" y2="0" stroke={C.ca} strokeWidth="4" strokeLinecap="round" />
          <Texto x="226" y="4" size="10" weight="500" fill="#475569" anchor="start">CA</Texto>
          <line x1="260" y1="0" x2="278" y2="0" stroke={C.tierra} strokeWidth="4" strokeLinecap="round" />
          <Texto x="284" y="4" size="10" weight="500" fill="#475569" anchor="start">Tierra</Texto>
          <Texto x="360" y="4" size="10" weight="500" fill="#94a3b8" anchor="start">Cada círculo blanco es un punto de conexión</Texto>
        </g>
      </svg>
      <div className="conexion-pasos">
        <div className="conexion-paso-texto" aria-live="polite">
          <span className="conexion-paso-num">Paso {paso + 1} de {total}</span>
          <p>{activo.texto}</p>
        </div>
        <div className="conexion-paso-botones">
          <button type="button" onClick={() => ir(paso - 1)} disabled={paso === 0}>Volver</button>
          <button type="button" className="conexion-play" onClick={alternar}>
            {reproduciendo ? "Pausar" : "Reproducir"}
          </button>
          <button type="button" onClick={() => ir(paso + 1)} disabled={paso === total - 1}>Avanzar</button>
        </div>
      </div>
    </div>
  );
}

export default function DiagramaConexion({ tipo }) {
  if (tipo === "panel") {
    return (
      <Marco tipo="del panel al controlador" pasos={PASOS.panel}>
        <Sol x={120} y={70} />
        <IsoPanel x0={-40} y0={10} x1={140} y1={100} h={55} />
        <IsoCaja
          x={280}
          y={20}
          w={120}
          d={85}
          h={85}
          pal={PAL.controlador}
          label="CONTROLADOR"
          sub="MPPT · 24 V"
        />
        <Cable from={ip(140, 60, 55)} via={[ip(208, 58, 68)]} to={ip(280, 60, 66)} color={C.pos} marker />
        <Cable from={ip(140, 60, 35)} via={[ip(208, 58, 26)]} to={ip(280, 60, 36)} color={C.neg} marker />
        <Conector p={ip(140, 60, 55)} color={C.pos} label="MC4 +" anchor="end" />
        <Conector p={ip(140, 60, 35)} color={C.neg} label="MC4 −" anchor="end" />
        <Conector p={ip(280, 60, 66)} color={C.pos} label="PV+" />
        <Conector p={ip(280, 60, 36)} color={C.neg} label="PV−" />
        <Etiqueta x={ip(210, 100, 0).x} y={ip(210, 100, 0).y + 28} size="9.5" fill="#b45309">
          El panel nunca se conecta directo a la batería
        </Etiqueta>
      </Marco>
    );
  }

  if (tipo === "cableado") {
    return (
      <Marco tipo="calibre y ruta de los cables" pasos={PASOS.cableado}>
        <IsoPanel x0={-80} y0={10} x1={70} y1={80} h={45} label="PANEL" sub="24 V CC" />
        <IsoCaja
          x={210}
          y={0}
          w={130}
          d={75}
          h={70}
          label="CONTROLADOR"
          sub="PV+ / PV−"
          labelSize={10}
        />
        <IsoCaja
          x={-100}
          y={140}
          w={120}
          d={75}
          h={60}
          pal={PAL.bateria}
          label="BATERÍA"
          sub="24 V CC"
          labelFill="#ffffff"
          subFill="#cbd5e1"
          labelSize={10}
        />
        <IsoCaja
          x={250}
          y={140}
          w={130}
          d={85}
          h={75}
          pal={PAL.inversor}
          label="INVERSOR"
          sub="24 V → 120 V"
          labelFill="#ffffff"
          subFill="#fff7ed"
          labelSize={10}
        />
        <Cable from={ip(70, 50, 32)} via={[ip(150, 45, 48)]} to={ip(210, 40, 55)} color={C.pos} marker />
        <Cable from={ip(70, 50, 18)} via={[ip(150, 45, 22)]} to={ip(210, 40, 30)} color={C.neg} marker />
        <Cable from={ip(20, 180, 45)} via={[ip(100, 180, 45)]} to={ip(250, 180, 60)} color={C.pos} marker />
        <Cable from={ip(20, 180, 20)} via={[ip(150, 220, 18)]} to={ip(250, 180, 30)} color={C.neg} marker />
        <Conector p={ip(70, 50, 32)} color={C.pos} label="PV+" />
        <Conector p={ip(70, 50, 18)} color={C.neg} label="PV−" />
        <Conector p={ip(210, 40, 55)} color={C.pos} label="PV+" />
        <Conector p={ip(210, 40, 30)} color={C.neg} label="PV−" />
        <Conector p={ip(20, 180, 45)} color={C.pos} label="+" anchor="end" />
        <Conector p={ip(20, 180, 20)} color={C.neg} label="−" anchor="end" />
        <Conector p={ip(250, 180, 60)} color={C.pos} label="+" />
        <Conector p={ip(250, 180, 30)} color={C.neg} label="−" />
        <Fusible p={ip(110, 180, 40)} />
        <Etiqueta x={472} y={112} size="10" fill="#b45309">
          4–6 mm²
        </Etiqueta>
        <Etiqueta x={362} y={252} size="10" fill="#b45309">
          10–25 mm²
        </Etiqueta>
        <Etiqueta x={760} y={54} size="10" weight={600} fill="#b45309" anchor="end">
          Cables cortos, firmes y protegidos
        </Etiqueta>
      </Marco>
    );
  }

  if (tipo === "controlador") {
    return (
      <Marco tipo="batería primero, panel después" pasos={PASOS.controlador}>
        <IsoCaja
          x={-150}
          y={120}
          w={130}
          d={75}
          h={65}
          pal={PAL.bateria}
          label="BATERÍA"
          sub="24 V CC"
          labelFill="#ffffff"
          subFill="#cbd5e1"
        />
        <IsoCaja
          x={170}
          y={60}
          w={130}
          d={85}
          h={90}
          label="MPPT"
          sub="controlador"
        />
        <IsoPanel x0={330} y0={0} x1={450} y1={70} h={45} label="PANEL" sub="24 V CC" />
        <Cable from={ip(-20, 130, 50)} via={[ip(80, 115, 62)]} to={ip(170, 100, 65)} color={C.pos} marker />
        <Cable from={ip(-20, 130, 25)} via={[ip(80, 115, 22)]} to={ip(170, 100, 30)} color={C.neg} marker />
        <Cable from={ip(330, 60, 25)} via={[ip(265, 80, 50)]} to={ip(300, 100, 60)} color={C.pos} marker />
        <Cable from={ip(330, 60, 12)} via={[ip(265, 80, 20)]} to={ip(300, 100, 30)} color={C.neg} marker />
        <Conector p={ip(-20, 130, 50)} color={C.pos} label="+" anchor="end" />
        <Conector p={ip(-20, 130, 25)} color={C.neg} label="−" anchor="end" />
        <Conector p={ip(170, 100, 65)} color={C.pos} label="BAT+" />
        <Conector p={ip(170, 100, 30)} color={C.neg} label="BAT−" />
        <Conector p={ip(330, 60, 25)} color={C.pos} label="PV+" anchor="end" />
        <Conector p={ip(330, 60, 12)} color={C.neg} label="PV−" anchor="end" />
        <Conector p={ip(300, 100, 60)} color={C.pos} label="PV+" anchor="end" />
        <Conector p={ip(300, 100, 30)} color={C.neg} label="PV−" anchor="end" />
        <Etiqueta x={ip(235, 145, 8).x} y={ip(235, 145, 8).y} size="9" fill="#b45309">
          LOAD: solo cargas pequeñas
        </Etiqueta>
        <Etiqueta x={760} y={54} size="10" weight={600} fill="#b45309" anchor="end">
          Para apagar: primero el panel y al final la batería
        </Etiqueta>
      </Marco>
    );
  }

  if (tipo === "bateria") {
    return (
      <Marco tipo="banco de baterías en serie" pasos={PASOS.bateria}>
        <IsoCaja
          x={-15}
          y={20}
          w={105}
          d={65}
          h={50}
          pal={PAL.bateria}
          label="BATERÍA A"
          sub="12 V · ciclo profundo"
          labelFill="#ffffff"
          subFill="#cbd5e1"
        />
        <IsoCaja
          x={150}
          y={20}
          w={105}
          d={65}
          h={50}
          pal={PAL.bateria}
          label="BATERÍA B"
          sub="12 V · ciclo profundo"
          labelFill="#ffffff"
          subFill="#cbd5e1"
        />
        <IsoCaja
          x={-80}
          y={55}
          w={38}
          d={30}
          h={22}
          pal={PAL.fusible}
          label="FUSIBLE"
          labelSize={7}
        />
        <Cable from={ip(90, 52, 20)} via={[ip(118, 52, 40)]} to={ip(150, 52, 20)} color={C.neg} marker />
        <Conector p={ip(90, 52, 20)} color={C.neg} label="−" anchor="end" />
        <Conector p={ip(150, 52, 20)} color={C.pos} label="+" />
        <Texto x={ip(120, 52, 54).x} y={ip(120, 52, 54).y} size="10" weight="700" fill={C.suave}>
          puente de serie
        </Texto>
        <Cable from={ip(-15, 52, 42)} via={[ip(-42, 52, 42)]} to={ip(-42, 55, 24)} color={C.pos} />
        <Cable from={ip(-42, 55, 18)} via={[ip(-60, 52, 22)]} to={ip(-80, 52, 22)} color={C.pos} marker />
        <Conector p={ip(-15, 52, 42)} color={C.pos} />
        <Texto x={ip(-45, 52, 56).x} y={ip(-45, 52, 56).y} size="9" weight="700" fill={C.pos}>
          SALIDA 24 V (+)
        </Texto>
        <Cable from={ip(255, 52, 16)} via={[ip(280, 52, 18)]} to={ip(295, 52, 18)} color={C.neg} marker />
        <Conector p={ip(295, 52, 18)} color={C.neg} />
        <Texto x={ip(295, 52, 34).x} y={ip(295, 52, 34).y} size="9" weight="700" fill={C.neg} anchor="end">
          SALIDA 24 V (−)
        </Texto>
        <Texto x={ip(120, 90, 0).x} y={ip(120, 90, 0).y + 24} size="10" weight="500" fill="#b45309">
          Si usas una batería de 24 V, no hagas el puente de serie
        </Texto>
      </Marco>
    );
  }

  if (tipo === "inversor") {
    return (
      <Marco tipo="batería, fusible e inversor" pasos={PASOS.inversor}>
        <IsoCaja
          x={-20}
          y={60}
          w={80}
          d={55}
          h={45}
          pal={PAL.bateria}
          label="BATERÍA"
          sub="24 V CC"
          labelFill="#ffffff"
          subFill="#cbd5e1"
        />
        <IsoCaja
          x={70}
          y={60}
          w={40}
          d={30}
          h={26}
          pal={PAL.fusible}
          label="FUSIBLE"
          labelSize={7}
        />
        <IsoCaja
          x={125}
          y={45}
          w={85}
          d={60}
          h={62}
          pal={PAL.inversor}
          label="INVERSOR"
          sub="24 V CC → 120 V CA"
          labelFill="#ffffff"
          subFill="#fff7ed"
          labelSize={10}
        />
        <IsoCaja
          x={235}
          y={60}
          w={60}
          d={50}
          h={55}
          pal={PAL.ca}
          label="CA"
          sub="110/120 V"
          labelSize={11}
        />
        <Cable from={ip(60, 87, 38)} via={[ip(66, 80, 34)]} to={ip(70, 75, 22)} color={C.pos} />
        <Cable from={ip(110, 75, 20)} via={[ip(118, 75, 34)]} to={ip(125, 75, 44)} color={C.pos} marker />
        <Cable from={ip(60, 87, 16)} via={[ip(112, 87, 14)]} to={ip(125, 75, 18)} color={C.neg} marker />
        <Cable from={ip(210, 75, 40)} via={[ip(222, 80, 44)]} to={ip(235, 80, 40)} color={C.ca} marker />
        <Conector p={ip(60, 87, 38)} color={C.pos} label="+" anchor="end" />
        <Conector p={ip(60, 87, 16)} color={C.neg} label="−" anchor="end" />
        <Conector p={ip(125, 75, 44)} color={C.pos} />
        <Conector p={ip(125, 75, 18)} color={C.neg} />
        <Conector p={ip(235, 80, 40)} color={C.ca} />
        <Texto x={ip(90, 60, 52).x} y={ip(90, 60, 52).y} size="9" weight="600" fill="#b45309">positivo protegido</Texto>
        <Texto x={ip(145, 105, 0).x} y={ip(145, 105, 0).y + 18} size="9" weight="600" fill={C.tierra}>tierra</Texto>
        <line
          x1={ip(165, 105, 0).x}
          y1={ip(165, 105, 0).y}
          x2={ip(165, 105, 0).x}
          y2={ip(165, 105, 0).y + 14}
          stroke={C.tierra}
          strokeWidth="3"
        />
        <line
          x1={ip(165, 105, 0).x - 8}
          y1={ip(165, 105, 0).y + 14}
          x2={ip(165, 105, 0).x + 8}
          y2={ip(165, 105, 0).y + 14}
          stroke={C.tierra}
          strokeWidth="3"
        />
        <Texto x={ip(210, 95, 0).x} y={ip(210, 95, 0).y + 40} size="10" weight="500" fill="#b45309">
          No conectes la salida CA a la batería ni al controlador
        </Texto>
      </Marco>
    );
  }

  return (
    <Marco tipo="salida de corriente alterna a los aparatos" pasos={PASOS.cargas}>
      <IsoCaja
        x={-25}
        y={55}
        w={80}
        d={60}
        h={58}
        pal={PAL.inversor}
        label="INVERSOR"
        sub="salida CA"
        labelFill="#ffffff"
        subFill="#fff7ed"
        labelSize={10}
      />
      <IsoCaja
        x={105}
        y={55}
        w={55}
        d={45}
        h={30}
        pal={PAL.regleta}
        label="REGATA"
        labelSize={9}
      >
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            cx={ip(120 + i * 14, 78, 30).x}
            cy={ip(120 + i * 14, 78, 30).y}
            r="3.5"
            fill="#94a3b8"
          />
        ))}
      </IsoCaja>
      <Cable from={ip(55, 85, 40)} via={[ip(82, 80, 34)]} to={ip(105, 78, 28)} color={C.ca} marker />
      <Conector p={ip(55, 85, 40)} color={C.ca} />
      <Conector p={ip(105, 78, 28)} color={C.ca} />
      <IsoCaja
        x={190}
        y={30}
        w={50}
        d={35}
        h={38}
        pal={PAL.carga}
        label="LICUADORA"
        sub="mayor consumo"
        labelSize={8}
      />
      <IsoCaja
        x={245}
        y={30}
        w={50}
        d={35}
        h={38}
        pal={PAL.carga}
        label="LUCES"
        sub="uso nocturno"
        labelSize={9}
      />
      <IsoCaja
        x={300}
        y={30}
        w={50}
        d={35}
        h={38}
        pal={PAL.carga}
        label="CARGADORES"
        sub="bajo consumo"
        labelSize={7.5}
      />
      <Cable from={ip(160, 78, 22)} via={[ip(175, 55, 30)]} to={ip(190, 47, 24)} color={C.ca} />
      <Cable from={ip(160, 78, 18)} via={[ip(178, 47, 28)]} to={ip(245, 47, 24)} color={C.ca} />
      <Cable from={ip(160, 78, 14)} via={[ip(190, 40, 26)]} to={ip(300, 47, 24)} color={C.ca} />
      <Conector p={ip(160, 78, 22)} color={C.ca} />
      <Conector p={ip(190, 47, 24)} color={C.ca} />
      <Conector p={ip(245, 47, 24)} color={C.ca} />
      <Conector p={ip(300, 47, 24)} color={C.ca} />
      <Texto x={ip(250, 100, 0).x} y={ip(250, 100, 0).y + 40} size="10" weight="500" fill="#b45309">
        Enciende uno por uno, empezando por el de menor consumo
      </Texto>
    </Marco>
  );
}
