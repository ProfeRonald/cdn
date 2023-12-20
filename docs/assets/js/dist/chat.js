$(document).ready(function () {
 
//  $.ajaxSetup({async:false});
const link = $.getJSON('https://link-previews.stephanbogner.de/api?url=http://web.escuelard.com/');
//const link = '{"fileName":"2023-12-20-Escuelard.com-Proyecto_escuelaRD.png","url":"http://web.escuelard.com/","name":"Escuelard.com","title":"Proyecto escuelaRD","description":"Proyecto escuelaRD - Herramienta de manejo y publicación de calificaciones escolares según el modelo de la República Dominicana","image":false}';
//console.log(JSON.parse(link));
console.log(link);

  const firebaseConfig = {
    apiKey: "AIzaSyBXwL57msS6Guf2LoOlVYSAR5Do1-vHsV4",
    authDomain: "chat.escuelard.edu.do",
    databaseURL: "https://chat-escuelard-default-rtdb.firebaseio.com",
    projectId: "chat-escuelard",
    storageBucket: "chat-escuelard.appspot.com",
    messagingSenderId: "514838023996",
    appId: "1:514838023996:web:90334c08c3f198ddcd5839",
  };

  firebase.initializeApp(firebaseConfig);

  var correo_sesion = $("#datos_js").attr("correo_sesion");
  var clave_sesion = $("#datos_js").attr("clave_sesion");

  firebase
    .auth()
    .signInWithEmailAndPassword(correo_sesion, clave_sesion)
    .then(() => {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          $("#btnchat").show();
          $("#chatemot").hide();

          $(document).on("click", "#btnchat", function () {
            
           // var lventanachat = Number($("#ventanachat").length);

            var lventanachat = Number($("#ventanachat").attr('lventanachat'));

            if (lventanachat == 1) {

              $("#ventanachat").hide("slow");
             // $("#ventanachat").remove();
              $("body").removeClass("modal-open");
              $("#ventanachat").attr('lventanachat', 2);
              
            } else if(lventanachat == 2) {

              $("body").addClass("modal-open");
              $("#ventanachat").show("slow");
             // $("#ventanachat").remove();
              $("#ventanachat").attr('lventanachat', 1);

            }else{
            
              var chatVentana = $(this);
              var curso = $(this).attr("curso");
              var id_grupo = $("#datos_js").attr("id_grupo");

              $.ajax({
                method: "POST",
                dataType: "json",
                url: "sesion.php?op=Chat",
                data: {
                  id_grupo: id_grupo,
                  curso: curso,
                },
              }).done(function (chat) {
        
                var id_sesion = $("#datos_js").attr("id_sesion");

                if (id_sesion != undefined) {
                  var quien = $("#datos_js").attr("quien");
                  var id_usuario;
                  var nle = 0;

                  if (quien == "director") {
                    id_usuario = "d-" + id_sesion;
                  } else if (quien == "secretario") {
                    id_usuario = "s-" + id_sesion;
                  } else if (quien == "psicologo") {
                    id_usuario = "y-" + id_sesion;
                  } else if (quien == "coordinador") {
                    id_usuario = "c-" + id_sesion;
                  } else if (quien == "registro") {
                    id_usuario = "r-" + id_sesion;
                  } else if (quien == "profesor") {
                    id_usuario = "p-" + id_sesion;
                  } else if (quien == "estudiante") {
                    id_usuario = "e-" + id_sesion;
                    nle = Number($("#chate" + id_sesion).attr("nle"));
                  }

                  $("#enlinea").attr('usuario', id_usuario);

                  if (id_grupo != undefined && id_usuario != undefined) {
                    /*window.addEventListener(
                      "contextmenu",
                      function (e) {
                        e.preventDefault();
                      },
                      false
                    );*/

                    var escuela_sesion = $("#datos_js").attr("escuela_sesion");
                    var foto_sesion = $("#datos_js").attr("foto_sesion");
                    var nombre_sesion = $("#datos_js").attr("nombre_sesion");

                    var UltimaConexion = firebase
                      .database()
                      .ref(
                        "escuela-" +
                          escuela_sesion +
                          "/usuarios/" +
                          id_grupo +
                          "/" +
                          id_usuario +
                          "/UltimaConexion"
                      );
                    var conectado = firebase
                      .database()
                      .ref(
                        "escuela-" +
                          escuela_sesion +
                          "/usuarios/" +
                          id_grupo +
                          "/" +
                          id_usuario +
                          "/conectado"
                      );

                    firebase
                      .database()
                      .ref(".info/connected")
                      .on("value", function (data) {
                        if (data.val()) {
                          conectado.onDisconnect().set(0);
                          conectado.set(1);
                          UltimaConexion.onDisconnect().set(
                            firebase.database.ServerValue.TIMESTAMP
                          );
                        }
                        
                      });

                    firebase
                      .database()
                      .ref(
                        "escuela-" +
                          escuela_sesion +
                          "/usuarios/" +
                          id_grupo +
                          "/" +
                          id_usuario +
                          "/quien"
                      )
                      .set(quien);
                    firebase
                      .database()
                      .ref(
                        "escuela-" +
                          escuela_sesion +
                          "/usuarios/" +
                          id_grupo +
                          "/fotos/" +
                          id_usuario
                      )
                      .set(foto_sesion);
                    firebase
                      .database()
                      .ref(
                        "escuela-" +
                          escuela_sesion +
                          "/usuarios/" +
                          id_grupo +
                          "/" +
                          id_usuario +
                          "/nombre"
                      )
                      .set(nombre_sesion);
                    firebase
                      .database()
                      .ref(
                        "escuela-" +
                          escuela_sesion +
                          "/usuarios/" +
                          id_grupo +
                          "/" +
                          id_usuario +
                          "/nle"
                      )
                      .set(nle);

                    var profesor_grupo = $("#datos_js").attr("profesor_grupo");
                    var urlimgs = $("#datos_js").attr("urlimgs");
                    
                    $("body").addClass("modal-open");

                    chatVentana.before(chat);
                    $("#ventanachat").show("slow");
                    ListaConectados(id_grupo);
                    ListarUltimoMsj();
                    $("#chatemot").hide();

                    const divs = document.querySelectorAll(".emojichatclick");

                    divs.forEach((el) =>
                      el.addEventListener("click", addToDiv)
                    );

                    var keyenter = document.getElementById("keyenter");

                    keyenter.addEventListener("click", addToDiv);

                    $(function () {
                      $("#formato_mensaje a").click(function (e) {
                        document.execCommand($(this).data("role"), false, null);
                      });
                    });

                    var cargar = 220;

                    $("#chats").attr("cant", cargar);

                    $("#chats").scroll(function () {
                      var sctop = $(this).scrollTop();

                      if (sctop == 0) {
                        $(".cargar-mas").remove();
                        var s = $("#chats").attr("cant");
                        if (s >= cargar && s != 0) {
                          $("#chats").prepend(
                            '<div id="cargar-mas" class="cargar-mas text-center"><div class="mb-3 bg-white rounded-circle border btn btn-sm"><i class="fa fa-refresh rotar py-1" style="font-size: 1.3rem;"></i></div></div>'
                          );

                          setTimeout(function () {
                            ListarOtrosMsjs(cargar);
                          }, 1000);
                        } else {
                          $("#chats").prepend(
                            '<div id="cargar-mas" class="cargar-mas text-center"><div class="mb-3 bg-white rounded-circle border btn btn-sm"><i class="fa fa-refresh rotar py-1" style="font-size: 1.3rem;"></i></div></div>'
                          );

                          setTimeout(function () {
                            $("#cargar-mas").remove();
                            $("#chats").prepend(
                              '<div id="cargar-mas" class="cargar-mas text-center"><div class="mb-3 bg-white rounded btn btn-sm">No hay m&aacute;s mensajes para mostrar</div><hr /></div>'
                            );
                          }, 1000);
                        }
                      }

                      MarcarLeido();

                      this.addEventListener("scroll", function (e) {
                        if (
                          this.scrollHeight -
                            this.scrollTop -
                            this.clientHeight <=
                          42
                        ) {
                          $("#boton_abajo").hide();
                        } else {
                          $("#boton_abajo").show();
                        }
                      });

                      $(".fechamt").each(function (j) {
                        var fechadia = $(this).position().top;
                        if (fechadia < -16) {
                          var topf = $(this).find(".fechadia").text();
                          if (topf == "Hoy") {
                            $("#top-fecha").hide();
                          } else {
                            $("#top-fecha .topfecha").text(topf);
                            $("#top-fecha").show();
                          }
                        }
                      });

                      clearTimeout($.data(this, "scrollTimer"));
                      $.data(
                        this,
                        "scrollTimer",
                        setTimeout(function () {
                          $("#top-fecha").hide();
                        }, 1000)
                      );
                    });

                    function MarcarLeido() {
                      $(".noleido").each(function () {
                        var ta = Number($(this).parent().position().top);
                        if (ta > -3 && ta < 209) {
                          var key = $(this).attr("id");
                          firebase
                            .database()
                            .ref(
                              "escuela-" +
                                escuela_sesion +
                                "/chat-" +
                                id_grupo +
                                "/" +
                                key +
                                "/lectores/" +
                                id_usuario
                            )
                            .set(firebase.database.ServerValue.TIMESTAMP);
                        }
                      });
                    }

                    function ListaConectados(id_grupo) {
                      firebase
                        .database()
                        .ref(
                          "escuela-" + escuela_sesion + "/usuarios/" + id_grupo
                        )
                        .on("value", (personal) => {
                          var conectados = "";
                          var econectados = "";
                          var pcs = 0;
                          var ecs = 0;
                          var es = 0;
                          var ps = 0;
                          personal.forEach(function (persona) {
                            if (persona.val().quien != undefined) {
                              var nombre = persona.val().nombre;

                              if(persona.val().conectado == 1 || (persona.val().conectado == 2 && (persona.key == id_usuario || id_usuario == "p-" + profesor_grupo))) {
                                var listar = 1;
                                var display = '';
                              }else{
                                var listar = 0;
                                var display = ' style="display:none"';
                              }
                              
                              if(persona.val().conectado == 2 && (persona.key == id_usuario || id_usuario == "p-" + profesor_grupo)) {
                              var estado = 'En l&iacute;nea (Invisible)';
                               var estado_icon = ' pasive';
                                }else{
                               var estado = 'En l&iacute;nea';
                              var estado_icon = '';
                              }

                              if(persona.key == id_usuario) {
                              nombre = 'Yo';
                              }

                              if (persona.val().quien == "estudiante") {
                                if (persona.val().conectado == 1 || persona.val().conectado == 2) {
                                  econectados +=
                                    '<li class="active pl-2 mb-1 pt-1 pb-0"'+display+'><div class="u-lector-' +
                                    persona.key +
                                    ' d-flex bd-highlight" nle="' +
                                    Number(persona.val().nle) +
                                    '" style="height: 45px;"><div class="img_cont"><img src="' +
                                    urlimgs +
                                    '/fotos/foto.jpg" data-container="#contactos" rel="tooltip" data-html="true" title="Desde hace ' +
                                    HaceTiempo(
                                      persona.val().UltimaConexion
                                    )[0] +
                                    '" class="rounded-circle user_img fotomsj-' +
                                    persona.key +
                                    '"><span class="online_icon'+estado_icon+'"></span></div><div class="pl-1 user_info"><span>' +
                                    nombre +
                                    '</span><p>'+estado+'</p></div></div></li>';
                                    if (listar == 1) {
                                  ecs++;
                                    }
                                } else {
                                  econectados +=
                                    '<li class="active pl-2 mb-1 pt-1 pb-0"'+display+'><div class="u-lector-' +
                                    persona.key +
                                    ' d-flex bd-highlight" nle="' +
                                    persona.val().nle +
                                    '" style="height: 45px;"><div class="img_cont"><img src="' +
                                    urlimgs +
                                    '/fotos/foto.jpg" data-container="#contactos" rel="tooltip" data-html="true" title="&Uacute;ltima conexi&oacute;n hace ' +
                                    HaceTiempo(
                                      persona.val().UltimaConexion
                                    )[0] +
                                    '" class="rounded-circle user_img fotomsj-' +
                                    persona.key +
                                    '"><span class="online_icon offline"></span></div><div class="pl-1 user_info"><span>' +
                                    nombre +
                                    "</span><p>Desconectado</p></div></div></li>";
                                }
                                if (listar == 1) {
                                  es++;
                                }
                              } else{
                                if (persona.val().conectado == 1 || persona.val().conectado == 2) {
                                  conectados +=
                                    '<li class="active pl-2 mb-1 pt-1 pb-0"'+display+'><div class="u-lector-' +
                                    persona.key +
                                    ' d-flex bd-highlight" nle="' +
                                    persona.val().nle +
                                    '" style="height: 45px;"><div class="img_cont"><img data-container="#contactos" rel="tooltip" title="Desde hace ' +
                                    HaceTiempo(
                                      persona.val().UltimaConexion
                                    )[0] +
                                    '" src="' +
                                    urlimgs +
                                    '/fotos/foto.jpg" class="rounded-circle user_img fotomsj-' +
                                    persona.key +
                                    '"><span class="online_icon'+estado_icon+'"></span></div><div class="pl-1 user_info"><span>' +
                                    nombre +
                                    '</span><p>'+estado+'</p></div></div></li>';
                                    if (listar == 1) {
                                  pcs++;
                                    }
                                } else if (persona.val().nombre != undefined) {
                                  conectados +=
                                    '<li class="pl-2"'+display+'><div class="u-lector-' +
                                    persona.key +
                                    ' d-flex bd-highlight" nle="' +
                                    persona.val().nle +
                                    '" style="height: 45px;'+display+'"><div class="img_cont"><img data-container="#contactos" rel="tooltip" title="&Uacute;ltima conexi&oacute;n hace ' +
                                    HaceTiempo(
                                      persona.val().UltimaConexion
                                    )[0] +
                                    '" src="' +
                                    urlimgs +
                                    '/fotos/foto.jpg" class="rounded-circle user_img fotomsj-' +
                                    persona.key +
                                    '"><span class="online_icon offline"></span></div><div class="user_info"><span>' +
                                    nombre +
                                    "</span><p>Desconectado</p></div></div></li>";
                                }
                                if (listar == 1) {
                                ps++;
                                }
                              }
                            }
                          });

                          $("#chateconectados").html(econectados);

                          if (ecs > 0) {
                            $("#tconectadose").text(ecs + " estudiantes");
                          }else if(es > 0){
                            $("#tconectadose").text("Desconectados");
                          }else {
                              $("#tconectadose").text("");
                          }

                          if (pcs > 0) {
                            $("#tconectadosp").text(pcs + " personal");
                          } else if(ps > 0){
                            $("#tconectadosp").text("Desconectados");
                          }else {
                              $("#tconectadosp").text("");
                          }

                          $("#chatpconectados").html(conectados);
                          FotosMsj();
                          setTimeout(function () {
                            $('#enlinea').attr('v', 'v');
                          }, 1000);
                            
                        });

                    const enlinea = document.getElementById("enlinea");

                    const estado = new MutationObserver(function() {
                      
                    var visible = enlinea.getAttribute('visible');
                    var usuario = enlinea.getAttribute('usuario');

                    if(visible == 1){
                      conectado.set(1);
                      $('.visible-text').hide();
                      $('.visible-msj').show();
                    }else{
                      conectado.set(2);
                      if(usuario == id_usuario && id_usuario != "p-" + profesor_grupo){
                        $('.visible-msj').hide();
                        $('.visible-text').show();
                      }else{
                        $('.visible-text').hide();
                      $('.visible-msj').show();
                      }
                    }
                        
                    });
                    
                    estado.observe(enlinea, {attributes: true});

                    }

                    $(document).on("click", "#mover_chat", function () {
                      $("#chaterd").addClass("chaterd_mover").css({
                        cursor: "move",
                        "-ms-touch-action": "none",
                        "touch-action": "none",
                      });
                      $("#mover_chat").removeClass('d-inline-block');
                      $(".chaterd_mover").draggable({
                        droptarget: "body",
                        drop: function (evt, droptarget) {
                          $("#chaterd").removeClass("chaterd_mover").css({
                            cursor: "unset",
                            "-ms-touch-action": "unset",
                            "touch-action": "unset",
                          });
                          $("#mover_chat").addClass('d-inline-block');
                          $("#mover_chat").show();
                          $(this).draggable("destroy");
                        },
                      });

                      $(this).hide();
                    });

                    function FullScreen(){
                      var requestMethod = document.body.requestFullScreen || document.body.webkitRequestFullScreen || document.body.mozRequestFullScreen || document.body.msRequestFullScreen;
                          if(requestMethod){
                            requestMethod.call(document.body);
                          }else if (typeof window.ActiveXObject !== "undefined"){
                            var wscript = new ActiveXObject("WScript.Shell");
                            if(wscript !== null){
                              wscript.SendKeys("{F11}");
                              $("#btnchat").hide();
                            }
                          }
                    }

                    function SalirFullScreen(){
                      if (document.exitFullscreen) {
                        document.exitFullscreen();
                      } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                      } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                      }
                      $("#btnchat").show();
                    }

                    $(document).on('click', '#btn_full', function () {
                    

                        if($(this).attr('transform') == 'matrix(1, 0, 0, 1, 0, 0)'){

                          $(this).attr('transform', 'matrix(-1, 0, 0, -1, 0, 0)');
                          $('#chaterd').css({'right': '0rem', 'bottom': '0rem', 'left': '0rem', 'top': '0rem', 'height': '100vh'});
                          $('#chaterd .card').css({'height': '100vh'});
                          $('#chaterd').removeClass("col-lg-8");
                          $('#chaterd').addClass("col-lg-12");
                          $('#mover_chat').hide();

                          FullScreen();
                          $('#ImgVideoAmplia').attr('full', 0);

                        }else{

                          $(this).attr('transform', 'matrix(1, 0, 0, 1, 0, 0)');
                          $('#chaterd').css({'right': 'unset', 'left': 'unset', 'bottom': 'unset', 'top': 'unset'});
                          $('#chaterd').css({'right': '8%', 'bottom': '23%', 'height': '380px'});
                          $('#chaterd .card').css({'height': '430px'});
                          $('#chaterd').removeClass("col-lg-12");
                          $('#chaterd').addClass("col-lg-8");
                          $('#mover_chat').show();

                          SalirFullScreen();
                          $('#ImgVideoAmplia').attr('full', 1);
                          
                        }

                    });

                    function HaceTiempo(fecha) {
                      var hoy = $.now() / 1000;
                      var hace = hoy - fecha / 1000;

                      var s = Math.round(hace);
                      var m = Math.round(hace / 60);
                      var h = Math.round(hace / 3600);
                      var d = Math.round(hace / 86400);
                      var w = Math.round(hace / 604800);
                      var me = Math.round(hace / 2600640);
                      var a = Math.round(hace / 31207680);

                      if (s < 60 || s == 60) {
                        if (s < 1) {
                          var tiempo = "un segundo";
                        } else {
                          var tiempo = s + " segundos";
                        }
                      } else {
                        if (m < 60 || m == 60) {
                          if (m == 1) {
                            var tiempo = "un minuto";
                          } else {
                            var tiempo = m + " minutos";
                          }
                        } else {
                          if (h < 24 || h == 24) {
                            if (h == 1) {
                              var tiempo = "una hora";
                            } else {
                              var tiempo = h + " horas";
                            }
                          } else {
                            if (d < 7 || d == 7) {
                              if (d == 1) {
                                var tiempo = "un d&iacute;a";
                              } else {
                                var tiempo = d + " d&iacute;as";
                              }
                            } else {
                              if (w < 4.3 || w == 4.3) {
                                if (w == 1) {
                                  var tiempo = "una semana";
                                } else {
                                  var tiempo = w + " semanas";
                                }
                              } else {
                                if (me < 12 || me == 12) {
                                  if (me == 1) {
                                    var tiempo = "un mes";
                                  } else {
                                    var tiempo = me + " meses";
                                  }
                                } else {
                                  if (a == 1) {
                                    var tiempo = " un a&ntilde;o";
                                  } else {
                                    var tiempo = a + " a&ntilde;os";
                                  }
                                }
                              }
                            }
                          }
                        }
                      }

                      return [tiempo, me];
                    }

                    function FechaChat(t, f = 0, ho = 0) {
                      t = Number(t);

                      var fhoy = new Date();
                      var dhoy = fhoy.getDate();
                      var mhoy = fhoy.getMonth() + 1;

                      var fayer = fhoy;
                      fayer.setDate(dhoy - 1);
                      var dayer = fayer.getDate();
                      var mayer = fayer.getMonth() + 1;

                      var fhace = new Date(t);
                      var dhace = fhace.getDate();
                      var mhace = fhace.getMonth() + 1;

                      var mer = "A.M.";
                      var h = fhace.getHours();
                      if (h > 12) {
                        mer = "P.M.";
                        h = h - 12;
                      }
                      var h = ("0" + h).substr(-2);
                      var m = ("0" + fhace.getMinutes()).substr(-2);
                      if (h == "00") {
                        h = 12;
                      }

                      var fechachat_h = h + ":" + m + " " + mer;

                      var fechachat = "";

                      var fayerUNO = fhoy;
                      fayerUNO.setDate(dhoy - 2);
                      var dayerUNO = fayerUNO.getDate();

                      var fayerDOS = fhoy;
                      fayerDOS.setDate(dhoy - 3);
                      var dayerDOS = fayerDOS.getDate();

                      var fayerTRES = fhoy;
                      fayerTRES.setDate(dhoy - 4);
                      var dayerTRES = fayerTRES.getDate();

                      var fayerCUATRO = fhoy;
                      fayerCUATRO.setDate(dhoy - 5);
                      var dayerCUATRO = fayerCUATRO.getDate();

                      var fayerCINCO = fhoy;
                      fayerCINCO.setDate(dhoy - 6);
                      var dayerCINCO = fayerCINCO.getDate();

                      if (mhace == mhoy && dhace == dayerUNO) {
                        fechachat = fhace.toLocaleDateString("es-DO", {
                          weekday: "long",
                        });
                        fechachat =
                          fechachat.charAt(0).toUpperCase() +
                          fechachat.slice(1);
                      } else if (mhace == mhoy && dhace == dayerDOS) {
                        fechachat = fhace.toLocaleDateString("es-DO", {
                          weekday: "long",
                        });
                        fechachat =
                          fechachat.charAt(0).toUpperCase() +
                          fechachat.slice(1);
                      } else if (mhace == mhoy && dhace == dayerTRES) {
                        fechachat = fhace.toLocaleDateString("es-DO", {
                          weekday: "long",
                        });
                        fechachat =
                          fechachat.charAt(0).toUpperCase() +
                          fechachat.slice(1);
                      } else if (mhace == mhoy && dhace == dayerCUATRO) {
                        fechachat = fhace.toLocaleDateString("es-DO", {
                          weekday: "long",
                        });
                        fechachat =
                          fechachat.charAt(0).toUpperCase() +
                          fechachat.slice(1);
                      } else if (mhace == mhoy && dhace == dayerCINCO) {
                        fechachat = fhace.toLocaleDateString("es-DO", {
                          weekday: "long",
                        });
                        fechachat =
                          fechachat.charAt(0).toUpperCase() +
                          fechachat.slice(1);
                      } else if (mhace == mayer && dhace == dayer) {
                        fechachat = "Ayer";
                      } else if (mhace == mhoy && dhace == dayer) {
                        fechachat = "Ayer";
                      } else if (mhace == mhoy && dhace == dhoy) {
                        if (f == 1) {
                          fechachat = "Hoy";
                        } else {
                          fechachat = fechachat_h;
                          ho = 0;
                        }
                      } else {
                        if (f == 1) {
                          var meses = [
                            "enero",
                            "febrero",
                            "marzo",
                            "abril",
                            "mayo",
                            "junio",
                            "julio",
                            "agosto",
                            "septiembre",
                            "octubre",
                            "noviembre",
                            "diciembre",
                          ];
                          var mes = meses[mhace - 1];
                          fechachat =
                            dhace + " de " + mes + " de " + fhace.getFullYear();
                        } else {
                          fechachat =
                            dhace + "/" + mhace + "/" + fhace.getFullYear();
                        }
                      }

                      if (ho == 1) {
                        fechachat += ", " + fechachat_h;
                      }

                      return fechachat;
                    }

                    function MsjFormato(msj) {
                      msj = msj.replace(/\<b\>(.*?)\<\/b\>/gi, "*$1*");
                      msj = msj.replace(/\<i\>(.*?)\<\/i\>/gi, "#$1#");
                      msj = msj.replace(
                        /\<strike\>(.*?)\<\/strike\>/gi,
                        "~$1~"
                      );
                      msj = msj.replace(/\<u\>(.*?)\<\/u\>/gi, "%$1%");
                      msj = msj.replace(/\<br(.*?)\/?\>/gi, "\n");
                      return msj;
                    }

                    function FormatoMsj(msj) {
                      msj = msj.replace(/\*(.*?)\*/gi, "<b>$1</b>");
                      msj = msj.replace(/\#(.*?)\#/gi, "<i>$1</i>");
                      msj = msj.replace(/\~(.*?)\~/gi, "<strike>$1</strike>");
                      msj = msj.replace(/\%(.*?)\%/gi, "<u>$1</u>");
                      return msj;
                    }

                    $(document).on("click", "#cerraremojischat", function () {
                      $("#emojibtn").trigger("click");
                    });

                    $(document).on("keyup", "#ventanachat", function () {
                      if (event.keyCode == 27) {
                        if ($("#chatemot").is(":hidden") == false) {
                          $("#emojibtn").trigger("click");
                        } else if (
                          $("#respondiendo_chat").is(":hidden") == false
                        ) {
                          $("#respondiendo_chat").hide();
                          $("#respuesta_chat").text("");
                        } else if ($("#sesionchat").is(":hidden") == false) {
                          $("#btnchat").trigger("click");
                        }
                      }
                    });

                    $(document).on("click", "#emojibtn", function () {
                      $("#chatemot").toggle("slow");
                    });

                    $(document).on("input", "#chat_mensaje", function () {
                      var text = $(this).text();
                      if (text.trim() == "") {
                        $(this).text("");
                      }
                    });

                    $(document).on("click", function (e) {
                      e.stopPropagation();
                      $("#chat_formato").hide();
                    });

                    $(document).on("click", "#chat_mensaje", function (e) {
                      e.stopPropagation();
                      $("#chat_formato").show();
                    });

                    $(document).on(
                      "keyup change",
                      "#chat_mensaje",
                      function () {
                        var val = $(this).text();

                        if (event.ctrlKey || event.shiftKey) {
                          if (event.keyCode === 73) {
                            $("#emojibtn").trigger("click");

                            setTimeout(function () {
                              if ($("#emojischat").is(":hidden") === false) {
                                $("#cara-tab").focus();
                              }
                            }, 1000);
                          }
                        }

                        if (val.length > 0) {
                          $("#btnEnviar i").css("visibility", "visible");
                          if (event.ctrlKey || event.shiftKey) {
                            if (event.keyCode === 13) {
                              $("#keyenter").trigger("click");
                            }
                          } else if (event.keyCode === 13) {
                            $("#btnEnviar").trigger("click");
                          }
                        } else {
                          $("#btnEnviar i").css("visibility", "hidden");
                        }
                      }
                    );

                    function pasteHtmlAtCaret(html) {
                      let sel, range;
                      if (window.getSelection) {
                        sel = window.getSelection();
                        if (sel.getRangeAt && sel.rangeCount) {
                          range = sel.getRangeAt(0);
                          range.deleteContents();

                          const el = document.createElement("div");
                          el.innerHTML = html;
                          let frag = document.createDocumentFragment(),
                            node,
                            lastNode;
                          while ((node = el.firstChild)) {
                            lastNode = frag.appendChild(node);
                          }
                          range.insertNode(frag);

                          if (lastNode) {
                            range = range.cloneRange();
                            range.setStartAfter(lastNode);
                            range.collapse(true);
                            sel.removeAllRanges();
                            sel.addRange(range);
                          }
                        }
                      } else if (
                        document.selection &&
                        document.selection.type != "Control"
                      ) {
                        document.selection.createRange().pasteHTML(html);
                      }
                    }

                    function addToDiv(event, formato = "") {
                      const emoji = event.target.value;
                      const chatBox = document.getElementById("chat_mensaje");
                      chatBox.focus();
                      pasteHtmlAtCaret(`${emoji}`);
                    }

                    $(document).on("click", ".elmchat", function (e) {
                      e.stopPropagation();
                      var key = $(this).attr("key");
                      if (
                        !confirm(
                          "\u00BFSeguro de querer eliminar este mensaje?"
                        )
                      ) {
                        return false;
                      }
                      firebase
                        .database()
                        .ref(
                          "escuela-" +
                            escuela_sesion +
                            "/chat-" +
                            id_grupo +
                            "/" +
                            key +
                            "/activo"
                        )
                        .set("2");
                      $("#chat_mensaje").focus();
                      ContarChats();
                    });

                    $(document).on("click", ".oculchat", function () {
                      var key = $(this).attr("key");
                      var usuario = $(this).attr("usuario");

                      var p = $(this).attr("p");

                      if (usuario != id_usuario) {
                        if (
                          !confirm(
                            "\u00BFSeguro de querer ocultar este mensaje?\r\nNo podr\u00e1 volverlo a mostrar."
                          )
                        ) {
                          return false;
                        }
                      } else {
                        if (
                          !confirm(
                            "\u00BFSeguro de querer ocultar este mensaje?"
                          )
                        ) {
                          return false;
                        }
                      }

                      firebase
                        .database()
                        .ref(
                          "escuela-" +
                            escuela_sesion +
                            "/chat-" +
                            id_grupo +
                            "/" +
                            key +
                            "/activo"
                        )
                        .set("0");
                      $("#chat_mensaje").focus();
                    });

                    $(document).on("click", ".moschat", function () {
                      var key = $(this).attr("key");
                      if (
                        !confirm("\u00BFSeguro de querer mostrar este mensaje?")
                      ) {
                        return false;
                      }

                      firebase
                        .database()
                        .ref(
                          "escuela-" +
                            escuela_sesion +
                            "/chat-" +
                            id_grupo +
                            "/" +
                            key +
                            "/activo"
                        )
                        .set("1");
                      $("#chat_mensaje").focus();
                    });

                    $(document).on("click", ".verlectores", function () {
                      var key = $(this).attr("key");
                      var ent = $(this).attr("ent");
                      firebase
                        .database()
                        .ref(
                          "escuela-" +
                            escuela_sesion +
                            "/chat-" +
                            id_grupo +
                            "/" +
                            key +
                            "/lectores"
                        )
                        .once("value", (lectores) => {
                          var u_lectores = "";
                          lectores.forEach(function (lector) {
                            u_lector = $(".u-lector-" + lector.key);
                            var nombre = u_lector
                              .find(".user_info span")
                              .html();
                            var foto = u_lector.find("img").attr("src");
                            u_lectores +=
                              '<div class="row m-0"><div class="col-2 text-center"><img src="' +
                              foto +
                              '" alt="' +
                              nombre +
                              '" class="rounded-circle" /></div><div class="col-10 text-left border-bottom pb-1"><strong>' +
                              nombre +
                              "</strong><br />Le&iacute;do: " +
                              FechaChat(lector.val(), 1, 1) +
                              "<br />Entregado: Hace " +
                              HaceTiempo(ent)[0] +
                              "</div></div>";
                          });
                          $("#lectores-msjs").html(u_lectores);
                        });
                    });

                    $(document).on("click", "#btnEnviar", function () {
                      var mensaje_chat = $("#chat_mensaje");

                      if (mensaje_chat.text().length > 0) {
                        var chat_mensaje;
                        chat_mensaje = mensaje_chat.html().trim();

                        chat_mensaje = MsjFormato(chat_mensaje);

                        chat_mensaje = chat_mensaje.replace(
                          /<(?<=<)(.*?)(?=>)>/g,
                          ""
                        );
                        chat_mensaje = chat_mensaje.substring(0, 1500);

                        var respuesta_chat = $("#respuesta_chat").html();

                        if (respuesta_chat == undefined) {
                          respuesta_chat = "";
                        }

                        if (
                          respuesta_chat != "" &&
                          respuesta_chat.indexOf("<br />") > -1
                        ) {
                          respuesta_chat = respuesta_chat
                            .split("<br />")
                            .join("\n");
                        }

                        var usuario_respuesta = $("#usuario_respuesta").val();
                        var key_respuesta = $("#key_respuesta").val();
                        $("#respondiendo_chat").hide();
                        $("#respuesta_chat").text("");

                        chat_mensaje = chat_mensaje.split("\n");
                        chat_mensaje = chat_mensaje.filter((e) => e);
                        chat_mensaje = chat_mensaje.join("\n");

                        firebase
                          .database()
                          .ref(
                            "escuela-" + escuela_sesion + "/chat-" + id_grupo
                          )
                          .push({
                            usuario: id_usuario,
                            mensaje: chat_mensaje,
                            respuesta: respuesta_chat,
                            usuario_respuesta: usuario_respuesta,
                            key_respuesta: key_respuesta,
                            marca_de_tiempo: $.now(),
                            activo: 1,
                          });
                        mensaje_chat.text("");
                        $("#focuschat").attr("focus", 1);
                        if (Number($("#focuschat").attr("focus")) == 1) {
                          $("#focuschat").attr("focus", 2);
                          $("#focuschat").focus();
                          $("#chat_mensaje").focus();
                          setTimeout(function () {
                            MarcarLeido();
                          }, 1000);
                        }
                      }
                    });

                    function ContarChats() {
                      var chats = $(".chat-msj").length;
                      $("#tmensajes").text(chats + " mensajes en este chat");
                    }

                    function FotosMsj() {
                      firebase
                        .database()
                        .ref(
                          "escuela-" +
                            escuela_sesion +
                            "/usuarios/" +
                            id_grupo +
                            "/fotos"
                        )
                        .on("value", function (fotos) {
                          fotos.forEach(function (foto) {
                            var urlfoto = urlimgs + "imagenes/fotos/foto.jpg";
                            if (foto.val() != "") {
                              urlfoto = foto.val();
                            }
                            $(".fotomsj-" + foto.key).attr("src", urlfoto);
                          });
                        });
                    }

                    function ListarOtrosMsjs(cargar) {
                      var scrollmsj = $("#chats").attr("scrollmsj");

                      if (scrollmsj != "") {
                        firebase
                          .database()
                          .ref(
                            "escuela-" + escuela_sesion + "/chat-" + id_grupo
                          )
                          .orderByKey()
                          .endBefore(scrollmsj)
                          .limitToLast(cargar)
                          .once("value", function (msjscrolls) {
                            var msj_html = "";

                            var n = new Array();
                            var s = 0;
                            msjscrolls.forEach(function (msjscroll) {
                              if (s == 0) {
                                $("#chats").attr("scrollmsj", msjscroll.key);
                              }
                              msj_html += MsjChat(n, s, msjscroll)[0];

                              s++;
                            });
                            $(".cargar-mas").remove();
                            $("#chats").prepend(msj_html);
                            $("#chats").scrollTop(5);
                            FotosMsj();
                            ContarChats();
                            $("#chats").attr("cant", s);
                            $("#chats [id].fechamt").each(function (i) {
                              $('[id="' + this.id + '"]')
                                .slice(1)
                                .remove();
                            });
                          });
                      }
                    }

                    function UltimoMsj(mensajes) {
                      var msjhtml = "";

                      var nuevos = 0;

                      var n = new Array();
                      var i = 0;
                      var aviso_nuevos = 1;
                      var f = $("#chats").attr("f");
                      mensajes.forEach(function (msjs) {
                        if (i == 0) {
                          $("#chats").attr("scrollmsj", msjs.key);
                        }

                        var key = Number($("#" + msjs.key).length);

                        var msjchat = MsjChat(n, i, msjs, f);

                        nuevos += Number(msjchat[1]);

                        if (
                          nuevos > 0 &&
                          aviso_nuevos == 1 &&
                          $("#aviso_nuevos").length == 0
                        ) {
                          msjhtml +=
                            '<a href="#!" id="aviso_nuevos" class="bg-secondary py-1 mb-2 rounded text-center text-white d-block" style="width:100%;"></a>';
                          aviso_nuevos++;
                        }

                        if (key == 0) {
                          msjhtml += msjchat[0];

                          i++;
                        }

                        if (
                          key > 0 &&
                          msjs.val().usuario == id_usuario &&
                          msjs.val().lectores != undefined &&
                          msjs.val().lectores != 0 &&
                          msjs.val().lectores != "" &&
                          $("#key-" + msjs.key).text() == ""
                        ) {
                          $("#key-" + msjs.key).html(
                            '<i class="verlectores fa fa-check d-block m-0 p-0 text-right text-primary" aria-hidden="true" style="font-size: 0.7rem;cursor:pointer" data-container="#chats" rel="tooltip" title="Mensaje le&iacute;do" data-toggle="modal" data-target="#msjs-lectores" key="' +
                              msjs.key +
                              '" ent="' +
                              msjs.val().marca_de_tiempo +
                              '" ></i>'
                          );
                        }

                        if (key > 0) {
                          MsjOpcs(
                            msjs.key,
                            msjs.val().activo,
                            msjs.val().usuario
                          );
                        }

                        if (msjs.val().activo > 1) {
                          $("#" + msjs.key)
                            .parent()
                            .remove();
                          firebase
                            .database()
                            .ref(
                              "escuela-" +
                                escuela_sesion +
                                "/chat-" +
                                id_grupo +
                                "/" +
                                msjs.key
                            )
                            .remove();
                        } else if (
                          msjs.val().activo < 1 &&
                          msjs.val().usuario != id_usuario &&
                          id_usuario != "p-" + profesor_grupo
                        ) {
                          $("#" + msjs.key)
                            .parent()
                            .remove();
                        }
                      });

                      $("#focuschat").before(msjhtml);

                      if ($("#focuschat").attr("focus") == 3) {
                        if ($("#aviso_nuevos").length > 0) {
                          $("#aviso_nuevos").focus();
                          $("#chat_mensaje").focus();
                        } else {
                          $("#focuschat").focus();
                          $("#chat_mensaje").focus();
                        }
                        $("#focuschat").attr("focus", 2);
                      }

                      $("#ventanachat").attr('lventanachat', 2);

                      $("#chats").attr("f", 2);

                      if (nuevos > 0) {
                        var textonuevo = nuevos;
                        if (nuevos < 10) {
                          textonuevo = "&nbsp;" + nuevos + "&nbsp;";
                        } else if (nuevos > 99) {
                          textonuevo = 99 + "+";
                        }
                        $("#tnuevos").html(textonuevo);
                        $("#tnuevos").show();
                        $("#aviso_nuevos").html(
                          textonuevo + " mensajes sin leer"
                        );
                        $("#aviso_nuevos").show();
                        $("#abajo_nuevos_msjs").text(nuevos);
                        $("#abajo_nuevos_msjs").show("slow");
                      } else {
                        $("#tnuevos").hide();
                        $("#tnuevos").text("");
                        $("#aviso_nuevos").remove();
                        $("#abajo_nuevos_msjs").hide();
                        $("#abajo_nuevos_msjs").text("");
                      }

                      FotosMsj();
                      ContarChats();
                    }

                    function MsjOpcs(key, activo, usuario) {
                      var msj = $("#" + key);
                      if (activo == 1) {
                        msj.parent().css({ filter: "unset" });
                        msj.parent().find(".msj_opcs").css({ filter: "unset" });
                        msj
                          .parent()
                          .find(".opc")
                          .attr("class", "opc oculchat fa fa-eye");
                        msj.parent().find(".opc").attr("usuario", usuario);
                        msj
                          .parent()
                          .find(".opc")
                          .attr(
                            "data-original-title",
                            "Click para ocultar mensaje"
                          );
                        msj
                          .parent()
                          .find(".no-responder_chat")
                          .attr("data-original-title", "Click para responder");
                        msj
                          .parent()
                          .find(".no-responder_chat")
                          .attr("class", "responder_chat mx-1 rounded-circle px-1");
                      } else {
                        msj.parent().css({ filter: "grayscale(100%)" });
                        msj
                          .parent()
                          .find(".msj_opcs")
                          .css({ filter: "grayscale(100%)" });

                        if (
                          id_usuario == "p-" + profesor_grupo &&
                          id_usuario != usuario
                        ) {
                          msj
                            .parent()
                            .find(".opc")
                            .attr("class", "opc fa fa-eye-slash");
                          msj
                            .parent()
                            .find(".opc")
                            .attr(
                              "data-original-title",
                              "Mensaje oculto para los dem&aacute;s"
                            );
                        } else {
                          msj
                            .parent()
                            .find(".opc")
                            .attr("class", "opc moschat fa fa-eye-slash");
                          msj
                            .parent()
                            .find(".opc")
                            .attr(
                              "data-original-title",
                              "Click para mostrar mensaje"
                            );
                        }

                        msj
                          .parent()
                          .find(".responder_chat")
                          .removeAttr("data-original-title");
                        msj
                          .parent()
                          .find(".responder_chat")
                          .attr("class", "no-responder_chat");
                      }
                    }

                    function ListarUltimoMsj() {
                      $("#chats").html(
                        '<a href="#" id="focuschat" focus="3"></a><div class="text-right" id="boton_abajo" style="display:block" resp=""><span id="abajo_nuevos_msjs" class="bg-success text-white" style="display:none;"></span><div class="boton_abajo text-right"><i class="fa fa-angle-double-down border fa-2x"></i></div></div>'
                      );
                      firebase
                        .database()
                        .ref("escuela-" + escuela_sesion + "/chat-" + id_grupo)
                        .limitToLast(100)
                        .on("value", function (mensajes) {
                          UltimoMsj(mensajes);
                          $("#chats [id].fechamt").each(function (i) {
                            $('[id="' + this.id + '"]')
                              .slice(1)
                              .remove();
                          });
                        });
                    }

                    var colores = [
                      "#fff",
                      "#E63E6D",
                      "#FFF6CD",
                      "#F0D9FF",
                      "#38A3A5",
                      "#FC5404",
                      "#FEC260",
                      "#E2C2B9",
                      "#FD6F96",
                      "#D4ECDD",
                      "#2D46B9",
                      "#57CC99",
                      "#E4D8DC",
                      "#B8DFD8",
                      "#95DAC1",
                      "#C68B59",
                      "#865439",
                      "#22577A",
                      "#BFA2DB",
                      "#3DB2FF",
                      "#F7FD04",
                      "#4B6587",
                      "#E7EAB5",
                      "#FFE194",
                      "#B42B51",
                      "#82ccdd",
                      "#FF95C5",
                      "#BFD8B8",
                      "#E05D5D",
                      "#86340A",
                      "#C36839",
                      "#78e08f",
                      "#7EB5A6",
                      "#345B63",
                    ];

                    function MsjChat(n, i, msjs, f = 0) {
                      var msjchathtml = "";
                      var msj = msjs.val();
                      if (msj.mensaje != undefined) {
                        var mensaje = msj.mensaje.substring(0, 1500);

                        if (mensaje.length > 0) {

                          var hacetiempo = HaceTiempo(msj.marca_de_tiempo);

                          if(mensaje.substr(0, 4) == 'http'){
                            mensaje = ' ' + mensaje;
                          }

                          datos_u = $(".u-lector-" + msj.usuario);
                            var nombre = datos_u.find(".user_info span").html();
                            var foto = datos_u.find("img").attr("src");
                            var nle = Number(datos_u.attr("nle"));

                          mensaje = mensaje.replaceAll('%20', ' ');
                          mensaje = mensaje.replaceAll('&nbsp;', ' ');
                          mensaje = MsjImg(mensaje);
                          mensaje = MsjVid(mensaje);
                          mensaje = MsjLink(mensaje, nle);

                          if (hacetiempo[1] < 5) {
                            var elm = "";
                            var msjeliminado = "";
                            var msjresponder = 1;

                            if (
                              msj.usuario == id_usuario &&
                              id_usuario != "p-" + profesor_grupo
                            ) {
                              if (msj.activo == 1) {
                                elm +=
                                  ' - <i style="cursor:pointer" key="' +
                                  msjs.key +
                                  '" usuario="' +
                                  msj.usuario +
                                  '" data-container="#chats" data-html="true" rel="tooltip" title="Click para olcultar mensaje" class="opc oculchat fa fa-eye"></i>';
                              } else {
                                msjeliminado = "filter: grayscale(100%);";
                                elm +=
                                  ' - <i style="cursor:pointer" key="' +
                                  msjs.key +
                                  '" data-container="#chats" data-html="true" rel="tooltip" title="Click para mostrar mensaje" class="opc moschat fa fa-eye-slash"></i>';
                                msjresponder = 0;
                              }
                            } else if (id_usuario == "p-" + profesor_grupo) {
                              if (msj.activo == 1) {
                                elm +=
                                  ' - <i style="cursor:pointer" key="' +
                                  msjs.key +
                                  '" usuario="' +
                                  msj.usuario +
                                  '" data-container="#chats" data-html="true" rel="tooltip" title="Click para olcultar mensaje" class="opc oculchat fa fa-eye"></i>';
                              } else {
                                msjeliminado = "filter: grayscale(100%);";
                                msjresponder = 0;
                                if (id_usuario == msj.usuario) {
                                  elm +=
                                    ' - <i style="cursor:pointer" key="' +
                                    msjs.key +
                                    '" data-container="#chats" data-html="true" rel="tooltip" title="Click para mostrar mensaje" class="opc moschat fa fa-eye-slash"></i>';
                                } else {
                                  elm +=
                                    ' - <i class="opc fa fa-eye-slash" eye="2" aria-hidden="true" data-container="#chats" data-html="true" data-html="true" rel="tooltip" title="Mensaje oculto para los dem&aacute;s"></i>';
                                }
                              }

                              elm +=
                                ' - <i style="cursor:pointer" key="' +
                                msjs.key +
                                '" data-container="#chats" data-html="true" rel="tooltip" title="Click para eliminar" class="elmchat fa fa-trash"></i>';
                            }

                            

                            var msj_mensaje = "";

                            if (msj.marca_de_tiempo != undefined) {
                              var fechamt = FechaChat(msj.marca_de_tiempo, 1);
                              var fechamtid = fechamt.replaceAll(" ", "");

                              msjchathtml +=
                                '<div id="' +
                                fechamtid +
                                '" class="text-center my-3 fechamt"><div class="d-inline-block bg-info pb-1 text-white rounded border px-1 fechadia" style="font-size: 0.7rem">' +
                                fechamt +
                                "</div></div>";
                            }

                            if (
                              msj.activo == 1 ||
                              id_usuario == "p-" + profesor_grupo ||
                              (msj.usuario == id_usuario &&
                                id_usuario != "p-" + profesor_grupo)
                            ) {
                              var respuestahtml = "";

                              if (msj.respuesta != "") {
                                var respuesta = LaTeXtoMath(msj.respuesta, "white");
                                respuesta = FormatoMsj(respuesta);
                                var nombre_respuesta = $(
                                  ".u-lector-" + msj.usuario_respuesta
                                )
                                  .find(".user_info span")
                                  .html();

                                respuestahtml =
                                  '<div class="px-2 respuesta_chat"><strong class="d-block" style="color: black">' +
                                  nombre_respuesta +
                                  ':</strong><span key_respuesta="' +
                                  msj.key_respuesta +
                                  '" class="focus_msj_chat">' +
                                  respuesta +
                                  "</span></div>";
                              }

                              var math_msj = mensaje;

                              mensaje = FormatoMsj(mensaje);

                              math_msj = math_msj.split("\n").join("<br />");

                              math_msj = LaTeXtoMath(math_msj);
                              math_msj = FormatoMsj(math_msj);

                              msj_mensaje = math_msj;

                              var responder_chat = '';
                          
                              if (msjresponder == 1) {
                                responder_chat = '<div class="responder_chat mx-1 rounded-circle px-1" style="visibility:hidden" data-container="#chats" rel="tooltip" title="Click para responder" usuario="' +
                                msj.usuario +
                                '" color="' +
                                colores[nle] +
                                '" key="' +
                                msjs.key +
                                '"><i class="fa fa-reply text-white"></i></div><span style="display:none" class="responder_chat_math" id="math' +
                                msjs.key +
                                '">' +
                                mensaje +
                                '</span>';
                              }

                              n[i] = msj.usuario;

                              if (f == 0 || f == 2) {
                                var lado = $(".chat-msj").last().attr("lado");
                                var usuario = $(".chat-msj")
                                  .last()
                                  .attr("usuario");
                                if (f == 0) {
                                  if (lado == "der") {
                                    lado = "izq";
                                  } else {
                                    lado = "der";
                                  }
                                }
                                if (
                                  msj.usuario != usuario &&
                                  usuario != "" &&
                                  usuario != undefined
                                ) {
                                  if (lado == "der") {
                                    lado = "izq";
                                  } else {
                                    lado = "der";
                                  }
                                }
                              }
                              if (f == 1) {
                                if (msj.usuario != n[i - 1]) {
                                  var lado = $("#ordenchat").val();

                                  if (lado == "izq") {
                                    $("#ordenchat").val("der");
                                  } else {
                                    $("#ordenchat").val("izq");
                                  }
                                }
                              }

                              var noleido = "";

                              var nuevo = 0;

                              if (
                                msj.usuario != id_usuario &&
                                (msj.lectores == undefined ||
                                  msj.lectores == 0 ||
                                  msj.lectores == "")
                              ) {
                                
                                var noleido = ' class="noleido"';

                                $("#audio_msj_chat").get(0).play();

                                nuevo = 1;
                              }

                              if (
                                msj.usuario == id_usuario &&
                                msj.lectores != undefined &&
                                msj.lectores != 0 &&
                                msj.lectores != ""
                              ) {
                                msj_mensaje =
                                  msj_mensaje +
                                  '<span id="key-' +
                                  msjs.key +
                                  '"><i class="verlectores fa fa-check d-block m-0 p-0 text-right text-primary" aria-hidden="true" style="font-size: 0.7rem;cursor:pointer" data-container="#chats" rel="tooltip" title="Mensaje le&iacute;do" data-toggle="modal" data-target="#msjs-lectores" key="' +
                                  msjs.key +
                                  '" ent="' +
                                  msj.marca_de_tiempo +
                                  '" ></i><span>';
                              } else {
                                msj_mensaje =
                                  msj_mensaje +
                                  '<span id="key-' +
                                  msjs.key +
                                  '"></span>';
                              }

                              if (f == 1) {
                                var lado = $("#ordenchat").val();
                              }

                              if (lado == "izq") {
                                msjchathtml +=
                                  '<div class="chat-msj d-flex justify-content-start mb-4" lado="izq" usuario="' +
                                  msj.usuario +
                                  '" style="' +
                                  msjeliminado +
                                  '"><a href="#" id="' +
                                  msjs.key +
                                  '"' +
                                  noleido +
                                  '></a><div class="img_cont_msg"><img data-container="#chats" rel="tooltip" title="' +
                                  nombre +
                                  '" src="' +
                                  foto +
                                  '" style="min-width: 33px;" class="fotschat rounded-circle user_img_msg fotomsj-' +
                                  msj.usuario +
                                  '" /></div><div style="background-color:' +
                                  colores[nle] +
                                  ";white-space: normal;word-wrap: break-word;min-width: 110px;" +
                                  msjeliminado +
                                  '" class="msj_opcs msg_cotainer">' +
                                  respuestahtml +
                                  msj_mensaje +
                                  '<br /><span class="msg_time" style="word-wrap: nowrap;">Hace ' +
                                  hacetiempo[0] +
                                  elm +
                                  '</span></div>'+responder_chat+'</div>';
                              } else {
                                msjchathtml +=
                                  '<div class="chat-msj d-flex justify-content-end mb-4" lado="der" usuario="' +
                                  msj.usuario +
                                  '" style="' +
                                  msjeliminado +
                                  '"><a href="#" id="' +
                                  msjs.key +
                                  '"' +
                                  noleido +
                                  '></a>'+responder_chat+'<div style="background-color:' +
                                  colores[nle] +
                                  ";white-space: normal;word-wrap: break-word;min-width: 110px;" +
                                  msjeliminado +
                                  '" class="msj_opcs msg_cotainer_send">' +
                                  respuestahtml +
                                  msj_mensaje +
                                  '<br /><span class="msg_time_send" style="word-wrap: nowrap;">Hace ' +
                                  hacetiempo[0] +
                                  elm +
                                  '</span></div><div class="img_cont_msg"><img rel="tooltip" title="' +
                                  nombre +
                                  '" src="' +
                                  foto +
                                  '" style="min-width: 33px;" class="fotschat rounded-circle user_img_msg fotomsj-' +
                                  msj.usuario +
                                  '"></div></div>';
                              }
                            }
                          }
                        }
                      }

                      return Array(msjchathtml, nuevo);
                    }

                    function MsjImg(msj){

                      msj = msj.replace(/(https?:\/\/\S+\.(jpg|png|gif))/, '<div class="imgamplia" rel="tooltip" title="Click para ampliar"><img src="$1" alt="Img Chat" /></div>');

                      return msj;
                    }

                    function YouTubeID(url) {
                      const regExp =
                        /^.*(youtube\.com\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                    
                      const match = url.match(regExp);
                    
                      if (match && match[2].length === 11) {
                        return match[2];
                      }

                    }

                    function MsjVid(msj){
     
                      msj = msj.replace('https://www.youtu.be','https://youtube.com');
                      msj = msj.replace('https://www.youtube.com','https://youtube.com');
                      msj = msj.replace('https://youtu.be','https://youtube.com');
             
                    if (msj.indexOf("https://youtube.com") > -1) {
                     
                      var ss = msj.split('https://youtube.com');

                      for (let i = 0; i < ss.length; i++) {
                        var ytext = 'https://youtube.com' + ss[i];
                        const yt = ytext.match(/\bhttps?:\/\/youtube\.com\S+/gi);
                        if(yt != null && yt[0].indexOf("https://youtube.com") > -1) {
                        var vyt = YouTubeID(yt[0]);
                        msj = msj.replace(yt[0], '<div class="vidamplia d-inline-block border m-1 border-secondary" vyt="'+vyt+'"><img src="https://img.youtube.com/vi/' + vyt + '/mqdefault.jpg" alt="Img Chat" /><span class="VerVideo" rel="tooltip" title="Click para ver"></span></div>');
                        }
                      }

                    }

                      return msj;
                    }

                    function MsjLink(msj, ne) {
                      var urlRegex = /([^src=\"])(https?:\/\/[^\s]+)/g;
                      return msj.replace(urlRegex, function(url) {
                        url = url.trim();

                        $.ajaxSetup({async:false});
                        const link = $.getJSON('https://link-previews.stephanbogner.de/api?url=http://web.escuelard.com/');
                        console.log(link);
                        if(link != undefined){
                        console.log(link);
                        if(ne > 0){
                          var cne = 'text-white ';
                        }else{

                          var cne = 'text-dark ';

                        }

                        var linkdata = ' <div class="img-link"><div class="rounded"><img class="rounded" src="'+link.image+'" alt="Img Chat" /><div style="font-size: 1rem" class="'+cne+'font-weight-bold mt-1">'+link.title+'</div><div style="font-size: 0.7rem" class="text-secondary mt-1">'+link.description+'</div><div style="font-size: 0.7rem;color: lightgray" class="mt-1">'+link.name+'</div></div><div style="font-size: 0.7rem" class="mt-1"><a href="' + url + '" target="_blank" class="text-primary font-weight-bold">' + url + '</a></div></div>';

                      }else{
                        var linkdata = ' <a href="' + url + '" target="_blank" class="text-primary font-weight-bold">' + url + '</a>';
                        
                      }

                          return linkdata;
                          
                      });
                  }

                    $(document).on("click", ".imgamplia", function () {
                      
                     FullScreen();

                     var img = $(this).html();
                     
                     $('#ImgVideoAmplia').html(img);
                     $('#ImgVideoAmplia').show();  
                    
                    })

                    $(document).on("click", ".VerVideo", function () {

                      FullScreen();

                      var vyt = $(this).parent().attr('vyt');

                      var iframe = '<iframe width="840" height="472" src="https://youtube.com/embed/'+vyt+'?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
                      
                      $('#ImgVideoAmplia').html(iframe);
                      $('#ImgVideoAmplia').show();
                     
                     })

                    $(document).on("click", "#ImgVideoAmplia", function () {

                      $(this).text('');
                      $(this).hide();
                        if(Number($(this).attr('full')) == 1){
                      SalirFullScreen();
                        }
                     })

                    function LaTeXtoMath(latex, color = "black") {
                      latex = latex.replace(
                        /\$\$(.*?)\$\$/gi,
                        "<math-field class='math-field' contenteditable='false' style='color: " +
                          color +
                          ";background-color:transparent;border:0;display: block;' default-mode='math' read-only>$1</math-field>"
                      );
                      latex = latex.replace(
                        /\$(.*?)\$/gi,
                        "<math-field class='math-field' contenteditable='false' style='color: " +
                          color +
                          ";background-color:transparent;border:0;display: inline-block;' default-mode='inline-math' read-only>$1</math-field>"
                      );
                      return latex;
                    }

                    $(document).on("click", "#boton_abajo i", function () {
                      if (
                        $("#aviso_nuevos").length > 0 &&
                        $("#aviso_nuevos").text() != ""
                      ) {
                        $("#aviso_nuevos").focus();
                      } else {
                        $("#focuschat").focus();
                      }
                      $("#chat_mensaje").focus();
                      setTimeout(function () {
                        MarcarLeido();
                      }, 1000);
                    });

                    $(document).on("mouseenter", ".msj_opcs", function () {
                      $(this).parent().find('.responder_chat').css({'visibility':'visible'});
                    })

                    $(document).on("mouseleave", ".msj_opcs", function () {
                      var ths = $(this);
                      setTimeout(function () {
                        ths.parent().find('.responder_chat').css({'visibility':'hidden'});
                      }, 1500);
                      
                    })

                     // $( selector ).on( "mouseenter", handlerIn ).on( "mouseleave", handlerOut );


                    $(document).on("click", ".responder_chat", function () {
                      var usuario = $(this).attr("usuario");
                      $("#usuario_respuesta").val(usuario);
                      var nombre_respuesta = $(".u-lector-" + usuario)
                        .find(".user_info span")
                        .html();
                      var key = $(this).attr("key");
                      $("#key_respuesta").val(key);
                      var color = $(this).attr("color");

                      var mensaje = $("#math" + key).text();

                      var sub = 100;

                      if (mensaje.indexOf("https://") > -1) {
                        var https = mensaje.split('https://')[1];
                        if (https.indexOf(".gif") > -1) {
                          sub = https.split('.gif')[0].length + sub;
                        }
                        if (https.indexOf(".png") > -1) {
                          sub = https.split('.png')[0].length + sub;
                        }
                        if (https.indexOf(".jpg") > -1) {
                          sub = https.split('.jpg')[0].length + sub;
                        }
                      }

                      if (mensaje.length > sub) {
                        mensaje = substringChat(mensaje, sub);
                      }

                      mensaje = mensaje.split("\n").join("<br />");

                      var msjhtml = $("#math" + key).html();

                      if (msjhtml.indexOf("<img") > -1) {

                      var img = $(msjhtml).find('img:first');

                      if(img != undefined){
                        mensaje = '<div class="row"><div class="col-3"><img src="' + img.attr('src') + '" alt="Img Chat" style="max-width: 100px" /></div><div class="col-9">' + mensaje + '</div></div>';
                      }
                      
                      }

                      $("#respondiendo_chat").html(
                        '<strong class="d-block float-left" style="color:' +
                          color +
                          '">' +
                          nombre_respuesta +
                          ':</strong><div id="btnresp" class="fa fa-times float-right"></div><div class="clearfix"></div><div id="respuesta_chat">' + mensaje + '</div>'
                      );
                      $("#respondiendo_chat").css({
                        "border-left": "12px solid " + color,
                        "border-right": "12px solid " + color,
                      });
                      $("#respondiendo_chat").show();
                      $("#chat_mensaje").focus();
                    });

                    $(document).on("click", "#btnresp", function () {
                      $("#respondiendo_chat").hide();
                      $("#respuesta_chat").text("");
                    });

                    $(document).on("click", ".focus_msj_chat", function () {
                      var tfocus = $(this).attr("key_respuesta");
                      $("#" + tfocus).focus();

                      for (h = 0; h < 3; h++) {
                        $("#" + tfocus)
                          .parent()
                          .fadeTo("slow", 0.5)
                          .fadeTo("slow", 1.0);
                      }
                      $("#chat_mensaje").focus();
                    });

                    function substringChat(msj, sub) {
                      if (msj.indexOf("$$") < 0 && msj.indexOf("$") < 0) {
                        msj = msj.substring(0, sub);
                      } else {
                        if (msj.indexOf("$$") > -1) {
                          msj = substringMath2(msj);
                        } else if (msj.indexOf("$") > -1) {
                          msj = substringMath1(msj);
                        }
                      }

                      return msj;
                    }

                    function substringMath2(mensaje, sub) {
                      var msg = "";
                      msg = mensaje.split("$$");
                      var l = 0;
                      var ms = new Array();
                      for (i = 0; i < msg.length; i++) {
                        if (i % 2 == 0) {
                          l += Number(msg[i].length);
                        }

                        if (msg[i].indexOf("$") > -1) {
                          ms[i] = substringMath1(msg[i]);
                        } else {
                          ms[i] = msg[i];
                        }

                        if (l >= sub) {
                          break;
                        }
                      }

                      return ms.join("$$");
                    }

                    function substringMath1(mensaje, sub) {
                      var msg = "";
                      msg = mensaje.split("$");
                      var l = 0;
                      var ms = new Array();
                      for (i = 0; i < msg.length; i++) {
                        if (i % 2 == 0) {
                          l += Number(msg[i].length);
                        }

                        ms[i] = msg[i];

                        if (l >= sub) {
                          break;
                        }
                      }

                      return ms.join("$");
                    }

                    $(document).on("click", "#btn_salir", function () {

                      UltimaConexion.set(firebase.database.ServerValue.TIMESTAMP);
                      conectado.set(0);

                      SalirFullScreen();
                      $("#btnchat").remove();

                      firebase.auth().signOut().then(() => {});
                      
                        $("#ventanachat").hide("slow");
                        $("#ventanachat").remove();
                        $("body").removeClass("modal-open");
                        
                    });
                   
                  }
                }

                

              });
            }

            setTimeout(function () {
              $("math-field").menuItems = [];
              $(".math-field").menuItems = [];
              menuItems = [];
              $(".ML__context-menu").css({ display: "none" });
              $(".ML__context-menu").hide();
            });
          });

          
        }else{
          
          $("#btnchat").remove();
            $("#ventanachat").hide("slow");
            $("#ventanachat").remove();
            $("body").removeClass("modal-open");

        }
        
      });
    })
    .catch((error) => {
      if (error.code == "auth/user-not-found" || error.code == "auth/internal-error") {
        firebase
          .auth()
          .createUserWithEmailAndPassword(correo_sesion, clave_sesion)
          .then(() => {})
          .catch((error) => {});
      }
    });

});
