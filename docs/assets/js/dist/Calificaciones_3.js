$(document).ready(function () {
  
var ponderacion_academica = $("#datos_js").attr("ponderacion_academica");
var ponderacion_asistencia = $("#datos_js").attr("ponderacion_asistencia");
var id_asignaturamf = $("#datos_js").attr("id_asignaturamf");
var id_grupo = $("#datos_js").attr("id_grupo");
var year_1 = $("#datos_js").attr("year_1");
var year_2 = $("#datos_js").attr("year_2");
var rpp = Number($("#datos_js").attr("rpp"));
var taa = Number($("#datos_js").attr("taa"));
var grupos_competencias = Number($("#datos_js").attr("grupos_competencias"));
var tperiodos_escuela = $("#datos_js").attr("tperiodos_escuela");
var tiponota = $("#datos_js").attr("tipo_nota");

$(document).on("click", ".CasillasIL", function () {
  var periodo = $(this).attr("periodo");
  var orden = $(this).attr("orden");
  var click = $(this).attr("click");
  var comp = $(this).attr("comp");

  if (click == "no") {
    $(this).attr("click", "si");
    $(this).css({ color: "#ccc", "font-size": "1em", "font-weight": "normal" });
    $(".celdas-" + orden + "-" + periodo + "-input" + " input").hide();
    $('.pegarNota[ref="' + comp + '-' + periodo + '"]').removeAttr('activo');
    $('.dictarNota[ref="' + comp + '-' + periodo + '"]').hide();
    $('.pegarBotones[ref="' + comp + '-' + periodo + '"]').hide();
  }

  if (click == "si") {
    $(this).attr("click", "no");
    $(this).css({
      color: "white",
      "font-size": "1.5em",
      "font-weight": "bold",
    });

        $(".celdas-" + orden + "-" + periodo + "-input input").show("slow");
        $('.pegarNota[ref="' + comp + '-' + periodo + '"]').attr('activo', 1);
        $('.pegarBotones[ref="' + comp + '-' + periodo + '"]').show();
        $('.dictarNota[ref="' + comp + '-' + periodo + '"]').show();

        
    $.each(
          $(".celdas-" + orden + "-" + periodo + "-input input"),
      function () {
        RevaluaIL($(this).attr("id"));
      }
    );

    var sel = $("#TablaCalificaciones_wrapper select:first");
    var vsel = sel.val();
     sel.val('-1'); 
     sel.change();

    $.each($(".celdas-" + orden + "-" + periodo), function (i, input) {
      
      $(this).html(
        '<input class="CalificacionesIL" maxlength="3" size="2" id="' +
          $(this).closest("tr").attr("ide") +
          "-" +
          orden +
          "-" +
          periodo +
          '" value="" autocomplete="off" value="" />'
      );
      var fondo = $(this).css({ backgroundColor: "#2ECC71" }).show();
      setTimeout(function () {
        var id_nota = $(this).find("input:first").attr("id");
        RevaluaIL(id_nota);
        fondo.css({ backgroundColor: "", color: "white" });
      }, 2000);
      for (h = 0; h < 3; h++) {
        $(this).fadeTo("slow", 0.5).fadeTo("slow", 1.0);
      }
          $(this).removeClass("celdas-" + orden + "-" + periodo);
          $(this).addClass("celdas-" + orden + "-" + periodo + "-input");
    });
    sel.val(vsel); 
    sel.change();
  }
});

$(document).on("blur", ".CalificacionesIL", function () {
  var reserva = $("#datos_js").attr("reserva");
  var nota = $(this).val();
      $(this).attr('value', nota);
  var id_nota = $(this).attr("id_nota");
  var id = $(this).attr("id").split("-");
  var id_estudiante = id[0];
  var tipo_nota = tiponota + "-" + id[1] + "-" + id[2];
  var input = $(this);
  if (nota != reserva) {
    $.ajax({
      method: "POST",
      url: "up.php?op=Calificaciones",
      dataType: "json",
      data: {
        nota: nota,
        id_nota: id_nota,
        id_estudiante: id_estudiante,
        tipo_nota: tipo_nota,
        pra: 100,
        id_asignaturamf: id_asignaturamf,
        id_grupo: id_grupo,
        year_1: year_1,
        year_2: year_2,
      },
    }).done(function (e) {
      
      if (e["exito"] == 1) {
        var color = "#2ECC71";
        input.parent().attr('notap', nota);
      } else {
        var color = "red";
      }
      if (id_nota > 0) {
      } else if (e["id_nota"] > 0) {
        input.attr("id_nota", e["id_nota"]);
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

$(document).on("keyup change", ".CalificacionesILFinales", function () {
  var id_estudiante = $(this).closest("tr").attr("ide");
  RevaluaILFinal(id_estudiante);
});

$(document).on("blur", ".CalificacionesILFinales", function () {
  var reserva = $("#datos_js").attr("reserva");
  var nota = $(this).val();
  var id_nota = $(this).attr("id_nota");
  var id_estudiante = $(this).closest("tr").attr("ide");
  var tipo_nota = $(this).attr("name");
  var pra = 100;
  var input = $(this);
 
  if (nota != reserva) {
    $.ajax({
      method: "POST",
      url: "up.php?op=Calificaciones",
      dataType: "json",
      data: {
        nota: nota,
        id_nota: id_nota,
        id_estudiante: id_estudiante,
        pra: pra,
        tipo_nota: tipo_nota,
        id_asignaturamf: id_asignaturamf,
        id_grupo: id_grupo,
            year_1: year_1,
        year_2: year_2,
      },
    }).done(function (e) {
    
      if (e["exito"] == 1) {
        var color = "#2ECC71";
      } else {
        var color = "red";
      }
      if (id_nota > 0) {
      } else if (e["id_nota"] > 0) {
        input.attr("id_nota", e["id_nota"]);
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

$(document).on(
  "keyup change",
  ".CalificacionesIL, .CalificacionesRP, .CalificacionesILFinales",
  function (event) {
    var nota = $(this).val().replace(/[^\d]/g, "");
    if (nota.length > 2 && nota != 100) {
      nota = nota.substring(0, nota.length - 1);
    }
    $(this).val(nota);
    var id_nota = $(this).attr("id");
    RevaluaIL(id_nota);
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


function RevaluaILFinal(id_estudiante) {
  var pcp = Number($("#pcp" + id_estudiante).text());
  
  $("#cf" + id_estudiante).html(
    '<i class="btn btn-sm btn-danger fa fa-ban" aria-hidden="true"> Reprobada</i>'
  );

  var aae = Number($("#aa" + id_estudiante).attr("aae"));

  if (pcp >= ponderacion_academica && aae >= ponderacion_asistencia) {
    
    $("#cf" + id_estudiante).html(
      '<i class="btn btn-sm btn-success fa fa-trophy" aria-hidden="true"> Aprobada (G)</i>'
    );
  
  }else{

    var cpcp = Number($("#cpcp" + id_estudiante).text());
    var cpc = $("#cpc" + id_estudiante).val();
    var ccpc = Number(cpc / 2);
    var cc = Number(cpcp) + Number(ccpc);
    cc = cc.toFixed(0);
    $("#cc" + id_estudiante).text(cc);

    if (Number(cc) >= ponderacion_academica) {

      $("#cf" + id_estudiante).html(
        '<i class="btn btn-sm btn-success fa fa-trophy" aria-hidden="true"> Aprobada (C)</i>'
      );

      $("#tcpc" + id_estudiante).text('');
      $("#cpex" + id_estudiante).attr("type", "hidden");
      $("#scpex" + id_estudiante).text("");
      $("#cex" + id_estudiante).text('');

      $("#cco1" + id_estudiante).attr("type", "hidden");
      $("#co1" + id_estudiante).text("");

    }else{

      var tcpc = Number(pcp * 0.3);
      tcpc = tcpc.toFixed(0);
      $("#tcpc" + id_estudiante).text(tcpc);
      $("#cpex" + id_estudiante).attr("type", "text");
      var cpex = Number($("#cpex" + id_estudiante).val());
      var scpex = Number(cpex * 0.7);
      scpex = scpex.toFixed(0);
      $("#scpex" + id_estudiante).text(scpex);
      var cex = Number(tcpc) + Number(scpex);
      $("#cex" + id_estudiante).text(cex);

      if (Number(cex) >= ponderacion_academica) {
        $("#cf" + id_estudiante).html(
          '<i class="btn btn-sm btn-success fa fa-trophy" aria-hidden="true"> Aprobada (E)</i>'
        );
        $("#cco1" + id_estudiante).attr("type", "hidden");
        $("#co1" + id_estudiante).text("");
      }else{

        var cco1 = Number($("#cco1" + id_estudiante).val());
        var co1 = Number((cco1 / 100) * (100 - pcp) + pcp);
        co1 = co1.toFixed(0);
        $("#cco1" + id_estudiante).attr("type", "text");
        $("#co1" + id_estudiante).text(co1);
        if (Number(co1) >= ponderacion_academica) {
          $("#cf" + id_estudiante).html(
            '<i class="btn btn-sm btn-success fa fa-trophy" aria-hidden="true"> Aprobada (O)</i>'
          );
        

      }
    

    }


    }
  
  }

}

if(taa == 0){

$(document).on("keyup change", ".CalificacionesRP", function () {
  var id_nota = $(this).attr("id");
  RevaluaRP(id_nota);
});

$(document).on("blur", ".CalificacionesRP", function () {
  var reserva = $("#datos_js").attr("reserva");
  var nota = $(this).val();
  var id_nota = $(this).attr("id_nota");
  var id = $(this).attr("id").split("-");
  var id_estudiante = id[0];
  var tipo_nota = "p-" + id[1] + "-" + id[2];
  var input = $(this);
  if (nota != reserva) {
    $.ajax({
      method: "POST",
      url: "up.php?op=Calificaciones",
      dataType: "json",
      data: {
        nota: nota,
        id_nota: id_nota,
        id_estudiante: id_estudiante,
        tipo_nota: tipo_nota,
        pra: 100,
        id_asignaturamf: id_asignaturamf,
        id_grupo: id_grupo,
        year_1: year_1,
        year_2: year_2,
      },
    }).done(function (e) {
      
      if (e["exito"] == 1) {
        var color = "#2ECC71";
        SumaPCs();
      } else {
        var color = "red";
      }
      if (id_nota > 0) {
      } else if (e["id_nota"] > 0) {
        input.attr("id_nota", e["id_nota"]);
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
  
  window.VerRecuperacion = function () {
    tablec.columns('.indicadores_logro').visible(false, false);
    tablec.columns('.recuperacion_pedagogica').visible(true, false);
    tablec.columns.adjust().draw(false);
    $("#columnas_me").text("");
    $('#VerRecuperacion').removeAttr("rpp");
    $('#VerRecuperacion').attr("class", 'btn btn-lg btn-block btn-dark');
    $('#VerIndicadores').attr("class", 'btn btn-lg btn-block btn-secondary');
    CalcularComptencias();
    $('#barra-des').attr('max', $('.dataTables_scrollBody')[0].scrollWidth);
    $("#datos_js").attr("rpp", 1);
    }
  
    window.CalcularComptencias = function () {
   //$('.SumaPeriodoCompetencia').trigger('click');
   $.each(
     $(".SumaPeriodoCompetencia"),
     function () {
      SumaPeriodoCompetencia($(this));
     });
    $.each(
     $(".CalificacionesRP"),
     function () {
       RevaluaRP($(this).attr("id"));
       SumaPs($(this).attr("id"));
  
     });
     SumaPCs(); 
    }
  
   window.VerIndicadores = function () {
    tablec.columns('.indicadores_logro').visible(true, false);
    tablec.columns('.recuperacion_pedagogica').visible(false, false);
    tablec.columns.adjust().draw(false);
   $("#columnas_me").text("");
   $('#VerRecuperacion').attr("rpp", '1');
   $('#VerRecuperacion').attr("class", 'btn btn-lg btn-block btn-secondary');
   $('#VerIndicadores').attr("class", 'btn btn-lg btn-block btn-dark');
   $('#barra-des').attr('max', $('.dataTables_scrollBody')[0].scrollWidth); 
   $("#datos_js").attr("rpp", 0);
      
  }

  function verT(col, per){
    var cells = tablec.cells('.indicadores_logro').nodes();
    const comps = {};
    cells.each(function (cell) {
    var cel = $(cell);
    var notap = Number(cel.attr('notap'));
    if(notap > 0){
   if(cel.attr('class').split(' ') != undefined){
       icp = cel.attr('class').split(' ')[3].split('-'); 
   if(icp[2] == col && icp[3] == per){
    if (comps[cel.attr('class').split(' ')[3]]) {
      comps[cel.attr('class').split(' ')[3]] += 1;
  } else {
      comps[cel.attr('class').split(' ')[3]] = 1;
  }
   }
  }
    }
    });
    var n =  Number.MIN_VALUE;
    $.each(comps, function(comp, o) {
    if (o > n) {
      n = o;
    }
  
  });

  return n;
    
  }
   
  $(document).on('click', '.SumaPeriodoCompetencia', function () {
    SumaPeriodoCompetencia($(this));
   });

   window.SumaPeriodoCompetencia = function (ths) {
    var col = ths.attr('col');
    var per = ths.attr('id').split('-')[3];
    var ide = ths.closest("tr").attr("ide");
  
    var cells = tablec.cells('.comp-' + ide + '-'+ col + '-' + per).nodes();
  
    var suma = 0;
    var n = 0;
    cells.each(function (cell) {
      var sumap = Number($(cell).attr('notap'));
      if(sumap > 0){
      suma += sumap;
      n++;
      }
      
    });
    
   // var ti = verT(col, per);
  //  if(suma > 0 && ti == n){
      if(suma > 0){
      var suma = Number(parseFloat(suma / n).toFixed(0));
      ths.text(suma);
    }
    
   };

window.RevaluaRP = function (id_nota) {

  var nota = Number($("#" + id_nota).val());
  var permiso = $("#" + id_nota).attr("op");
  var notap = Number($('#comp-'+id_nota).text());

  $("#" + id_nota).prop("readonly", false);
  $("#" + id_nota).removeAttr("disabled");
   $("#" + id_nota).prop("type", "text");

  if (permiso == 1) {
    $("#" + id_nota).removeAttr("style");
    $("#" + id_nota).css({
      "background-color": "inherit",
      color: "black",
      "font-weight": "bold",
      border: "0px",
    });
    $("#" + id_nota).prop("readonly", true);
  } else {
    if (notap == '' || notap == 0 || notap >= ponderacion_academica) {
      $("#comp-" + id_nota + '-rp').attr("data-content", notap);
      $("#" + id_nota).prop("readonly", true);
      $("#" + id_nota).removeAttr("style");
      $("#" + id_nota).css({'background-color':'inherit','color':'transparent','border':'1px solid #ccc'});
      setTimeout(function () {
       $("#" + id_nota).prop("disabled", "disabled");
       $("#" + id_nota).prop("type", "hidden");
      }, 1000);
    }else if ((nota != 0) || nota > 100) {
      $("#" + id_nota).removeAttr("style");
      $("#" + id_nota).css({
        "background-color": "#FF7B5A",
        color: "white",
        "font-weight": "bold",
      });
    } else {
      $("#" + id_nota).removeAttr("style");
    }
  }

}

 $(document).on('click', '#VerRecuperacion', function () {
   if($(this).attr("rpp") == 1){
     VerRecuperacion();
   }
 });
 
 $(document).on('click focus', '#TablaCalificaciones_paginate, #TablaCalificaciones_paginate .pagination', function () {
  CalcularComptencias();
});
 
   $(window).on("load", function () {
     if(rpp == 1){
    //   VerRecuperacion();
     }else{
      // VerIndicadores();
     }
   });

  $(document).on('click', '#VerIndicadores', function () {
    if($('#VerRecuperacion').attr("rpp") != 1){
      VerIndicadores();
    }
  }); 

  $(document).on('mousedown change keyup', '.CalificacionesRP', function () {
   SumaPs($(this).attr("id"));
  $('#comp-'+$(this).attr("id")+'-rp').popover('dispose').popover('show');
  });
  
  window.SumaPs = function (id_nota) {
  
    var notap = Number($('#comp-'+id_nota).text());

    if(notap < ponderacion_academica && notap > 0){

      var p = id_nota.split('-')[2];
      var nota = Number($("#" + id_nota).val());
      
      var tp = notap + (nota / 100 * (100 - notap));

      setTimeout(function () {
        var id_popover = $('#comp-'+id_nota+'-rp').attr('aria-describedby');
        $('#' + id_popover).css({'font-size': '2rem','font-weight': 'bold'});
      }, 100);

      tp = Number(parseFloat(tp).toFixed(0));
  
      $('#comp-'+id_nota+'-rp').attr('data-content', '<div class="row p-0 m-0 text-left"><div class="col-5 recuperacion-nota-tp p-0 m-0 text-right">' + tp + '</div><div class="col-7 recuperacion-nota p-0 m-0 text-left">= ' + notap + ' + <div class="fraccion"><span class="dividendo">' + parseFloat((nota / 100 * (100 - notap))).toFixed(0) + '</span><span class="barra">/</span><span class="divisor">' + (100 - notap) + '</span></div></div></div>');
        
      $('#comp-'+id_nota+'-rp').attr('tp', 'RP'+p);
    
    }else if(notap > 0){
      
      $('#comp-'+id_nota+'-rp').attr('data-content', nota);
      $('#comp-'+id_nota+'-rp').attr('tp', 'P'+p);

    }else{
      
      $('#comp-'+id_nota+'-rp').attr('data-content', '');
      $('#comp-'+id_nota+'-rp').removeAttr('tp');
      
    }

  }

  window.SumaPCs = function () {
    var tpers = Number($("#columnas_me").attr("tper"));
    var pcs = new Array();
    var psgs = new Array();

    $.each(
      $(".SumaCompetencia"),
      function () {
        var ide = $(this).closest("tr").attr("ide");
        for (col=1; col < grupos_competencias + 1; col++) { 
          pcs[col] = 0;
          psgs[col] = 0;
        }
        var npcs = new Array();
        
         for (col=1; col < grupos_competencias + 1; col++) { 
        for (p=1; p < tpers + 1; p++) {
          var data_content = Number($('#comp-' + ide + '-' + col + '-' + p + '-rp').attr('data-content'));
          pcs[col] += data_content;
          if(data_content == 0){
            npcs[col] = 1;
          }else{
            npcs[col] = 0;
          }
         
          if(Number($('#comp-' + ide + '-' + col + '-' + p).text()) > 0){
            psgs[col] += 1;
          }

          }
          
        }

       // if(psgs == grupos_competencias){
        var comps = '';
        var cf = 0;
        var pc = new Array();
        var gscs = 0;
        for (col=1; col < grupos_competencias + 1; col++) {
        if(psgs[col] == tperiodos_escuela){
        pc[col] = Number(parseFloat(pcs[col] / tperiodos_escuela).toFixed(1));
       
        if(pc[col] > 0){
          gscs++;
        }

        cf += pc[col];

             if(pc[col] == 0){
          comps += col + ', ';
          pc[col] = ''; 
              }

            //  if(npcs[col] <= 0){
              $('#pc'+ col + '-' + ide).text(pc[col]); 
            //  }

            

        }
        }
        
        if(gscs == grupos_competencias){

        var cf = Number(parseFloat(cf / grupos_competencias).toFixed(0));

          if(comps != ''){
        if(comps.substring(0, 1) == ','){
            comps = comps.substring(comps.length, 1);
        }
            $('#cf-'+ide).attr('title', '<strong class="text-warning">Esperando las competencias: </strong><br />' + comps);

            cf = '';
            
          }else if(cf < ponderacion_academica){
              $('#cf-'+ide).css({
            "background-color": "#FF7B5A",
            color: "white",
            "font-weight": "bold",
          });

          $('#cf-'+ide).attr('title', '<strong class="text-danger">&iexcl;No superada!</strong><br />(Revisar evaluaciones finales)');

        }else{
            $('#cf-'+ide).attr('title', '<strong class="text-warning">&iexcl;Calificaci&oacute;n superada!</strong><br />(Revisar asistencia)');
          }

          $('#cf-'+ide).text(cf);

       }

      });


  }

}

function RevaluaIL(id_nota) {
  var nota = Number($("#" + id_nota).val());
  var permiso = $("#" + id_nota).attr("op");

  var width = $("#" + id_nota).css("width");
  var height = $("#" + id_nota).css("height");
  var font_size = $("#" + id_nota).css("font-size");

  if (permiso == 1) {
    $("#" + id_nota).removeAttr("style");
    $("#" + id_nota).css({
      "background-color": "inherit",
      color: "black",
      "font-weight": "bold",
      border: "0px",
    });
    $("#" + id_nota).prop("readonly", true);
  } else {
    if ((nota < ponderacion_academica && nota != 0) || nota > 100) {
      $("#" + id_nota).removeAttr("style");
      $("#" + id_nota).css({
        "background-color": "#FF7B5A",
        color: "white",
        "font-weight": "bold",
      });
    } else {
     $("#" + id_nota).removeAttr("style");
    }
  }

  $("#" + id_nota).css({
    "width": width,
    "height": height,
    "font-size": font_size
  });


}

$(document).on("click", ".indtop", function () {
  $("#incom_text").text("Cargando...");
  var o = $(this).attr("data-id");
  $("#incom_text").html($(".indtop" + o).html());
  $('body').css("overflow", "auto");
});

$(document).on("change blur", ".AsistenciasILFechaFinales", function () {
  var reserva = $("#datos_js").attr("reserva");
  var fecha = $(this).val();
  var tipo = $(this).attr("name");
  var input = $(this);
  if (fecha != reserva) {
    $.ajax({
      method: "POST",
      url: "up.php?op=AsistenciasILFechaFinales",
      data: {
        fecha: fecha,
        tipo: tipo,
        id_asignaturamf: id_asignaturamf,
        id_grupo: id_grupo,
      },
    }).done(function (e) {
      if (e == 1) {
        var color = "#2ECC71";
        input.val(fecha);
        input.focus();
       // input.setSelectionRange(2, 5);
      } else {
        var color = "red";
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

$(document).on("click", ".CalificacionesILGC", function () {
  var reserva = $("#datos_js").attr("reserva");
  var nota = $(this).attr('valgc');
  var id_nota = $(this).attr("id_nota");
  var id = $(this).attr("id").split("-");
  var id_estudiante = id[0];
  var tipo_nota = tiponota + "-" + id[1] + "-" + id[2];
  var input = $(this);
  if (nota != reserva) {
    $.ajax({
      method: "POST",
      url: "up.php?op=Calificaciones",
      dataType: "json",
      data: {
        nota: nota,
        id_nota: id_nota,
        id_estudiante: id_estudiante,
        tipo_nota: tipo_nota,
        pra: 100,
        id_asignaturamf: id_asignaturamf,
        id_grupo: id_grupo,
        year_1: year_1,
        year_2: year_2,
      },
    }).done(function (e) {
      if (e["exito"] == 1) {
        var color = "#2ECC71";
        input.text('Publicada');
        input.attr('class', 'btn btn-sm btn-success');
      } else {
        var color = "red";
        input.text('Error');
        input.attr('class', 'btn btn-sm btn-danger CalificacionesILGC');
      }
      if (id_nota > 0) {
      } else if (e["id_nota"] > 0) {
        input.attr("id_nota", e["id_nota"]);
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

$(document).on('click', '#CalificacionesGCTodas', function () {

  $('.CalificacionesILGC').trigger("click");
      $('.CalificacionesRPGC').trigger("click");
                    
    });

    $(document).on("click", ".CalificacionesRPGC", function () {
      var reserva = $("#datos_js").attr("reserva");
      var nota = $(this).attr('valgc');
      var id_nota = $(this).attr("id_nota");
      var id = $(this).attr("id").split("-");
      var id_estudiante = id[0];
      var tipo_nota = "p-" + id[1] + "-" + id[2];
      var input = $(this);
      if (nota != reserva) {
        $.ajax({
          method: "POST",
          url: "up.php?op=Calificaciones",
          dataType: "json",
          data: {
            nota: nota,
            id_nota: id_nota,
            id_estudiante: id_estudiante,
            tipo_nota: tipo_nota,
            pra: 100,
            id_asignaturamf: id_asignaturamf,
            id_grupo: id_grupo,
            year_1: year_1,
            year_2: year_2,
          },
        }).done(function (e) {
          if (e["exito"] == 1) {
            var color = "#2ECC71";
            input.text('Publicada');
            input.attr('class', 'btn btn-sm btn-success');
          } else {
            var color = "red";
            input.text('Error');
            input.attr('class', 'btn btn-sm btn-danger CalificacionesRPGC');
          }
          if (id_nota > 0) {
          } else if (e["id_nota"] > 0) {
            input.attr("id_nota", e["id_nota"]);
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


    $(document).on("click", ".CalificacionesILFinalesGC", function () {
      var reserva = $("#datos_js").attr("reserva");
      var nota = $(this).attr('valgc');
      var id_nota = $(this).attr("id_nota");
      var id = $(this).attr("id").split("-");
      var id_estudiante = id[0];
      var tipo_nota = id[1];
      var input = $(this);
      if (nota != reserva) {
        $.ajax({
          method: "POST",
          url: "up.php?op=Calificaciones",
          dataType: "json",
          data: {
            nota: nota,
            id_nota: id_nota,
            id_estudiante: id_estudiante,
            tipo_nota: tipo_nota,
            pra: 100,
            id_asignaturamf: id_asignaturamf,
            id_grupo: id_grupo,
            year_1: year_1,
            year_2: year_2,
          },
        }).done(function (e) {
          if (e["exito"] == 1) {
            var color = "#2ECC71";
            input.text('Publicada');
            input.attr('class', 'btn btn-sm btn-success');
          } else {
            var color = "red";
            input.text('Error');
            input.attr('class', 'btn btn-sm btn-danger CalificacionesILFinalesGC');
          }
          if (id_nota > 0) {
          } else if (e["id_nota"] > 0) {
            input.attr("id_nota", e["id_nota"]);
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

  $(function () {
    $('[data-toggle="popover"]').popover()
  })

});