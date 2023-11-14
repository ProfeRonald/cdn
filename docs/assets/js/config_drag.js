/* eslint-env browser */
/* eslint
   semi: ["error", "always"],
   indent: [2, "tab"],
   no-tabs: 0,
   no-multiple-empty-lines: ["error", {"max": 2, "maxEOF": 1}],
   one-var: ["error", "always"] */
/* global REDIPS */

/* enable strict mode */
'use strict';

// create redips container
let redips = {};

// redips initialization
redips.init = function () {
	// reference to the REDIPS.drag lib
	let rd = REDIPS.drag;
	// initialization
	rd.init();
	// dragged elements can be placed only to the empty cells
	
	// enable cloning DIV elements with pressed SHIFT key
	rd.clone.keyDiv = false;
	rd.dropMode = 'switch';
	rd.event.clicked=function(){
		var casillaTD = $(rd.td.source);
		var recesoyalmuerzo = casillaTD.find('.fz').text();
		casillaTD = casillaTD.html();
		rd.event.deleted = function(){
			if(recesoyalmuerzo != 'ALMUERZO' && recesoyalmuerzo != 'RECESO'){
		$('[rel="tooltip"]').tooltip("hide");
		$('#trash-asig').append('<tr><td class="casilla_hora asignatura">' + casillaTD + '</td></tr>');
		$('[rel="tooltip"]').tooltip();
		rd.init();
			}
		};

		rd.event.dropped = function () {
		$('#trash-asig .fzremove').remove();
		if(recesoyalmuerzo == 'ALMUERZO' || recesoyalmuerzo == 'RECESO'){
			var casillaTDHora = $(rd.td.source);
			var casillaTDHoraA = casillaTDHora.html();
			casillaTDHora.find('div:first').remove();
			casillaTDHora = casillaTDHora.html();
			if(casillaTDHora == ''){
				$(rd.td.source).html(casillaTDHoraA);
			}
				if(casillaTDHora != ''){
			var ra = $(rd.td.target);
			ra.html(casillaTDHora);
				}
			RecesosAlmuerzos();
			rd.init();
		}
		};

	};
	
};


// add onload event listener
if (window.addEventListener) {
	window.addEventListener('load', redips.init, false);
}
else if (window.attachEvent) {
	window.attachEvent('onload', redips.init);
}
