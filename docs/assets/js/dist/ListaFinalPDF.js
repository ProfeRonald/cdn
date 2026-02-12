$(document).on('click', '#ListaFinalPDF', function () {
    $('#op-lista').val($(this).attr('op'));
    ListaFinalPDF(0);
})

  window.ListaFinalPDF = function (p=0) {

 if($('.sel-grp').filter(':checked').length > 0 || p == 1){
console.log('click');
    $.ajax({
      method: "POST",
      url: "sesion.php?op=ListaFinalPDF",
      dataType: 'json',
      data: $("#condfinalForm").serialize()
    })
      .done(function (gruposjson) {
        console.log(gruposjson);
       async function convertirUrlABase64(url) {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result); // dataURL
        reader.readAsDataURL(blob);
      });
    }

  const calcularFontSize = (totalFilas) => {
  totalFilas = totalFilas - 3;
  const base = 5.5;         // valor inicial cuando totalFilas = 40
  const maxFilas = 40;      // límite superior
  let incremento = 0.1;   // cuánto aumenta por fila menos

  if(totalFilas < 25){
  incremento = 0.3;
  }else if(totalFilas < 29){
  incremento = 0.2;
  }else{
   incremento = 0.1;
  }   // cuánto a

  if (totalFilas > maxFilas) totalFilas = maxFilas;
  if (totalFilas < 1) totalFilas = 1;

  // cada fila menos de 40 aumenta 0.1
  const diferencia = maxFilas - totalFilas;
  return base + diferencia * incremento;

};

    const bloqueTablaCentrada = (pagina) => {
  const totalFilas = pagina.tabla.length;
  const fontSize = calcularFontSize(totalFilas);

  return {
    columns: [
      { width: '*', text: '' },
      {
        width: 'auto',
        table: {
          headerRows: 1,
          widths: Array(pagina.tabla[0].length).fill('auto'),
          body: [
            pagina.tabla[0].map(header => ({
              text: header || '',
              bold: true,
              alignment: 'center',
              fontSize,
              color: 'white',
              margin: [0, 0, 0, 0],
              fillColor: "#8DB4E2"
            })),
            ...pagina.tabla.slice(1).map((row, rowIndex) =>
              row.map((cell, colIndex) => {
               let celda = { text: cell != null ? String(cell) : '',
                alignment: [0, 4, 5, 6, 9, 10].includes(colIndex) ? "center" : "left",
                fontSize,
                noWrap: true,
                margin: [2, 1, 2, 1]
              };
              if (rowIndex === totalFilas - 3 && colIndex === 1) {
                celda.bold = true; 
                celda.fillColor = "#F6DDCC"; 
                celda.alignment = "left";
                
              }
              if (rowIndex === totalFilas - 3 && colIndex === 2) {
                celda.bold = true; 
                celda.fillColor = "#F6DDCC"; 
                celda.alignment = "center";
                
              }
              if ((rowIndex === totalFilas - 2 || rowIndex === totalFilas - 3) && colIndex === 4) {
                celda.bold = true; 
                celda.alignment = "left";
              }
              if ((rowIndex === totalFilas - 2 || rowIndex === totalFilas - 3) && colIndex === 5) {
                celda.bold = true; 
                celda.alignment = "center";
              }
              return celda;
              })
            )
          ]
        },
        layout: {
           fillColor: function(rowIndex, node) {
           const totalRows = node.table.body.length;
    if (rowIndex === 0) return "#D9D9D9"; 
    if (rowIndex < totalRows - 2 && rowIndex % 2 === 0) return "#D9D9D9";
    return null; 
          },
          hLineWidth: function (i, node) {
      return 0.5; 
    },
    vLineWidth: function (i, node) {
      return 0.5; 
    },
    hLineColor: function (i, node) {
      return 'black'; 
    },
    vLineColor: function (i, node) {
      return 'black'; 
    },
    paddingLeft: function(i, node) { return 0.5; },
    paddingRight: function(i, node) { return 0.5; },
    paddingTop: function(i, node) { return 0.5; },
    paddingBottom: function(i, node) { return 0.5; }
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
      { image: logoBase64, width: 80, alignment: 'center', margin: [0,0,0,0] },
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
      { text: pagina.curso, style: 'titulo', margin: [0,0,0,0] },
          bloqueTablaCentrada(pagina)
    ],
    pageBreak: index === paginasJSON.length - 1 ? undefined : "after",
  }));

  const docDefinition = {
    pageSize: 'A4',
    pageOrientation: 'landscape',
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
        generarPDF(gruposjson);
        setTimeout(function(){
    $('#CondicionFinal').modal('hide');
			},2000);
      })

      }else{
      $('#text-submit').show('slow');
      setTimeout(function(){
        $('#text-submit').hide('slow');	 
          },2000);
    }
  
  }