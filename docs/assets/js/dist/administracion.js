$(document).on('click', '.link-directo', function () {
    window.open($(this).attr('link'), 'administracion', 'fullscreen=yes, scrollbars=auto, location=yes, menubar=no, status=no, titlebar=yes, toolbar=no, left=0, top=0');
});

$(document).on('click', '.link-modal', function () {
    $('#'+ $(this).attr('link')).modal('show');
});

$(document).on('click', '#simular-puesto', function () {
    $('#simuladorPersonalSel').modal('show');
    $('#lista-personal-simulador').html('<div class="card p-3"> ID del ' + $('#simulador-puesto option:selected').text() + ': <input type="text" class="form-control" pu="' + $('#simulador-puesto').val() + '" value="" style="width: 300px; height: 120px;font-size: 4rem; text-align: center;" id="id-sumlador" /></div>');
     $('#simular-usuario').removeAttr('idsimulador');
    $('#simular-usuario').removeAttr('pu');
    $('#simular-usuario').removeAttr('data-dismiss');
    $('#simular-usuario').attr('class', 'btn btn-info');
    $('#simular-usuario').text('Simular');
});

$(document).on('keyup input', '#id-sumlador', function () {
   if(/\D/g.test(this.value)) this.value = this.value.replace(/\D/g,'');
});

$(document).on('click', '#simular-usuario', function () { 
    var idsimulador = $(this).attr('idsimulador');
    var id = $('#id-sumlador').val();
    if(idsimulador > 0) {
        var pu = $(this).attr('pu');
    }else{
        var pu = $('#id-sumlador').attr('pu');
    }
   $.ajax({
								method: "POST",	
								url: "up.php?op=UsuarioSimulador",
                                dataType: 'json',
								data: {pu: pu, id: id, idsimulador: idsimulador}
							})
							
					  	.done(function(opcs){
                            console.log(opcs);
                            $('#lista-personal-simulador').html(opcs['msj']);
                            if(opcs['r'] == 2) {
                            $('#simular-usuario').remove();
                            setTimeout(function(){
                                window.location.href = 'index.php';
                            },2000);
                            }else if(opcs['r'] == 1) {
                            $('#simular-usuario').attr('idsimulador', id);
                            $('#simular-usuario').attr('pu', pu);
                            $('#simular-usuario').removeAttr('data-dismiss');
                            $('#simular-usuario').attr('class', 'btn btn-danger');
                            $('#simular-usuario').text('Aplicar');
                            }else{
                            $('#simular-usuario').removeAttr('idsimulador');
                            $('#simular-usuario').removeAttr('pu');
                            $('#simular-usuario').attr('data-dismiss', 'modal');
                            $('#simular-usuario').attr('class', 'btn btn-secondary');
                            $('#simular-usuario').text('Cerrar');
                            }
                        });

});


var filescdn = $("#datos_js").attr("filescdn");

var idlp = Number(document.cookie.replace(
  /(?:(?:^|.*;\s*)idples\s*\=\s*([^;]*).*$)|^.*$/,
  "$1"
));

if (idlp.length < 1) {
  var idlp = 7;
}

if($('#TablaAescolar').length > 0){

var tablea = $('#TablaAescolar').DataTable({
     dom: 'Bfrtip', // agrega los botones
        buttons: [
          {
            extend: 'excelHtml5',
            text: 'Descargar lista de empresas',
            title: 'Lista de empresas',
            filename: 'lista_empresas'
          }
        ],
        
        "responsive": true,
    "columnDefs": [ {
        "targets": 'no-sort',
        "orderable": false,
  },
  {
            targets: 0,
            className: "text-center"
        },
  {
            targets: 8,
            className: "text-center"
        } ],
  "order": [[ 0, "asc" ]],
  "language": {
    url: filescdn + "/assets/js/lib/data-table/SpanishEmpresas.json",
  },
  "lengthMenu":		[[5, 7, 10, 20, 25, 30, 50, -1], [5, 7, 10, 20, 25, 30, 50, "Todos"]],
  "iDisplayLength":	idlp,
});

$(document).on(
    "blur",
    "#TablaAescolar_wrapper select:first",
    function () {
      var idpl = $(this).val();
      document.cookie = "idples=" + idpl;
    }
  );

}
                    
$(document).on('click', '#guardar-empresa', function () {
        $.ajax({
      method: "POST",	
      url: "up.php?op=GuardarEmpresa",
      data: $("#form-empresa").serialize()
        })
      .done(function(g){
        console.log(g);
        if(g == 1){
        $('#aviso-empresa').html('<span style="font-size:1.5rem;color:#218c74;font-weight:bold;" class="fa fa-check"> &iexcl;Empresa guardada!</span>');
          setTimeout(function(){   
            $('#modalEmpresa').modal('hide');
           },1000);
        }else{
            $('#aviso-empresa').html('<span style="font-size:1.5rem;color:#b33939;font-weight:bold;" class="fa fa-ban"> &iexcl;No se pudo guardar!</span>');
            setTimeout(function(){   
            $('#aviso-empresa').text('');
           },3000);
        }
      })
      
    });

    $(document).on('click', '[link=modalEmpresa]', function () { 
         $('#modalEmpresaTitle').text('Agregando empresa');
         $('#lista-empresas').hide();
         $('#modalEmpresa .modal-footer').show();
         $('#formulario-empresa').show();
    });

  $(document).on('click', '#boton-lista-empresas', function () { 
    var tbody = $('#tbody-empresas').text();
    if(tbody != '' || tbody == ''){
        $.ajax({
      method: "POST",
      url: "up.php?op=ListaEmpresas",
      dataType: 'json',
      data: {tbody: tbody}
        })
      .done(function(es){
         $('#lista-empresas h3').html('Se han confirudado <strong id="tempresas">'+es['n']+'</strong> empresas en total');
         $('#modalEmpresaTitle').text('Lista de empresas');
         $('#lista-empresas').hide();
         $('#formulario-empresa').hide();
         $('#modalEmpresa .modal-footer').hide();
         //$('#tbody-empresas').html(es['e']);
         var array = es['e'];
        array.forEach(element => {
            tablea.row.add(element).draw(false);
        });
         $('#lista-empresas').show();
          $('.subirlogo-empresa').each(function() {
            $(this).parent().parent().attr('ide', $(this).attr('ide'))
         });
         
      })
    }

    })

$(document).on('click', '.subirlogo-empresa', function () { 
var ide = $(this).attr('ide');
var ruta = 'logos/empresas/empresa_' + ide + '.png';
$('#foto_cambiar').attr('ruta', ruta);
$('#foto_mini').attr('idq', ide);
$('#foto_cmini').attr('ruta', ruta);
$('#foto_mini').css({'background-image':'url(' + $(this).attr('src') + ')'});
$('#foto_cambiar').trigger('click');
})


$(document).on('click', '.dato-empresa', function () { 
var dato = $(this).attr('dato');
var texto = $(this).html();
if(texto == 'Click para introducir'){
  texto = '';
}
if(dato == 'descripcion'){
$(this).parent().html('<textarea name="' + dato + '" class="dato-empresa-input form-control" style="width: 100%; height: 100%;" rows="4" cols="50" placeholder="Click para introducir">' + texto + '</textarea>');
}else{
$(this).parent().html('<input name="' + dato + '" class="dato-empresa-input form-control" type="text" value="' + texto + '" style="width: 100%; height: 100%;"  placeholder="Click para introducir" />');
}

})

$(document).on('blur', '.dato-empresa-input', function () { 
var ths = $(this).parent();
var ide = ths.parent().find('.subirlogo-empresa').attr('ide');
var val = $(this).val();
if(val != 'Click para introducir' && val != ''){
$.ajax({
      method: "POST",
      url: "up.php?op=ActualizarEmpresa",
      data: {ide: ide, valor: val, dato: $(this).attr('name')}
        })
      .done(function(up){
        console.log(up);
        if (up == 1) {
      var color = "#2ECC71";
    } else {
      var color = "red";
    }

    var fondo = ths.css({ backgroundColor: color }).show();
    setTimeout(function () {
      fondo.css({ backgroundColor: "", color: "black" });
    }, 1000);
            for (h = 0; h < 4; h++) {
            ths.fadeTo('slow', 0.5).fadeTo('slow', 1.0);
          }
        
      
      })

    }

    if(val == ''){
      val = 'Click para introducir';
  }

      $(this).parent().html('<span class="dato-empresa" dato="' + $(this).attr('name') + '">' + val + '</span>');
})

$(document).on('click', '.eliminar-empresa', function () {
var ths = $(this);
var ide = $(this).parent().parent().find('.subirlogo-empresa').attr('ide');
var tempresas = Number($('#tempresas').text());

 if (!confirm("Confirme eliminar empresa")) {
        return false;
      }
$.ajax({
      method: "POST",
      url: "up.php?op=EliminarEmpresa",
      data: {ide: ide}
        })
      .done(function(el){
        if(el == 1){
tablea.row(ths.parents('tr')).remove().draw(false);
$('#tempresas').text(tempresas - 1);
        }else{
            alert('No se pudo eliminar');
        }
    
    })

})
