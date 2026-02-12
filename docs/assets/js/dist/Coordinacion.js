
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
        dom: 'lBfrtip',
        buttons: [
          {
            extend: 'excelHtml5',
            text: '<i class="fa fa-file-excel-o"></i> Descargar lista de cursos',
            title: 'Lista de cursos',
            filename: 'lista_cursos',
            className: 'btn btn-success btn-sm rounded-pill px-3',
            exportOptions: {
              columns: ':not(.no-export)',
              format: {
                body: function ( data, row, column, node ) {
                  var exportText = $(node).attr('data-export');
                    if (exportText) {
                      return exportText;
                    }
                  return $(node).text().trim();
                },
                header: function ( data, column, node ) {
                  var exportText = $(node).attr('data-export');
                    if (exportText) {
                      return exportText;
                    }
                  return $(node).text().trim();
                }
              }
            }
          }
        ],
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
        dom: 'lBfrtip',
        buttons: [
          {
            extend: 'excelHtml5',
            text: '<i class="fa fa-file-excel-o"></i> Descargar lista de estudiantes',
            title: 'Lista de estudiantes',
            filename: 'lista_estudiantes',
            className: 'btn btn-success btn-sm rounded-pill px-3',
            exportOptions: {
              columns: ':not(.no-export)',
              format: {
                body: function ( data, row, column, node ) {
                  var exportText = $(node).attr('data-export');
                    if (exportText) {
                      return exportText;
                    }
                  return $(node).text().trim();
                },
                header: function ( data, column, node ) {
                  var exportText = $(node).attr('data-export');
                    if (exportText) {
                      return exportText;
                    }
                  return $(node).text().trim();
                }
              }
            }
          }
        ],
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

    $('#TablaCoordinacionProfesores').DataTable({
        dom: 'lBfrtip',
        buttons: [
          {
            extend: 'excelHtml5',
            text: '<i class="fa fa-file-excel-o"></i> Descargar lista de profesores',
            title: 'Lista de profesores',
            filename: 'lista_profesores',
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
                      return exportText.replace(/<br\s*\/?>/gi, '\n');
                    }
                  return $(node).text().replace(/<br\s*\/?>/gi, '\n').trim();
                },
                footer: function(data, column, node) {
                if (node) {
                        var attr = node.getAttribute('data-export');
                        if (attr) return attr.replace(/<br\s*\/?>/gi, '\n');
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
    "#TablaCoordinacion_wrapper select:first, #TablaCoordinacionGrupo_wrapper select:first, #TablaCoordinacionProfesores_wrapper select:first",
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


 function getFileIcon(ext) {
  switch(ext.toLowerCase()) {
    case 'pdf': return '<i class="fa fa-file-pdf-o text-danger"></i>';
    case 'doc':
    case 'docx': return '<i class="fa fa-file-word-o text-primary"></i>';
    case 'xls':
    case 'xlsx': return '<i class="fa fa-file-excel-o text-success"></i>';
    case 'ppt':
    case 'pptx': return '<i class="fa fa-file-powerpoint-o text-warning"></i>';
    case 'odt':
    case 'ods':
    case 'odp': return '<i class="fa fa-file-text-o text-secondary"></i>';
    default: return '<i class="fa fa-file-o text-muted"></i>';
  }
}

 
  // 🔥 Variables configurables
  const escuelaID = $('#verArchivosDrive').data('idescuela');
  const periodoActual = $('#verArchivosDrive').data('periodo'); // Solo cambiar aquí el año cuando sea necesario

 $(document).ready(function() {
    
    $('#infoPeriodo').html(`<i class="fa fa-folder-open"></i> Mostrando archivos del periodo ${periodoActual}`);

    $(document).on('click', '#verArchivosDrive', function () {
      cargarArchivosProfesor($(this).data('idprofe'));
      $('#driveModalLabel').html('Archivos del profesor <strong>' + $(this).data('nombre') + '</strong>');
    })
    
  });

  function cargarArchivosProfesor(profesorId) {
    const ruta = `escuela_${escuelaID}/archivos/${periodoActual}/profesor_${profesorId}`;
    const dbRef = firebase.database().ref(ruta);
    $('#archivosContainer').html('<div class="text-center text-muted" style="font-size: 18px">Cargando...</div>');
    dbRef.off();

    dbRef.on('value', snapshot => {
      const data = snapshot.val();
      const contenedor = $('#archivosContainer');
      contenedor.empty();

      if (!data) {
        $('#noData').show();
        contenedor.empty();
        return;
      } else {
        $('#noData').hide();
      }

      Object.keys(data).forEach((asignaturaKey, iAsig) => {
        

        const titulo_asig = $('.asigMod[idAsig="' + asignaturaKey + '"]').html();
        
        if(titulo_asig != undefined){

        const asignaturaData = data[asignaturaKey];
        const collapseAsignaturaID = `collapse_asig_${iAsig}`;

        let htmlAsignatura = `
          <div class="card mb-3 border-info border">
            <div class="card-header bg-light">
              <button class="btn btn-sm btn-outline-secondary" data-toggle="collapse" data-target="#${collapseAsignaturaID}">
                📘 ${titulo_asig}
              </button>
            </div>
            <div id="${collapseAsignaturaID}" class="collapse show">
              <div class="card-body">
        `;

        Object.entries(asignaturaData).forEach(([fileId, fileName]) => {
          htmlAsignatura += `
            <div class="d-flex justify-content-between align-items-center border-bottom py-2">
              <span>${getFileIcon(fileName.split('.').pop())} ${fileName}</span>
              <a href="https://drive.google.com/file/d/${fileId}/view" target="_blank"
                 class="btn btn-sm btn-outline-primary">
                <i class="fa fa-eye"></i> Ver
              </a>
            </div>
          `;
        });

        htmlAsignatura += `
              </div>
            </div>
          </div>
        `;

        contenedor.append(htmlAsignatura);
        }

      });
    });
  
}


 $(document).on('click', '#archivosProfesores', function () {
      listarTodosArchivos();
    })

const escuela_sesionAll = $('#archivosProfesores').data('escuela');
const periodoActualAll = $('#archivosProfesores').data('periodo');



function listarTodosArchivos() {
  $('#listaArchivos').html('<div class="text-center text-muted" style="font-size:2rem">Cargando archivos del periodo...</div>');

  firebase.database().ref(`escuela_${escuela_sesionAll}/archivos/${periodoActualAll}`).once('value', snap => {
    if (!snap.exists()) {
      $('#listaArchivos').html('<div class="alert alert-info">No hay archivos en este periodo.</div>');
      return;
    }

    const data = snap.val();
    $('#listaArchivos').empty();

    // Recorremos profesores
    Object.keys(data).forEach((profKey, profIndex) => {
      const profesorId = profKey.replace('profesor_', '');
      const asigsMods = data[profKey];

      // IDs seguros/únicos
      const profCardId = `profesor_${profesorId}`.replace(/[^\w-]/g, '');
      const profCollapseId = `collapse_prof_${profesorId}_${profIndex}`.replace(/[^\w-]/g, '');

      // Card con header que controla el collapse del profesor (Bootstrap 4 data-toggle/data-target)
      $('#listaArchivos').append(`
        <div class="card mb-3">
          <div class="card-header p-0">
            <h5 class="mb-0">
              <button type="button" class="btn btn-block text-left text-white" style="background:#007bff;border:none;border-radius:0;padding:0.75rem 1rem;"
                data-toggle="collapse" data-target="#${profCollapseId}" aria-expanded="true" aria-controls="${profCollapseId}">
                ${profesores[profesorId] || profesorId}
              </button>
            </h5>
          </div>

          <div id="${profCollapseId}" class="collapse show">
            <div class="card-body" id="${profCardId}"></div>
          </div>
        </div>
      `);

      let n = 1;
      // Recorremos asignaturas del profesor
      Object.keys(asigsMods).forEach((asigKey, asigIndex) => {
        if (asignaturas[asigKey] != undefined) {
          const archivos = asigsMods[asigKey];
          const fileIds = Object.keys(archivos);
          if (fileIds.length === 0) return;

          const bloqueId = `prof_${profesorId}_asig_${asigKey}`.replace(/[^\w-]/g, '');
          const asigCollapseId = `collapse_prof_${profesorId}_asig_${asigIndex}`.replace(/[^\w-]/g, '');

          // Encabezado de asignatura: clic en el título controla el collapse (Bootstrap 4)
          $(`#${profCardId}`).append(`
            <div class="mb-2">
              <h6 class="mb-1 font-weight-bold" style="cursor:pointer; color:#007bff;"
                  data-toggle="collapse" data-target="#${asigCollapseId}" aria-expanded="true" aria-controls="${asigCollapseId}">
                ${n} - ${asignaturas[asigKey] || asigKey}
              </h6>
              <div id="${asigCollapseId}" class="collapse show">
                <ul class="list-group mb-3" id="${bloqueId}"></ul>
              </div>
            </div>
          `);

          const cont = $(`#${bloqueId}`);
          let a = 1;
          fileIds.forEach((fileId, index) => {
            const fileData = archivos[fileId];
            const nombreFirebase = typeof fileData === 'string' ? fileData : (fileData?.nombre || 'Archivo');
            const linkDrive = `https://drive.google.com/file/d/${fileId}/view`;

            cont.append(`
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <div id="fileinfo_${fileId}">
                  ${n}.${a} ${getFileIcon(nombreFirebase.split('.').pop())}
                  <a href="${linkDrive}" target="_blank" class="nombre-firebase">${nombreFirebase}</a>
                  <div class="text-muted small">Pulse "Más info"</div>
                </div>
                <button type="button" class="btn btn-sm btn-outline-primary cargar-drive" data-fileid="${fileId}">
                  <i class="fa fa-refresh"></i> Más info
                </button>
              </li>
            `);
            a++;
          });

          n++;
        }
      });
    });

    // Delegación de evento para botones "Más info" (por archivo)
    $('#listaArchivos').off('click', '.cargar-drive').on('click', '.cargar-drive', function () {
      const fileId = $(this).data('fileid');
      const infoDiv = $(`#fileinfo_${fileId}`);
      const btn = $(this);

      btn.prop('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> Cargando...');
      infoDiv.find('.text-muted').text('Cargando información de Drive...');

      $.ajax({
        url: 'up.php?op=ArchivosProfesoresDrive',
        method: 'POST',
        dataType: 'json',
        data: { files: [fileId] },
        success: function (resp) {
          if (!resp.success || !resp.archivos || resp.archivos.length === 0) {
            infoDiv.find('.text-muted').html('<span class="text-danger">Error cargando detalles</span>');
            btn.prop('disabled', false).html('<i class="fa fa-refresh"></i> Más info');
            return;
          }

          const f = resp.archivos[0];
          if (f.error) {
            infoDiv.find('.text-muted').html(`<span class="text-danger">${f.error}</span>`);
            btn.prop('disabled', false).html('<i class="fa fa-refresh"></i> Más info');
            return;
          }

          // Actualiza el contenido con datos del Drive
          infoDiv.find('.text-muted').html(`
            <div class="small text-muted">
              Modificado: ${new Date(f.modified).toLocaleString()}
            </div>
          `);

          // Reemplaza botón de carga por botón de enlace externo
          btn.replaceWith(`
            <a href="${f.link}" target="_blank" class="btn btn-sm btn-outline-success">
              <i class="fa fa-external-link"></i>
            </a>
          `);

          // Actualiza el nombre mostrado al de Drive
          infoDiv.find('.nombre-firebase')
            .attr('href', f.link)
            .text(f.name);
        },
        error: function () {
          btn.prop('disabled', false).html('<i class="fa fa-refresh"></i> Más info');
          infoDiv.find('.text-muted').html('<span class="text-danger">Error en conexión</span>');
        }
      });
    });
  });
}

$(document).on('click', '#ListaGrupoPDF', function () {
     ListaFinalPDF(1);
})


/*

function listarTodosArchivos() {
  $('#listaArchivos').html('<div class="text-center text-muted" style="font-size:2rem">Cargando archivos del periodo...</div>');

  firebase.database().ref(`escuela_${escuela_sesionAll}/archivos/${periodoActualAll}`).once('value', snap => {
    if (!snap.exists()) {
      $('#listaArchivos').html('<div class="alert alert-info">No hay archivos en este periodo.</div>');
      return;
    }

    const data = snap.val();
    $('#listaArchivos').empty();

    // Recorremos profesores
    Object.keys(data).forEach(profKey => {
      const profesorId = profKey.replace('profesor_', '');
      const asigsMods = data[profKey];

      const cardId = `profesor_${profesorId}`;
      $('#listaArchivos').append(`
        <div class="card mb-3">
          <div class="card-header bg-primary text-white">
            ${profesores[profesorId] || profesorId}
          </div>
          <div class="card-body" id="${cardId}"></div>
        </div>
      `);

      let n = 1;
      Object.keys(asigsMods).forEach(asigKey => {
        if (asignaturas[asigKey] != undefined) {
          const archivos = asigsMods[asigKey];
          const fileIds = Object.keys(archivos);
          if (fileIds.length === 0) return;

          const bloqueId = `prof_${profesorId}_asig_${asigKey}`.replace(/[^\w]/g, '');
          $(`#${cardId}`).append(`
            <h6 class="mt-3 mb-2 font-weight-bold">${n} - ${asignaturas[asigKey] || asigKey}</h6>
            <ul class="list-group mb-3" id="${bloqueId}"></ul>
          `);

          const cont = $(`#${bloqueId}`);
          let a = 1;
          fileIds.forEach((fileId, index) => {
            const fileData = archivos[fileId];
            const nombreFirebase = typeof fileData === 'string' ? fileData : (fileData?.nombre || 'Archivo');
            const linkDrive = `https://drive.google.com/file/d/${fileId}/view`;

            cont.append(`
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <div id="fileinfo_${fileId}">
                  ${n}.${a} ${getFileIcon(nombreFirebase.split('.').pop())}
                  <a href="${linkDrive}" target="_blank" class="nombre-firebase">${nombreFirebase}</a>
                  <div class="text-muted small"></div>
                </div>
                <button class="btn btn-sm btn-outline-primary cargar-drive" data-fileid="${fileId}">
                  <i class="fa fa-refresh"></i> M&aacute;s info
                </button>
              </li>
            `);
            a++;
          });

          n++;
        }
      });
    });

    // Evento del botón "Cargar info de Drive"
    $('#listaArchivos').on('click', '.cargar-drive', function () {
      const fileId = $(this).data('fileid');
      const infoDiv = $(`#fileinfo_${fileId}`);
      const btn = $(this);

      btn.prop('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> Cargando...');
      infoDiv.find('.text-muted').text('Cargando información de Drive...');

      $.ajax({
        url: 'up.php?op=ArchivosProfesoresDrive',
        method: 'POST',
        dataType: 'json',
        data: { files: [fileId] },
        success: function (resp) {
          if (!resp.success || !resp.archivos || resp.archivos.length === 0) {
            infoDiv.find('.text-muted').html('<span class="text-danger">Error cargando detalles</span>');
            btn.prop('disabled', false).html('<i class="fa fa-refresh"></i> Cargar info de Drive');
            return;
          }

          const f = resp.archivos[0];
          if (f.error) {
            infoDiv.find('.text-muted').html(`<span class="text-danger">${f.error}</span>`);
            btn.prop('disabled', false).html('<i class="fa fa-refresh"></i> Cargar info de Drive');
            return;
          }

          // Actualiza el contenido con datos del Drive
          infoDiv.find('.text-muted').html(`
            <div class="small text-muted">
              Modificado: ${new Date(f.modified).toLocaleString()}
            </div>
          `);

          // Reemplaza botón de carga por botón de enlace externo
          btn.replaceWith(`
            <a href="${f.link}" target="_blank" class="btn btn-sm btn-outline-success">
              <i class="fa fa-external-link"></i>
            </a>
          `);

          // Actualiza el nombre mostrado al de Drive
          infoDiv.find('.nombre-firebase')
            .attr('href', f.link)
            .text(f.name);
        },
        error: function () {
          btn.prop('disabled', false).html('<i class="fa fa-refresh"></i> Cargar info de Drive');
          infoDiv.find('.text-muted').html('<span class="text-danger">Error en conexión</span>');
        }
      });
    });
  });
}


}*/