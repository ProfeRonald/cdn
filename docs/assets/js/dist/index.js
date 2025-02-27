
function GPS(){
	var lonlat = document.getElementById("gps");
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(objPosition){
			var lon = objPosition.coords.longitude;
			var lat = objPosition.coords.latitude;
			//var ubicacion = lat + '%2C' + lon;
			var ubicacion = lat + ',' + lon;
			document.cookie = 'ubicacionerd=' + ubicacion;
		},
		function(objPositionError){},
		{maximumAge:75000, timeout:15000});
	}
}

GPS();

$(document).on('click', '#desactivar-simulador', function () {
	document.cookie = "simulador=administrador";
	location.href = 'index.php';
});