$(document).ready(function () {

            const $searchInput = $('#searchInput');
            const $contentItems = $('.BuscarGrupo');
            const $noResults = $('#noResults');
            const $searchStats = $('#searchStats');
            const $clearButton = $('#clearSearch');
            
            // Función para normalizar texto (eliminar acentos y convertir a minúsculas)
            function normalizeText(text) {
                return text.toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '');
            }
            
            // Función para extraer todo el texto de un elemento y sus hijos
            function getAllText(element) {
                return $(element).text();
            }

            function removeClasses() {
                $('.BuscarGrupo').removeClass('col-md-6');
                $('.BuscarGrupo').removeClass('col-md-2');
                $('.BuscarGrupo').removeClass('col-md-3');
                $('.BuscarGrupo').removeClass('col-md-4');
                $('.BuscarGrupo').removeClass('col-md-12');
            }
            
            // Función principal de filtrado
            function filterContent() {
                const searchTerm = $searchInput.val().trim();

                removeClasses();
                
                // Si no hay término de búsqueda, mostrar todos
                if (!searchTerm) {
                    $contentItems.removeClass('hidden').show();
                    $noResults.hide();
                    $searchStats.text(`${$contentItems.length} grupos en total`);
                    removeClasses();
                    $('.BuscarGrupo').css('zoom', '1');
                    $('.BuscarGrupo').addClass('col-md-6');
                    return;
                }
                
                // Dividir el término de búsqueda en palabras individuales
                const searchWords = searchTerm.split(/\s+/).filter(word => word.length >= 1);
                
                // Si no hay palabras válidas (mínimo 3 caracteres), mostrar todos
                if (searchWords.length === 0) {
                    $contentItems.removeClass('hidden').show();
                    $noResults.hide();
                    $searchStats.text(`${$contentItems.length} grupos - Introduzca un criterio`);
                    return;
                }
                
                // Normalizar las palabras de búsqueda
                const normalizedSearchWords = searchWords.map(word => normalizeText(word));
                let visibleCount = 0;
                
                $contentItems.each(function() {
                    const $item = $(this);
                    
                    // Extraer todo el texto del div y sus elementos hijos
                    const allText = getAllText($item);
                    const normalizedText = normalizeText(allText);
                    
                    // Verificar que TODAS las palabras estén presentes
                    const allWordsFound = normalizedSearchWords.every(word => 
                        normalizedText.includes(word)
                    );
                    
                    if (allWordsFound) {
                        // Mostrar elemento (sin modificar su contenido)
                        $item.removeClass('hidden').show();
                        visibleCount++;
                    } else {
                        // Ocultar elemento
                        $item.addClass('hidden').hide();
                        console.log($item.attr('class'));
                    }
                });

            
                
                // Mostrar/ocultar mensaje de sin resultados
                if (visibleCount === 0) {
                    $noResults.show();
                    $searchStats.text('No se encontraron grupos');
                    removeClasses();
                    $('.BuscarGrupo').css('zoom', '1');
                    $('.BuscarGrupo').addClass('col-md-6');
                } else {
                    $noResults.hide();
                    //const wordCount = searchWords.length;
                    //const wordText = wordCount === 1 ? 'palabra' : 'palabras';
                    const groupText = visibleCount === 1 ? 'grupo' : 'grupos';
                    $searchStats.text(`Mostrando ${visibleCount} ${groupText} de un total de ${$contentItems.length} grupos`);
                        // (buscando ${wordCount} ${wordText})`);
                    removeClasses();
                    $('.BuscarGrupo').css('zoom', '0.5');
                    $('.BuscarGrupo').addClass('col-md-3');
                }

            if(visibleCount == 2){
            removeClasses();
            $('.BuscarGrupo').addClass('col-md-6');
            $('.BuscarGrupo').css('zoom', '0.7');
            }else if(visibleCount == 4){
            removeClasses();
            $('.BuscarGrupo').addClass('col-md-3');
            $('.BuscarGrupo').css('zoom', '0.7');
            }else if(visibleCount == 3){
            removeClasses();
            $('.BuscarGrupo').addClass('col-md-4');
            $('.BuscarGrupo').css('zoom', '0.7');
            }else if(visibleCount == 1){
            removeClasses();
            $('.BuscarGrupo').addClass('col-md-12');
            $('.BuscarGrupo').css('zoom', '1');
            }

            }
            
            // Event listeners
            $searchInput.on('input', function() {
                filterContent();
            });
            
            // Limpiar búsqueda
            $clearButton.on('click', function() {
                $searchInput.val('').focus();
                filterContent();
            });
            
            // Limpiar con Escape
            $searchInput.on('keydown', function(e) {
                if (e.key === 'Escape') {
                    $(this).val('');
                    filterContent();
                }
            });
            
            // Inicializar estadísticas
          //  $searchStats.text(`${$contentItems.length} grupos en total`);

            

           


        });