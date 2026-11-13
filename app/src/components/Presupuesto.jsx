import { useMemo } from "react";

const TRM = 4000;

// Precios referenciales COP basados en mercado colombiano/kits
const PRECIO_COP = {
  panelWp: 1120, // COP/Wp aprox
  bateriaAh12: 9600, // COP/Ah aprox (AGM)
  bateriaAh24: 11040, // COP/Ah aprox
  inversorW: 960, // COP/W
  controladorA: 36000, // COP/A
  estructuraWp: 240, // COP/Wp
  cableadoWp: 200, // COP/Wp
  proteccionesWp: 120, // COP/Wp
  otrosWp: 80 // COP/Wp
};

function fmtCop(n) {
  return Number(n || 0).toLocaleString("es-CO");
}

export default function Presupuesto({ datos, cargado }) {
  const items = useMemo(() => {
    if (!cargado || !datos || !(datos.totalWh > 0)) return [];
    const paneles = datos.nPaneles || 0;
    const pWp = datos.ppanel || 450;
    const totalWp = paneles * pWp;
    const ah = Math.round(datos.ah || 0);
    const invW = Math.ceil(datos.watInversor || 0);
    const ctrlA = datos.ampControlador || 0;
    const t = datos.tension || 24;

    const puBateria = t === 12 ? ah * PRECIO_COP.bateriaAh12 : ah * PRECIO_COP.bateriaAh24;
    const puPaneles = paneles * pWp * PRECIO_COP.panelWp;
    const puInv = invW * PRECIO_COP.inversorW;
    const puCtrl = ctrlA * PRECIO_COP.controladorA;
    const puEstr = totalWp * PRECIO_COP.estructuraWp;
    const puCable = totalWp * PRECIO_COP.cableadoWp;
    const puProt = totalWp * PRECIO_COP.proteccionesWp;
    const puOtros = totalWp * PRECIO_COP.otrosWp;

    const list = [];
    list.push({ grupo: "GENERACIÓN", concepto: `Paneles fotovoltaicos monocristalinos ${pWp} Wp`, cant: paneles, unidad: "und", pu: pWp * PRECIO_COP.panelWp, st: puPaneles, obs: `Potencia total: ${totalWp.toLocaleString("es-CO")} Wp` });
    list.push({ grupo: "ALMACENAMIENTO", concepto: `Banco de baterías ${t} V (AGM/Gel)`, cant: ah, unidad: "Ah", pu: t === 12 ? PRECIO_COP.bateriaAh12 : PRECIO_COP.bateriaAh24, st: puBateria, obs: `DOD aprox. ${Math.round((datos.dod||0.5)*100)}%` });
    list.push({ grupo: "CONVERSIÓN Y CONTROL", concepto: "Inversor (onda pura/modificada)", cant: invW, unidad: "W", pu: PRECIO_COP.inversorW, st: puInv, obs: `Capacidad ≥ ${invW.toLocaleString("es-CO")} W` });
    list.push({ grupo: "CONVERSIÓN Y CONTROL", concepto: "Controlador de carga", cant: ctrlA, unidad: "A", pu: PRECIO_COP.controladorA, st: puCtrl, obs: `Corriente ≥ ${ctrlA.toLocaleString("es-CO")} A` });
    list.push({ grupo: "MONTAJE", concepto: "Estructura, rieles, anclajes y tornillería", cant: totalWp, unidad: "Wp", pu: PRECIO_COP.estructuraWp, st: puEstr, obs: "Incluye fijación" });
    list.push({ grupo: "INSTALACIÓN ELÉCTRICA", concepto: "Cableado solar, conectores MC4 y canalización", cant: totalWp, unidad: "Wp", pu: PRECIO_COP.cableadoWp, st: puCable, obs: "DC/AC básico" });
    list.push({ grupo: "SEGURIDAD", concepto: "Protecciones, fusibles, DPS, barra de bornes y tierra", cant: totalWp, unidad: "Wp", pu: PRECIO_COP.proteccionesWp, st: puProt, obs: "Según criterio básico" });
    list.push({ grupo: "OTROS", concepto: "Imprevistos, herramientas y mano de obra estimada", cant: totalWp, unidad: "Wp", pu: PRECIO_COP.otrosWp, st: puOtros, obs: "Valor referencial" });
    return list;
  }, [datos, cargado]);

  const tot = items.reduce((s, it) => s + (it.st || 0), 0);

  if (!cargado || !datos || !(datos.totalWh > 0)) {
    return (
      <section className="tarjeta">
        <h3>Presupuesto en pesos colombianos</h3>
        <p className="ayuda">Calcula primero en <b>1. Carga de aparatos → Calcular resultado</b> para obtener un presupuesto detallado por componentes.</p>
        <div className="guia-espera">
          <div className="guia-espera-icono">🧾</div>
          <div>
            <h4>Sin dimensionamiento</h4>
            <p>Agrega aparatos, pulsa Calcular resultado y vuelve aquí para ver el presupuesto aproximado en COP.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="tarjeta presupuesto-card">
      <header className="presupuesto-header">
        <div>
          <h3>Presupuesto estimado en pesos colombianos</h3>
          <p className="ayuda">Precios referenciales del mercado colombiano. TRM aproximado ${TRM.toLocaleString("es-CO")}. Pueden variar según marca, proveedor, transporte e impuestos.</p>
        </div>
        <div className="presupuesto-total-card">
          <span>TOTAL ESTIMADO</span>
          <strong>{fmtCop(tot)} COP</strong>
        </div>
      </header>
      <div className="grid-resultado presupuesto-kpis">
        <div className="kpi kpi-w"><div className="valor">{(datos.nPaneles||0)} × {datos.ppanel} Wp</div><div className="etiqueta">Sistema fotovoltaico</div></div>
        <div className="kpi kpi-wh"><div className="valor">{fmtCop(Math.round(datos.ah))} Ah @ {datos.tension} V</div><div className="etiqueta">Banco de baterías</div></div>
        <div className="kpi kpi-nocturno"><div className="valor">≥ {fmtCop(Math.ceil(datos.watInversor))} W</div><div className="etiqueta">Inversor · Controlador ≥ {datos.ampControlador} A</div></div>
      </div>
      <div className="tabla-wrap presupuesto-tabla">
        <table>
          <thead>
            <tr><th>GRUPO</th><th>CONCEPTO</th><th className="centrada">CANTIDAD</th><th>UNIDAD</th><th className="derecha">VR. UNITARIO (COP)</th><th className="derecha">SUBTOTAL (COP)</th><th>OBSERVACIONES</th></tr>
          </thead>
          <tbody>
            {items.map((it, i) => (
              <tr key={i}>
                <td><span className="presupuesto-grupo">{it.grupo}</span></td>
                <td className="presupuesto-concepto">{it.concepto}</td>
                <td className="centrada">{fmtCop(it.cant)}</td>
                <td>{it.unidad}</td>
                <td className="derecha">${fmtCop(it.pu)}</td>
                <td className="derecha presupuesto-st">${fmtCop(it.st)}</td>
                <td className="presupuesto-obs">{it.obs}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="5">TOTAL GENERAL ESTIMADO</td>
              <td className="derecha">${fmtCop(tot)}</td>
              <td>Precios referenciales - No incluye IVA</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="garantia">ℹ️ <b>Recomendación:</b> Se sugiere cotizar con mínimo 3 proveedores locales (paneles, baterías LiFePO₄ o AGM, inversor con garantía) y verificar normas eléctricas vigentes para tu municipio.</div>
    </section>
  );
}
