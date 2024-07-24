<?php
require 'dbcon.php';
?>
<!doctype html>
<html lang="pt-BR">

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">


    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <title>Detalhes do agendamento</title>
</head>

<body>

    <div class="container mt-5">

        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h4>Dados do agendamento
                            <a href="index.php" class="btn btn-danger float-end">VOLTAR</a>
                        </h4>
                    </div>
                    <div class="card-body">

                        <?php
                        if (isset($_GET['id'])) {
                            $agendamento_id = mysqli_real_escape_string($con, $_GET['id']);
                            $sql = "SELECT r.id, DATE_FORMAT(r.dataAgendamento, '%d/%m/%Y') as dataAgendamento, r.horaAgendamento, s.nome AS sala_nome, c.usuario, c.telefone AS contato, c.cnpj AS cnpj, c.id AS locador_id, c.email AS email
                                    FROM reservas r
                                    JOIN salas s ON r.sala = s.id
                                    JOIN cadastro c ON r.usuario = c.id
                                    WHERE r.id = $agendamento_id";
                            $query_run = mysqli_query($con, $sql);

                            if (mysqli_num_rows($query_run) > 0) {
                                $agendamento = mysqli_fetch_array($query_run);

                                // Verifica se o locador_id é igual a 1 (representando a escola)
                                if ($agendamento['locador_id'] == 1) {
                                    // Não exibe o contato e o CNPJ
                                    $email = 'Informação restrita';
                                    $contato = 'Informação restrita';
                                    $cnpj = 'Informação restrita';
                                } else {
                                    // Exibe o contato e o CNPJ normalmente
                                    $email = $agendamento['email'];
                                    $contato = $agendamento['contato'];
                                    $cnpj = $agendamento['cnpj'];
                                }
                        ?>

                                <div class="mb-3">
                                    <label>Nome da sala alocada</label>
                                    <p class="form-control">
                                        <?= $agendamento['sala_nome']; ?>
                                    </p>
                                </div>
                                <div class="mb-3">
                                    <label>Data</label>
                                    <p class="form-control">
                                        <?= $agendamento['dataAgendamento']; ?>
                                    </p>
                                </div>
                                <div class="mb-3">
                                    <label>Horario</label>
                                    <p class="form-control">
                                        <?= $agendamento['horaAgendamento']; ?>
                                    </p>
                                </div>
                                <div class="mb-3">
                                    <label>Locador da sala</label>
                                    <p class="form-control">
                                        <?= $agendamento['usuario']; ?>
                                    </p>
                                </div>
                                <?php if ($agendamento['locador_id'] != 1) { ?>
                                    <div class="mb-3">
                                        <label>Email do locador</label>
                                        <p class="form-control">
                                            <?= $email; ?>
                                        </p>
                                    </div>
                                    <div class="mb-3">
                                        <label>Contato do locador</label>
                                        <p class="form-control">
                                            <?= $contato; ?>
                                        </p>
                                    </div>
                                    <div class="mb-3">
                                        <label>CNPJ do locador</label>
                                        <p class="form-control">
                                            <?= $cnpj; ?>
                                        </p>
                                    </div>
                                <?php } ?>

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