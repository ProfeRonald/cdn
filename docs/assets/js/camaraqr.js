var gCtx = null;
var gCanvas = null;
var c=0;
var stype=0;
var gUM=false;
var webkit=false;
var moz=false;
var v=null;

var vidhtml = '<video id="videoqr" autoplay></video>';

function initCanvas(w,h){
    gCanvas = document.getElementById("qr-canvas");
    gCanvas.style.width = w + "px";
    gCanvas.style.height = h + "px";
    gCanvas.width = w;
    gCanvas.height = h;
    gCtx = gCanvas.getContext("2d", { willReadFrequently: true });
    gCtx.clearRect(0, 0, w, h);
}


function captureToCanvas() {
    if(stype!=1)
        return;
    if(gUM){
        try{
            gCtx.drawImage(v,0,0);
            try{
                qrcode.decode();
            }
            catch(e){
                setTimeout(captureToCanvas, 500);
            };
        }
        catch(e){       
                setTimeout(captureToCanvas, 500);
        };
    }
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function read(a){
	
   var deviceqr = getCookie('deviceqr');
   var sessionqr = getCookie('sessionqr');
   document.cookie = "sesionqr=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
   
    if(sessionqr == 1 && a != ''){
    
    const firebaseConfig = {
		apiKey: "AIzaSyA9eJxcrKP8r4YuteGpfvQRTQxdj6ORqFg",
    authDomain: "escuelard.edu.do",
    databaseURL: "https://web-escuelard-default-rtdb.firebaseio.com",
    projectId: "web-escuelard",
    storageBucket: "web-escuelard.appspot.com",
    messagingSenderId: "948522304281",
    appId: "1:948522304281:web:4ccbd164a1dac6ddf03b88"
		};

  	firebase.initializeApp(firebaseConfig);
    a = a.split(':');
    var weblogin = firebase.database().ref('d2VibG9naW5z/' + a[1] + '/' + deviceqr);
    
		weblogin.set(a[0]);
		weblogin.remove();
		firebase.database().ref('d2ViY2FtbG9naW5z/' + a[1] + '/' + deviceqr).on('value', function(ds) {
		$('#vincular-regresar', window.parent.document).trigger('click');
		});
	
    }else if(a != ''){
     // $('head').append('<meta http-equiv="refresh" content="5; url=http://localhost/Dropbox/adecuacion/sesion.php?op=SesionQR" />');
      document.cookie = 'sesionqr=' + a;
      window.location = 'http://localhost/Dropbox/adecuacion/sesion.php?op=SesionQR';
  	}
}

function isCanvasSupported(){
  var elem = document.createElement('canvas');
  return !!(elem.getContext && elem.getContext('2d', { willReadFrequently: true }));
}

function success(stream){

    v.srcObject = stream;
    v.play();

    gUM=true;
    setTimeout(captureToCanvas, 500);
}
		
function error(error){
    gUM=false;
    return;
}

function loadCam(e=0, d=0){
	
	if(isCanvasSupported() && window.File && window.FileReader){
		document.cookie = 'deviceqr=' + e;
		document.cookie = 'sessionqr=' + d;
		initCanvas(800, 600);
		qrcode.callback = read;
		document.getElementById("mainbody").style.display="inline";
        setwebcam();
	}else{
		document.getElementById("mainbody").style.display="inline";
		document.getElementById("mainbody").innerHTML='Navegador incompatible';
	}
}

function setwebcam(){
	
	var options = true;
	if(navigator.mediaDevices && navigator.mediaDevices.enumerateDevices){
		try{
			navigator.mediaDevices.enumerateDevices()
			.then(function(devices) {
			  devices.forEach(function(device) {
				if (device.kind === 'videoinput') {
				  if(device.label.toLowerCase().search("back") >-1)
					options={'deviceId': {'exact':device.deviceId}, 'facingMode':'environment'} ;
				}
	
			  });
			  setwebcam2(options);
			});
		}
		catch(e){}
	}else{
	
		setwebcam2(options);
	}
	
}

function setwebcam2(options){
	
	document.getElementById("result").innerHTML="- Escaneando -";
    if(stype==1){
        setTimeout(captureToCanvas, 500);    
        return;
    }
    var n=navigator;
    document.getElementById("outdiv").innerHTML = vidhtml;
    v=document.getElementById("videoqr");

    if(n.mediaDevices.getUserMedia){
        n.mediaDevices.getUserMedia({video: options, audio: false}).
            then(function(stream){
                success(stream);
            }).catch(function(error){
                error(error)
            });
    }
    else
    if(n.getUserMedia){
		webkit=true;
        n.getUserMedia({video: options, audio: false}, success, error);
	}
    else
    if(n.webkitGetUserMedia){
        webkit=true;
        n.webkitGetUserMedia({video:options, audio: false}, success, error);
    }

    document.getElementById("qrimg").style.opacity=0.2;
    document.getElementById("webcamimg").style.opacity=1.0;

    stype=1;
    setTimeout(captureToCanvas, 500);
}