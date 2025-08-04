$(document).ready(function () {

    var taa = Number($("#datos_js").attr("taa"));
    var formato_registro = Number($("#datos_js").attr("formato_registro"));
    var tiponota = $("#datos_js").attr("tipo_nota");

    
    
  $(document).on('click', '#importar_tareas', function () {
    

    if ($(this).attr('cache') == 1) {

      $('#tareas_classroom').html('<div class="mt-5 pt-5 font-weight-bold display-4 text-center">Cargando tareas...</div>');

      var id_classroom = $('#id_classroom').val();

      $.ajax({
        method: "POST",
        url: "sesion.php?op=ImportarTareas",
        data: {
          op: "ImportarTareas",
          sec: "ImportarTareas",
          id_classroom: id_classroom
        }
      })
        .done(function (t) {
          $('#tareas_classroom').html(t);
          $('#pie_tareas').show();
          $('#importar_tareas').removeAttr('cache');
        })

    }

    var rpp = Number($("#datos_js").attr("rpp"));

    if (formato_registro == 3 && taa == 0 && rpp == 0) {
      $('#trabn').html($('#opindicadores').html());
      if(tiponota == 'i'){
      $('#verindicor').text('Ver indicador 1');
      }else{
        $('#verindicor').text('Ver competencias del grupo 1');
      }
      $('#verindicor').attr('data-toggle', 'modal');
      }else if (formato_registro == 3 && taa == 0 && rpp == 1) {
          $('#trabn').html($('#oprecuperacion').html());
          $("#verindicor").html($('.recuperacion_pedagogica').eq(0).html().split('<br>').join(' '));
          PeriodoGC(1, 1);
          $('#verindicor').removeAttr('data-toggle');
          $('#verindicor').popover({
            selector: '.has-popover'
          });
      }else{
        $('#trabn').html($('#opindicadores').html());
      }

  });

  function PeriodoGC(col, p){
  var idsnotasp = '';
   $.each(
    $('.gc-'+col+'-'+p),
    function () {
      var notap = Number($(this).text());
      if(notap > 0){
      
      idsnotasp += $(this).attr('id') + ':' + notap + ',';

      }
    }
    
  );
  $('#idsnotasp').val(idsnotasp);
}
  
  $(document).on('keyup change', '#pcompprop', function () {

    $('#scompprop').val((Number($(this).attr('max')) - Number($(this).val())));

  });

  $(document).on('blur', '#snora', function () {
    $('#nora').val($(this).val());
    $('.starea').trigger('update');
  });

  $(document).on('focus click blur update change', '.starea', function () {

    var nora = Number($('#nora').val());

    var suma = 0;

    $(".starea").each(function () {
      if ($(this).prop("checked") == true) {
        suma += Number($(this).val());
      }
    });

    var tcomp = 0;

    if ($('#tcomp').prop("checked") == true) {
      var tcomp = 1;
    }

    var tprop = 0;
    if ($('#tprop').prop("checked") == true) {
      var tprop = 1;
    }

    var tcompprop = 0;
    if ($('#tcompprop').prop("checked") == true) {
      var tcompprop = 1;
    }

    $("#ttarea").val(suma);

    var trabn = $("#trabn").val();
    var trabn = trabn.split('-');
    var ra = trabn[1];
    var per = trabn[2];
    var trabn = Number(trabn[3]);

    if (formato_registro == 6) {
      tpra = 10;
    } else {
      tpra = trabn;
    }

    if (trabn == 0) {

      tpra = nora;

    }

    if (formato_registro == 3) {
      tpra = 100;
    }

    var stcomp = 0;

    if (tcomp == 1 && suma <= tpra) {

      $("#vttarea").text(suma + ' + ' + (tpra - suma));

    } else if (tprop == 1) {

      $("#vttarea").html('<div class="fraccion"><span class="dividendo">x</span><span class="barra">/</span><span class="divisor">' + suma + '</span></div> * ' + tpra);

    } else if (tcompprop == 1) {

      $("#vttarea").html('<div class="form-group d-inline-block"><div class="fraccion"><span class="dividendo">x</span><span class="barra">/</span><span class="divisor">' + suma + '</span></div> * <input value="' + tpra + '" max="' + tpra + '" min="1" maxlength="3" type="number" name="pcompprop" id="pcompprop" class="form-control d-inline-block col-3" size="4"> + <input value="0" type="number" id="scompprop" class="form-control d-inline-block col-2" maxlength="2" size="3" readonly></div>');

    } else if (tcomp == 1) {
      stcomp = 1;
    }else{
      $("#vttarea").text(suma);
    }

    var rpp = Number($("#datos_js").attr("rpp"));

    if (formato_registro == 3 && taa == 0 && rpp == 0) {
      $("#verindicor").attr('data-id', ra);

       if(tiponota == 'i'){
      $("#verindicor").text('Ver Indicador ' + ra);
      }else{
        $("#verindicor").text('Ver competencias del grupo ' + ra);
      }
    
    
    
    }else if (formato_registro == 3 && taa == 0 && rpp == 1) {
        $("#verindicor").html($('.recuperacion_pedagogica').eq(ra - 1).html().split('<br>').join(' '));
        PeriodoGC(ra, per);
        $('#verindicor').popover({
            selector: '.has-popover'
          });
    }else{
      $("#verindicor").text('');
    }

    $("#noradiv").text('');

    var btarea = 0;

    if (formato_registro == 5 || formato_registro == 6) {

      if (trabn == 0) {
        $("#mtarea").html('Este RA' + ra + ' no tiene un valor asignado');
        $("#noradiv").html('<small>Especifique un valor para el RA' + ra + ':</small> <input value="1" max="99" maxlength="2" size="2" min="1" id="snora" class="nora" value="' + nora + '" type="number">');
        $('#snora').val($('#nora').val());
      } else if (suma > 0 && suma != 100 && (tcomp == 1 || tprop == 1 || tcompprop == 1)) {
        $("#btarea").show('slow');
        if (trabn != 0) {
          $("#mtarea").text('');
        }
      } else if (suma != trabn || stcomp == 1) {
        $("#mtarea").text('La suma debe completar los ' + trabn + ' puntos del RA' + ra);
        if (stcomp == 1) {

          $("#vttarea").html('<span class="text-danger">' + suma + '</span>');
  
          }
      } else {

        btarea = 1;

      }

    }


    if (formato_registro == 3) {

      if (suma != 100 && ((tcomp == 0 && tprop == 0 && tcompprop == 0) || stcomp == 1)) {
        
        if(rpp == 1){
            $("#mtarea").text('La suma debe completar los 100 puntos de la recuperación pedagógica');
        }else{
            $("#mtarea").text('La suma debe completar los 100 puntos del indicador ' + ra);
        }
        
        $("#btarea").hide('slow');

        if (ra == 'c') {
          $("#mtarea").text('La suma debe completar los 100 puntos de la Prueba Completiva');
        }
        if (ra == 'e') {
          $("#mtarea").text('La suma debe completar los 100 puntos de la Prueba Extraordinaria');
        }
        if (ra == 'o1') {
          $("#mtarea").text('La suma debe completar los 100 puntos de la Prueba de Oportunidad 1');
        }

        if (stcomp == 1) {

        $("#vttarea").html('<span class="text-danger">' + suma + '</span>');

        }


      } else if (suma > 0 && suma != 100 && (tcomp == 1 || tprop == 1 || tcompprop == 1)) {
        if (tcomp == 1 && (suma)  ) {

        }
        $("#btarea").show('slow');

        if (trabn != 0) {
          $("#mtarea").text('');
        }
      } else {

        btarea = 1;

      }

    }


    if (btarea == 1) {

      if (suma > 0) {
        $("#btarea").show('slow');
      } else {
        $("#btarea").hide('slow');
      }

      $("#mtarea").text('');

    }

  });


  $(document).on('focus click blur', '#tcomp, #tprop, #tcompprop, #tsum', function () {

    $('#tsum').prop("checked", false);
    $('#tcomp').prop("checked", false);
    $('#tprop').prop("checked", false);
    $('#tcompprop').prop("checked", false);
    $(this).prop("checked", true);

    $('.starea').trigger('update');

  });

  $(document).on('change', '#trabn', function () {

    $('.starea').trigger("blur");

  });

  $(document).on('click', '.cambiar_total_gc', function () {
    var op = $('#' + $(this).attr('idpub')).attr('op');
    if(op != 1){
    $(this).parent().html('<input value="' + $(this).text() + '" valc="'+$(this).attr('valc')+'" name="'+$(this).attr('idpub')+'" formato_registro="'+$(this).attr('formato_registro')+'" pon="'+$(this).attr('pon')+'" type="text" class="form-control form-control-sm cambiar_total_gc_input" maxlength="3" size="2" style="font-size:2rem;width:73px;height:32px;text-align:center;margin:0 auto;"><i>Anterior: '+$(this).attr('valc')+'</i>');

    }

  });


  $(document).on('blur', '.cambiar_total_gc_input', function () {
    $('#'+$(this).attr('name')).attr('valgc', $(this).val());
    var formato_registro = $(this).attr('formato_registro');
    var val = $(this).val();
    var pon = Number($(this).attr('pon'));
    var estado_gc = '';
    var estado_style = '';
      if(formato_registro == 3){
									if(val < pon){
							estado_gc = "Insuficiente";
							estado_style = "danger";
								}else if(val > 69 && val < 80){
							estado_gc = "Bueno";
							estado_style = "warning";
								}else if(val > 79 && val < 90){
							estado_gc = "Muy Bueno";	
							estado_style = "info";
								}else if(val > 89 && val < 101){
							estado_gc = "Excelente";
							estado_style = "success";
								}
								}else if(formato_registro == 5){
									if(val < pon){
								estado_gc = "No completado";
								estado_style = "danger";
									}else{
								estado_gc = "Completado";
								estado_style = "success";
									}
								}else if(formato_registro == 6){
										if(val < pon){
							  estado_gc = "NO APTO";
							  estado_style = "danger";
								  }else{
							  estado_gc = "APTO";
							  estado_style = "success";
								  }
              }
              
        $('#estado-' + $(this).attr('name')).text(estado_gc);
        $('#estado-' + $(this).attr('name')).attr('class', 'text-center font-weight-bold text-' + estado_style);

    $(this).parent().html('<span class="cambiar_total_gc" idpub="'+$(this).attr('name')+'" valc="'+$(this).attr('valc')+'" formato_registro="'+formato_registro+'" pon="'+pon+'">'+val+'</span>');

  
  });

})