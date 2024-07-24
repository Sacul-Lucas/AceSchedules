<?php
session_start();
require 'dbcon.php';
?>
<!doctype html>
<html lang="pt-BR">
<head>
<!-- Required meta tags -->
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- IMask JS -->
<script src="https://unpkg.com/imask"></script>
<!-- JQuery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<!-- Bootstrap CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
<title>Painel Administrador</title>
</head>
<body>

<!-- Add User -->
<div class="modal fade" id="UserAddModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add User</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form id="saveUser">
            <div class="modal-body">

                <div id="errorMessage" class="alert alert-warning d-none"></div>

                <div class="mb-3">
                    <label for="">Nome do Usuario</label>
                    <input type="text" name="usuario" class="form-control" autocomplete="off"/>
                </div>
                <div class="mb-3">
                    <label for="">Email</label>
                    <input type="text" name="email" class="form-control" autocomplete="off"/>
                </div>
                <div class="mb-3">
                    <label for="">Senha</label>
                    <input type="text" name="senha" class="form-control" autocomplete="off" />
                </div>
                <div class="mb-3">
                    <label for="">Contato</label>
                    <input type="text" name="tel" id="addTelefone" class="form-control" autocomplete="off"/>
                </div>
                <div class="mb-3">
                    <label for="">CNPJ</label>
                    <input type="text" name="cnpj" id="addcnpj" class="form-control" autocomplete="off"/>
                </div>
                <div class="mb-3">
                    <label for="types" id="userType">Tipo de usuário:</label>
                    <select name="userType" id="types" class="form-control">
                        <option value="Empresa">Empresa</option>
                        <option value="Administrador">Administrador</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-primary">Save User</button>
            </div>
        </form>
        </div>
    </div>
</div>

<!-- Edit User Modal -->
<div class="modal fade" id="UserEditModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Edit User</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="updateUser">
                <div class="modal-body">

                    <div id="errorMessageUpdate" class="alert alert-warning d-none"></div>

                    <input type="hidden" name="id" id="id">

                    <div class="mb-3">
                        <label for="usuario">Nome do Usuario</label>
                        <input type="text" name="usuario" id="usuario" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="email">Email</label>
                        <input type="text" name="email" id="email" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="senha">Senha</label>
                        <input type="text" name="senha" id="senha" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="telefone">Contato</label>
                        <input type="text" name="tel" id="telefone" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="cnpj">CNPJ</label>
                        <input type="text" name="cnpj" id="cnpj" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="types" id="userType">Tipo de usuário:</label>
                        <select name="userType" id="edittypes" class="form-control">
                            <option value="Empresa">Empresa</option>
                            <option value="Administrador">Administrador</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary">Atualizar Usuário</button>
                </div>
            </form>
        </div>
        </div>
    </div>
</div>

<!-- View User Modal -->
<div class="modal fade" id="UserViewModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">View User</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
            <div class="modal-body">

                <div class="mb-3">
                    <label for="">Usuario</label>
                    <p id="view_usuario" class="form-control"></p>
                </div>
                <div class="mb-3">
                    <label for="">Email</label>
                    <p id="view_email" class="form-control"></p>
                </div>
                <div class="mb-3">
                    <label for="">Senha</label>
                    <p id="view_senha" class="form-control"></p>
                </div>
                <div class="mb-3">
                    <label for="">Contato</label>
                    <p id="view_telefone" class="form-control"></p>
                </div>
                <div class="mb-3">
                    <label for="">CNPJ</label>
                    <p id="view_cnpj" class="form-control"></p>
                </div>
                <div class="mb-3">
                    <label for="">Tipo de usuário</label>
                    <p id="view_usertype" class="form-control"></p>
                </div>
            </div>
            <div class="modal-footer">
            </div>
        </div>
    </div>
</div>

<div class="container mt-4">
    <?php include('message.php'); ?>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h4>Detalhes do usuário (<span id="detalhes-usuario">0</span>)
                        <button type="button" class="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#UserAddModal">Adicionar usuário</button>
                            <a href="/AceSchedules/Ace Schedules - frontend/Painel - Ace Schedules/painel.php" style="margin-right:1%" id="painelSalas" class="btn btn-primary float-end">Painel de salas</a>
                            <a href="/AceSchedules/Ace Schedules - frontend/Painel Admin Salas - Ace Schedules/index.php" class="btn btn-primary float-end" style="margin-right:1%">Administração de salas</a>
                            <a href="/AceSchedules/Ace Schedules - frontend/Painel Admin Reservas - Ace Schedules/index.php" class="btn btn-primary float-end" style="margin-right:1%">Administração de reservas</a>
                        </h4>
                        <div style="display: -webkit-box; margin-top: 2vh;">
                            <div class="form-group">
                                <label for="nome">Nome do alocador:</label>
                                <input type="text" id="nome" name="nome" autocomplete="OFF"/>
                            </div>
                            <div class="form-group" style="margin-left: 1vw; margin-right: 1vw;">
                                <label for="email">Selecione o email:</label>
                                <input type="email" id="selectMail" name="selectMail">
                            </div>
                            Selecione o tipo de usuário:
                            <select id="user" name="user" required>
                                <option user="">---Todos---</option>
                                <option value="Empresa">Empresa</option>
                                <option value="Administrador">Administrador</option>
                            </select>
                        </div>
                    </div>
                    <div class="card-body">
                    <table class="table table-bordered table-striped" id="usuarios">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Usuário</th>
                            <th>Email</th>
                            <th>Senha</th>
                            <th>Tipo de Usuário</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Dados dos usuários serão carregados dinamicamente -->
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="js.js"></script>  
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>

 
</html>