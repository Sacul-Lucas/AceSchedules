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
                            <a href="/AceSchedules/Painel Admin Usuário - Ace Schedules/index.php" class="btn btn-primary float-end" style="margin-right:2%">Administração de usuários</a>
                        </h4>

                        Selecione a sala:
                        <select name="types" id="types" onchange="window.location=this.value;">

                            <option value="/AceSchedules/Painel Admin Salas - Ace Schedules/Auditório/index.php" href="/AceSchedules/Painel Admin Salas - Ace Schedules/Auditório/index.php">Auditório</option>
                            <option value="/AceSchedules/Painel Admin Salas - Ace Schedules/Sala 106/index.php" href="/AceSchedules/Painel Admin Salas - Ace Schedules/Sala 106/index.php">Sala 106</option>
                            <option value="/AceSchedules/Painel Admin Salas - Ace Schedules/Sala 128/index.php" href="/AceSchedules/Painel Admin Salas - Ace Schedules/Sala 128/index.php">Sala 128</option>
                            <option value="/AceSchedules/Painel Admin Salas - Ace Schedules/Sala 129/index.php" href="/AceSchedules/Painel Admin Salas - Ace Schedules/Sala 129/index.php">Sala 129</option>
                            <option value="/AceSchedules/Painel Admin Salas - Ace Schedules/Sala 130/index.php" href="/AceSchedules/Painel Admin Salas - Ace Schedules/Sala 130/index.php">Sala 130</option>
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

                                $query = "SELECT * FROM audi";
                                $query_run = mysqli_query($con, $query);


                                if (mysqli_num_rows($query_run) > 0) {
                                    foreach ($query_run as $agendamento) {
                                ?>
                                        <tr>
                                            <td><?= $agendamento['id']; ?></td>
                                            <td><?= $agendamento['dataAgendamento']; ?></td>
                                            <td><?= $agendamento['periodo']; ?></td>
                                            <td><?= $agendamento['idAudi']; ?></td>


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