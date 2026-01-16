
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