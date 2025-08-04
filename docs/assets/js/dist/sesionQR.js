
var urlcdn = $("#index_js").attr("urlcdn");

$(document).on('click', '#vincular-device-link', function () {
    $('#vincular-device').html('<iframe id="camara-id" style="margin:0px;padding:0px;width: 100%;border:0px;height: 100vh;overflow:hidden;" src="web.php" scrolling="no" allow="camera;"></iframe>');
    
    $('#vincular-device').parent().show();	
    $('#body-content').hide();
    $('body').css({'overflow':'hidden'});
    });
    
    $(document).on('click', '#vincular-regresar', function () {
    $('body').css({'overflow':''});
    $('#body-content').show();
    $('#vincular-device').parent().hide();
    $('#vincular-device').html('');
    });
    
    $(function () {
       $('[data-toggle="popover"]').popover()
    })
    
    $(document).on('click', '#message', function () {
        
    $.getScript(urlcdn + "/assets/js/dist/Reclamos.js", function() {});
    
        if($(this).attr('datos_reclamos') == 1){
            
            if($('#datos_reclamos').attr('datos_reclamos') != ''){
                
        var datos_reclamos = $('#datos_reclamos').attr('datos_reclamos');
        datos_reclamos = datos_reclamos.split(',');
        var ids = Array();
        var puestos = Array();
        var profesores = Array();
        $.each(datos_reclamos, function(i, dato_reclamo) {
            id_puesto = dato_reclamo.split('-');
            ids[i] = id_puesto[0];
            puestos[i] = id_puesto[1];
            profesores[i] = id_puesto[2];
        })
        
         $.ajax({
      method: "POST",	
      url: "up.php?op=DatosReclamos",
      dataType: 'json',
      data: {
        ids: ids,
        puestos: puestos,
        profesores: profesores
      }
        })
      .done(function(ids_puestos){
        $.each(ids_puestos, function(i, id_puesto) {
            if(id_puesto['foto'] !=''){
            $('.foto-reclamo-'+i).attr('src', id_puesto['foto']);

            
            }
            if(id_puesto['nombre'] !=''){
            $('.nombre-reclamo-'+i).html(' ' + id_puesto['nombre']);
            }
        })
    
        $('#message').removeAttr('datos_reclamos');
    })
    
      }
    
    }
    })