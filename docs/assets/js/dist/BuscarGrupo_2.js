$(document).ready(function () {
    const $searchInput = $('#searchInput');
    const $noResults = $('#noResults');
    const $searchStats = $('#searchStats');
    const $clearButton = $('#clearSearch');
    const $contentContainer = $('#gruposc');

    // Normaliza texto: minúsculas + sin acentos
    const normalizeText = text =>
        text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    function resetLayout() {
        $('.BuscarGrupo')
            .removeClass('col-md-6 col-md-2 col-md-3 col-md-4 col-md-12')
            .css('zoom', '1');
    }

    function adjustLayout(visibleCount) {
        const $items = $('.BuscarGrupo');
        resetLayout();
        const layoutMap = {
            1: { cls: 'col-md-12', zoom: 1 },
            2: { cls: 'col-md-6', zoom: 0.7 },
            3: { cls: 'col-md-4', zoom: 0.7 },
            4: { cls: 'col-md-3', zoom: 0.7 }
        };
        const layout = layoutMap[visibleCount] || { cls: 'col-md-6', zoom: 1 };
        $items.css('zoom', layout.zoom).addClass(layout.cls);
    }

    function filterContent() {
        const $contentItems = $('.BuscarGrupo');
        const searchTerm = $searchInput.val().trim();

        if (!searchTerm) {
            $contentItems.show();
            $noResults.hide();
            $searchStats.text(`${$contentItems.length} grupos en total`);
            adjustLayout($contentItems.length);
            return;
        }

        const searchWords = searchTerm
            .split(/\s+/)
            .map(normalizeText)
            .filter(w => w.length > 0);

        let visibleCount = 0;

        $contentItems.each(function () {
            const $item = $(this);
            const normalizedItemText = normalizeText($item.text());

            // ✅ Comprobar que todas las palabras estén presentes
            const allWordsFound = searchWords.every(word => normalizedItemText.includes(word));

            if (allWordsFound) {
                $item.show();
                visibleCount++;
            } else {
                $item.hide();
            }
        });

        if (visibleCount === 0) {
            $noResults.show();
            $searchStats.text('No se encontraron grupos');
        } else {
            $noResults.hide();
            const plural = visibleCount === 1 ? 'grupo' : 'grupos';
            $searchStats.text(`Mostrando ${visibleCount} ${plural} de un total de ${$contentItems.length} grupos`);
        }

        adjustLayout(visibleCount);
    }

    // Eventos
    $searchInput.on('input', filterContent);
    $clearButton.on('click', () => { $searchInput.val('').focus(); filterContent(); });
    $searchInput.on('keydown', e => { if (e.key === 'Escape') { $searchInput.val(''); filterContent(); } });

    filterContent();

    // Observador de cambios dinámicos
    if ($contentContainer.length) {
        const observer = new MutationObserver(() => {
            clearTimeout(window._filterTimeout);
            window._filterTimeout = setTimeout(filterContent, 200);
        });
        observer.observe($contentContainer[0], { childList: true });
    }
});
