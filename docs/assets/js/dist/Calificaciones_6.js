$(document).ready(function () {

    var id_asignaturamf = $("#datos_js").attr("id_asignaturamf");
    var id_grupo = $("#datos_js").attr("id_grupo");
    var year_1 = $("#datos_js").attr("year_1");
    var year_2 = $("#datos_js").attr("year_2");

    $(document).on("click", ".CasillasFCT", function () {
       
        var click = $(this).attr("click");
        var rat = $(this).attr("pra");
      
        if (click == "no") {
          $(this).attr("click", "si");
          $(this).css({ color: "#ccc" });
          $(".celdas-fct-" + rat + "-1-input input").hide();
          $(".celdas-fct-" + rat + "-2-input input").hide();
          $(".celdas-fct-" + rat + "-3-input input").hide();
        }
      
        if (click == "si") {
          $(this).attr("click", "no");
          $(this).css({
            color: "white"
          });
      
          $(".celdas-fct-" + rat + "-1-input input").show("slow");
          $(".celdas-fct-" + rat + "-2-input input").show("slow");
          $(".celdas-fct-" + rat + "-3-input input").show("slow");
          
          for (let i = 1; i < 4; i++) {
          $.each(
            $(".celdas-fct-" + rat + "-" + i + "-input input"),
            function (j, input) {
             RevaluaFCT($(this).attr("id"));
            }
          );
            }
        
          var sel = $("#TablaCalificaciones_wrapper select:first");
          var vsel = sel.val();
           sel.val('-1'); 
           sel.change();

            for (let i = 1; i < 4; i++) {
          $.each($(".celdas-fct-" + rat + "-" + i), function (j, input) {
            $(this).html(
              '<input class="CalificacionesFCT" maxlength="3" size="2" id="' +
              $(this).closest("tr").attr("ide") +
              '-' +
              rat +
              '-' + i + '" value="" autocomplete="off">'
            );
            var fondo = $(this).css({ backgroundColor: "#2ECC71" }).show();
            setTimeout(function () {
              fondo.css({ backgroundColor: "", color: "white" });
            }, 2000);
            for (h = 0; h < 3; h++) {
              $(this).fadeTo("slow", 0.5).fadeTo("slow", 1.0);
            }
            $(this).attr("class", "celdas-fct-" + rat + "-" + i + "-input");
          });

            }

          sel.val(vsel); 
          sel.change();
        }
      });
      
$(document).on('keyup change', '.CalificacionesFCT', function () {
     
    var val = $(this).val();

				if(val.length > 3  && val != 10){
			var val = 10;
				}
				
			var idc = $(this).attr('id');
			
				setTimeout(()=>{
			var val = $('#'+idc).val();
			var val = Number.parseFloat(val).toFixed(1);
				if(val.length > 3  && val != 10){
			var val = 10;
				}
				if(!isNaN(val)){
			$('#'+idc).val(val);
				}
				},3500);
			
			var val = $(this).val();
			
			var val = val.replace(/[^0-9.]/g,"");
			
				if(val > 10){
			var val = 10;
				}

			$(this).val(val);

			RevaluaFCT(idc);

    var nc = $(this).closest('tr').find("input").index(this);
    
    if(event.keyCode == 40){
    var s = $(this).closest('tr').next().find('input').eq(nc);
        if(s.length == 0){
    var s1 = $(this).closest('tr').next().next().find('input').eq(nc);
            if(s1.length == 0){
        $(this).closest('tr').next().next().next().find('input').eq(nc).focus();
            }else{
        s1.focus();	
            }
        }else{
    s.focus();
        }
    }
    
    if(event.keyCode == 38){
    var a = $(this).closest('tr').prev().find('input').eq(nc);
        if(a.length == 0){
    var a1 = $(this).closest('tr').prev().prev().find('input').eq(nc);
            if(a1.length == 0){
        $(this).closest('tr').prev().prev().prev().find('input').eq(nc).focus();
            }else{
        a1.focus();
            }
        }else{
    a.focus();
        }
    }
});

$(document).on("blur", ".CalificacionesFCT", function () {
    var reserva = $("#datos_js").attr("reserva");
    var nota = $(this).val();
    var id_nota = $(this).attr("id_nota");
    var id = $(this).attr("id").split("-");
    var id_estudiante = id[0];
    var tipo_nota = "t-" + id[1] + "-" + id[2];
    var pra = '10';
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
          pra: pra,
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


function RevaluaFCT(idc){

    var ponderacion_fct = $("#datos_js").attr("ponderacion_fct");

    var id = idc.split('-');	
        
        var ra1 = id[0] + '-' + id[1] + '-1';
        var ra2 = id[0] + '-' + id[1] + '-2';
        var ra3 = id[0] + '-' + id[1] + '-3';
    
    var ra_1 = Number($('#'+ra1).val());
    var ra_2 = Number($('#'+ra2).val());
    var ra_3 = Number($('#'+ra3).val());
    
    if((ra_1 < ponderacion_fct * 10 && ra_1 != 0) || ra_1 > 10){
$('#'+ra1).removeAttr('style');
$('#'+ra1).css({'background-color':'#FF7B5A','color':'white','font-weight': 'bold'});
        }else{
$('#'+ra1).removeAttr('style');
        }
        
        if((ra_2 < ponderacion_fct * 10 && ra_2 != 0) || ra_2 > 10){
$('#'+ra2).removeAttr('style');
$('#'+ra2).css({'background-color':'#FF7B5A','color':'white','font-weight': 'bold'});
        }else{
$('#'+ra2).removeAttr('style');
        }
        
        if((ra_3 < ponderacion_fct * 10 && ra_3 != 0) || ra_3 > 10){
$('#'+ra3).removeAttr('style');
$('#'+ra3).css({'background-color':'#FF7B5A','color':'white','font-weight': 'bold'});
        }else{
$('#'+ra3).removeAttr('style');
        }
        
        var op1 = $('#'+ra1).attr('op');
        
        if(op1 == 1){
    $('#'+ra1).removeAttr('style');
    $('#'+ra1).css({'background-color':'inherit','color':'black','font-weight':'bold','border':'0px'});
    $('#'+ra1).prop("readonly", true);
        }
        
    var op2 = $('#'+ra2).attr('op');
        
        if(op2 == 1){
    $('#'+ra2).removeAttr('style');
    $('#'+ra2).css({'background-color':'inherit','color':'black','font-weight':'bold','border':'0px'});
    $('#'+ra2).prop("readonly", true);
        }
        
var op3 = $('#'+ra3).attr('op');
        
        if(op3 == 1){
    $('#'+ra3).removeAttr('style');
    $('#'+ra3).css({'background-color':'inherit','color':'black','font-weight':'bold','border':'0px'});
    $('#'+ra3).prop("readonly", true);
        }
        
        
}

$(document).on("click", ".CalificacionesFCTGC", function () {
  var reserva = $("#datos_js").attr("reserva");
  var nota = $(this).attr('valgc');
  var id_nota = $(this).attr("id_nota");
  var id = $(this).attr("id").split("-");
  var id_estudiante = id[0];
  var tipo_nota = "t-" + id[1] + "-" + id[2];
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
        pra: 10,
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
        input.attr('class', 'btn btn-sm btn-danger CalificacionesFCTGC');
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

  $('.CalificacionesFCTGC').trigger("click");
                
  });

});