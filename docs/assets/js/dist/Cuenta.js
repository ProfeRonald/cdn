var filescdn = $("#datos_js").attr("filescdn");
  
$(document).on('click', '#menuToggle', function () {	
    var mwtn = $(".open").length;
            if(mwtn > 0){
    $('#tablacal').css("max-width","1205px");
    $('#tablacal2').css("max-width","1105px");
            }
            if(mwtn == 0){
    $('#tablacal').css("max-width","1000px");
    $('#tablacal2').css("max-width","910px");
            }

            setTimeout(function () {
              $("#tablacal").css("max-width", ($("#get-width").width() - 5) + 'px');
              $("#tablacal2").css("max-width", ($("#get-width").width() - 5) + 'px');
            }, 500);
});

if ($(window).width() < 480 || $(window).height() < 480) {
var verdadero_f = false;
var falso_v = true;
var uno_c = 0;
var cero_u = 1;
}else{
    var verdadero_f = true;
    var falso_v = false;
    var uno_c = 2;
    var fcero_u = 0;
}

$('#asigs-est, #datos-estudiantes, #modsests').DataTable({
    "ordering": false,
    "bSort": false,
    "bInfo":false,
    "searching": false,	
    "bLengthChange" : false,
    "paging": false,
    "bFilter": false,		
  orderCellsTop: false,
    fixedHeader: {
    header: true,
    footer: true
},
    fixedColumns:   {
    leftColumns: uno_c
},   
scrollCollapse: verdadero_f,
"bAutoWidth": falso_v,
"columnDefs": [ {
  "targets": 'no-sort',
  "orderable": falso_v,
} ],
"lengthMenu":		[[5, 7, 10, 20, 25, 30, 35, 50, -1], [5, 7, 10, 20, 25, 30, 35, 50, "Todas"]],	
  "responsive": falso_v,
    "scrollX": verdadero_f,
    "scrollY": verdadero_f,
    "bAutoWidth": verdadero_f,	
"language": {
    url: filescdn + "/assets/js/lib/data-table/SpanishAsignaturas.json",
},
"iDisplayLength":	-1,

});

$("#nivelea").appendTo("#nivela");

$("#progreso_alumno_line").peity("line");

$("#progreso_alumno_bar").peity("bar", {
/* fill: function(_, i, all) {
var g = parseInt((i / all.length) * 255)
return "rgb(255, " + g + ", 0)"
}*/
fill: ["#4d89f9", "#6164C1", "#F96262", "#99D683"]

});

$(document).on('click', '#notaprivadam', function () {
	var np = $('#notaprivada').attr('np');
  $.ajax({
  method: "POST",	
  url: "sesion.php?op=NotaPrivada",
  data:{np: np}
	})
  .done(function(tex){
   $('#notaprivadadiv').html(tex);
   setTimeout(function(){
	$('#cerrarnp').trigger("click");
   },150);
  })
  });

  
$(document).on('click', '#ebioest', function (e) {
	var tbioest = $("#textbioest").val();
	$('#ebioest').tooltip('dispose');
	$("#bioest").html('<textarea maxlength="300" id="textbioest" rows="5" class="form-control" style="font-size:8pt;width:100%">'+tbioest+'</textarea><div class="text-dark" id="crts"></div>');
	$("#textbioest").focus();
	e.stopPropagation();
});

$(document).on('keyup', '#textbioest', function (e) {
  var tx = $(this).val()
  var n = 300 - Number(tx.length);
$('#crts').text(n + ' caracteres...')
if(Number(tx.length) > 300){
  $(this).val(tx);
}
})

$(document).on('click', '#textbioest', function (e) {
    e.stopPropagation();
});

$(document).on('blur', '#textbioest', function () {
	var txbioest = $(this).val();
	$("#bioest").html('<textarea id="textbioest" style="display:none">'+txbioest+'</textarea>'+txbioest+' <i id="ebioest" style="font-size:15pt;cursor: pointer;" rel="tooltip" title="Editar biograf&iacute;a" class="fa fa-pencil"></i>');
	var txbioesta = $("#textbioesta").val();
	if(txbioesta != txbioest){
	$("#textbioesta").val(txbioest);	
	 $.ajax({
  method: "POST",	
  url: "sesion.php?op=ActualizarBio",
  data: {bio: txbioest}
	})
  .done(function( data ){
  var fondo = $("#bioest").css({border: '1px solid #2ECC71'}).show();
      	setTimeout(function(){
			fondo.css({border: ''});
        },2000);
				for(i=0;i<2;i++){
			$("#bioest").fadeTo('slow', 0.5).fadeTo('slow', 1.0);
     		}

  })
  
  .fail(function() {
    var fondo = $("#bioest").css({border: '1px solid red'}).show();
      	setTimeout(function(){
			fondo.css({border: ''});
        },2000);
				for(i=0;i<2;i++){
			$("#bioest").fadeTo('slow', 0.5).fadeTo('slow', 1.0);
     		}
  })
	}
});


function CuentaNav(o=0){
if(o == 1){
  $('.cuenta-nav').show();
}else{
  $('.cuenta-nav').hide();
}
}

var ant = new URLSearchParams(
  document.location.search.substring(1)
).get("ant");

var sig = new URLSearchParams(
  document.location.search.substring(1)
).get("sig");

if (ant > 0 || sig > 0) {
  var pos = $("#scrollsa").offset().top + 260;
  $("html, body").animate({
    scrollTop: pos
  }, 2000);
}

window.onload = function(){
  setTimeout(function () {
    $("#tablacal").css("max-width", ($("#get-width").width() - 5) + 'px');
    $("#tablacal2").css("max-width", ($("#get-width").width() - 5) + 'px');
  }, 500);
  
}