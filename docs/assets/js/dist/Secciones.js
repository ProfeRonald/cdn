$(document).ready(function () {

    var filescdn = $("#datos_js").attr("filescdn");
    var target = $("#datos_js").attr("target");
    var urlerd = $("#datos_js").attr("urlerd");
    var urlimgs = $("#datos_js").attr("urlimgs");
    var movilagent = $("#datos_js").attr("movilagent");
    var imagenes_local = $("#datos_js").attr("imagenes_local");
   
  
  var idlp = Number(document.cookie.replace(
      /(?:(?:^|.*;\s*)idples\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    ));
    
    if (idlp.length < 1) {
      var idlp = 7;
    }
  
    var var_buscar = $("#datos_js").attr("e");
  
    var tableg = $('#TablaGrupos').DataTable({
      "columnDefs": [{
        "targets": 'no-sort',
        "orderable": false,
      }],
      "oSearch": {"sSearch": var_buscar},
      "order": [[1, "asc"]],
      "language": {
        url: filescdn + "/assets/js/lib/data-table/spanish.json",
      },
      "lengthMenu": [[5, 7, 10, 20, 25, 50, -1], [5, 7, 10, 20, 25, 50, "Todos"]],
      "iDisplayLength": idlp,
    });
  
    $(document).on(
      "blur",
      "#TablaGrupos_wrapper select:first",
      function () {
        var idpl = $(this).val();
        document.cookie = "idples=" + idpl;
      }
    );
  
  
  
  $(window).on("load", function () {
    $('#esccol').trigger("click");
  });
  
  
  $(document).on('click', '#esccol', function () {
    $('.escondercol').hide();
    $('#TablaGrupos th').css({ 'height': '40px' });
  });
  
  
  $(document).on('click', '.page-link', function () {
    $('#esccol').trigger("click");
  });
  
  
  $('#Tabla-Asignaturas').DataTable({
    orderCellsTop: true,
    fixedHeader: true,
    "columnDefs": [{
      "targets": 'no-sort',
      "orderable": false,
    }],
    "responsive": true,
    "scrollX": false,
    "scrollY": 300,
    "bAutoWidth": false,
    "searching": false,
    "bLengthChange": false,
    "bInfo": false,
    "bFilter": false,
    "paging": false,
    "iDisplayLength": -1,
    "autoWidth": false,
    "fixedColumns": true
  });

  setTimeout(function() {
    $('#Tabla-Asignaturas').DataTable().columns.adjust();
}, 500);
  
  var basec = false;
  
  $(document).on('click', '#asec', function () {
    if (basec == false) {
      var noresize = $('#TablaGrupos').parents('.dataTables_wrapper').clone(true, true);
      $("#TablaGrupos").css({ display: 'none' });
      $("#tablagrupo").css("width", "0px");
      $("#tablagrupo").css("height", "0px");
      $("select[name=TablaGrupos_length]").val("-1");
      $("select[name=TablaGrupos_length]").change();
      $("#tablagrupo").css({ visibility: 'hidden' });
      $("#cargandos").css({ display: 'inline' });
      basec = true;
      noresize.appendTo('#cargandos');
      $("#asec").prop('disabled', true);
      $("#asec").text('Actualizando sección');
      $("#faescolar").submit();
    }
  });
  
  jQuery(document).ready(function () {
    jQuery(".standardSelect").chosen({
      disable_search_threshold: 10,
      no_results_text: "Elija una opcion!",
      width: "100%"
    });
  });

  
    $(document).on('click change', '#cambiar_gr', function () {
    $(".cambiar_ops").toggle("slow");
  });
  
  $(document).on('change', '#cambiargrupo_inscrito', function () {
    var y1 = $("option:selected", this).attr('y1');
    var y2 = $("option:selected", this).attr('y2');
    $('#y1_sel').val(y1);
    $('#y2_sel').val(y2);
  });
  
  
  $(document).on('change', '.noactest', function () {
    var ide = $(this).attr('ide');
    $('#CuadroEst').attr('ide', ide);
    if ($(this).prop("checked") == false) {
      $('#retirado_e' + ide).val('1');
      $('#coelest').attr('id', 'guardarae');
      $('#CuadroEst').modal('show');
      $('#guardarae').show();
      $("#CuadroEstLabel").text("Retirando estudiante");
      var foto = $(this).attr('img');
      var foto = $('#' + foto).attr('src');
      var nom = $(this).attr('nom');
      var num = $(this).attr('num');
      var g = $(this).attr('grupo');
      var fecha = $(this).attr('fecha');
      var raz = $('#raz' + ide).val();
      $('#eliminarest').html('<div class="modal-body"><div><a href="' + urlerd + '/index.php?op=VerEstudiante&id=' + ide + '&grupo=' + g + '"' + target + '><img style="border-radius: 10%;width:70px;height:70px;" src="' + foto + '"/><span> ' + nom + ', #' + num + '</span></a></div></div><div id="cargar_razon"><div class="row form-group text-center ml-2"><label for="fecha_estudiante" class="form-control-label">Fecha de retito:</label><input type="date" value="' + fecha + '" name="fecha_estudiante" id="fecha_estudiante" class="form-control" /></input></div><div class="row form-group text-center ml-2"><label for="razon_estudiante" class="form-control-label">Raz&oacute;n o motivo</label><textarea style="width:250px" name="razon_estudiante" id="razon_estudiante" rows="4" placeholder="Describa el motivo por el cual quedar&aacute; retirado el estudiante" class="form-control">' + raz + '</textarea></div></div>');
      $('#guardarae').attr('est', ide);
      $('#guardarae').attr('g', g);
    } else {
      $('#retirado_e' + ide).val('0');
      $('#guardarae').attr('id', 'coelest');
      $('#CuadroEst').modal('hide');
      $('#coelest').hide();
      $("#CuadroEstLabel").text("");
      $('#coelest').removeAttr('est');
      $('#coelest').removeAttr('g');
    }
  });
  
  $('#CuadroEst').on('hidden.bs.modal', function () {
    var ide = $(this).attr('ide');
    $('#activo_e' + ide).prop('checked', true);
    $('#retirado_e' + ide).val('0');
  })
  
  $(document).on('click', '#guardarae', function () {
    $('#CuadroEst').removeAttr('ide');
    var est = $(this).attr('est');
    var g = $(this).attr('g');
    var re = $('#razon_estudiante').val();
    var fe = $('#fecha_estudiante').val();
    $.ajax({
      method: "POST",
      url: "sesion.php?op=NoActEst",
      data: {
        op: "NoActEst",
        sec: "NoActEst",
        id: est,
        grupo: g,
        re: re,
        fe: fe
      }

    })
      .done(function (u) {
        
        $('#cargar_razon').html('<div style="text-align:center;font-size:20pt"><i class="fa fa-refresh rotar" aria-hidden="true"></i></div>');
        if (u == 1) {
          $('#raz' + est).val(re);
          $('#activo_e' + est).attr('fecha', fe);
          var fondo = $("#eliminarest img").css({ border: '1px solid #2ECC71' }).show();
          setTimeout(function () {
            fondo.css({ border: '1px solid black' });
            $('#guardarae').hide();
            $('#eliminarest .fa-refresh').html('<span style="font-size:10pt;color:#218c74;font-weight:bold;"> &iexcl;GUARDADO!</span>');
            $('#eliminarest .fa-refresh').removeAttr('class');
            $('#eliminarest i').attr('class', 'fa fa-check');
            $('#eliminarest i').attr('style', 'font-size:10pt');
          }, 2000);
          setTimeout(function () {
            $('#cerrarde').trigger("click");
          }, 3000);
        } else {
          var fondo = $("#eliminarest img").css({ backgroundColor: '#cc8e35', border: '2px solid #F36C02' }).show()
          setTimeout(function () {
            $('#guardarae').hide();
            $('#eliminarest .fa-refresh').html('<span class="text-danger" style="font-size:10pt;font-weight:bold;"> &iexcl;NO SE PUDO DESACTIVAR!</span>');
            $('#eliminarest .fa-refresh').removeAttr('class');
            $('#eliminarest i').attr('class', 'fa fa-ban');
            $('#eliminarest i').attr('style', 'font-size:10pt');
          }, 2000);
          setTimeout(function () {
            fondo.css({ backgroundColor: '', border: '' });
  
          }, 3000);
          for (h = 0; h < 4; h++) {
            $("#eliminarest").fadeTo('slow', 0.5).fadeTo('slow', 1.0);
          }
        }
  
      })
  
  });
  // 
  
  $(document).on('click', '.foto-estudiante', function () {
    var foto = $(this).attr('src');
    var nom = $(this).attr('alt');
    var num = $(this).attr('num');
    var ide = $(this).attr('ide');
    $('#cerrarfoto').attr('ide', ide);
    $('#tomar_cam_mini').hide();
    var ruta = 'imagenes/fotos/estudiantes/foto_'+ide+'.jpg';
    $('#foto-est').html('<div class="modal-body text-center"><div class="font-weight-bold text-center mb-1 display-5">'+nom+', #'+num+'</div><div class="row text-center"><div class="text-center col p-0 m-0"><div id="cam_mini" class="p-0 m-0 ml-5" style="width:240px;height:240px;"></div><div id="tomar_cam_mini" class="btn btn-sm btn-info" style="display:none"><i class="fa fa-camera"></i> Tomar foto</div></div><div class="col"><div class="subirfoto"><div id="cam-fotoest" rel="tooltip" title="Tome una foto con su c&aacute;mara" class="bg-white rounded-circle py-1 px-1" style="position:absolute;top:-1px;right:25px;z-index:1;cursor:pointer"><i class="fa fa-camera fa-2x" aria-hidden="true"></i></i></div><div class="seleccionarfoto"><input type="file" id="foto_cambiar" name="foto_estudiante" class="input_file_foto" xwidth="240" xheight="240" ide="'+ide+'" ruta="imagenes/fotos/estudiantes/foto_'+ide+'.jpg" mime_type_img="image/jpeg" accept=".jpg" /><label id="pen-fotoest-label" for="foto_cambiar" rel="tooltip" title="Seleccione una foto"></label><div id="pen-fotoest" rel="tooltip" title="Seleccione una foto" class="bg-white rounded-circle py-1 px-1" style="position:absolute;top:-10px;left:-10px;cursor:pointer"><i class="fa fa-pencil fa-2x" aria-hidden="true"></i></div></div><div class="verfoto" style="width:240px;height:240px;"><div id="foto_mini" sqlq="0" idq="" style="width:230px;height:230px;background-image: url('+foto+');"></div><canvas id="foto_canvas_original" style="display:none"></canvas><canvas id="foto_canvas_mini" style="display:none"></canvas></div></div><div id="barra_upload"></div></div></div><div id="mensaje_uploading" class="font-weight-bold text-center"></div></div>');
  
    $(document).on('click', '#cam-fotoest', function () {
      if( movilagent == 1){
     
        $('#foto_cambiar').trigger('click');
        
      }else{
        $('#tomar_cam_mini').show();
        $('#cam_mini').show();
    
    Webcam.set({
      width: 240,
      height: 240,
      image_format: 'jpeg',
      jpeg_quality: 100
    });
    
    Webcam.attach( '#cam_mini' );
      
    }

    });
  
  $(document).on('click', '#tomar_cam_mini', function () {
      Webcam.snap( function(dataurl) {
        
        if(imagenes_local == 1){
            SubirFotoEstLocal(ruta, dataurl, ide, urlimgs, 1);
           }else{
            SubirFotoEstFB(dataurl, ide);
           }
          
      });
  
      setTimeout(function () {
      
      //Webcam.reset();
     // Webcam.attach( '#cam_mini' );
     // Webcam.freeze();
     // Webcam.unfreeze();
      $('#tomar_cam_mini').show();
      
      }, 1000);
  
      $('#tomar_cam_mini').hide();
  
    });
  
  });
  
  $(document).on('click', '#pen-fotoest', function () {
    $('#pen-fotoest-label').trigger('click');
  });
  
    $(document).on('change', '#foto_cambiar', function () {
      
      $('#tomar_cam_mini').hide();
      $('#cam_mini').hide();
      $('#cam_mini').text('');
  
    if (this.files && this.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#foto_mini').css('background-image', 'url(' + e.target.result + ')');
        $('#foto_mini').hide();
        $('#foto_mini').fadeIn(650);
      };
      reader.readAsDataURL(this.files[0]);
    }
  
    $('#barra_upload').show('slow');
    $('#mensaje_uploading').show('slow');
    var xwidth = $(this).attr('xwidth');
        var xheight = $(this).attr('xheight');
        var ruta = $(this).attr('ruta');
        var ide = $(this).attr('ide');
        var mime_type_img = $(this).attr('mime_type_img');
  
        $('#mensaje_uploading').html('<span class="text-info">Cargando foto. Espere...</span>');
  
     var file = this.files[0];
     
        (function() {
        if(window.performance && window.performance.now) return;
        if(!window.performance) window.performance = {};
        var methods = ['webkitNow', 'msNow', 'mozNow'];
        for(var i = 0; i < methods.length; i++) {
        if(window.performance[methods[i]]) {
          window.performance.now = window.performance[methods[i]];
          return;
        }
        }
        if(Date.now) {
        window.performance.now = function() { return Date.now(); };
        return;
        }
        window.performance.now = function() { return +(new Date()); };
        })();
        
        window.pica.prototype.debug = console.log.bind(console);
        
        var resizer;
        
        var resizer_mode = {
        js:   true,
        wasm: true,
        cib:  true,
        ww:   true
        };
        
        function create_resizer() {
        var opts = [];
        
        Object.keys(resizer_mode).forEach(function (k) {
          if (resizer_mode[k]) opts.push(k);
        });
        
        resizer = window.pica({ features: opts });
        }
        
        function canvaFotoEst() {
        var src, ctx;
        
        src = $('#foto_canvas_original')[0];
        src.width = img.width;
        src.height = img.height;
  
        ctx = src.getContext("2d");
        ctx.drawImage(img, 0, 0);
        }
        
        var RedimensionarFotoEst = _.debounce(function () {
        var dst, ctx, width;
         
        dst = $('#foto_canvas_mini')[0];
        dst.width = xwidth;
        dst.height = xheight;
        var offScreenCanvas = document.createElement('canvas')
        offScreenCanvas.width  = dst.width;
        offScreenCanvas.height = dst.height;
        
        resizer.resize($('#foto_canvas_original')[0], offScreenCanvas, {
          quality: quality,
          alpha: alpha,
          unsharpAmount: unsharpAmount,
          unsharpRadius: unsharpRadius,
          unsharpThreshold: unsharpThreshold,
          transferable: true
        })
        .then(function () {
        
         dst.getContext('2d', { alpha: Boolean(alpha) }).drawImage(offScreenCanvas, 0, 0);
                     
         var dataurl = offScreenCanvas.toDataURL(mime_type_img, 1.0);

         if(imagenes_local == 1){
         SubirFotoEstLocal(ruta, dataurl, ide, urlimgs);
        }else{
         SubirFotoEstFB(dataurl, ide);
        }
          
        }) 	
        
        }, 100);
        
        
        var img = new Image();
        
        var quality           = 3;
        var unsharpAmount     = 80;
        var unsharpRadius     = 0.6;
        var unsharpThreshold  = 2;
        var alpha             = true;
        
        resizer_mode.ww   = true;
        resizer_mode.cib  = false;
        resizer_mode.wasm = true;
        
        create_resizer();
        
      var files = $(this)[0].files;
      
      img.src = window.URL.createObjectURL(files[0]);
      img.onload = function () {
      canvaFotoEst();
      RedimensionarFotoEst();
      };
  
    });
  
  function SubirFotoEstLocal(ruta, dataurl, ide, urlimgs, cam=0){
    var idest = $('#cerrarfoto').attr('ide');
    if(ide == idest){
    $.ajax({
      method: "POST",
      url: "up.php?op=FotoEst",
      data: {
        ruta: ruta,
        dataurl: dataurl,
        ide: ide,
        cam: cam
      }
    })
      .done(function (e) {
       
        if(e == 1){
        $('#mensaje_uploading').html('<span class="text-primary">&iexcl;Foto cargada!</span>');
        var srcfoto = urlimgs + '/fotos/estudiantes/foto_' + ide + '.jpg?v=' + `${new Date().getTime()}`;
        $('#img'+ide).attr('src', srcfoto);
        $('#foto_mini').css('background-image', 'url(' + srcfoto + ')');
        setTimeout(function () {
        //  $('#cerrarde').trigger("click");
        $('#mensaje_uploading').text('');
        }, 5000);
        }else{
          $('#mensaje_uploading').html('<span class="text-danger">Error al cargar, intente de nuevo</span>');   
        }
      })
  
    }
  
    }
    
  $(document).on('click', '#cerrea', function () {
  
    $('#cerrarde').trigger("click");
  
  })
  
  $(document).on('click', '#cerrarde', function () {
  
   $('#coelest').show();
  
  })

function SubirFotoEstFB(dataurl, ide){

  var subirimagen = firebase.storage().ref().child('fotos/estudiantes/foto_' + ide + '.jpg').putString(dataurl, 'data_url');
				 
  subirimagen.on(firebase.storage.TaskEvent.STATE_CHANGED,
function(snapshot) {

  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  var progress = Math.round(progress);
  $('#barra_upload').html('<div class="progress-bar rounded progress-bar-striped d-block bg-info progress-bar-animated" role="progressbar" style="width: ' + progress + '%;font-weight:bold;font-size:15pt" aria-valuenow="' + progress + '" aria-valuemin="0" aria-valuemax="100">' + progress + '%</div>');
  switch (snapshot.state) {
    case firebase.storage.TaskState.PAUSED:
      console.log('Pausar subida');
      break;
    case firebase.storage.TaskState.RUNNING:
      $('#mensaje_uploading').html('<div class="text-info"><i class="fa fa-refresh rotar"></i> Subiendo imagen...</div>');
      break;
  }
}, function(error) {

switch (error.code) {
  case 'storage/unauthorized':
       $('#mensaje_uploading').html('<div class="text-danger">No se pudo cargar la imagen, intente de nuevo</div>');
    break;
  case 'storage/canceled':
    $('#mensaje_uploading').html('<div class="text-danger">No se pudo cargar la imagen, intente de nuevo</div>');
    break;

  case 'storage/unknown':
    $('#mensaje_uploading').html('<div class="text-danger">No se pudo cargar la imagen, intente de nuevo</div>');
    break;
}
}, function() {

subirimagen.snapshot.ref.getDownloadURL().then(function(urlFoto) {
    
    var idest = $('#cerrarfoto').attr('ide');
    if(ide == idest){
    $.ajax({
      method: "POST",
      url: "up.php?op=ActualizarFoto",
      data:{urlfoto: urlFoto, sqlq: 4, idq:  ide}
    })
      .done(function (e) {
        if(e == 1){
        $('#img'+ide).attr('src', urlFoto);
        $('#foto_mini').css('background-image', 'url(' + urlFoto + ')');
        $('#mensaje_uploading').html('<div class="text-success"> ¡La imagen se ha subido con éxito!</div>');
        setTimeout(function(){
          $('#barra_upload').hide('slow');
          $('#mensaje_uploading').hide('slow');
          },5000);
        }else{
          $('#mensaje_uploading').html('<span class="text-danger">Error al cargar, intente de nuevo</span>');   
        }
      })
  
    }

    

});

});
}
  
  $(document).on('click', '.elimest', function () {
  
    $('#guardarae').attr('id', 'coelest');
    var foto = $(this).attr('img');
    var foto = $('#' + foto).attr('src');
    var nom = $(this).attr('nom');
    var num = $(this).attr('num');
    var ide = $(this).attr('ide');
    var g = $(this).attr('grupo');
    $("#CuadroEstLabel").text("Eliminando estudiante");
    $('#eliminarest').html('<div class="modal-body"><div><a href="' + urlerd + '/index.php?op=VerEstudiante&id=' + ide + '&grupo=' + g + '"' + target + '><img style="border-radius: 10%;width:70px;height:70px;" src="' + foto + '"/><span> ' + nom + ', #' + num + '</span></a></div></div><div style="font-size:10pt;padding-bottom:20px">&iquest;Seguro desea eliminar este estudiante?</div>');
    $('#coelest').attr('est', ide);
    $('#coelest').attr('g', g);
  
  });
  
  $(document).on('click', '#coelest', function () {
    var e = $(this).attr('est');
    var g = $(this).attr('g');
    $.ajax({
      method: "POST",
      url: "sesion.php?op=EliminarEst",
      data: {
        op: "EliminarEst",
        sec: "EliminarEst",
        id: e,
        grupo: g
      }
    })
      .done(function (elesth) {
        var elesth = JSON.parse(elesth);
        if (elesth['e'] == 1) {
          $('#tr' + e).hide();
          setTimeout(function () {
            $('#cerrarde').trigger('click');
          }, 3000);
        } else {
          var fondo = $('#tr' + e).css({ backgroundColor: '#cc8e35', border: '2px solid #F36C02' }).show()
          setTimeout(function () {
            fondo.css({ backgroundColor: '', border: '' });
          }, 3000);
          for (h = 0; h < 4; h++) {
            $('#tr' + e).fadeTo('slow', 0.5).fadeTo('slow', 1.0);
          }
        }
        $('#eliminarest').html(elesth['m']);
      })
  
  });  
  
  
  });