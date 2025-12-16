        const scrollers = document.querySelectorAll(".testimonials");
        
        if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches && window.screen.width > 760){
            addAnimation()
        }

        function addAnimation(){
            scrollers.forEach(scroller =>{
            scroller.setAttribute('data-animated',true)

                const scrollerInner = document.getElementById("scroller");
                const scrollerContent = Array.from(scrollerInner.children)

                
                scrollerContent.forEach((item)=>{
                    const duplicatedItems = item.cloneNode(true)
                    duplicatedItems.setAttribute("aria-hidden", true)
                    scrollerInner.appendChild(duplicatedItems)
                })
                    
            })
        }
            


        // Función de inicialización y lógica de tema y animación de scroll.
        document.addEventListener('DOMContentLoaded', initializeApp);

        function initializeApp() {
            const body = document.body;
            const toggleButton = document.getElementById('theme-toggle');
            const icon = toggleButton.querySelector('i');
            const preferredDark = window.matchMedia('(prefers-color-scheme: dark)');
            
            // 1. Lógica de Temas
            
            function setTheme(isDark) {
                if (isDark) {
                    body.classList.add('dark-mode');
                    icon.className = 'ph-fill ph-sun'; // Sol para modo oscuro
                } else {
                    body.classList.remove('dark-mode');
                    icon.className = 'ph-fill ph-moon'; // Luna para modo claro
                }
            }

            // Cargar preferencia guardada o por defecto del sistema
            const userPreference = localStorage.getItem('theme');

            if (userPreference === 'dark') {
                setTheme(true);
            } else if (userPreference === 'light') {
                setTheme(false);
            } else {
                setTheme(preferredDark.matches);
            }
        
            // Escuchar cambios en la preferencia del sistema
            preferredDark.addEventListener('change', (e) => {
                // Solo cambia si el usuario no ha guardado una preferencia
                if (!localStorage.getItem('theme')) {
                    setTheme(e.matches);
                }
            });

            // Toggle al clickear
            toggleButton.addEventListener('click', () => {
                const isCurrentlyDark = body.classList.contains('dark-mode');
                const newIsDark = !isCurrentlyDark;
                setTheme(newIsDark);
                localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
            });
            
            // 2. Animación de Scroll
            const faders = document.querySelectorAll(".fade-in-section");

            const appearOptions = {
                threshold: 0,
                rootMargin: "0px 0px -100px 0px"
            };

            const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add("is-visible");
                    appearOnScroll.unobserve(entry.target);
                });
            }, appearOptions);

            faders.forEach(fader => {
                appearOnScroll.observe(fader);
            });
        }