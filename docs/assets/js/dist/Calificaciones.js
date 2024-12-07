$(document).ready(function () {

  var filescdn = $("#datos_js").attr("filescdn");
  var id_asignaturamf = $("#datos_js").attr("id_asignaturamf");
  var id_grupo = $("#datos_js").attr("id_grupo");
  var urlimgs = $("#datos_js").attr("urlimgs");
  var aarch = Number($("#datos_js").attr("aarch"));
  var id_sesion = Number($("#datos_js").attr("id_sesion"));
  var escuela_sesion = Number($("#datos_js").attr("escuela_sesion"));
  var asistencia_local = Number($("#datos_js").attr("asistencia_local"));
  var taa = Number($("#datos_js").attr("taa"));
  var datetype = $("#datos_js").attr("datetype");

  if(datetype == 'text'){
    var wdtt = -5;
  }else{
    var wdtt = 81;
  }
  
  var idlp = Number(document.cookie.replace(
    /(?:(?:^|.*;\s*)idples\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  ));

  if (idlp.length < 1) {
    var idlp = 7;
  }

  var bus = new URLSearchParams(
    document.location.search.substring(1)
  ).get("bus");

  window['tablec'] = $("#TablaCalificaciones").DataTable({
    order: [[0, "asc"]],
    fixedColumns: {
      leftColumns: 3,
    },
    scrollCollapse: true,
    bAutoWidth: false,
    orderCellsTop: true,
    fixedHeader: {
      header: true,
      footer: true,
    },
    scrollX: true,
    //  "oSearch": {"sSearch": bus},
    "order": [[ 0, "asc" ]],
    columnDefs: [
      {
        targets: "no-sort",
        orderable: false,
      },
    ],
    language: {
      url: filescdn + "/assets/js/lib/data-table/spanish.json",
    },
    lengthMenu: [
      [5, 7, 10, 20, 25, 30, 35, 50, -1],
      [5, 7, 10, 20, 25, 30, 35, 50, "Todos"],
    ],
    iDisplayLength: idlp,
  });

  $(document).on(
    "blur",
    "#TablaCalificaciones_wrapper select:first",
    function () {
      var idpl = $(this).val();
      document.cookie = "idples=" + idpl;
    }
  );


  $(document).on("click", "i.toggle-vis", function (e) {
    e.preventDefault();
    $("#columnas_me").text("");
    var tper = Number($("#columnas_me").attr("tper"));
    var tinds = Number($("#columnas_me").attr("tinds"));
    var icol = Number($(this).attr("data-column")) * tper + 7;
    var fcol = icol - tper;
    for (let i = icol; i > fcol; i--) {
      var column = tablec.column(i);
      column.visible(!column.visible());
    }

    var cols = "";
    for (let j = 1; j < tinds + 1; j++) {
      var ind = $(".show-ind-" + j).attr("data-id");
      if (!ind) {
        cols +=
          '<i style="cursor:pointer" class="toggle-vis text-info" data-column="' +
          j +
          '" aria-hidden="true">Indicador ' +
          j +
          "</i> | ";
      }
    }
    if (cols != "") {
      cols = cols.substring(0, cols.length - 3);
      $("#columnas_me").html(
        "<b>Mostrar indicador:</b> <span>" + cols + "</span>"
      );
    }
  });
  $(document).on(
    "click",
    "#cerrar-fotoest",
    function () {
      $("#foto_est").attr('show', 0);
      $("#foto_est").hide();
    });
  
  $(document).on(
    "focus click",
    ".CalificacionesIL, .CalificacionesRP, .CalificacionesILFinales, .CalificacionesRA, .CalificacionesFCT, .Asistencias, .AsistenciasILFinales",
    function () {
      $("#datos_js").attr("reserva", $(this).val());

      if($("#foto_est").attr('show') == 1){

      var tr = $(this).closest("tr");
      var es_foto = tr.find("img:first").attr("src");
      var es_numero = tr.find("td:first").text();
      var es_nombre = tr.find("td:first").next().next().text();

      var es_apellido = tr
        .find("td:first")
        .next()
        .next()
        .next()
        .next()
        .next()
        .text();
        var imgtop = $("#foto_est").css('top');
        if(imgtop == '1018.68px' || imgtop == 'auto'){
          imgtop = '140px';
        }
        $("#foto_est img").attr('src', es_foto);
        $("#foto_est span").html(es_nombre + ' ' + es_apellido + ', #' + es_numero);
        $("#foto_est").css({ position: "fixed", top: imgtop});
        
          $("#foto_est").show();
        }
        
    }
  );

  $(document).on(
    "blur",
    ".CalificacionesIL, .CalificacionesRP, .CalificacionesILFinales, .CalificacionesRA, .CalificacionesFCT, .Asistencias, .AsistenciasILFinales",
    function () {
      var tr = $(this).closest("tr");
      tr.css({ backgroundColor: "" });
      $("[idc=c" + tr.attr("ide") + "]").css({ backgroundColor: "" });
    }
  );

  $(document).on(
    "focus click",
    ".AsistenciasDias, .AsistenciasILFechaFinales",
    function () {
      $("#datos_js").attr("reserva", $(this).val());
    }
  );

  $(document).on(
    "keyup",
    ".AsistenciasDias",
    function () {
      var asistencia = $(this).val().replace(/[^\d]/g, "");
      $(this).val(asistencia);
    }
  );

  $(document).on(
    "keyup",
    ".Asistencias",
    function () {
      var asistencia = $(this).val().replace(/[^\d]/g, "");

      var dm = $(this).attr('id').split('-')[1];
      dm = Number($('#mes-' + dm).val());
      if (asistencia > 0 && asistencia > dm) {
        asistencia = dm;
      }
      $(this).val(asistencia);

      var nc = $(this).closest("tr").find("input").index(this);

      if (event.keyCode == 40) {
        var s = $(this).closest("tr").next().find("input").eq(nc);
        if (s.length == 0) {
          var s1 = $(this).closest("tr").next().next().find("input").eq(nc);
          if (s1.length == 0) {
            $(this)
              .closest("tr")
              .next()
              .next()
              .next()
              .find("input")
              .eq(nc)
              .focus();
          } else {
            s1.focus();
          }
        } else {
          s.focus();
        }
      }

      if (event.keyCode == 38) {
        var a = $(this).closest("tr").prev().find("input").eq(nc);
        if (a.length == 0) {
          var a1 = $(this).closest("tr").prev().prev().find("input").eq(nc);
          if (a1.length == 0) {
            $(this)
              .closest("tr")
              .prev()
              .prev()
              .prev()
              .find("input")
              .eq(nc)
              .focus();
          } else {
            a1.focus();
          }
        } else {
          a.focus();
        }
      }
    }
  );

  $(document).on("blur", ".AsistenciasDias", function () {
    var reserva = $("#datos_js").attr("reserva");
    var asistencia = $(this).val();
    var mes = $(this).attr("id").split("-")[1];
    var input = $(this);
    if (asistencia != reserva) {
      AsistenciasDias(asistencia, mes, input);
    }
  });

  function AsistenciasDias(asistencia, mes, input){
    
  $.ajax({
    method: "POST",
    url: "up.php?op=AsistenciasDias",
    dataType: "json",
    data: {
      asistencia: asistencia,
      mes: mes,
      id_asignaturamf: id_asignaturamf,
      id_grupo: id_grupo,
    },
  }).done(function (e) {
    
    if (e["exito"] == 1) {
      var color = "#2ECC71";
      PorcientoAsistenciasMes(mes);
    } else {
      var color = "red";
    }

    var fondo = $(input).css({ backgroundColor: color }).show();
    setTimeout(function () {
      fondo.css({ backgroundColor: "", color: "white" });
    }, 1500);
    for (h = 0; h < 2; h++) {
      $(input).fadeTo("slow", 0.5).fadeTo("slow", 1.0);
    }
  });

}
  $(document).on("blur change", ".Asistencias, .AsistenciasILFinales", function () {
    var reserva = $("#datos_js").attr("reserva");
    var asistencia = $(this).val();
    var id_asistencia = $(this).attr("id_asistencia");
    var id = $(this).attr("id");
    id = id.split("-");
    var id_estudiante = id[0];
    var mes = id[1];
    var diames = $('#mes-' + mes).val();
   
    var input = $(this);
    if (asistencia != reserva || $('#bactasis').attr('act') == 1) {
      $.ajax({
        method: "POST",
        url: "up.php?op=Asistencias",
        dataType: "json",
        data: {
          asistencia: asistencia,
          diames: diames,
          id_asistencia: id_asistencia,
          id_estudiante: id_estudiante,
          mes: mes,
          id_asignaturamf: id_asignaturamf,
          id_grupo: id_grupo,
        },
      }).done(function (e) {
        
        if (e["exito"] == 1 || e["exito"] == 2) {
          var color = "#2ECC71";
          if (e["exito"] == 1) {
            PorcientoAsistencia(input);
          }

        } else {
          var color = "red";
        }
        if (e["exito"] == 2) {
          input.val(asistencia);
        }
        if (id_asistencia > 0) {
        } else if (e["id_asistencia"] > 0) {
          input.attr("id_asistencia", e["id_asistencia"]);
        }
        var fondo = $(input).css({ backgroundColor: color }).show();
        setTimeout(function () {
          fondo.css({ backgroundColor: "", color: "black" });
        }, 1500);
        for (h = 0; h < 2; h++) {
          $(input).fadeTo("slow", 0.5).fadeTo("slow", 1.0);
        }
      });
    }
  });

  function PorcientoAsistencia(input) {

    tm = 0;
    $('.dataTables_scrollHeadInner .AsistenciasDias:input').each(function () {
      tm += Number($(this).val());
    });

    var tre = input.closest("tr").find('.Asistencias:input');
    var tem = 0;
    tre.each(function () {
      tem += Number($(this).val());
    });
    var e = input.attr('id').split('-')[0];
    var por = Number(parseFloat(tem / tm * 100).toFixed(0));
    $('#poras-' + e).text(por + '%');

  }

  function PorcientoAsistenciasMes(m) {
    $('.Asistencias').each(function () {
      var input = $(this);
      var mes = input.attr('id').split('-')[1];
      if (mes == m) {
        PorcientoAsistencia(input);
      }
    });
  }


  $(document).on('change', '#genrep_sel', function () {
    if ($(this).val() != '') {
      $("#genrep").prop('disabled', false);
    } else {
      $("#genrep").prop('disabled', true);
    }
  });

  $(document).on('click', '#genrep', function () {
    if ($('#genrep_sel').val() == 0) {

      if (!confirm("Dependiendo del la cantidad de módulos o asignaturas el proceso puede tardar. ¿Desea continuar?")) {
        return false;
      }
    }
  });

  $(document).on('change', '#genpag_sel', function () {
    if ($(this).val() != '') {
      $("#genpag").prop('disabled', false);
    } else {
      $("#genpag").prop('disabled', true);
    }
  });

  $(document).on('click', '#menuToggle', function () {
    var mwtn = $(".open").length;
    if (mwtn == 1) {
      $('#tablanotas').removeAttr('class');
      $('#tablanotas').attr("class", "tablanotas2");
    }
    if (mwtn == 0) {
      $('#tablanotas').removeAttr('class');
    $('#tablanotas').attr("class", "tablanotas");
    }

      $("#tablanotas").css("max-width", ($("#get-width").width() + wdtt) + 'px');

      
        $('#adjustcol').trigger('click');
        $('#adjustcol').trigger('click');
  });

  $(document).on('click', '#pantcom', function () {
    $('#tablanotas').removeAttr('class');
    $('#tablanotas').attr("class", "tablanotasfull");
    $("select[name=TablaCalificaciones_length]").val("7");
    $("select[name=TablaCalificaciones_length]").change();
    $('#pantmin').css("display", "block");
    $('body').css("overflow", "hidden");
    $('tfoot').show();
    $('#dragit-contained').css("top", "-165px");
    $("#tablanotas").css("max-width", 'unset');

  });

  $(document).on('click', '#pantmin', function () {
    var mwtn = $(".open").length;
    if (mwtn == 1) {
      $('#tablanotas').removeAttr('class');
      $('#tablanotas').attr("class", "tablanotas2");
    }
    if (mwtn == 0) {
      $('#tablanotas').removeAttr('class');
      $('#tablanotas').attr("class", "tablanotas");
    }
    $("select[name=TablaCalificaciones_length]").val("7");
    $("select[name=TablaCalificaciones_length]").change();
    $('#pantmin').css("display", "none");
    $('#tfootc').css("display", "none");
    $('body').css("overflow", "auto");
    $('tfoot').hide();
    $('#dragit-contained').css("top", "350px");
    $("#tablanotas").css("max-width", '800px');
    $("#tablanotas").css("max-width", ($("#get-width").width() - 5) + 'px');

  });

  $(window).on("load", function () {
    
    setTimeout(function () {

    var calhtml = '<di class="row text-center" style="cursor:pointer">';

   calhtml += '<div id="sizecal" class="p-2 font-weight-bold d-none d-md-inline-block mr-3" por="100" style="font-size:1.3rem">100%</div>';

    calhtml += '<div class="sizecal d-none d-md-inline-block mr-3" size="r"><img src="'+urlimgs+'/reducir_fuente.png" rel="tooltip" title="Disminuir tama&ntilde;o" class="border mt-2" style="width:25px;cursor:pointer;"></div>';

    calhtml += '<div class="sizecal d-none d-md-inline-block mr-3" size="a"><img src="'+urlimgs+'/aumentar_fuente.png" rel="tooltip" title="Aumentar tama&ntilde;o" class="border mt-2" style="width:25px;cursor:pointer;"></div>';
          
  if(taa == 1){
    
      calhtml += '<div class="d-inline-block mr-3" data-toggle="modal" data-target="#FiltroSituacion"><i rel="tooltip" title="Filtrar por Situaci&oacute;n del estudiante" class="fa fa-filter" aria-hidden="true"></i></div>';
  }

      calhtml += '</div>';

    $('#TablaCalificaciones_length').parent().attr('class', 'col-sm-12 col-md-4');
    $('#TablaCalificaciones_length').parent().after('<div class="col-sm-12 col-md-3">' + calhtml + '</div>');
    $('#TablaCalificaciones_filter').parent().attr('class', 'col-sm-12 col-md-5');
    

   
    }, 1000);


  })

  $(document).on('click', '.filtro-situacion', function () {
   
    $("#TablaCalificaciones_length select[name=TablaCalificaciones_length]").val("-1");
    $("#TablaCalificaciones_length select[name=TablaCalificaciones_length]").change();

    var filtro_val = $(this).val();
    var filtro = $(this).prop("checked");

    setTimeout(function () {

    if(filtro == true){
      $('.' + filtro_val).each(function () {
        $(this).parent().parent().hide();
        $(".DTFC_Cloned tr[ide*='" + $(this).parent().parent().attr('ide') + "']" ).hide();
      })

      }else{
      $('.' + filtro_val).each(function () {
      $(this).parent().parent().show();
      $(".DTFC_Cloned tr[ide*='" + $(this).parent().parent().attr('ide') + "']" ).show();
    })
      }

    $("#TablaCalificaciones_length select[name=TablaCalificaciones_length]").val("-1");
    $("#TablaCalificaciones_length select[name=TablaCalificaciones_length]").change();
    
    var checks = 0;

    $('.filtro-situacion').each(function () {
      if($(this).prop("checked") == true){
        checks++;
      }
    })

    if(checks > 0){
      $('#TablaCalificaciones_info').parent().parent().hide();
    }else{
      $('#TablaCalificaciones_info').parent().parent().show();
    }

      }, 500);

  })

  $(document).on('click', '.sizecal', function () {
  var por = Number($('#sizecal').attr('por'));
  var size = $(this).attr('size');
 
  if(size == 'a' && por >= 10 && por < 291){
    $('#sizecal').attr('por', por + 10);
    $('#sizecal').text((por + 10) + '%');
  }else if(size == 'r' && por > 10 && por <= 300){
    $('#sizecal').attr('por', por - 10);
    $('#sizecal').text((por - 10) + '%');
  }
  
  var por = Number($('#sizecal').attr('por'));
 $('#TablaCalificaciones tbody td').css({'font-size':'' + por*60/10000 + 'rem'});
 $('#TablaCalificaciones_wrapper tbody td').css({'font-size':'' + por*60/10000 + 'rem'});
 $('#TablaCalificaciones_wrapper tbody td .foto-estudiantep').css({'width':'' + por + '%', 'height':'' + por + '%'});
 $('#TablaCalificaciones_wrapper tbody td .foto-estudiantep').parent().css({'width':'' + por/4 + 'px'});
 $('#TablaCalificaciones tbody td .foto-estudiantep').parent().css({'width':'' + por/4 + 'px'});
 $('#TablaCalificaciones tbody td input').css({'width':'' + por*0.36 + 'px', 'height':'' + por*0.28 + 'px', 'font-size':'' + por*60/6000 + 'rem'});
 $('#TablaCalificaciones tbody td select').css({'width':'' + por*0.68 + 'px', 'height':'' + por*0.38 + 'px', 'font-size':'' + por*60/8000 + 'rem'});
 $('.fototh').css({'min-width':'' + por/4 + 'px'});
 $('.nombre1th').css({'min-width':'' + por/3 + 'px'});
 $("select[name=TablaCalificaciones_length]").change();

 $('#TablaCalificaciones thead th').css({'font-size':'' + por*60/10000 + 'rem'});
 $('#TablaCalificaciones_wrapper thead th').css({'font-size':'' + por*60/10000 + 'rem'});
 $('#TablaCalificaciones thead th input').css({'width':'' + por*0.36 + 'px', 'height':'' + por*0.28 + 'px', 'font-size':'' + por*60/6000 + 'rem'});
 $('#TablaCalificaciones_wrapper thead th input').css({'width':'' + por*0.36 + 'px', 'height':'' + por*0.28 + 'px', 'font-size':'' + por*60/6000 + 'rem'});
 $('#TablaCalificaciones thead th .AsistenciasILFechaFinales').css({'width':'' + por*0.73 + 'px', 'height':'' + por*0.38 + 'px', 'font-size':'' + por*60/6000 + 'rem'});
 $('#TablaCalificaciones_wrapper thead th .AsistenciasILFechaFinales').css({'width':'' + por*0.72 + 'px', 'height':'' + por*0.38 + 'px', 'font-size':'' + por*60/6000 + 'rem'});

 $(".sizecal[size=a] img").show();
  if($('#sizecal').text() == '300%'){
    $(".sizecal[size=a] img").hide();
  }

  $(".sizecal[size=r] img").show();
  if($('#sizecal').text() == '10%'){
    $(".sizecal[size=r] img").hide();
  }
  })


  $(document).on('click', '#cerrcal', function () {

    $("#dragit-contained").toggle("slow");

  });

  $(document).on('mousedown', '#dragit-contained, #foto_est', function (e) {

    var dr = $(this).addClass("drag").css("cursor", "move");
    height = dr.outerHeight();
    width = dr.outerWidth();
    ypos = dr.offset().top + height - e.pageY,
      xpos = dr.offset().left + width - e.pageX;
    $(document.body).on('mousemove', function (e) {
      var itop = e.pageY + ypos - height;
      var ileft = e.pageX + xpos - width;
      if (dr.hasClass("drag")) {
        dr.offset({ top: itop, left: ileft });
      }
    }).on('mouseup', function (e) {
      dr.removeClass("drag");
    });
  });

  $(document).on('click', '.val', function (e) {
      
      e.preventDefault();
      var span = $(this).attr("data");
      $(".screen").append(span);
      $(".outcome").val($(".outcome").val() + span);
      return false;
    });

      $(document).on('click', '.equal', function (e) {
      $(".outcome").val(eval($(".outcome").val()));
      var rdo = eval($(".outcome").val());
      if (rdo == 'Infinity') { rdo = '&infin;'; }
      if (rdo == '-Infinity') { rdo = '-&infin;'; }
      $(".screen").html(rdo);
    });

      $(document).on('click', '.clear', function (e) {
      $(".outcome").val("");
      $(".screen").html("");
    });

      $(document).on('click', '.min', function (e) {
      $(".cal").stop().animate({ width: "0px", height: "0px", marginLeft: "700px", marginTop: "1000px" }, 500);
      setTimeout(function () { $(".cal").css("display", "none") }, 600);
    });

    $(document).on('click', '.close', function (e) {
      $(".cal").css("display", "none");
    })

  $(document).on('click', '#activar_asistencia', function () {

    $("#activar_asistencia").prop('disabled', true);

    var e = $(this).attr('e');
    var tdm = $(this).attr('tdm');

    $.ajax({
      method: "POST",
      url: "sesion.php?op=ActivarAsistencia",
      data: {
        op: "ActivarAsistencia",
        sec: "ActivarAsistencia",
        a: id_asignaturamf,
        g: id_grupo,
        e: e,
        tdm: tdm
     }
    })
      .done(function (ac) {
        if (ac == 1) {
          $('#msj_asistencia').html('Espere...');
          $('#activar_asistencia').html('<i class="fa fa-3x" aria-hidden="true">Activando...</i>');
          $.ajax({
            method: "POST",
            url: "sesion.php?op=ActivarAsistencia",
            dataType: 'json',
            data: $("#form_asis").serialize()
          })
            .done(function (as) {
              
              $('#msj_asistencia').html(as['msj']);
              if (as['si'] == 1) {
                $('#activar_asistencia').hide('slow');
                $('#archivoxlsx').val(as['archivoxlsx']);
                $('#linksheet').attr('href', 'https://docs.google.com/spreadsheets/d/' + as['archivoxlsx'] + '/edit');
                $('#linksheet').show('slow');
                setTimeout(function () {
                  $('#AsistenciaActivadaGC').hide('slow');
                  $('.AsistenciaGC').show('slow');
                }, 5000);

              } else {
                $('#activar_asistencia').html('<i class="fa fa-3x" aria-hidden="true">Intentar de nuevo</i>');
                $("#activar_asistencia").prop('disabled', false);
              }
            });

        } else {
          $('#msj_asistencia').html(ac + '<span class="text-warning font-weight-bold">&iexcl;No se pudo activar!</span>');
          $('#activar_asistencia i').text('Intentar de nuevo');
          $("#activar_asistencia").prop('disabled', false);
        }
      });

  });


  $(document).on('click', '.basis', function () {

    var estado = $(this).attr('estado');

    if (estado == 'P') {
      $(this).children('.bestado').attr('class', 'btn btn-xl btn-danger fa fa-4x bestado');
      $(this).children('.bestado').val('A');
      $(this).attr('estado', 'A');
    }

    if (estado == 'A') {
      $(this).children('.bestado').attr('class', 'btn btn-xl btn-info fa fa-4x bestado');
      $(this).children('.bestado').val('E');
      $(this).attr('estado', 'E');
    }

    if (estado == 'E') {
      $(this).children('.bestado').attr('class', 'btn btn-xl btn-warning fa fa-4x bestado');
      $(this).children('.bestado').val('T');
      $(this).attr('estado', 'T');
    }

    if (estado == 'T') {
      $(this).children('.bestado').attr('class', 'btn btn-xl btn-primary fa fa-4x bestado');
      $(this).children('.bestado').val('P');
      $(this).attr('estado', 'P');
    }

    $(this).children('.estado').val($(this).attr('estado'));

  });

  $(document).on('click', '#insertar_asistencia', function () {
    $("#insertar_asistencia").prop('disabled', true);
    $('#insertar_asistencia i').text(' Registrando...');
    $.ajax({
      method: "POST",
      url: "sesion.php?op=InsertarAsistencia",
      dataType: 'json',
      data: $("#formasis").serialize()
    })
      .done(function (ias) {
        
        $('#msjasistencia').html(ias['msj']);
        if (ias['si'] == 2) {
          $('#insertar_asistencia i').text(' Pulse de nuevo para registrar la asistencia');
          $("#insertar_asistencia").prop('disabled', false);
          $('#linksheet').attr('href', ias['urlexcel']);
          $('#linksheet').show('slow');
        }else if (ias['si'] == 1) {
          $('#insertar_asistencia i').text(' Registrar');
          setTimeout(function () {
            $('#largeModalAsistencia').modal('hide');
            $("#insertar_asistencia").prop('disabled', false);
            $('#msjasistencia').html('');
          }, 5000);

        } else {
          $('#insertar_asistencia i').text(' Intentar de nuevo');
          $("#insertar_asistencia").prop('disabled', false);
        }
      })

      .fail(function (a,b,c) {
        
      })

  });


  $(document).on('click', '.asis_datos', function () {

    var mes = $(this).attr("mes");
    var archivoxlsx = $('#archivoxlsx').val();
    $('#tmes').text($(this).text());
    $('.casillasasis input').remove();
    $('#msj_asistencia_mes').text('');
    $.ajax({
      method: "POST",
      url: "sesion.php?op=ImportarAsistencia",
      dataType: 'json',
      data: {
        op: "ImportarAsistencia",
        sec: "ImportarAsistencia",
        mes: mes,
        archivoxlsx: archivoxlsx
      }
    })
      .done(function (ides) {
       
        if (ides['error'] != '' && ides['error'] != undefined) {
          $('#msj_asistencia_mes').html(ides['error']);
        } else {

          var ri_a = $('#mes-'+mes).val();
          if (ides[0] < ri_a) {
            var ri = ri_a;
          } else {
            var ri = ides[0];
            $('#mes-'+mes).val(ri);
          }
          $('#diast').text(ri);
          $.each(ides, function (id, easis) {
            if (id != 0) {
              $('#e_' + id).html('<input maxlength="2" size="2" class="AsistenciasLocalGG Asistencias fa-2x"" id="'+id+'-'+ mes +'" type="text" id_asistencia="" value="' + easis + '" autocomplete="off" />');
            }
          })

        }

      })
      .fail(function () {

      })
  });
  
  $(document).on('change', '#dia_asistencia', function () {
    $('.basis').children('.bestado').val('P');
    $('.basis').attr('estado', 'P');
    $('.basis').children('.bestado').attr('class', 'btn btn-xl btn-primary fa fa-4x bestado');
    ImportarDiaAsistencia ();
  });
  
 function ImportarDiaAsistencia () {
  $('#insertar_asistencia i').text(' Registrar');
  var dia = $('#dia_asistencia').val();
  var archivoxlsx = $('#archivoxlsx').val();
  $.ajax({
    method: "POST",
    url: "sesion.php?op=ImportarDiaAsistencia",
    dataType: 'json',
    data: {
      op: "ImportarDiaAsistencia",
      sec: "ImportarDiaAsistencia",
      dia: dia,
      archivoxlsx: archivoxlsx
    }
  })
    .done(function (ides) {
      
      if(ides != null && ides['data'] != null && ides['e'] == 1){
        $('#msjasistencia').html(ides['data']);
      }else if(ides != null && ides['data'] != null){
        var a = 0;
      $.each(ides['data'], function (id, estado) {
        if (id != 0 && (estado == 'P' || estado == 'A' || estado == 'E' || estado == 'T')) {

      $('#ea_' + id).children('.bestado').val(estado);
      $('#ea_' + id).attr('estado', estado);
          
    if (estado == 'P') {
      $('#ea_' + id).children('.bestado').attr('class', 'btn btn-xl btn-primary fa fa-4x bestado');
    }

    if (estado == 'A') {
      $('#ea_' + id).children('.bestado').attr('class', 'btn btn-xl btn-danger fa fa-4x bestado');
    }

    if (estado == 'E') {
      $('#ea_' + id).children('.bestado').attr('class', 'btn btn-xl btn-info fa fa-4x bestado');
    }

    if (estado == 'T') {
      $('#ea_' + id).children('.bestado').attr('class', 'btn btn-xl btn-warning fa fa-4x bestado');
    }

    $('#ea_' + id).children('.estado').val(estado);
      a++;
        }
      })
      if(a > 0){
      $('#insertar_asistencia i').text(' Actualizar asistencia');
      }
    }
    });
  }

  $(document).on('click', '#bactasis', function () {

    $(this).attr('act','1');
    
    $('.AsistenciasLocalGG').trigger("blur");
    
    $(this).removeAttr('act');
    
    });


  $(document).on('click', '#msj_grp_menu', function () {

    $("#form_msj").toggle("slow");

  });


  $(document).on('click', '#mensaje_grupo', function () {

    //$("#mensaje_grupo").prop('disabled', true);	

    var msj_grupo = $('#msj_grupo').val();
    var id_classroom = $('#id_classroom').val();

    $.ajax({
      method: "POST",
      url: "sesion.php?op=MensajeGrupo",
      dataType: 'json',
      data: {
        op: "MensajeGrupo",
        sec: "MensajeGrupo",
        id_classroom: id_classroom,
        msj_grupo: msj_grupo
      }
    })
      .done(function (m) {

        if (m['si'] == 1) {
          $("#form_msj").toggle("slow");
          $('#mensaje_grupo').html('<i class="fa fa-bullhorn" aria-hidden="true"></i> Enviar mensaje');
          $('#id_classroom').val('');
          setTimeout(function () {
            $('#msj_grupo_aviso').text('');
          }, 6000);
        } else {
          $('#mensaje_grupo').html('<i class="fa fa-bullhorn" aria-hidden="true"></i> Intentar de nuevo');
        }

        $('#msj_grupo_aviso').html(m['msj']);

      })

  });

  $('#copcodgc').click(function () {
    $(this).focus();
    $(this).select();
    document.execCommand('copy');
    $("#cpcdgc").show().fadeOut(1200);
  });

  $(document).on('click', '#qr-gc', function () {
    var cqr = $(this).css('transform');
      if (cqr == 'matrix(2.5, 0, 0, 2.5, 0, 0)') {
      $(this).css({ 'transform': 'scale(1)', 'position': 'relative', 'top': '', 'left': '', 'margin': '' });
    } else {
        $(this).css({ 'transform': 'scale(2.5)', 'position': 'absolute', 'top': '50%', 'left': '50%', 'margin': 'auto' });
    }

  });


  $(document).on('click', '#activar-asistencia', function () {
    if (aarch == 0 && asistencia_local != 1) {
      setTimeout(function () {
        $('#activar_asistencia').trigger('click');
      }, 1500);
    }else{
      ImportarDiaAsistencia();
    }
  });

  $(document).on('click', '#ev_menu', function () {
    $('.soloasigleft').attr('class', 'col-12 border soloasigleft');
    $(".soloasigright").hide("slow");
    if ($(this).attr('zm') == 1 && $(this).attr('gc') == 0) {
      $('#virtual_ev_zm').trigger('click');
    }
  });

  $(document).on('change', '#tipo_ev', function () {
    if ($(this).val() == 1) {
      $('.soloasigleft').attr('class', 'col-12 border soloasigleft');
      $(".soloasigright").hide("slow");
    } else {
      $('.soloasigleft').attr('class', 'col-7 border soloasigleft');
      $(".soloasigright").show("slow");
    }
  });

  $(window).on("load", function () {
    var showinvgc = $('#teps').attr('showinvgc');
    if (showinvgc == 1) {
      $('#invgc').show();
    }
  });

  $('#largeModalNotaI').on('hidden.bs.modal', function () {
    $('body').addClass('modal-open');

  })
/*
  $(window).scroll(function () {
    var display = $('#slidecontainer').attr('display');
    if(display == 1){
		var scrls_info = $("#TablaCalificaciones_info").offset().top - 575;
    var scrls_table = $("#TablaCalificaciones").offset().top - 400;
		var wscrl = $(window).scrollTop();
		if (wscrl > scrls_info) {
      $('#slidecontainer').hide();
		}else if (wscrl > scrls_table) {
			$('#slidecontainer').show();
		}else{
      $('#slidecontainer').hide();
    }
  }
	});*/

  if(datetype == 'text'){

  $(window).on("load", function () {

    $('#barra-des').attr('max', $('.dataTables_scrollBody')[0].scrollWidth);

  });

}

  $('#barra-des').on('input', function () {
    $('.dataTables_scrollBody').scrollLeft($(this).val());
  });

  $('#cerrar-barra').on('click', function () {
    $('#slidecontainer').removeAttr('display');
    $('#slidecontainer').hide('slow');
  });

  const ruletawebfirebaseConfig = {
    apiKey: "AIzaSyA9eJxcrKP8r4YuteGpfvQRTQxdj6ORqFg",
    authDomain: "escuelard.edu.do",
    databaseURL: "https://web-escuelard-default-rtdb.firebaseio.com",
    projectId: "web-escuelard",
    storageBucket: "web-escuelard.appspot.com",
    messagingSenderId: "948522304281",
    appId: "1:948522304281:web:4ccbd164a1dac6ddf03b88"
    };

  
      const ruletaweb = firebase.initializeApp(ruletawebfirebaseConfig, "ruletaweb");

  
  $(document).on('click', '.iconHerramienta', function () {

    var herr = $(this).attr('herramienta');
    
    if(herr == 'HAsistencias'){

    if (!confirm("Si desea hacerlo sólo para un mes específico, pulsa \"Cancelar\" y luego haga click sobre el nombre del mes. Tome en cuenta que, al darle a \"Confirmar\", reemplazará cualquier otra asistencia que haya puesto manual y se cargará todo desde la hoja de asistencia.")) {
      return false;
    }

    $('.Asistencias').trigger('blur');
    $('.dataTables_scrollHeadInner .AsistenciasDias:input').each(function () {
    var asistencia = $(this).val();
    var mes = $(this).attr("id").split("-")[1];
    var input = $(this);
    AsistenciasDias(asistencia, mes, input);
    $('#herramientasModal').modal('hide');
    });

  }else{
    
    var titulo_asignaturamf = $("#datos_js").attr("titulo_asignaturamf");
    var titulo_grupo = $("#datos_js").attr("titulo_grupo");
    var listaruleta = $("#teps").attr("lista_ruleta");
    var incluir_grado = 0;
    var grado_grupo = '';

      if(herr == 'HDestacados'){
    
    var year_1 = Number($("#datos_js").attr("year_1"));
    var year_2 = Number($("#datos_js").attr("year_2"));
    var lmeritorio = Number($("#datos_js").attr("lmeritorio"));
    var cmeritorios = Number($("#datos_js").attr("cmeritorios"));
    var tperiodos_escuela = Number($("#datos_js").attr("tperiodos_escuela"));
    var grado_grupo = $("#datos_js").attr("grado_grupo");
    
    if($('#incluir-grado').prop("checked") && $('#incluir-grado').attr("incluir-grado") == 0){
      incluir_grado = 1;
    }else{
      incluir_grado = 0;
    }
    
      $('#destacadosModal').modal('hide');

      $('#incluir-grado').attr("incluir-grado", incluir_grado);

     }

   
    
    $.ajax({
      method: "POST",
      url: "up.php?op=" + herr,
      data: {titulo_asignaturamf: titulo_asignaturamf, listaruleta: listaruleta, titulo_grupo: titulo_grupo, id_asignaturamf: id_asignaturamf, id_grupo: id_grupo, year_1: year_1, year_2: year_2, lmeritorio: lmeritorio, cmeritorios: cmeritorios, tperiodos_escuela: tperiodos_escuela, id_asignaturamf: id_asignaturamf, incluir_grado: incluir_grado, grado_grupo: grado_grupo}
    })
      .done(function (cont) {
        
       $('#contenidoHerraminetas').html(cont);
       $('#herramientasModal').modal('hide');

       if(herr == 'HDestacados'){
        if(cont != ''){
          $('#destacadosModal').modal('show');
          $('#HDestacados').show();
        }else{
          $('#HDestacados').hide();
        }
       }

        if(herr == 'HCalculadora'){
          $("#dragit-contained").toggle("slow");
        }

        if(herr == 'HRuleta'){
          

          $('#ruletaModal').modal('show');

          function listaActualizadaRuleta()
          {

         if($('#eliminar-ruleta').prop("checked") && $('#resultado-ruleta').text() != ''){
            
           var lista_ruleta = $('#' + $("#teps").attr("tipo_ruleta")).val().replace($('#resultado-ruleta').text(), "");
          
          }else{
            var lista_ruleta = $('#' + $("#teps").attr("tipo_ruleta")).val();
          }
           
          var lista = lista_ruleta.split(/\r?\n/).filter(function(elista) {
            return elista.trim() !== '';
          });

          if(lista.length < 2){
            $('.button-ruleta').hide();
          }else{
            $('.button-ruleta').show();
          }

          $('#opcs-ruleta').text(lista.length + ' opciones');

          $('#' + $("#teps").attr("tipo_ruleta")).val(lista.join('\n'));
          
          //document.cookie = $("#teps").attr("tipo_ruleta") + '=' + lista.join('-');
          ruletaweb.database().ref('ruletas/' + $("#teps").attr("tipo_ruleta")).set(lista.join('-'));
			    
          return lista;
          
          }

    let canvas = $("#ruleta-ruleta")[0];
		let context = canvas.getContext("2d");
		let center = canvas.width / 2;
		let pos_ini = 0;
		let speed = 30;
		let deceleration = 0.99;
		let movement;
		let clic = 0;
		let lastAspa = -1;
		
		const sonidoruleta = $("#sonido-ruleta")[0];
		const sonidoapuntador = $("#sonido-apuntador")[0];

    const voz = new SpeechSynthesisUtterance();
		voz.lang = 'es-DO';

    var val_ruleta = $('#' + $("#teps").attr("tipo_ruleta")).val();

    $(document).on('click', '.blur_ruleta', function () {
      val_ruleta = $(this).val();
    });

    $(document).on('blur', '.blur_ruleta', function () {
      if(val_ruleta != $(this).val()){
   drawRoulette();
      }

  });

    $(document).on('click', '.ops-ruleta', function () {
     $("#teps").attr("tipo_ruleta", 'r-' + escuela_sesion + '-' + id_sesion + '-' + id_grupo + '-' + id_asignaturamf + '-' + $(this).attr("tipo"));
     drawRoulette();
  ngm
    });

    $(document).on('click', '.recargar-lista', function () {

      //document.cookie = $("#teps").attr("tipo_ruleta") + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT';
      ruletaweb.database().ref('ruletas/' + $("#teps").attr("tipo_ruleta")).remove();
      $('#' + $("#teps").attr("tipo_ruleta")).val($("#teps").attr("lista_ruleta").split('-').join('\n'));
      drawRoulette();
  
    });

		function drawRoulette() {
			context.beginPath();
			context.moveTo(center, center);
			context.arc(center, center, center, 0, 2 * Math.PI);
			context.lineTo(center, center);
			context.fillStyle = '#33333333';
			context.fill();

			context.beginPath();
			context.moveTo(center, center);
			context.arc(center, center, center - 10, 0, 2 * Math.PI);
			context.lineTo(center, center);
			context.fillStyle = 'black';
			context.fill();

      var lista_ruleta = listaActualizadaRuleta();

			for (let i = 0; i < lista_ruleta.length; i++) {
				context.beginPath();
				context.moveTo(center, center);
				context.arc(center, center, center - 20, i * 2 * Math.PI / lista_ruleta.length, (i + 1) * 2 * Math.PI / lista_ruleta.length);
				context.lineTo(center, center);
				context.fillStyle = random_color();
				context.fill();

				context.save();
				context.translate(center, center);
				context.rotate(3 * 2 * Math.PI / (5 * lista_ruleta.length) + i * 2 * Math.PI / lista_ruleta.length);
				context.translate(-center, -center);
				context.font = "10px Arial";
				context.textAlign = "right";
				context.fillStyle = "white";
				context.fillText(lista_ruleta[i], canvas.width - 30, center);
				context.restore();
			}
		}

		function reproducirSonido() {
      var lista_ruleta = listaActualizadaRuleta();
			let anguloActual = (pos_ini % 360);
			let aspaActual = Math.floor((anguloActual / 360) * lista_ruleta.length);

			if (aspaActual !== lastAspa) {
				sonidoruleta.play(); 
				lastAspa = aspaActual;
			}
		}

		function sortear() {
      drawRoulette();
      $("#resultado-ruleta").parent().hide();
			let girando = $("#estado-ruleta").attr('girando');
			if (girando == 1) {
				speed = 0.01;
			}

			if (clic == 0) {
				movement = setInterval(function () {
					pos_ini += speed;
					$("#ruleta-ruleta").css('transform', 'rotate(' + pos_ini + 'deg)');
					speed *= deceleration; 
					
					reproducirSonido(); 

					if (speed <= 0.1) {
						sonidoapuntador.play(); 
						clearInterval(movement);
						speed = 30; 
						clic = 0;
            var lista_ruleta = listaActualizadaRuleta();
						let angulo_final = (pos_ini % 360) * (Math.PI / 180);
						let indice_estudiante = Math.floor((2 * Math.PI - angulo_final) / (2 * Math.PI / lista_ruleta.length)) % lista_ruleta.length;
						let estudiante_ruleta = lista_ruleta[indice_estudiante];
						voz.text = estudiante_ruleta.replace("#", "número");
  						window.speechSynthesis.speak(voz);
  						voz.onend = function (event) {
 						 window.speechSynthesis.cancel(); 
  						}
						$("#resultado-ruleta").text(estudiante_ruleta);
            $("#resultado-ruleta").parent().show('slow');
						$("#estado-ruleta").text("Girar").attr('girando', 0);
					} else {
						$("#estado-ruleta").text("Detener").attr('girando', 1);
					}
				}, 20);
				clic = 1;
			}
		}

		function random_color() {
			let ar_digit = ['2', '3', '4', '5', '6', '7', '8', '9'];
			let color = '';
			let i = 0;
			while (i < 6) {
				let pos = Math.round(Math.random() * (ar_digit.length - 1));
				color += ar_digit[pos];
				i++;
			}
			return '#' + color;
		}

		drawRoulette();

		$("#estado-ruleta").on('click', function() {
			sortear();
		});
          
        }
        
      })

      .fail(function (a,b,c) {
       
      })

    }

  });

    $(window).on("load", function () {
    setTimeout(function () {
      $("#tablanotas").css("max-width", ($("#get-width").width() + wdtt) + 'px');
        $('#adjustcol').trigger('click');
        $('#adjustcol').trigger('click');
      }, 700);
    
    })
  

});