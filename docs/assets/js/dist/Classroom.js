$(document).ready(function () {
    
$(document).on('click', '#expandirAsigsGC', function () {
		
    $('#asigsGC').toggle('slow');
    var asigsMO = $(this).attr('asigsMO');

    if(asigsMO == 1){
        $(this).attr('asigsMO', '0');
        $(this).attr('data-original-title', 'Click para mostrar lista de asignaturas/m&oacute;dulos');
        $(this).html('<i class="fa fa-eye-slash fa-2x" aria-hidden="true"></i>');
    }else{
        $(this).attr('asigsMO', '1');
        $(this).attr('data-original-title', 'Click para ocultar lista de asignaturas/m&oacute;dulos');
        $(this).html('<i class="fa fa-eye fa-2x" aria-hidden="true"></i>');	
    }

    var asigsGC = $(this).attr('asigsGC');

    if(asigsGC == 1){
    
    var grupo_gc = $(this).attr('grupo_gc');

        $.ajax({
      method: "POST",
      url: "sesion.php?op=asigsGC",
      data: {
          op: "asigsGC",
          sec: "asigsGC",
          grupo: grupo_gc
      }
  })
    .done(function(a){
    if(a == 1){
        $('#asigsGC').html('No hay nada para mostrar');
    }else{
        $('#asigsGC').html(a);
        $('#expandirAsigsGC').removeAttr('asigsGC');
    }
    })


    }

});


$(document).on('click', '.tareasGC', function () {
		
    var trsGC = $(this); 
    var ida = trsGC.parent().parent().parent().attr('id');
    
    var idc = $(this).attr('idc');
    var correo_gc = $('#tareascal').attr('correo_gc');
    
    $('.tareasGC_' + idc).toggle('slow');

    var tareasMO = $(this).attr('tareasMO');

    if(tareasMO == 1){
        $(this).attr('tareasMO', '0');
        $(this).attr('data-original-title', 'Click para mostrar lista de tareas');
        $(this).html('<i class="fa fa-plus-square fa-2x" aria-hidden="true"></i> Click para mostrar las tareas');
    }else{
        $(this).attr('tareasMO', '1');
        $(this).attr('data-original-title', 'Click para ocultar lista de tareas');
        $(this).html('<i class="fa fa-minus-square fa-2x" aria-hidden="true"></i> Click para ocultar las tareas');	
    }

    var tareasGC = $(this).attr('tareasGC');

    if(tareasGC == 1){
    
    $('.tareasGC_' + idc).html('<div class="col-2"></div><div class="col-6"><div class="scol text-right"> Cargando tareas...</div></div><div class="col-2"><div class="scol"><i style="animation-name: girar;animation-duration: 2s;animation-iteration-count: infinite;animation-timing-function: linear;" class="fa fa-refresh fa-2x" aria-hidden="true"></i></div></div><div class="col-2"></div>');

        $.ajax({
      method: "POST",
      url: "sesion.php?op=tareasGC",
    dataType: 'json',
      data: {
          op: "tareasGC",
          idc: idc,
          correo_gc: correo_gc
      }
  })
    .done(function(tarea){
        if(tarea[0] == 1){
            $('.tareasGC_' + idc).html('<div class="w-100 text-center font-weight mx-2">Ninguna tarea trabajada</div>');
        }else{
            $('.tareasGC_' + idc).html(tarea[0]);
            $('.personagc_' + idc).html('<a href="' + tarea[1] + '" target="personagc" class="text-white personagc_' + idc + '"><i class="fa fa-external-link"></i></a>');
            $('#tareascal').attr('idegc',tarea[2]);
            trsGC.removeAttr('tareasGC');
            $('#'+ida+' .datos-tarea-envio').trigger("click");
        }
})


    }

});



$(document).on('click', '.datos-tarea-envio', function () {
	var tarea = $(this).parent();
	tarea.html('<div class="col-10"><div class="scol"> Cargando calificaci&oacute;n</div></div><div class="col-2"><div class="scol"><i style="animation-name: girar;animation-duration: 2s;animation-iteration-count: infinite;animation-timing-function: linear;" class="fa fa-refresh" aria-hidden="true"></i></div></div>');
	
	var idegc = $('#tareascal').attr('idegc');
	var idc = tarea.attr('idc');
	var idtarea = tarea.attr('idtarea');
	var valort = tarea.attr('valort');
	
	$.ajax({
  		method: "POST",
  		url: "sesion.php?op=TareasEstudiante",
  		dataType: 'json',
  		data: {
  			op: "TareasEstudiante",
  			sec: "TareasEstudiante",
  			idc: idc,
  			idegc: idegc,
  			idtarea: idtarea,
  			valort: valort
  		}
  	})
		.done(function(env){
			tarea.html(env['envios']);
			$('.estadote_' + idtarea).html(env['estado']);
			$('.enlace_' + idtarea).attr('href', env['enlace']);
			if(env['por'] > 0){
				$('.porciento_' + idtarea).attr('class', 'badge badge-pill badge-primary');
				$('.borde_' + idtarea).attr('class', 'card border border-' + env['borde']);
			}
			if(env['personagc'] != '' && env['personagc'].substring(0, 8) == 'https://'){
				$('.personagc_' + idc).attr('href', env['personagc']);
			}

		})
		});

    });