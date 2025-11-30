
var datetype = $('#datos_js').attr('datetype');

let leftColumnsNum = 2;

if(datetype == 'text'){
  leftColumnsNum = 2;
}else{
  leftColumnsNum = 1;
}

$(document).ready(function () {
    $('#tabla-panel').DataTable({
        fixedColumns:   {
        leftColumns: leftColumnsNum
    },
        orderCellsTop: true,
    fixedHeader: true,
    "columnDefs": [ {
      "targets": 'no-sort',
      "orderable": false,
    }, 
   
  {
    "targets": 0,
    "render": function(data, type, row) {
      // Para 'display', 'filter', u otros tipos visuales, devuelve el dato original
      if (type === 'display' || type === 'filter') {
        return data;
      }

      // Para 'sort' (ordenación) y 'type' (cacheado de tipo de dato), 
      // devuelve el valor numérico parseado.
      if (type === 'sort' || type === 'type') {
        // Asegúrate de que 'data' sea un string antes de usar replace()
        var numericValue = typeof data === 'string' ? data.replace(/,/g, '.') : data;
        var parsed = parseFloat(numericValue);
        
        // Manejo de NaN si la conversión falla
        return isNaN(parsed) ? 0 : parsed;
      }
      
      // En cualquier otro caso (poco común), devuelve el dato original
      return data;
    }
  }
  ],
  "order": [[0, "asc"]], // Ordenar por la primera columna de forma ascendente
        //"responsive": true,
        "scrollX": true,
        "scrollY": 300,
        "bAutoWidth": false,
        "searching": false,
        "bLengthChange" : false,
        "bInfo":false,
        "bFilter": false,
        "paging": false,
        "iDisplayLength":	-1,
        
        });	
    });
    
    $(document).on('click', '.clickcodgc', function () {
        $('#copcodgc').val($(this).attr('cod'));
        var gcink = 'https://classroom.google.com/c/' + $(this).attr('idgc') + '?cjc=' + $(this).attr('cod');
        $('#qr-gc').html('<img src="https://quickchart.io/qr?centerImageUrl=https://imagenes.escuelard.com/logo_redondo.png&size=150&margin=2&text=' + gcink +'" alt="' + $(this).attr('cod') + '" />');
    
    });
    
    
    $('#copcodgc').click(function() {
        $(this).focus();
        $(this).select();
        document.execCommand('copy');
        $("#cpcdgc").show().fadeOut(1200);
      });	
    
    $(document).on('click', '#qr-gc', function () {
      var cqr = $(this).css('transform');
      if(cqr == 'matrix(2.5, 0, 0, 2.5, 0, 0)'){
      $(this).css({'transform':'scale(1)','position': 'relative','top':'','left': '','margin': ''});
      }else{
      $(this).css({'transform':'scale(2.5)','position': 'absolute','top':'50%','left': '50%','margin': 'auto'});
      }
      
      });

      $(document).on('click', '#genrep', function () {
      if (!confirm("Dependiendo del la cantidad de módulos o asignaturas el proceso puede tardar. ¿Desea continuar?")) {
        return false;
      }

     $('#estudiantes-pendientes').submit();
  });