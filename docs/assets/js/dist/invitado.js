$(".carousel").carousel({
  interval: 2000,
});

$(document).on("click", ".descripcionicon", function () {
  var des = $(this).attr("des");
  $("#" + des).toggle("slow");
});

setTimeout(function () {
  $("#anibien").hide("slow");
}, 3500);

var anilogo = anime({
  targets: ".anilogo",
  translateY: -1000,
  autoplay: true,
});

setTimeout(function () {
  var anilogo = anime({
    targets: ".anilogo",
    translateY: 0,
    autoplay: true,
  });
}, 4500);

var anigasig = anime({
  targets: ".anigasig",
  translateX: 1000,
  autoplay: true,
});

setTimeout(function () {
  var anigasig = anime({
    targets: ".anigasig",
    translateX: 0,
    autoplay: true,
  });
}, 5000);

var anipcal = anime({
  targets: ".anipcal",
  translateX: 1000,
  autoplay: true,
});

setTimeout(function () {
  var anipcal = anime({
    targets: ".anipcal",
    translateX: 0,
    autoplay: true,
  });
}, 5500);

var anirest = anime({
  targets: ".anirest",
  translateY: 1000,
  autoplay: true,
});

setTimeout(function () {
  var anirest = anime({
    targets: ".anirest",
    translateY: 0,
    autoplay: true,
  });
}, 6000);

var anirbol = anime({
  targets: ".anirbol",
  translateY: 1000,
  autoplay: true,
});

setTimeout(function () {
  var anirbol = anime({
    targets: ".anirbol",
    translateY: 0,
    autoplay: true,
  });
}, 6500);
