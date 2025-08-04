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
