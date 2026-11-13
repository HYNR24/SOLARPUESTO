import SvgSistema from "./SvgSistema.jsx";

const Icono = ({ nombre }) => {
  const trazos = {
    lista: (
      <>
        <path d="M8 6h13M8 12h13M8 18h13" />
        <circle cx="3.5" cy="6" r="1.2" />
        <circle cx="3.5" cy="12" r="1.2" />
        <circle cx="3.5" cy="18" r="1.2" />
      </>
    ),
    calculo: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="3" />
        <path d="M8 8h8M8 12h2M14 12h2M8 16h2M14 16h2" />
      </>
    ),
    libro: (
      <>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
        <path d="M4 5.5v16" />
      </>
    ),
    rayo: <path d="M13 2 4 14h6l-1 8 9-12h-6z" />,
    escudo: (
      <>
        <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    bateria: (
      <>
        <rect x="3" y="8" width="16" height="9" rx="2" />
        <path d="M21 11v3" />
        <path d="M6 11h4v3H6z" />
      </>
    )
  };

  return (
    <svg
      className="inicio-icono"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {trazos[nombre]}
    </svg>
  );
};

const PASOS = [
  {
    id: "carga",
    icono: "lista",
    titulo: "1. Registra tus aparatos",
    texto: "Agrega licuadora, luces, nevera o cargadores con su potencia y horas de uso reales.",
    accion: "Abrir la tabla"
  },
  {
    id: "resultado",
    icono: "calculo",
    titulo: "2. Calcula tu sistema",
    texto: "Obtén potencia, energía diaria y el material solar que necesita tu puesto.",
    accion: "Ver el cálculo"
  },
  {
    id: "guia",
    icono: "libro",
    titulo: "3. Instala con seguridad",
    texto: "Sigue la guía paso a paso con diagramas de conexión y fotos de cada material.",
    accion: "Leer la guía"
  }
];

const BENEFICIOS = [
  {
    icono: "rayo",
    titulo: "Dimensiona sin adivinar",
    texto: "Cálculos de paneles, baterías, inversor y controlador según tu consumo real."
  },
  {
    icono: "bateria",
    titulo: "Cubre tu jornada",
    texto: "Separa el consumo de día y de noche para que la batería rinda cuando no hay sol."
  },
  {
    icono: "escudo",
    titulo: "Instala con confianza",
    texto: "Advertencias y pasos claros para evitar conexiones peligrosas."
  }
];

export default function Inicio({ onIr }) {
  return (
    <div className="inicio">
      <section className="inicio-hero">
        <div className="inicio-hero-texto">
          <span className="inicio-eyebrow">SolarPuesto V1.0 · Energía solar para tu negocio</span>
          <h2>La energía solar de tu puesto, calculada en minutos</h2>
          <p>
            Registra los aparatos que usas, descubre cuánta energía necesitas y recibe el
            dimensionamiento del sistema con una guía de instalación clara y segura.
          </p>
          <div className="inicio-acciones">
            <button type="button" className="inicio-btn inicio-btn-primario" onClick={() => onIr("carga")}>
              Empezar con mi tabla de aparatos
              <span aria-hidden="true">→</span>
            </button>
            <button type="button" className="inicio-btn inicio-btn-secundario" onClick={() => onIr("guia")}>
              Ver guía de instalación
            </button>
          </div>
          <p className="inicio-nota">Sin registro · Tus datos quedan en tu navegador · Uso gratuito</p>
        </div>

        <div className="inicio-hero-visual" aria-hidden="true">
          <div className="inicio-hero-tarjeta">
            <SvgSistema datos={null} />
          </div>
          <span className="inicio-hero-etiqueta">Del panel solar a tus aparatos</span>
        </div>
      </section>

      <section className="inicio-pasos" aria-labelledby="inicio-como-funciona">
        <div className="inicio-seccion-cabecera">
          <span className="inicio-eyebrow">Así de simple</span>
          <h3 id="inicio-como-funciona">Cómo funciona</h3>
          <p>Tres pasos para pasar de tu lista de aparatos a una instalación bien dimensionada.</p>
        </div>

        <div className="inicio-pasos-grid">
          {PASOS.map((paso) => (
            <button
              type="button"
              className="inicio-paso"
              key={paso.id}
              onClick={() => onIr(paso.id)}
            >
              <span className="inicio-paso-icono"><Icono nombre={paso.icono} /></span>
              <span className="inicio-paso-titulo">{paso.titulo}</span>
              <span className="inicio-paso-texto">{paso.texto}</span>
              <span className="inicio-paso-accion">
                {paso.accion} <span aria-hidden="true">→</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="inicio-cta">
        <div>
          <h3>¿Listo para calcular tu puesto?</h3>
          <p>Abre la tabla, agrega tus aparatos y obtén tu sistema solar en el mismo momento.</p>
        </div>
        <button type="button" className="inicio-btn inicio-btn-claro" onClick={() => onIr("carga")}>
          Ir a la tabla de aparatos
          <span aria-hidden="true">→</span>
        </button>
      </section>

      <section className="inicio-beneficios" aria-label="Beneficios de SolarPuesto">
        {BENEFICIOS.map((b) => (
          <article className="inicio-beneficio" key={b.titulo}>
            <span className="inicio-beneficio-icono"><Icono nombre={b.icono} /></span>
            <h4>{b.titulo}</h4>
            <p>{b.texto}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
