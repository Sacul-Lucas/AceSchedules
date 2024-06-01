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
                            $query = "SELECT * FROM audi WHERE id='$agendamento_id' ";
                            $query_run = mysqli_query($con, $query);

                            if (mysqli_num_rows($query_run) > 0) {
                                $agendamento = mysqli_fetch_array($query_run);
                        ?>
                                <form action="code.php" method="POST">
                                    <input type="hidden" name="agendamento_id" value="<?= $agendamento['id']; ?>">

                                    <div class="mb-3">
                                        <label>Nome da sala</label>
                                        <input type="text" name="idAudi" readonly="readonly" value="<?= $agendamento['idAudi']; ?>" class="form-control">
                                    </div>
                                    <div class="mb-3">
                                        <label>Email</label>
                                        <input type="date" name="dataAgendamento" value="<?= $agendamento['dataAgendamento']; ?>" class="form-control">
                                    </div>
                                    <div class="mb-3">
                                        <label>Período</label>
                                        <input type="text" name="periodo" value="<?= $agendamento['periodo']; ?>" class="form-control">
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