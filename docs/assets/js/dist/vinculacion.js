
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

  let tabla = $('#TablaEmpresa').DataTable({
      "responsive": true,
    "columnDefs": [ {
        "targets": 'no-sort',
        "orderable": false,
        },
        {
            targets: 0,
            className: "text-center"
        },
        {
            targets: 1,
            className: "text-center"
          },
        {
            targets: 3,
            className: "text-center"
        },
        {
            targets: 4,
            className: "text-center"
          } ],
  "order": [[ 0, "asc" ]],
  "language": {
    url: filescdn + "/assets/js/lib/data-table/spanish.json",
  },
  "lengthMenu":		[[5, 7, 10, 20, 25, 30, 50, -1], [5, 7, 10, 20, 25, 30, 50, "Todos"]],
  "iDisplayLength":	idlp
});

$(document).on("click", ".vinculados-empresa", function () {
  var logo_empresa = $(this).attr('src');
  var nombre_empresa = $(this).attr('alt');
  var direccion_empresa = $(this).attr('data-direccion');
  var telefono_empresa = $(this).attr('data-telefono'); 
  var correo_empresa = $(this).attr('data-correo');
  var descripcion_empresa = $(this).attr('data-descripcion');
  var data_data = $(this).attr('data-data');
   var cantidad_estudinates = '';
   var nids = $(this).attr('data-ids');
  if(nids > 0){
   $('#vinculados-empresa h4').html(nids + ' estudiantes vinculados a esta empresa');
  }else{
    cantidad_estudinates = '<div class="alert alert-info" role="alert">No hay estudiantes vinculados</div>'; 
    $('#vinculados-empresa').hide();
  }

  $('#empresa-vinculados').html('<div class="row"><div class="col-2 text-center" style="display: flex; justify-content: center; align-items: center;"><img style="max-width:150px;" src="' + logo_empresa + '" alt="' + nombre_empresa + '"></div><div class="col-7"><div class="font-weight-bold" style="font-size:2rem">' + nombre_empresa + '</div><div>' + direccion_empresa + '</div><div>' + telefono_empresa + '</div><div>' + correo_empresa + '</div><div>' + descripcion_empresa + '</div></div><div class="col-3" id="peity-empresa"></div></div>' + cantidad_estudinates);
  $('#empresaModalTitle').html('Vinculaciones con ' + nombre_empresa);

  if(nids > 0){
  
      data_data = data_data.split("##");
      
      tabla.clear().draw();
      var varones = 0;
      var hembras = 0;
        $.each(data_data, function(i, iest){
        if(iest != ''){
       est = iest.split("#");
      var isexo = '';
      if(est[4] == 1){
       isexo = '<span style="display:none">Varón</span><i rel="tooltip" title="Varón" style="font-size:25pt;color:green;" class="fa fa-male"></i>';
       varones++;
      }else if(est[4] == 2){
        isexo = '<span style="display:none">Hembra</span><i rel="tooltip" title="Hembra" style="font-size:25pt;color:green;" class="fa fa-female"></i>';
        hembras++;
      }else{
        isexo = '';
      }
     tabla.row.add([
        est[1],
        '<img class="align-self-center foto-estudiantep rounded-circle mr-3 estudiantes-conectados-grupo" style="width:35px;height:35px;border: 2px solid #ffffff" alt="' + est[3] + '" src="' +  est[2] + '">',
       '<a style="color:black" title="' + est[3] + '" rel="toolstip" href="index.php?op=VerEstudiante&id=' + est[0] + '&grupo=' + est[6] + '"><strong>' + est[3] + '</strong></a>',
        isexo,
        est[5] + ' años',
        '<a class="text-black font-weight-bold" href="index.php?op=RegistrarCalificaciones&grupo=' + est[6] + '">' + est[7] + '</a>'
      ]).draw();
    }
    })
    $('#peity-empresa').html('<div class="text-center chart-container peity-grupo-empresa">            <span id="progreso_alumno_bar" data-peity=\'{"delimiter": ",", "max": 100, "min": 0, "padding": 0.1,"height": 100, "width": 200}\'>' + Number(parseFloat(hembras / nids * 100).toFixed(0)) + ',' + Number(parseFloat(varones / nids * 100).toFixed(0)) + '</span>            </div><div class="legend">  <div class="legend-item">Hembras: ' + hembras + '</div>  <div class="legend-item">Varones: ' + varones + '</div></div>');

    
$("#progreso_alumno_bar").peity("bar", {
fill: ["#4d89f9", "#F96262"]
});

$(".peity-grupo-empresa svg.peity").each(function() {
  
      let svg = $(this);
      let rects = svg.find("rect");

      rects.each(function() {
         let $rect = $(this);
    let value = $rect.attr("data-value");

    let left = parseFloat($rect.attr("x"));
    let top  = parseFloat($rect.attr("y")) - 15;
    let width = parseFloat($rect.attr("width"));

    let $label = $('<div class="bar-value">' + value + '%</div>');
    $label.css({
      left: left + "px",
      top: top + "px",
      width: width + "px"
    });

    $("#progreso_alumno_bar").parent().append($label);
    
      });
    });
  
   $('#vinculados-empresa').show();
    
  }

    })



    
$(document).on("click", "#custom-nav-contact-tab", function () {
  
  var tnids = 0;
  var thembras = 0;
  var tvarones = 0;
 $('.barras-grupos').each(function() {

  var id_grupo = $(this).attr('data-id');
     
    var data_datas = $(this).attr('data-datas');
  
     data_datas = data_datas.split("##");
  
      var varones = 0;
      var hembras = 0;
        $.each(data_datas, function(i, est){
        if(est != ''){
       est = est.split("#");
          if(est[6] == id_grupo){
      if(est[4] == 1){
       varones++;
      }else if(est[4] == 2){
        hembras++;
      }

    }

    }
    })

    thembras += hembras;
    tvarones += varones;

    var nids = Number($(this).attr('data-ids'));
    
    tnids += nids;

    $('#grupo-' + id_grupo).html('<div class="ml-4 text-center chart-container peity-grupo-' + id_grupo + '">            <span id="grupo-bar-' + id_grupo + '" data-peity=\'{"delimiter": ",", "max": 100, "min": 0, "padding": 0.1,"height": 100, "width": 200}\'>' + Number(parseFloat(hembras / nids * 100).toFixed(0)) + ',' + Number(parseFloat(varones / nids * 100).toFixed(0)) + '</span>            </div><div class="ml-4 text-center legend">  <div class="legend-item">Hembras: ' + hembras + '</div>  <div class="legend-item">Varones: ' + varones + '</div></div>');

$('#grupo-bar-' + id_grupo).peity("bar", {
fill: ["#4d89f9", "#F96262"]
});

$('.peity-grupo-' + id_grupo + ' svg.peity').each(function() {
  
      let svg = $(this);
      let rects = svg.find("rect");

      rects.each(function() {
         let $rect = $(this);
    let value = $rect.attr("data-value");

    let left = parseFloat($rect.attr("x"));
    let top  = parseFloat($rect.attr("y")) - 15;
    let width = parseFloat($rect.attr("width"));

    let $label = $('<div class="bar-value">' + value + '%</div>');
    $label.css({
      left: left + "px",
      top: top + "px",
      width: width + "px"
    });

    $('#grupo-bar-' + id_grupo).parent().append($label);
    
      });
    });
  
  })



$('#grupo-total').html('<div class="ml-4 text-center chart-container peity-grupo-total">            <span id="grupo-bar-total" data-peity=\'{"delimiter": ",", "max": 100, "min": 0, "padding": 0.1,"height": 100, "width": 200}\'>' + Number(parseFloat(thembras / tnids * 100).toFixed(0)) + ',' + Number(parseFloat(tvarones / tnids * 100).toFixed(0)) + '</span>            </div><div class="ml-4 text-center legend">  <div class="legend-item">Hembras: ' + thembras + '</div>  <div class="legend-item">Varones: ' + tvarones + '</div></div>');

$('#grupo-bar-total').peity("bar", {
fill: ["#4d89f9", "#F96262"]
});

$('.peity-grupo-total svg.peity').each(function() {
  
      let svg = $(this);
      let rects = svg.find("rect");

      rects.each(function() {
         let $rect = $(this);
    let value = $rect.attr("data-value");

    let left = parseFloat($rect.attr("x"));
    let top  = parseFloat($rect.attr("y")) - 15;
    let width = parseFloat($rect.attr("width"));

    let $label = $('<div class="bar-value">' + value + '%</div>');
    $label.css({
      left: left + "px",
      top: top + "px",
      width: width + "px"
    });

    $('#grupo-bar-total').parent().append($label);
    
      });
    });














  

    })
      
})