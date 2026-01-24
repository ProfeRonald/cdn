
var id_sesion = $("#datos_js").attr("id_sesion");
var local = $("#datos_js").attr("local");
var year_1 = $("#datos_js").attr("year_1");
var year_2 = $("#datos_js").attr("year_2");
var urlerd = $("#datos_js").attr("urlerd");
var escuela_sesion = $("#datos_js").attr("data-escuela_sesion");
var quien = $("#datos_js").attr("quien");
var id_sesion = $("#datos_js").attr("id_sesion");

$(document).ready(function () {

        if($('#tbody-grupos').length > 0){

        var tgrados = {};
        var testudiantes = new Array();
        $("#gruposc .ordenGrupo").each(function(){
          if(tgrados[$(this).attr('grado')] == undefined){
            tgrados[$(this).attr('grado')] = 0;
          }
          if(testudiantes[$(this).attr('grado')] == undefined){
            testudiantes[$(this).attr('grado')] = 0;
          }
          tgrados[$(this).attr('grado')] += 1;
          testudiantes[$(this).attr('grado')] += Number($(this).attr('estudiantes'));
        });

      var trhtml = '';
      
      $.each(tgrados, function (grado, cantidad) {
        trhtml += '<tr><td class="text-center">'+grado+'</td><td class="text-center">'+cantidad+'</td><td class="text-center">'+testudiantes[grado]+'</td></tr>';
      });

      $('#tbody-grupos').html(trhtml);

     firebase.database().ref('escuela_' + escuela_sesion + '/grupos/' + year_1 + '-' + year_2 + '/' + quien + '_' + id_sesion).on("value", (profe) => {
      
      $('.count2').removeClass('count');

      if(profe.val() != undefined && profe.val() != null){

      $.each(profe.val().colores, function (idg, color) {
        $("#FotoGrupo_cambiar-" + idg).attr('color', color);
        $("#FotoGrupo_cambiar-" + idg).parent().parent().parent().parent().attr("style", "background: linear-gradient(90deg, #" + color + ", black);opacity:0.85");
        $("#FotoGrupo_cambiar-" + idg).parent().parent().parent().parent().parent().parent().attr("style", "background-color: #" + color);
      })

      $('#ordenarGrupoAZ').html('<i class="fa fa-sort-alpha-asc fa-2x p-1 border rounded mx-2 btn" rel="tooltip" title="Ordenar alfabeticamente de forma ascendente" aria-hidden="true"></i>');
      $('#ordenarGrupoAZ').attr('data-orden', 'az');

      $('#ordenarGrupoHorario').html('<i class="fa fa-clock-o fa-2x p-1 border rounded mx-2 btn" rel="tooltip" title="Ordenar seg&uacute;n tu horario de clases de forma ascendente" aria-hidden="true"></i><i class="fa fa-long-arrow-down" aria-hidden="true" style="margin-left: -9px"></i>');
      $('#ordenarGrupoHorario').attr('data-orden', 'horarioaz');
      
      const orden = profe.val().orden;

      if(orden == 'za' || orden == 'az' || orden == 'horarioaz' || orden == 'horarioza'){
      
      $('#ordenarGrupoAZ i').tooltip('dispose');
      $('#ordenarGrupoHorario i').tooltip('dispose');
      
      if(orden == 'za' || orden == 'az'){
        var ordGrp = new Array();
        var valGrp = new Array();
        var d = 0;
      $("#gruposc .ordenGrupo").each(function(){
        ordGrp[d] = $(this).attr('data-orden');
        valGrp[ordGrp[d]] = $(this).prop('outerHTML');
        d++;
      });
       
      ordGrp.sort();

      if(orden == 'za'){
        ordGrp.reverse();
        $('#ordenarGrupoAZ').html('<i class="fa fa-sort-alpha-desc fa-2x p-1 border rounded mx-2 btn btn-dark text-white" rel="tooltip" title="Ordenar alfabeticamente de forma ascendente" aria-hidden="true"></i>');
        $('#ordenarGrupoAZ').attr('data-orden', 'az');
      }else{
        $('#ordenarGrupoAZ').html('<i class="fa fa-sort-alpha-asc fa-2x p-1 border rounded mx-2 btn btn-dark text-white" rel="tooltip" title="Ordenar alfabeticamente de forma descendente" aria-hidden="true"></i>');
        $('#ordenarGrupoAZ').attr('data-orden', 'za');
      }
  
  }

(async () => {
  
  const thor = Number($('#ordenarGrupoHorario').attr('data-hor'));
  
  let hor;

  if(thor > 0){
    hor = thor;
  }else{
    hor = await obtenerHorarios();
    $('#ordenarGrupoHorario').attr('data-hor', hor);
  }
  
  if(hor > 0){

    if(orden == 'horarioaz' || orden == 'horarioza'){

        
    var ordGrp = new Array();
        var valGrp = new Array();
        var d = 0;
      $("#gruposc .ordenGrupo").each(function(){
        if($(this).attr('data-horario') != undefined){
          ordGrp[d] = $(this).attr('data-horario');
        }else{
          ordGrp[d] = d + 17;
        }
        valGrp[ordGrp[d]] = $(this).prop('outerHTML');
        d++;
      });

      ordGrp.sort();
        
      }

      
      $('#ordenarGrupoHorario').show();

      if(orden == 'horarioza'){
        ordGrp.reverse();
        $('#ordenarGrupoHorario').html('<i class="fa fa-clock-o fa-2x p-1 border rounded mx-2 btn btn-dark text-white" rel="tooltip" title="Ordenar seg&uacute;n tu horario de clases de forma ascendente" aria-hidden="true"></i><i class="fa fa-long-arrow-down" aria-hidden="true" style="margin-left: -9px"></i>');
        $('#ordenarGrupoHorario').attr('data-orden', 'horarioaz');
      }else if(orden == 'horarioaz'){
        $('#ordenarGrupoHorario').html('<i class="fa fa-clock-o fa-2x p-1 border rounded mx-2 btn btn-dark text-white" rel="tooltip" title="Ordenar seg&uacute;n tu horario de clases de forma descendente" aria-hidden="true"></i><i class="fa fa-long-arrow-up" aria-hidden="true" style="margin-left: -9px"></i>');
        $('#ordenarGrupoHorario').attr('data-orden', 'horarioza');
      }

        if(orden == 'horarioaz' || orden == 'horarioza'){

      var htmlGrp = '';
      $.each(ordGrp, function (i, o) {
        htmlGrp += valGrp[o];
      });

      $("#gruposc").html(htmlGrp);

        }

    }else{
      $('#ordenarGrupoHorario').hide();
    }

  })();

  }else{

 var valGrp = new Array();
 const ordMov = orden.split(',');
 var htmlGrp = '';
 ordMov.forEach(idg => {
  let outerHTML = $('#FotoGrupo_cambiar-' + idg).parent().parent().parent().parent().parent().parent().parent().prop('outerHTML');
    if(outerHTML != undefined){
  htmlGrp += outerHTML;
    }

 });
 
$("#gruposc").html(htmlGrp);
 
}

  if(ordGrp != undefined){

      var htmlGrp = '';
      $.each(ordGrp, function (i, o) {
        htmlGrp += valGrp[o];
      });

      $("#gruposc").html(htmlGrp);

  }

  }

  
  $('.count2').addClass('count');

   })


   if(local != 1){

    setTimeout(function () {
 
  var storageRef = firebase
    .storage()
    .ref('grupos/' + year_1 + "-" + year_2 + "/FondosGrupos/profe_" + id_sesion);
  storageRef
    .listAll()
    .then(function (result) {
      result.items.forEach(function (imageRef) {
        displayImage(imageRef);
      });
    })
    .catch(function (error) {});
  
  function displayImage(imageRef) {
    imageRef
      .getDownloadURL()
      .then(function (url) {
        
        var idg = imageRef.name.split(".jpg")[0].split("_")[1];
        if (idg > 0) { 
          if ($("#FotoGrupo_cambiar-" + idg).attr("v") == 1) {
            $("#FotoGrupo_cambiar-" + idg)
              .parent()
              .attr(
                "style",
                'background-image: url("' +
                  url +
                  '");background-position: bottom;background-repeat: no-repeat;background-size: 100% 100%;'
              );

            var scolor = $("#FotoGrupo_cambiar-" + idg).attr("color");
              $("#FotoGrupo_cambiar-" + idg).attr(
                "style",
                "background: linear-gradient(90deg, #" +
                  scolor +
                  ", black);opacity:0.85"
              );
             
          } else {
            $("#FotoGrupo_cambiar-" + idg)
              .parent()
              .parent()
              .parent()
              .parent()
              .parent()
              .parent()
              .attr(
                "style",
                'background-image: url("' +
                  url +
                  '");background-repeat: no-repeat;background-size: 100% 100%;'
              );

            var scolor = $("#FotoGrupo_cambiar-" + idg).attr("color");
  
              $(".imageGrupo" + idg).attr(
                "style",
                "background: linear-gradient(90deg, #" +
                  scolor +
                  ", black);opacity:0.85"
              );
            
          }
        }
      })
      .catch(function (error) {});
  }
        }, 1000);

}


  }


    $(document).on('click', '#ordenarGrupoAZ, #ordenarGrupoHorario', function () {

      const orden = $(this).attr('data-orden');

      firebase.database().ref('escuela_' + escuela_sesion + '/grupos/' + year_1 + '-' + year_2 + '/' + quien + '_' + id_sesion + '/orden').set(orden);
      

    })


        function horaATimestamp(horaStr) {
      const [tiempo, modificador] = horaStr.split(' ');
      let [horas, minutos] = tiempo.split(':');

      if (horas === '12') {
        horas = '00';
      }

      if (modificador === 'PM') {
        horas = parseInt(horas, 10) + 12;
      }

      // Creamos un objeto fecha con el día de hoy y la hora procesada
      const fecha = new Date();
      fecha.setHours(parseInt(horas, 10), parseInt(minutos, 10), 0, 0);

      return fecha.getTime();
    }

  async function obtenerHorarios() {
    
    let dayName = new Date().toLocaleDateString('es-ES', {weekday: 'long'});
    
    let hor = 0;

  const horarios = await ruletaweb.database()
    .ref('horarios/escuela_' + escuela_sesion + '/profesor_' + id_sesion + '/horario')
    .once('value');

     horarios.forEach(horario => {
        if(horario.val()[dayName] != undefined){
        var dataidg = $('.ordenGrupo[data-idg="' + horario.val()[dayName].link.split('&')[0] + '"]');
        if(dataidg.attr('data-horario') == '' || dataidg.attr('data-horario') == undefined){

         dataidg.attr('data-horario', horaATimestamp(horario.val().inicio));
         
         hor++;
        }
        }

      });

  return hor;
}


$(document).on("click", ".colorpicker", function () {
    if ($(this).text() == "" || $(this).html() == "&nbsp;") {
      $(".colorpicker").text("");
      $(this).html('<div id="picker"></div>');
      var g = $(this);
      var grupo = g.attr("g");
      var icolor = $("#FotoGrupo_cambiar-" + grupo).attr("color");
           
      var colorPicker = new iro.ColorPicker("#picker", {
        width: 180,
        color: icolor,
        display: "inline-block",
        //colors: "null",
        id: "picker",
        layout: [
          {
            component: iro.ui.Wheel,
            options: {
              borderColor: "#ffffff",
            },
          },
        ],
        layoutDirection: "vertical",
        padding: 0,
        margin: 0,
        borderWidth: 3,
        borderColor: "#ffffff",
        handleRadius: 12,
        //handleSvg: '#handle',
        //handleProps: { x: -4, y: -4 },
        //wheelLightness: true,
        //wheelAngle: 0,
        //wheelDirection: "clockwise", // anticlockwise or clockwise
        //sliderSize: undefined,
        // boxHeight: undefined
      });

      $(".IroWheel").css({
        "margin-left": "-85px",
        "margin-top": "-85px",
        "z-index": "9999",
      });

      colorPicker.on("color:change", function (color) {
        var scolor = color.hexString.split("#")[1];
        g.parent()
          .parent()
          .parent()
          .parent()
          .attr(
            "style",
            "background: linear-gradient(90deg, " +
              color.hexString +
              ", black);opacity:0.85"
          );

        $("#FotoGrupo_cambiar-" + grupo).attr("color", scolor);

        var bimg = $(".imageGrupo" + grupo).css("background-image");

        if (bimg == "none") {
          $(".imageGrupo" + grupo).attr(
            "style",
            "background-color: " + color.hexString
          );
        } else {
          g.parent()
            .parent()
            .parent()
            .parent()
            .attr(
              "style",
              "background-image: " +
                bimg +
                ";background-repeat: no-repeat;background-size: 100% 100%;"
            );
          $(".imageGrupo" + grupo).attr(
            "style",
            "background: linear-gradient(90deg, " +
              color.hexString +
              ", black);opacity:0.85"
          );
        }
      });

      $("body").click(function () {
        $(".colorpicker").text("");
      });

      colorPicker.on("input:end", function (color) {
        $(".colorpicker").text("");
        var scolor = color.hexString.split("#")[1];
        g.attr("color", scolor);
        var fondo = $(g)
          .css({ backgroundColor: "#059A4E", border: "2px solid #F36C02" })
          .show();
        setTimeout(function () {
          fondo.css({
            backgroundColor: "",
            color: "white",
            border: "1px solid white",
          });
        }, 2000);
        for (h = 0; h < 3; h++) {
          $(g).fadeTo("slow", 0.5).fadeTo("slow", 1.0);
        }
        
       if(local == 1){
        document.cookie = "ColorGrupo" + grupo + "_" + year_1 + "-" + year_2 + "_" + quien + "_" + id_sesion + "=" + scolor;
       }else{
       firebase.database().ref('escuela_' + escuela_sesion + '/grupos/' + year_1 + '-' + year_2 + '/' + quien + '_' + id_sesion + '/colores/' + grupo).set(scolor);
       }
      });
    } else {
      $(".colorpicker").text("");
    }
  });


  $(document).on('click', '.moverg', function () {
  $("#gruposc .moverclass").css({"transform": "scale(0.5)"});
  });
    $(document).on('dblclick', '.moverg', function () {
  $("#gruposc").css({"transform": "scale(1)"});
  });

  Sortable.create(gruposc, {
    animation: 150,
    //easing: "cubic-bezier(1, 0, 0, 1)",
    handle: ".moverg",
    dataIdAttr: 'data-idg',
    ghostClass: "gmover",
    delay: "0",
    chosenClass: "chosen",
    store: {
      set: function (sortable) {
      var ordg = sortable.toArray();
      firebase.database().ref('escuela_' + escuela_sesion + '/grupos/' + year_1 + '-' + year_2 + '/' + quien + '_' + id_sesion + '/orden').set(ordg.join(','));
      }
        },
  
  });

$(document).on("click", ".input_file_foto", function () {
  $('#datos_js').attr('data-idg', $(this).attr('data-idg'));
})

function imagenSubida(url, i=0, h=0) {
  var idg = $('#datos_js').attr('data-idg');
  $("#FotoGrupo_cambiar-" + idg)
    .parent()
    .parent()
    .parent()
    .parent()
    .parent()
    .parent()
    .attr(
      "style",
      'background-image: url("' +
        url +
        '");background-repeat: no-repeat;background-size: 100% 100%;'
    );
  $(".imageGrupo" + idg).attr(
    "style",
    "background: linear-gradient(90deg, #" +
      $("#FotoGrupo_cambiar-" + idg).attr("color") +
      ", black);opacity:0.85"
  );
}

$(document).on("mouseenter", ".eliminar_file_foto", function () {
 var grupo = $(this).attr('g');

   var bimg = $("#FotoGrupo_cambiar-" + grupo)
    .parent()
    .parent()
    .parent()
    .parent()
    .parent()
    .parent().css("background-image");
   
if(bimg !='' && bimg !='none'){

$('#eliminar_file_foto_icon_'+ grupo).attr('grupo', grupo);
$('#eliminar_file_foto_icon_'+ grupo).attr('bimg', bimg);
$('#eliminar_file_foto_icon_'+ grupo).css({'visibility':'visible'});

 setTimeout(function () {
  $('#eliminar_file_foto_icon_'+ grupo).removeAttr('grupo');
  $('#eliminar_file_foto_icon_'+ grupo).removeAttr('bimg');
  $('#eliminar_file_foto_icon_'+ grupo).css({'visibility':'hidden'});
}, 8000);
}
})

$(document).on("click", ".eliminar_file_foto_icon", function () {
  if(!confirm("¿Seguro de querer eliminar la imagen de fondo?")){
    return false;
  }
  var grupo = $(this).attr('grupo');
  var fondo = $("#FotoGrupo_cambiar-" + grupo)
  .parent()
  .parent()
  .parent()
  .parent()
  .parent()
  .parent();
var bimg = $(this).attr('bimg');
bimg = bimg.replace(/^url\(['"](.+)['"]\)/, '$1');
  if(local == 1){
    $.ajax({
      method: "POST",
      url: "up.php?op=EliminarFondoGrupo",
      data:{id_grupo: grupo}
      })
      .done(function(e){
      if(e == 1){
        alert('Archivo eliminado');
        fondo.css({"background-image":""});
      }else{
        alert('No se pudo eliminar el archivo');
      }
      })
  }else{
bimg = decodeURIComponent(bimg.replace('https://firebasestorage.googleapis.com/v0/b/imgs-escuelard.appspot.com/o/', '')).split('.jpg')[0] + '.jpg';
firebase.storage().ref().child(bimg).delete();
fondo.css({"background-image":""});    
  }
})


if(local != 1){

function SubirFotoPersonalLogoBanner(dataurl, cmini=0, imgtype='image/jpeg'){
  var idg = $('#datos_js').attr('data-idg');
  var urlfondo = $("#FotoGrupo_cambiar-" + idg).attr('ruta');
   $.ajax({
     method: "POST",
     url: "up.php?op=FondoGrupo",
     data: {
       dataurl: dataurl,
       id_grupo: idg,
       imgtype: imgtype
     }
   })
     .done(function (e) {
       if(e == 1){
         imagenSubida(urlfondo);
         $('#mensaje_uploading').html('<div class="text-success"> ¡El fondo se ha subido con éxito!</div>');
           setTimeout(function(){
           $('#mensaje_uploading').hide('slow');
           },5000);
 
       }else{
        $('#mensaje_uploading').html('<div class="text-danger">No se pudo cargar la imagen, intente de nuevo</div>');
       }
     })
 
   }

  }

  $(document).on("click", "#grupos-zoom-menos", function () {
    var porcentaje = $('#grupos-zoom-porciento');
    var porciento = Number(porcentaje.data('porcentaje')) - 10;
    if(porciento < 10){
      porciento = 10;
    }
    $('#gruposc').css({'zoom':'' + porciento / 100});
    porcentaje.data('porcentaje', porciento);
    porcentaje.text(porciento + '%');
  })


  $(document).on("click", "#grupos-zoom-mas", function () {
    var porcentaje = $('#grupos-zoom-porciento');
    var porciento = Number(porcentaje.data('porcentaje')) + 10;
    if(porciento > 100){
      porciento = 100;
    }
    $('#gruposc').css({'zoom':'' + porciento / 100});
    porcentaje.data('porcentaje', porciento);
    porcentaje.text(porciento + '%');
  })

  });