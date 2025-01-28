$(document).on('click', '.link-directo', function () {
    window.open($(this).attr('link'), 'administracion', 'fullscreen=yes, scrollbars=auto, location=yes, menubar=no, status=no, titlebar=yes, toolbar=no, left=0, top=0');
});

$(document).on('click', '.link-modal', function () {
    $('#'+ $(this).attr('link')).modal('show');
});

$(document).on('click', '#simular-puesto', function () {
    document.cookie = "simulador=" + $('#simulador-puesto').val();
    location.href = 'index.php';
});

