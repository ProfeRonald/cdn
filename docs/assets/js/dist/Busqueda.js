var local = $("#index_js").attr("local");
var urlcdn = $("#index_js").attr("urlcdn");

		$("#input_buscar").on("keyup",function(){
			
			var ibv = $(this).val();
			var ibv = ibv.replace(/\s/g, '_');
			//var ibv = ibv.replace(/\W/g, '');
			var ibv = ibv.replace(/[^aA0-zZ9ñÑáéíóúüÁÉÍÓÚÜ]/g,"");
			var ibv = ibv.replace(/_/g, ' ');
			var ibv = ibv.substring(0, 50);

			$(this).val(ibv);
				
				if($(this).val().length > 1 && ibv != "Buscar..."){
					
					var tclsb = event.keyCode;
					var tvlds = (tclsb > 47 && tclsb < 58) || tclsb == 32 || (tclsb > 64 && tclsb < 91) || (tclsb > 95 && tclsb < 112) || tclsb == 8;
						
						if(tvlds == true){
							
							var inb = $('#input_buscar').val();
							
							$.ajax({
								method: "POST",	
								url: "sesion.php?op=BusquedaEst",
								data: {input_buscar: inb}
							})
							
					  	.done(function(opcs){
					  		//console.log(opcs);
					  		$('#estudiante_busquedasel').html(opcs);
					  		$('#estudiante_busquedasel').attr('size', 7);
					  		$("#estudiante_busquedasel").show();
					  	})		  
						}	

    		}
    });

    
		$(document).on('keyup', '#input_buscar', function () {
			if(event.keyCode == 40){
				$(".estudiante_busquedasel:first").focus();
			}
			if(event.keyCode == 27){
				if($("#estudiante_busquedasel").is(":hidden")){
					$("#busqueda_cerrar").trigger("click");
				}else{
					$("#estudiante_busquedasel").hide();					
				}
			}	
		});		
		
		$(document).on('keyup change', '.estudiante_busquedasel:first', function () {
			if(event.keyCode == 38){
				$("#input_buscar").focus();
				$('.foto-busqueda').remove();
			}
		});
		
		$(document).on('keyup change', '.estudiante_busquedasel', function () {
			if(event.keyCode == 27){
				$("#input_buscar").focus();
			}
			if(event.keyCode == 38){
			$(this).prev().focus();				
			}
			if(event.keyCode == 40){
			$(this).next().focus();				
			}
		});
		
		$(document).on('focus mouseenter', '.estudiante_busquedasel', function () {
			$('.foto-busqueda').remove();
			var foto = $(this).attr('foto');

			if(local == 1){
				var sfoto = urlcdn +  '/imagenes/fotos/foto.jpg';
			}else{
				var sfoto = 'https://lh3.googleusercontent.com/a/default-user';
			}
			
			if(foto != sfoto){

			foto = '<div class="text-right foto-busqueda"><img class="rounded-circle" style="width:15%" src="'+foto+'"  /></div>';
			$('#estudiante_busquedasel').after(foto);
				}
			
		});
			

    
    $("#busqueda_cerrar").on("click",function(){
    	
    	$("#estudiante_busquedasel").hide();
		
		});