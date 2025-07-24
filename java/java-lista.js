

document.addEventListener('DOMContentLoaded', () => {
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


    const listaCarreras = document.getElementById('lista-carreras');
    const selectorBtn = document.getElementById('selector-carrera');
    const listaContainer = document.getElementById('lista-carreras-container');
    const inputCarrera = document.getElementById('carrera-seleccionada');

    // Generar radios por campus
    Object.keys(carrerasPorCampus).forEach(campus => {
        const campusHeader = document.createElement('li');
        campusHeader.textContent = campus;
        campusHeader.classList.add('campus-title');
        listaCarreras.appendChild(campusHeader);

        carrerasPorCampus[campus].forEach(carrera => {
            const li = document.createElement('li');
            li.innerHTML = `
                <label title="${carrera.nombre}">
                    <input type="radio" name="carrera-radio" value="${carrera.id}">
                    <span>${carrera.nombre}</span>
                </label>
            `;
            listaCarreras.appendChild(li);
        });
    });

    selectorBtn.addEventListener('click', () => {
        listaContainer.style.display = listaContainer.style.display === 'block' ? 'none' : 'block';
    });

    listaCarreras.addEventListener('click', (e) => {
        if (e.target.name === 'carrera-radio') {
            const label = e.target.closest('label').querySelector('span').textContent;
            selectorBtn.textContent = label;
            inputCarrera.value = e.target.value;
            listaContainer.style.display = 'none';
            clearError(selectorBtn);
        }
    });

    document.addEventListener('click', (e) => {
        if (!listaContainer.contains(e.target) && e.target !== selectorBtn) {
            listaContainer.style.display = 'none';
        }
    });

    // DISPONIBILIDAD
    const opcionesDisponibilidad = [
        { id: 1, nombre: "1 hora" },
        { id: 2, nombre: "2 horas" },
        { id: 3, nombre: "3 horas" },
        { id: 4, nombre: "4 horas" },
        { id: 5, nombre: "5 horas" },
        { id: 6, nombre: "6 horas" }
    ];

    const listaDisp = document.getElementById('lista-disp');
    const selectorDispBtn = document.getElementById('selector-disp');
    const listaDispContainer = document.getElementById('lista-disp-container');
    const inputDisp = document.getElementById('disp-seleccionada');

    opcionesDisponibilidad.forEach(opcion => {
        const li = document.createElement('li');
        li.innerHTML = `
            <label title="${opcion.nombre}">
                <input type="radio" name="disp-radio" value="${opcion.id}">
                <span>${opcion.nombre}</span>
            </label>
        `;
        listaDisp.appendChild(li);
    });

    selectorDispBtn.addEventListener('click', () => {
        listaDispContainer.style.display = listaDispContainer.style.display === 'block' ? 'none' : 'block';
    });

    listaDisp.addEventListener('click', (e) => {
        if (e.target.name === 'disp-radio') {
            const label = e.target.closest('label').querySelector('span').textContent;
            selectorDispBtn.textContent = label;
            inputDisp.value = e.target.value;
            listaDispContainer.style.display = 'none';
            clearError(selectorDispBtn);
        }
    });

    document.addEventListener('click', (e) => {
        if (!listaDispContainer.contains(e.target) && e.target !== selectorDispBtn) {
            listaDispContainer.style.display = 'none';
        }
    });

    // 🌙 MODO NOCHE
    const toggleMode = document.getElementById('toggle-mode');
    if (toggleMode) {
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            toggleMode.checked = true;
        }
        toggleMode.addEventListener('change', () => {
            if (toggleMode.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // VALIDACIÓN Y ENVÍO
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // siempre prevenir inicialmente

        let valid = true;

if (!inputCarrera.value) {
        showError(selectorBtn, "Por favor, selecciona una carrera antes de enviar.");
        valid = false;
    } else {
        clearError(selectorBtn);
    }

    if (!inputDisp.value) {
        showError(selectorDispBtn, "Por favor, selecciona cuántas horas puedes dedicar antes de enviar.");
        valid = false;
    } else {
        clearError(selectorDispBtn);
    }

    if (!valid) {
        const firstInvalid = document.querySelector('.error-input, .error-message');
        if (firstInvalid) {
            if (
                firstInvalid.tagName === 'INPUT' ||
                firstInvalid.tagName === 'TEXTAREA' ||
                firstInvalid.tagName === 'SELECT'
            ) {
                firstInvalid.focus();
            } else {
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
        return; // Detiene aquí si hay errores
    }

    // ✅ Si es válido, despacha evento personalizado:
    const submitEvent = new Event('validated-submit');
    form.dispatchEvent(submitEvent);
});

    // FUNCIONES DE ERROR
    function showError(element, message) {
        element.classList.add('error-input');
        let errorEl = element.nextElementSibling;
        if (!errorEl || !errorEl.classList.contains('error-message')) {
            errorEl = document.createElement('div');
            errorEl.className = 'error-message';
            element.insertAdjacentElement('afterend', errorEl);
        }
        errorEl.textContent = message;
    }

    function clearError(element) {
        element.classList.remove('error-input');
        const errorEl = element.nextElementSibling;
        if (errorEl && errorEl.classList.contains('error-message')) {
            errorEl.remove();
        }
    }
});