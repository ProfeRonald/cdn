$(document).ready(function() {

    var filescdn = $("#datos_js").attr("filescdn");

    
if ($(window).width() < 480 || $(window).height() < 480) {
    var verdadero_f = false;
    var falso_v = true;
    var uno_c = 0;
    var cero_u = 1;
    }else{
        var verdadero_f = true;
        var falso_v = false;
        var uno_c = 1;
        var fcero_u = 0;
    }

    
var idlp = Number(document.cookie.replace(
    /(?:(?:^|.*;\s*)idples\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  ));
  
  if (idlp.length < 1) {
    var idlp = 7;
  }
    
if(verdadero_f ){

    $('#Tabla-Todos thead tr').clone(true).appendTo( '#Tabla-Todos thead' );
    $('#Tabla-Todos thead tr:eq(1) th').each( function (i) {
        var size = '100%';
        if(i != 1 && i != 12){
        var title = $(this).text();
        if(i == 0){
        var title = '#';
		size = '20px';
        }
        if(i == 2){
        var title = '1er nombre';
        }
        if(i == 3){
        var title = '2do nombre';
        }
        if(i == 4){
        var title = '1er apellido';
        }
        if(i == 5){
        var title = 'C. Inicial';
        }
		if(i == 6){
        var title = 'C. Final';
        }
		if(i == 7){
        var title = 'Sexo';
        }
        if(i == 8){
        var title = 'ID';
        }
        if(i == 9){
        var title = 'Edad';
        }
        if(i == 10){
        var title = 'Cumplea&ntilde;o';
        }
        if(i == 11){
        var title = 'Secci&oacute;n';
        }
        
        $(this).html( '<input type="text" class="bg-dark border text-white text-center" style="width:'+size+'" placeholder="'+title+'" />' );
				}else{
				$(this).html( '' );
				}
				
        $( 'input', this ).on( 'keyup change', function () {
            if ( table.column(i).search() !== this.value ) {
                table
                    .column(i)
                    .search( this.value )
                    .draw();
            }
        } );
    } );
 
    var table = $('#Tabla-Todos').DataTable( {
        orderCellsTop: true,
        fixedHeader: true,
        "order": [[ 1, "asc" ]],
        "columnDefs": [ {
          "targets": 'no-sort',
          "orderable": false,
    } ],
    "language": {
        url: filescdn + "/assets/js/lib/data-table/spanish.json",
    },
    "lengthMenu":		[[5, 7, 10, 15, 20, 25, 50, -1], [5, 7, 10, 15, 20, 25, 50, "Todos"]],
    iDisplayLength: idlp,
    } );

}
    
		$('#Tabla-TodosM').DataTable( {
        orderCellsTop: true,
        fixedHeader: true,
        "order": [[ 1, "asc" ]],
        "columnDefs": [ {
          "targets": 'no-sort',
          "orderable": false,
    } ],
    "responsive": true,
    "language": {
        url: filescdn + "/assets/js/lib/data-table/spanish.json",
    },
    "lengthMenu":		[[5, 7, 10, 15, 20, 25, 50, -1], [5, 7, 10, 15, 20, 25, 50, "Todos"]],
    iDisplayLength: idlp,
    } );

    $(document).on(
        "blur",
        "#Tabla-Todos_wrapper select:first, #Tabla-TodosM_wrapper select:first",
        function () {
          var idpl = $(this).val();
          document.cookie = "idples=" + idpl;
        }
      );


} );