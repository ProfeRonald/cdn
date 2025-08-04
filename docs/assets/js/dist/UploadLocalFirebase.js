$(".input_file_foto").change(function () {


		$('#barra_upload').show('slow');
		$('#mensaje_uploading').show('slow');
		var xwidth = $(this).attr('xwidth');
        var xheight = $(this).attr('xheight');
        var ruta = $(this).attr('ruta');
        var mime_type_img = $(this).attr('mime_type_img');
		var cmini = $(this).attr('cmini');
		var local = $("#datos_js").attr("local");
	   
			  (function() {
			  if(window.performance && window.performance.now) return;
			  if(!window.performance) window.performance = {};
			  var methods = ['webkitNow', 'msNow', 'mozNow'];
			  for(var i = 0; i < methods.length; i++) {
				if(window.performance[methods[i]]) {
				  window.performance.now = window.performance[methods[i]];
				  return;
				}
			  }
			  if(Date.now) {
				window.performance.now = function() { return Date.now(); };
				return;
			  }
			  window.performance.now = function() { return +(new Date()); };
			  })();
			  
			  window.pica.prototype.debug = console.log.bind(console);
			  
			  var resizer;
			  
			  var resizer_mode = {
				js:   true,
				wasm: true,
				cib:  true,
				ww:   true
			  };
			  
			  
			  function create_resizer() {
				var opts = [];
			  
				Object.keys(resizer_mode).forEach(function (k) {
				  if (resizer_mode[k]) opts.push(k);
				});
			  
				resizer = window.pica({ features: opts });
			  }
			  
			  function canvaFotoGrupo() {
				var src, ctx;
			  
				src = $('#foto_canvas_original')[0];
				src.width = img.width;
				src.height = img.height;

				ctx = src.getContext("2d");
				ctx.drawImage(img, 0, 0);
			  }
			  
			  var RedimensionarFotoGrupo = _.debounce(function () {
				var dst, ctx, width;
         
				dst = $('#foto_canvas_mini')[0];
				dst.width = xwidth;
				dst.height = xheight;
				var offScreenCanvas = document.createElement('canvas')
				offScreenCanvas.width  = dst.width;
				offScreenCanvas.height = dst.height;
			  
				resizer.resize($('#foto_canvas_original')[0], offScreenCanvas, {
				  quality: quality,
				  alpha: alpha,
				  unsharpAmount: unsharpAmount,
				  unsharpRadius: unsharpRadius,
				  unsharpThreshold: unsharpThreshold,
				  transferable: true
				})
				.then(function () {
			  
				 dst.getContext('2d', { alpha: Boolean(alpha) }).drawImage(offScreenCanvas, 0, 0);
				  
				  var imgtype = mime_type_img;
				  var FotoGrupo = ruta;
                  
				  var dataurl = offScreenCanvas.toDataURL(imgtype, 1.0);

				  if(local == 1){
					
					$('#mensaje_uploading').html('<div class="text-info"><i class="fa fa-refresh rotar"></i> Subiendo imagen...</div>');
					SubirFotoPersonalLogoBanner(dataurl, cmini, imgtype);

				  }else{
				  
				 var subirimagen = firebase.storage().ref().child(FotoGrupo).putString(dataurl, 'data_url');
				 
				  subirimagen.on(firebase.storage.TaskEvent.STATE_CHANGED,
				function(snapshot) {
			  
				  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				  var progress = Math.round(progress);
				  $('#barra_upload').html('<div class="progress-bar rounded progress-bar-striped d-block bg-info progress-bar-animated" role="progressbar" style="width: ' + progress + '%;font-weight:bold;font-size:15pt" aria-valuenow="' + progress + '" aria-valuemin="0" aria-valuemax="100">' + progress + '%</div>');
				  switch (snapshot.state) {
					case firebase.storage.TaskState.PAUSED:
					  $('#mensaje_uploading').html('<div class="text-info"><i class="fa fa-refresh rotar"></i> Subida pausada.</div>');
					  break;
					case firebase.storage.TaskState.RUNNING:
					  $('#mensaje_uploading').html('<div class="text-info"><i class="fa fa-refresh rotar"></i> Subiendo imagen...</div>');
					  break;
				  }
				}, function(error) {
			  
				switch (error.code) {
				  case 'storage/unauthorized':
					   $('#mensaje_uploading').html('<div class="text-danger">No se pudo cargar la imagen, intente de nuevo</div>');
					break;
				  case 'storage/canceled':
					$('#mensaje_uploading').html('<div class="text-danger">No se pudo cargar la imagen, intente de nuevo</div>');
					break;
			  
				  case 'storage/unknown':
					$('#mensaje_uploading').html('<div class="text-danger">No se pudo cargar la imagen, intente de nuevo</div>');
					break;
				}
			  }, function() {

				subirimagen.snapshot.ref.getDownloadURL().then(function(urlFotoGrupo) {
					$('#mensaje_uploading').html('<div class="text-success"> ¡La imagen se ha subido con éxito!</div>');

                    imagenSubida(urlFotoGrupo, cmini);

					setTimeout(function(){
					$('#barra_upload').hide('slow');
					$('#mensaje_uploading').hide('slow');
					},5000);
				
				});
				
			  });
			
			}
					 
				}) 	
				
			  }, 100);
			  
			  
			  var img = new Image();
			  
			  var quality           = 3;
			  var unsharpAmount     = 80;
			  var unsharpRadius     = 0.6;
			  var unsharpThreshold  = 2;
			  var alpha             = true;
			  
			  resizer_mode.ww   = true;
			  resizer_mode.cib  = false;
			  resizer_mode.wasm = true;
			  
			  create_resizer();
			  
			var files = $(this)[0].files;
			
			img.src = window.URL.createObjectURL(files[0]);
			img.onload = function () {
			canvaFotoGrupo();
			RedimensionarFotoGrupo();
			};
  });