
  $(document).on(
    "click",
    ".VerPerfilModal", function () {

      var urlerd = $("#datos_js").attr("urlerd");
      
      $("#modalPerfil .avatar-ring img").attr("alt", '');
      $("#modalPerfil .nombre-perfil").text('');
      $("#modalPerfil .subtitle").text('');
      $("#modalPerfil .activa-perfil").text('');
      $("#modalPerfil .bio-block").text('');
      $("#modalPerfil .info-val-cedula").text('');
      $("#modalPerfil .info-val-sexo").text('');
      $("#modalPerfil .info-val-fecha-cumple").text('');
      $("#modalPerfil .info-val-direccion").text('');
      $("#modalPerfil .info-val-correo").text('');
      $("#modalPerfil .info-val-telefono").text('');
      $("#modalPerfil .info-val-nivel").text('');
      $("#modalPerfil .info-val-area-laboral").text('');
      $("#modalPerfil .carreras-cursadas").text('');
      $("#modalPerfil .recursos-enlaces").text('');
      $("#modalPerfil .grupos-cantidad").text('');
      $("#modalPerfil .estudiantes-cantidad").text('');
      $("#modalPerfil .asignaturas-cantidad").text('');
      $("#modalPerfil .horas-semana-cantidad").text('');
      $("#modalPerfil .rendimiento-persona").text('');
      $("#modalPerfil .asistencia-persona").text('');

      var id_personal = $(this).attr("id_personal");
      var datos = json_perfil[id_personal];
      console.log(datos);
      $("#modalPerfil .avatar-ring img").attr("src", datos["foto"]);
      $("#modalPerfil .avatar-ring img").attr("alt", datos["nombre"]);
      $("#modalPerfil .nombre-perfil").html(datos["nombre"]);
      $("#modalPerfil .subtitle").html(datos["puesto"]);
      $("#modalPerfil .activa-perfil").html(datos["activo"]);
      $("#modalPerfil .bio-block").html(datos["bio"]);
      $("#modalPerfil .info-val-cedula").html(datos["cedula"]);
      $("#modalPerfil .info-val-sexo").html(datos["sexo"]);
      $("#modalPerfil .info-val-fecha-cumple").html(datos["cumple"]); 
      $("#modalPerfil .info-val-direccion").html(datos["direccion"]);
      $("#modalPerfil .info-val-correo").html(datos["correo"]);
      $("#modalPerfil .info-val-telefono").html(datos["telefono"]);
      $("#modalPerfil .info-val-nivel").html(datos["nivel"]);
      
      var laboral = datos["laboral"];
      if(laboral != "" && laboral != null && laboral != undefined){
        laboral = laboral.split(':').join(', ');
        $("#modalPerfil .info-val-area-laboral").html(laboral);
      }

      var carreras = datos["carreras"];
      if(carreras != "" && carreras != null && carreras != undefined){
        carreras = carreras.split(':').join('</span><span class="tag tag-blue">');
      $("#modalPerfil .carreras-cursadas").html('<span class="tag tag-blue">' + carreras + '</span>');
      }
      
      var recursos = datos["recursos"].join('\n');
      $("#modalPerfil .recursos-enlaces").html(recursos);
      $("#modalPerfil .grupos-cantidad").html(datos["grupos"]);
      $("#modalPerfil .estudiantes-cantidad").html(datos["estudiantes"]);
      if(datos["puesto"] == "Profesor"){
      $("#modalPerfil .profesor-estadistica").show('');
      $("#modalPerfil .asignaturas-cantidad").html(datos["asignaturas"]);
      $("#modalPerfil .horas-semana-cantidad").html(datos["horas"]);
      $("#modalPerfil .boton-panel-profesor a").attr("href", urlerd + "/index.php?op=PanelProfesor&id=" + id_personal.split('-')[1]);
      $("#modalPerfil .boton-panel-profesor").show();
      }else{
        $("#modalPerfil .profesor-estadistica").hide('');
        $("#modalPerfil .boton-panel-profesor").hide();
      }

      $("#modalPerfil .rendimiento-persona").html(datos["rendimiento"] 
        + '%');
      $("#modalPerfil .rendimiento-persona-fill").css("width", datos["rendimiento"] + '%');

      $("#modalPerfil .asistencia-persona").html(datos["asistencia"]);
      $("#modalPerfil .asistencia-persona-fill").css("width", datos["asistencia"] + '%');

    });