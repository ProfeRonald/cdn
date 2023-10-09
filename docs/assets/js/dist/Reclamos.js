
$(document).on('click', '.notireclamo', function () {
	
	var idr = $(this).attr('id');
	var noidr = $('#norecrec').val();

	$('#recmodal').html('<div class="text-info text-center mt-5 display-3"><i class="fa fa-refresh rotar"></i> Cargando...</div>');
		
		if(idr != noidr){

	$('#' + idr).removeAttr('no', idr);
		
	var datos = $(this).attr("datos-rec");

		$.ajax({
  		method: "POST",	
  		url: "sesion.php?op=ModalRec",
  		dataType: 'json',
  		data: {
  			op: "ModalRec",
    		sec: "ModalRec",
    		datos: datos
  		}
		})
  
  .done(function(rec){
  	$('#recmodal').html(rec);
  
  	var src = $('#' + idr).find('.photo').children('img').attr('src');
  	var nom = $('#' + idr).find('.name').text();
  	var raz = $('#raz'+ idr).html();

  	$('#recmodal').find('.img-h').attr('src', src);
  	$('#recmodal').find('.nom-h').text(nom);
  	$('#raz-' + idr).html(raz);
  	
  		if(rec != ''){
  	$('#norecrec').val(idr);
  		}

  })
  
  
 	}

	 $(document).on('keyup change', '.notavalrec', function () {   
	  var nota = $(this).val();
	  var notarec = $('#notarec').val();
	  	if(nota == notarec){
	  $('#modcal').prop('disabled', true);
	  	}else{
	  $('#modcal').prop('disabled', false);	  
	  	}
		
});
 		  
  });

  

$(document).on('click', '#elical', function () { 
  
  if(!confirm("\u00BFSeguro desea eliminar esta calificaci\u00F3n?")) {
    return false;
  }
  
  $.ajax({
  method: "POST",	
  url: "up.php?op=EliminarNota",
  dataType: 'json',
  data: $("#fcale").serialize()
	})
  .done(function(del){
  	console.log(del);
  	if(del['u'] == 1){
	setTimeout(function(){$('#idbcerrar').trigger("click");},2500);
  $("#aelirec").html('<div class="my-3 text-center" style="font-size:2rem;color:#D65D0A;">Calificaci&oacute;n eliminada<br /><i class="fa fa-check" aria-hidden="true"></i></div>');
  $("#elical").hide();
	$('#rec' + del['id']).hide();
  var a = Number($('#tavisos').text()) - 1;
  	if(a == 0){
  $('#tavisos').parent().hide();
   	}else{
  $('#tavisos').text(a);   		
  	}
 	}else{
    $("#aelirec").html('<div class="my-3 text-center" style="font-size:2rem;color:#7D0F0F;">No se pudo eliminar<br /><i class="fa fa-ban" aria-hidden="true"></i></div>');
	$('#norecrec').val('');
 	}
  })
  .fail(function(){
    $("#aelirec").html('<div class="my-3 text-center" style="font-size:2rem;color:#7D0F0F;">No se pudo eliminar<br /><i class="fa fa-ban" aria-hidden="true"></i></div>');
	$('#norecrec').val('');
  })
  
  
 });


 $(document).on('click', '#modcal', function () { 
	$('#modcal').prop('disabled', true);
	var idr = $(this).attr('idr');
	var notar = $('#nota_'+idr).val();
  $.ajax({
  method: "POST",	
  url: "sesion.php?op=ModificarReclamoNota",
  dataType: 'json',
  data:{ op: 'ModificarReclamoNota',
  			 sec: 'ModificarReclamoNota',
  			idr: idr, notar: notar}
	})
  .done(function(up){		
  	if(up['u'] == 1){
   		setTimeout(function(){$('#idbcerrar').trigger("click");},2500);
   		$("#amodrec").html('<div class="my-3 text-primary text-center" style="font-size:2rem;">Calificaci&oacute;n actualziada<br /><i class="fa fa-check" aria-hidden="true"></i></div>');
   		$("#modcal").hide();
   		$('#rec' + up['id']).hide();
   		var a = Number($('#tavisos').text()) - 1;
   		if(a == 0){
   			$('#tavisos').parent().hide();
   		}else{
   			$('#tavisos').text(a);   		
   		}
 		}else{
 			$("#amodrec").html('<div class="my-3 text-danger text-center" style="font-size:2rem;">No se pudo actualizar<br /><i class="fa fa-ban" aria-hidden="true"></i></div>');
			 $('#norecrec').val('');
			 $('#modcal').prop('disabled', false);

 		}

  })
  
  .fail(function() {
    $("#amodrec").html('<div class="my-3 text-danger text-center" style="font-size:2rem;">No se pudo actualizar<br /><i class="fa fa-ban" aria-hidden="true"></i></div>');	
	$('#norecrec').val('');
	$('#modcal').prop('disabled', false);

  })
  
  });