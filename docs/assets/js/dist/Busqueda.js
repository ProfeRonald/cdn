var local = $("#index_js").attr("local");
var urlcdn = $("#index_js").attr("urlcdn");

		$("#input_buscar").on("keyup input",function(event){
			
			var ibv = $(this).val();
			//var ibv = ibv.replace(/\s/g, '_');
			//var ibv = ibv.replace(/\W/g, '');
            var ibv = ibv.replace(/[^a-zA-Z0-9ñÑáéíóúüÁÉÍÓÚÜ ]/g, "");
			//var ibv = ibv.replace(/_/g, ' ');
			var ibv = ibv.substring(0, 50);

			$(this).val(ibv);
				
				if($(this).val().length > 1 && ibv != "Buscar..."){
					
					const validKeys = /^[a-zA-Z0-9ñÑáéíóúüÁÉÍÓÚÜ ]$/;
                if (validKeys.test(event.key) || event.key === "Backspace") {
       
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
						}else{
                            event.preventDefault();
                        }	

    		}
    });

    
		$(document).on('keyup', '#input_buscar', function (event) {
			if (event.key === "ArrowDown") {
                $(".estudiante_busquedasel:first").focus();
            }
            
			if (event.key === "Escape") {
                if ($("#estudiante_busquedasel").is(":hidden")) {
                    $("#busqueda_cerrar").trigger("click");
                } else {
                    $("#estudiante_busquedasel").hide();
                }
            }
            
		});		
		
		$(document).on('keyup change', '.estudiante_busquedasel:first', function (event) {
			if (event.key === "ArrowUp") {
                $("#input_buscar").focus();
                $('.foto-busqueda').remove();
            }            
            
		});
		
		$(document).on('keyup change', '.estudiante_busquedasel', function (event) {
                    if (event.key === "Escape") {
                        $("#input_buscar").focus();
                    }
                    
                    if (event.key === "ArrowUp") {
                        $(event.target).prev().focus();
                    }
                    
                    if (event.key === "ArrowDown") {
                        $(event.target).next().focus();
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