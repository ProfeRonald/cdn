if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js").then(() => {
    console.log("Service Worker registrado correctamente.");
  }).catch(err => console.error("Error al registrar SW:", err));
}