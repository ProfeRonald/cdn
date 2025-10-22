 var id_sesion = Number($("#datos_js").attr("id_sesion"));
 var escuela_sesion = Number($("#datos_js").attr("escuela_sesion"));
 var correo_coordinador = $("#datos_js").attr("correo_coordinador");
 var year_1 = Number($("#datos_js").attr("year_1"));
  var year_2 = Number($("#datos_js").attr("year_2"));
  var id_asignaturamf = $("#datos_js").attr("id_asignaturamf");

$(document).on('click', '#uploadIcon', function() {
  $('#fileInput').click();
});

$(document).on('change', '#fileInput', function() {
  const file = this.files[0];
  if (!file) return;

  // Verifica tipo de archivo
  const allowedExtensions = [
    'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'odt', 'ods', 'odp'
  ];
  const ext = file.name.split('.').pop().toLowerCase();

  if (!allowedExtensions.includes(ext)) {
    $('#resultMsg').html('<div class="alert alert-warning">Tipo de archivo no permitido.</div>');
    $(this).val(''); // limpiar
    return;
  }

  // Inicia la subida automática
  subirArchivo(file);
});

function subirArchivo(file) {
  const formData = new FormData();
  formData.append('archivo', file); 
   formData.append('correo_coordinador', correo_coordinador);

   $('#progressBar').parent().show('slow');
   $('#resultMsg').show('slow');

  $('.progress').show();
  $('#progressBar').css('width', '0%').text('0%');
  $('#resultMsg').html('<div class="text-muted mb-2" style="font-size: 1.2rem;">Subiendo "' + file.name + '"...</div>');

  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'up.php?op=SubirAlDrive', true);

  xhr.upload.onprogress = function(e) {
    if (e.lengthComputable) {
      const percent = (e.loaded / e.total) * 100;
      $('#progressBar').css('width', percent + '%').text(Math.round(percent) + '%');
    }
  };

  xhr.onload = function() {
  if (xhr.status === 200) {
    const resp = JSON.parse(xhr.responseText);
    if (resp.success) {
      // Guardar en Firebase
      const filePath = `escuela_${escuela_sesion}/archivos/${year_1}-${year_2}/profesor_${id_sesion}/${id_asignaturamf}/${resp.fileId}`;
      firebase.database().ref(filePath).set(resp.fileName);
      $('#resultMsg').html(`<div class="alert alert-success">${resp.message}</div>`);
       setTimeout(function () {
      $('#progressBar').parent().hide('slow');
      $('#resultMsg').hide('slow');
      }, 3000);
    } else {
      $('#resultMsg').html(`<div class="alert alert-danger">${resp.error}</div>`);
    }
  }
};


  xhr.send(formData);
}


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

  function cargarArchivosProfesor() {
    const ruta = `escuela_${escuela_sesion}/archivos/${year_1}-${year_2}/profesor_${id_sesion}`;
    $('#periodoActual').text(year_1 + '-' + year_2);
    const dbRef = firebase.database().ref(ruta);

    dbRef.off();
    dbRef.on('value', snapshot => {
      const data = snapshot.val();
      const contenedor = $('#archivosContainer');
      contenedor.empty();

      if (!data) {
        $('#noData').show();
        return;
      } else {
        $('#noData').hide();
      }

      Object.keys(data).forEach((asignaturaKey, iAsig) => {
        const asignaturaData = data[asignaturaKey];
        const collapseAsignaturaID = `collapse_asig_${iAsig}`;

        //$('#asignatura_grupo').

        const titulo_asig = $('#asignatura_grupo option[value="' + asignaturaKey + '"]').text()

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
  <div class="d-flex justify-content-between align-items-center border-bottom py-2" id="file_${fileId}">
    <span>${getFileIcon(fileName.split('.').pop())} ${fileName}</span>
              <div>
                <a href="https://drive.google.com/file/d/${fileId}/view" target="_blank"
                   class="btn btn-sm btn-outline-primary mr-1">
                  <i class="fa fa-eye"></i> Ver
                </a>
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarArchivo('${fileId}', '${asignaturaKey}')">
                  <i class="fa fa-trash"></i> Eliminar
                </button>
              </div>
            </div>
          `;
        });

        htmlAsignatura += `
              </div>
            </div>
          </div>
        `;

        contenedor.append(htmlAsignatura);
      });
    });
  }

  function eliminarArchivo(fileId, asignaturaKey) {
  if (!confirm("¿Seguro que deseas eliminar este archivo?")) return;

  // Limpiar mensajes previos
  $('#resultMsg').html('');

  $.ajax({
    url: 'up.php?op=BorrarArchivoDrive',
    method: 'POST',
    data: { fileId: fileId },
    success: function(r) {
      try {
        //const r = JSON.parse(resp);
        if (r.success) {
          // Eliminar del DOM y Firebase
          $('#file_' + fileId).remove();
          firebase.database()
            .ref(`escuela_${escuela_sesion}/archivos/${year_1}-${year_2}/profesor_${id_sesion}/${asignaturaKey}/${fileId}`)
            .remove();

          $('#resultMsg').html(`
            <div class="alert alert-success alert-dismissible fade show" role="alert">
              Archivo eliminado correctamente.
              <button type="button" class="close" data-dismiss="alert" aria-label="Cerrar">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          `);
        } else {
          $('#resultMsg').html(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
              Error al eliminar: ${r.error}
              <button type="button" class="close" data-dismiss="alert" aria-label="Cerrar">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          `);
        }
      } catch(e) {
        console.log(e);
        $('#resultMsg').html(`
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
            Error inesperado al eliminar archivo.
            <button type="button" class="close" data-dismiss="alert" aria-label="Cerrar">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        `);
      }
    },
    error: function(a,b,c) {
      console.log(a, b, c);
      $('#resultMsg').html(`
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
          Error al contactar con el servidor.
          <button type="button" class="close" data-dismiss="alert" aria-label="Cerrar">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      `);
    }
  });
}
