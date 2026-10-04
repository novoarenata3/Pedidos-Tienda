<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ejercicio 4 - Gestión de Pedidos Tienda en Línea</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100 min-h-screen text-slate-800 p-6">
  <div class="max-w-6xl mx-auto space-y-6">
    
    <header class="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Ejercicio 4: Control de Pedidos y Despacho</h1>
        <p class="text-slate-500 text-sm">Flujo: Confirmación ➔ Reserva ➔ Pago ➔ Preparación ➔ Despacho</p>
      </div>
      <span class="bg-teal-100 text-teal-800 text-xs font-semibold px-3 py-1 rounded-full">Tienda Online Active</span>
    </header>

    <!-- Métricas del Sistema -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <p class="text-xs text-slate-500 font-medium">Pedidos Completados</p>
        <p class="text-2xl font-bold text-emerald-600 mt-1" id="m-completados">0</p>
      </div>
      <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <p class="text-xs text-slate-500 font-medium">Cancelaciones / Sin Stock</p>
        <p class="text-2xl font-bold text-rose-600 mt-1" id="m-cancelados">0</p>
      </div>
      <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <p class="text-xs text-slate-500 font-medium">Errores de Pago Evitados</p>
        <p class="text-2xl font-bold text-purple-600 mt-1" id="m-errores-pago">0</p>
      </div>
      <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <p class="text-xs text-slate-500 font-medium">Tiempo Prom. a Despacho</p>
        <p class="text-2xl font-bold text-teal-600 mt-1">18 min</p>
      </div>
    </div>

    <!-- Interfaz Principal -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Formulario de Simulación -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
        <h2 class="text-lg font-bold text-slate-900">Simular Pedido de Cliente</h2>
        <div>
          <label class="block text-xs font-medium text-slate-600 mb-1">ID Pedido</label>
          <input type="text" id="pedido-id" value="PED-5542" class="w-full border border-slate-300 rounded p-2 text-sm">
        </div>
        <div>
          <label class="block text-xs font-medium text-slate-600 mb-1">Monto Total ($)</label>
          <input type="number" id="monto" value="85.50" class="w-full border border-slate-300 rounded p-2 text-sm">
        </div>
        <div>
          <label class="block text-xs font-medium text-slate-600 mb-1">Clave de Idempotencia (Pago/Reserva)</label>
          <input type="text" id="idempotency-key" class="w-full border border-slate-300 rounded p-2 text-sm bg-slate-50 font-mono" readonly>
        </div>
        
        <div class="pt-2 space-y-2">
          <button onclick="procesarPedido(false)" class="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 rounded text-sm transition">Confirmar y Pagar Pedido</button>
          <button onclick="procesarPedido(true)" class="w-full bg-slate-600 hover:bg-slate-700 text-white font-medium py-2 rounded text-sm transition">Simular Clic Repetido (Reintento)</button>
          <button onclick="generarNuevaClave()" class="w-full border border-slate-300 hover:bg-slate-50 text-slate-700 py-1.5 rounded text-xs transition">Nuevo Pedido</button>
        </div>
      </div>

      <!-- Registro de Auditoría de Pedidos -->
      <div class="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
        <h2 class="text-lg font-bold text-slate-900">Trazabilidad del Pedido y Notificaciones</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-xs">
              <tr>
                <th class="p-2">Hora</th>
                <th class="p-2">ID Pedido</th>
                <th class="p-2">Monto</th>
                <th class="p-2">Estado Flujo</th>
                <th class="p-2">Acción Asíncrona (RabbitMQ / Cliente)</th>
              </tr>
            </thead>
            <tbody id="tabla-auditoria" class="divide-y divide-slate-100 font-mono text-xs">
            </tbody>
          </table>
        </div>
      </div>

    </div>

  </div>

  <script src="script.js"></script>
</body>
</html>
