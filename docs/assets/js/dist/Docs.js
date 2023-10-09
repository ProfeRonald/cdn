
var grpz = $('.dos, .dosli1, .dosli2, .cuatro, .cinco, .cincoli1, .cincoli2, .ocho, .nueve, .nueveli2, .diez');

grpz.css({'cursor':'zoom-in'});

$('#mtodo').click(function() {
	 var mtodo = $('#mtodo').text();
	 var ctodo = $('#mtodo').attr('class');
	 var grpli = $('.dosli1, .dosli2, .dosli3, .doslili1, .doslili2, .cuatroli, .cincoli1, .cincoli2, .cincolili1, .cincolili2, .ocholi, .nueveli1, .nueveli2, .nueveli3, .nueveli4, .nueveli5, .nuevelili2, .diezli ');
	 var grpn = $('.dos, .dosli1, .dosli2, .cuatro, .cinco,  .cincoli1, .cincoli2, .ocho, .nueve, .nueveli2, .diez').children('i');
	 grpn.removeClass();
	 	if(mtodo == " Contraer todo"){
	 grpli.hide();
	 grpn.addClass('fa fa-chevron-right');
	 grpz.css({'cursor':'zoom-out'});
	 	}else{
	 grpli.slideToggle(900);
	 grpn.addClass('fa fa-chevron-down');
	 grpz.css({'cursor':'zoom-out'});
	 	}
   $('#mtodo').text(mtodo == " Contraer todo" ? " Expandir todo" : " Contraer todo");
   $('#mtodo').attr('class', ctodo == "btn btn-secondary btn-sm fa fa-minus-square-o" ? "btn btn-info btn-sm fa fa-plus-square-o" : "btn btn-secondary btn-sm fa fa-minus-square-o");
});

$('#uno, #dos, #tres, #cuatro, #cinco, #seis, #siete, #ocho, #nueve, #diez, #once').hide();

var nums = ['uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once'];

	$('.docs li a').click(function(){
		var idn = $(this);
		var idt = idn.attr('idt');
		var hrf  = idn.attr('href');
		var nc = Number(idn.attr('nc'));
			if(nc != 1){
		$.ajax({
					  method: "POST",
					  url: "docs_scroll.php",
					  data: {idt: idt}
				})
				 .done(function(num){
  			 $('#'+idt).html(num);
				 idn.attr('nc', 1);
					})
		}
			setTimeout(function(){
		$('html, body').stop().animate({
			scrollTop: $(hrf).offset().top - 55
		}, 2000);
			},1500);
	
	$.each(nums, function(i, n) {
		if(idt != n){
	$('#'+n).hide();
		}
	});
	
	$('#'+idt).toggle("slow");		
			
		return false;
	
	});


$('.dos, .dosli1, .dosli2, .cuatro, .cinco,  .cincoli1, .cincoli2, .ocho, .nueve, .nueveli2, .diez').click(function() {
	var crs = $(this).css('cursor');
	$(this).children( 'i').removeClass();
		if(crs == 'zoom-in'){
	$(this).children('i').addClass('fa fa-chevron-down');
	$(this).css({'cursor':'zoom-out'});
		}else{
	$(this).children('i').addClass('fa fa-chevron-right');
	$(this).css({'cursor':'zoom-in'});	
		}
});

$('.dosli1, .dosli2, .dosli3').hide();
    		$('.dos').click(function() {
        $('.dosli1, .dosli2, .dosli3').slideToggle();
        $('.doslili1').hide();
        $('.doslili2').hide();
});
$('.doslili1').hide();
$('.dosli1').click(function() {
        $('.doslili1').slideToggle();
});
$('.doslili2').hide();
$('.dosli2').click(function() {
        $('.doslili2').slideToggle();
});

$('.cuatroli').hide();
    		$('.cuatro').click(function() {
        $('.cuatroli').slideToggle();
});

$('.cincoli1, .cincoli2').hide();
    		$('.cinco').click(function() {
        $('.cincoli1, .cincoli2').slideToggle();
        $('.cincolili1').hide();
        $('.cincolili2').hide();
});

$('.cincolili1').hide();
$('.cincoli1').click(function() {
        $('.cincolili1').slideToggle();
});

$('.cincolili2').hide();
$('.cincoli2').click(function() {
        $('.cincolili2').slideToggle();
});

$('.ocholi').hide();
    		$('.ocho').click(function() {
        $('.ocholi').slideToggle();
});

$('.nueveli1, .nueveli2, .nueveli3, .nueveli4, .nueveli5').hide();
    		$('.nueve').click(function() {
        $('.nueveli1, .nueveli2, .nueveli3, .nueveli4, .nueveli5').slideToggle();
        $('.nuevelili2').hide();
});

$('.nuevelili2').hide();
$('.nueveli2').click(function() {
        $('.nuevelili2').slideToggle();
});

$('.diezli').hide();
    		$('.diez').click(function() {
        $('.diezli').slideToggle();
});

$( window ).scroll(function() {
  var scrls = $("#tope").offset().top + 305;
  var scrl = $(window).scrollTop();
  	if(scrl > scrls){
	$("#topev").show();
		}else{
	$("#topev").hide();	
		}
});