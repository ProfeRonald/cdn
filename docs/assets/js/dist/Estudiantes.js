
$(document).ready(function () {
    
var filescdn = $("#datos_js").attr("filescdn");

var idlp = Number(document.cookie.replace(
  /(?:(?:^|.*;\s*)idples\s*\=\s*([^;]*).*$)|^.*$/,
  "$1"
));

if (idlp.length < 1) {
  var idlp = 7;
}

  $('#TablaEstudiantes').DataTable({
  	
    "responsive": true,

    "columnDefs": [ {
        "targets": 'no-sort',
        "orderable": false,
  } ],
  "order": [[ 0, "asc" ]],
  "language": {
    url: filescdn + "/assets/js/lib/data-table/spanish.json",
  },
  "lengthMenu":		[[5, 7, 10, 15, 20, 25, 50, -1], [5, 7, 10, 15, 20, 25, 50, "Todos"]],
  "iDisplayLength":	idlp,
});


$(document).on(
  "blur",
  "#TablaEstudiantes_wrapper select:first",
  function () {
    var idpl = $(this).val();
    document.cookie = "idples=" + idpl;
  }
);

  //$("#TablaEstudiantes").css("width","100%")

});