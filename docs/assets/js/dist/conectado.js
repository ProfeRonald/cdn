
const webfirebaseConfig = {
	apiKey: "AIzaSyA9eJxcrKP8r4YuteGpfvQRTQxdj6ORqFg",
    authDomain: "escuelard.edu.do",
    databaseURL: "https://web-escuelard-default-rtdb.firebaseio.com",
    projectId: "web-escuelard",
    storageBucket: "web-escuelard.appspot.com",
    messagingSenderId: "948522304281",
    appId: "1:948522304281:web:4ccbd164a1dac6ddf03b88"
		};

const web = firebase.initializeApp(webfirebaseConfig, "web");

var correo_sesion = $("#index_js").attr("correo_sesion");

var clave_sesion = $("#index_js").attr("clave_sesion");

var escuela_sesion = $("#index_js").attr("escuela_sesion");

var quien = $("#index_js").attr("quien");

var webPersonal = web.database().ref("sesiones/" + escuela_sesion + "/usuarios/");

web
    .auth()
    .signInWithEmailAndPassword(correo_sesion, clave_sesion)
    .then(() => {
      web.auth().onAuthStateChanged(function (user) {
        if (user && user.email == correo_sesion) {

var UltimaConexion = web.database().ref("sesiones/" + escuela_sesion + "/usuarios/" + quien + "/" + user.uid + "/UltimaConexion");
var conectado = web.database().ref("sesiones/" + escuela_sesion + "/usuarios/" + quien + "/" + user.uid + "/conectado");
var visible = web.database().ref("sesiones/" + escuela_sesion + "/usuarios/" + quien + "/" + user.uid + "/visible");

$("#enlinea").on("click",function(){
	var enlinea = $(this).attr('visible');
	if(enlinea == 1){
		visible.set(2);
		$(this).removeAttr('visible');
	}else{
		visible.set(1);
	}
})

web.database().ref(".info/connected").on("value", function (data) {
	if (data.val()) {
		conectado.onDisconnect().set(0);
		conectado.set(1);
		UltimaConexion.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
	}
});


web
                        .database()
                        .ref(
                          "sesiones/" + escuela_sesion + "/usuarios/" + quien + "/" + user.uid)
                        .on("value", (enlinea) => {
						if(enlinea.val().conectado == 1 && enlinea.val().visible != 2){
							$('#enlinea').html('<i class="fa fa-eye"></i>Visible');
							$('#enlinea').attr('visible', '1');
							$('#fotses').parent().attr('class', 'dropdown-toggle active');
						}else{
							$('#enlinea').html('<i class="fa fa-eye-slash"></i>No visible');
							$('#enlinea').removeAttr('visible');
							$('#fotses').parent().attr('class', 'dropdown-toggle noactive');
						}

						if(enlinea.val().visible == 1){
							$('#enlinea').attr('title', 'Estado en línea');
							$('#enlinea').attr('data-content', 'Click para hacer que su estado en l&iacute;nea NO sea visible para los dem&aacute;s.');
						}else{
							$('#enlinea').attr('title', 'Estado en línea');
							$('#enlinea').attr('data-content', 'Click para hacer que su estado en l&iacute;nea sea visible para los dem&aacute;s.');
						}
						})



					}
      });
    })
    .catch((error) => {
		
      if (error.code == "auth/user-not-found" || error.code == "auth/internal-error") {
        web
          .auth()
          .createUserWithEmailAndPassword(correo_sesion, clave_sesion)
          .then(() => {})
          .catch((error) => {});
      }
    });

	
$("#cerrarSesion").on("click",function(){
			
	UltimaConexion.set(
                        firebase.database.ServerValue.TIMESTAMP
                      );
                      conectado.set(0);

                      web
                        .auth()
                        .signOut()
                        .then(() => {});
			
			});