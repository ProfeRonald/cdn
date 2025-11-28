        const magnifiableArea = document.getElementById('datosestudiantes');
        const magnifier = document.getElementById('magnifier');
        const magnifierContent = document.getElementById('magnifierContent');
        
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

        magnifiableArea.addEventListener('mouseenter', () => {
            magnifier.style.display = 'block';
            updateMagnifierContent();
        });

        magnifiableArea.addEventListener('mouseleave', () => {
            magnifier.style.display = 'none';
        });

        document.addEventListener('mousemove', (e) => {
            // Solo mostrar la lupa si está sobre el área específica
            const rect = magnifiableArea.getBoundingClientRect();
            const isOverArea = e.clientX >= rect.left && 
                             e.clientX <= rect.right && 
                             e.clientY >= rect.top && 
                             e.clientY <= rect.bottom;

            if (isOverArea) {
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