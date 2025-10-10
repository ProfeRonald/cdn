
$(document).on('click', '#asistenciaDiaPDF', function () {
  asistenciaDiaPDF();
})

window.asistenciaDiaPDF = async function () {

  /* ------------------ util: convertir rgb -> hex ------------------ */
  function rgbToHex(rgb) {
    const m = rgb.match(/^rgba?\s*\(\s*(\d+),\s*(\d+),\s*(\d+)/i);
    if (!m) return null;
    return '#' + [m[1], m[2], m[3]].map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('');
  }

  function normalizeColor(value) {
    if (!value) return null;
    value = value.trim();
    if (value.startsWith('#')) return value;
    if (value.startsWith('rgb')) return rgbToHex(value);
    // resolver nombres de color usando elemento temporal
    const el = document.createElement('div');
    el.style.color = value;
    el.style.display = 'none';
    document.body.appendChild(el);
    const cs = getComputedStyle(el).color;
    document.body.removeChild(el);
    return cs ? rgbToHex(cs) : null;
  }

  /* ------------------ util: obtener color de fondo de una fila (hex) ------------------ */
  function getRowBgColor(tr) {
    if (!tr) return null;
    // 1) style inline en <tr>
    const styleAttr = tr.getAttribute('style') || '';
    const mInline = styleAttr.match(/background-color\s*:\s*([^;]+)/i);
    if (mInline) return normalizeColor(mInline[1]);

    // 2) style inline en la primera celda
    const firstTd = tr.querySelector('td, th');
    if (firstTd) {
      const tdStyle = firstTd.getAttribute('style') || '';
      const mTd = tdStyle.match(/background-color\s*:\s*([^;]+)/i);
      if (mTd) return normalizeColor(mTd[1]);
    }

    // 3) computed style (CSS externo)
    const cs = getComputedStyle(tr).backgroundColor;
    if (cs && cs !== 'rgba(0, 0, 0, 0)' && cs !== 'transparent') return rgbToHex(cs);

    return null;
  }

  /* ------------------ función principal: tabla -> array listo para pdfmake (solo texto visible) ------------------ */
  function tablaAArray(idTabla, options = {}) {
    const { includeTotals = false, includeFooter = false } = options;
    const tabla = document.getElementById(idTabla);
    if (!tabla) return [];

    // Leer encabezados
    const headers = Array.from(tabla.querySelectorAll('thead th')).map(th => th.innerText.trim());
    const targetLen = headers.length;

    // Construir fila de encabezado con posible color
    const headerTr = tabla.querySelector('thead tr');
    const headerBg = getRowBgColor(headerTr);
    const headerRow = headers.map(h => {
      const cell = { text: h || '', bold: true, alignment: 'center' };
      // si hay color en el HTML usarlo, si no usar el color por defecto del código anterior
      cell.fillColor = headerBg || "#8DB4E2";
      cell.color = 'white';
      return cell;
    });

    const body = [headerRow];

    // Procesar filas tbody
    const filas = Array.from(tabla.querySelectorAll('tbody tr'));
    filas.forEach(tr => {
      const bg = getRowBgColor(tr); // color en hex o null

      // detectar fila de total/subtotal:
      const firstTd = tr.querySelector('td, th');
      const hasColspan = firstTd && firstTd.getAttribute('colspan');
      const hasGradeClass = tr.querySelector('.grado_asis_hembras') || tr.querySelector('.grado_asis_total');
      const isTotalRow = !!(hasColspan || hasGradeClass || (tr.getAttribute('style') || '').includes('background-color'));

      if (isTotalRow && !includeTotals) return; // omitimos si no se piden totales

      // obtener solo texto visible de las celdas (sin inputs)
      const tdEls = Array.from(tr.querySelectorAll('td, th'));
      const texts = tdEls.map(td => td.innerText.trim());

      if (isTotalRow) {
        // Construir fila TOTAL: primera columna vacía, segunda "Total:" right, luego valores
        const row = new Array(targetLen).fill(null);
        row[0] = { text: '', fillColor: bg || undefined };
        const totalText = texts[0] || 'Total:';
        row[1] = { text: totalText, alignment: 'right', bold: true, fillColor: bg || undefined };
        // los valores siguientes (texts[1], texts[2], ...) van en las columnas 2,3,...
        for (let j = 1; j < texts.length; j++) {
          const destIndex = 1 + j; // texts[1] -> col 2
          if (destIndex < targetLen) {
            row[destIndex] = { text: texts[j] || '', bold: true, alignment: 'center', fillColor: bg || undefined };
          }
        }
        // rellenar celdas nulas con objeto vacío
        for (let k = 0; k < targetLen; k++) if (row[k] === null) row[k] = { text: '', fillColor: bg || undefined };
        body.push(row);
      } else {
        // Fila normal: # (col 0) centrar, curso (col 1) izquierda, demás centrados
        const row = [];
        for (let i = 0; i < targetLen; i++) {
          const t = texts[i] || '';
          const cell = {
            text: String(t),
            alignment: [0,2,3,4].includes(i) ? 'center' : 'left',
            fillColor: bg || undefined
          };
          row.push(cell);
        }
        body.push(row);
      }
    });

    // tfoot opcional
    if (includeFooter) {
  const footRows = Array.from(tabla.querySelectorAll('tfoot tr'));
  footRows.forEach(tr => {
    const bg = getRowBgColor(tr);
    const tdEls = Array.from(tr.querySelectorAll('td, th'));
    const texts = tdEls.map(td => td.innerText.trim());
    const row = new Array(targetLen).fill(null);

    // Primera casilla vacía
    row[0] = { text: '', fillColor: bg || undefined };

    // Segunda columna: texto "Total:" (o lo que haya) alineado a la derecha
    row[1] = { text: texts[0] || 'Total:', alignment: 'right', bold: true, fillColor: bg || undefined };

    // Resto de columnas: los valores (texts[1], texts[2], …)
    for (let j = 1; j < texts.length; j++) {
      const destIndex = 1 + j;
      if (destIndex < targetLen) {
        row[destIndex] = {
          text: texts[j] || '',
          bold: true,
          alignment: 'center',
          fillColor: bg || undefined
        };
      }
    }

    // Completar vacíos
    for (let k = 0; k < targetLen; k++) {
      if (row[k] === null) row[k] = { text: '', fillColor: bg || undefined };
    }

    body.push(row);
  });
}


    return body;
  }

  /* ------------------ generar gruposjson (usa includeTotals/includeFooter) ------------------ */
  function generarGruposJSON(opts = {}) {
    const tablaArray = tablaAArray('tabla-asistencia', opts);

    const gruposjson = [
      $('#fecha-asistencia-dia').data('logo'),
      $('#fecha-asistencia-dia').data('escuela'),
      $('#fecha-asistencia-dia').data('distrito'),
      [
        {
          curso: $('#fecha-asistencia-dia').html(),
          tabla: tablaArray
        }
      ],
      "Asistencia_del_dia_" + $('#dia_asistencia').val() + ".pdf"
    ];

    return gruposjson;
  }

  // (Tu función para convertir imagen a base64)
  async function convertirUrlABase64(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  /* ------------------ cálculo de tamaño de letra (lo dejé igual que el tuyo) ------------------ */
  const calcularFontSize = (totalFilas) => {
    totalFilas = totalFilas - 3;
    const base = 5.5;     
    const maxFilas = 40;   
    let incremento = 0.1;  

    if(totalFilas < 25){
      incremento = 0.3;
    }else if(totalFilas < 29){
      incremento = 0.2;
    }else{
      incremento = 0.1;
    }

    if (totalFilas > maxFilas) totalFilas = maxFilas;
    if (totalFilas < 1) totalFilas = 1;

    const diferencia = maxFilas - totalFilas;
    return base + diferencia * incremento;
  };

  const bloqueTablaCentrada = (pagina) => {
    const totalFilas = pagina.tabla.length;
    const fontSize = calcularFontSize(totalFilas);

    
    const body = pagina.tabla.map((row, rIdx) =>
      row.map(cell => {
        const nuevo = Object.assign({}, cell);
        nuevo.fontSize = fontSize;
        nuevo.margin = [2, 1, 2, 1];
        nuevo.noWrap = true;
        if (rIdx === 0) {
          nuevo.alignment = 'center';
          nuevo.bold = true;
          if (nuevo.fillColor && !nuevo.color) nuevo.color = 'white';
        }
        return nuevo;
      })
    );

    return {
      columns: [
        { width: '*', text: '' },
        {
          width: 'auto',
          table: {
            headerRows: 1,
            widths: Array(body[0].length).fill('auto'),
            body: body
          },
          layout: {
            hLineWidth: function (i, node) { return 0.5; },
            vLineWidth: function (i, node) { return 0.5; },
            hLineColor: function (i, node) { return 'black'; },
            vLineColor: function (i, node) { return 'black'; },
            paddingLeft: function(i, node) { return 2; },
            paddingRight: function(i, node) { return 2; },
            paddingTop: function(i, node) { return 2; },
            paddingBottom: function(i, node) { return 2; }
          },
          dontBreakRows: true,
          margin: [0,0,0,0]
        },
        { width: '*', text: '' }
      ]
    };
  };

  async function generarPDF(gruposjson) {
    var logo_escuela = gruposjson[0];
    var titulo_escuela = gruposjson[1];
    var provincia_distrito = gruposjson[2];
    var paginasJSON = gruposjson[3];
    const logoBase64 = await convertirUrlABase64(logo_escuela);
    const contenido = paginasJSON.map((pagina, index) => ({
      stack: [
        { image: logoBase64, width: 60, alignment: 'center', margin: [0,10,0,0] },
        {
          text: `República Dominicana\nMinisterio de Educación de la República Dominicana`,
          style: 'subtitulo',
          preserveLineBreaks: true,
          margin: [0,0,0,0]
        },
        {
          text: titulo_escuela,
          style: 'titulo',
          preserveLineBreaks: true,
          margin: [0,0,0,0]
        },
        {
          text: provincia_distrito,
          style: 'subtitulo',
          preserveLineBreaks: true,
          margin: [0,0,0,0]
        },
        { text: pagina.curso, style: 'titulo', margin: [0,10,0,10] },
        bloqueTablaCentrada(pagina)
      ],
      pageBreak: index === paginasJSON.length - 1 ? undefined : "after",
    }));

    const docDefinition = {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      pageMargins: [15, 5, 5, 15],
      content: contenido,
      styles: {
        titulo: { fontSize: 14, bold: true, alignment: 'center' },
        subtitulo: { fontSize: 12, italics: true, alignment: 'center' }
      },
      defaultStyle: { fontSize: 12 }
    };

    pdfMake.createPdf(docDefinition).download(gruposjson[4]);
  }

  const gruposjson = generarGruposJSON({ includeTotals: true, includeFooter: true });
  await generarPDF(gruposjson);

}


$(document).on('click', '#asistencia_diaria', function () {

  AsistenciaDiaria();

})

  function AsistenciaDiaria(){

$('#asistencia_diaria_archivo').show();
$('#asistencia_diaria_archivo').removeAttr('href');

$.ajax({
      method: "POST",
      url: "sesion.php?op=ActivarAsistenciaDiaria",
      dataType: 'json',
      data: $("#AsistenciaDiariaTotalForm").serialize()
    })
      .done(function (aviso) {

        if(aviso['aviso'] == 1){
          $('#asistencia_diaria_archivo').attr('class', 'btn btn-warning');
          $('#asistencia_diaria_archivo').text('No se pudo acceder al archivo');
        }else if(aviso['aviso'] == 2){
          $('#asistencia_diaria_archivo').attr('class', 'btn btn-warning');
          $('#asistencia_diaria_archivo').text('class', 'No se pudo obtener el archivo');
        }else if(aviso['aviso'] == 3){
          $('#asistencia_diaria_archivo').attr('class', 'btn btn-danger');
          $('#asistencia_diaria_archivo').text('No se pudo guardar el archivo');
        }else if(aviso['aviso'] == 4){
          $('#asistencia_diaria_archivo').attr('class', 'btn btn-danger');
          $('#asistencia_diaria_archivo').text('Se generaron problemas al crear el archivo');
        }else if(aviso['aviso'] == 5){
          $('#asistencia_diaria_archivo').attr('class', 'btn btn-danger');
          $('#asistencia_diaria_archivo').text('No se pudo configurar el archivo');
        }else if(aviso['aviso'] == 6){
          $('#asistencia_diaria_archivo').attr('class', 'btn btn-success');
          $('#asistencia_diaria_archivo').text('Archivo de asistencia creado');
          setTimeout(function(){
          $('#asistencia_diaria_archivo').attr('href', 'https://docs.google.com/spreadsheets/d/' + aviso['book'] + '/edit');
          $('#asistencia_diaria_archivo').text('Abrir archivo desde la cuenta de la escuela');
            },1200);
        }else if(aviso['aviso'] == 0 || aviso['aviso'] == 7 || aviso['aviso'] == 8){
          $('#asistencia_diaria_archivo').attr('class', 'btn btn-success');
          $('#asistencia_diaria_archivo').text('Abrir archivo desde la cuenta de la escuela');
          $('#asistencia_diaria_archivo').attr('href', 'https://docs.google.com/spreadsheets/d/' + aviso['book'] + '/edit');
          
        }

   if(aviso['aviso'] == 8){

   var grados = {}; 

$.each(aviso['asis'], function (curso, asis) {
  $('#curso_' + curso + '_hembras').text(asis[0]);
  var grado = $('#curso_' + curso + '_hembras').data('grado');

  if (!grados['grado_' + grado + '_hembras']) grados['grado_' + grado + '_hembras'] = 0;
  if (!grados['grado_' + grado + '_varones']) grados['grado_' + grado + '_varones'] = 0;
   if (!grados['grado_' + grado + '_total']) grados['grado_' + grado + '_total'] = 0;

  grados['grado_' + grado + '_hembras'] += Number(asis[0]);
  grados['grado_' + grado + '_varones'] += Number(asis[1]);
  grados['grado_' + grado + '_total'] += Number(asis[0]) + Number(asis[1]);

  $('#curso_' + curso + '_varones').text(asis[1]);
  $('#curso_' + curso + '_total').text(Number(asis[0]) + Number(asis[1]));
});

    var grafico = {};


    $.each(grados, function (grado, suma) {
      $('#'+ grado).text(suma);
      grafico[grado] = suma; 
    })

    var total_asis_hembras = 0;
    $('.grado_asis_hembras').each(function(){
      total_asis_hembras += Number($(this).text());
    });

    $('#total_asis_hembras').text(total_asis_hembras);
    grafico['total_asis_hembras'] = total_asis_hembras; 

    var total_asis_varones = 0;
    $('.grado_asis_varones').each(function(){
      total_asis_varones += Number($(this).text());
    });

    $('#total_asis_varones').text(total_asis_varones);
    grafico['total_asis_varones'] = total_asis_varones; 

    var total_asis_total = 0;
    $('.grado_asis_total').each(function(){
      total_asis_total += Number($(this).text());
    });

    $('#total_asis_total').text(total_asis_total);
    grafico['total_asis_total'] = total_asis_total; 
  
    grafico['total_asis_existencia'] = Number($('#data-tee').data('tee'));

    if(total_asis_total > 0){
    VerGraficoAsistencia(grafico);
    $('#toggle-stats-btn').show();
    }else{
      $('#toggle-stats-btn').hide();
      panel.classList.toggle('open', false);
    }

    $('#fecha-asistencia-dia').html(aviso['fecha']);

  }

      })

      .fail(function (a, b,c){
        console.log(a, b, c);
      })

}

const btn = document.getElementById('toggle-stats-btn');
  const panel = document.getElementById('graficos-estadisticos');

  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!isOpen));
    panel.classList.toggle('open', !isOpen);

    if (!isOpen) {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 400);
    }
  });

  $(document).on('change', '#dia_asistencia', function () {
    AsistenciaDiaria();
  });

function VerGraficoAsistencia(dataObj){

  
      google.charts.load('current', { packages: ['corechart'] });
      google.charts.setOnLoadCallback(drawCharts);

      function drawCharts() {
      
        const grados = [];

        for (let key in dataObj) {
          if (key.startsWith("grado_") && key.includes("_total")) {
            const grado = key.replace("grado_", "").replace("__total", "").replace("_total", "");
            grados.push(grado);
          }
        }

        grados.sort((a, b) => {
          const numA = parseInt(a) || 0;
          const numB = parseInt(b) || 0;
          return numA - numB;
        });

        const dataArray = [['Grado', 'Hembras', 'Varones', 'Total']];

        grados.forEach(grado => {
          const hembras = dataObj[`grado_${grado}__hembras`] || dataObj[`grado_${grado}_hembras`] || 0;
          const varones = dataObj[`grado_${grado}__varones`] || dataObj[`grado_${grado}_varones`] || 0;
          const total = dataObj[`grado_${grado}__total`] || dataObj[`grado_${grado}_total`] || (hembras + varones);
          dataArray.push([grado, hembras, varones, total]);
        });

        const dataByGrade = google.visualization.arrayToDataTable(dataArray);

        const optionsByGrade = {
          title: 'Asistencia por grado',
           chartArea: { left: 80, top: 50, right: 20, bottom: 50, width: '80%', height: '70%' },
          hAxis: { title: 'Cantidad de estudiantes', minValue: 0 },
          vAxis: { title: 'Asistencias' },
          titleTextStyle: { fontSize: 18, bold: true },
          colors: ['#f06292', '#64b5f6', '#81c784'],
          legend: { position: 'top', alignment: 'center' },
           bar: { groupWidth: '70%' }
        };

        const chartByGrade = new google.visualization.ColumnChart(document.getElementById('chart_by_grade'));
        chartByGrade.draw(dataByGrade, optionsByGrade);

        const dataTotals = google.visualization.arrayToDataTable([
          ['Género', 'Cantidad'],
          ['Hembras', dataObj.total_asis_hembras || 0],
          ['Varones', dataObj.total_asis_varones || 0]
        ]);

        const optionsTotals = {
          title: 'Totales generales por género',
          pieHole: 0.4,
           titleTextStyle: { fontSize: 18, bold: true },
          colors: ['#f06292', '#64b5f6']
        };

        const chartTotals = new google.visualization.PieChart(document.getElementById('chart_totals'));
        chartTotals.draw(dataTotals, optionsTotals);

        const asistencia = dataObj.total_asis_total || 0;
        const existencia = dataObj.total_asis_existencia || asistencia;
        const ausentes = Math.max(0, existencia - asistencia);
        const porcentaje = existencia > 0 ? ((asistencia / existencia) * 100).toFixed(1) : 0;

        const dataDonut = google.visualization.arrayToDataTable([
          ['Tipo', 'Cantidad'],
          ['Asistieron', asistencia],
          ['Ausentes', ausentes]
        ]);

         const optionsDonut = {
      title: `Porcentaje de asistencia: ${porcentaje}%`,
      pieHole: 0.5,
      width: '100%',
      height: 400,
      chartArea: { width: '90%', height: '80%' },
      legend: { position: 'bottom' },
      titleTextStyle: { fontSize: 18, bold: true },
      colors: ['#4CAF50', '#E57373']
    };

        const chartDonut = new google.visualization.PieChart(document.getElementById('chart_exist'));
        chartDonut.draw(dataDonut, optionsDonut);
      }

}
