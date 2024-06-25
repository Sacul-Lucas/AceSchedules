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

    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>


    <script>
        $(document).ready(function() {
            function loadReservas(status) {
                var salaId = status === 0 ? $('#sala').val() : $('#sala_aprov').val();
                var data = status === 0 ? $('#data').val() : $('#data_aprov').val();
                var nome = status === 0 ? $('#nome').val() : $('#nome_aprov').val();

                if (data) {
                    var parts = data.split('-');
                    data = parts[2] + '/' + parts[1] + '/' + parts[0];
                }

                $.ajax({
                    url: 'get_reservas.php',
                    type: 'GET',
                    data: {
                        sala_id: salaId,
                        data: data,
                        nome: nome,
                        status: status
                    },
                    success: function(data) {
                        if (status === 0) {
                            $('#reservas tbody').html(data);
                        } else {
                            $('#reservas_aprov tbody').html(data);
                        }
                    }
                });
            }

            $('#sala, #data, #nome').on('change keyup', function() {
                loadReservas(0);
            });

            $('#sala_aprov, #data_aprov, #nome_aprov').on('change keyup', function() {
                loadReservas(1);
            });

            $(document).on('click', '.approve-btn', function() {
                var id = $(this).data('id');
                $.ajax({
                    url: 'approve_reserva.php',
                    type: 'POST',
                    data: {
                        id: id
                    },
                    success: function(response) {
                        if (response.trim() === 'success') {
                            loadReservas(0);
                            loadReservas(1);
                        } else {
                            alert('Erro ao aprovar a reserva.');
                        }
                    }
                });
            });

            loadReservas(0);
            loadReservas(1);
        });
    </script>

    <title>Painel Administrador</title>
</head>

<body>

    <div class="container mt-4">

        <?php include('message.php'); ?>

        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h4 style="margin-bottom: 2vh;">Agendamentos pendentes
                            <a href="/AceSchedules/Painel Admin Usuário - Ace Schedules/index.php" class="btn btn-primary float-end" style="margin-right:2%">Administração de usuários</a>
                            <a href="/AceSchedules/Painel Admin Salas - Ace Schedules/index.php" class="btn btn-primary float-end" style="margin-right:2%">Administração de salas</a>
                        </h4>
                        <div style="display: -webkit-box">
                            Selecione a sala:
                            <select id="sala" name="sala" required>
                                <option value="">--Todas as salas--</option>
                                <?php
                                $sql = "SELECT id, nome FROM salas";
                                $result = $con->query($sql);
                                if ($result->num_rows > 0) {
                                    while ($row = $result->fetch_assoc()) {
                                        echo '<option value="' . $row["id"] . '">' . $row["nome"] . '</option>';
                                    }
                                } else {
                                    echo "<option value=''>Nenhuma sala encontrada</option>";
                                }
                                ?>
                            </select>
                            <div class="form-group" style="margin-left: 1vw; ">
                                <label for="data">Selecione a data:</label>
                                <input type="date" id="data" name="data">
                            </div>
                            <div class="form-group" style="margin-left: 1vw; ">
                                <label for="nome">Nome do alocador:</label>
                                <input type="text" id="nome" name="nome" autocomplete="OFF">
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <table class="table table-bordered table-striped" id="reservas">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DataAgendamento</th>
                                    <th>Período</th>
                                    <th>Sala</th>
                                    <th>Nome do Alocador</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!--Reservas são carregadas aqui-->
                            </tbody>
                        </table>
                    </div>
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
                        <h4>Agendamentos aprovados
                            <a href="schedule-create.php" class="btn btn-primary float-end">Adicionar Agendamento</a>
                        </h4>
                        <div style="display: -webkit-box">
                            Selecione a sala:
                            <select id="sala_aprov" name="sala" required>
                                <option value="">--Todas as salas--</option>
                                <?php
                                $sql = "SELECT id, nome FROM salas";
                                $result = $con->query($sql);
                                if ($result->num_rows > 0) {
                                    while ($row = $result->fetch_assoc()) {
                                        echo '<option value="' . $row["id"] . '">' . $row["nome"] . '</option>';
                                    }
                                } else {
                                    echo "<option value=''>Nenhuma sala encontrada</option>";
                                }
                                ?>
                            </select>
                            <div class="form-group" style="margin-left: 1vw">
                                <label for="data_aprov">Selecione a data:</label>
                                <input type="date" id="data_aprov" name="data">
                            </div>
                            <div class="form-group" style="margin-left: 1vw">
                                <label for="nome_aprov">Nome do alocador:</label>
                                <input type="text" id="nome_aprov" name="nome" autocomplete="OFF">
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <table class="table table-bordered table-striped" id="reservas_aprov">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DataAgendamento</th>
                                    <th>Período</th>
                                    <th>Sala</th>
                                    <th>Nome do Alocador</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!--Reservas são carregadas aqui-->
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