var local = $("#index_js").attr("local");
var urlcdn = $("#index_js").attr("urlcdn");

function normalizar(texto) {
    return texto.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/ñ/g, "n");
}

function resaltarResultados(inputSelector, contenedorSelector) {
    const inputVal = $(inputSelector).val().trim();
    if (!inputVal) return;

    const palabras = inputVal.split(/\s+/).map(p => normalizar(p)).filter(Boolean);

    $(contenedorSelector).children('a').each(function() {
        const original = $(this).text();
        const normTexto = normalizar(original);
        let resaltado = "";
        let i = 0;

        while (i < original.length) {
            let matchFound = false;
            for (const palabra of palabras) {
                const subNorm = normalizar(original.substring(i, i + palabra.length));
                if (subNorm === palabra) {
                    resaltado += `<span class="tbus">${original.substr(i, palabra.length)}</span>`;
                    i += palabra.length;
                    matchFound = true;
                    break;
                }
            }
            if (!matchFound) {
                resaltado += original[i];
                i++;
            }
        }

        $(this).html(resaltado);
    });
}



// Evento principal de búsqueda
$(document).on('input keyup', '#input_buscar', function () {
    var ibv = $(this).val();

    // ✅ Solo caracteres válidos (incluye espacios)
    ibv = ibv.replace(/[^a-zA-Z0-9ñÑáéíóúüÁÉÍÓÚÜ ]/g, "");

    // ✅ Limitar longitud sin eliminar espacio final
    if (ibv.length > 50) ibv = ibv.substring(0, 50);

    // Reflejar valor limpio en el input
    $(this).val(ibv);

    // ✅ Convertir a minúsculas solo para enviar al backend
    var inb = ibv.toLowerCase().trim();

    if (inb.length === 0) {
        $("#estudiante_busquedasel").hide();
        return;
    }

    if (inb.length > 1 && inb != "buscar...") {
        $.ajax({
            method: "POST",
            url: "sesion.php?op=BusquedaEst",
            data: { input_buscar: inb }
        }).done(function (opcs) {
            $('#estudiante_busquedasel').html(opcs);
            $('#estudiante_busquedasel').attr('size', 7);
            $("#estudiante_busquedasel").show();

            // ✅ Resaltar palabras después de cargar resultados
            resaltarResultados("#input_buscar", "#estudiante_busquedasel");
        });
    } else {
        // Limpiar resultados si input vacío
        $('#estudiante_busquedasel').html("").hide();
    }
});


// Navegación con teclado
$(document).on("keyup", "#input_buscar", function (event) {
    if (event.key === "ArrowDown") $(".estudiante_busquedasel:first").focus();
    if (event.key === "Escape") $("#estudiante_busquedasel").hide();
});

$(document).on("keyup change", ".estudiante_busquedasel:first", function (event) {
    if (event.key === "ArrowUp") $("#input_buscar").focus();
});

$(document).on("keyup change", ".estudiante_busquedasel", function (event) {
    if (event.key === "ArrowUp") $(event.target).prev().focus();
    if (event.key === "ArrowDown") $(event.target).next().focus();
    if (event.key === "Escape") $("#input_buscar").focus();
});

// Mostrar foto al pasar mouse o focus
$(document).on("mouseenter focus", ".estudiante_busquedasel", function () {
    $(".foto-busqueda").remove();
    const foto = $(this).attr("foto");
    const sfoto = (local == 1)
        ? urlcdn + "/imagenes/fotos/foto.jpg"
        : "https://lh3.googleusercontent.com/a/default-user";

    if (foto && foto !== sfoto) {
        const html = `<div class="text-right foto-busqueda"><img class="rounded-circle" style="width:15%" src="${foto}" /></div>`;
        $("#estudiante_busquedasel").after(html);
    }
});

// Cerrar resultados
$("#busqueda_cerrar").on("click", function () {
    $("#estudiante_busquedasel").hide();
});
