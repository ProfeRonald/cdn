
$(document).ready(function() {

    var filescdn = $("#datos_js").attr("filescdn");

var idlp = Number(document.cookie.replace(
    /(?:(?:^|.*;\s*)idples\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  ));
  
  if (idlp.length < 1) {
    var idlp = 7;
  }
    
      $('#TablaCoordinacion').DataTable({
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
            url: filescdn + "/assets/js/lib/data-table/SpanishGrupo.json"        },
        "lengthMenu":		[[5, 7, 10, 15, 20, 25, 50, -1], [5, 7, 10, 15, 20, 25, 50, "Todos"]],
        "iDisplayLength":	idlp,
    });
      
      $('#TablaCoordinacionGrupo').DataTable({
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
            url: filescdn + "/assets/js/lib/data-table/SpanishGrupos.json"        },
        "lengthMenu":		[[5, 7, 10, 15, 20, 25, 50, -1], [5, 7, 10, 15, 20, 25, 50, "Todos"]],
        "iDisplayLength":	idlp,
    });
    
  $(document).on(
    "blur",
    "#TablaCoordinacion_wrapper select:first, #TablaCoordinacionGrupo_wrapper select:first",
    function () {
      var idpl = $(this).val();
      document.cookie = "idples=" + idpl;
    }
  );

      $("#searchInput").on("input", function (e) {
       e.preventDefault();
       $('#TablaCoordinacionGrupo').DataTable().search($(this).val()).draw();
    });
    
    $('#TablaCoordinacionAsigs').DataTable({
          "responsive": true,
          "columnDefs": [ {
              "targets": 'no-sort',
              "orderable": false,
        } ],
            "order": [[ 0, "asc" ]],
        "bLengthChange" : false,
        "searching": false,
        "bInfo":false,
            "bFilter": true,
            "paging": false,
        "language": {
            url: filescdn + "/assets/js/lib/data-table/SpanishGrupos.json"
                },
        "lengthMenu":		[[5, 7, 10, 15, 20, 25, 50, -1], [5, 7, 10, 15, 20, 25, 50, "Todos"]],
        "iDisplayLength":	-1,
      });
    
    });

	$(document).on('click', '#bproact', function () {
		$("#boton-ests-centro").hide("slow");
		$(".botones-aescolar-menu").hide("slow");
		$('#pactividad').show("slow");
		$('#actividadp').text('');
	});