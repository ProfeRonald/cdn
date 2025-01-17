
$(document).ready(function() {

    $(document).on('click', '#EliminarAlumno', function () {

      if (
                       !confirm(
						"Se eliminar&aacute;n todos los datos del estudiante y todas sus calificaciones."
                       )
                     ) {
                       return false;
                     }

					 $('#EliminandoAlumno').modal('show');

					 $(document).on('click', '#confirma-eliminar', function () {
						if($(this).prop('checked') == true){
							$('#elimina-estudiante').prop('disabled', false);
							$('#elimina-estudiante').attr('class', 'btn btn-danger');
						}else{
							$('#elimina-estudiante').prop('disabled', true);
							$('#elimina-estudiante').attr('class', 'btn btn-secondary');
						}
					 })
					 
					 

    });

	$(document).on('click', '#elimina-estudiante', function () {
    $.ajax({
      method: "POST",
      url: "up.php?op=EliminarEstudiante",
      data: {
        op: "EliminarEstudiante",
        id: $('#id_estudiante').val()
      }
    })
      .done(function (e) {
		console.log(e);
        if (e == 1) {
			$('#EliminandoAlumno .modal-body').html('<span style="font-size:2rem;color:#218c74;font-weight:bold;" class="fa fa-trash"> &iexcl;Eliminado!</span>');
			$('#elimina-estudiante').hide();
          setTimeout(function () {
            location.href = 'index.php';
          }, 4000);
        } else {
			$('#EliminandoAlumno .modal-body').html('<span style="font-size:2rem;color:#b33939;font-weight:bold;" class="fa fa-ban"> &iexcl;No se pudo eliminar!</span>');
			setTimeout(function () {
				$('#EliminandoAlumno .modal-body').html('Esto eliminar&aacute; todos los datos y calificaciones de este estudiante. &iquest;Est&aacute; seguro?          <div class="checkbox mt-3">            <label style="align-items:center;display:flex">              <input type="checkbox" id="confirma-eliminar" style="width:30px;height: 30px">&nbsp;&nbsp;&nbsp;Estoy seguro            </label>          </div>');
          }, 4000);
        }
      })
  
  }); 

  });