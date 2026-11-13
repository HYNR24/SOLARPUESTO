// Ejemplo de manipulación de un caso completo (Puesto mixto) — se muestra
// como capítulo "Un día de trabajo" al final de la guía de instalación.
// Números de referencia del caso «Puesto mixto» del Acta No. 002.

export const MANUAL_EJEMPLO = {
  titulo: "Un día de trabajo con el sistema (Puesto mixto)",
  bloques: [
    "Este ejemplo desarrolla, paso a paso, un día completo de trabajo con un puesto mixto: licuadora, luces LED, datáfono, celular y radio. Es el cuarto caso de referencia de la aplicación y lo puedes cargar con un clic desde el botón «🔀 Puesto mixto» de la pestaña 1.",
    "Al cargar el caso, la aplicación informa una potencia instalada de 645 W, una energía diaria de 1.471,67 Wh y un consumo nocturno de 460 Wh. Con esos datos el dimensionamiento sugiere: 2 paneles de 450 Wp (24 V de trabajo), un banco de baterías de 24 V con unos 153 Ah, un inversor de al menos 807 W y un controlador de carga de 50 A.",
    "6:30 a. m. — Antes de abrir, ubica el panel donde reciba sol directo, límpialo con un trapo húmedo y confirma que no tenga sombras de postes ni del toldo. Después revisa que los bornes de la batería y del controlador estén firmes y sin cables sueltos.",
    "7:00 a. m. — Enciende el inversor y luego las luces LED si el puesto está a la sombra. Reparte el trabajo del día: licuarás durante los picos de venta, así que deja la licuadora apagada entre un cliente y otro para no gastar batería de más.",
    "9:00 a. m. — Primer turno de jugos. Usa la licuadora a ráfagas, de dos minutos por preparación, tal como lo considera la aplicación (2 min × 50 usos). No la dejes encendida en vacío: cada minuto encendido sin licuar consume la misma energía que uno licuando.",
    "12:00 m. — Con el sol en lo más alto, aprovecha para cargar el celular y el datáfono. Son consumos pequeños, pero cargarlos de día evita pedirle esa energía a la batería por la noche.",
    "3:00 p. m. — Segundo turno de jugos y venta con la radio encendida. La radio es un consumo continuo; si hay poca venta, bájale el volumen o apágala un rato: es de los aparatos que más horas suma al día.",
    "6:00 p. m. — Cae el sol. A partir de aquí todo lo que se use lo entrega la batería: las luces LED, la radio y cualquier cobro con el datáfono salen del banco. Este es el tramo que la aplicación mide como «consumo nocturno» (460 Wh en este caso).",
    "8:00 p. m. — Cierre. Apaga uno por uno los aparatos, apaga el inversor y revisa que el controlador siga cargando o que la batería tenga carga para el día siguiente. No dejes el inversor encendido toda la noche: consume aunque no haya nada conectado.",
    "Al día siguiente repite la rutina. Si notas que el datáfono o las luces se apagan antes de tiempo, revisa el consumo nocturno en la pestaña 2 y, si hace falta, mueve algún consumo hacia las horas de sol o amplía el banco de baterías."
  ]
};
