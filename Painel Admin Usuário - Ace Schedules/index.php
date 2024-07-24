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

    <script>
        $(document).ready(function() {
            function loadUsuarios() {
                var usertype = $('#user').val();
                var email = $('#selectMail').val();
                var nome = $('#nome').val();

                $.ajax({
                    url: 'get_usuarios.php',
                    type: 'GET',
                    data: {
                        user_type: usertype,
                        email: email,
                        nome: nome
                    },
                    success: function(data) {
                        var response = JSON.parse(data);
                        $('#usuarios tbody').html(response.html);
                        $('#total_usuarios').text(response.total);
                        $('span#detalhes-usuario').text(`${response.total}`);
                    },
                    error: function(xhr, status, error) {
                        console.error(error);
                    }
                });
            }

            $('#user, #selectMail, #nome').on('change keyup', function() {
                loadUsuarios();
            });

            // Carrega os usuários ao carregar a página
            loadUsuarios();

            // Submissão do formulário de adicionar usuário
            $(document).on('submit', '#saveUser', function (e) {
                e.preventDefault();

                var formData = new FormData(this);
                formData.append("save_User", true);

                $.ajax({
                    type: "POST",
                    url: "code.php",
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (response) {
                        var res = jQuery.parseJSON(response);
                        if (res.status == 422) {
                            $('#errorMessage').removeClass('d-none');
                            $('#errorMessage').text(res.message);
                        } else if (res.status == 200) {
                            $('#errorMessage').addClass('d-none');
                            $('#UserAddModal').modal('hide');
                            $('#saveUser')[0].reset();

                            // Carregar a tabela novamente
                            loadUsuarios();
                        } else if (res.status == 500) {
                            alert(res.message);
                        }
                    }
                });
            });

            // Submissão do formulário de editar usuário
            $(document).on('submit', '#updateUser', function (e) {
                e.preventDefault();

                var formData = new FormData(this);
                formData.append("update_User", true);

                $.ajax({
                    type: "POST",
                    url: "code.php",
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (response) {
                        var res = jQuery.parseJSON(response);
                        if (res.status == 422) {
                            $('#errorMessageUpdate').removeClass('d-none');
                            $('#errorMessageUpdate').text(res.message);
                        } else if (res.status == 200) {
                            $('#errorMessageUpdate').addClass('d-none');
                            $('#UserEditModal').modal('hide');
                            $('#updateUser')[0].reset();


                            // Carregar a tabela novamente
                            loadUsuarios();
                        } else if (res.status == 500) {
                            alert(res.message);
                        }
                    }
                });
            });

            // Deletar usuário
            $(document).on('click', '.deleteBtn', function (e) {
                e.preventDefault();

                if (confirm('Tem certeza que quer deletar este cadastro?')) {
                    var id = $(this).val();
                    $.ajax({
                        type: "POST",
                        url: "code.php",
                        data: {
                            'delete': true,
                            'id': id
                        },
                        success: function (response) {
                            var res = jQuery.parseJSON(response);
                            if (res.status == 500) {
                                alert(res.message);
                            } else {

                                // Carregar a tabela novamente
                                loadUsuarios();
                            }
                        }
                    });
                }
            });
        });

    </script>
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

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>

    <script>

            // Aplica a máscara de telefone
            var telMask = IMask(document.getElementById('addTelefone'), {
                mask: '(00) 0000-0000'
            });
            var telMask = IMask(document.getElementById('addcnpj'), {
                mask: '00.000.000/0000-00'
            });
            var telMask = IMask(document.getElementById('telefone'), {
                mask: '(00) 0000-0000'
            });

            // Aplica a máscara de CNPJ
            var cnpjMask = IMask(document.getElementById('cnpj'), {
                mask: '00.000.000/0000-00'
            });

            $(document).on('click', '.editBtn', function () {
                var id = $(this).val();

                $.ajax({
                    type: "GET",
                    url: "code.php?id=" + id,
                    success: function (response) {
                        console.log(response); // Adicionado para verificar a resposta do servidor
                        var res = jQuery.parseJSON(response);
                        if (res.status == 404) {
                            alert(res.message);
                        } else if (res.status == 200) {
                            $('#id').val(res.data.id);
                            $('#usuario').val(res.data.usuario);
                            $('#senha').val(res.data.senha);
                            $('#email').val(res.data.email);
                            $('#telefone').val(res.data.telefone);
                            $('#cnpj').val(res.data.cnpj);

                            console.log('usertype:', res.data.usertype); // Adicionado para verificar o valor do usertype

                            // Atualize o valor do dropdown
                            $('#edittypes').val(res.data.usertype);

                            $('#UserEditModal').modal('show');
                        }
                    },
                    error: function(xhr, status, error) {
                        console.error(xhr); // Adicionado para capturar e exibir erros da solicitação AJAX
                    }
                });
            });


            $(document).on('click', '.viewBtn', function () {

                var id = $(this).val();
                $.ajax({
                    type: "GET",
                    url: "code.php?id=" + id,
                    success: function (response) {

                        var res =  jQuery.parseJSON(response);
                        if(res.status == 404) {

                            alert(res.message);
                        }else if(res.status == 200){

                            $('#view_usuario').text(res.data.usuario);
                            $('#view_email').text(res.data.email);
                            $('#view_senha').text(res.data.senha);
                            $('#view_telefone').text(res.data.telefone);
                            $('#view_cnpj').text(res.data.cnpj);
                            $('#view_usertype').text(res.data.usertype);

                            $('#UserViewModal').modal('show');
                        }
                    }
                });
            });

    </script>
    </body>
</html>