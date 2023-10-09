
$(document).ready(function () {
  
  var urlcdn = $("#datos_js").attr("urlcdn");

    $(".standardSelect").chosen({
      disable_search_threshold: 10,
      no_results_text: "Elija una opcion!",
      width: "100%"
    });
  });

  $(document).on('change', '#provincia_escuela', function () {
  
    var prov = $(this).val();
    $.ajax({
    method: "POST",	
    url: "up.php?op=Municipios",
    data:{prov: prov}
          })
          .done(function(opcs){
           $('#municipio_escuela').html(opcs);
       
          })
})

$(document).on('click', '.eliminar_file_foto', function () {
  
  if(!confirm("\u00BFSeguro desea eliminar imagen?")) {
    return false;
  }

  var cmini = $(this).attr('cmini');
  var local = $("#datos_js").attr("local");

  $(this).hide('slow');

    if(cmini == 2){
  var url = urlcdn + '/logo.svg';
    }else{
  var url = urlcdn + '/logo2.svg';
    }

  if(local == 1){

    $.ajax({
      method: "POST",
      url: "up.php?op=EliminarLogoBanner",
      data:{cmini: cmini}
      })
      .done(function(e){
      if(e == 1){
        alert('Archivo eliminado');
        imagenSubida(url, cmini, 1);
      }else{
        alert('No se pudo eliminar el archivo');
      }
      })

  }else{
    var img = $(this).attr('ruta');
    img = decodeURIComponent(img);
    firebase.storage().ref().child(img).delete();
    imagenSubida(url, cmini, 1);
  }

})



$(document).on("mouseenter", "#foto_mini, #banner_mini", function () {   
 $(this).next('.eliminar_file_foto').css({'visibility':'visible'});
 
  setTimeout(function () {
   $('.eliminar_file_foto').css({'visibility':'hidden'});
 }, 8000);
 })

 
$( window ).on( "load", function() {
	$('#esconfig').trigger("blick");
});

 
$(document).on('blick', '#esconfig', function () {
	var y = $(this).attr('y');
	var val = $(this).val();
	if(val == 1){
	var val = $(this).attr('y1');
	}
	if(val == 2){
	var val = $(this).attr('y2');
	}
	if(val != y){
	$('#esconfigHTML').remove();
	$.ajax({
  method: "POST",
  url: "sesion.php?op=CargarConfigEscuela",
  data:{val: val, y: y}
	})
  .done(function(cfg){
	$('#esconfig').attr('y', val);
	$('.editandoescuela').remove();
   $('#es-configHTML').after(cfg);
   setTimeout(function(){
   },150);
  })

}

});

$(document).on('change', '#esconfig', function () {
	var y = $(this).attr('y');
	var val = $(this).val();
	if(val == 1){
	var val = $(this).attr('y1');
	}
	if(val == 2){
	var val = $(this).attr('y2');
	}
	if(val != y){
	$(this).trigger("blick");
	}
});

$(document).on('click', '.periodo', function () {
		var prd = $(this).val();
		var prds = new Array();
		$(".periodo").each(function(i, prsd){
    if($(this).prop("checked") == true){
  prds[i] = $(this).val();
  $('#custom-nav-P' + $(this).val() + '-tab').show('slow');
  		}
  		if($(this).prop("checked") == false){
  $('#custom-nav-P' + $(this).val() + '-tab').hide('slow');		
  		}
    });
		
		prds = prds.filter(function () { return true });
		if(prds.length < 1){
		  $('#nav-tab-cont').hide('slow');
		}else{
		  $('#nav-tab-cont').show('slow');		
		}
		console.log(prds);
});