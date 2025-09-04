
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

$(document).on(
    "blur",
    "#TablaAescolar_wrapper select:first",
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

$(document).on('click', '#sel-grp-todos', function () {

  if( $(this).is(':checked') ) {
    $('.sel-grp').prop('checked', true);
  }else {
    $('.sel-grp').prop('checked', false);
  }
  
})


  $(document).on('click', '#ListaFinalPDF', function () {
    
  $('#op-lista').val($(this).attr('op'));

 if($('.sel-grp').filter(':checked').length > 0){

    $.ajax({
      method: "POST",
      url: "sesion.php?op=ListaFinalPDF",
      dataType: 'json',
      data: $("#condfinalForm").serialize()
    })
      .done(function (gruposjson) {
       async function convertirUrlABase64(url) {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result); // dataURL
        reader.readAsDataURL(blob);
      });
    }

  const calcularFontSize = (totalFilas) => {
  totalFilas = totalFilas - 3;
  const base = 5.5;         // valor inicial cuando totalFilas = 40
  const maxFilas = 40;      // límite superior
  let incremento = 0.1;   // cuánto aumenta por fila menos

  if(totalFilas < 25){
  incremento = 0.3;
  }else if(totalFilas < 29){
  incremento = 0.2;
  }else{
   incremento = 0.1;
  }   // cuánto a

  if (totalFilas > maxFilas) totalFilas = maxFilas;
  if (totalFilas < 1) totalFilas = 1;

  // cada fila menos de 40 aumenta 0.1
  const diferencia = maxFilas - totalFilas;
  return base + diferencia * incremento;

};

    const bloqueTablaCentrada = (pagina) => {
  const totalFilas = pagina.tabla.length;
  const fontSize = calcularFontSize(totalFilas);

  return {
    columns: [
      { width: '*', text: '' },
      {
        width: 'auto',
        table: {
          headerRows: 1,
          widths: Array(pagina.tabla[0].length).fill('auto'),
          body: [
            pagina.tabla[0].map(header => ({
              text: header || '',
              bold: true,
              alignment: 'center',
              fontSize,
              color: 'white',
              margin: [0, 0, 0, 0],
              fillColor: "#8DB4E2"
            })),
            ...pagina.tabla.slice(1).map((row, rowIndex) =>
              row.map((cell, colIndex) => {
               let celda = { text: cell != null ? String(cell) : '',
                alignment: [0, 4, 5, 6, 9, 10].includes(colIndex) ? "center" : "left",
                fontSize,
                noWrap: true,
                margin: [2, 1, 2, 1]
              };
              if (rowIndex === totalFilas - 3 && colIndex === 1) {
                celda.bold = true; 
                celda.fillColor = "#F6DDCC"; 
                celda.alignment = "left";
                
              }
              if (rowIndex === totalFilas - 3 && colIndex === 2) {
                celda.bold = true; 
                celda.fillColor = "#F6DDCC"; 
                celda.alignment = "center";
                
              }
              if ((rowIndex === totalFilas - 2 || rowIndex === totalFilas - 3) && colIndex === 4) {
                celda.bold = true; 
                celda.alignment = "left";
              }
              if ((rowIndex === totalFilas - 2 || rowIndex === totalFilas - 3) && colIndex === 5) {
                celda.bold = true; 
                celda.alignment = "center";
              }
              return celda;
              })
            )
          ]
        },
        layout: {
           fillColor: function(rowIndex, node) {
           const totalRows = node.table.body.length;
    if (rowIndex === 0) return "#D9D9D9"; 
    if (rowIndex < totalRows - 2 && rowIndex % 2 === 0) return "#D9D9D9";
    return null; 
          },
          hLineWidth: function (i, node) {
      return 0.5; 
    },
    vLineWidth: function (i, node) {
      return 0.5; 
    },
    hLineColor: function (i, node) {
      return 'black'; 
    },
    vLineColor: function (i, node) {
      return 'black'; 
    },
    paddingLeft: function(i, node) { return 0.5; },
    paddingRight: function(i, node) { return 0.5; },
    paddingTop: function(i, node) { return 0.5; },
    paddingBottom: function(i, node) { return 0.5; }
        },
        dontBreakRows: true,
        margin: [0,0,0,0]
      },
      { width: '*', text: '' }
    ]
  };
};

  async function generarPDF(gruposjson) {
  var logo_escuela = gruposjson[0];
  var titulo_escuela = gruposjson[1];
  var provincia_distrito = gruposjson[2];
  var paginasJSON = gruposjson[3];
  const logoBase64 = await convertirUrlABase64(logo_escuela);
  const contenido = paginasJSON.map((pagina, index) => ({
    stack: [
      { image: logoBase64, width: 80, alignment: 'center', margin: [0,0,0,0] },
      {
        text: `República Dominicana\nMinisterio de Educación de la República Dominicana`,
        style: 'subtitulo',
        preserveLineBreaks: true,
        margin: [0,0,0,0]
      },
      {
        text: titulo_escuela,
        style: 'titulo',
        preserveLineBreaks: true,
        margin: [0,0,0,0]
      },
      {
        text: provincia_distrito,
        style: 'subtitulo',
        preserveLineBreaks: true,
        margin: [0,0,0,0]
      },
      { text: pagina.curso, style: 'titulo', margin: [0,0,0,0] },
          bloqueTablaCentrada(pagina)
    ],
    pageBreak: index === paginasJSON.length - 1 ? undefined : "after",
  }));

  const docDefinition = {
    pageSize: 'A4',
    pageOrientation: 'landscape',
    pageMargins: [15, 5, 5, 15],
    content: contenido,
    styles: {
      titulo: { fontSize: 14, bold: true, alignment: 'center' },
      subtitulo: { fontSize: 12, italics: true, alignment: 'center' }
    },
    defaultStyle: { fontSize: 12 }
  };

  pdfMake.createPdf(docDefinition).download(gruposjson[4]);

}
        generarPDF(gruposjson);
        setTimeout(function(){
    $('#CondicionFinal').modal('hide');
			},2000);
      })

      }else{
      $('#text-submit').show('slow');
      setTimeout(function(){
        $('#text-submit').hide('slow');	 
          },2000);
    }
  
  });  


});