
$(document).ready(function() {

    var filescdn = $("#datos_js").attr("filescdn");

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
        url: filescdn + "/assets/js/lib/data-table/SpanishGrupo.json"
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
        url: filescdn + "/assets/js/lib/data-table/spanish.json",
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
        url: filescdn + "/assets/js/lib/data-table/SpanishGrupos.json"
      },
      "lengthMenu":		[[5, 7, 10, 15, 20, 25, 50, -1], [5, 7, 10, 15, 20, 25, 50, "Todos"]],
      "iDisplayLength":	idlp,
    });

  $(document).on(
    "blur",
    "#TablaPsicologia_wrapper select:first",
    "#TablaEstudiantesPsi_wrapper select:first",
    /*"#TablaPsicologiaGrupo_wrapper select:first",*/
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
	$("#btnvc").attr('href', 'index.php?op=VerEstudiante&id=' + e + '&grupo=' + g);
		}
	 $.ajax({
  method: "POST",	
  url: "sesion.php?op=DatosEstudiante",
  data: {e: e}
	})
  .done(function(datos){
    console.log(datos);
  $('#pdate').attr('e', e);
  $('#pdate').show("slow");
  $("#datos-estudiante").html(datos);
  $('#datos-estudiantes').show();
  })
  
  .fail(function(a, b, c) {
    console.log(a, b, c);
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
	$(".botones-aescolar-menu").hide("slow");
	$('#pactividad').show("slow");
	$('#actividadp').text('');
});

         const wrapper = document.getElementById('DatosModalEstudiante');
        const content = document.getElementById('DatosModalEstudianteBody');
        const magnifier = document.getElementById('magnifier');
        const magnifierContent = document.getElementById('magnifierContent');
        
        const magnification = 2;
        const magnifierSize = 150;
        
        magnifierContent.innerHTML = content.innerHTML;
        magnifierContent.style.width = content.offsetWidth + 'px';
        magnifierContent.style.height = content.offsetHeight + 'px';
        magnifierContent.style.display = 'flex';
        magnifierContent.style.flexDirection = 'column';
        magnifierContent.style.justifyContent = 'center';
        magnifierContent.style.alignItems = 'center';
        
        const styles = window.getComputedStyle(content);
        magnifierContent.style.background = styles.background;
        magnifierContent.style.padding = styles.padding;
        magnifierContent.style.boxSizing = styles.boxSizing;
        
        const h2 = magnifierContent.querySelector('h2');
        const p = magnifierContent.querySelector('p');
        if (h2) {
            h2.style.color = 'white';
            h2.style.fontSize = '32px';
            h2.style.textShadow = '2px 2px 4px rgba(0,0,0,0.3)';
            h2.style.marginBottom = '20px';
            h2.style.marginTop = '0';
        }
        if (p) {
            p.style.color = 'white';
            p.style.fontSize = '18px';
            p.style.textAlign = 'center';
            p.style.lineHeight = '1.6';
            p.style.textShadow = '1px 1px 2px rgba(0,0,0,0.3)';
        }

        wrapper.addEventListener('mouseenter', () => {
            magnifier.style.display = 'block';
        });

        wrapper.addEventListener('mouseleave', () => {
            magnifier.style.display = 'none';
        });

        wrapper.addEventListener('mousemove', (e) => {
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            magnifier.style.left = (x - magnifierSize / 2) + 'px';
            magnifier.style.top = (y - magnifierSize / 2) + 'px';
            
            const offsetX = 0;
            const offsetY = 0;
            const bgX = -x * magnification + magnifierSize / 2;
            const bgY = -y * magnification + magnifierSize / 2;
            
            magnifierContent.style.transform = `scale(${magnification}) translate(${(bgX / magnification) - offsetX}px, ${(bgY / magnification) - offsetY}px)`;
        });