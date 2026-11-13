import { useEffect, useRef, useState } from "react";
import { GUIA_INTRO, PASOS_MONTAJE, RECOMENDACIONES } from "../lib/guiaInstalacion.js";
import { MANUAL_EJEMPLO } from "../lib/manual.js";
import SvgSistema from "./SvgSistema.jsx";
import IlustracionPaso from "./IlustracionPaso.jsx";
import DiagramaConexion from "./DiagramaConexion.jsx";

// Guía de instalación como carrusel: se genera con base en lo que hay en la tabla.
// Sin datos calculados solo muestra portada + indicación para completar la tabla.
export default function GuiaManual({ datos, cargado }) {
  const tieneSistema = !!(datos && (Number(datos.totalWh) > 0 || Number(datos.totalW) > 0));
  const potencia = tieneSistema ? Math.round(datos.totalW || 0) : null;
  const energia = tieneSistema ? Math.round(datos.totalWh || 0) : null;
  const nocturno = tieneSistema ? Math.round(datos.nocturnoWh || 0) : null;
  const paneles = tieneSistema ? datos.nPaneles : null;
  const ah = tieneSistema ? Math.round(datos.ah || 0) : null;
  const inversor = tieneSistema ? Math.ceil(datos.watInversor || 0) : null;
  const controlador = tieneSistema ? datos.ampControlador : null;
  const tension = tieneSistema ? datos.tension : null;

  const slides = [
    {
      id: "portada",
      contenido: (
        <>
          <span className="guia-badge">Guía única para tu sistema</span>
          <h3>Guía de instalación personalizada</h3>
          <p className="guia-subtitulo">
            Esta guía se construye con lo que ingresaste en la pestaña 1. Sin aparatos calculados, se queda
            en espera para generar un manual hecho a medida para tu puesto.
          </p>
          <div className="como-funciona">
            <p className="manual-parrafo">
              1) Completa la tabla de carga o carga un ejemplo desde la pestaña 1.
            </p>
            <p className="manual-parrafo">
              2) Pulsa <b>Calcular resultado</b> para dimensionar paneles, baterías, inversor y controlador.
            </p>
            <p className="manual-parrafo">
              3) Vuelve aquí para ver el diagrama, los pasos, el material exacto y las recomendaciones
              adaptados a tu consumo.
            </p>
          </div>
          <div className="guia-resumen">
            <article className="guia-resumen-item">
              <span>Potencia pico</span>
              <strong>{potencia != null ? `${potencia} W` : "Sin calcular"}</strong>
            </article>
            <article className="guia-resumen-item">
              <span>Energía diaria</span>
              <strong>{energia != null ? `${energia} Wh/día` : "Sin calcular"}</strong>
            </article>
            <article className="guia-resumen-item">
              <span>Consumo nocturno</span>
              <strong>{nocturno != null ? `${nocturno} Wh/día` : "Sin calcular"}</strong>
            </article>
            <article className="guia-resumen-item">
              <span>Banco / Inversor</span>
              <strong>
                {ah != null && tension != null && inversor != null
                  ? `${tension} V · ${ah} Ah · ≥ ${inversor} W`
                  : "Sin calcular"}
              </strong>
            </article>
          </div>
        </>
      )
    },
    {
      id: "diagrama",
      contenido: (
        <>
          <h3>🧭 Diagrama único de tu sistema</h3>
          <p className="ayuda">
            Este recorrido se genera con los valores calculados. Solo se muestra el detalle cuando ya
            hay un dimensionamiento listo.
          </p>
          {tieneSistema ? (
            <>
              <SvgSistema datos={datos} />
              <div className="guia-dimension">
                <span>Paneles: <b>{paneles} × {datos.ppanel} Wp</b></span>
                <span>Controlador: <b>≥ {controlador} A</b></span>
                <span>Baterías: <b>{tension} V · {ah} Ah (DOD {Math.round(datos.dod * 100)}%)</b></span>
                <span>Inversor: <b>≥ {inversor} W</b></span>
              </div>
            </>
          ) : (
            <div className="guia-espera">
              <div className="guia-espera-icono">⏳</div>
              <div>
                <h4>Esperando cálculo</h4>
                <p>
                  Aún no hay dimensionamiento. Ve a la pestaña <b>1. Carga de aparatos</b>, agrega tus
                  aparatos o carga un ejemplo y pulsa <b>Calcular resultado</b>.
                </p>
              </div>
            </div>
          )}
          <div className="leyenda-sistema">
            <span><i style={{ background: "#2563eb" }} /> Panel solar</span>
            <span><i style={{ background: "#0f172a" }} /> Corriente continua (CC)</span>
            <span><i style={{ background: "#f59e0b" }} /> Corriente alterna (CA)</span>
          </div>
        </>
      )
    },
    ...PASOS_MONTAJE.map((paso) => ({
      id: `paso-${paso.n}`,
      contenido: (
        <div className="capitulo capitulo-slide">
          <header className="cap-cabecera">
            <div className="cap-ilustracion">
              <span className="cap-num">{paso.n}</span>
              <IlustracionPaso tipo={paso.key} />
            </div>
            <div className="cap-intro">
              <h3>{paso.icono} {paso.titulo}</h3>
              <p className="cap-resumen">{paso.resumen}</p>
              <ol>
                {paso.acciones.map((a, k) => <li key={k}>{a}</li>)}
              </ol>
              <div className="cap-tip">💡 {paso.tip}</div>
            </div>
          </header>
          <div className="cap-conexion">
            <div className="cap-conexion-cabecera">
              <span className="cap-conexion-etiqueta">Conexión</span>
              <h4>{paso.conexion.titulo}</h4>
            </div>
            <DiagramaConexion tipo={paso.key} />
            <p className="cap-conexion-texto">{paso.conexion.descripcion}</p>
            <p className="cap-conexion-aviso"><strong>Atención:</strong> {paso.conexion.aviso}</p>
          </div>
          <h4 className="cap-materiales-titulo">🧰 Materiales de este paso</h4>
          <div className="cap-materiales">
            {paso.materiales.map((m) => (
              <figure className="cap-material" key={m.nombre}>
                <a
                  className="cap-material-foto"
                  href={m.imagen}
                  target="_blank"
                  rel="noreferrer"
                  title={`Ver foto completa: ${m.nombre}`}
                >
                  <img src={m.imagen} alt={m.alt} loading="lazy" />
                </a>
                <figcaption>
                  <span className="cap-material-badge">Foto real</span>
                  <strong>{m.nombre}</strong>
                  <span className="cap-material-detalle">{m.detalle}</span>
                  <a href={m.fuente} target="_blank" rel="noreferrer">
                    {m.credito} · {m.licencia}
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )
    })),
    ...(tieneSistema
      ? [
          {
            id: "recomendaciones",
            contenido: (
              <>
                <h3>⭐ Recomendaciones para tu sistema</h3>
                <p className="ayuda">Consejos adaptados al dimensionamiento de tu puesto.</p>
                <div className="recomendaciones">
                  {RECOMENDACIONES.map((r) => (
                    <article className="reco" key={r.titulo}>
                      <span className="reco-icono" aria-hidden="true">{r.icono}</span>
                      <div>
                        <h4>{r.titulo}</h4>
                        <p>{r.texto}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )
          },
          {
            id: "dia",
            contenido: (
              <>
                <h3>📖 {MANUAL_EJEMPLO.titulo}</h3>
                {MANUAL_EJEMPLO.bloques.map((b, i) => (
                  <p key={i} className="manual-parrafo">{b}</p>
                ))}
              </>
            )
          }
        ]
      : []),
  ];

  const total = slides.length;
  const [indice, setIndice] = useState(0);
  const contRef = useRef(null);

  const ir = (i) => setIndice(Math.max(0, Math.min(total - 1, i)));

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") setIndice((i) => Math.min(total - 1, i + 1));
      if (e.key === "ArrowLeft") setIndice((i) => Math.max(0, i - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  useEffect(() => {
    contRef.current?.scrollIntoView?.({ behavior: "smooth", block: "start" });
  }, [indice]);

  const slide = slides[indice];

  return (
    <section className="tarjeta slider" ref={contRef}>
      <div className="slide" key={slide.id} aria-live="polite">
        {slide.contenido}
      </div>
      {!tieneSistema && indice >= 1 && (
        <div className="guia-espera guia-espera-inline">
          <div className="guia-espera-icono">⚠️</div>
          <div>
            <h4>Falta calcular el sistema</h4>
            <p>
              Para generar los pasos de conexión, el diagrama personalizado, materiales exactos y
              recomendaciones, primero calcula en <b>1. Carga de aparatos → Calcular resultado</b>.
            </p>
          </div>
        </div>
      )}

      <div className="slider-controles">
        <button
          type="button"
          className="slider-flecha"
          onClick={() => ir(indice - 1)}
          disabled={indice === 0}
          aria-label="Anterior"
        >
          ←
        </button>

        <div className="slider-centro">
          <span className="slider-contador">Paso {indice + 1} de {total}</span>
          <div className="slider-dots">
            {slides.map((s, i) => (
              <button
                type="button"
                key={s.id}
                className={`slider-dot ${i === indice ? "activo" : ""}`}
                onClick={() => ir(i)}
                aria-label={`Ir al paso ${i + 1}`}
                aria-current={i === indice ? "step" : undefined}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          className="slider-flecha"
          onClick={() => ir(indice + 1)}
          disabled={indice === total - 1}
          aria-label="Siguiente"
        >
          →
        </button>
      </div>
    </section>
  );
}
