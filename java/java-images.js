const dropZone = document.getElementById('drop-zone');
const memeInput = document.getElementById('meme-imagen');
const uploadBtn = document.getElementById('upload-btn');

// Abre el selector al hacer click en el área o en el botón
dropZone.addEventListener('click', () => {
    memeInput.click();
});
uploadBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // evita duplicar el click
    memeInput.click();
});

// Drag-and-drop visual feedback
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});
dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});
dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    if (e.dataTransfer.files.length) {
        memeInput.files = e.dataTransfer.files;
    }
});
