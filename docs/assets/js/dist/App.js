if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js").then(() => {
    console.log("Service Worker registrado correctamente.");
  }).catch(err => console.error("Error al registrar SW:", err));
}

if ($('#pwa-nav-bar').length === 0) {

    const cssStyles = `
        :root {
            --color-primary-blue: #004780;
            --color-accent-yellow: #FFC107;
            --color-white: #FFFFFF;
        } 
        #pwa-nav-bar {
            position: fixed;
            top: 0;
            transform: translateX(-50%);
            display: flex;
            padding: 10px 20px;
            border-radius: 0 0 15px 15px;
            backdrop-filter: blur(5px);
            z-index: 1000;
        } 
        .nav-btn {
            background-color: var(--color-white);
            border: none;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 8px 12px;
            border-radius: 8px;
            transition: all 0.2s ease;
        }
        .nav-btn i {
            color: var(--color-primary-blue);
            font-size: 1.2em;
            line-height: 1;
        } 
        .nav-btn span {
            color: var(--color-primary-blue);
            font-size: 0.7em;
            margin-top: 3px;
            font-weight: 600;
        } 
        .nav-btn:hover {
            background-color: var(--color-accent-yellow);
            transform: translateY(-2px);
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        } 
        .nav-btn:hover i, .nav-btn:hover span { 
            color: var(--color-primary-blue); 
        }
    `;

    $('head').append('<style>' + cssStyles + '</style>');
    $('head').append('<style media="print"> #pwa-nav-bar { display: none; } </style>');

    const navBarHtml = `
        <div id="pwa-nav-bar">
            <button id="back-btn" class="nav-btn" rel="tooltip" title="Atrás">
                <i class="fa fa-arrow-left"></i>
            </button>
            <button id="forward-btn" class="nav-btn" rel="tooltip" title="Adelante">
                <i class="fa fa-arrow-right"></i>
            </button>
            <button id="refresh-btn" class="nav-btn" rel="tooltip" title="Recargar">
                <i class="fa fa-refresh"></i>
            </button>
        </div>
    `;

    $('body').prepend(navBarHtml);

    const backBtn = document.getElementById('back-btn');
    const forwardBtn = document.getElementById('forward-btn');
    const refreshBtn = document.getElementById('refresh-btn');
    
    if (backBtn) backBtn.addEventListener('click', () => window.history.back());
    if (forwardBtn) forwardBtn.addEventListener('click', () => window.history.forward());
    if (refreshBtn) refreshBtn.addEventListener('click', () => window.location.reload(true));
}
