const dragArea = document.querySelector('.drag-area');
const dragText = document.querySelector('.header');

let button = document.querySelector('.button');
let input = document.querySelector('.input-img');


let file;

button.onclick = () => {
    input.click();
};

// when procurar 
input.addEventListener('change', function(){
    file = this.files[0];
    dragArea.classList.add('active');
    displayFile();
})

// arquivo está dentro da area
dragArea.addEventListener('dragover',(event) => {
	event.preventDefault();
	dragText.textContent = 'Solte a imagem para carregar-la'
	dragArea.classList.add('active');

});

// Quando arquivo sair da area

dragArea.addEventListener('dragleave',()=> {
	dragText.textContent = 'Drag & Drop';
	dragArea.classList.remove('active');

});

// Quando arquivo for solto

dragArea.addEventListener('drop',(event) => {
	event.preventDefault();

	file = event.dataTransfer.files[0];
    displayFile();
    
})

function displayFile(){
    let fileType = file.type;

    let validExtensions =['image/jpeg', 'image/jpg', 'image/png'];
    if(validExtensions.includes(fileType)){
        let fileReader = new FileReader();

        fileReader.onload= () =>{
            let fileURL = fileReader.result;
            // Substitui espaços no nome do arquivo por sublinhados
            let safeFileName = file.name.replace(/\s+/g, '_');
            let imgTag = `<img src="${fileURL}" alt="">`;
            dragArea.innerHTML = imgTag;
            input.files = createFileList(new File([file], safeFileName, { type: file.type }));
        };
        fileReader.readAsDataURL(file);
    }else {
        alert('Tipo de arquivo não é uma imagem');
        dragArea.classList.remove('active');
    }
}

function createFileList(file) {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    return dataTransfer.files;
}

function resetDragArea() {
    const dragArea = document.querySelector('.drag-area');
    dragArea.innerHTML = `
        <div class="icon">
            <i class="fas fa-images"></i>
        </div>
        <span class="header">Arrastar & soltar</span>
        <span class="header"> ou <span class="button"> procurar </span></span>
        <span class="support">Tipos aceitos: JPEG, JPG, PNG </span>
    `;
    dragArea.classList.remove('active');
    const input = document.querySelector('.input-img');
    input.value = ''; // Limpar o input de arquivo
}
