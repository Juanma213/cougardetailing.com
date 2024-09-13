
// Variables para el seguimiento de la sección actual
        let currentSection = 0;
        const sections = document.getElementsByClassName("form-section");

        function showSection(n) {
            sections[n].classList.add("active");
            if (n === 0) {
                document.getElementById("prevBtn").style.display = "none";
            } else {
                document.getElementById("prevBtn").style.display = "inline";
            }
            if (n === (sections.length - 1)) {
                document.getElementById("nextBtn").innerHTML = "Enviar";
            } else {
                document.getElementById("nextBtn").innerHTML = "Siguiente";
            }
        }

        function navigate(n) {
            if (n === 1 && !validateForm()) return false;
            sections[currentSection].classList.remove("active");
            currentSection += n;
            if (currentSection >= sections.length) {
                document.getElementById("multiStepForm").submit();
                return false;
            }
            showSection(currentSection);
        }

        function validateForm() {
            let valid = true;

            // Validación para la primera sección
            if (currentSection === 0) {
                let nombre = document.getElementById("nombre");
                let apellidos = document.getElementById("apellidos");
                let telefono = document.getElementById("telefono");
                let email = document.getElementById("email");

                // Validación del nombre
                if (!/^[A-Za-z\s]{1,15}$/.test(nombre.value)) {
                    document.getElementById("nombreError").innerText = "Nombre inválido (máx. 15 letras).";
                    valid = false;
                } else {
                    document.getElementById("nombreError").innerText = "";
                }

                // Validación de los apellidos
                if (!/^[A-Za-z\s]{1,40}$/.test(apellidos.value)) {
                    document.getElementById("apellidosError").innerText = "Apellidos inválidos (máx. 40 letras).";
                    valid = false;
                } else {
                    document.getElementById("apellidosError").innerText = "";
                }

                // Validación del teléfono
                if (!/^\d{9}$/.test(telefono.value)) {
                    document.getElementById("telefonoError").innerText = "Teléfono inválido (9 dígitos).";
                    valid = false;
                } else {
                    document.getElementById("telefonoError").innerText = "";
                }

                // Validación del email
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                    document.getElementById("emailError").innerText = "Correo electrónico inválido.";
                    valid = false;
                } else {
                    document.getElementById("emailError").innerText = "";
                }
            }

            // Validación para la segunda sección
            if (currentSection === 1) {
                let producto = document.getElementById("producto");
                let plazo = document.getElementById("plazo");
                let condiciones = document.getElementById("condiciones");

                if (producto.value === "") {
                    document.getElementById("productoError").innerText = "Debe seleccionar un producto.";
                    valid = false;
                } else {
                    document.getElementById("productoError").innerText = "";
                }

                if (plazo.value === "" || plazo.value <= 0) {
                    document.getElementById("plazoError").innerText = "Plazo inválido.";
                    valid = false;
                } else {
                    document.getElementById("plazoError").innerText = "";
                }

                if (!condiciones.checked) {
                    document.getElementById("condicionesError").innerText = "Debe aceptar las condiciones.";
                    valid = false;
                } else {
                    document.getElementById("condicionesError").innerText = "";
                }
            }

            return valid;
        }

        document.getElementById("multiStepForm").addEventListener("input", calculatePresupuesto);

        function calculatePresupuesto() {
            let producto = parseFloat(document.getElementById("producto").value) || 0;
            let plazo = parseInt(document.getElementById("plazo").value) || 0;
            let extras = Array.from(document.querySelectorAll('input[name="extras"]:checked'))
                              .reduce((sum, el) => sum + parseFloat(el.value), 0);
            let descuento = plazo > 30 ? 0.1 : 0; // 10% de descuento si el plazo es mayor a 30 días

            let total = producto + extras;
            total = total - (total * descuento);

            document.getElementById("presupuesto").innerText = total.toFixed(2);
        }

        showSection(currentSection);


    //Noticia Json
        async function cargarNoticias() {
            try {
                const response = await fetch('data.json');
                const noticias = await response.json();
                const newsContainer = document.getElementById('news');
                noticias.forEach(noticia => {
                    const newsItem = document.createElement('div');
                    newsItem.classList.add('news-item');
                    
                    const title = document.createElement('h2');
                    title.classList.add('news-title');
                    title.textContent = noticia.titulo;
                    
                    const meta = document.createElement('div');
                    meta.classList.add('news-meta');
                    meta.textContent = `${noticia.fecha} - Por ${noticia.autor}`;
                    
                    const content = document.createElement('div');
                    content.classList.add('news-content');
                    content.textContent = noticia.contenido;
                    
                    newsItem.appendChild(title);
                    newsItem.appendChild(meta);
                    newsItem.appendChild(content);
                    newsContainer.appendChild(newsItem);
                });
                 } catch (error) 
            {
                console.error('Error cargando las noticias:', error);
            }
        }

        document.addEventListener('DOMContentLoaded', cargarNoticias);


