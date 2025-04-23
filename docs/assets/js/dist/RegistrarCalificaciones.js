
var id_sesion = $("#datos_js").attr("id_sesion");
var local = $("#datos_js").attr("local");
var year_1 = $("#datos_js").attr("year_1");
var year_2 = $("#datos_js").attr("year_2");
var urlerd = $("#datos_js").attr("urlerd");

$(document).ready(function () {

  $(document).on("click", ".colorpicker", function () {
    if ($(this).text() == "" || $(this).html() == "&nbsp;") {
      $(".colorpicker").text("");
      $(this).html('<div id="picker"></div>');
      var g = $(this);
      var grupo = g.attr("g");
      var icolor = $("#FotoGrupo_cambiar" + grupo).attr("color");
           
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

        $("#FotoGrupo_cambiar" + grupo).attr("color", scolor);

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
        var quien = $("#datos_js").attr("quien");
        var id_sesion = $("#datos_js").attr("id_sesion");
       if(local == 1){
        document.cookie = "ColorGrupo" + grupo + "_" + year_1 + "-" + year_2 + "_" + quien + "_" + id_sesion + "=" + scolor;
       }else{
       fetch('https://imgs-escuelard-default-rtdb.firebaseio.com/grupos/' + year_1 + '-' + year_2 + '/' + quien + '_' + id_sesion + '.json', {method: 'PATCH',body: JSON.stringify({[grupo]:scolor}),headers:{'Content-Type': 'application/json'}}); 
       }
      });
    } else {
      $(".colorpicker").text("");
    }
  });

  if(local != 1){

  var id_sesion = $("#datos_js").attr("id_sesion");
  var storageRef = firebase
    .storage()
    //.ref("profes/" + id_sesion + "/FotosGrupos");
    .ref(year_1 + "-" + year_2 + "/FondosGrupos/profe_" + id_sesion);
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
          if ($("#FotoGrupo_cambiar" + idg).attr("v") == 1) {
            $("#FotoGrupo_cambiar" + idg)
              .parent()
              .attr(
                "style",
                'background-image: url("' +
                  url +
                  '");background-position: bottom;background-repeat: no-repeat;background-size: 100% 100%;'
              );

            var scolor = $("#FotoGrupo_cambiar" + idg).attr("color");
              $("#FotoGrupo_cambiar" + idg).attr(
                "style",
                "background: linear-gradient(90deg, #" +
                  scolor +
                  ", black);opacity:0.85"
              );
             
          } else {
            $("#FotoGrupo_cambiar" + idg)
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

            var scolor = $("#FotoGrupo_cambiar" + idg).attr("color");
  
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

}

$(document).on('click', '.ordenarGrupo', function () {
  $('.ordenarGrupo').removeClass('bg-dark text-white');
  var orden = $(this).attr('orden');
  if(orden == 'za' || orden == 'az'){
  var ordGrp = new Array();
  var idGrp = new Array();
  var valGrp = new Array();
  var d = 0;
  $("#gruposc .ordenGrupo").each(function(){
  ordGrp[d] = $(this).attr('orden');
  idGrp[ordGrp[d]] = $(this).attr('idg');
  valGrp[ordGrp[d]] = $(this).prop('outerHTML');
  d++;
  });

  
  ordGrp.sort();
  if(orden == 'za'){
    ordGrp.reverse();
  }
  
  var htmlGrp = '';
  var ordg = '';
  $.each(ordGrp, function (i, o) {
    ordg += idGrp[o] + ',';
    htmlGrp += valGrp[o];
  });

  ordg = ordg.substring(0, ordg.length - 1);
  
  document.cookie = 'ordenGrupoaz=; expires=Thu, 01 Jan 1970 00:00:01 GMT';
  document.cookie = 'ordenGrupoza=; expires=Thu, 01 Jan 1970 00:00:01 GMT';
  document.cookie = 'ordenGrupoHO=; expires=Thu, 01 Jan 1970 00:00:01 GMT';
  document.cookie = 'ordenGrupo'+orden+'='+ordg+'; expires=Thu, 22 Dec ' + jyear2 + ' 01:00:00 UTC';
  document.cookie = 'ordenGrupo='+ordg+'; expires=Thu, 22 Dec ' + jyear2 + ' 01:00:00 UTC';
  $("#gruposc").html(htmlGrp);

  $(this).addClass('bg-dark text-white');
  
  }
  
  if(orden == 'hor'){

    var ordg = $(this).attr('ordg');
    document.cookie = 'ordenGrupoaz=; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.cookie = 'ordenGrupoza=; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.cookie = 'ordenGrupoHO=1; expires=Thu, 22 Dec ' + jyear2 + ' 01:00:00 UTC';
    let dayName = new Date().toLocaleDateString('en-US', {weekday: 'short'});
    document.cookie = 'ordenGrupoHO' + dayName + '='+ordg+'; expires=Thu, 22 Dec ' + jyear2 + ' 01:00:00 UTC';
    document.cookie = 'ordenGrupo='+ordg+'; expires=Thu, 22 Dec ' + jyear2 + ' 01:00:00 UTC';
    window.location.href = urlerd + "/index.php?op=RegistrarCalificaciones";

  }

  

  });

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

});

var fecha = new Date();
var jyear2 = fecha.getFullYear() + 1;

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
    dataIdAttr: 'idg',
    ghostClass: "gmover",
    delay: "0",
    chosenClass: "chosen",
    store: {
      set: function (sortable) {
      var ordg = sortable.toArray();
      document.cookie = 'ordenGrupoaz=; expires=Thu, 01 Jan 1970 00:00:01 GMT';
      document.cookie = 'ordenGrupoza=; expires=Thu, 01 Jan 1970 00:00:01 GMT';
      document.cookie = 'ordenGrupoHO=; expires=Thu, 01 Jan 1970 00:00:01 GMT';
      document.cookie = 'ordenGrupo='+ordg+'; expires=Thu, 22 Dec ' + jyear2 + ' 01:00:00 UTC';
      }
        },
  
  });

$(document).on("click", ".input_file_foto", function () {
  $('#datos_js').attr('idg', $(this).attr('idg'));
})

function imagenSubida(url, i=0, h=0) {
  var idg = $('#datos_js').attr('idg');
  $("#FotoGrupo_cambiar" + idg)
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
      $("#FotoGrupo_cambiar" + idg).attr("color") +
      ", black);opacity:0.85"
  );
}

$(document).on("mouseenter", ".eliminar_file_foto", function () {
 var grupo = $(this).attr('g');

   var bimg = $("#FotoGrupo_cambiar" + grupo)
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
  var fondo = $("#FotoGrupo_cambiar" + grupo)
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
bimg = decodeURIComponent(bimg.replace('https://firebasestorage.googleapis.com/v0/b/cdn-escuelard.appspot.com/o/', '')).split('.jpg')[0] + '.jpg';
firebase.storage().ref().child(bimg).delete();
fondo.css({"background-image":""});    
  }
})


if(local != 1){

function SubirFotoPersonalLogoBanner(dataurl, cmini=0, imgtype='image/jpeg'){
  var idg = $('#datos_js').attr('idg');
  var urlfondo = $("#FotoGrupo_cambiar" + idg).attr('ruta');
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