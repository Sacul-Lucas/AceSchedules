<?php
session_start();
require 'dbcon.php';
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Painel Administrador de Salas</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="css.css">
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<script>
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

</script>
</head>
<body>
<!-- Add modal -->
<div class="modal fade" id="AddModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add sala</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="add">
                <div class="modal-body">

                    <div id="errorMessage" class="alert alert-warning d-none"></div>

                    <div class="mb-3">
                        <label>Nome da Sala</label>
                        <input class="form-control" type="text" name="nome" placeholder="Nome sala" autocomplete="off" >
                    </div>
                    <div class="mb-3">
                        <label>Capacidade</label>
                        <input class="form-control" type="number" name="capacidade" placeholder="Texto capacidade" autocomplete="off" >
                    </div>
                    <div class="container">
                        <h3>Enviar imagem</h3>
                    <div class="drag-area">
                            <div class="icon">
                                <i class="fas fa-images"></i>
                            </div>
                            <span class="header">Arrastar & soltar</span>
                            <span class="header"> ou <span class="button"> procurar </span></span>
                            <span class="support">Tipos acceitos: JPEG, JPG, PNG </span>
                    </div>
                        <div class="mb-3">
                            <input class="input-img" accept="image/*" type="file" name="img" placeholder="Img nome" hidden >
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary">Salvar sala</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Editar sala modal -->
<div class="modal fade" id="EditModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Editar sala</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="update" method="POST">
                <div class="modal-body">
                    <div id="errorMessageUpdate" class="alert alert-warning d-none"></div>

                    <input type="hidden" name="id" id="id">

                    <div class="mb-3">
                        <label>Nome da Sala</label>
                        <input class="form-control" type="text" id="nome" name="nome" placeholder="Nome sala" autocomplete="off" required>
                    </div>
                    <div class="mb-3">
                        <label>Capacidade</label>
                        <input class="form-control" type="number" id="capacidade" name="capacidade" placeholder="Texto capacidade" autocomplete="off" required>
                    </div>
                    <div class="container">
                        <h3>Enviar imagem</h3>
                        <div class="Edit-drag-area">
                            <div class="icon">
                                <i class="fas fa-images"></i>
                            </div>
                            <span class="header">Arrastar & soltar</span>
                            <span class="header"> ou <span class="button"> procurar </span></span>
                            <span class="support">Tipos aceitos: JPEG, JPG, PNG </span>
                        </div>
                        <div class="mb-3">
                            <input class="edit-input-img" accept="image/*" type="file" id="img" name="img" placeholder="Img nome" hidden>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label>Bloquear sala</label>
                        <!--input type="hidden" name="status" value="0"-->
                        <input type="checkbox" name="status" value="Teste">
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary">Atualizar sala</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
<!-- Visualizar modal -->
<div class="modal fade" id="ViewModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Visualizar sala</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
                <div class="modal-body">

                    <div class="mb-3">
                        <label for="">Nome</label>
                        <p id="view_nome" class="form-control"></p>
                    </div>
                    <div class="mb-3">
                        <label for="">Capacidade:</label>
                        <p id="view_capacidade" class="form-control"></p>
                    </div>
                    <div class="mb-3">
                        <label for="">Imagem:</label>
                        <p id="view_imagem" class="form-control"></p>
                    </div>
                </div>
                <div class="modal-footer">
            </div>
        </div>
    </div>
</div>
<!-- Tabela -->
</div>
    <div class="container mt-4">
        <?php include('message.php'); ?>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h4>
                            <span id="quantidade_salas_text">Salas: (<span id="total_salas">0</span>) ; </span> Salas bloqueadas: (<span id="bloqueadas_salas">0</span>) 
                            <button type="button" class="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#AddModal">Adicionar sala</button>
                            <a href="/AceSchedules/Ace Schedules - frontend/Painel - Ace Schedules/painel.php" style="margin-right:1%" id="painelSalas" class="btn btn-primary float-end">Painel de salas</a>
                            <a href="/AceSchedules/Ace Schedules - frontend/Painel Admin Usuário - Ace Schedules/index.php" class="btn btn-primary float-end" style="margin-right:1%">Administração de usuários</a>
                            <a href="/AceSchedules/Ace Schedules - frontend/Painel Admin Reservas - Ace Schedules/index.php" class="btn btn-primary float-end" style="margin-right:1%">Administração de reservas</a>
                            <div class="form-group" style="display: -webkit-box; margin-top: 2vh;">
                                <label style="font-size: 1rem;" for="filter_nome">Nome da sala:</label>
                                <input style="font-size: 1rem; margin-left: 4px;" type="text" id="filter_nome" name="filter_nome" autocomplete="OFF">
                                <label style="font-size: 1rem; margin-left: 1vw;" for="filter_capacidade">Capacidade da sala:</label>
                                <input style="font-size: 1rem; margin-left: 4px;" type="number" id="filter_capacidade" name="filter_capacidade" autocomplete="OFF">
                                <label style="font-size: 1rem; margin-left: 1vw;">
                                    <input type="checkbox" id="apenas_bloqueadas" name="apenas_bloqueadas"> Mostrar apenas bloqueadas
                                </label>
                            </div>
                        </h4>
                    </div>
                    <div class="card-body">
                        <table class="table table-bordered table-striped" id="salas">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome da Sala</th>
                                    <th>Capacidade</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- As salas serão carregadas aqui -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
<script>

//Carregar informações
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

    </script>

    <script>
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
    </script>

<script type="text/javascript" src="js.js"></script>                    
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>