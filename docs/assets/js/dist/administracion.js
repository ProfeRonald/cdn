$(document).on('click', '.link-directo', function () {
    window.open($(this).attr('link'), 'administracion', 'fullscreen=yes, scrollbars=auto, location=yes, menubar=no, status=no, titlebar=yes, toolbar=no, left=0, top=0');
});