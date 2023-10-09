$(document).ready(function () {

	var year_1 = $("#datos_js").attr("year_1");
	var year_2 = $("#datos_js").attr("year_2");
	var id_grupo = $("#datos_js").attr("id_grupo");
	var ponderacion_academica = $("#datos_js").attr("ponderacion_academica");
	var ponderacion_tecnica = $("#datos_js").attr("ponderacion_tecnica");
	var ponderacion_fct = $("#datos_js").attr("ponderacion_fct");
	var asignaturas = $("#datos_js").attr("asignaturas");
	var ponderacion_asistencia = $("#datos_js").attr("ponderacion_asistencia");
	var id_estudiante = $("#datos_js").attr("id_estudiante");
	var grupos_competencias = Number($("#datos_js").attr("grupos_competencias"));
	var tperiodos_escuela = $("#datos_js").attr("tperiodos_escuela");
	var fechaextraordinario = $("#datos_js").attr("fechaextraordinario");

	$(document).on('click', '#verlista, #cerrar-listaests', function () {
		$('#listaests').toggle("slow");
	});

	$(document).on('change', '.ingresar-ind', function () {
		$("#datos_js").removeAttr("reserva");
		var a = $(this).attr('a');
		$('.orden-ind').hide();
		if ($(this).val() > 0) {
			$('#ingresar-per-' + a).show("slow");
			$('.o-' + $(this).val() + '-' + a).show();
			$('#ingresar-ind-' + a + '-1').html($("option:selected", this).attr('svalue'));
		} else {
			$('#ingresar-per-' + a).hide("slow");
			$('#ingresar-ind-' + a + '-1').text('');

		}

	});

	$(document).on('change', '.ingresar-per', function () {
		var a = $(this).attr('a');
		if ($(this).val() > 0) {
			$('#ingresar-cal-' + a).show("slow");
		} else {

			$('#ingresar-cal-' + a).hide("slow");
		}

	});

	$(document).on('click', '.agregar-cal-a', function () {
		var a = $(this).attr('a');
		var m = $(this).attr('m');
		if (m == 1) {
			$("#agregar-cal-" + a).appendTo("#agregar-cal-cont-" + a);
			$(this).removeAttr('m');
		}
		$("#agregar-cal-" + a).toggle("slow");

	})

	$(window).scroll(function () {
		var scrls = $("#scrollsa").offset().top + 700;
		var scrl = $(window).scrollTop();
		if (scrl > scrls) {
			$("#nesa").show();
			$("#nesa").addClass("d-none");
			$("#nesa").addClass("d-md-block");
		} else {
			$("#nesa").removeClass("d-none");
			$("#nesa").removeClass("d-md-block");
			$("#nesa").hide();
			$("#listaests").hide();
		}
	});

	var ant = new URLSearchParams(
		document.location.search.substring(1)
	).get("ant");

	var sig = new URLSearchParams(
		document.location.search.substring(1)
	).get("sig");

	if (ant > 0 || sig > 0) {
		var pos = $("#scrollsa").offset().top + 744;
		$("html, body").animate({
			scrollTop: pos
		}, 2000);
	}

	$(document).on(
		"focus click",
		".CalificacionIL, .CalificacionILFinal",
		function () {
			$("#datos_js").attr("reserva", $(this).val());
			var val = $(this).val();

			var avisoil2 = $(this).attr('id') + '-2';

			var nivel = "";

			if (val > 0 && val < 70) {
				nivel = "Insuficiente";
			} else if (val > 69 && val < 80) {
				nivel = "Bueno";
			} else if (val > 79 && val < 90) {
				nivel = "Muy Bueno";
			} else if (val > 89 && val < 101) {
				nivel = "Excelente";
			}

			$('#' + avisoil2).text(nivel);

		});

		$(document).on(
			"focus click",
			".CalificacionRP",
			function () {
				$("#datos_js").attr("reserva", $(this).val());

				var val = Number($('#' + $(this).attr('id') + '-iper').text());
	
				var avisoil2 = $(this).attr('id') + '-2';
	
				var nivel = "";
	
				if (val > 0 && val < 70) {
					nivel = "Insuficiente";
				} else if (val > 69 && val < 80) {
					nivel = "Bueno";
				} else if (val > 79 && val < 90) {
					nivel = "Muy Bueno";
				} else if (val > 89 && val < 101) {
					nivel = "Excelente";
				}
	
				$('#' + avisoil2).text(nivel);
	
			});


	$(document).on("keyup change", ".CalificacionILFinal", function () {
		var nota = $(this).val().replace(/[^\d]/g, "");
		if (nota.length > 2 && nota != 100) {
			nota = nota.substring(0, nota.length - 1);
		}
		$(this).val(nota);
		var id_nota = $(this).attr("id");
		RevaluaIL(id_nota);
	});


	$(document).on("blur", ".CalificacionILFinal", function () {
		var reserva = $("#datos_js").attr("reserva");
		var nota = $(this).val();
		var id_nota = $(this).attr("id_nota");
		var id = $(this).attr("id").split("-");
		var tipo_nota = $(this).attr("name");
		var input = $(this);

		if (nota != reserva) {
			$.ajax({
				method: "POST",
				url: "up.php?op=Calificaciones",
				dataType: "json",
				data: {
					nota: nota,
					pra: 100,
					id_nota: id_nota,
					id_estudiante: id_estudiante,
					tipo_nota: tipo_nota,
					id_asignaturamf: id[1],
					id_grupo: id_grupo,
					year_1: year_2,
					year_2: year_2,
				},
			}).done(function (e) {
				console.log(e);
				if (e["exito"] == 1) {
					var color = "#2ECC71";
					RevaluaAsignatura(id[1]);
				} else {
					var color = "red";
				}
				if (id_nota > 0) {
				} else if (e["id_nota"] > 0) {
					input.attr("id_nota", e["id_nota"]);
				}
				var fondo = $(input).css({ backgroundColor: color }).show();
				setTimeout(function () {
					fondo.css({ backgroundColor: "", color: "black" });
				}, 1500);
				for (h = 0; h < 2; h++) {
					$(input).fadeTo("slow", 0.5).fadeTo("slow", 1.0);
				}
			});
		}
	});

	function SumaPCs(a) {
		var csfs = 0;
		for (cl=1; cl < grupos_competencias + 1; cl++) { 
			var pers = 0;
			$('.' + a + '-' + cl + '-rp-iper').each(function () {
			pers += Number($(this).text());
			})
			var comp = Number(parseFloat(pers / tperiodos_escuela).toFixed(1));
			$('#' + a + '-' + cl + '-rp-col').text(comp);
			csfs += comp;
		}

		var cf = Number(parseFloat(csfs / grupos_competencias).toFixed(0));
		$('#pcp-' + a).text(cf);

	}

	function SumaPs(a, col, per) {
		var n = 0;
		var suma = 0;
		$(".comp-" + a + '-' + col + '-' + per).each(function () {
			var sumap = Number($(this).val());
			if(sumap > 0){
				suma += sumap;
				n++;
			}
		});

		if(suma > 0){
			var ind = Number(parseFloat(suma / n).toFixed(0));
			$('#ind-' + a + '-' + col + '-' + per).text(ind);
			var rp = Number(parseFloat(($('#' + a + '-' + col + '-' + per + '-rp').val() / 100) * (100 - ind)).toFixed(0));
			$('#' + a + '-' + col + '-' + per + '-rp-iper').text(ind + rp);
		}

	}

		$(document).on("blur", ".CalificacionRP", function () {
			var reserva = $("#datos_js").attr("reserva");
			var avisoil2 = $(this).attr('id') + '-2';
			$('#' + avisoil2).text('');
			var nota = $(this).val();
			var id_nota = $(this).attr("id_nota");
			var id = $(this).attr("id").split("-");
			var tipo_nota = "p-" + id[1] + "-" + id[2];
			var input = $(this);
			if (nota != reserva) {
				$.ajax({
					method: "POST",
					url: "up.php?op=Calificaciones",
					dataType: "json",
					data: {
						nota: nota,
						pra: 100,
						id_nota: id_nota,
						id_estudiante: id_estudiante,
						tipo_nota: tipo_nota,
						id_asignaturamf: id[0],
						id_grupo: id_grupo,
						year_1: year_1,
						year_2: year_2,
					},
				}).done(function (e) {
					console.log(e);
					if (e["exito"] == 1) {
					var color = "#2ECC71";
					var ind = Number($('#ind-' + id[0] + '-' + id[1] + '-' + id[2]).text());
					var rp = Number(parseFloat((nota / 100) * (100 - ind)).toFixed(0));
					$('#' + id[0] + '-' + id[1] + '-' + id[2] + '-rp-iper').text(ind + rp);
					SumaPCs(id[0]);
					RevaluaAsignatura(id[0]);
					} else {
						var color = "red";
					}
					if (id_nota > 0) {
					} else if (e["id_nota"] > 0) {
						input.attr("id_nota", e["id_nota"]);
					}
					var fondo = $(input).css({ backgroundColor: color }).show();
					setTimeout(function () {
						fondo.css({ backgroundColor: "", color: "black" });
					}, 1500);
					for (h = 0; h < 2; h++) {
						$(input).fadeTo("slow", 0.5).fadeTo("slow", 1.0);
					}
				});
			}
		});

	$(document).on("blur", ".CalificacionIL", function () {
		var reserva = $("#datos_js").attr("reserva");
		var avisoil2 = $(this).attr('id') + '-2';
		$('#' + avisoil2).text('');
		var nota = $(this).val();
		var id_nota = $(this).attr("id_nota");
		var id = $(this).attr("id").split("-");
		var tipo_nota = "i-" + id[1] + "-" + id[2];
		var input = $(this);
		if (nota != reserva) {
			$.ajax({
				method: "POST",
				url: "up.php?op=Calificaciones",
				dataType: "json",
				data: {
					nota: nota,
					pra: 100,
					id_nota: id_nota,
					id_estudiante: id_estudiante,
					tipo_nota: tipo_nota,
					id_asignaturamf: id[0],
					id_grupo: id_grupo,
					year_1: year_1,
					year_2: year_2,
				},
			}).done(function (e) {
				console.log(e);
				if (e["exito"] == 1) {
					var color = "#2ECC71";
					var col = input.attr("class").split('-')[2];
					SumaPs (id[0], col, id[2]);
					SumaPCs(id[0]);
					RevaluaAsignatura(id[0]);
				} else {
					var color = "red";
				}
				if (id_nota > 0) {
				} else if (e["id_nota"] > 0) {
					input.attr("id_nota", e["id_nota"]);
					input.closest("tr").find('.eliminarNotaCE:first').attr('id', 'eln-' + e["id_nota"]);
				}
				var fondo = $(input).css({ backgroundColor: color }).show();
				setTimeout(function () {
					fondo.css({ backgroundColor: "", color: "black" });
				}, 1500);
				for (h = 0; h < 2; h++) {
					$(input).fadeTo("slow", 0.5).fadeTo("slow", 1.0);
				}
			});
		}
	});

	$(document).on("blur", ".CalificacionILIngresar", function () {
		var nota = $(this).val();
		var a = $(this).attr("id").split('-')[2];
		var id_nota = $(this).attr("id_nota");
		var per = $('#ingresar-per-' + a);
		var o = $('#ingresar-ind-' + a);

		var tipo_nota = "i-" + o.val() + "-" + per.val();
		var input = $(this);

		if (nota > 0 && o.val() > 0 && per.val() > 0) {
			$.ajax({
				method: "POST",
				url: "up.php?op=Calificaciones",
				dataType: "json",
				data: {
					nota: nota,
					id_nota: id_nota,
					pra: 100,
					id_estudiante: id_estudiante,
					tipo_nota: tipo_nota,
					id_asignaturamf: a,
					id_grupo: id_grupo,
					year_1: year_1,
					year_2: year_2,
				},
			}).done(function (e) {
				if (e["exito"] == 1) {
					var color = "#2ECC71";

					if (id_nota > 0) {
						var enota = id_nota;
					} else if (e["id_nota"] > 0) {
						var enota = e["id_nota"];
						input.attr("id_nota", e["id_nota"]);
						input.closest("tr").find('.eliminarNotaCE:first').attr('id', 'eln-' + e["id_nota"]);
					}
					if (enota == undefined) {
						enota = 0;
					}

					var ind = $("option:selected", o);

					var idper = $('#per-' + a + '-' + per.val());
					var tex_ind = $('#ingresar-ind-' + a + '-1').text();
					var tds = '<td class="text-left p-1 style="border:1px solid #ccc;white-space: normal;font-size:0.75rem"><div class="text-justify" style="white-space: normal;font-size:1rem">' + tex_ind + '<span class="eliminarNotaCE" style="cursor:pointer;display:none" rel="tooltip" title="Eliminar esta calificaci&oacute;n" data-toggle="modal" data-target="#elCalModal" id="eln-' + enota + '"> - <i class="fa fa-trash"></i></span></div></td><td style="text-align:center;font-size:1.6rem;"><div class="text-dark" style="font-size:1rem" id="' + a + '-' + o.val() + '-' + per.val() + '-1"></div><input class="CalificacionIL comp-' + a + '-' + ind.attr('col') + '-' + per.val() + '" maxlength="3" size="2" id="' + a + '-' + o.val() + '-' + per.val() + '" id_nota="' + enota + '" op="0" valc="' + nota + '" autocomplete="off" value="' + nota + '" style="font-size:2.5rem;width:80px;height:80px;"><div class="text-dark" style="font-size:1rem" id="' + a + '-' + '-' + o.val() + '-' + per.val() + '-2"></div></td>';

					if (idper.parent().attr('rsp') == 0) {

						idper.parent().show();
						idper.parent().attr('rsp', 1);

						idper.parent().html('<th rowspan="1" id="per-' + a + '-' + per.val() + '" style="border:1px solid #ccc;background: #333;color:white" class="align-middle"><p class="text-uppercase" style="writing-mode: vertical-lr;transform: rotate(180deg);font-size:3rem">' + idper.html() + '</p></th>' + tds + '</tr>');

					} else {

						idper.parent().after('<tr>' + tds + '</tr>');
						idper.attr('rowspan', Number(idper.attr('rowspan')) + 1);
						idper.parent().attr('rsp', Number(idper.parent().attr('rsp')) + 1);

					}
					
					SumaPs (a, ind.attr('col'),  per.val());
					SumaPCs(a);
					RevaluaAsignatura(a);

					if ($('#ingresar-per-' + a + ' option[style=""]').length == 1) {
						ind.remove();
					}
					var sper = $("option:selected", per);
					if (sper.val() > 0) {
						sper.remove();
					}

				} else {
					var color = "red";
				}

				var fondo = $(input).css({ backgroundColor: color }).show();
				setTimeout(function () {
					fondo.css({ backgroundColor: "", color: "black" });
				}, 1500);
				for (h = 0; h < 2; h++) {
					$(input).fadeTo("slow", 0.5).fadeTo("slow", 1.0);
				}
			//	$(input).css({width:"80px", height: "80px"});
			});
		}
	});

	$(document).on(
		"keyup change",
		".CalificacionILIngresar",
		function () {
			var nota = $(this).val().replace(/[^\d]/g, "");
			if (nota.length > 2 && nota != 100) {
				nota = nota.substring(0, nota.length - 1);
			}
			$(this).val(nota);

		}
	);

	$(document).on(
		"keyup change",
		".CalificacionIL",
		function () {
			var nota = $(this).val().replace(/[^\d]/g, "");
			if (nota.length > 2 && nota != 100) {
				nota = nota.substring(0, nota.length - 1);
			}
			$(this).val(nota);
			var id_nota = $(this).attr("id");
			RevaluaIL(id_nota);

		}
	);

	$(document).on('keyup change', '.CalificacionIL, .CalificacionRP, .CalificacionRA, .CalificacionFCT', function () {
		var valc = $(this).attr('valc');
		var val = $(this).val();
		var avisoil = $(this).attr('id') + '-1';
		if (val != valc && val > 0) {
			$('#' + avisoil).text('Anterior: ' + valc);
		} else {
			$('#' + avisoil).text('');
		}

		var nc = $(this).closest("tr").find("input").index(this);

		if (event.keyCode == 40) {
			var s = $(this).closest("tr").next().find("input").eq(nc);
			if (s.length == 0) {
				var s1 = $(this).closest("tr").next().next().find("input").eq(nc);
				if (s1.length == 0) {
					$(this)
						.closest("tr")
						.next()
						.next()
						.next()
						.find("input")
						.eq(nc)
						.focus();
				} else {
					s1.focus();
				}
			} else {
				s.focus();
			}
		}

		if (event.keyCode == 38) {
			var a = $(this).closest("tr").prev().find("input").eq(nc);
			if (a.length == 0) {
				var a1 = $(this).closest("tr").prev().prev().find("input").eq(nc);
				if (a1.length == 0) {
					$(this)
						.closest("tr")
						.prev()
						.prev()
						.prev()
						.find("input")
						.eq(nc)
						.focus();
				} else {
					a1.focus();
				}
			} else {
				a.focus();
			}
		}

	});

	$(document).on('blur focus', '.CalificacionIL', function () {
		var id_nota = $(this).attr('id_nota');
		if (id_nota > 0) {
			$('.eliminarNotaCE').hide();
			var a = $(this).attr("id").split("-")[0];
			$('#eliminarCalEst').attr('id_calificacion', id_nota);
			$('#eliminarCalEst').attr('a', a);
			$('#eliminarCalEst').attr('id_per', $(this).attr('id'));

			$('#eln-' + id_nota).show();
		}
	});

	$(document).on('click', '#eliminarCalEst', function () {
		var id_calificacion = $(this).attr('id_calificacion');
		var id_per = $(this).attr('id_per');
		var a = $(this).attr('a');

		$('#eliminarCalEst').hide();

		$.ajax({
			method: "POST",
			url: "up.php?op=EliminarNota",
			dataType: 'json',
			data: {
				id_calificacion: id_calificacion,
			}
		})
			.done(function (del) {

				setTimeout(function () { $('#eliminarCalCerrar').trigger("click"); $("#elCalEst").html('<p>&iquest;Seguro quiere eliminar esta calificaci&oacute;n?</p><p><strong class="text-danger">&iexcl;No se puede revertir!</strong></p>'); $('#eliminarCalEst').show(); }, 2500);
				
				$('#eliminarCalEst').removeAttr('id_calificacion');
				$('#eliminarCalEst').removeAttr('id_per');
				if (del['u'] == 1) {
					$("#elCalEst").html('<div class="my-3 text-center" style="font-size:1rem;color:#D65D0A;">&iexcl;Calificaci&oacute;n eliminada!<br /><i class="fa fa-check" aria-hidden="true"></i></div>');

					var idper = id_per.split('-');
					idper = idper[0] + '-' + idper[2];
					var trsp = $('#per-' + idper);

					var rsp = $('#eln-' + id_calificacion).closest("tr");
					if (rsp.attr("rsp") > 0) {
						$('#eln-' + id_calificacion).parent().parent().remove();
						$('#' + id_per).parent().remove();
					} else {
						srsp = Number(trsp.attr('rowspan'));
						trsp.attr('rowspan', srsp - 1);
						rsp.remove();
					}

					nrsp = Number(trsp.parent().attr('rsp'));
					trsp.parent().attr('rsp', nrsp - 1);
					if (nrsp == 1) {
						trsp.parent().hide();
					}

					$('.RevaluaAsignatura').text('');
					
					var comps = new Object();
					$('#tabla-' + a + ' .CalificacionIL').each(function () {
						comps[$(this).attr('class').split(' ')[1]] = $(this).attr('class').split(' ')[1];
					})

					$.each(comps, function (c, comp) {
					var cp = comp.split('-');
					console.log(comp);
					SumaPs (cp[1], cp[2], cp[3]);
					})
			
					SumaPCs(a);
					SumaA(a);
					RevaluaAsignatura(a);

				} else {
					$("#elCalEst").html('<div class="my-3 text-center text-danger" style="font-size:1rem;">&iexcl;No se pudo eliminar la calificaci&oacute;n!<br /><i class="fa fa-ban" aria-hidden="true"></i></div>');
				}
			})
	});

	$(document).on('keyup change', '.CalificacionRA', function () {
		var val = $(this).val().replace(/[^\d]/g, "");
		var idc = $(this).attr('id');
		var idpra = idc.split('-');
		var pra = Number($('#pra-' + idpra[0] + '-' + idpra[1]).val());
		if (Number(val) > pra && pra > 0 && Number(val) > 0) {
			val = pra;
		}
		$(this).val(val);

		RevaluaRA(idc);

	});

	$(document).on("blur", ".CalificacionRA", function () {
		var reserva = $("#datos_js").attr("reserva");
		var nota = $(this).val();
		var id_nota = $(this).attr("id_nota");
		var id = $(this).attr("id").split("-");
		var tipo_nota = "r-" + id[1] + "-" + id[2];
		var pra = $('#pra-' + id[0] + '-' + id[1]).val();
		var input = $(this);
		if (nota != reserva) {
			$.ajax({
				method: "POST",
				url: "up.php?op=Calificaciones",
				dataType: "json",
				data: {
					nota: nota,
					id_nota: id_nota,
					id_estudiante: id_estudiante,
					tipo_nota: tipo_nota,
					pra: pra,
					id_asignaturamf: id[0],
					id_grupo: id_grupo,
					year_1: year_1,
					year_2: year_2,
				},
			}).done(function (e) {
				if (e["exito"] == 1) {
					var color = "#2ECC71";
				} else {
					var color = "red";
				}
				if (id_nota > 0) {
				} else if (e["id_nota"] > 0) {
					input.attr("id_nota", e["id_nota"]);
				}
				var fondo = $(input).css({ backgroundColor: color }).show();
				setTimeout(function () {
					fondo.css({ backgroundColor: "", color: "black" });
				}, 1500);
				for (h = 0; h < 2; h++) {
					$(input).fadeTo("slow", 0.5).fadeTo("slow", 1.0);
				}
			});
		}
	});

	$(document).on(
		"focus click",
		".AsistenciaIL, .AsistenciaILFinal, .AsistenciaRA, .CalificacionRA, .CalificacionFCT",
		function () {
			$("#datos_js").attr("reserva", $(this).val());
		});

	$(document).on(
		"keyup change",
		".AsistenciaIL, .AsistenciaRA",
		function () {
			var asistencia = $(this).val().replace(/[^\d]/g, "");
			var dt = Number($('#' + $(this).attr('id') + '-d').text());
			if (asistencia > 0 && asistencia > dt) {
				asistencia = dt;
			}
			$(this).val(asistencia);

			var nc = $(this).closest("tr").find("input").index(this);

			if (event.keyCode == 40) {
				var s = $(this).closest("tr").next().find("input").eq(nc);
				if (s.length == 0) {
					var s1 = $(this).closest("tr").next().next().find("input").eq(nc);
					if (s1.length == 0) {
						$(this)
							.closest("tr")
							.next()
							.next()
							.next()
							.find("input")
							.eq(nc)
							.focus();
					} else {
						s1.focus();
					}
				} else {
					s.focus();
				}
			}

			if (event.keyCode == 38) {
				var a = $(this).closest("tr").prev().find("input").eq(nc);
				if (a.length == 0) {
					var a1 = $(this).closest("tr").prev().prev().find("input").eq(nc);
					if (a1.length == 0) {
						$(this)
							.closest("tr")
							.prev()
							.prev()
							.prev()
							.find("input")
							.eq(nc)
							.focus();
					} else {
						a1.focus();
					}
				} else {
					a.focus();
				}
			}
		});

	$(document).on("blur change", ".AsistenciaIL, .AsistenciaILFinal, .AsistenciaRA", function () {
		var reserva = $("#datos_js").attr("reserva");
		var asistencia = $(this).val();
		var id_asistencia = $(this).attr("id_asistencia");
		var id = $(this).attr("id");
		id = id.split("-");
		var mes = id[0];
		var input = $(this);
		console.log(asistencia +'-'+ reserva);
		if (asistencia != reserva) {
			$.ajax({
				method: "POST",
				url: "up.php?op=Asistencias",
				dataType: "json",
				data: {
					asistencia: asistencia,
					id_asistencia: id_asistencia,
					id_estudiante: id_estudiante,
					mes: mes,
					id_asignaturamf: id[1],
					id_grupo: id_grupo,
				},
			}).done(function (e) {
				console.log(e);
				if (e["exito"] == 1 || e["exito"] == 2) {
					var color = "#2ECC71";
					if($('#a'+id[1]).attr('tipo') == 'i'){
					SumaA(id[1]);
					RevaluaAsignatura(id[1]);
					}else if($('#a'+id[1]).attr('tipo') == 'r'){
						RevaluaModulo(id[1]);
					}

				} else {
					var color = "red";
				}
				if (e["exito"] == 2) {
					input.val(asistencia);
				}
				if (id_asistencia > 0) {
				} else if (e["id_asistencia"] > 0) {
					input.attr("id_asistencia", e["id_asistencia"]);
				}
				var fondo = $(input).css({ backgroundColor: color }).show();
				setTimeout(function () {
					fondo.css({ backgroundColor: "", color: "black" });
				}, 1500);
				for (h = 0; h < 2; h++) {
					$(input).fadeTo("slow", 0.5).fadeTo("slow", 1.0);
				}
			});
		}
	});

	function RevaluaIL(id_nota) {
		var nota = Number($("#" + id_nota).val());
		var permiso = $("#" + id_nota).attr("op");

		if (permiso == 1) {
			$("#" + id_nota).removeAttr("style");
			$("#" + id_nota).css({
				"background-color": "inherit",
				color: "black",
				"font-weight": "bold",
				border: "0px",
			});
			$("#" + id_nota).prop("readonly", true);
		} else {
			if ((nota < ponderacion_academica && nota != 0) || nota > 100) {
				$("#" + id_nota).removeAttr("style");
				$("#" + id_nota).css({
					"background-color": "#FF7B5A",
					color: "white",
					"font-weight": "bold",
				});
			} else {
				$("#" + id_nota).removeAttr("style");
			}
		}
	}

function RevaluaRP(id_nota) {

		var nota = Number($("#" + id_nota).val());
		var permiso = $("#" + id_nota).attr("op");
		var notap = Number($('#'+id_nota+'-iper').text());
	  
		$("#" + id_nota).prop("readonly", false);
		$("#" + id_nota).removeAttr("disabled");
		 $("#" + id_nota).prop("type", "text");
	  
		if (permiso == 1) {
		  $("#" + id_nota).removeAttr("style");
		  $("#" + id_nota).css({
			"background-color": "inherit",
			color: "black",
			"font-weight": "bold",
			border: "0px",
		  });
		  $("#" + id_nota).prop("readonly", true);
		} else {
		  if (notap == '' || notap == 0 || notap >= ponderacion_academica) {
			$("#" + id_nota).prop("readonly", true);
			$("#" + id_nota).removeAttr("style");
			$("#" + id_nota).css({'background-color':'inherit','color':'transparent','border':'1px solid #ccc'});
			setTimeout(function () {
			 $("#" + id_nota).prop("disabled", "disabled");
			 $("#" + id_nota).prop("type", "hidden");
			}, 1000);
		  }else if ((nota != 0) || nota > 100) {
			$("#" + id_nota).removeAttr("style");
			$("#" + id_nota).css({
			  "background-color": "#FF7B5A",
			  color: "white",
			  "font-weight": "bold",
			});
		  } else {
			$("#" + id_nota).removeAttr("style");
		  }
		}
	  
	  }
	  $(document).on(
		"keyup change",
		".CalificacionRP",
		function () {
			var nota = $(this).val().replace(/[^\d]/g, "");
			if (nota.length > 2 && nota != 100) {
				nota = nota.substring(0, nota.length - 1);
			}
			$(this).val(nota);
			var id_nota = $(this).attr("id");
			RevaluaRP(id_nota);

		}
	);
	
function SumaA(a){
		
		var tasis = 0;
		
		$(".asis" + a).each(function () {
			tasis += Number($(this).val());
		});

		$('#tae-' + a).text(tasis);

		var paa = Number(parseFloat(tasis / Number($('#tad-' + a).text()) * 100).toFixed(0));

		if (!isNaN(paa)) {
		$('#pasis-' + a).text(paa);
		}

	}

	function RevaluaAsignatura(a) {
	
		var pasis = Number($('#pasis-' + a).text());
		var cf = Number($('#pcp-' + a).text());
		var estado;
		if(cf >= ponderacion_academica && pasis >= ponderacion_asistencia){		

		estado = "Aprobada(G)";
		$('#pfs-' + a).closest('tr').hide();

		$('#cpc-' + a).closest('tr').hide();

		$('#cpex-' + a).closest('tr').hide();

		$('#total-' + a).closest('tr').hide();
		
		$('#op1-' + a).closest('tr').hide();

	} else {
		

		$('#pfs-' + a).closest('tr').show();
		$('#cpc-' + a).closest('tr').show();
		$('#total-' + a).closest('tr').show();
		
		var ac = $('#c-' + a).val();

		if(ac == 'A'){
			$('#cpc-' + a).hide();
			$('#cpc-' + a + '-3').text('AUS');
			var cc = 0;
		}else{
			$('#cpc-' + a).show();
			$('#cpc-' + a + '-3').text('');
		var ccf = Number(parseFloat(cf / 2).toFixed(0));
		var ccpc = Number(parseFloat($('#cpc-' + a).val() / 2).toFixed(0));
		var cc = ccf + ccpc;
		}

		$('#total-' + a).text(cc);
		if(Number(cc) >= ponderacion_academica){
		
		estado = "Aprobada(C)";

		$('#cpc-' + a).show();
		$('#cpex-' + a).closest('tr').hide();
		$('#op1-' + a).closest('tr').hide();
		
		}else{

			var ae = $('#e-' + a).val();
	
		if(ae == 'A'){
			$('#cpex-' + a).hide();
			$('#cpex-' + a + '-3').text('AUS');
			var cex = 0;
		}else{
			$('#cpex-' + a).show();
			$('#cpex-' + a + '-3').text('');
			var tcf = Number(parseFloat(cf * 0.3).toFixed(0));
			var scpex = Number(parseFloat($('#cpex-' + a).val() * 0.7).toFixed(0));
			var cex = tcf + scpex;
		}

		$('#total-' + a).text(cex);
			if(Number(cex) >= ponderacion_academica){
				
			estado = "Aprobada(E)";
			
			$('#cpex-' + a).closest('tr').show();
			$('#op1-' + a).closest('tr').hide();

			}else{
				$('#cpex-' + a).closest('tr').show();
				$('#op1-' + a).closest('tr').show();
			
				
			var op1 = $('#o1-' + a).val();

	
		if(op1 == 'A'){

	$('#op1-' + a).hide();
	$('#op1-' + a + '-3').text('AUS');
	$('#total-' + a).text(cf);
		}else{		
			$('#op1-' + a).show();
			$('#op1-' + a + '-3').text('');
			var op1 = $('#op1-' + a).val();
			var ccfl = Number(parseFloat(cf + (op1 / 100) * (100 - cf)).toFixed(0));
		}
			
			$('#total-' + a).text(ccfl);
				if(Number(ccfl) >= ponderacion_academica){
					estado = "Aprobada(O)";
						
					}else{
						if(pasis < ponderacion_asistencia){
							estado = "Reprobada(A)";
							}else{
							estado = "Reprobada";	
							}
					}
					
			}

		}

	}

if(fechaextraordinario == 1){
	if (estado == "Reprobada" || estado == "Reprobada(A)") {
		$('#a' + a + ' small').html(' - <span class="text-danger">&iexcl;' + estado + '!</span>');
	} else if(estado != undefined){
		$('#a' + a + ' small').html(' - <span class="text-info">&iexcl;' + estado + '!</span>');
	}

}

}

	function RevaluaAsignatura2(a) {
/*
		periodos_escuela = periodos_escuela.split(',');
		var prs = Array();
		var tprs = Array();

		$.each(periodos_escuela, function (n, i) {
			prs[i] = 0;
			tprs[i] = 0;
		});

		$(".ind" + a).each(function (a, c) {
			var p = c.id.split('-')[2];
			prs[p] += Number($(this).val());
			tprs[p] += 1;
		});

		//	prs.shift();
		var pcp = 0;
		$.each(periodos_escuela, function (j, r) {
			var per = Number(parseFloat(prs[r] / tprs[r]).toFixed(0));

			if (!isNaN(per)) {
				pcp += per;
				$('#iper-' + r + '-' + a).text(per);
			}
		});

		pcp = Number(parseFloat(pcp / periodos_escuela.length).toFixed(0));

		$('#pcp-' + a).text(pcp);

*/
		

		

		var arep = 0;
		var estado;

		if (paa == 0) {
			estado = "Pendiente";
			arep = 1;
			console.log('1');
		} else if (paa > 0 && paa < ponderacion_asistencia) {
			estado = "Reprobada";
			arep = 1;
			console.log('2');
		} else {
			arep = 0;
			console.log('3');
		}

		arep = Number(arep);

		var cpc = '';
		var ccpc = '';
		var cc = '';
		var tpcp = '';
		var cpcp = '';
		var cpex = '';
		var scpex = '';
		var cex = '';
		if (pcp > 0 && pcp >= ponderacion_academica && arep == 0) {
			console.log('5');
			estado = "Aprobada";
			$('#cpc-' + a).closest('tr').hide();
			$('#cpex-' + a).closest('tr').hide();
			$('#total-' + a).closest('tr').hide();
			$('#op1-' + a).closest('tr').hide();
		} else if ((pcp > 0 && pcp < ponderacion_academica) || arep == 1) {
			$('#cpc-' + a).closest('tr').show();
			cpcp = Number(parseFloat(pcp / 2).toFixed(0));
			if (arep == 0) {
				cpc = "AUS";
				ccpc = "AUS";
				cc = cpcp;
				tpcp = Number(parseFloat(pcp * 0.3).toFixed(0));
				cpex = "AUS";
				scpex = "AUS";
				cex = tpcp;
				$('#cpc-' + a).hide();
				$('#cpc-' + a + '-3').text(cpc);
				$('#cpex-' + a).hide();
				$('#cpex-' + a + '-3').text(cpex);
				$('#total-' + a).text(cex);
				$('#cpc-' + a).closest('tr').show();
				$('#cpex-' + a).closest('tr').show();
				$('#total-' + a).closest('tr').show();
				$('#op1-' + a).closest('tr').show();
			} else if (arep == 1) {
				estado = "Reprobada";
				console.log('8-' + arep);
			}

			var ex = 1;

			var ac = $('#c-' + a).val();
			var ae = $('#e-' + a).val();

			var cpc = $('#cpc-' + a).val();
			var cpex = $('#cpex-' + a).val();

			if ((ac == "P" || ac == "T") && cpc > 0
			) {

				ccpc = Number(parseFloat(cpc / 2).toFixed(0));
				cc = cpcp + ccpc;
				if (cc >= ponderacion_academica) {
					estado = "Aprobada";
					tpcp = cpex = scpex = cex = tpcp = "";
					ex = 0;
					$('#cpc-' + a).show();
					$('#cpc-' + a + '-3').text('');
					$('#cpc-' + a).closest('tr').show();
					$('#cpex-' + a).closest('tr').hide();
					$('#total-' + a).closest('tr').show();
					$('#op1-' + a).closest('tr').hide();
				} else {
					$('#cpc-' + a).show();
					$('#cpc-' + a + '-3').text('');
					$('#cpc-' + a).closest('tr').show();
					$('#cpex-' + a).closest('tr').show();
					$('#total-' + a).closest('tr').show();
					$('#op1-' + a).closest('tr').hide();
				}
				$('#total-' + a).text(cc);
			}

			if (
				ex == 1 &&
				(ae == "P" || ae == "T") && cpex > 0
			) {

				scpex = Number(parseFloat(cpex * 0.7).toFixed(0));
				cex = tpcp + scpex;
				if (cex >= ponderacion_academica) {
					estado = "Aprobada";
					$('#cpex-' + a).show();
					$('#cpex-' + a + '-3').text('');
					$('#cpc-' + a).closest('tr').show();
					$('#cpex-' + a).closest('tr').show();
					$('#total-' + a).closest('tr').show();
					$('#op1-' + a).closest('tr').hide();
				} else {
					estado = "Reprobada";
					$('#cpex-' + a).show();
					$('#cpex-' + a + '-3').text('');
					$('#cpc-' + a).closest('tr').show();
					$('#cpex-' + a).closest('tr').show();
					$('#total-' + a).closest('tr').show();
					$('#op1-' + a).closest('tr').hide();
				}
				$('#total-' + a).text(cex);
			} else if (ex == 1) {
				console.log(ae);
				if (ae == "P" || ae == "T") {
					$('#cpex-' + a).show();
					$('#cpex-' + a + '-3').text('');
					$('#cpc-' + a).closest('tr').show();
					$('#cpex-' + a).closest('tr').show();
					$('#total-' + a).closest('tr').show();
					$('#op1-' + a).closest('tr').hide();
				}

				estado = "Reprobada";
			}
		}
		if (estado == "Reprobada") {
			var op1 = Number($('#op1-' + a).val());
			if (op1 < ponderacion_academica) {
				$('#op1-' + a).closest('tr').show();
			} else {
				$('#op1-' + a).closest('tr').show();
			}

			$('#a' + a + ' small').html(' - <span class="text-danger">&iexcl;' + estado + '!</span>');
		} else {
			$('#a' + a + ' small').html(' - <span class="text-info">&iexcl;' + estado + '!</span>');
		}
	}


	function RevaluaRA(idc) {

		var id = idc.split('-');
		var pra = Number($('#pra-' + id[0] + '-' + id[1]).val());

		var ra1 = id[0] + '-' + id[1] + '-1';
		var ra2 = id[0] + '-' + id[1] + '-2';
		var ra3 = id[0] + '-' + id[1] + '-3';

		$('#' + ra1).prop('readonly', true);
		$('#' + ra2).prop('readonly', true);
		$('#' + ra3).prop('readonly', true);
		$('#' + ra1).css({ 'background-color': 'inherit', 'color': 'transparent', 'border': '1px solid #ccc' });
		$('#' + ra2).css({ 'background-color': 'inherit', 'color': 'transparent', 'border': '1px solid #ccc' });
		$('#' + ra3).css({ 'background-color': 'inherit', 'color': 'transparent', 'border': '1px solid #ccc' });

		if (pra > 0) {

			$('#' + ra1).prop('readonly', false);
			$('#' + ra2).prop('readonly', false);
			$('#' + ra3).prop('readonly', false);
			$('#' + ra1).removeAttr('style');
			$('#' + ra2).removeAttr('style');
			$('#' + ra3).removeAttr('style');


			var ra_1 = Number($('#' + ra1).val());
			var ra_2 = Number($('#' + ra2).val());
			var ra_3 = Number($('#' + ra3).val());
			var ra_v = Number($('#' + idc).val());

			var spra = ponderacion_tecnica * pra;

			if ((ra_v < spra || ra_v > pra) && ra_v != 0 && ra_v != '') {
				$('#' + idc).removeAttr('style');
				$('#' + idc).css({ 'background-color': '#ff7b5a', 'color': 'white', 'font-weight': 'bold' });

			}

			if (ra_1 >= spra || ra_1 == 0 || ra_1 == '') {
				$('#' + ra2).prop('readonly', true);
				$('#' + ra3).prop('readonly', true);
				$('#' + ra2).css({ 'background-color': 'inherit', 'color': 'transparent', 'border': '1px solid #ccc' });
				$('#' + ra3).css({ 'background-color': 'inherit', 'color': 'transparent', 'border': '1px solid #ccc' });
			} else {
				$('#' + ra2).removeAttr('style');
				$('#' + ra2).prop('readonly', false);
				if ((ra_2 < spra || ra_2 > pra) && ra_2 != 0 && ra_2 != '') {
					$('#' + ra2).css({ 'background-color': '#ff7b5a', 'color': 'white', 'font-weight': 'bold' });
				} else {
					$('#' + ra2).prop('readonly', false);
				}
				if (ra_2 >= spra || ra_2 == 0 || ra_2 == '') {
					$('#' + ra3).prop('readonly', true);
					$('#' + ra3).css({ 'background-color': 'inherit', 'color': 'transparent', 'border': '1px solid #ccc' });
				} else {
					$('#' + ra3).removeAttr('style');
					if ((ra_3 < spra || ra_3 > pra) && ra_3 != 0 && ra_3 != '') {
						$('#' + ra3).css({ 'background-color': '#ff7b5a', 'color': 'white', 'font-weight': 'bold' });
						$('#' + ra2).prop('readonly', false);
					}
					$('#' + ra3).prop('readonly', false);
				}
			}

			var op1 = $('#' + ra1).attr('op');

			if (op1 == 1) {
				$('#' + ra1).removeAttr('style');
				$('#' + ra1).css({ 'background-color': 'inherit', 'color': 'black', 'font-weight': 'bold', 'border': '0px' });
				$('#' + ra1).prop("readonly", true);
			}

			var op2 = $('#' + ra2).attr('op');

			if (op2 == 1) {
				$('#' + ra2).removeAttr('style');
				$('#' + ra2).css({ 'background-color': 'inherit', 'color': 'black', 'font-weight': 'bold', 'border': '0px' });
				$('#' + ra2).prop("readonly", true);
			}

			var op3 = $('#' + ra3).attr('op');

			if (op3 == 1) {
				$('#' + ra3).removeAttr('style');
				$('#' + ra3).css({ 'background-color': 'inherit', 'color': 'black', 'font-weight': 'bold', 'border': '0px' });
				$('#' + ra3).prop("readonly", true);
			}

		}

		RevaluaModulo(id[0]);

	}


	function RevaluaModulo(m) {

		var tasis = 0;
		$(".asis" + m).each(function (a, c) {
			tasis += Number($(this).val());
		});

		$('#tae-' + m).text(tasis);

		var paa = Number(parseFloat(tasis / Number($('#tad-' + m).text()) * 100).toFixed(0));

		if (!isNaN(paa)) {
			$('#pasis-' + m).text(paa);
		}


		var sras = 0;
		$(".ra" + m).each(function (a, c) {
			var idc = c.id.split('-');
			var ra_1 = Number($('#' + idc[0] + '-' + idc[1] + '-1').val());
			var ra_2 = Number($('#' + idc[0] + '-' + idc[1] + '-2').val());
			var ra_3 = Number($('#' + idc[0] + '-' + idc[1] + '-3').val());
			var ras = [ra_1, ra_2, ra_3];
			var tras = Math.max(...ras);
			sras += tras;
		});

		var tpra = Number($('#tpra-' + m).val());

		var total = (sras / tpra * 100);
		total = Number(parseFloat(total).toFixed(0));

		if (total < (ponderacion_tecnica * 100)) {
			$('#a' + m + ' small').html(' - <span class="text-danger">&iexcl;Reprobado!</span>');
		} else {

			if(paa < ponderacion_asistencia){

			$('#a' + m + ' small').html(' - <span class="text-danger">&iexcl;Reprobado (A)!</span>');		
				
			}else{

			$('#a' + m + ' small').html(' - <span class="text-info">&iexcl;Aprobado!</span>');

			}
		
		}

		$('#total-' + m).text(total);
	}

	$(window).on("load", function () {
		if(asignaturas != undefined){
		$('.CalificacionRA').trigger('change');
		$('.CalificacionFCT').trigger('change');
		asignaturas = asignaturas.split(',');
		var comps = new Object();
		$.each(asignaturas, function (i, a) {
			$('#tabla-' + a + ' .CalificacionIL').each(function () {
			comps[$(this).attr('class').split(' ')[1]] = $(this).attr('class').split(' ')[1];
			})
		})

		$.each(comps, function (c, comp) {
		var cp = comp.split('-');
		SumaPs (cp[1], cp[2], cp[3]);
		})

		$.each(asignaturas, function (i, a) {
			SumaPCs(a);
			SumaA(a);
			RevaluaAsignatura(a);
				
				if($('#agregar-cal-' + a).length > 0){
		
				$('#agregar-' + a).show(); 
		
				}else{
				
				$('#agregar-' + a).hide();
		
				}
		})
	}
	});

	$(document).on('keyup change', '.CalificacionFCT', function () {
		
		var val = $(this).val();

		if(val.length > 3  && val != 10){
	var val = 10;
		}
		
	var idc = $(this).attr('id');
	
		setTimeout(()=>{
	var val = $('#'+idc).val();
	var val = Number.parseFloat(val).toFixed(1);
		if(val.length > 3  && val != 10){
	var val = 10;
		}
		if(!isNaN(val)){
	$('#'+idc).val(val);
		}
		},3500);
	
	var val = $(this).val();
	
	var val = val.replace(/[^0-9.]/g,"");
	
		if(val > 10){
	var val = 10;
		}

	$(this).val(val);

	RevaluaFCT(idc);

	});
	
$(document).on("blur", ".CalificacionFCT", function () {
    var reserva = $("#datos_js").attr("reserva");
    var nota = $(this).val();
    var id_nota = $(this).attr("id_nota");
    var id = $(this).attr("id").split("-");
    var tipo_nota = "t-" + id[1] + "-" + id[2];
    var pra = '10';
    var input = $(this);
    if (nota != reserva) {
      $.ajax({
        method: "POST",
        url: "up.php?op=Calificaciones",
        dataType: "json",
        data: {
          nota: nota,
          id_nota: id_nota,
          id_estudiante: id_estudiante,
          tipo_nota: tipo_nota,
          pra: pra,
          id_asignaturamf: id[0],
          id_grupo: id_grupo,
          year_1: year_1,
          year_2: year_2,
        },
      }).done(function (e) {
        if (e["exito"] == 1) {
          var color = "#2ECC71";
        } else {
          var color = "red";
        }
        if (id_nota > 0) {
        } else if (e["id_nota"] > 0) {
          input.attr("id_nota", e["id_nota"]);
        }
        var fondo = $(input).css({ backgroundColor: color }).show();
        setTimeout(function () {
          fondo.css({ backgroundColor: "", color: "black" });
        }, 1500);
        for (h = 0; h < 2; h++) {
          $(input).fadeTo("slow", 0.5).fadeTo("slow", 1.0);
        }
      });
    }
  });

function RevaluaFCT(idc){

    var id = idc.split('-');	
        
        var ra1 = id[0] + '-' + id[1] + '-1';
        var ra2 = id[0] + '-' + id[1] + '-2';
        var ra3 = id[0] + '-' + id[1] + '-3';
    
    var ra_1 = Number($('#'+ra1).val());
    var ra_2 = Number($('#'+ra2).val());
    var ra_3 = Number($('#'+ra3).val());
    
    if((ra_1 < ponderacion_fct * 10 && ra_1 != 0) || ra_1 > 10){
$('#'+ra1).removeAttr('style');
$('#'+ra1).css({'background-color':'#FF7B5A','color':'white','font-weight': 'bold'});
        }else{
$('#'+ra1).removeAttr('style');
        }
        
        if((ra_2 < ponderacion_fct * 10 && ra_2 != 0) || ra_2 > 10){
$('#'+ra2).removeAttr('style');
$('#'+ra2).css({'background-color':'#FF7B5A','color':'white','font-weight': 'bold'});
        }else{
$('#'+ra2).removeAttr('style');
        }
        
        if((ra_3 < ponderacion_fct * 10 && ra_3 != 0) || ra_3 > 10){
$('#'+ra3).removeAttr('style');
$('#'+ra3).css({'background-color':'#FF7B5A','color':'white','font-weight': 'bold'});
        }else{
$('#'+ra3).removeAttr('style');
        }
        
        var op1 = $('#'+ra1).attr('op');
        
        if(op1 == 1){
    $('#'+ra1).removeAttr('style');
    $('#'+ra1).css({'background-color':'inherit','color':'black','font-weight':'bold','border':'0px'});
    $('#'+ra1).prop("readonly", true);
        }
        
    var op2 = $('#'+ra2).attr('op');
        
        if(op2 == 1){
    $('#'+ra2).removeAttr('style');
    $('#'+ra2).css({'background-color':'inherit','color':'black','font-weight':'bold','border':'0px'});
    $('#'+ra2).prop("readonly", true);
        }
        
var op3 = $('#'+ra3).attr('op');
        
        if(op3 == 1){
    $('#'+ra3).removeAttr('style');
    $('#'+ra3).css({'background-color':'inherit','color':'black','font-weight':'bold','border':'0px'});
    $('#'+ra3).prop("readonly", true);
        }

		var subtotal = 0;
		var tras = 0;
		$(".fct" +id[0]).each(function (a, c) {
			var idt = c.id.split('-');
			var rat_1 = Number($('#' + idt[0] + '-' + idt[1] + '-1').val());
			var rat_2 = Number($('#' + idt[0] + '-' + idt[1] + '-2').val());
			var rat_3 = Number($('#' + idt[0] + '-' + idt[1] + '-3').val());
			var rat = Number(parseFloat((rat_1 + rat_2 + rat_3) / 3).toFixed(1));
			if(rat > 0){
				subtotal += rat;
				tras++;
			}

		});

		//console.log(subtotal);
		$('#subtotal-' + id[0]).text(subtotal);

		var tra = Number(parseFloat(subtotal / tras).toFixed(1));

		if (tra < ponderacion_fct * 10) {
			$('#a' + id[0] + ' small').html(' - <span class="text-danger">&iexcl;No apto!</span>');
		} else {
			$('#a' + id[0] + ' small').html(' - <span class="text-info">&iexcl;Apto!</span>');
		}

		$('#total-' + id[0]).text(tra);
        
}


});