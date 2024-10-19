
$(document).ready(function() {

    var cdnfiles = $("#datos_js").attr("cdnfiles");

    var idlp = Number(document.cookie.replace(
        /(?:(?:^|.*;\s*)idples\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      ));
      
      if (idlp.length < 1) {
        var idlp = 7;
      }

    var tablep = $('#TablaPersonal').DataTable({
      "bAutoWidth": false,
      "responsive": true,
        "columnDefs": [ {
            "targets": 'no-sort',
            "orderable": false,
      } ],
      "order": [[ 1, "asc" ]],
      "language": {
        url: cdnfiles + "/assets/js/lib/data-table/spanishPersonal.json",
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

  web
                        .database()
                        .ref(
                          "sesiones/" + escuela_sesion + "/usuarios/" + quien + "/" + user.uid)
                        .on("value", (enlinea) => {

                          
                        });