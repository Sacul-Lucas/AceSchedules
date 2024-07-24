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

    <title>Edição de agendamento</title>
</head>

<body>

    <div class="container mt-5">

        <?php include('message.php'); ?>

        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h4>Editar agendamento
                            <a href="index.php" class="btn btn-danger float-end">VOLTAR</a>
                        </h4>
                    </div>
                    <div class="card-body">

                        <?php
                        if (isset($_GET['id'])) {
                            $agendamento_id = mysqli_real_escape_string($con, $_GET['id']);
                            $query = "SELECT * FROM reservas WHERE id='$agendamento_id' ";
                            $query_run = mysqli_query($con, $query);

                            if (mysqli_num_rows($query_run) > 0) {
                                $agendamento = mysqli_fetch_array($query_run);

                                // Obter o nome da sala atual
                                $sala_id = $agendamento['sala'];
                                $sala_query = "SELECT nome FROM salas WHERE id='$sala_id'";
                                $sala_query_run = mysqli_query($con, $sala_query);
                                $sala = mysqli_fetch_array($sala_query_run);
                        ?>
                                <form action="code.php" method="POST">
                                    <input type="hidden" name="id" value="<?= $agendamento['id']; ?>">

                                    <div class="mb-3">
                                        <label>Sala alocada</label>
                                        <select name="sala" class="form-control">
                                            <?php
                                            echo '<option value="' . $sala_id . '" selected>' . $sala['nome'] . '</option>';
                                            $sql = "SELECT id, nome FROM salas";
                                            $result = $con->query($sql);
                                            if ($result->num_rows > 0) {
                                                while ($row = $result->fetch_assoc()) {
                                                    if ($row['id'] != $sala_id) {
                                                        echo '<option value="' . $row['id'] . '">' . $row['nome'] . '</option>';
                                                    }
                                                }
                                            } else {
                                                echo "<option value=''>Nenhuma sala encontrada</option>";
                                            }
                                            ?>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label>Data do agendamento</label>
                                        <input type="date" name="dataAgendamento" value="<?= $agendamento['dataAgendamento']; ?>" class="form-control">
                                    </div>
                                    <div class="mb-3">
                                        <label>Horário do agendamento</label>
                                        <input id="horaAgendamento" type="time" name="horaAgendamento" value="<?= $agendamento['horaAgendamento']; ?>" class="form-control">
                                    </div>

                                    <div class="mb-3">
                                        <button type="submit" name="update_schedule" class="btn btn-primary">
                                            Atualizar agendamento
                                        </button>
                                    </div>

                                </form>
                        <?php
                            } else {
                                echo "<h4>Nenhum ID encontrado</h4>";
                            }
                        }
                        ?>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>