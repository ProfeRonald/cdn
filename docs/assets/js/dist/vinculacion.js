
$(document).ready(function () {

var filescdn = $("#datos_js").attr("filescdn");

var idlp = Number(document.cookie.replace(
  /(?:(?:^|.*;\s*)idples\s*\=\s*([^;]*).*$)|^.*$/,
  "$1"
));

if (idlp.length < 1) {
  var idlp = 7;
}



if($('#TablaAescolar').length > 0){

$('#TablaAescolar').DataTable({
    "responsive": true,
    "columnDefs": [ {
        "targets": 'no-sort',
        "orderable": false,
  } ],
  "order": [[ 0, "asc" ]],
  "language": {
    url: filescdn + "/assets/js/lib/data-table/SpanishGrupos.json",
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


$(document).on("click", ".vinculados-empresa", function () {
  var logo_empresa = $(this).attr('src');
  var nombre_empresa = $(this).attr('alt');
  var ids_empresa = $(this).attr('data-ids');
  $('#vinculados-empresa').html('<div class="row"><div class="col-6"><img src="' + logo_empresa + '" alt="' + nombre_empresa + '"></div><div class="col-6">' + nombre_empresa + '</div></div>');
      
})




});