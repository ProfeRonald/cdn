$(document).ready(function () {
   
    var idc = new URLSearchParams(
        document.location.search.substring(1)
      ).get("ica");
     
      if (idc != "" && idc != null) {

 var posicion = $("#" + idc).offset().top - 45;
 $("html, body").animate({
     scrollTop: posicion
 }, 2000);

    }

    $(document).on('click', '.reclamare', function () {
        $("#actrec").html('<textarea style="width:250px;display:block;margin-left:15%" name="razon_reclamo" id="razon_reclamo" rows="4" placeholder="Describa el motivo por el cual el profesor debe revisar esta calificaci&oacute;n" class="form-control"></textarea>');
        $("#bhacrec2").attr("class", "btn btn-warning");
        $("#bhacrec2").text("RECLAMAR");
        $("#bhacrec2").attr("id", "bhacrec");
        var idrec = $(this).attr('idrec');
        $("#idrec").val(idrec);
        var ne = $(this).attr('ne');
        $("#ne").text(ne);
        var pcal = $(this).attr('pcal');
        $("#pcal").text(pcal);
        var mcal = $(this).attr('mcal');
        $("#mcal").html('<div class="fraccion" style="visibility:hidden"><span class="dividendo">100</span><span class="barra">/</span><span class="divisor">100</span></div>' + mcal);
        var nce = $(this).attr('nce');
        var nce = nce.split(":");
        var pra = nce[1];
        var nce = nce[0];
        $("#nce").html('<div class="fraccion"><span class="dividendo">' + nce + '</span><span class="barra">/</span><span class="divisor">' + pra + '</span></div>');
        var acer = $(this).attr('acer');
        $("#largeModalLabelRec").html(acer);
    });

});

$(document).on('click', '#bhacrec', function () {     
    var rrec = $("#razon_reclamo").val();
        if(rrec != ''){
            var idrec = $("#idrec").val();
            $.ajax({
                method: "POST",
                url: "up.php?op=HacerReclamoNota",
                data: {
                    id: idrec,
                    razon_reclamo: rrec
                }
               })
               
               .done(function(r){
                 if(r == 1){
                     $("#actrec").html('<div class="my-3" style="font-size:2rem"><i class="fa fa-refresh rotar" aria-hidden="true"></i></div>');
                     var fondo = $("#actrec").css({border: '1px solid #2ECC71'}).show();
                     setTimeout(function(){
                         fondo.css({border: '1px solid black'});
                         $("#actrec").text("");
                         $("#actrec").css({border: '0px solid #ccc'});
                         $("#bhacrec").attr("class","btn btn-success");
                         $("#bhacrec").html("Petici&oacute;n hecha con &eacute;xito");
                         $("#bhacrec").attr("id","bhacrec2");
                         $('[idrec='+idrec+']').removeAttr('style');
                         $('[idrec='+idrec+']').removeAttr('class');
                         $('[idrec='+idrec+']').html(' <strong style="font-size:7pt;font-weight:bold;">Revisi&oacute;n en proceso</strong> ');
                     },3000);
                     
                     for(i=0;i<2;i++){
                         $("#actrec").fadeTo('slow', 0.5).fadeTo('slow', 1.0);
                     }
                  }else{
                      var actrec = $("#actrec").html();
                      $("#actrec").html('<span class="text-danger font-weight-bold">No se pudo realizar la petici&oacute;n</span>');
                     setTimeout(function(){
                         $("#actrec").html(actrec);
                         $("#actrec textarea").val(rrec);
                         $("#bhacrec").attr("class","btn btn-warning");
                         $("#bhacrec").text("Intentar de nuevo");
                     },3000);
                  }
                    
             })

          }
     
  });

  $(document).on('click', '.noreclamar', function () {
   
    var idrec = $(this).attr("id");
    var idrec = idrec.split("-");
    var idrec = idrec[1];
    $.ajax({
        method: "POST",
        url: "up.php?op=HacerReclamoNota",
        data: {
            id: idrec,
            srec: 1,
      }
    })
  .done(function(del){
      setTimeout(function(){
          $('#o'+idrec).hide();
      },3000);
      
      for(i=0;i<2;i++){
          $('#o'+idrec).fadeTo('slow', 0.5).fadeTo('slow', 1.0);
      }
  })

});