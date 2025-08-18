
var urlimgs = $("#datos_js").attr("urlimgs");

function imagenSubida(iurl, cmini=0, empty=0) {
    if(cmini == 2){
        var sqlq = $('#banner_mini').attr('sqlq');
        var idq = $('#banner_mini').attr('idq');
    }else{
      var sqlq = $('#foto_mini').attr('sqlq');
      var idq = $('#foto_mini').attr('idq');
    }
    if(empty == 1){
      var urlfoto = '';
    }else{
      var urlfoto = iurl;
    }
    
    var iurl = iurl + '?v=' + `${new Date().getTime()}`;

    $.ajax({
        method: "POST",	
        url: "up.php?op=ActualizarFoto",
        data:{urlfoto: urlfoto, sqlq: sqlq, idq:  idq}
              })
              .done(function(up){
                  if(up == 1){
                    if(cmini == 2){
                      $("#banner_mini").attr(
                        "style",
                        'background-image: url(' +
                          iurl +
                          ');background-repeat: no-repeat;background-size: 100% 100%;'
                      );
                      
                      $('#banner_ses').attr('src', iurl);

                  }else{
                    $("#foto_mini").attr(
                        "style",
                        'background-image: url(' +
                          iurl +
                          ');background-repeat: no-repeat;background-size: 100% 100%;'
                      );
                      $('#fotocarnet').attr('src', iurl);
                    }
                if(cmini == 1){
                   $('#fotses').attr('src', iurl);
                    }
                   
                  }else{
                    $('#subiendofoto').html('<div class="text-danger">No se pudo cargar la imagen, intente de nuevo</div>');

                  }
     
    })
}

function SubirFotoPersonalLogoBanner(dataurl, cmini=0, imgtype='image/jpeg'){
  
 if(cmini == 2){
    var sqlq = $('#banner_mini').attr('sqlq');
    var idq = $('#banner_mini').attr('idq');
}else{
  var sqlq = $('#foto_mini').attr('sqlq');
  var idq = $('#foto_mini').attr('idq');
}

if (sqlq == 1) {
  var ruta = 'fotos/directores/foto_'+idq+'.jpg';
} else if (sqlq == 2) {
  var ruta = 'logos/otros/logo_'+idq+'.png';
} else if (sqlq == 3) {
  var ruta = 'banners/banner_'+idq+'.png';
} else if (sqlq == 5) {
  var ruta = 'logos/empresas/empresa_'+idq+'.png';
} else {
  var ruta = 'fotos/personal/foto_'+idq+'.jpg';
}

  $.ajax({
    method: "POST",
    url: "up.php?op=FotoPersonal",
    data: {
      ruta: ruta,
      dataurl: dataurl,
      imgtype: imgtype
    }
  })
    .done(function (e) {
      if(e == 1){
        imagenSubida(urlimgs + '/' + ruta, cmini);
        $('#mensaje_uploading').html('<div class="text-success"> ¡La imagen se ha subido con éxito!</div>');

        if (sqlq == 5) {
            $('[ide='+idq+']').attr('src', urlimgs + '/' + ruta + '?v=' + `${new Date().getTime()}`);
        }
					

      }else{
         $('#mensaje_uploading').html('<div class="text-danger"> ¡No se pudo subir la imagen!</div>');
      }

      setTimeout(function(){
					$('#mensaje_uploading').hide('slow');
					},5000);
    })

  }

$(".input_file_foto").change(function () {
  var cmini = $(this).attr('cmini');
  FotoURL(this, cmini);
})

function FotoURL(input, cmini=0) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      if(cmini == 2){
      $('#banner_mini').css('background-image', 'url(' + e.target.result + ')');
      $('#banner_mini').hide();
      $('#banner_mini').fadeIn(650);
      }else{
        $('#foto_mini').css('background-image', 'url(' + e.target.result + ')');
        $('#foto_mini').hide();
        $('#foto_mini').fadeIn(650);
      }
    };
    reader.readAsDataURL(input.files[0]);
  }
	}

