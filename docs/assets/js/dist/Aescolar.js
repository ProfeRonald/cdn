
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

$(document).on('click', '#asistencia_diaria', function () {

  AsistenciaDiaria();

})

  function AsistenciaDiaria(){

$('#asistencia_diaria_archivo').show();
$('#asistencia_diaria_archivo').removeAttr('href');

$.ajax({
      method: "POST",
      url: "sesion.php?op=ActivarAsistenciaDiaria",
      dataType: 'json',
      data: $("#AsistenciaDiariaTotalForm").serialize()
    })
      .done(function (aviso) {

        if(aviso['aviso'] == 1){
          $('#asistencia_diaria_archivo').attr('class', 'btn btn-warning');
          $('#asistencia_diaria_archivo').text('No se pudo acceder al archivo');
        }else if(aviso['aviso'] == 2){
          $('#asistencia_diaria_archivo').attr('class', 'btn btn-warning');
          $('#asistencia_diaria_archivo').text('class', 'No se pudo obtener el archivo');
        }else if(aviso['aviso'] == 3){
          $('#asistencia_diaria_archivo').attr('class', 'btn btn-danger');
          $('#asistencia_diaria_archivo').text('No se pudo guardar el archivo');
        }else if(aviso['aviso'] == 4){
          $('#asistencia_diaria_archivo').attr('class', 'btn btn-danger');
          $('#asistencia_diaria_archivo').text('Se generaron problemas al crear el archivo');
        }else if(aviso['aviso'] == 5){
          $('#asistencia_diaria_archivo').attr('class', 'btn btn-danger');
          $('#asistencia_diaria_archivo').text('No se pudo configurar el archivo');
        }else if(aviso['aviso'] == 6){
          $('#asistencia_diaria_archivo').attr('class', 'btn btn-success');
          $('#asistencia_diaria_archivo').text('Archivo de asistencia creado');
          setTimeout(function(){
          $('#asistencia_diaria_archivo').attr('href', 'https://docs.google.com/spreadsheets/d/' + aviso['book'] + '/edit');
          $('#asistencia_diaria_archivo').text('Abrir archivo desde la cuenta de la escuela');
            },1200);
        }else if(aviso['aviso'] == 0 || aviso['aviso'] == 7 || aviso['aviso'] == 8){
          $('#asistencia_diaria_archivo').attr('class', 'btn btn-success');
          $('#asistencia_diaria_archivo').text('Abrir archivo desde la cuenta de la escuela');
          $('#asistencia_diaria_archivo').attr('href', 'https://docs.google.com/spreadsheets/d/' + aviso['book'] + '/edit');
          
        }

   if(aviso['aviso'] == 8){

   var grados = {}; 

$.each(aviso['asis'], function (curso, asis) {
  $('#curso_' + curso + '_hembras').text(asis[0]);
  var grado = $('#curso_' + curso + '_hembras').data('grado');

  if (!grados['grado_' + grado + '_hembras']) grados['grado_' + grado + '_hembras'] = 0;
  if (!grados['grado_' + grado + '_varones']) grados['grado_' + grado + '_varones'] = 0;
   if (!grados['grado_' + grado + '_total']) grados['grado_' + grado + '_total'] = 0;

  grados['grado_' + grado + '_hembras'] += Number(asis[0]);
  grados['grado_' + grado + '_varones'] += Number(asis[1]);
  grados['grado_' + grado + '_total'] += Number(asis[0]) + Number(asis[1]);

  $('#curso_' + curso + '_varones').text(asis[1]);
  $('#curso_' + curso + '_total').text(Number(asis[0]) + Number(asis[1]));
});

    var grafico = {};


    $.each(grados, function (grado, suma) {
      $('#'+ grado).text(suma);
      grafico[grado] = suma; 
    })

    var total_asis_hembras = 0;
    $('.grado_asis_hembras').each(function(){
      total_asis_hembras += Number($(this).text());
    });

    $('#total_asis_hembras').text(total_asis_hembras);
    grafico['total_asis_hembras'] = total_asis_hembras; 

    var total_asis_varones = 0;
    $('.grado_asis_varones').each(function(){
      total_asis_varones += Number($(this).text());
    });

    $('#total_asis_varones').text(total_asis_varones);
    grafico['total_asis_varones'] = total_asis_varones; 

    var total_asis_total = 0;
    $('.grado_asis_total').each(function(){
      total_asis_total += Number($(this).text());
    });

    $('#total_asis_total').text(total_asis_total);
    grafico['total_asis_total'] = total_asis_total; 
  
    grafico['total_asis_existencia'] = Number($('#data-tee').text());

    if(total_asis_total > 0){
    VerGraficoAsistencia(grafico);
    $('#toggle-stats-btn').show();
    }else{
      $('#toggle-stats-btn').hide();
      panel.classList.toggle('open', false);
    }

    $('#fecha-asistencia-dia').html(aviso['fecha']);

  }

  
   
        

      })

      .fail(function (a, b,c){
        console.log(a, b, c);
      })

}

const btn = document.getElementById('toggle-stats-btn');
  const panel = document.getElementById('graficos-estadisticos');

  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!isOpen));
    panel.classList.toggle('open', !isOpen);

    if (!isOpen) {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 400);
    }
  });

  $(document).on('change', '#dia_asistencia', function () {
    AsistenciaDiaria();
  });

function VerGraficoAsistencia(dataObj){

  
      google.charts.load('current', { packages: ['corechart'] });
      google.charts.setOnLoadCallback(drawCharts);

      function drawCharts() {
      
        const grados = [];

        for (let key in dataObj) {
          if (key.startsWith("grado_") && key.includes("_total")) {
            const grado = key.replace("grado_", "").replace("__total", "").replace("_total", "");
            grados.push(grado);
          }
        }

        grados.sort((a, b) => {
          const numA = parseInt(a) || 0;
          const numB = parseInt(b) || 0;
          return numA - numB;
        });

        const dataArray = [['Grado', 'Hembras', 'Varones', 'Total']];

        grados.forEach(grado => {
          const hembras = dataObj[`grado_${grado}__hembras`] || dataObj[`grado_${grado}_hembras`] || 0;
          const varones = dataObj[`grado_${grado}__varones`] || dataObj[`grado_${grado}_varones`] || 0;
          const total = dataObj[`grado_${grado}__total`] || dataObj[`grado_${grado}_total`] || (hembras + varones);
          dataArray.push([grado, hembras, varones, total]);
        });

        const dataByGrade = google.visualization.arrayToDataTable(dataArray);

        const optionsByGrade = {
          title: 'Asistencia por grado',
          chartArea: { width: '100%' },
          hAxis: { title: 'Cantidad de estudiantes' },
          vAxis: { title: 'Grado' },
          titleTextStyle: { fontSize: 18, bold: true },
          colors: ['#f06292', '#64b5f6', '#81c784'],
          legend: { position: 'top' }
        };

        const chartByGrade = new google.visualization.ColumnChart(document.getElementById('chart_by_grade'));
        chartByGrade.draw(dataByGrade, optionsByGrade);

        const dataTotals = google.visualization.arrayToDataTable([
          ['Género', 'Cantidad'],
          ['Hembras', dataObj.total_asis_hembras || 0],
          ['Varones', dataObj.total_asis_varones || 0]
        ]);

        const optionsTotals = {
          title: 'Totales generales por género',
          pieHole: 0.4,
           titleTextStyle: { fontSize: 18, bold: true },
          colors: ['#f06292', '#64b5f6']
        };

        const chartTotals = new google.visualization.PieChart(document.getElementById('chart_totals'));
        chartTotals.draw(dataTotals, optionsTotals);

        const asistencia = dataObj.total_asis_total || 0;
        const existencia = dataObj.total_asis_existencia || asistencia;
        const ausentes = Math.max(0, existencia - asistencia);
        const porcentaje = existencia > 0 ? ((asistencia / existencia) * 100).toFixed(1) : 0;

        const dataDonut = google.visualization.arrayToDataTable([
          ['Tipo', 'Cantidad'],
          ['Asistieron', asistencia],
          ['Ausentes', ausentes]
        ]);

         const optionsDonut = {
      title: `Porcentaje de asistencia: ${porcentaje}%`,
      pieHole: 0.5,
      width: '100%',
      height: 400,
      chartArea: { width: '90%', height: '80%' },
      legend: { position: 'bottom' },
      titleTextStyle: { fontSize: 18, bold: true },
      colors: ['#4CAF50', '#E57373']
    };

        const chartDonut = new google.visualization.PieChart(document.getElementById('chart_exist'));
        chartDonut.draw(dataDonut, optionsDonut);
      }

}

});

