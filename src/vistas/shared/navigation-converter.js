// Convertidor automático de menús de navegación
// Ejecutar este script en cada vista para convertirla al sistema modular

// Función para convertir un archivo HTML al nuevo sistema de navegación
function convertToModularNavigation() {
    // 1. Agregar el script de navigation.js en el head
    const head = document.head;
    const navScript = document.createElement('script');
    navScript.src = '/vistas/shared/navigation.js';
    head.appendChild(navScript);

    // 2. Crear el contenedor de navegación
    const body = document.body;
    
    // Remover nav existente si lo hay
    const existingNav = document.querySelector('nav');
    if (existingNav) {
        existingNav.remove();
    }

    // Crear contenedor de navegación
    const navContainer = document.createElement('div');
    navContainer.id = 'navigation-container';
    navContainer.innerHTML = '<!-- Navigation Menu will be loaded here -->';
    
    // Insertar al inicio del body
    body.insertBefore(navContainer, body.firstChild);

    // 3. Remover funciones de dropdown existentes
    const scripts = document.querySelectorAll('script');
    scripts.forEach(script => {
        if (script.textContent && 
            (script.textContent.includes('toggleDropdown') || 
             script.textContent.includes('closeAllDropdowns'))) {
            script.textContent = script.textContent
                .replace(/function toggleDropdown[\s\S]*?}/, '// Dropdown functions handled by NavigationManager')
                .replace(/function closeAllDropdowns[\s\S]*?}/, '')
                .replace(/document\.body\.addEventListener\('click', closeAllDropdowns\);/, '');
        }
    });

    // 4. Remover estilos dropdown específicos del head
    const styles = document.querySelectorAll('style');
    styles.forEach(style => {
        if (style.textContent && 
            style.textContent.includes('.dropdown-menu')) {
            style.textContent = style.textContent
                .replace(/\.dropdown-menu[\s\S]*?}/, '')
                .replace(/\.dropdown\.active[\s\S]*?}/, '');
        }
    });

    // 5. Remover atributo onclick del body
    body.removeAttribute('onclick');

    console.log('Archivo convertido al sistema de navegación modular');
}

// Manual de uso:
/*
1. Abrir el archivo HTML en el navegador
2. Abrir la consola del desarrollador
3. Pegar este código
4. Ejecutar: convertToModularNavigation()
5. Copiar el HTML resultante y guardarlo en el archivo
*/

// También se puede usar como bookmarklet:
// javascript:(function(){[CÓDIGO_MINIFICADO]})();

console.log('Convertidor de navegación cargado. Ejecutar convertToModularNavigation() para convertir.');