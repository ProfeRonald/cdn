        const magnifier = document.getElementById('magnifier');
        const magnifierContent = document.getElementById('magnifierContent');
        const magnifiableAreas = document.querySelectorAll('.magnifiable-area');
        
        const magnification = 2;
        const magnifierSize = 200;

        // Clonar todo el body en el contenido de la lupa
        function updateMagnifierContent() {
            magnifierContent.innerHTML = document.body.innerHTML;
            
            // Remover la lupa del contenido clonado para evitar recursión
            const clonedMagnifier = magnifierContent.querySelector('#magnifier');
            if (clonedMagnifier) {
                clonedMagnifier.remove();
            }
        }

        // Actualizar contenido al cargar
        updateMagnifierContent();

        // Agregar eventos a todas las áreas magnificables
        magnifiableAreas.forEach(area => {
            area.addEventListener('mouseenter', () => {
                magnifier.style.display = 'block';
                updateMagnifierContent();
            });

            area.addEventListener('mouseleave', () => {
                magnifier.style.display = 'none';
            });
        });

        document.addEventListener('mousemove', (e) => {
            // Verificar si está sobre alguna área magnificable
            let isOverAnyArea = false;
            
            magnifiableAreas.forEach(area => {
                const rect = area.getBoundingClientRect();
                if (e.clientX >= rect.left && 
                    e.clientX <= rect.right && 
                    e.clientY >= rect.top && 
                    e.clientY <= rect.bottom) {
                    isOverAnyArea = true;
                }
            });

            if (isOverAnyArea) {
                magnifier.style.display = 'block';
                
                // Posicionar la lupa
                magnifier.style.left = (e.clientX - magnifierSize / 2) + 'px';
                magnifier.style.top = (e.clientY - magnifierSize / 2) + 'px';
                
                // Calcular la transformación para el contenido ampliado
                const scale = magnification;
                const translateX = -e.clientX * (scale - 1);
                const translateY = -e.clientY * (scale - 1);
                
                magnifierContent.style.transform = `scale(${scale}) translate(${translateX / scale}px, ${translateY / scale}px)`;
            } else {
                magnifier.style.display = 'none';
            }
        });