
$(document).ready(function() {

    var filescdn = $("#datos_js").attr("filescdn");

    var idlp = Number(document.cookie.replace(
        /(?:(?:^|.*;\s*)idples\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      ));
      
      if (idlp.length < 1) {
        var idlp = 7;
      }

    var tablep = $('#TablaPersonal').DataTable({
      dom: 'lBfrtip',
        buttons: [
          {
            extend: 'excelHtml5',
            text: '<i class="fa fa-file-excel-o"></i> Descargar lista del personal',
            title: 'Lista del personal',
            filename: 'lista_personal',
            className: 'btn btn-success btn-sm rounded-pill px-3',
            footer: true,
            exportOptions: {
              columns: ':not(.no-export)',
              footer: true,
              format: {
                body: function ( data, row, column, node ) {
                  var exportText = $(node).attr('data-export');
                    if (exportText) {
                      return exportText.replace(/<br\s*\/?>/gi, '\n');
                    }
                  return $(node).text().trim();
                },
                header: function ( data, column, node ) {
                  var exportText = $(node).attr('data-export');
                    if (exportText) {
                      return exportText.replace(/<br\s*\/?>/gi, '\n').trim();
                    }
                  return $(node).text().replace(/<br\s*\/?>/gi, '\n').trim();
                },
                footer: function(data, column, node) {
                if (node) {
                        var attr = node.getAttribute('data-export');
                        if (attr) return attr.replace(/<br\s*\/?>/gi, '\n').trim();
                    }
                    // Si no hay atributo, limpiamos el HTML
                    return data ? data.replace(/<[^>]*>?/gm, '').trim() : '';
        }
              }
            },
            customize: function(xlsx) {
    var sheet = xlsx.xl.worksheets['sheet1.xml'];
    
    // Buscamos las celdas que contienen el carácter de salto de línea
    $('row c', sheet).each(function() {
        if ($('is t', this).text().indexOf('\n') !== -1) {
            // El estilo '25' es: Alineado a la izquierda + Wrap Text
            $(this).attr('s', '55'); 
        }
    });
}
          }
        ],
      "bAutoWidth": false,
      "responsive": true,
        "columnDefs": [ {
            "targets": 'no-sort',
            "orderable": false,
      } ],
      "order": [[ 1, "asc" ]],
      "language": {
        url: filescdn + "/assets/js/lib/data-table/SpanishPersonal.json",
      },
      "lengthMenu":		[[5, 7, 10, 20, 25, 50, -1], [5, 7, 10, 20, 25, 50, "Todos"]],
      iDisplayLength: idlp,
    });
  });

  $(document).on(
    "blur",
    "#TablaPersonal_wrapper select:first",
    function () {
      var idpl = $(this).val();
      document.cookie = "idples=" + idpl;
    }
  );