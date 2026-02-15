$(document).ready(function () {

var filescdn = $("#datos_js").attr("filescdn");
var urlerd = $("#datos_js").attr("urlerd");
var target = $("#datos_js").attr("target");

var idlp = Number(document.cookie.replace(
  /(?:(?:^|.*;\s*)idples\s*\=\s*([^;]*).*$)|^.*$/,
  "$1"
));

if (idlp.length < 1) {
  var idlp = 7;
}

if(typeof DataTable === 'function') {

$('#Tabla-Estadistica').DataTable({
 orderCellsTop: true,
fixedHeader: true,
"columnDefs": [ {
  "targets": 'no-sort',
  "orderable": false,
} ],
    "responsive": true,
    "scrollX": false,
    "scrollY": 200,
    "bAutoWidth": false,
    "searching": false,
    "bLengthChange" : false,
    "bInfo":false,
    "bFilter": false,
    "paging": false,
    "iDisplayLength":	-1,
    
    });


    $('#Tabla-Estadistica_final').DataTable({
    orderCellsTop: true,
fixedHeader: true,
"columnDefs": [ {
  "targets": 'no-sort',
  "orderable": false,
} ],
    "responsive": true,
    "scrollX": false,
    "scrollY": 200,
    "bAutoWidth": false,
    "searching": false,
    "bLengthChange" : false,
    "bInfo":false,
    "bFilter": false,
    "paging": false,
    "iDisplayLength":	-1,
    
    });
  
  }

$(document).on('click', '#boton-ests-centro', function () {

$("#estscentro").toggle("slow");
$("#estscentro_final").toggle("slow");
$(".botones-aescolar-menu").toggle("slow");
$("#boton-ests-centro-back").toggle("slow");

});

$(document).on('click', '#boton-ests-centro-back', function () {

$("#boton-ests-centro").trigger('click');

});

$(document).on('click', '#bproact', function () {
  $("#boton-ests-centro").hide("slow");
  $(".botones-aescolar-menu").hide("slow");
  $('#pactividad').show("slow");
  $('#actividadp').text('');
});


$(document).on('click', '#boton-close-ests, #boton-close-ests_final', function () {
	$("#estscentro").css("display", "none");
  $("#estscentro_final").css("display", "none");
  $(".botones-aescolar-menu").show("slow");
});

$( window ).on( "load", function() {
	$('.dataTables_scrollBody').css({'overflow': 'hidden', 'overflow-y': 'auto'});
    setTimeout(function(){
		$('#estscentro').hide();	 
    $('#estscentro_final').hide();
			},500);

      $('#ir-a-otro-curso').html($('#ir_a_otro_curso').html());
      $('#ir_a_otro_curso').text('');


});

if($('#TablaAescolar').length > 0){

$('#TablaAescolar').DataTable({
  dom: 'lBfrtip',
        buttons: [
          {
            extend: 'excelHtml5',
            text: '<i class="fa fa-file-excel-o"></i> Descargar lista de cursos',
            title: 'Lista de cursos',
            filename: 'lista_cursos',
            className: 'btn btn-success btn-sm rounded-pill px-3',
            exportOptions: {
            columns: ':not(.no-export)',
              format: {
                body: function ( data, row, column, node ) {
                  var exportText = $(node).attr('data-export');
                    if (exportText) {
                      return exportText;
                    }
                  return $(node).text().trim();
                },
                header: function ( data, column, node ) {
                  var exportText = $(node).attr('data-export');
                    if (exportText) {
                      return exportText;
                    }
                  return $(node).text().trim();
                }
              }
          }
          }
        ],
    "responsive": true,
    "columnDefs": [ {
        "targets": 'no-sort',
        "orderable": false,
  } ],
  "order": [[ 0, "asc" ]],
  "language": {
    url: filescdn + "/assets/js/lib/data-table/SpanishResultados.json",
  },
  "lengthMenu":		[[5, 7, 10, 20, 25, 30, 50, -1], [5, 7, 10, 20, 25, 30, 50, "Todos"]],
  "iDisplayLength":	idlp,
});

// Definimos los formatos comunes para no repetir código en cada botón
var commonExportOptions = {
    columns: ':not(.no-export)',
    footer: true,
    format: {
        body: function(data, row, column, node) {
            var exportText = $(node).attr('data-export');
            if (exportText) {
                return exportText.replace(/<br\s*\/?>/gi, '\n');
            }
            return $(node).text().trim();
        },
        header: function(data, column, node) {
            var exportText = $(node).attr('data-export');
            if (exportText) {
                return exportText.replace(/<br\s*\/?>/gi, '\n');
            }
            return $(node).text().replace(/<br\s*\/?>/gi, '\n').trim();
        },
        footer: function(data, column, node) {
            if (node) {
                var attr = node.getAttribute('data-export');
                if (attr) return attr.replace(/<br\s*\/?>/gi, '\n');
            }
            return data ? data.replace(/<[^>]*>?/gm, '').trim() : '';
        }
    }
};

$('#TablaAdminProfesores').DataTable({
    dom: 'lBfrtip',
    buttons: [
        {
            extend: 'excelHtml5',
            text: '<i class="fa fa-file-excel-o"></i> Excel',
            title: 'Lista de profesores',
            filename: 'lista_profesores',
            className: 'btn btn-success btn-sm rounded-pill px-3',
            footer: true,
            exportOptions: commonExportOptions,
            customize: function(xlsx) {
                var sheet = xlsx.xl.worksheets['sheet1.xml'];
                $('row c', sheet).each(function() {
                    if ($('is t', this).text().indexOf('\n') !== -1) {
                        $(this).attr('s', '55'); // Wrap text activo
                    }
                });
            }
        },
        {
            extend: 'pdfHtml5',
            text: '<i class="fa fa-file-pdf-o"></i> PDF',
            title: 'Lista de profesores',
            filename: 'lista_profesores',
            className: 'btn btn-danger btn-sm rounded-pill px-3 ml-2',
            footer: true,
            exportOptions: commonExportOptions,
            orientation: 'landscape', // Opcional: mejor para tablas anchas
            pageSize: 'A4'
        },
        {
            extend: 'print',
            text: '<i class="fa fa-print"></i> Imprimir',
            className: 'btn btn-info btn-sm rounded-pill px-3 ml-2',
            footer: true,
            exportOptions: commonExportOptions,
            customize: function(win) {
                // Ajuste visual para la impresión
                $(win.document.body).css('font-size', '10pt');
                $(win.document.body).find('table')
                    .addClass('compact')
                    .css('font-size', 'inherit');
            }
        }
    ],
    "responsive": true,
    "columnDefs": [{
        "targets": 'no-sort',
        "orderable": false,
    }],
    "order": [[0, "asc"]],
    "bLengthChange": true,
    "searching": true,
    "bInfo": false,
    "bFilter": true,
    "paging": true,
    "language": {
        url: filescdn + "/assets/js/lib/data-table/SpanishGrupos.json"
    },
    "lengthMenu": [[5, 7, 10, 15, 20, 25, 50, -1], [5, 7, 10, 15, 20, 25, 50, "Todos"]],
    "iDisplayLength": idlp,
});

$(document).on(
    "blur",
    "#TablaAescolar_wrapper select:first, #TablaAdminProfesores_wrapper select:first",
    function () {
      var idpl = $(this).val();
      document.cookie = "idples=" + idpl;
    }
  );

}


$(document).on('click', '#aplicar-numero', function (e) {
   e.preventDefault();
   if (!confirm("¿Segudo desea reemplazar los números de todos los estudiantes de este grupo?")) {
        return false;
      }
  $("select[name=TablaGrupos_length]").val("-1");
	$("select[name=TablaGrupos_length]").change();
     setTimeout(function(){
  tableg.order([4, 'asc']).draw();
    var n = 1;
    $('.aplicar-numero').each(function() {
      $(this).val(n);
      n++;
    });
			},500);
setTimeout(function(){
$('#asec').trigger('click');
			},700);
      
})



$(document).on('click', '.boton-reporte-lista', function () {
  
  $('#op-lista').val($(this).attr('op'));

 if($('.sel-grp').filter(':checked').length > 0){
  
  $( "#condfinalForm" ).trigger( "submit" );

  setTimeout(function(){
    $('#CondicionFinal').modal('hide');
			},2000);

    }else{
      $('#text-submit').show('slow');
      setTimeout(function(){
        $('#text-submit').hide('slow');	 
          },2000);
    }

});


$(document).on('click', '.elimest', function () {
  
    $('#guardarae').attr('id', 'coelest');
    var foto = $(this).attr('img');
    var foto = $('#' + foto).attr('src');
    var nom = $(this).attr('nom');
    var num = $(this).attr('num');
    var ide = $(this).attr('ide');
    var g = $(this).attr('grupo');
    $("#CuadroEstLabel").text("Eliminando estudiante");
    $('#eliminarest').html('<div class="modal-body"><div><a href="' + urlerd + '/index.php?op=VerEstudiante&id=' + ide + '&grupo=' + g + '"' + target + '><img style="border-radius: 10%;width:70px;height:70px;" src="' + foto + '"/><span> ' + nom + ', #' + num + '</span></a></div></div><div style="font-size:10pt;padding-bottom:20px">&iquest;Seguro desea eliminar la inscripci&oacute;n de este estudiante?</div>');
    $('#coelest').attr('est', ide);
    $('#coelest').attr('g', g);
  
  });
  
  $(document).on('click', '#coelest', function () {
    var e = $(this).attr('est');
    var g = $(this).attr('g');
    $.ajax({
      method: "POST",
      url: "sesion.php?op=EliminarEst",
      data: {
        op: "EliminarEst",
        sec: "EliminarEst",
        id: e,
        grupo: g
      }
    })
      .done(function (elesth) {
        var elesth = JSON.parse(elesth);
        if (elesth['e'] == 1) {
          $('#tr' + e).hide();
          setTimeout(function () {
            $('#cerrarde').trigger('click');
          }, 3000);
        } else {
          var fondo = $('#tr' + e).css({ backgroundColor: '#cc8e35', border: '2px solid #F36C02' }).show()
          setTimeout(function () {
            fondo.css({ backgroundColor: '', border: '' });
          }, 3000);
          for (h = 0; h < 4; h++) {
            $('#tr' + e).fadeTo('slow', 0.5).fadeTo('slow', 1.0);
          }
        }
        $('#eliminarest').html(elesth['m']);
      })
  
  });  

$(document).on('click', '#sel-grp-todos, #boletines-sel-grp-todos', function () {

  if( $(this).is(':checked') ) {
    $('.sel-grp').prop('checked', true);
  }else {
    $('.sel-grp').prop('checked', false);
  }
  
})


$(document).on('click', '#boton-config-escuela', function () {
 
	var y = $(this).attr('y');
	var val = $('#esconfig').val();
	if(val == 1){
	var val = $('#esconfig').attr('y1');
	}
	if(val == 2){
	var val = $('#esconfig').attr('y2');
	}
  
  CargarConfigEscuela(y, val);

});

$(document).on('change', '#esconfig', function () {
	var y = $('#boton-config-escuela').attr('y');
	var val = $(this).val();
	if(val == 1){
	var val = $(this).attr('y1');
	}
	if(val == 2){
	var val = $(this).attr('y2');
	}
	CargarConfigEscuela(y, val);
});

  function CargarConfigEscuela(y, val){
   
	if(val != y){
	$('#esconfigHTML').html('<div class="display-3">Cargando...</div>');
	$.ajax({
  method: "POST",
  url: "sesion.php?op=CargarConfigEscuela",
  data:{val: val, y: y}
	})
  .done(function(cfg){
     setTimeout(function(){
		$('#boton-config-escuela').attr('y', val);
	$('.editandoescuela').remove();
   $('#esconfigHTML').html(cfg);
   $('#GuardarConfiguracion').show();
			},500);
	
  })

}

}

$(document).on('click', '#GuardarConfiguracion', function () {
  $('#GuardarConfiguracion').prop('disabled', true);
  $('#GuardarConfiguracionAviso').html('Guardando configuraci&oacute;n...');
  $('#GuardarConfiguracionAviso').attr('class', 'text-primary font-weight-bold text-right d-block');
  $.ajax({
    method: "POST",
    url: "sesion.php?op=GuardarConfiguracion",
    data: $("#configuracionEscuelaForm").serialize()
	})
  .done(function(cfg){
    if(cfg == 1){
  $('#GuardarConfiguracionAviso').html('&excl;Configuraci&oacute;n guardada!');
  $('#GuardarConfiguracionAviso').attr('class', 'text-success font-weight-bold text-right d-block');
    }else{
  $('#GuardarConfiguracionAviso').html('No se pudo establecer la configuraci&oacute;n, intente de nuevo.');
  $('#GuardarConfiguracionAviso').attr('class', 'text-danger font-weight-bold text-right d-block');
    }
    setTimeout(function(){
	  	$('#GuardarConfiguracion').prop('disabled', false);
      $('#GuardarConfiguracionAviso').text('');
      $('#GuardarConfiguracionAviso').attr('class', 'd-none');
		},2500);
  
  
  })
  .fail(function(a, b, c){
    console.log(a, b, c);
  })

})

$(document).on('click', '.periodo', function () {
		var prd = $(this).val();
		var prds = new Array();
		$(".periodo").each(function(i, prsd){
    if($(this).prop("checked") == true){
  prds[i] = $(this).val();
  $('#custom-nav-P' + $(this).val() + '-tab').show('slow');
  		}
  		if($(this).prop("checked") == false){
  $('#custom-nav-P' + $(this).val() + '-tab').hide('slow');		
  		}
    });
		
		prds = prds.filter(function () { return true });
		if(prds.length < 1){
		  $('#nav-tab-cont').hide('slow');
		}else{
		  $('#nav-tab-cont').show('slow');		
		}
		
});

$(document).on('click', '#ListaGrupoPDF', function () {
     ListaFinalPDF(1);
})


});
