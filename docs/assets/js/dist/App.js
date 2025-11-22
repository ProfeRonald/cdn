if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js").then(() => {
    console.log("Service Worker registrado correctamente.");
  }).catch(err => console.error("Error al registrar SW:", err));
}

if($('#pwa-nav-bar').length === 0){

$('head').append('<style>:root {    --color-primary-blue: #004780;     --color-accent-yellow: #FFC107;     --color-white: #FFFFFF;} #pwa-nav-bar {    position: fixed;    top: 0;    left: 40%;    transform: translateX(-50%);    display: flex;    gap: 30px;    padding: 10px 20px;    border-radius: 0 0 15px 15px;    backdrop-filter: blur(5px); .nav-btn {    background-color: var(--color-white);    border: none;    cursor: pointer;    display: flex;    flex-direction: column;     align-items: center;    justify-content: center;    padding: 8px 12px;    order-radius: 8px;    min-width: 65px;    transition: all 0.2s ease;}.nav-btn i {    color: var --color-primary-blue);    font-size: 1.2em;    line-height: 1;} .nav-btn span {    color: var(--color-primary-blue);    font-size: 0.7em;    margin-top: 3px;    font-weight: 600;} .nav-btn:hover {    background-color: var(--color-accent-yellow);    transform: translateY(-2px);    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);} .nav-btn:hover i, .nav-btn:hover span { color: var(--color-primary-blue); }</style><style media="print"> #pwa-nav-bar { display: none; } </style><div id="pwa-nav-bar">    <button id="back-btn" class="nav-btn" rel="tooltip" title="Atr&aacute;s">        <i class="fa fa-arrow-left"></i>    </button>    <button id="forward-btn" class="nav-btn" rel="tooltip" title="Adelante">        <i class="fa fa-arrow-right"></i>    </button>    <button id="refresh-btn" class="nav-btn" rel="tooltip" title="Recargar">        <i class="fa fa-refresh"></i>    </button> </div>');

}

document.addEventListener('DOMContentLoaded', function() {
    // 1. Obtener referencias a los botones
    const backBtn = document.getElementById('back-btn');
    const forwardBtn = document.getElementById('forward-btn');
    const refreshBtn = document.getElementById('refresh-btn');

    // 2. Función para el botón "Atrás"
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            // history.back() navega a la página anterior en el historial de sesión.
            window.history.back();
            console.log('Navegando Atrás');
        });
    }

    // 3. Función para el botón "Adelante"
    if (forwardBtn) {
        forwardBtn.addEventListener('click', function() {
            // history.forward() navega a la página siguiente en el historial de sesión.
            window.history.forward();
            console.log('Navegando Adelante');
        });
    }

    // 4. Función para el botón "Actualizar"
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            // location.reload() recarga la página actual.
            window.location.reload();
            console.log('Página Recargada');
        });
    }

    // Opcional: Desactivar los botones Atrás/Adelante si no hay historial disponible
    // Esto es un poco más complejo, ya que history no expone fácilmente si hay o no entradas.
    // Una implementación simple podría ser:
    // backBtn.disabled = history.length <= 1;
    // Esto no es 100% preciso pero puede ser una mejora UX.
});