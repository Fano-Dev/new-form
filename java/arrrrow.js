const questions = document.querySelectorAll('.question');

questions.forEach(q => {
    const content = q.querySelector('.question__content');
    const arrow = q.querySelector('.arrow');

    q.addEventListener('click', () => {
        if (q.classList.contains('open')) {
            // Cerrar: animar max-height a 0
            content.style.maxHeight = '0px';
            q.classList.remove('open');
            arrow.classList.remove('rotate');
        } else {
            // Abrir: poner max-height al scrollHeight real del contenido
            content.style.maxHeight = content.scrollHeight + 'px';
            q.classList.add('open');
            arrow.classList.add('rotate');
        }
    });
});
