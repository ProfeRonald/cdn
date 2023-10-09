
$(document).ready(function() {

    var cdnfiles = $("#datos_js").attr("cdnfiles");

var idlp = Number(document.cookie.replace(
    /(?:(?:^|.*;\s*)idples\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  ));
  
  if (idlp.length < 1) {
    var idlp = 7;
  }

    $('#TablaPsicologia').DataTable({
        "responsive": true,
        "columnDefs": [ {
            "targets": 'no-sort',
            "orderable": false,
      } ],
          "order": [[ 0, "asc" ]],
      "bLengthChange" : true,
      "searching": true,
      "bInfo":false,
          "bFilter": true,
          "paging": true,
      "language": {
        url: cdnfiles + "/assets/js/lib/data-table/SpanishGrupo.json"
      },
      "lengthMenu":		[[5, 7, 10, 15, 20, 25, 50, -1], [5, 7, 10, 15, 20, 25, 50, "Todos"]],
      "iDisplayLength":	idlp,
    });
    
    $('#TablaEstudiantesPsi').DataTable({
        
        "responsive": true,
    
        "columnDefs": [ {
            "targets": 'no-sort',
            "orderable": false,
      } ],
      "order": [[ 6, "asc" ]],
      "language": {
        url: cdnfiles + "/assets/js/lib/data-table/spanish.json",
      },
      "lengthMenu":		[[5, 7, 10, 15, 20, 25, 50, -1], [5, 7, 10, 15, 20, 25, 50, "Todos"]],
      "iDisplayLength":	idlp,
    });
    
    $('#TablaPsicologiaGrupo').DataTable({
        "responsive": true,
        "columnDefs": [ {
            "targets": 'no-sort',
            "orderable": false,
      } ],
          "order": [[ 0, "asc" ]],
      "bLengthChange" : true,
      "searching": true,
      "bInfo":false,
          "bFilter": true,
          "paging": true,
      "language": {
        url: cdnfiles + "/assets/js/lib/data-table/SpanishGrupos.json"
      },
      "lengthMenu":		[[5, 7, 10, 15, 20, 25, 50, -1], [5, 7, 10, 15, 20, 25, 50, "Todos"]],
      "iDisplayLength":	idlp,
    });

      
  $(document).on(
    "blur",
    "#TablaPsicologia_wrapper select:first",
    "#TablaEstudiantesPsi_wrapper select:first",
    "#TablaPsicologiaGrupo_wrapper select:first",
    function () {
      var idpl = $(this).val();
      document.cookie = "idples=" + idpl;
    }
  );
    
      $("#searchInput").on("input", function (e) {
     e.preventDefault();
     $('#TablaPsicologiaGrupo').DataTable().search($(this).val()).draw();
          });
    
  });

  	
$( window ).on( "load", function() {
	$('#datos-estudiantes').hide();
});

$( window ).scroll(function() {
  var scrls = $("#estdp").offset().top - 108;
  var scrl = $(window).scrollTop();
  	if(scrl > scrls){
	$("#pdate").show();
		}else{
	$("#pdate").hide();	
		}
});


$(document).on('click', '#datoseo', function () {
	$('#pdate').hide("slow");
})

$(document).on('click', '.datose', function () {
	$('#pdate').toggle("slow");
	var a = $('#pdate').attr('e');
	var e = $(this).attr('e');
if(a != e){
	var nc = $(this).attr('nc');
	if(nc !='' && nc != undefined){
		$("#nc").html('Nombre completo: <strong>' + nc + '</strong>');
	}
	var g = $(this).attr('g');
		if(g != ''){
	$("#btnvc").attr('href', '<?php print $urlerd; ?>/index.php?sec=VerEstudiante&id=' + e + '&grupo=' + g);
		}
	 $.ajax({
  method: "POST",	
  url: "sesion.php?op=DatosEstudiante",
  data: {e: e}
	})
  .done(function(datos){
  $('#pdate').attr('e', e);
  $('#pdate').show("slow");
  $("#datos-estudiante").html(datos);
  $('#datos-estudiantes').show();
  })
  
  .fail(function() {
  $('#datos-estudiantes').hide();	
  	$("#datosestudiantes").text('No se pudo caragar los datos');
    var fondo = $("#datosestudiantes").css({border: '1px solid red'}).show();
      	setTimeout(function(){
			fondo.css({border: ''});
        },2000);
				for(i=0;i<2;i++){
			$("#datosestudiantes").fadeTo('slow', 0.5).fadeTo('slow', 1.0);
     		}
  })

}

});

$(document).on('click', '#bproact', function () {
	$(".bfechaextra").hide("slow");
	$('#pactividad').show("slow");
	$('#actividadp').text('');
	});