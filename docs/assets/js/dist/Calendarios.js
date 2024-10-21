
    $(document).on('click', '#virtual_ev_gm', function () {
        if($(this).prop("checked") == true){
            $('#lugar_ev').prop('disabled', true);
            $('#virtual_ev_zm').prop('checked', false);
        }else{
            $('#lugar_ev').prop('disabled', false);
        }
    });
    
    $(document).on('click', '#virtual_ev_zm', function () {
        if($(this).prop("checked") == true){
            $('#lugar_ev').prop('disabled', true);
            $('#virtual_ev_gm').prop('checked', false);
            $(".solozm").hide('slow');
            $("#solozm").show('slow');
            $("#pactividad").find('input').prop('disabled', false);
            $("#pactividad").find('select').prop('disabled', false);
            $("#pactividad").find('button').prop('disabled', false);				
        }else{
            $('#lugar_ev').prop('disabled', false);
            
            if($('#ev_menu').attr('gc') == 1){
            $(".solozm").show('slow');
            $("#solozm").hide('slow');
            }else{
            $("#pactividad").find('input').prop('disabled', true);
            $("#pactividad").find('select').prop('disabled', true);
            $("#pactividad").find('button').prop('disabled', true);
            $(this).prop('disabled', false);
            }
            
        }
    });
    
    $(document).on('click', '.virtual_ev', function () {
        $("#pactividad").show('slow');
        $("#actividadp").hide('slow');
        if($(this).attr('gm') == 1){
            $('#virtual_ev_gm').prop('checked', false);
            $('#virtual_ev_gm').trigger('click');
            $('#tema_ev').focus();
        }else{
            $('#virtual_ev_zm').prop('checked', false);
            $('#virtual_ev_zm').trigger('click');
            $('#tema_ev').focus();
        }
    });
    
    $(document).on('click', '#programar_ev', function () {
        $(this).prop('disabled', true);
        $(this).children('span').text('Espere...');
        $.ajax({
      method: "POST",	
      url: "sesion.php?op=ProgramarEvento",
      data: $("#fpev").serialize()
        })
      .done(function(ac){
          $('#actividadp').html(ac);
          $('#bceract').trigger('click');
          $('#pactividad').hide('slow');
          $('#actividadp').show('slow');
          setTimeout(function(){
                $('#programar_ev').prop('disabled', false);
           },1000);
      })
      
    });
    
	$(document).on('click', '#bceract', function () {
		$('#pactividad').hide("slow");
		$('#bproact').show("slow");
		$("#bestscentro").show("slow");
		$(".bfechaextra").show("slow");
	});