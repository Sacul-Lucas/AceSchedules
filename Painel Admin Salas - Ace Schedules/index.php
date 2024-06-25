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

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <title>Painel Administrador</title>
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <script>
        $(document).ready(function() {
            function loadSalas() {
                var nome_sala = $('#nome_sala').val();

                $.ajax({
                    url: 'get_salas.php', // Atualize a URL para o arquivo correto
                    type: 'GET',
                    data: {
                        nome_sala: nome_sala
                    },
                    success: function(data) {
                        $('#salas tbody').html(data);
                    },
                    error: function(xhr, status, error) {
                        console.error(error);
                    }
                });
            }

            $('#nome_sala').on('change keyup', function() {
                loadSalas();
            });

            // Carrega as salas ao carregar a página
            loadSalas();
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
                        <h4>Detalhes das salas
                            <a href="schedule-create.php" class="btn btn-primary float-end">Adicionar Sala</a>
                            <a href="/AceSchedules/Painel Admin Usuário - Ace Schedules/index.php" class="btn btn-primary float-end" style="margin-right:2%">Administração de usuários</a>
                            <a href="/AceSchedules/Painel Admin Reservas - Ace Schedules/index.php" class="btn btn-primary float-end" style="margin-right:2%">Administração de reservas</a>
                            <div class="form-group" style="display: -webkit-box; margin-top: 2vh;">
                                <label style="font-size: 1rem;" for="nome">Nome da sala:</label>
                                <input style="font-size: 1rem; margin-left: 4px;" type="text" id="nome_sala" name="nome_sala" autocomplete="OFF">
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
                                </tr>
                            </thead>
                            <tbody>
                                <!--- As salas serão carregadas aqui ---->
                            </tbody>
                        </table>

                    </div>
                </div>
                <a class="funcenviar" href="/AceSchedules/Painel - Ace Schedules/painel.php" style="margin-right:2%;left: auto;top: 20px;text-decoration: none;width: 100%;position: relative;display: inline-block;overflow: hidden;font-size: 1.875rem;font-weight: 600;background-color: white;">Painel de salas</a>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>

</body>

</html>