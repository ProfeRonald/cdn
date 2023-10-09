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
	console.log(gps);

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
	console.log(a);
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
