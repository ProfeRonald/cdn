  var id_asignaturamf = $("#datos_js").attr("id_asignaturamf");
  var id_grupo = $("#datos_js").attr("id_grupo");
  var id_sesion = Number($("#datos_js").attr("id_sesion"));
  var escuela_sesion = Number($("#datos_js").attr("escuela_sesion"));
  
  // Espera hasta que los elementos del DOM estén disponibles (por carga AJAX)
function initGruposScript() {
  const inputLista = document.getElementById("listaEstudiantes");
  const inputNumGrupos = document.getElementById("numGrupos");
  const inputMiembrosPorGrupo = document.getElementById("miembrosPorGrupo");
  const generarBtn = document.getElementById("generarBtn");
  const resultadoSpan = document.getElementById("resultadoGrupos");

  if (!inputLista || !inputNumGrupos || !inputMiembrosPorGrupo || !generarBtn || !resultadoSpan) {
    // Si aún no existen, esperar y volver a intentar
    setTimeout(initGruposScript, 200);
    return;
  }

  console.log("✅ Elementos detectados, inicializando eventos...");

  // ---- Función para convertir lista a arreglo ----
  function convertirListaATabla(texto) {
    const lineas = texto.split("\n").map(l => l.trim()).filter(l => l);
    return lineas.map(linea => {
      const partes = linea.split(",");
      const nombre = partes[0].trim();
      const num = parseInt(partes[1].replace("#", "").trim());
      return { nombre, num };
    });
  }

  // ---- Lógica funcional ----
  function totalEstudiantesActual() {
    const estudiantes = convertirListaATabla(inputLista.value);
    return estudiantes.length || 1;
  }

  function actualizarRangos() {
    const total = totalEstudiantesActual();
    inputNumGrupos.min = 2;
    inputNumGrupos.max = Math.floor(total / 2) || 2;
    inputMiembrosPorGrupo.min = 2;
    inputMiembrosPorGrupo.max = Math.floor(total / 2) || 2;
  }

  function actualizarBoton() {
    const numGruposVal = parseInt(inputNumGrupos.value);
    const miembrosVal = parseInt(inputMiembrosPorGrupo.value);
    generarBtn.style.display =
      (numGruposVal >= 2 || miembrosVal >= 2) ? "inline-block" : "none";
  }

  function formarGrupos(lista, numGrupos = null, miembrosPorGrupo = null) {
   
    const total = lista.length; 
    const listaMezclada = [...lista].sort(() => Math.random() - 0.5);
    let grupos = [];

    if (miembrosPorGrupo) {
      numGrupos = Math.floor(total / miembrosPorGrupo);
      if (numGrupos === 0) numGrupos = 1;
      let idx = 0;
      for (let i = 0; i < numGrupos; i++) {
        grupos.push(listaMezclada.slice(idx, idx + miembrosPorGrupo));
        idx += miembrosPorGrupo;
      }
      const sobrantes = listaMezclada.slice(idx);
      sobrantes.forEach((est, i) => {
        grupos[i % grupos.length].push(est);
      });
    } else {
      numGrupos = numGrupos || 1;
      const base = Math.floor(total / numGrupos);
      const sobrantes = total % numGrupos;
      let idx = 0;
      for (let i = 0; i < numGrupos; i++) {
        const cantidad = base + (i < sobrantes ? 1 : 0);
        grupos.push(listaMezclada.slice(idx, idx + cantidad));
        idx += cantidad;
      }
    }

    // Redistribuir grupos con un solo miembro
    for (let i = grupos.length - 1; i >= 0; i--) {
      if (grupos[i].length === 1 && grupos.length > 1) {
        const solitario = grupos[i].pop();
        const destinos = grupos.filter((_, index) => index !== i && grupos[index].length > 0);
        destinos[Math.floor(Math.random() * destinos.length)].push(solitario);
      }
    }

    return grupos.filter(g => g.length > 0);
  }

  function mostrarGrupos(grupos) {
    const container = document.getElementById("gruposContainer");
    container.innerHTML = "";
    grupos.forEach((grupo, i) => {
      const div = document.createElement("div");
      div.classList.add("grupo");
      div.classList.add("Grupo_" + (i + 1));
      div.setAttribute("tabindex", "0");

      const titulo = document.createElement("div");
      titulo.textContent = `${i + 1} - Grupo ${i + 1}: ${grupo.length} miembros`;
      titulo.classList.add("font-weight-bold");

      div.appendChild(titulo);

      const ul = document.createElement("ul");
      grupo.forEach(est => {
        const li = document.createElement("li");
        li.textContent = `${est.nombre}, #${est.num}`;
        ul.appendChild(li);
      });
      div.appendChild(ul);
      container.appendChild(div);
    });
  }

  // ---- Inicialización de eventos ----
  generarBtn.style.display = "none";
  actualizarRangos();
  actualizarBoton();

  inputNumGrupos.addEventListener("input", () => {
    actualizarRangos();
    actualizarBoton();
  });

  inputMiembrosPorGrupo.addEventListener("input", () => {
    actualizarRangos();
    actualizarBoton();
  });

  inputLista.addEventListener("input", () => {
    actualizarRangos();
    actualizarBoton();
  });

  generarBtn.addEventListener("click", () => {
    const estudiantes = convertirListaATabla(inputLista.value);
    if (estudiantes.length === 0) {
      alert("La lista de estudiantes está vacía.");
      return;
    }

    actualizarRangos();

    const numGrupos = inputNumGrupos.value ? parseInt(inputNumGrupos.value) : null;
    const miembrosPorGrupo = inputMiembrosPorGrupo.value ? parseInt(inputMiembrosPorGrupo.value) : null;

    try {

         if($('#gruposContainer').text() != ''){
    
         if (!confirm("¿Seguro desea reemplazar los grupos existentes?")) {
        return false;
      }

    }
    
      const grupos = formarGrupos(estudiantes, numGrupos, miembrosPorGrupo);
      mostrarGrupos(grupos);
      const gruposString = JSON.stringify(grupos);
      console.log(gruposString);
      ruletaweb.database().ref('ruletas/escuela_' + escuela_sesion + '/profesor_' + id_sesion + '/' + id_grupo + '-' + id_asignaturamf + '-' + $("#teps").attr("tipo_ruleta")).set(gruposString);
      $('#r-' + escuela_sesion + '-' + id_sesion + '-' + id_grupo + '-' + id_asignaturamf + '-' + $("#teps").attr("tipo_ruleta")).val(crearListaGrupos(grupos.length));
      $('.blur_ruleta').trigger('blur');
      resultadoSpan.textContent = `Se han generado ${grupos.length} grupos`;
    } catch (e) {
      alert(e.message);
    }


  });
}

function crearListaGrupos(n) {
  let texto = "";
  for (let i = 1; i <= n; i++) {
    texto += `Grupo ${i}\n`;
  }
  return texto.trim(); // elimina salto final
}

// Iniciar comprobación tras carga del documento
document.addEventListener("DOMContentLoaded", initGruposScript);
