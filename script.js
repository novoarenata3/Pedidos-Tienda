const historialCache = new Map();
let totalTx = 0;
let totalDup = 0;
let totalCola = 0;

function generarUUID() {
  return 'e4-' + Math.random().toString(36).substring(2, 9) + '-' + Date.now();
}

function generarNuevaClave() {
  document.getElementById("idempotency-key").value = generarUUID();
}

function procesarTransaccion(esReintento) {
  const key = document.getElementById("idempotency-key").value;
  const monto = parseFloat(document.getElementById("monto").value);
  const timestamp = new Date().toLocaleTimeString();

  if (!key) {
    alert("Genera una clave de idempotencia.");
    return;
  }

  // Verificación de Idempotencia en Redis (Simulada)
  if (historialCache.has(key)) {
    totalDup++;
    document.getElementById("m-duplicados").innerText = totalDup;
    const previo = historialCache.get(key);
    agregarRegistro(timestamp, key, monto, "DUPLICADO", `Respuesta previa retornada: ${previo.estado}`, "bg-purple-100 text-purple-800");
    return;
  }

  totalTx++;
  totalCola++;
  document.getElementById("m-totales").innerText = totalTx;
  document.getElementById("m-cola").innerText = totalCola;

  historialCache.set(key, { estado: "PROCESADO", monto });
  agregarRegistro(timestamp, key, monto, "PROCESADO", "Síncrono OK | Publicado a RabbitMQ", "bg-emerald-100 text-emerald-800");

  setTimeout(() => {
    if (totalCola > 0) {
      totalCola--;
      document.getElementById("m-cola").innerText = totalCola;
    }
  }, 2500);

  if (!esReintento) {
    generarNuevaClave();
  }
}

function agregarRegistro(time, key, monto, estado, detalle, claseBadge) {
  const tbody = document.getElementById("tabla-auditoria");
  const tr = document.createElement("tr");
  tr.className = "hover:bg-slate-50";
  tr.innerHTML = `
    <td class="p-2 text-slate-500">${time}</td>
    <td class="p-2 font-bold text-slate-700">${key.substring(0, 14)}...</td>
    <td class="p-2">$${monto.toFixed(2)}</td>
    <td class="p-2"><span class="px-2 py-0.5 rounded text-xs font-semibold ${claseBadge}">${estado}</span></td>
    <td class="p-2 text-slate-600">${detalle}</td>
  `;
  tbody.insertBefore(tr, tbody.firstChild);
}

document.addEventListener("DOMContentLoaded", () => {
  generarNuevaClave();
});
