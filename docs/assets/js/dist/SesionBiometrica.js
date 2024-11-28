if (window.PublicKeyCredential) {
    $('#huella-personal').show();
    $(document).on('click', '#huella-personal-click', function () {
        registrarHuella();
    });
  } else {
    $('#huella-personal').hide();
  }
  function registrarHuella() {

		$.ajax({url: $('#huella-personal').attr('urlerd') + '/includes/huella.php',
        method: 'POST',
				data: {obtenerDesafio: $('#huella-personal').attr('correo'), displayName: $('#huella-personal').attr('nombre')},
				dataType: 'json',
				success: function(desafio){
					webauthnRegister(desafio.challenge, function(success, info){
						if (success) {
							$.ajax({url: $('#huella-personal').attr('urlerd') + '/includes/huella.php',
									method: 'POST',
									data: {obtenerCredencial: info, user: desafio.user},
									dataType: 'json',
									success: function(credencial){
                                        if (credencial.resultado) {
                                        MostrarAviso(credencial['resultado']);
                                        }else{
                                            guardarHuella(credencial.credencial);
                                
                                        }
									},
									error: function(){
										MostrarAviso('<strong class="text-warning">No se pudo registrar tu dato biométrico. Intenta de nuevo.</strong>');
									}
                                    
								   });
						} else {
							MostrarAviso('<strong class="text-warning">No se pudo registrar tu dato biométrico. Intenta de nuevo.</strong>');
						}
					});
				},

				error: function(){
					MostrarAviso('<strong class="text-warning">No se pudo registrar tu dato biométrico. Intenta de nuevo.</strong>');
				}
			   });
}

function guardarHuella(credencial){
$.ajax({url: 'up.php?op=RegistrarHuella',
    method: 'POST',
    data: {credencial: credencial},
    dataType: 'json',
    success: function(data){
        MostrarAviso(data['resultado']);
        $('#eliminar-credencial').show();
    },

    error: function(){
        MostrarAviso('<strong class="text-warning">No se pudo registrar tu dato biométrico. Intenta de nuevo.</strong>');
    }
    });
}

  function MostrarAviso(aviso){
    $('#aviso-huella').html(aviso);
    $('#aviso-huella').show();
    setTimeout(function () {
        $('#aviso-huella').hide('slow');
        $('#aviso-huella').text('');
      }, 5000);

  }

  function base64ToUint8Array(base64) {
    const binaryString = atob(base64);
    return Uint8Array.from(binaryString, char => char.charCodeAt(0));
}
  

function webauthnRegister(key, callback){
	key = JSON.parse(key);
	key.publicKey.attestation = undefined;
	key.publicKey.challenge = new Uint8Array(key.publicKey.challenge);
	key.publicKey.user.id = new Uint8Array(key.publicKey.user.id);
	navigator.credentials.create({publicKey: key.publicKey})
		.then(function (aNewCredentialInfo) {
			var cd = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(aNewCredentialInfo.response.clientDataJSON)));
			if (key.b64challenge != cd.challenge) {
				MostrarAviso('<strong class="text-warning">No se pudo registrar tu dato biométrico. Intenta de nuevo.</strong>');
			}
			if ('https://'+key.publicKey.rp.name != cd.origin) {
				MostrarAviso('<strong class="text-warning">No se pudo registrar tu dato biométrico. Intenta de nuevo.</strong>');
			}
			if (! ('type' in cd)) {
				MostrarAviso('<strong class="text-warning">No se pudo registrar tu dato biométrico. Intenta de nuevo.</strong>');
			}
			if (cd.type != 'webauthn.create') {
				MostrarAviso('<strong class="text-warning">No se pudo registrar tu dato biométrico. Intenta de nuevo.</strong>');
			}

			var ao = [];
			(new Uint8Array(aNewCredentialInfo.response.attestationObject)).forEach(function(v){
				ao.push(v);
			});
			var rawId = [];
			(new Uint8Array(aNewCredentialInfo.rawId)).forEach(function(v){
				rawId.push(v);
			});
			var info = {
				rawId: rawId,
				id: aNewCredentialInfo.id,
				type: aNewCredentialInfo.type,
				response: {
					attestationObject: ao,
					clientDataJSON:
					  JSON.parse(String.fromCharCode.apply(null, new Uint8Array(aNewCredentialInfo.response.clientDataJSON)))
				}
			};
			callback(true, JSON.stringify(info));
		})
		.catch(function (aErr) {
			if (
				("name" in aErr) && (aErr.name == "AbortError" || aErr.name == "NS_ERROR_ABORT")
				|| aErr.name == 'NotAllowedError'
			) {
				MostrarAviso('<strong class="text-warning">Ha cancelado el registro.</strong>');
			} else {
				callback(false, aErr.toString());
			}
		});
}

$(document).on('click', '#eliminar-credencial', function() {

    $.ajax({url: 'up.php?op=eliminarHuella',
        method: 'POST',
        success: function(e){
            if(e == 1){
                MostrarAviso('<strong class="text-info">Credencial eliminada exitosamente.</strong>');
                $('#eliminar-credencial').hide();
            }else{
                MostrarAviso('<strong class="text-warning">No se pudo eliminar la credencial.</strong>');
            }
        },
        error: function(){
            MostrarAviso('<strong class="text-warning">No se pudo eliminar la credencial.</strong>');
        }
    
    });
    
    });


	
async function checkWebAuthnSupport() {
	if (window.PublicKeyCredential) {
		$('#auto-camera-sesion').parent().parent().parent().parent().attr('class', 'col-6');
		$('#auto-huella-sesion').parent().parent().parent().parent().show();
		if($('#auto-huella-sesion').attr('checked') == 'checked'){
			IniciarSesionHuella();
}
  }else{
	$('#auto-camera-sesion').parent().parent().parent().parent().attr('class', 'col-12');
	$('#auto-huella-sesion').parent().parent().parent().parent().remove();
	$('#smallmodalHuella').remove();
  }
}

checkWebAuthnSupport();


$(document).on('click', '#huellacodigo, #huellacodigo-pwa', function() {
		
	IniciarSesionHuella();
});


$(document).on('change click blur', '#auto-huella-sesion', function() {
			if ($(this).prop("checked") == true) {
				document.cookie = 'AutoHuellaSesion=auto';
			}else{
				document.cookie = 'AutoHuellaSesion=NO';
			}
});

function IniciarSesionHuella() {
	$("#avisoSesion").html('<div class="text-primary font-weight-bold">Iniciando interfaz...</div>');
	$.ajax({url: 'up.php?op=obtenerHuella',
				method: 'POST',
				dataType: 'json',
				success: function(data){
		if (data.webauthnkeys == 1) {
			MostrarAvisoHuella();
    }else{
		$.ajax({url: 'includes/huella.php',
				method: 'POST',
				data: {desafioSesion: data.storedCredential},
				success: function(desafio){
					webauthnAuthenticate(desafio.challenge, function(success, info){
						if (success) {
							$.ajax({url: 'includes/huella.php',
									method: 'POST',
									data: {credencialSesion: info, webauthnkeys: desafio.webauthnkeys},
									dataType: 'json',
									success: function(credencial){
										if(credencial == 1){
									$.ajax({url: 'up.php?op=IniciarSesionHuella',
									method: 'POST',
									data: {credencial: credencial},
									success: function(sesion){
										if(sesion == 1){
											$("#avisoSesion").html('<div class="text-primary font-weight-bold">Redireccionando...</div>');
											setTimeout(function() {
												window.location = 'index.php';
											}, 1000);
										}else{
											MostrarAvisoHuella();
										}
							
									},
									error: function(xhr, status, error){
										MostrarAvisoHuella();
									}
								   });
										}else{
											MostrarAvisoHuella();
										}
							
									},
									error: function(xhr, status, error){
										MostrarAvisoHuella();
									}
								   });
						} else {
							MostrarAvisoHuella();
						}
					});
				},

				error: function(xhr, status, error){
					
					MostrarAvisoHuella();
				}
			   });
	}
},

error: function(xhr, status, error){
	MostrarAvisoHuella();
}
    })
.catch(error => {
    MostrarAvisoHuella();
});


}

function MostrarAvisoHuella(){
$("#avisoSesion").html('<div class="breadcrumbs"><div class="sufee-alert alert with-close alert-warning alert-dismissible fade show"><span class="badge badge-pill badge-warning">¡Advertencia!</span>No se pudo iniciar el sistema. Intente de nuevo o inicie sesi&oacute;n de otra forma.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div></div>');
}

function webauthnAuthenticate(key, cb){
	var pk = JSON.parse(key);
	var originalChallenge = pk.challenge;
	pk.challenge = new Uint8Array(pk.challenge);
	pk.allowCredentials.forEach(function(k, idx){
		pk.allowCredentials[idx].id = new Uint8Array(k.id);
	});
	
	navigator.credentials.get({publicKey: pk})
		.then(function(aAssertion) {
			var ida = [];
			(new Uint8Array(aAssertion.rawId)).forEach(function(v){ ida.push(v); });
			var cd = JSON.parse(String.fromCharCode.apply(null,
														  new Uint8Array(aAssertion.response.clientDataJSON)));
			var cda = [];
			(new Uint8Array(aAssertion.response.clientDataJSON)).forEach(function(v){ cda.push(v); });
			var ad = [];
			(new Uint8Array(aAssertion.response.authenticatorData)).forEach(function(v){ ad.push(v); });
			var sig = [];
			(new Uint8Array(aAssertion.response.signature)).forEach(function(v){ sig.push(v); });
			var info = {
				type: aAssertion.type,
				originalChallenge: originalChallenge,
				rawId: ida,
				response: {
					authenticatorData: ad,
					clientData: cd,
					clientDataJSONarray: cda,
					signature: sig
				}
			};
			cb(true, JSON.stringify(info));
		})
		.catch(function (aErr) {
			if (("name" in aErr) && (aErr.name == "AbortError" || aErr.name == "NS_ERROR_ABORT" ||
									 aErr.name == "NotAllowedError")) {
				cb(false, 'abort');
			} else {
				cb(false, aErr.toString());
			}
		});
}