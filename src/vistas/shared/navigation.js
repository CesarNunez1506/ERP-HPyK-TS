// Navigation Menu Loader and Manager
class NavigationManager {
    constructor() {
        this.currentSection = this.detectCurrentSection();
        this.init();
    }

    // Detecta la sección actual basada en la URL
    detectCurrentSection() {
        const currentPath = window.location.pathname;
        
        if (currentPath.includes('/logistica/') || currentPath.includes('/catalogos/materiales')) {
            return 'logistica';
        } else if (currentPath.includes('/mantenimiento/')) {
            return 'mantenimiento';
        } else if (currentPath.includes('/produccion/')) {
            return 'produccion';
        } else if (currentPath.includes('/operativos/')) {
            return 'operativos';
        } else if (currentPath.includes('/catalogo/') || currentPath.includes('/catalogos/')) {
            return 'catalogos';
        }
        
        return null;
    }

    // Inicializa el menú de navegación
    async init() {
        await this.loadNavigationMenu();
        this.highlightCurrentSection();
        this.setupDropdownEvents();
    }

    // Carga el menú de navegación desde el archivo compartido
    async loadNavigationMenu() {
        try {
            const response = await fetch('/vistas/shared/nav-menu.html');
            const navHTML = await response.text();
            
            // Busca el contenedor del menú o lo crea
            let navContainer = document.getElementById('navigation-container');
            if (!navContainer) {
                // Si no existe, busca un nav existente o crea uno nuevo
                const existingNav = document.querySelector('nav');
                if (existingNav) {
                    existingNav.outerHTML = navHTML;
                } else {
                    // Crea el contenedor después del body
                    document.body.insertAdjacentHTML('afterbegin', navHTML);
                }
            } else {
                navContainer.innerHTML = navHTML;
            }
        } catch (error) {
            console.error('Error loading navigation menu:', error);
            // Fallback: mantener el menú existente si hay error
        }
    }

    // Resalta la sección actual
    highlightCurrentSection() {
        if (!this.currentSection) return;

        const sectionButton = document.querySelector(`[data-section="${this.currentSection}"]`);
        if (sectionButton) {
            // Remueve cualquier clase de highlight existente
            document.querySelectorAll('[data-section]').forEach(btn => {
                btn.classList.remove('bg-cyan-700', 'px-3', 'py-1', 'rounded');
            });
            
            // Agrega las clases de highlight a la sección actual
            sectionButton.classList.add('bg-cyan-700', 'px-3', 'py-1', 'rounded');
        }
    }

    // Configura los eventos de dropdown
    setupDropdownEvents() {
        // Función global para toggle dropdown
        window.toggleDropdown = (event, button) => {
            event.stopPropagation();
            
            // Cierra todos los otros dropdowns
            document.querySelectorAll('.dropdown div').forEach(div => {
                if (!div.classList.contains('hidden') && div !== button.nextElementSibling) {
                    div.classList.add('hidden');
                }
            });
            
            // Toggle del dropdown actual
            const dropdown = button.nextElementSibling;
            if (dropdown) {
                dropdown.classList.toggle('hidden');
            }
        };

        // Cierra dropdown al hacer clic fuera
        document.addEventListener('click', (event) => {
            if (!event.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown div').forEach(div => {
                    div.classList.add('hidden');
                });
            }
        });

        // Prevenir que el dropdown se cierre al hacer clic dentro de él
        document.querySelectorAll('.dropdown div').forEach(dropdown => {
            dropdown.addEventListener('click', (event) => {
                event.stopPropagation();
            });
        });
    }
}

// Inicializa el navegador cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new NavigationManager();
});

// También expone la función para compatibilidad con código existente
window.NavigationManager = NavigationManager;