document.addEventListener('DOMContentLoaded', () => {
    const form           = document.getElementById('miFormulario');
    const emailInput     = document.getElementById('correo');
    const nombreInput    = document.getElementById('nombre');
    const edadInput      = document.getElementById('edad');
    const rutInput       = document.getElementById('rut');
    const anioIngreso    = document.getElementById('anioIngreso');
    const anioMalla      = document.getElementById('anioMalla');
    const nombresMas     = document.getElementById('nombresMas');
    const interesesDiv   = document.getElementById('intereses');
    const checkboxes     = interesesDiv.querySelectorAll('input[type="checkbox"]');
    const otroCheck      = document.getElementById('otroCheck');
    const otroTexto      = document.getElementById('otroTexto');
    const toggleSwitch   = document.getElementById('toggle-mode');
    const modal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModal');
    const successMessage = document.getElementById('successMessage');


    closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    });

    // Animación de typing
    function typeWriter(text, element, speed = 50) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
             }
            }
            type();
            }

    const carrerasPorCampus = {
    "Campus Central": [
        { id: 21047, nombre: "21047 Arquitectura"},
        { id: 21012, nombre: "21012 Contador Público y Auditor"},
        { id: 21033, nombre: "21033 Derecho"},
        { id: 21024, nombre: "21024 Diseño en Comunicación Visual"},
        { id: 21023, nombre: "21023 Diseño Industrial"},
        { id: 21074, nombre: "21074 Ingeniería Civil en Obras Civiles"},
        { id: 21087, nombre: "21087 Ingeniería Civil en Prevención de Riesgos y Medio Ambiente"},
        { id: 21032, nombre: "21032 Ingeniería en Construcción"},
        { id: 21053, nombre: "21053 Psicología"},
        { id: 21056, nombre: "21056 Química y Farmacia"},
        { id: 21034, nombre: "21034 Trabajo Social"}
    ],
    "Campus Ñuñoa": [
        { id: 21046, nombre: "21046 Bachillerato en Ciencias de la Ingeniería"},
        { id: 21071, nombre: "21071 Dibujante Proyectista"},
        { id: 21057, nombre: "21057 Ingeniería Civil Biomédica"},
        { id: 21075, nombre: "21075 Ingeniería Civil Electrónica"},
        { id: 21049, nombre: "21049 Ingeniería Civil en Ciencia de Datos"},
        { id: 21041, nombre: "21041 Ingeniería Civil en Computación Mención Informática"},
        { id: 21096, nombre: "21096 Ingeniería Civil en Mecánica"},
        { id: 21076, nombre: "21076 Ingeniería Civil Industrial"},
        { id: 21055, nombre: "21055 Ingeniería Civil Matemática"},
        { id: 21069, nombre: "21069 Ingeniería Civil Química"},
        { id: 21031, nombre: "21031 Ingeniería en Geomensura"},
        { id: 21030, nombre: "21030 Ingeniería en Informática"},
        { id: 21045, nombre: "21045 Ingeniería Industrial"},
        { id: 21073, nombre: "21073 Ingeniería en Biotecnología"},
        { id: 21054, nombre: "21054 Ingeniería en Alimentos"},
        { id: 21083, nombre: "21083 Química Industrial"}

    
    ],
    "Campus Providencia": [
        { id: 21089, nombre: "21089 Administración Pública"},
        { id: 21002, nombre: "21002 Bibliotecología y Documentación"},
        { id: 21048, nombre: "21048 Ingeniería Comercial"},
        { id: 21081, nombre: "21081 Ingeniería en Comercio Internacional"},
        { id: 21082, nombre: "21082 Ingeniería en Gestión Turística"}
    ]};
    


    // 1. Nombre: solo letras y espacios
    nombreInput.addEventListener('input', () => {
        nombreInput.value = nombreInput.value
          .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '')
          .replace(/\s{2,}/g, ' ');
    });

    // 2. Edad: solo dígitos, máximo 2
    edadInput.addEventListener('input', () => {
        edadInput.value = edadInput.value.replace(/\D/g, '').slice(0, 2);
    });

    // 3. Formateo en vivo del RUT mientras se escribe
    rutInput.addEventListener('input', () => {
        let raw = rutInput.value.replace(/\D/g, '');
        if (raw.length > 9) raw = raw.slice(0, 9);
        let formatted = '';
        if (raw.length > 1) {
            formatted = raw.slice(0, raw.length - 1) + '-' + raw.slice(-1);
        } else {
            formatted = raw;
        }
        formatted = formatted.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        rutInput.value = formatted;
    });

    // 4. Años ingreso y malla: solo dígitos, 4 máximo
    [anioIngreso, anioMalla].forEach(el => {
        el.addEventListener('input', () => {
            el.value = el.value.replace(/\D/g, '').slice(0, 4);
        });
    });

    // 5. Nombres de otras personas: letras, espacios, guion y acentos
    nombresMas.addEventListener('input', () => {
        nombresMas.value = nombresMas.value
          .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\-\s]/g, '')
          .replace(/\-+/g, '-')
          .replace(/\s{2,}/g, ' ');
    });

    // 6. Habilitar “otro” campo de áreas
    otroCheck.addEventListener('change', () => {
        if (otroCheck.checked) {
            otroTexto.style.display = 'block';
            otroTexto.disabled = false;
        } else {
            otroTexto.style.display = 'none';
            otroTexto.disabled = true;
            otroTexto.value = '';
        }
    });

    // 7. Limitar EXACTAMENTE a 3 checkboxes seleccionadas
    let selectedOrder = [];
    checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            if (cb.checked) {
                selectedOrder.push(cb);
                if (selectedOrder.length > 3) {
                    const first = selectedOrder.shift();
                    first.checked = false;
                    if (first.id === 'otroCheck') {
                        first.dispatchEvent(new Event('change'));
                    }
                }
            } else {
                selectedOrder = selectedOrder.filter(x => x !== cb);
                if (cb.id === 'otroCheck') {
                    cb.dispatchEvent(new Event('change'));
                }
            }
        });
    });

    // 8. Correo: filtrar en keydown y limpiar en input
    emailInput.addEventListener('keydown', e => {
        const allowed = ['Backspace','Delete','ArrowLeft','ArrowRight','Tab','Home','End'];
        if (allowed.includes(e.key)) return;
        if (!/^[a-zA-Z.@]$/.test(e.key)) e.preventDefault();
        if (e.key === '@' && emailInput.value.includes('@')) e.preventDefault();
    });
    emailInput.addEventListener('input', () => {
        let v = emailInput.value.replace(/[^a-zA-Z.@]/g, '');
        const parts = v.split('@');
        if (parts.length > 2) v = parts[0] + '@' + parts.slice(1).join('');
        emailInput.value = v;
    });

    // 9. Alternar modo noche persistente
    if (localStorage.getItem('modoNoche') === 'true') {
        document.body.classList.add('night-mode');
        toggleSwitch.checked = true;
    }
    toggleSwitch.addEventListener('change', () => {
        const isNight = toggleSwitch.checked;
        document.body.classList.toggle('night-mode', isNight);
        localStorage.setItem('modoNoche', isNight);
    });

    // 10. Validación y envío
    form.addEventListener('validated-submit', function(e) {
        e.preventDefault();
        let valid = true;
        let firstInvalid = null;

        // Edad 1-2 dígitos
        if (!/^\d{1,2}$/.test(edadInput.value)) {
            showError(edadInput, 'Ingresa 1 o 2 dígitos para la edad.');
            valid = false;
            firstInvalid = firstInvalid || edadInput;
        } else clearError(edadInput);

        // Validar RUT
        const rutValor = rutInput.value.trim();
        if (!/^\d{1,2}\.\d{3}\.\d{3}-\d{1}$/.test(rutValor)) {
            showError(rutInput, 'Formato RUT inválido. Ej: 12.345.678-9');
            valid = false;
            firstInvalid = firstInvalid || rutInput;
        } else clearError(rutInput);

        // Años
        if (!/^\d{4}$/.test(anioIngreso.value)) {
            showError(anioIngreso, 'Ingresa año de 4 dígitos.');
            valid = false;
            firstInvalid = firstInvalid || anioIngreso;
        } else clearError(anioIngreso);
        if (!/^\d{4}$/.test(anioMalla.value)) {
            showError(anioMalla, 'Ingresa año de 4 dígitos.');
            valid = false;
            firstInvalid = firstInvalid || anioMalla;
        } else clearError(anioMalla);

        // Correo debe terminar en @utem.cl
        if (!emailInput.value.trim().endsWith('@utem.cl')) {
            showError(emailInput, 'Tu correo debe terminar en @utem.cl.');
            valid = false;
            firstInvalid = firstInvalid || emailInput;
        } else clearError(emailInput);

        // Nombre máximo 4 palabras
        if (nombreInput.value.trim().split(/\s+/).length > 4) {
            showError(nombreInput, 'Máximo 4 palabras en el nombre.');
            valid = false;
            firstInvalid = firstInvalid || nombreInput;
        } else clearError(nombreInput);

        // Áreas: EXACTAMENTE 3 seleccionadas
        const checked = interesesDiv.querySelectorAll('input[type="checkbox"]:checked');
        if (checked.length !== 3) {
            showError(interesesDiv, 'Debes seleccionar exactamente 3 áreas.');
            valid = false;
            firstInvalid = firstInvalid || interesesDiv;
        } else clearError(interesesDiv);

        // Nombres adicionales
        if (nombresMas.value && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\-\s]+$/.test(nombresMas.value)) {
            showError(nombresMas, 'Solo letras, espacios y guion.');
            valid = false;
            firstInvalid = firstInvalid || nombresMas;
        } else clearError(nombresMas);

if (valid) {
    modal.style.display = 'flex';
    typeWriter(
        ">> Formulario enviado exitosamente...\n>> Gracias por postularte.\n>> Revisaremos tu información y te contactaremos pronto.",
        successMessage,
        28
    );
    setTimeout(() => {
        modal.style.display = 'none';
        form.submit(); // envía realmente
    }, 6000);
} else {
    const firstInvalid = document.querySelector('.error-input, .error-message');
    if (firstInvalid) {
        if (firstInvalid.tagName === 'INPUT' || firstInvalid.tagName === 'TEXTAREA' || firstInvalid.tagName === 'SELECT') {
            firstInvalid.focus();
        } else {
            firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

    });

    // Funciones de error
    function showError(el, msg) {
        el.classList.add('error-input');
        let err = el.nextElementSibling;
        if (!err || !err.classList.contains('error-message')) {
            err = document.createElement('div');
            err.className = 'error-message';
            el.insertAdjacentElement('afterend', err);
        }
        err.textContent = msg;
    }

    function clearError(el) {
        el.classList.remove('error-input');
        const err = el.nextElementSibling;
        if (err && err.classList.contains('error-message')) err.remove();
    }
});