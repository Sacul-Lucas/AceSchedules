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
</head>

<body>

    <div class="container mt-4">

        <?php include('message.php'); ?>

        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h4>Detalhes do agendamento
                            <a href="schedule-create.php" class="btn btn-primary float-end">Adicionar Agendamento</a>
                            <a href="http://localhost/AceSchedules/Painel%20Admin%20Usu%c3%a1rio%20-%20Ace%20Schedules/" class="btn btn-primary float-end" style="margin-right:2%">Administração de usuários</a>
                        </h4>
                        Selecione a sala:
                        <select name="types" id="types" onchange="window.location=this.value;">
                                <option></option>
                                <option value="http://localhost/AceSchedules/Painel%20Admin%20Salas%20-%20Ace%20Schedules/Audit%c3%b3rio/" href="http://localhost/AceSchedules/Painel%20Admin%20Salas%20-%20Ace%20Schedules/Audit%c3%b3rio/">Auditório</option>
                                <option value="http://localhost/AceSchedules/Painel%20Admin%20Salas%20-%20Ace%20Schedules/Sala%20106/" href="http://localhost/AceSchedules/Painel%20Admin%20Salas%20-%20Ace%20Schedules/Sala%20106/">Sala 106</option>
                                <option value="http://localhost/AceSchedules/Painel%20Admin%20Salas%20-%20Ace%20Schedules/Sala%20128/" href="http://localhost/AceSchedules/Painel%20Admin%20Salas%20-%20Ace%20Schedules/Sala%20128/">Sala 128</option>
                                <option value="http://localhost/AceSchedules/Painel%20Admin%20Salas%20-%20Ace%20Schedules/Sala%20129/" href="http://localhost/AceSchedules/Painel%20Admin%20Salas%20-%20Ace%20Schedules/Sala%20129/">Sala 129</option>
                                <option value="http://localhost/AceSchedules/Painel%20Admin%20Salas%20-%20Ace%20Schedules/Sala%20130/" href="http://localhost/AceSchedules/Painel%20Admin%20Salas%20-%20Ace%20Schedules/Sala%20130/">Sala 130</option>
                        </select>
                    </div>
                    <div class="card-body">

                        <table class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DataAgendamento</th>
                                    <th>Período</th>
                                    <th>Sala</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php

                                $query = "SELECT * FROM sala4";
                                $query_run = mysqli_query($con, $query);


                                if (mysqli_num_rows($query_run) > 0) {
                                    foreach ($query_run as $agendamento) {
                                ?>
                                        <tr>
                                            <td><?= $agendamento['id']; ?></td>
                                            <td><?= $agendamento['dataAgendamento']; ?></td>
                                            <td><?= $agendamento['periodo']; ?></td>
                                            <td><?= $agendamento['idSala4']; ?></td>


                                            <td>
                                                <a href="schedule-view.php?id=<?= $agendamento['id']; ?>" class="btn btn-info btn-sm">Visualizar</a>
                                                <a href="schedule-edit.php?id=<?= $agendamento['id']; ?>" class="btn btn-success btn-sm">Editar</a>
                                                <form action="code.php" method="POST" class="d-inline">
                                                    <button type="submit" name="delete_schedule" value="<?= $agendamento['id']; ?>" class="btn btn-danger btn-sm">Deletar</button>
                                                </form>
                                            </td>
                                        </tr>
                                <?php
                                    }
                                } else {
                                    echo "<h5> Nenhum agendamento cadastrado </h5>";
                                }
                                ?>

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