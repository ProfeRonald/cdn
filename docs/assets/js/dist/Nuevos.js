$(document).ready(function () {
    $('#tabla-secciones').DataTable({
    "scrollX": true,
    "scrollY": 200,
    "bAutoWidth": false,
     "searching": false,
     "bLengthChange" : false,
     "ordering": false,
     "bInfo":false,
     "bFilter": false,
     "paging": false,
     "iDisplayLength":	-1,
    });

});


$(document).on('click focus', '#tabla-secciones input', function () {
            $(this).closest('tr').css({backgroundColor: '#F8CDAF'});
});		

$(document).on('mouseleave blur', '#tabla-secciones tr', function () {
            $(this).closest('tr').css({backgroundColor: ''});
});	


$(document).on('keyup change', '.inputsecs', function () {
    
    var isec = $(this).closest('tr').find("input").index(this);
    
    if(event.keyCode == 40){
        $(this).closest('tr').next().find('input').eq(isec).focus();
    }
            
    if(event.keyCode == 38){
        $(this).closest('tr').prev().find('input').eq(isec).focus();
    }

});


$(document).on('change', '#sel-grupo-seccion', function () {
	var sec = $("option:selected", this).attr('sec');
	$('#csv-grupo').html(sec);
	$('#grupo-titulo').val(sec);
	if($(this).val() > 0){
		$('.subir-csv').show();
	}else{
		$('.subir-csv').hide();
	}
	});
	
	$(document).on('change', '#sel-grupo-ests', function () {
		$('#csv-ests').html($("option:selected", this).attr('sec'));
		if($(this).val() > 0){
		$('.anchotablasecciones').css({'visibility':'visible'});
	}else{
		$('.anchotablasecciones').css({'visibility':'hidden'});
	}
	});

	$(document).on('change input', '.filas-dt', function () {
		var grupo = $('#sel-grupo-ests').val();
		if(grupo > 0){
		var year = $('#sel-grupo-ests').attr('year');
		var cant = $('#cantidad').val();
		var trs = '';
		for (let i = 0; i < cant; i++) {
			
			trs += '<tr id="tr_'+i+'"><th class="fijars text-center" scope="row">' + (i + 1) + '</th> <td class="fijars-2"> <input type="text" id="apellido1_estudiante'+i+'" class="inputsecs"  name="apellido1_estudiante[]" autocomplete="off" required> </td> <td class="ancho_nombre"> <input type="text" id="apellido2_estudiante'+i+'" class="inputsecs" name="apellido2_estudiante[]" autocomplete="off"> </td> <td class="fijars-3"> <input type="text" id="nombre1_estudiante'+i+'" class="inputsecs" name="nombre1_estudiante[]" autocomplete="off" required> </td> <td class="ancho_nombre"> <input type="text" id="nombre2_estudiante'+i+'" class="inputsecs" name="nombre2_estudiante[]" autocomplete="off"> </td> <td class="ancho_sexo"> <input onfocus="document.getElementById(\'tr_'+i+'\').style.backgroundColor = \'#F6DDCC\'" onblur="document.getElementById(\'tr_'+i+'\').style.backgroundColor = \'\'" type="radio" id="masc'+i+'" name="sexo_estudiante'+i+'" value="1">M<input onfocus="document.getElementById(\'tr_'+i+'\').style.backgroundColor = \'#F6DDCC\'" onblur="document.getElementById(\'tr_'+i+'\').style.backgroundColor = \'\'" type="radio" id="fem'+i+'" name="sexo_estudiante'+i+'" value="2">F </td> <td class="ancho_fecha"> <input class="fecha_datep" type="date" min="' + (year - 25) + '"-01-01" max="' + (year - 10) + '"-12-31" id="fecha_estudiante'+i+'" name="fecha_estudiante[]" autocomplete="off" placeholder="aaaa-mm-dd"> </td> <td> <input type="text" id="libro_estudiante'+i+'" class="inputsecs" size="4" name="libro_estudiante[]" autocomplete="off"> </td> <td> <input type="text" id="folio_estudiante'+i+'" class="inputsecs" size="4" name="folio_estudiante[]" autocomplete="off"> </td> <td> <input type="text" id="idminerd_estudiante'+i+'" class="inputsecs" size="11" name="idminerd_estudiante[]" autocomplete="off" maxlength="11" onkeyup="if (/\D/g.test(this.value)) this.value = this.value.replace(/\D/g,\'\')" required> </td> <td> <input type="text" id="cedula_estudiante'+i+'" class="inputsecs" size="11" name="cedula_estudiante[]" autocomplete="off" maxlength="11"> </td> <td> <input type="text" id="rne_estudiante'+i+'" class="inputsecs" size="12" name="rne_estudiante[]" autocomplete="off"> </td> <td class="ancho_direccion"> <input type="text" id="direccion_estudiante'+i+'" class="inputsecs" size="20" name="direccion_estudiante[]" autocomplete="off"> </td> <td> <input type="email" id="correo_estudiante'+i+'" class="inputsecs" size="20" name="correo_estudiante[]" autocomplete="off"> </td> <td class="ancho_enfermedad"> <input type="text" id="enfermedad_estudiante'+i+'" class="inputsecs" size="20" name="enfermedad_estudiante[]" autocomplete="off"> </td> <td class="ancho_medicamentos"> <input type="text" id="medicamentos_estudiante'+i+'" class="inputsecs" size="20" name="medicamentos_estudiante[]" autocomplete="off"> </td> <td class="ancho_nombre"> <input type="text" id="nombrellamar_estudiante'+i+'" class="inputsecs" size="20" name="nombrellamar_estudiante[]" autocomplete="off"> </td> <td> <input maxlength="10" type="tel" id="telefonollamar_estudiante'+i+'" class="inputsecs" size="20" name="telefonollamar_estudiante[]" autocomplete="off"> </td> <td> <input type="text" id="parentescollamar_estudiante'+i+'" class="inputsecs" size="20" name="parentescollamar_estudiante[]" autocomplete="off"> </td> <td class="ancho_nombre"> <input type="text" id="nombrepadre_estudiante'+i+'" class="inputsecs" size="20" name="nombrepadre_estudiante[]" autocomplete="off"> </td> <td> <input type="tel" id="telefonopadre_estudiante'+i+'" class="inputsecs" size="20" name="telefonopadre_estudiante[]" autocomplete="off"> </td> <td> <input type="email" id="correopadre_estudiante'+i+'" class="inputsecs" size="20" name="correopadre_estudiante[]" autocomplete="off"> </td> <td class="ancho_nombre"> <input type="text" id="nombremadre_estudiante'+i+'" class="inputsecs" size="20" name="nombremadre_estudiante[]" autocomplete="off"> </td> <td> <input type="tel" id="telefonomadre_estudiante'+i+'" class="inputsecs" size="20" name="telefonomadre_estudiante[]" autocomplete="off"> </td> <td> <input type="email" id="correomadre_estudiante'+i+'" class="inputsecs" size="20" name="correomadre_estudiante[]" autocomplete="off"> </td> <td class="ancho_nombre"> <input type="text" id="nombretutor_estudiante'+i+'" class="inputsecs" size="20" name="nombretutor_estudiante[]" autocomplete="off"> </td> <td> <input maxlength="10" type="tel" id="telefonotutor_estudiante'+i+'" class="inputsecs" size="20" name="telefonotutor_estudiante[]" autocomplete="off"> </td> <td> <input type="email" id="correotutor_estudiante'+i+'" class="inputsecs" size="20" name="correotutor_estudiante[]" autocomplete="off"> </td> </tr>';
			
		}
		
		$('#filas-dt').html(trs);
		}

	});

	$(document).on('keyup', '.inputsecs', function () {
			var val = $(this).val();
			var val = val.replace(/\s/g, '_');
			var val = val.replace(/[^aA0-zZ9ñÑáéíóúüÁÉÍÓÚÜ@-]/g,"");
			var val = val.replace(/_/g, ' ');
			var val = val.substring(0, 50);
			$(this).val(val);
	});

	$(document).on('focus', '.inputsecs', function () {
	$(this).css({'background-color':'#F6DDCC'});
	$('#cantidad').prop('disabled', true);
	$('#sel-grupo-ests').prop('disabled', true);
	});

	$(document).on('blur', '.inputsecs', function () {
	$(this).css({'background-color':''});
	});

	$(document).on('click', '.cargar-estudiantes-archivo', function () {
	$('#cargar-estudiantes-inputs').hide();
	$('#cargar-estudiantes-archivo').show();
	});

	$(document).on('click', '.cargar-estudiantes-inputs', function () {
	$('#cargar-estudiantes-inputs').show();
	$('#cargar-estudiantes-archivo').hide();
	});
	

function csvURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
	var urlimgs = $("#datos_js").attr("urlimgs");
    var csv = urlimgs + '/csv.png';
    reader.onload = function (e) {
      $('#csvarchivo').css('background-image', 'url('+csv+')');
      $('#csvarchivo').hide();
      $('#csvarchivo').fadeIn(650);
	  $('#bcsv').parent().show();
	  $('#subir-csv').html('Archivo a cargar: <b>' + input.files[0]['name'] + '</b>');
    };
    reader.readAsDataURL(input.files[0]);
  }
}

$("#csv_archivo").change(function () {
  csvURL(this);
});	

$(window).on("load", function () {
$('#menuToggle').trigger('click');
});