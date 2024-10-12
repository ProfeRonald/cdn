$(document).ready(function () {

var id_asignaturamf = $("#datos_js").attr("id_asignaturamf");
var id_grupo = $("#datos_js").attr("id_grupo");
var ponderacion_tecnica = $("#datos_js").attr("ponderacion_tecnica");
var year_1 = $("#datos_js").attr("year_1");
var year_2 = $("#datos_js").attr("year_2");

 $(document).on("click focus", ".CalificacionesRAPra", function () {
    $("#datos_js").attr("reserva", $(this).val());

 });

 $(document).on('keyup change', '.CalificacionesRAPra', function () {
    var val = $(this).val().replace(/[^\d]/g,"");
    $(this).val(val);
});

$(document).on('blur', '.CalificacionesRAPra', function () {
    var pra = $(this).val();
    var reserva = $("#datos_js").attr("reserva");
    var input = $(this);
    if(pra > 0 && pra != reserva){
        var ra = $(this).attr("id").split('-')[1];
     $.ajax({
                  method: "POST",	
                  url: "up.php?op=CalificacionesRAPra",
                  dataType: "json",
                  data: {
                    pra: pra,
                    id_asignaturamf: id_asignaturamf,
                    id_grupo: id_grupo,
                    ra: ra
                  }
                    })
                  .done(function(e){
                    console.log(e);
                    if (e["exito"] == 1) {
                        var color = "#2ECC71";
                        $('.CalificacionesRA').trigger('change');
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
                  })
                
                }

            

            var cas = input.attr('pra');
            
            if(cas == 0 && pra > 0){

             var sel = $("#TablaCalificaciones_wrapper select:first");
             var vsel = sel.val();
              sel.val('-1'); 
              sel.change();

                $.each($(".celdas-" + ra), function (i, input) {
                    console.log($(this).closest("tr").attr("ide"));
                    $(this).html(
                      '<input class="CalificacionesRA" maxlength="2" size="2" id="' + $(this).closest("tr").attr("ide") + '-' + ra + '-1" value="" autocomplete="off"> - <input class="CalificacionesRA" maxlength="2" size="2" id="' + $(this).closest("tr").attr("ide") + '-' + ra + '-2" value="" autocomplete="off"> - <input class="CalificacionesRA" maxlength="2" size="2" id="' + $(this).closest("tr").attr("ide") + '-' + ra + '-3" value="" autocomplete="off"> - <input class="CalificacionesRA" maxlength="2" size="2" id="' + $(this).closest("tr").attr("ide") + '-' + ra + '-4" value="" autocomplete="off">'
                    );
                    var fondo = $(this).css({ backgroundColor: "#2ECC71" }).show();
                    setTimeout(function () {
                      fondo.css({ backgroundColor: "", color: "white" });
                    }, 2000);
                    for (h = 0; h < 3; h++) {
                      $(this).fadeTo("slow", 0.5).fadeTo("slow", 1.0);
                    }
                    $(this).attr("class", "celdas-" + ra);
                  });

                  sel.val(vsel); 
                  sel.change();
            }

        });

    
		$(document).on('keyup change', '.CalificacionesRA', function () {
			var val = $(this).val().replace(/[^\d]/g,"");
            var idc = $(this).attr('id');
            var idpra = idc.split('-')[1];	
            var pra = Number($('#pra-'+idpra).val());
            if (Number(val) > pra && pra > 0 && Number(val) > 0) {
                val = pra;
              }
			$(this).val(val);
			
			RevaluaRA(idc);
			
			var nc = $(this).closest('tr').find("input").index(this);
			
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


$(document).on("blur", ".CalificacionesRA", function () {
    var reserva = $("#datos_js").attr("reserva");
    var nota = $(this).val();
    var id_nota = $(this).attr("id_nota");
    var id = $(this).attr("id").split("-");
    var id_estudiante = id[0];
    var tipo_nota = "r-" + id[1] + "-" + id[2];
    var pra = $('#pra-'+id[1]).val();
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
  
function RevaluaRA(idc){
	var id = idc.split('-');	
    var pra = $('#pra-'+id[1]).val();
    
        var ra1 = id[0] + '-' + id[1] + '-1';
        var ra2 = id[0] + '-' + id[1] + '-2';
        var ra3 = id[0] + '-' + id[1] + '-3';
        var ra4 = id[0] + '-' + id[1] + '-4';
    
    var ra_1 = Number($('#'+ra1).val());
    var ra_2 = Number($('#'+ra2).val());
    var ra_3 = Number($('#'+ra3).val());
    var ra_4 = Number($('#'+ra4).val());
    var ra_v = Number($('#'+idc).val());
    
    var spra = ponderacion_tecnica * pra;
    
    if((ra_v < spra || ra_v > pra) && ra_v != 0 && ra_v != ''){
$('#'+idc).removeAttr('style');
$('#'+idc).css({'background-color':'#ff7b5a','color':'white','font-weight':'bold'});

    }

    if(ra_1 >= spra || ra_1 == 0 || ra_1 == ''){
$('#'+ra2).prop('readonly', true);
$('#'+ra3).prop('readonly', true);
$('#'+ra4).prop('readonly', true);
$('#'+ra2).css({'background-color':'inherit','color':'transparent','border':'1px solid #ccc'});
$('#'+ra3).css({'background-color':'inherit','color':'transparent','border':'1px solid #ccc'});
$('#'+ra4).css({'background-color':'inherit','color':'transparent','border':'1px solid #ccc'});
    }else{
$('#'+ra2).removeAttr('style');
$('#'+ra2).prop('readonly', false);
    if((ra_2 < spra || ra_2 > pra) && ra_2 != 0 && ra_2 != ''){
$('#'+ra2).css({'background-color':'#ff7b5a','color':'white','font-weight':'bold'});
    }else{
$('#'+ra2).prop('readonly', false);	
    }
        if(ra_2 >= spra || ra_2 == 0 || ra_2 == ''){
$('#'+ra3).prop('readonly', true);
$('#'+ra4).prop('readonly', true);
$('#'+ra3).css({'background-color':'inherit','color':'transparent','border':'1px solid #ccc'});
$('#'+ra4).css({'background-color':'inherit','color':'transparent','border':'1px solid #ccc'});
        }else{

$('#'+ra3).removeAttr('style');
$('#'+ra3).prop('readonly', false);

    if((ra_3 < spra || ra_3 > pra) && ra_3 != 0 && ra_3 != ''){
$('#'+ra3).css({'background-color':'#ff7b5a','color':'white','font-weight':'bold'});
    }else{
$('#'+ra3).prop('readonly', false);	     
    }

    if(ra_3 >= spra || ra_3 == 0 || ra_3 == ''){
      $('#'+ra4).prop('readonly', true);
      $('#'+ra4).css({'background-color':'inherit','color':'transparent','border':'1px solid #ccc'});
    }else{

      $('#'+ra4).removeAttr('style');
      $('#'+ra4).prop('readonly', false);

      if((ra_4 < spra || ra_4 > pra) && ra_4 != 0 && ra_4 != ''){
        $('#'+ra4).css({'background-color':'#ff7b5a','color':'white','font-weight':'bold'});
            }else{
        $('#'+ra4).prop('readonly', false);	     
            }

      
    }


        


      }


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

        var op4 = $('#'+ra4).attr('op');
        
        if(op4 == 1){
    $('#'+ra4).removeAttr('style');
    $('#'+ra4).css({'background-color':'inherit','color':'black','font-weight':'bold','border':'0px'});
    $('#'+ra4).prop("readonly", true);
        }
}

$(window).on("load", function () {
    $('.CalificacionesRA').trigger('change');

});

$(document).on("click", ".CalificacionesRAGC", function () {
  var reserva = $("#datos_js").attr("reserva");
  var nota = $(this).attr('valgc');
  var id_nota = $(this).attr("id_nota");
  var id = $(this).attr("id").split("-");
  var id_estudiante = id[0];
  var tipo_nota = "r-" + id[1] + "-" + id[2];
  var pra = $('#pra-'+id[1]).val();
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
        input.text('Publicada');
        input.attr('class', 'btn btn-sm btn-success');
      } else {
        var color = "red";
        input.text('Error');
        input.attr('class', 'btn btn-sm btn-danger CalificacionesRAGC');
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

  $('.CalificacionesRAGC').trigger("click");
                
  });


})
