$(document).ready(function () {

  var cdnfiles = $("#datos_js").attr("cdnfiles");
  var id_asignaturamf = $("#datos_js").attr("id_asignaturamf");
  var id_grupo = $("#datos_js").attr("id_grupo");
  var urlerd = $("#datos_js").attr("urlerd");
  var urlimgs = $("#datos_js").attr("urlimgs");
  var aarch = Number($("#datos_js").attr("aarch"));
  var target = Number($("#datos_js").attr("target"));
  var local = Number($("#datos_js").attr("local"));
  var taa = Number($("#datos_js").attr("taa"));
  
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
    /*"order": [[ 0, "asc" ]],*/
    columnDefs: [
      {
        targets: "no-sort",
        orderable: false,
      },
    ],
    language: {
      url: cdnfiles + "/assets/js/lib/data-table/spanish.json",
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
    "focus click",
    ".CalificacionesIL, .CalificacionesRP, .CalificacionesILFinales, .CalificacionesRA, .CalificacionesFCT, .Asistencias, .AsistenciasILFinales",
    function () {
      $("#datos_js").attr("reserva", $(this).val());

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
      $("#foto_est div").html(
        '<img style="border-radius: 10%;width:70px;height:70px;" src="' +
        es_foto +
        '"/> <a style="background-color: white;" class="border rounded p-2 ml-2" href="' +
        urlerd +
        "/index.php?sec=CalificacionEstudiante&id=" +
        tr.attr("ide") +
        '"' + target + '>' +
        es_nombre +
        " " +
        es_apellido +
        ", #" +
        es_numero +
        "</a>"
      );
      $("#foto_est div").css({ position: "fixed", "z-index": "2120", top: "0" });
      var fondo = $("#foto_est img").css({ border: "1px solid #2ECC71" }).show();
      setTimeout(function () {
        fondo.css({ border: "1px solid black" });
      }, 500);
      for (i = 0; i < 1; i++) {
        $("#foto_est img").fadeTo("slow", 0.5).fadeTo("slow", 1.0);
      }
      tr.css({ backgroundColor: "#F8CDAF" });
      $("[idc=c" + tr.attr("ide") + "]").css({ backgroundColor: "#F8CDAF" });
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
        console.log(e);
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
  });

  $(document).on("mousedown", "#foto_est", function (e) {
    var dr = $(this).addClass("drag").css("cursor", "move");
    height = dr.outerHeight();
    width = dr.outerWidth();
    (ypos = dr.offset().top + height - e.pageY),
      (xpos = dr.offset().left + width - e.pageX);
    $(document.body)
      .on("mousemove", function (e) {
        var itop = e.pageY + ypos - height;
        var ileft = e.pageX + xpos - width;
        if (dr.hasClass("drag")) {
          dr.offset({ top: itop, left: ileft });
        }
      })
      .on("mouseup", function (e) {
        dr.removeClass("drag");
      });
  });


  $(document).on("blur change", ".Asistencias, .AsistenciasILFinales", function () {
    var reserva = $("#datos_js").attr("reserva");
    var asistencia = $(this).val();
    var id_asistencia = $(this).attr("id_asistencia");
    var id = $(this).attr("id");
    id = id.split("-");
    var id_estudiante = id[0];
    var mes = id[1];
    var diames = $('#mes-' + mes).val();
    console.log(diames);
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
        console.log(e);
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
      $('#tablacal').css("max-width", "910px");
    }
    if (mwtn == 0) {
      $('#tablanotas').removeAttr('class');
      $('#tablanotas').attr("class", "tablanotas");
      $('#tablacal').css("max-width", "1105px");
    }
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

  });

  $(window).on("load", function () {
    
    setTimeout(function () {

    var calhtml = '<div class="row" style="position;relative;margin-bottom:-40px;;margin-left:-140px;width:225px;cursor:pointer;font-size:1.5rem;">';

  // calhtml += '<div id="sizecal" class="mt-2 font-weight-bold d-none d-md-inline-block mr-3" style="font-size:1rem" por="100">100%</div>';

  //  calhtml += '<div class="sizecal border d-none d-md-inline-block mr-3" size="r"><img src="'+urlimgs+'/reducir_fuente.png" rel="tooltip" title="Disminuir tama&ntilde;o" style="cursor:pointer;"></div>';

   // calhtml += '<div class="sizecal border d-none d-md-inline-block mr-3" size="a"><img src="'+urlimgs+'/aumentar_fuente.png" rel="tooltip" title="Aumentar tama&ntilde;o" style="cursor:pointer;"></div>';
    
    calhtml += '<div id="calcal" class="d-none d-md-inline-block mr-3"><i rel="tooltip" title="Calculadora" class="fa fa-calculator" aria-hidden="true" style="cursor:pointer;"></i></div>';
    
  if(taa == 2){
    
      calhtml += '<div id="cargar-asisencias" class="d-inline-block mr-3"><i rel="tooltip" title="Cargar toda la asistencia de archivo" class="fa fa-check-circle-o" aria-hidden="true"></i></div>';   
  }

      calhtml += '</div>';

    $('#TablaCalificaciones_filter').prepend(calhtml);

   
    }, 1000);


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
 $('.fototh').css({'min-width':'' + por/4 + 'px'});
 $('.nombre1th').css({'min-width':'' + por/3 + 'px'});
 
  
  })


  $(document).on('click', '#calcal, #cerrcal', function () {

    $("#dragit-contained").toggle("slow");

  });

  $(document).on('click', '#cargar-asisencias', function () {

    if (!confirm("Si desea hacerlo sólo para un mes específico, pulsa \"Cancelar\" y luego haga click sobre el nombre del mes. Tome en cuenta que, al darle a \"Confirmar\", reemplazará cualquier otra asistencia que haya puesto manual y se cargará todo desde la hoja de asistencia.")) {
      return false;
    }

    $('.Asistencias').trigger('blur');

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

  $(function () {
    $(".val").click(function (e) {
      e.preventDefault();
      var span = $(this).attr("data");
      $(".screen").append(span);
      $(".outcome").val($(".outcome").val() + span);
      return false;
    });

    $(".equal").click(function () {
      $(".outcome").val(eval($(".outcome").val()));
      var rdo = eval($(".outcome").val());
      if (rdo == 'Infinity') { rdo = '&infin;'; }
      if (rdo == '-Infinity') { rdo = '-&infin;'; }
      $(".screen").html(rdo);
    });

    $(".clear").click(function () {
      $(".outcome").val("");
      $(".screen").html("");
    });

    $(".min").click(function () {
      $(".cal").stop().animate({ width: "0px", height: "0px", marginLeft: "700px", marginTop: "1000px" }, 500);
      setTimeout(function () { $(".cal").css("display", "none") }, 600);
    });

    $(".close").click(function () {
      $(".cal").css("display", "none");
    })
  })

  $(document).on('click', '#vficha', function () {
    var ta = $(this).attr("ta");
    var t = $(this).attr("t");
    var clic = $(this).attr('click');
    $('#casi').html('');
       
    if (clic == "no") {

      if (t == 2) {
        $('#casi').html('<img src="' + urlimgs + '/asistencia.jpg" />');
      } else {
        if (ta == 0) {
          $('#casi').html('<img src="' + urlimgs + '/indicadores.jpg" />');
        } else {

          if (ta == 1) {
            $('#casi').html('<img src="' + urlimgs + '/ficha_ra1.jpg" /><br /><img src="' + urlimgs + '/ficha_ra2.jpg" /><br /><img src="' + urlimgs + '/ficha_ra3.jpg" />');
          } else {
            $('#casi').html('<img src="' + urlimgs + '/ficha_fct1.jpg" /><br /><img src="' + urlimgs + '/ficha_fct2.jpg" />');
          }

        }

      }


      $('#casi').css({ 'position': 'absolute', 'border': '2px solid #ccc', 'z-index': '400' });
      $("#casi").show("slow");

      $(this).attr('click', 'si');
      $(this).text("Ocultar ficha");
    } else if (clic == "si") {
      $("#casi").hide("slow");
      $(this).attr('click', 'no');
      $(this).text("Ver ficha");
    }

  });

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
              console.log(as);
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
        console.log(ias);
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
        console.log(a);
        console.log(b);
        console.log(c);
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
       // console.log(ides);
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
              $('#e_' + id).html('<input maxlength="2" size="2" class="AsistenciasLocalGG Asistencias fa-2x"" id="'+id+'-'+ mes +'" type="text" id_asistencia="" value="' + easis + '" autocomplete="off">');
            }
          })

        }

      })
      .fail(function () {

      })
  });

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
    if (cqr == 'matrix(4, 0, 0, 4, 0, 0)') {
      $(this).css({ 'transform': 'scale(1)', 'position': 'relative', 'top': '', 'left': '', 'margin': '' });
    } else {
      $(this).css({ 'transform': 'scale(4)', 'position': 'absolute', 'top': '50%', 'left': '50%', 'margin': 'auto' });
    }

  });


  $(document).on('click', '#activar-asistencia', function () {
    if (aarch == 0 && local != 1) {
      setTimeout(function () {
        $('#activar_asistencia').trigger('click');
      }, 1500);
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

  });

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

    var tarea_a = Number($("#tarea_a").val());

    $("#ttarea").val(suma);

    var trabn = $("#trabn").val();
    var trabn = trabn.split('-');
    var ra = trabn[1];
    var trabn = Number(trabn[3]);

    if (tarea_a == 2) {
      tpra = 10;
    } else {
      tpra = trabn;
    }

    if (trabn == 0) {

      tpra = nora;

    }

    if (tarea_a == 0) {
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

    if (tarea_a == 0) {
      $("#verindicor").attr('data-id', ra);
      $("#verindicor").text('Ver Indicador ' + ra);
    }

    $("#noradiv").text('');

    var btarea = 0;

    if (tarea_a == 1 || tarea_a == 2) {

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


    if (tarea_a == 0) {

      if (suma != 100 && ((tcomp == 0 && tprop == 0 && tcompprop == 0) || stcomp == 1)) {

        $("#mtarea").text('La suma debe completar los 100 puntos del indicador ' + ra);
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


  $(window).on("load", function () {
    var showinvgc = $('#teps').attr('showinvgc');
    if (showinvgc == 1) {
      $('#invgc').show();
    }
  });

  $('#largeModalNotaI').on('hidden.bs.modal', function () {
    $('body').addClass('modal-open');

  })

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
	});


  $(window).on("load", function () {

    $('#barra-des').attr('max', $('.dataTables_scrollBody')[0].scrollWidth);

  });

  $('#barra-des').on('input', function () {
    $('.dataTables_scrollBody').scrollLeft($(this).val());
  });

  $('#cerrar-barra').on('click', function () {
    $('#slidecontainer').removeAttr('display');
    $('#slidecontainer').hide('slow');
  });

});