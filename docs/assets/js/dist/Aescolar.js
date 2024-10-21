
$(document).ready(function () {

var filescdn = $("#datos_js").attr("filescdn");

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
  
  }

$(document).on('click', '#bestscentro', function () {

$("#estscentro").toggle("slow");
$(".bfechaextra").toggle("slow");

});


$(document).on('click', '#bproact', function () {
  $("#bestscentro").hide("slow");
  $(".bfechaextra").hide("slow");
  $('#pactividad').show("slow");
  $('#actividadp').text('');
});


$(document).on('click', '#bcestscentro', function () {
	$("#estscentro").css("display", "none");
});

$( window ).on( "load", function() {
	$('.dataTables_scrollBody').css({'overflow': 'hidden', 'overflow-y': 'auto'});
    setTimeout(function(){
		$('#estscentro').hide();	 
			},6);
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
    url: filescdn + "/assets/js/lib/data-table/spanishResultados.json",
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

  var basec = false;
	$(document).on('click', '#asec', function () {
		if(basec == false){
	var noresize = $('#TablaGrupos').parents('.dataTables_wrapper').clone(true, true);
	$("#TablaGrupos").css({display:'none'});	
	$("#tablagrupo").css("width", "0px");
	$("#tablagrupo").css("height", "0px");
	$("select[name=TablaGrupos_length]").val("-1");
	$("select[name=TablaGrupos_length]").change();
	$("#tablagrupo").css({visibility:'hidden'});
	$("#cargandos").css({display:'inline'});	
	basec = true;		
	noresize.appendTo('#cargandos');
	$("#asec").prop('disabled', true);
	$("#asec").text('Actualizando sección');
	$("#faescolar").submit();
		}
});

$(document).on('click', '#condfinal', function () {
  
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


});