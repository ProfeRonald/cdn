
var filescdn = $("#datos_js").attr("filescdn");
var rut = $("#datos_js").attr("data-rutafct");
var grupo = $("#datos_js").attr("data-grupo");

// Configuración del calendario
        let currentYear = new Date().getFullYear();
        let calendarType = 'school'; // 'school' o 'calendar'
        let calendarData = null;
        let currentMonthIndex = 0;
        
        const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                           'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

        // Función para cargar datos desde PHP
        async function loadCalendarData() {
            $('#loadingIndicator').show();
            $('.month-grid').hide();
            
            try {
                // URL del backend PHP - ajusta según tu configuración
                const url = `up.php?op=CalendarioFCT&year=${currentYear}&type=${calendarType}`;
                
                const response = await fetch(url).catch(() => {
                    // Datos de respaldo cuando no hay backend
                    return {
                        ok: true,
                        json: () => Promise.resolve(generateFallbackData())
                    };
                });
                
                if (response.ok) {
                    calendarData = await response.json();
                    renderCalendar();
                } else {
                    throw new Error('Error al cargar el calendario');
                }
            } catch (error) {
                console.error('Error:', error);
                // Usar datos de respaldo
                calendarData = generateFallbackData();
                renderCalendar();
            } finally {
                $('#loadingIndicator').hide();
                $('.month-grid.active').show();
            }
        }

        // Datos de respaldo cuando no hay backend
        function generateFallbackData() {
            const months = [];
            const startMonth = calendarType === 'school' ? 7 : 0;
            
            for (let i = 0; i < 12; i++) {
                const monthIndex = (startMonth + i) % 12;
                const yearOffset = Math.floor((startMonth + i) / 12);
                const year = currentYear + yearOffset;
                
                months.push({
                    month: monthIndex,
                    year: year,
                    days: getDaysInMonth(year, monthIndex),
                    firstDay: getFirstDayOfMonth(year, monthIndex)
                });
            }
            
            return {
                type: calendarType,
                startYear: currentYear,
                endYear: calendarType === 'school' ? currentYear + 1 : currentYear,
                months: months,
                holidays: getDefaultHolidays(),
                currentDate: new Date().toISOString().split('T')[0]
            };
        }

        // Días festivos por defecto
        function getDefaultHolidays() {
            const holidays = [];
            const years = calendarType === 'school' ? [currentYear, currentYear + 1] : [currentYear];
            
            years.forEach(year => {
                holidays.push(
                    { date: `${year}-01-01`, name: 'Año Nuevo' },
                    { date: `${year}-01-06`, name: 'Día de los Reyes' },
                    { date: `${year}-01-21`, name: 'Día de la Altagracia' },
                    { date: `${year}-01-26`, name: 'Día de Duarte' },
                    { date: `${year}-02-27`, name: 'Día de la Independencia' },
                    { date: `${year}-05-01`, name: 'Día del Trabajo' },
                    { date: `${year}-08-16`, name: 'Día de la Restauración' },
                    { date: `${year}-09-24`, name: 'Día de las Mercedes' },
                    { date: `${year}-11-06`, name: 'Día de la Constitución' },
                    { date: `${year}-12-25`, name: 'Navidad' }
                );
            });
            
            return holidays;
        }

        function getDaysInMonth(year, month) {
            return new Date(year, month + 1, 0).getDate();
        }
        
        function getFirstDayOfMonth(year, month) {
            return new Date(year, month, 1).getDay();
        }

        function isHoliday(year, month, day) {
            if (!calendarData || !calendarData.holidays) return false;
            
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            return calendarData.holidays.some(h => h.date === dateStr);
        }

        function getHolidayName(year, month, day) {
            if (!calendarData || !calendarData.holidays) return '';
            
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const holiday = calendarData.holidays.find(h => h.date === dateStr);
            return holiday ? holiday.name : '';
        }

        function isWeekend(year, month, day) {
            const date = new Date(year, month, day);
            const dayOfWeek = date.getDay();
            return dayOfWeek === 0 || dayOfWeek === 6;
        }

        function isToday(year, month, day) {
            const today = new Date();
            return day === today.getDate() && 
                   month === today.getMonth() && 
                   year === today.getFullYear();
        }

        function isVisita(year, month, day) {
            const today = new Date();
            return day === today.getDate() && 
                   month === today.getMonth() && 
                   year === today.getFullYear();
        }
        
        function createMonthCalendar(monthData, isYearView = true) {
            const { month, year, days, firstDay } = monthData;
            const monthName = monthNames[month];
            
            let html = `<div class="month-name">${monthName} ${year}</div>`;
            html += '<div class="table-responsive-custom">';
            html += '<table class="calendar-table table table-bordered">';
            html += '<thead><tr>';
            
            // Encabezados de días
            daysOfWeek.forEach(day => {
                html += `<th>${day}</th>`;
            });
            html += '</tr></thead><tbody>';
            
            // Primera fila con celdas vacías y primeros días
            html += '<tr>';
            for (let i = 0; i < firstDay; i++) {
                html += '<td class="empty"></td>';
            }
            
            let currentCell = firstDay;
            
            // Días del mes
            for (let day = 1; day <= days; day++) {
                // Nueva fila cuando se completa una semana
                if (currentCell === 7) {
                    html += '</tr><tr>';
                    currentCell = 0;
                }
                
                let classes = [];
                let title = '';
                
                /*if (isToday(year, month, day)) {
                    classes.push('today');
                    title = 'Hoy';
                } else if (isHoliday(year, month, day)) {
                    classes.push('holiday');
                    title = getHolidayName(year, month, day);
                } else if (isWeekend(year, month, day)) {
                    classes.push('weekend');
                }*/

                html += `<td  rel="tooltip" class="${classes.join(' ')}" 
                         data-date="${year}-${month+1}-${day}"
                         ${title ? `title="${title}"` : ''}>
                         ${day}
                     </td>`;
                
                currentCell++;
            }
            
            // Celdas vacías al final del mes
            while (currentCell < 7 && currentCell !== 0) {
                html += '<td class="empty"></td>';
                currentCell++;
            }

            html += '</tr></tbody></table></div>';

            return html;
        }
        
        function renderCalendar() {
            updateYearDisplay();
            updateMonthSelector();
            
            if ($('#yearView').hasClass('active')) {
                renderYearView();
            } else {
                renderMonthView(currentMonthIndex);
            }
        }
        
        function renderYearView() {
            if (!calendarData) return;
            
            const yearCalendar = $('#yearCalendar');
            yearCalendar.empty();
            
            calendarData.months.forEach((monthData, index) => {
                const monthHtml = `
                    <div class="col-lg-4 col-md-6 col-sm-12">
                        <div class="month-container">
                            ${createMonthCalendar(monthData, true)}
                        </div>
                    </div>
                `;
                yearCalendar.append(monthHtml);
            });
             setTimeout(function() {
                listarVisitas();
            }, 1000);
        }
        
        function renderMonthView(monthIndex) {
            if (!calendarData || !calendarData.months[monthIndex]) return;
            
            const monthCalendar = $('#singleMonthCalendar');
            monthCalendar.empty();
            
            const monthHtml = `
                <div class="month-container">
                    ${createMonthCalendar(calendarData.months[monthIndex], false)}
                </div>
            `;
            monthCalendar.html(monthHtml);
            setTimeout(function() {
                listarVisitas(1);
            }, 1000);
        }
        
        function updateYearDisplay() {
            if (!calendarData) return;
            
            let displayText = '';
            if (calendarData.type === 'school') {
                displayText = `${calendarData.startYear}-${calendarData.endYear}`;
            } else {
                displayText = `${calendarData.startYear}`;
            }
            $('#currentYearDisplay').text(displayText);
        }
        
        function updateMonthSelector() {
            if (!calendarData) return;
            
            const select = $('#monthSelect');
            select.empty();
            
            calendarData.months.forEach((month, index) => {
                const monthName = monthNames[month.month];
                select.append(`<option value="${index}">${monthName} ${month.year}</option>`);
            });
        }
        
        function changeYear(direction) {
            currentYear += direction;
            loadCalendarData();
        }
        
        function setCalendarType(type) {
            calendarType = type;
            $('.year-type-btn').removeClass('active');
            $(event.target).addClass('active');
            loadCalendarData();
        }
        
        $(document).ready(function() {
                    
            // Cargar calendario inicial
            loadCalendarData();
            setTimeout(function() {
                listarVisitas();
            }, 1000);
            
            $('#yearViewBtn').click(function() {
                $('.btn-view').removeClass('active');
                $(this).addClass('active');
                $('.month-grid').removeClass('active');
                $('#yearView').addClass('active');
                $('#monthSelector').hide();
                $('#navButtons').removeClass('active');
                setCalendarType('school');
                $('#monthViewBtn').data('view', 1);
                $(this).hide();
                renderYearView();
            });
            
            $('#monthViewBtn').click(function() {
                $('.btn-view').removeClass('active');
                $(this).addClass('active');
                $('.month-grid').removeClass('active');
                $('#monthView').addClass('active');
                $('#monthSelector').show();
                $('#navButtons').addClass('active');
                setCalendarType('school');
                $(this).hide();
                $('#yearViewBtn').show();
                renderMonthView(currentMonthIndex);
                
            });
            
            $('#monthSelect').change(function() {
                currentMonthIndex = parseInt($(this).val());
                renderMonthView(currentMonthIndex);
            });
            
            $('#prevMonth').click(function() {
                if (currentMonthIndex > 0) {
                    currentMonthIndex--;
                    $('#monthSelect').val(currentMonthIndex);
                    renderMonthView(currentMonthIndex);
                }
            });
            
            $('#nextMonth').click(function() {
                if (currentMonthIndex < calendarData.months.length - 1) {
                    currentMonthIndex++;
                    $('#monthSelect').val(currentMonthIndex);
                    renderMonthView(currentMonthIndex);
                }
            });
            
            // Click en días del calendario
            $(document).on('click', '.calendar-table td:not(.empty)', function() {
                var monthView_View = $('#monthViewBtn').data('view');
                const title = $(this).attr('title');
                const date = $(this).data('date');
                const data_original_title = $(this).attr('data-original-title');
                if(monthView_View == 1){
                $('#monthViewBtn').data('view', 0);
                var cambiodia = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 1: 5, 2: 6, 3: 7, 4: 8, 5: 9, 6: 10, 7: 11 };
                currentMonthIndex = cambiodia[date.split('-')[1]];
                $('#monthViewBtn').trigger('click');
                }else if(title || data_original_title){
                    
                   /// OPCION CLICK //
                
                }

            });

            $(document).on('click', '.month-name', function() {
                var ths = $(this).parent().find('.calendar-table td:not(.empty):first').trigger('click');
            });


         




        });
      
function procesarVisitas(data, idFiltrar = null) {
  const resultado = {};

  // elegir los IDs a recorrer
  const grupos = idFiltrar ? { [idFiltrar]: data[idFiltrar] } : data;

  for (const grupo in grupos) {
    const empresas = grupos[grupo];
    for (const empresa in empresas) {
      const tutores = empresas[empresa];
      for (const tutor in tutores) {
        const fechas = tutores[tutor];
        for (const fecha in fechas) {
          const leaf = fechas[fecha] || {};
          const motivo = leaf.motivo !== undefined ? Number(leaf.motivo) : undefined;
          const gps = leaf.gps ?? leaf.grps ?? "";

          if (!resultado[fecha]) {
            resultado[fecha] = [];
          }

          resultado[fecha].push({
            grupo: Number(grupo),
            empresa: Number(empresa),
            tutor: Number(tutor),
            motivo,
            gps
          });
        }
      }
    }
  }

  return resultado;
}


         function listarVisitas(m=0){
              
            ruletaweb.database().ref(rut).on("value", (ivisitas) => {
               
               var visitas = procesarVisitas(ivisitas.val(), grupo);
                 
                Object.keys(visitas).forEach(date => {
                  
                    var fecha = date.split('-');
            
                    var dia = $('[data-date="'+ fecha[0] + '-' + Number(fecha[1]) + '-' + Number(fecha[2]) + '"]');
                    
                     if(m == 1){
                                var grupos = new Array();
                                var empresas = new Array();
                                var tutores = new Array();
                                var fechas = new Array();
                                var motivos = new Array();
                                var gps = new Array();
                                
                            var i = 0;
                            visitas[date].forEach(iempresas => {
                            grupos[i] = iempresas['grupo'];
                            empresas[i] = iempresas['empresa'];
                            tutores[i] = iempresas['tutor'];
                            motivos[i] = iempresas['motivo'];
                            gps[i] =  iempresas['gps'].replace(/%2C/g, ":").replace(/,/g, ":");
                            fechas[i] = date;
                            i++;
                            })
                        dia.attr('class', 'visitasFCT');
                        dia.attr('title', 'Click para ver las visitas registradas');
                        dia.attr('data-grupos', grupos.flat().filter(Boolean));
                        dia.attr('data-fechas', fechas.flat().filter(Boolean));
                        dia.attr('data-empresas', empresas.flat().filter(Boolean));
                        dia.attr('data-tutores', tutores.flat().filter(Boolean));
                        dia.attr('data-motivos', motivos.flat().filter(Boolean));
                        dia.attr('data-gps', gps.flat().filter(Boolean));
                        
                        dia.parent().parent().parent().parent().parent().find('.month-name:first').attr('id', 'visitasMesFCT');
                    }else{
                        dia.attr('class', 'visitasFCTMes');
                        dia.attr('title', 'Click para ver mes');
                    }
                });
               
            })

    setTimeout(function() {
    $('[rel="tooltip"]').tooltip();
    }, 1000);

          }


var idlp = Number(document.cookie.replace(
  /(?:(?:^|.*;\s*)idples\s*\=\s*([^;]*).*$)|^.*$/,
  "$1"
));

if (idlp.length < 1) {
  var idlp = 7;
}

if($('#TablaAescolar').length > 0){

    let columnas = $('#TablaAescolar thead th').length; // cuenta las columnas en el thead

let defs = [
    {
        "targets": 'no-sort',
        "orderable": false,
  },
  {
        targets: 0,
        className: "text-center"
    }
];

// Si existe la columna 4 (índice 4 → 5ta columna)
if (columnas > 4) {
    defs.push({
        targets: 5,
        className: "text-center"
    });
}

var tablea = $('#TablaAescolar').DataTable({
    "responsive": true,
    "columnDefs": defs,
  "order": [[ 0, "asc" ]],
   rowGroup: {
        dataSrc: 2
    },
  "language": {
    url: filescdn + "/assets/js/lib/data-table/SpanishEmpresas.json",
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


function formatearFecha(fechaStr) {
    if (!fechaStr || fechaStr === "0000-00-00") return "";

    const fecha = new Date(fechaStr + "T00:00:00"); // evitar desfases de zona horaria
    const opciones = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    let texto = fecha.toLocaleDateString('es-ES', opciones);

    // Poner la primera letra de cada palabra en mayúscula
    texto = texto.replace(/\b\p{L}/gu, c => c);

    return texto;
}

function normalizarFecha(fechaStr) {
    if (!fechaStr || fechaStr === "0000-0-00" || fechaStr === "0000-00-00") return "0000-00-00";

    let partes = fechaStr.split("-");
    let anio  = partes[0].padStart(4, "0");
    let mes   = partes[1].padStart(2, "0");
    let dia   = partes[2].padStart(2, "0");

    return `${anio}-${mes}-${dia}`;
}

function limpiarCadena(cadena) {
    return cadena
        .split(',')                // separa por comas
        .map(v => v.trim())        // elimina espacios en blanco
        .filter(v => v !== "")     // elimina vacíos
        .join(",");                // une de nuevo en string
}




 $(document).on('click', '.visitasFCT, #visitasMesFCT', function() {
    
    var mes = 0;

    if($(this).hasClass('month-name')){

    var grupos = '';
    var empresas = '';
    var tutores = '';
    var fechas = '';
    var motivos = '';
    var gps = '';

        $('#visitasMesFCT').parent().find('.visitasFCT').each(function() {
            grupos += $(this).data('grupos') + ',';
            empresas += $(this).data('empresas') + ',';
            tutores += $(this).data('tutores') + ',';
            fechas += $(this).data('fechas') + ',';
            motivos += $(this).data('motivos') + ',';
            gps += $(this).data('gps') + ',';
            
        });
    
            grupos = limpiarCadena(grupos);
            empresas = limpiarCadena(empresas);
            tutores = limpiarCadena(tutores);
            fechas = String(limpiarCadena(fechas)).split(',');
            motivos = String(limpiarCadena(motivos)).split(',');
            gps = String(limpiarCadena(gps)).split(',');

         $('#visitafct_fechas').html('Visitas registradas en ' + $('#visitasMesFCT').text());

         mes = 1;

        

    }else{

    var grupos = $(this).data('grupos');
    var empresas = $(this).data('empresas');
    var tutores = $(this).data('tutores');
    var fechas = String($(this).data('fechas')).split(',');
    var motivos = String($(this).data('motivos')).split(',');
    var gps = String($(this).data('gps')).split(',');
    var fecha = normalizarFecha($(this).data('date'));
    $('#visitafct_fechas').html('Visitas registradas el ' + formatearFecha(fecha));

    }

    tablea.clear();

        $.ajax({
      method: "POST",
      url: "up.php?op=VisitasEmpresas",
     dataType: 'json',
      data: {grupos: grupos, empresas: empresas, tutores: tutores, fechas: fechas, motivos: motivos, gps: gps, mes}
        })
      .done(function(vs){
        vs.forEach(element => {
            tablea.row.add(element).draw(false);
        });
        $('#visitaFCTModal').modal('show');
      })
})