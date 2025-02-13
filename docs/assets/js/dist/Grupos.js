jQuery(document).ready(function() {
    jQuery(".standardSelect").chosen({
        disable_search_threshold: 10,
        no_results_text: "Elija una opcion!",
        width: "100%"
    });
});

$(window).on("load", function () {
$('#menuToggle').trigger('click');
});

$(".switch-input").change(function(){
    if ($('.switch-input:checked').length > 0) {
     	$("#EditarEliminar").text("Eliminar/Actualizar Grupos");
     	$("#EditarEliminar").attr('class', 'btn btn-danger btn-md');
     	$("#EditarEliminar").attr('data-toggle', 'modal');
     	$("#EditarEliminar").attr('data-target', '#largeModal3');
     	$("#EditarEliminar").attr('type', 'button');
    }else{
    	$("#EditarEliminar").text("Actualizar Grupos");
     	$("#EditarEliminar").attr('class', 'btn btn-primary btn-md');
     	$("#EditarEliminar").attr('data-toggle', '');
     	$("#EditarEliminar").attr('data-target', '');
     	$("#EditarEliminar").attr('type', 'submit');
    }

});



$(document).on('click', '#movergs', function () {
	$("#movergs").prop('disabled', true);
var ops = $('.movgs');
var s = 0;
$.each(ops, function(i,o) {
s += Number($(this).val());
});
if(s == 0){
$("#movergs").html('<i class="fa fa-refresh rotar"></i> &iexcl;Ning&uacute;n grupo seleccionado!');
$("#movergs").attr('class', 'btn btn-danger btn-md');
  setTimeout(function(){
$("#movergs").text('Mover estudiantes');
$("#movergs").attr('class', 'btn btn-info btn-md');
$("#movergs").prop('disabled', false);
  },800);
}
if(s > 0){
$.ajax({
  method: "POST",	
  url: "sesion.php?op=MoverGrupoN",
  dataType: 'json',
  data: $("#fgruposn").serialize()
	})
  .done(function(gps){
	var len = Object.keys(gps).length;
	if(len > 0){
		n=0;
		for (const i in gps) {
    if (Object.hasOwn(gps, i)) {
	var asel = $('#movg' + `${i}`).html();
	$('#movg' + `${i}`).html('<i class="fa fa-refresh rotar"></i> Moviendo estudiantes...');
  $('#movg' + `${i}`).attr('class', 'btn btn-warning btn-md');
  setTimeout(function(){
  $('#movg' + `${i}`).html('<input type="hidden" name="gn[]" value="'+`${i}`+'" /><i class="fa fa-check"></i> &iexcl;'+`${gps[i]}`+' estudiantes movidos! <i class="fa fa-refresh rotar"></i>');
  if(`${gps[i]}` > 0){
	$('#movg' + `${i}`).attr('class', 'btn btn-success btn-md');
	}else{
	$('#movg' + `${i}`).attr('class', 'btn btn-danger btn-md');
	}
  
  },1500);
  setTimeout(function(){
	if(`${gps[i]}` > 0){
	$('#movg' + `${i}`).parent().parent().hide('slow');
	}else{
		$('#movg' + `${i}`).html(asel);
		$('#movg' + `${i}`).attr('class', 'form-group');
	}
},7000);
  
  n++;
	}
		}
	if(n == len){
	$("#movergs").prop('disabled', false);
	}
	}else{
		$("#movergs").html('<i class="fa fa-refresh rotar"></i> &iexcl;Ning&uacute;n grupo movido!');
  $("#movergs").attr('class', 'btn btn-danger btn-md');
  setTimeout(function(){
$("#movergs").text('Mover estudiantes');
$("#movergs").attr('class', 'btn btn-info btn-md');
$("#movergs").prop('disabled', false);
  },2500);
	}
  })
  
  .fail(function(a, b, c) {
	
  $("#movergs").html('<i class="fa fa-refresh rotar"></i> &iexcl;Error al mover estudiantes!');
  $("#movergs").attr('class', 'btn btn-danger btn-md');
  setTimeout(function(){
$("#movergs").text('Mover estudiantes');
$("#movergs").attr('class', 'btn btn-info btn-md');
$("#movergs").prop('disabled', false);

  },2500);
  })
}
});


$(document).on('click', '.opcionesGrupo', function (event) {

	var grupo = $(this).attr('grupo');
	var id_grupo = $(this).attr('id_grupo');
	var activo_grupo = $(this).attr('activo_grupo');
	var estudiantes = $(this).attr('estudiantes');
	var tr = $(this).attr('tr');
	$('.opcionesGrupo').removeAttr('id');
	$(this).attr('id', 'opcionesGrupo');
  if (activo_grupo == 1) {
    var activo = '<i style="color:green;cursor:pointer" rel="tooltip" title="Grupo activo"  class="fa fa-unlock fa-5x activoGrupo" id_grupo="'+id_grupo+'" activo_grupo="'+activo_grupo+'" tr="'+tr+'"></i>';
	$('#TablaGrupos tr').eq(tr).css({'background-color': ''});
  } else {
    var activo = '<i style="cursor:pointer" rel="tooltip" title="Grupo desactivado" class="fa fa-lock fa-5x activoGrupo" id_grupo="'+id_grupo+'" activo_grupo="'+activo_grupo+'" tr="'+tr+'"></i>';
	$('#TablaGrupos tr').eq(tr).css({'background-color': '#eb98098c'});
  }

  if (estudiantes == 0 && activo_grupo == 1) {
    var dis_gp = "";
  }else{
	var dis_gp = " disabled";
  }

	var eliminar = '<input  id="eliminarGrupo" type="checkbox" value="'+id_grupo+'" style="width:40px;height:40px"'+dis_gp+'>';

	$('#opcionesModal h3').html(grupo);

	$('#opcionesModal table tbody').html('<tr><td class="text-center"><div class="form-group"><a href="index.php?sec=EditarSeccion&id='+id_grupo+'" class="badge badge-warning pull-center" style="font-size:2rem;" target="InscribirModal">'+ estudiantes + '</a></div></td><td class="text-center">'+activo+'</td><td class="text-center">'+eliminar+'</td></tr>');
	$('#opcionesModal').modal('show');


	$(document).on('click', '.activoGrupo', function (event) {
		var activo_grupo = $(this).attr('activo_grupo');
		var id_grupo = $(this).attr('id_grupo');
		var th = $(this);
		var tr = $(this).attr('tr');
		
    $.ajax({
      method: "POST",
      url: "up.php?op=activoGrupo",
      data: {id_grupo: id_grupo, activo_grupo: activo_grupo}
    })
      .done(function (a) {
		
		var estudiantes = $('#opcionesGrupo').attr('estudiantes');
  
		if (estudiantes == 0 && a == 1) {
    var dis_gp = "";
  		}else{
	var dis_gp = " disabled";
  		}

		$('#eliminarGrupo').parent().html('<input id="eliminarGrupo" type="checkbox" value="'+id_grupo+'" style="width:40px;height:40px"'+dis_gp+'>');
		
		if (a == 1){
    		var hactivo = '<i style="color:green;cursor:pointer" rel="tooltip" title="Grupo activo"  class="fa fa-unlock fa-5x activoGrupo" id_grupo="'+id_grupo+'" activo_grupo="1" tr="'+tr+'"></i>';
			$('#opcionesGrupo').attr('activo_grupo', 1);
			$('#opcionesGrupo').attr('tr', tr);
			$('#TablaGrupos tr').eq(tr).css({'background-color': ''});
			
  		}else{
    		var hactivo = '<i style="cursor:pointer" rel="tooltip" title="Grupo desactivado"  class="fa fa-lock fa-5x activoGrupo" id_grupo="'+id_grupo+'" activo_grupo="0" tr="'+tr+'"></i>';
			$('#opcionesGrupo').attr('activo_grupo', 0);
			$('#opcionesGrupo').attr('tr', tr);
			$('#TablaGrupos tr').eq(tr).css({'background-color': '#eb98098c'});
  		}
	  
	th.parent().html(hactivo);

	  })
	})

	$(document).on('click', '#eliminarGrupo', function () {
		if($(this).prop('checked') == true){
		$('#confirmarGrupo').prop('disabled', false);
		$('#confirmarGrupo').attr('activo_grupo', $('#opcionesGrupo').attr('activo_grupo'));
		$('#confirmarGrupo').attr('id_grupo', $(this).val());
		}else{
			$('#confirmarGrupo').prop('disabled', true);
			$('#confirmarGrupo').removeAttr('activo_grupo');
			$('#confirmarGrupo').removeAttr('id_grupo');
		}
	})

	$(document).on('click', '#confirmarGrupo', function () {
		var activo_grupo = $(this).attr('activo_grupo');
		var id_grupo = $(this).attr('id_grupo');
		var estudiantes = $('#opcionesGrupo').attr('estudiantes');
    $.ajax({
      method: "POST",
      url: "up.php?op=eliminarGrupo",
      data: {id_grupo: id_grupo, activo_grupo: activo_grupo, estudiantes: estudiantes}
    })
      .done(function (a) {
		if(a == 1){
		$('#avisoGrupo').html('<span class="text-danger">El grupo ha sido eliminado.</span>');
		}else{
			$('#avisoGrupo').html('<span class="text-dark">No se ha podido eliminar el grupo. El grupo debe estar vac&iacute;o y activo.</span>');
		}
	})
})

})


$(document).on('click', '#actualizarGrupos', function () {
	$.ajax({
		method: "POST",
		url: "sesion.php?op=ActualizarGrupos",
		data: $("#fgrupos").serialize()
	})
	.done(function (r) {
		$('#ActulizarGruposModal .modal-body').html(r);
		$('#ActulizarGruposModal').modal('show');
	})

})
