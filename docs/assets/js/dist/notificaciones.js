// CONFIGURACIÓN FCM
const firebaseConfig = {
    apiKey: "AIzaSyA9eJxcrKP8r4YuteGpfvQRTQxdj6ORqFg",
    authDomain: "web-escuelard.firebaseapp.com",
    projectId: "web-escuelard",
    storageBucket: "web-escuelard.firebasestorage.app",
    messagingSenderId: "948522304281",
    appId: "1:948522304281:web:4ccbd164a1dac6ddf03b88",
    databaseURL: "https://web-escuelard-default-rtdb.firebaseio.com/"
};

const vapidKey = "BHEFQ3MbGQFNRpOsYcXFDdFJ2HAXO59cNLl3ji_Ps9_RfScbrdXCev1DiBIPrLZSkGSBB-V7pGbzCr6K_GRHwbI";

// VARIABLES
let messaging;
let database;
let currentToken = '';
let tokenExists = false;

// OBTENER DATOS DE SESIÓN
function getSessionData() {
    const datosEl = document.getElementById('datos_js');
    return {
        escuela: datosEl.dataset.escuela_sesion || "",
        id: datosEl.dataset.id_sesion || ""
    };
}

// VERIFICAR COMPATIBILIDAD
function isCompatible() {
    return 'serviceWorker' in navigator && 
           'PushManager' in window && 
           'Notification' in window;
}

// SOLICITAR PERMISOS
async function requestPermission() {
    if (Notification.permission === 'granted') return true;
    const permission = await Notification.requestPermission();
    return permission === 'granted';
}

// INICIALIZAR FIREBASE
async function initFirebase() {
     const { initializeApp, getApps, getApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
    const { getMessaging } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js');
    const { getDatabase } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
    
    let app;
    if (getApps().length === 0) {
        // Si no hay ninguna app inicializada, la creamos
        app = initializeApp(firebaseConfig);
    } else {
        // Si ya hay una app, la reutilizamos
        app = getApp();
    }

    messaging = getMessaging(app);
    database = getDatabase(app);
    
    // REGISTRAR SERVICE WORKER
  //  await registerServiceWorker();
}

// REGISTRAR SERVICE WORKER
async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
            console.log('Service Worker registrado:', registration);
            return registration;
        } catch (error) {
            console.error('Error registrando Service Worker:', error);
            return null;
        }
    }
    return null;
}

// GENERAR TOKEN
async function generateToken() {
    const { getToken } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js');
    const token = await getToken(messaging, { vapidKey });
    currentToken = token;
    return token;
}

// GUARDAR TOKEN
async function saveToken(token, escuela, id) {
    const { ref, push, set} = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
    
    const tokensRef = ref(database, `horarios/escuela_${escuela}/profesor_${id}/tokens`);
    await push(tokensRef, token);
    
    const horario = ref(database, `horarios/escuela_${escuela}/profesor_${id}/horario`);
    const raw = document.getElementById("json_nots").textContent;
    const horarioData = JSON.parse(raw);
    await set(horario, horarioData);

    const logo = ref(database, `horarios/escuela_${escuela}/logo`);
    const logo_escuela = document.getElementById("datos_js").dataset.logo_escuela;
    await set(logo, logo_escuela);
}

// ELIMINAR TOKEN
async function removeToken(token, escuela, id) {
    const { ref, get, remove } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
    const tokensRef = ref(database, `horarios/escuela_${escuela}/profesor_${id}/tokens`);
    const snapshot = await get(tokensRef);
    
    if (snapshot.exists()) {
        const tokens = snapshot.val();
        for (let key in tokens) {
            if (tokens[key] === token) {
                const tokenRef = ref(database, `horarios/escuela_${escuela}/profesor_${id}/tokens/${key}`);
                await remove(tokenRef);
                return;
            }
        }
    }
}

// OBTENER PLATAFORMA
function getPlatform() {
    const ua = navigator.userAgent;
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
    if (ua.includes('Windows')) return 'Windows';
    if (ua.includes('Mac')) return 'macOS';
    return 'Web';
}

// ACTUALIZAR BOTÓN
function updateButton() {
    const boton = document.getElementById('notificaciones-boton');
        if(boton && boton.getAttribute('boton') === '1'){
          
               
    const button = document.getElementById('boton-notificaciones');
     button.style.display = 'inline-block';
    
    if (tokenExists) {
        button.textContent = "Desactivar notificaciones";
        button.onclick = deactivateNotifications;
    } else {
        button.textContent = "Activar notificaciones";
        button.onclick = activateNotifications;
    }

}
}

// ACTIVAR NOTIFICACIONES
async function activateNotifications() {
    const button = document.getElementById('boton-notificaciones');
    button.textContent = "Activando...";
    button.disabled = true;
    
    const sessionData = getSessionData();
    
    await saveToken(currentToken, sessionData.escuela, sessionData.id);
    tokenExists = true;
    
    button.disabled = false;
    updateButton();
    
}

// DESACTIVAR NOTIFICACIONES
async function deactivateNotifications() {
     const button = document.getElementById('boton-notificaciones');
     button.textContent = "Desactivando...";
     button.disabled = true;
    
    const sessionData = getSessionData();
    await removeToken(currentToken, sessionData.escuela, sessionData.id);
    tokenExists = false;
    
     button.disabled = false;
     updateButton();

    location.replace(location.href + '&c=1');
}

// INICIALIZAR SISTEMA
async function initNotificationSystem() {
    if (!isCompatible()) return;
    
    const sessionData = getSessionData();
    if (!sessionData.escuela || !sessionData.id) return;
    
    const hasPermission = await requestPermission();
    if (!hasPermission) return;
    
    await initFirebase();
    const token = await generateToken();
    updateButton();
    await updateTokenForUser(token, sessionData.escuela, sessionData.id);
    
}

async function updateTokenForUser(newToken, escuela, id) {
    const { ref, get, update } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
    const tokensRef = ref(database, `horarios/escuela_${escuela}/profesor_${id}/tokens`);
    const snapshot = await get(tokensRef);

    let tokenUpdated = false;

    if (snapshot.exists()) {
        const tokens = snapshot.val();
        for (let key in tokens) {
            const token = tokens[key];
                       
           // const entry = tokens[key];
           // const samePlatform = entry.platform === getPlatform();
           // const sameUserAgent = entry.userAgent === navigator.userAgent;

           // if (samePlatform && sameUserAgent) {
                if (token !== newToken) {
                    const tokenRef = ref(database, `horarios/escuela_${escuela}/profesor_${id}/tokens`);
                    await update(tokenRef, {[key]: newToken});
                    console.log('🔄 Token actualizado para el usuario:', id);
                    tokenUpdated = true;
                    tokenExists = true;
                    updateButton();
                } else {
                    console.log('✅ Token ya está actualizado.');
                    tokenUpdated = true;
                    tokenExists = true;
                     updateButton();
                }
                break;
           // }
        }
    }

    if (!tokenUpdated) {
        /* await push(tokensRef, {
            token: newToken,
            timestamp: serverTimestamp(),
            userAgent: navigator.userAgent,
            platform: getPlatform()
        }); */
        //await push(tokensRef, newToken);
        const boton = document.getElementById('notificaciones-boton');
        if(boton && boton.getAttribute('boton') === '1'){
             const button = document.getElementById('boton-notificaciones');
         button.onclick = null;
         button.onclick = async () => {
            setTimeout(() => {
                button.disabled = false;
            }, 3000);
            await saveToken(newToken, escuela, id);
            await updateTokenForUser(newToken, escuela, id);
            tokenExists = true;
            updateButton();
        };
        }else{
         await saveToken(newToken, escuela, id);
         await updateTokenForUser(newToken, escuela, id);
         tokenExists = true;
        }
        console.log('🆕 Token guardado para nuevo usuario o dispositivo.');
    }

    return true;
}


// EXPONER FUNCIONES
window.initNotificationSystem = initNotificationSystem;
window.activateNotifications = activateNotifications;
window.deactivateNotifications = deactivateNotifications;

// AUTO-INICIALIZAR
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initNotificationSystem, 1000);
});