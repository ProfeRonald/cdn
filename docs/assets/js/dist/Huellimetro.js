import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, onValue, set, query, orderByValue, limitToLast } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDQmWuKzpuupSMNwp1UNqsIoLL2-5FuZ7o",
  authDomain: "asistencias-escuelard.firebaseapp.com",
  databaseURL: "asistencias-escuelard-default-rtdb.firebaseio.com",
  projectId: "asistencias-escuelard",
  storageBucket: "asistencias-escuelard.firebasestorage.app",
  messagingSenderId: "280871850687",
  appId: "1:280871850687:web:2d85833ac756f24476ac0a"
};

alert('sssssssssssss');

const datos_huella = $('#num_huellimetro').attr('datos_huella').split('-');
const id_escuela = datos_huella[0];
const id_sesion = datos_huella[1];
const correo_sesion = btoa(datos_huella[2]);
const year1 = datos_huella[3];
const year2 = datos_huella[4];

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
function revisarHuellimetro() {
    const idHuellimetro = $('#id_huellimetro').val();
    if(!isNaN(idHuellimetro) && idHuellimetro > 0) {
        const dbRef = ref(database, id_escuela + '/huellimetros/' + idHuellimetro);
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            $('#titulo-asignatura').text($('#asignatura_asistencia option[value="' + data + '"]').text());
            $('#titulo-asignatura').attr('idcarga', data);
            $('#num_huellimetro').text(idHuellimetro);
            document.cookie = "huellimetro=" + idHuellimetro;
            $('#asignatura_asistencia').val(data).change();
            VerUltimoAsistencia(data);
        });
        //}, { onlyOnce: true });
    }
}

revisarHuellimetro();

function insertData(data) {
    const newRef = ref(database, id_escuela + '/huellimetros/' + $('#id_huellimetro').val());
    set(newRef, data)
        .then(() => {
            $('#activar_horario_asistencia').attr('horario', 1);
            $('#activar_horario_asistencia').trigger('click');
            revisarHuellimetro();
            set(ref(database, 'profesores/' + correo_sesion), id_escuela + '-' + id_sesion + '-' + $('#id_huellimetro').val() + '-' + year1 + '-' + year2);
        })
}

$(document).on('click', '#activar_asignatura_asistencia', function () {
    const idHuellimetro = $('#id_huellimetro').val();
    if(!isNaN(idHuellimetro) && idHuellimetro > 0) {
    insertData($('#asignatura_asistencia').val());
    }
});

$(document).on('click', '#activar_horario_asistencia', function () {
    var horario = $('#activar_horario_asistencia').attr('horario');
    if(horario == 1) {
        fetch('https://asistencias-escuelard-default-rtdb.firebaseio.com/' + id_escuela + '/' + id_sesion + '.json', {method: 'PATCH',body: JSON.stringify({horario:0}),headers:{'Content-Type': 'application/json'}});
        $('#activar_horario_asistencia').attr('horario', 0);
    }else{
        fetch('https://asistencias-escuelard-default-rtdb.firebaseio.com/' + id_escuela + '/' + id_sesion + '.json', {method: 'PATCH',body: JSON.stringify({horario:1}),headers:{'Content-Type': 'application/json'}});
        insertarHoarioHuella();
        $('#activar_horario_asistencia').attr('horario', 1);
    }
});

function insertarHoarioHuella(){
if($('.data-huellas').length > 0) {
$('.data-huellas').each(function() {
    fetch('https://asistencias-escuelard-default-rtdb.firebaseio.com/' + id_escuela + '/' + id_sesion + '/' + $(this).attr('dia') + '.json', {method: 'PATCH',body: JSON.stringify({[$(this).attr('id')]:$(this).attr('val')}),headers:{'Content-Type': 'application/json'}});
});
}
}

const daysOfWeek = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
const today = new Date();
const dayOfWeek = daysOfWeek[today.getDay()];

const dbRef = ref(database, id_escuela + '/' + id_sesion);
onValue(dbRef, (snapshot) => {
    const hora = snapshot.val();
    $('.data-huellas').parent().removeClass('bg-warning font-weight-bold');
   if(hora && hora['horario'] && hora['horario'] != null && hora['horario'] == 1){
    $('.hide-show-horario-hide').show();
    $('.hide-show-horario-show').hide();
    $('#activar_horario_asistencia').html('<i class="fa fa-calendar"></i> Desactivar según horario de clases');
if (hora[dayOfWeek]) {
    const timestamp = Math.floor(Date.now() / 1000);
    Object.keys(hora[dayOfWeek]).forEach((key, i) => {
        const nextKey = Object.keys(hora[dayOfWeek])[i + 1];
        if(timestamp > key && (timestamp < nextKey || nextKey == undefined)) {
            fetch('https://asistencias-escuelard-default-rtdb.firebaseio.com/' + id_escuela + '/' + 'huellimetros.json', {method: 'PATCH',body: JSON.stringify({[$('#num_huellimetro').text()]:hora[dayOfWeek][key]}),headers:{'Content-Type': 'application/json'}});
            $('#' + key).parent().addClass('bg-warning font-weight-bold');
        }
    });
}
   }else{
    $('.hide-show-horario-hide').hide();
    $('.hide-show-horario-show').show();
    $('#activar_horario_asistencia').html('<i class="fa fa-calendar"></i> Activar según horario de clases');
   }
});

function insertarAsistencia(data){

    const newKeyRef = ref(database, id_escuela + '/asistencias/' + year1 + '-' + year2 + '/' + $('#titulo-asignatura').attr('idcarga') + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate() + '/' + $('#id_user').val());
onValue(newKeyRef, (snapshot) => {
  if (snapshot.exists()) {
    set(ref(database, 'no_registro/' + id_escuela + '/' + $('#num_huellimetro').text()), $('#id_user').val() + '-' + snapshot.val()).then(() => {});
    set(ref(database, 'no_registro/' + id_escuela + '/' + $('#num_huellimetro').text()), null).then(() => {});
  }else{
    set(newKeyRef, Math.floor(Date.now() / 1000)).then(() => {});
  }
}, { onlyOnce: true });

}

$('#insertar-registro').click(function(){
    insertarAsistencia();
})

function VerUltimoAsistencia(data){
onValue(query(ref(database, id_escuela + '/asistencias/' + year1 + '-' + year2 + '/' + data + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate()), orderByValue(), limitToLast(1)), (snapshot) => {
    if((snapshot.val() != null && snapshot.val() != undefined) && Object.keys(snapshot.val())[0] != undefined){
    onValue(ref(database, id_escuela + '/usuarios/' + Object.keys(snapshot.val())[0]), (snapshot) => {
        $('#nombre').text(snapshot.val().datos);
       $('#foto').attr('src', snapshot.val().foto);
       }, { onlyOnce: true });
    }
});

}