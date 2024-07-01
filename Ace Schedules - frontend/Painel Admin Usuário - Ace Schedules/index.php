<?php
session_start();
require 'dbcon.php';

$sqlCountPessoas = "SELECT COUNT(*) AS count FROM cadastro";
$resultCountPessoas = $con->query($sqlCountPessoas);
$countPessoas = $resultCountPessoas->fetch_assoc()['count'];

$sqlCountAprovada = "SELECT COUNT(*) AS count FROM reservas WHERE status = 1";
$resultCountAprovada = $con->query($sqlCountAprovada);
$countAprovada = $resultCountAprovada->fetch_assoc()['count'];
?>
<!doctype html>
<html lang="pt-BR">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- JQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <title>Painel Administrador</title>

    <script>
        $(document).ready(function() {
            function loadUsuarios() {
                var usertype = $('#user').val();
                var email = $('#email').val();
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
                        $('#usuarios tbody').html(data);
                    },
                    error: function(xhr, status, error) {
                        console.error(error);
                    }
                });
            }

            $('#user, #email, #nome').on('change keyup', function() {
                loadUsuarios();
            });

            // Carrega os usuários ao carregar a página
            loadUsuarios();
        });
    </script>
</head>

<body>
    <div class="container mt-4">
        <?php include('message.php'); ?>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h4>Detalhes do usuário (<?= $countPessoas ?>)
                            <a href="student-create.php" class="btn btn-primary float-end">Adicionar usuário</a>
                            <a href="/AceSchedules/Ace Schedules - frontend/Painel Admin Salas - Ace Schedules/index.php" class="btn btn-primary float-end" style="margin-right:2%">Administração de salas</a>
                            <a href="/AceSchedules/Ace Schedules - frontend/Painel Admin Reservas - Ace Schedules/index.php" class="btn btn-primary float-end" style="margin-right:2%">Administração de reservas</a>
                        </h4>
                        <div style="display: -webkit-box; margin-top: 2vh;">
                            <div class="form-group">
                                <label for="email">Selecione o email:</label>
                                <input type="email" id="email" name="email">
                            </div>
                            <div class="form-group" style="margin-left: 1vw; margin-right: 1vw;">
                                <label for="nome">Nome do alocador:</label>
                                <input type="text" id="nome" name="nome" autocomplete="OFF">
                            </div>
                            Selecione o tipo de usuário:
                            <select id="user" name="user" required>
                                <option user="">--Tipo de usuário--</option>
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
                                    <th>Usuario</th>
                                    <th>Email</th>
                                    <th>Senha</th>
                                    <th>Tipo de usuário</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!--Usuarios são carregados aqui-->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>