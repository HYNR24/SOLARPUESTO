import { useEffect, useMemo, useState } from "react";
import { dimensionar, horasDeUso, formatoHoras, DEFAULTS } from "./lib/formulas.js";
import { CASOS } from "./lib/casos.js";
import { validarTabla } from "./lib/validaciones.js";
import { cargar, guardar, vaciar } from "./lib/almacen.js";

const siguienteId = (lista) => lista.reduce((m, a) => Math.max(m, Number(a.id) || 0), 0) + 1;

const nuevoAparato = (id) => ({
  id,
  nombre: "",
  cantidad: 1,
  potencia: "",
  tipo: "usos",
  horario: "dia",
  min: "",
  usos: "",
  horas: "",
  horasConectado: "",
  ciclo: ""
});

const GUIA = [
  {
    titulo: "1. Puesto de jugos 🥤",
    componentes: ["Licuadora", "Cuchillos", "Nevera portátil*"],
    equipos: ["Panel 450W", "Batería 12V", "Inversor 1200W"],
    pasos: [
      "Coloca la licuadora solo con el inversor encendido.",
      "Usa la licuadora a ráfagas (no continua) para ahorrar batería.",
      "Carga el teléfono / datáfono en las horas sin uso.",
      "Al cerrar, apaga el inversor y protege el panel."
    ],
    advertencia: "⚠ Si usa nevera, no conectes licuadora y nevera al mismo tiempo."
  },
  {
    titulo: "2. Iluminación LED + celular/datáfono 📱",
    componentes: ["Lámparas LED", "Celular", "Datáfono"],
    equipos: ["Panel 100–200W", "Batería 12V", "Inversor 300–600W"],
    pasos: [
      "Instala las lámparas LED sobre las áreas de atención.",
      "Elige bombillos LED de bajo consumo (5–10 W).",
      "Carga el datáfono durante el día con el panel.",
      "Apaga luces de zonas sin ventas."
    ]
  },
  {
    titulo: "3. Alimentos con refrigerador pequeño ❄️",
    componentes: ["Refrigerador", "Iluminación LED"],
    equipos: ["Panel 500W+", "Batería 200Ah", "Inversor 1500W"],
    pasos: [
      "No abrir el refrigerador con frecuencia.",
      "Regula el termostato a un valor medio.",
      "Ubica el refrigerador en sombra."
    ],
    advertencia: "⚠ Alerta: el refrigerador es el mayor consumidor. Es importante dimensionarlo junto a los demás aparatos."
  },
  {
    titulo: "4. Puesto mixto (licuadora + luces + datáfono) 🥤💡",
    componentes: ["Licuadora", "Lámparas LED", "Datáfono"],
    equipos: ["Panel 450W", "Batería 150Ah", "Inversor 1200W"],
    pasos: [
      "Usa la licuadora por turnos cortos.",
      "Mantén el datáfono conectado solo para cobrar.",
      "Cerciórate de que las luces sean LED."
    ],
    advertencia: "⚠ No exceder la capacidad del inversor combinando más de un equipo de alto consumo."
  },
  {
    titulo: "5. Puesto de fritura (elemento de calor + ventilador) 🍟",
    componentes: ["Fritadora", "Ventilador", "Iluminación"],
    equipos: ["Panel 600W+", "Batería 200Ah", "Inversor 2000W"],
    pasos: [
      "Ubica el panel y equipos lejos de aceite y agua.",
      "Habilita el ventilador para extraer humo.",
      "Revisa que los cables estén lejos de calor."
    ],
    advertencia: "⚠ Alto consumo de calor: evaluación con experto para el dimensionamiento."
  }
];

const iconoHorario = (h) => (h === "noche" ? "🌙 " : h === "ambos" ? "🌗 " : "☀️ ");

function App() {
  const [tab, setTab] = useState("carga");
  // RFN-05: la tabla de carga y los parametros se recuperan del navegador.
  const [guardado] = useState(() => cargar());
  const [aparatos, setAparatos] = useState(guardado ? guardado.aparatos : []);
  const [params, setParams] = useState(guardado ? guardado.params : { ...DEFAULTS });
  const [intento, setIntento] = useState(false);

  const datos = useMemo(() => dimensionar(aparatos, params), [aparatos, params]);
  const validacion = useMemo(() => validarTabla(aparatos), [aparatos]);
  // Los errores solo se muestran despues de pulsar "Calcular resultado".
  const errores = intento && !validacion.ok ? validacion.erroresPorFila : {};
  const cargado = aparatos.some(
    (a) => a.nombre.trim() && (parseFloat(a.potencia) || 0) > 0
  );

  // Autoguardado en localStorage ante cualquier cambio.
  useEffect(() => {
    guardar(aparatos, params);
  }, [aparatos, params]);

  const setAparato = (id, campo, valor) =>
    setAparatos((lista) => lista.map((a) => (a.id === id ? { ...a, [campo]: valor } : a)));

  const agregar = () => setAparatos((l) => [...l, nuevoAparato(siguienteId(l))]);

  const eliminar = (id) => {
    if (!window.confirm("¿Eliminar este aparato?")) return;
    setAparatos((l) => l.filter((a) => a.id !== id));
  };

  const cargarCaso = (i) => {
    setIntento(false);
    setAparatos(CASOS[i].filas.map((f, k) => ({ ...f, id: k + 1 })));
  };

  const vaciarTodo = () => {
    if (!window.confirm("¿Borrar la tabla de carga y los parámetros guardados?")) return;
    vaciar();
    setAparatos([]);
    setParams({ ...DEFAULTS });
    setIntento(false);
    setTab("carga");
  };

  const calcular = () => {
    setIntento(true);
    if (!validacion.ok) return; // no se avanza al resultado: primero se corrige
    setIntento(false);
    setTab("resultado");
  };

  const setParam = (campo, valor) => setParams((p) => ({ ...p, [campo]: valor }));

  return (
    <div className="app">
      <header>
        <div className="sol" aria-hidden="true">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4.2" fill="#b45309" />
            <g stroke="#b45309" strokeWidth="1.8" strokeLinecap="round">
              <line x1="12" y1="1.5" x2="12" y2="4" />
              <line x1="12" y1="20" x2="12" y2="22.5" />
              <line x1="1.5" y1="12" x2="4" y2="12" />
              <line x1="20" y1="12" x2="22.5" y2="12" />
              <line x1="4.3" y1="4.3" x2="6" y2="6" />
              <line x1="18" y1="18" x2="19.8" y2="19.8" />
              <line x1="4.3" y1="19.7" x2="6" y2="18" />
              <line x1="18" y1="6" x2="19.8" y2="4.2" />
            </g>
          </svg>
        </div>
        <div>
          <h1>SolarPuesto <span className="vers">V1.0</span></h1>
          <div className="subtitulo">Calculadora de potencia y material para puestos de comercio informal</div>
        </div>
      </header>

      <nav>
        <button className={tab === "carga" ? "activo" : ""} onClick={() => setTab("carga")}>1. Carga de aparatos</button>
        <button className={tab === "resultado" ? "activo" : ""} onClick={() => setTab("resultado")}>2. Resultado</button>
        <button className={tab === "guia" ? "activo" : ""} onClick={() => setTab("guia")}>3. Guía de instalación</button>
      </nav>

      <main>
        {tab === "carga" && (
          <>
            <div className="aviso">
              Agrega los elementos que usa <b>tu</b> negocio (licuadora, luces, nevera, celular…). Para cada uno elige su
              <b> tipo de uso</b> y la app calcula el consumo acertado según cuánto lo usas:
              <br />🔁 <b>Por usos</b> = veces que lo prendes · ⏱ <b>Continuo</b> = prendido toda la jornada · ❄️ <b>Refrigeración</b> = compresor con ciclo de trabajo.
              La potencia real (W) es la que aparece en la etiqueta de cada aparato.
              <br />💾 <b>Tu tabla y los parámetros quedan guardados en este navegador</b> (almacenamiento local, sin servidor): si cierras la app, la vuelves a encontrar igual.
            </div>

            <section className="tarjeta">
              <h3>🌐 Ejemplos reales de puestos ambulantes</h3>
              <p className="ayuda">Elige un tipo de puesto para cargar sus aparatos con valores reales. Puedes editar todo y agregar lo que use tu negocio.</p>
              <div className="barra-botones">
                {CASOS.map((c, i) => (
                  <button key={c.nombre} className="btn btn-ejemplo" onClick={() => cargarCaso(i)}>{c.nombre}</button>
                ))}
              </div>
            </section>

            <section className="tarjeta">
              <h3>📝 Tabla de carga de aparatos de tu puesto</h3>
              <p className="ayuda">
                💡 Si un aparato está encendido toda la jornada (luces, radio, datáfono), usa el tipo <b>⏱ Continuo</b>.
                Indica el <b>Horario</b> de cada aparato (☀️ día, 🌙 noche o ambos): la app garantiza que la batería cubra lo que se usa cuando no hay sol.
              </p>

              {intento && !validacion.ok && (
                <div className="resumen-errores" role="alert">
                  <b>
                    ⚠ Revisa {validacion.camposConError}{" "}
                    {validacion.camposConError === 1 ? "campo" : "campos"} en{" "}
                    {validacion.filasConError}{" "}
                    {validacion.filasConError === 1 ? "fila" : "filas"}:
                  </b>
                  <ul>
                    {validacion.mensajes.slice(0, 6).map((m, i) => <li key={i}>{m}</li>)}
                  </ul>
                  {validacion.mensajes.length > 6 && (
                    <div className="mas-errores">… y {validacion.mensajes.length - 6} mensajes más.</div>
                  )}
                </div>
              )}

              <div className="tabla-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Aparato</th>
                      <th className="centrada">Cant.</th>
                      <th>Potencia real (W)</th>
                      <th>Tipo de uso</th>
                      <th>Horario</th>
                      <th>Uso en la jornada</th>
                      <th>Uso total (auto)</th>
                      <th className="centrada">Elim.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aparatos.map((a) => (
                      <FilaClave key={a.id} a={a} errores={errores[a.id]} onChange={setAparato} onEliminar={eliminar} />
                    ))}
                  </tbody>
                </table>
              </div>
              {aparatos.length === 0 && (
                <div className="vacio">Aún no hay aparatos. Haz clic en un ejemplo o en «Añadir aparato».</div>
              )}
              <div className="barra-botones">
                <button className="btn btn-secundario" onClick={agregar}>➕ Añadir aparato</button>
                <button className="btn btn-primario" onClick={calcular}>🔍 Calcular resultado</button>
                {aparatos.length > 0 && (
                  <button className="btn btn-secundario" onClick={vaciarTodo}>🗑 Vaciar todo</button>
                )}
              </div>
            </section>
          </>
        )}

        {tab === "resultado" && (
          <>
            <div className="aviso">
              Este es tu resultado: la energía que consume tu puesto por día y el material solar que necesitas.
              <button className="btn btn-secundario imprimir" onClick={() => window.print()}>🖨️ Imprimir / PDF</button>
            </div>

            <div className="grid-resultado">
              <div className="kpi kpi-w">
                <div className="valor">{cargado ? datos.totalW.toLocaleString("es") : "—"}</div>
                <div className="etiqueta">Potencia instalada (W)</div>
              </div>
              <div className="kpi kpi-wh">
                <div className="valor">{cargado ? datos.totalWh.toLocaleString("es") : "—"}</div>
                <div className="etiqueta">Energía diaria (Wh/día)</div>
              </div>
              <div className="kpi kpi-nocturno">
                <div className="valor">{cargado ? datos.nocturnoWh.toLocaleString("es") : "—"}</div>
                <div className="etiqueta">Consumo nocturno — lo cubre la batería 🌙</div>
              </div>
            </div>

            <section className="tarjeta">
              <h3>📊 Desglose por aparato (según el uso real de tu jornada)</h3>
              <div id="desglose">
                {cargado ? (
                  <table>
                    <thead>
                      <tr>
                        <th>Aparato</th>
                        <th>Potencia</th>
                        <th>Uso real/día</th>
                        <th>Energía</th>
                        <th>Participación</th>
                      </tr>
                    </thead>
                    <tbody>
                      {datos.filas.map((f) => {
                        const pct = datos.totalWh > 0 ? (f.energiaWh / datos.totalWh) * 100 : 0;
                        return (
                          <tr key={f.id}>
                            <td className="nombre-celda">{f.nombre}</td>
                            <td>{f.potenciaTotal.toLocaleString("es")} W</td>
                            <td>{iconoHorario(f.horario)}{formatoHoras(f.horas)}</td>
                            <td>{f.energiaWh.toLocaleString("es")} Wh</td>
                            <td>
                              <span className="barra-pct" style={{ width: `${Math.max(4, Math.min(100, pct * 2))}px` }} />
                              {" "}{pct.toFixed(0)}%
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <div className="aviso">Agrega aparatos en la pestaña 1 para ver el desglose.</div>
                )}
              </div>
            </section>

            <section className="tarjeta">
              <h3>⚙️ Parámetros configurables</h3>
              <div className="parametros">
                <Campo label="Horas pico solar (HSP)" valor={params.hsp} paso="0.1" min="1" max="8" onChange={(v) => setParam("hsp", v)} />
                <Campo label="Eficiencia del sistema" valor={params.eff} paso="0.05" min="0.2" max="1" onChange={(v) => setParam("eff", v)} />
                <Campo label="Margen de pérdidas (%)" valor={params.margen * 100} paso="5" min="0" max="100" onChange={(v) => setParam("margen", v / 100)} />
                <Campo label="Tensión batería (V)" valor={params.tension} paso="1" min="12" max="48" onChange={(v) => setParam("tension", v)} />
                <Campo label="Profundidad de descarga (%)" valor={params.dod * 100} paso="5" min="10" max="90" onChange={(v) => setParam("dod", v / 100)} />
                <Campo label="Potencia del panel (Wp)" valor={params.ppanel} paso="10" min="50" max="550" onChange={(v) => setParam("ppanel", v)} />
              </div>
              <div className="barra-botones">
                <button className="btn btn-secundario" onClick={() => setTab("carga")}>↩ Volver a la carga</button>
              </div>
            </section>

            <section className="tarjeta">
              <h3>🔥 Dimensionamiento del sistema solar</h3>
              {cargado ? (
                <>
                  <Material icono="🔆" nombre="Paneles fotovoltaicos"
                    detalle={`${params.ppanel} Wp · requerido ${Math.round(datos.wp)} Wp · HSP ${params.hsp} (recargan la batería de día)`}
                    valor={`${datos.nPaneles} panel(es)`} />
                  <Material icono="🔋" nombre="Banco de baterías"
                    detalle={`${params.tension} V · DOD ${Math.round(params.dod * 100)}%${datos.nocturnoWh > 0 ? ` · cubre 🌙 ${datos.nocturnoWh.toLocaleString("es")} Wh de noche` : ""}`}
                    valor={`${Math.round(datos.ah)} Ah`} />
                  <Material icono="⚡" nombre="Inversor"
                    detalle={`margen 25% de arranque sobre pico ${datos.pico.toLocaleString("es")} W`}
                    valor={`≥ ${Math.ceil(datos.watInversor)} W`} />
                  <div className="garantia">
                    ✅ <b>Garantía:</b> el inversor (≥ {Math.ceil(datos.watInversor)} W) cubre tu potencia pico de {datos.pico.toLocaleString("es")} W
                    (todo encendido a la vez). La batería cubre los {datos.totalWh.toLocaleString("es")} Wh/día —incluidos los {datos.nocturnoWh.toLocaleString("es")} Wh que se usan
                    <b> sin sol</b> (🌙)— con margen del 25% y DOD. Los paneles la recargan dentro de las {params.hsp} h de sol pico de la zona.
                    El dimensionamiento se calculó con el <b>uso real</b> de cada elemento. Si cambia el uso, recalcula.
                  </div>
                </>
              ) : (
                <div className="aviso">Agrega aparatos en la pestaña 1 para ver el dimensionamiento.</div>
              )}
            </section>
          </>
        )}

        {tab === "guia" && (
          <>
            <div className="aviso">
              Ejemplos por tipo de puesto, con los componentes que necesitas y cómo instalarlos y usarlos de forma segura.
            </div>
            <div className="casos">
              {GUIA.map((c) => (
                <article className="caso" key={c.titulo}>
                  <h4>{c.titulo}</h4>
                  <div className="componentes">
                    {c.componentes.map((x) => <span key={x}>{x}</span>)}
                  </div>
                  <div className="componentes">
                    {c.equipos.map((x) => <span key={x}>{x}</span>)}
                  </div>
                  <ol>
                    {c.pasos.map((p) => <li key={p}>{p}</li>)}
                  </ol>
                  {c.advertencia && <div className="advertencia">{c.advertencia}</div>}
                </article>
              ))}
            </div>
          </>
        )}
      </main>

      <footer className="pie-demo">
        Fase 3 · Desarrollo (MVP) — Hito M3 · Acta de Reunión No. 004 · SolarPuesto V1.0
      </footer>
    </div>
  );
}

function FilaClave({ a, errores = {}, onChange, onEliminar }) {
  const horas = horasDeUso(a);
  const wh = (parseFloat(a.potencia) || 0) * horas;
  // clase "error" + title con el mensaje: el campo se marca en rojo al instante.
  const cls = (campo, base) => (errores[campo] ? `${base} error` : base);
  const title = (campo) => (errores[campo] ? { title: errores[campo] } : {});
  return (
    <tr>
      <td><input className={cls("nombre", "lectura nombre")} value={a.nombre} placeholder="Ej: Licuadora" onChange={(e) => onChange(a.id, "nombre", e.target.value)} {...title("nombre")} /></td>
      <td className="centrada"><input className={cls("cantidad", "lectura cantidad")} type="number" min="1" step="1" value={a.cantidad} onChange={(e) => onChange(a.id, "cantidad", e.target.value)} {...title("cantidad")} /></td>
      <td><input className={cls("potencia", "lectura potencia")} type="number" min="0" step="0.1" value={a.potencia} placeholder="W real" onChange={(e) => onChange(a.id, "potencia", e.target.value)} {...title("potencia")} /></td>
      <td>
        <select className="tipo" value={a.tipo} onChange={(e) => onChange(a.id, "tipo", e.target.value)}>
          <option value="usos">🔁 Por usos</option>
          <option value="continuo">⏱ Continuo</option>
          <option value="refri">❄️ Refrigeración</option>
        </select>
      </td>
      <td>
        <select className="horario" value={a.horario} onChange={(e) => onChange(a.id, "horario", e.target.value)}>
          <option value="dia">☀️ Día</option>
          <option value="noche">🌙 Noche</option>
          <option value="ambos">🌗 Ambos</option>
        </select>
      </td>
      <td>
        <div className="uso-container">
          {a.tipo === "usos" && (<>
            <input className={cls("min", "min_uso")} type="number" min="0" step="1" value={a.min} placeholder="Min por uso" onChange={(e) => onChange(a.id, "min", e.target.value)} {...title("min")} />
            <input className={cls("usos", "usos_dia")} type="number" min="1" step="1" value={a.usos} placeholder="Usos/día" onChange={(e) => onChange(a.id, "usos", e.target.value)} {...title("usos")} />
          </>)}
          {a.tipo === "continuo" && (
            <input className={cls("horas", "horas_dia")} type="number" min="0" max="24" step="0.5" value={a.horas} placeholder="Horas encendido/día" onChange={(e) => onChange(a.id, "horas", e.target.value)} {...title("horas")} />
          )}
          {a.tipo === "refri" && (<>
            <input className={cls("horasConectado", "horas_conn")} type="number" min="0" max="24" step="0.5" value={a.horasConectado} placeholder="H conectado" onChange={(e) => onChange(a.id, "horasConectado", e.target.value)} {...title("horasConectado")} />
            <input className={cls("ciclo", "ciclo")} type="number" min="20" max="60" step="5" value={a.ciclo} placeholder="Ciclo %" onChange={(e) => onChange(a.id, "ciclo", e.target.value)} {...title("ciclo")} />
          </>)}
        </div>
      </td>
      <td className={errores.uso ? "celda-uso-total error" : "celda-uso-total"} title={errores.uso || ""}>
        {horas > 0 ? (<>
          {iconoHorario(a.horario)}{formatoHoras(horas)}
          <small>{a.tipo === "continuo" ? "encendido" : a.tipo === "usos" ? `${a.min || "?"} min × ${a.usos || "?"} usos` : `${a.horasConectado || "?"} h × ${a.ciclo || "?"}%`}</small>
          {wh > 0 && <small>≈ {(wh).toLocaleString("es")} Wh/día</small>}
        </>) : "—"}
      </td>
      <td className="centrada">
        <button className="btn btn-accion btn-eliminar" onClick={() => onEliminar(a.id)}>🗑</button>
      </td>
    </tr>
  );
}

function Campo({ label, valor, onChange, paso, min, max }) {
  return (
    <div className="campo">
      <label>{label}</label>
      <input type="number" step={paso} min={min} max={max} value={valor}
        onChange={(e) => {
          const v = parseFloat(e.target.value);
          onChange(isNaN(v) ? 0 : v);
        }} />
    </div>
  );
}

function Material({ icono, nombre, detalle, valor }) {
  return (
    <div className="item-material">
      <div className="icono">{icono}</div>
      <div>
        <div className="nombre">{nombre}</div>
        <div className="detalle">{detalle}</div>
      </div>
      <div className="valor">{valor}</div>
    </div>
  );
}

export { App };