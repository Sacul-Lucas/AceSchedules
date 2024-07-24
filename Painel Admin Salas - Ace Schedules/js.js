//======================== Inputs de imagem ========================
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

const dragContainer = document.querySelector('.Edit-drag-area');
const headerText = dragContainer.querySelector('.header');
const searchButton = dragContainer.querySelector('.button');
const fileInput = document.querySelector('.edit-input-img');

let selectedFile;

searchButton.onclick = () => {
    fileInput.click();
};

// Quando o arquivo for selecionado
fileInput.addEventListener('change', function() {
    selectedFile = this.files[0];
    dragContainer.classList.add('active');
    displaySelectedFile();
});

// Quando o arquivo estiver sobre a área de arrastar
dragContainer.addEventListener('dragover', (event) => {
    event.preventDefault();
    headerText.textContent = 'Solte a imagem para carregar';
    dragContainer.classList.add('active');
});

// Quando o arquivo sair da área de arrastar
dragContainer.addEventListener('dragleave', () => {
    headerText.textContent = 'Arrastar & soltar';
    dragContainer.classList.remove('active');
});

// Quando o arquivo for solto
dragContainer.addEventListener('drop', (event) => {
    event.preventDefault();
    selectedFile = event.dataTransfer.files[0];
    displaySelectedFile();
});

function displaySelectedFile() {
    let fileType = selectedFile.type;

    let allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedTypes.includes(fileType)) {
        let fileReader = new FileReader();

        fileReader.onload = () => {
            let fileURL = fileReader.result;
            // Substitui espaços no nome do arquivo por sublinhados
            let safeFileName = selectedFile.name.replace(/\s+/g, '_');
            let imageTag = `<img src="${fileURL}" alt="">`;
            dragContainer.innerHTML = imageTag;
            fileInput.files = createFileList(new File([selectedFile], safeFileName, { type: selectedFile.type }));
        };
        fileReader.readAsDataURL(selectedFile);
    } else {
        alert('Tipo de arquivo não é uma imagem');
        dragContainer.classList.remove('active');
    }
}

function createFileList(file) {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    return dataTransfer.files;
}

function resetDragContainer() {
    dragContainer.innerHTML = `
        <div class="icon">
            <i class="fas fa-images"></i>
        </div>
        <span class="header">Arrastar & soltar</span>
        <span class="header"> ou <span class="button"> procurar </span></span>
        <span class="support">Tipos aceitos: JPEG, JPG, PNG </span>
    `;
    dragContainer.classList.remove('active');
    fileInput.value = ''; // Limpar o input de arquivo
}

//======================== Carregar informações dos popups ========================
$(document).on('click', '.editBtn', function () {
    var id = $(this).data('id');
    $.ajax({
        url: 'code.php',
        type: 'GET',
        data: { id: id },
        success: function (response) {
            try {
                var res = jQuery.parseJSON(response);
                if (res.status == 200) {
                    $('#id').val(res.data.id);
                    $('#nome').val(res.data.nome);
                    $('#capacidade').val(res.data.capacidade);

                    if (res.data.img) {
                        const imgURL = '../Painel - Ace Schedules/img_salas/' + res.data.img;
                        const imgTag = `<img src="${imgURL}" alt="Imagem da sala">`;
                        $('.Edit-drag-area').html(imgTag);
                    } else {
                        resetDragArea();
                    }

                    // Atualizar o estado do checkbox
                    if (res.data.status == true) {
                        $('input[name="status"]').prop('checked', true);
                    } else {
                        $('input[name="status"]').prop('checked', false);
                    }

                    console.log("Status recebido:", res.data.status); // Log do status recebido

                    $('#EditModal').modal('show');
                } else {
                    alert(res.message);
                }
            } catch (e) {
                console.error("Invalid JSON response", e);
            }
        },
        error: function (xhr, status, error) {
            console.error("AJAX Error: ", error);
        }
    });
});

$(document).on('click', '.viewBtn', function () {
    var id = $(this).data('id');
    $.ajax({
        url: 'code.php',
        type: 'GET',
        data: { id: id },
        success: function (response) {
            try {
                var res = jQuery.parseJSON(response);
                if (res.status == 200) {
                    $('#view_nome').text(res.data.nome);
                    $('#view_capacidade').text(res.data.capacidade);
                    $('#view_imagem').html('<img src="../Painel - Ace Schedules/img_salas/' + res.data.img + '" class="img-fluid" />');
                    $('#ViewModal').modal('show');
                } else {
                    alert(res.message);
                }
            } catch (e) {
                console.error("Invalid JSON response", e);
            }
        },
        error: function (xhr, status, error) {
            console.error("AJAX Error: ", error);
        }
    });
});

//======================== Funções e carregamento da tabela ========================

$(document).ready(function () {
    function updateCounts() {
        var nome_sala = $('#filter_nome').val();
        var capacidade = $('#filter_capacidade').val();
        var apenasBloqueadas = $('#apenas_bloqueadas').is(':checked');

        $.ajax({
            url: 'get_salas.php',
            type: 'GET',
            data: {
                filter_nome: nome_sala,
                filter_capacidade: capacidade,
                apenas_bloqueadas: apenasBloqueadas
            },
            success: function (data) {
                try {
                    var response = JSON.parse(data);
                    $('#total_salas').text(response.total);
                    $('#bloqueadas_salas').text(response.bloqueadas);
                    $('#salas tbody').html(response.html);

                    if (apenasBloqueadas) {
                        $('#quantidade_salas_text').hide();
                    } else {
                        $('#quantidade_salas_text').show();
                    }
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                    console.error('Server response:', data);
                }
            },
            error: function (xhr, status, error) {
                console.error('AJAX error:', status, error);
                console.error('Response:', xhr.responseText);
            }
        });
    }

$('#filter_nome, #filter_capacidade, #apenas_bloqueadas').on('change keyup', function () {
    updateCounts();
});

// Inicializa a tabela ao carregar a página

updateCounts();

//======================== Submissão dos formulários ========================
    // Submissão do formulário de add
    $(document).on('submit', '#add', function (e) {
        e.preventDefault();

        var formData = new FormData(this);
        formData.append("save", true);

        $.ajax({
            type: "POST",
            url: "code.php",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                try {
                    var res = jQuery.parseJSON(response);
                    if (res.status == 422 || res.status == 409) {
                        $('#errorMessage').removeClass('d-none');
                        $('#errorMessage').text(res.message);
                    } else if (res.status == 200) {
                        $('#errorMessage').addClass('d-none');
                        $('#AddModal').modal('hide');
                        $('#add')[0].reset();
                        resetDragArea(); // Limpar a área de arrastar e soltar

                        // Carregar a tabela novamente
                        updateCounts();
                    } else if (res.status == 500) {
                        alert(res.message);
                    }
                } catch (e) {
                    console.error("Invalid JSON response", e);
                    $('#errorMessage').removeClass('d-none');
                    $('#errorMessage').text("Erro ao processar a resposta do servidor.");
                }
            }
        });
    });

    // Submissão do formulário de edit
    $(document).on('submit', '#update', function (e) {
        e.preventDefault();

        var formData = new FormData(this);
        formData.append("update", true);

        // Logar todos os pares chave-valor do formData
        for (var pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        $.ajax({
            type: "POST",
            url: "code.php",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                console.log("Response from server:", response);  // Log da resposta
                try {
                    var res = jQuery.parseJSON(response);
                    if (res.status == 422 || res.status == 409) {
                        $('#errorMessageUpdate').removeClass('d-none');
                        $('#errorMessageUpdate').text(res.message);
                    } else if (res.status == 200) {
                        $('#errorMessageUpdate').addClass('d-none');
                        $('#EditModal').modal('hide');
                        $('#update')[0].reset();

                        // Carregar a tabela novamente
                        updateCounts();
                    } else if (res.status == 500) {
                        alert(res.message);
                    }
                } catch (e) {
                    console.error("Invalid JSON response", e);
                    $('#errorMessageUpdate').removeClass('d-none');
                    $('#errorMessageUpdate').text('Resposta inválida do servidor.');
                }
            },
            error: function (xhr, status, error) {
                console.error("AJAX Error: ", error);
                $('#errorMessageUpdate').removeClass('d-none');
                $('#errorMessageUpdate').text('Erro ao fazer a requisição.');
            }
        });
    });
    
     // Botão de deletar
    $(document).on('click', '.deleteBtn', function (e) {
        e.preventDefault();
        
        let id = $(this).data('id');
        let confirmation = confirm("Tem certeza de que deseja excluir esta sala?");

        if (confirmation) {
            $.ajax({
                type: "POST",
                url: "code.php",
                data: { id: id, delete: true },
                success: function (response) {
                    try {

                        var res = (response);

                        if (res.status == 200) {
                            updateCounts(); 
                        } else if (res.status == 500) {
                            alert(res.message);
                        } else {
                            alert("Erro desconhecido.");
                        }
                    } catch (e) {
                        console.error("Invalid JSON response", e);
                        alert("Erro ao processar a resposta do servidor.");
                    }
                },
                error: function (xhr, status, error) {
                    console.error("AJAX Error: ", status, error);
                    alert("Erro ao enviar a solicitação de exclusão.");
                }
            });
        }
    })
})

