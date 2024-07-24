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

<script type="text/javascript" src="js.js"></script>                    
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>