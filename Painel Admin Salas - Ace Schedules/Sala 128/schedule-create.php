<?php
session_start();
?>

<!doctype html>
<html lang="pt-BR">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <title>Criar Agendamento</title>
</head>
<body>
  
    <div class="container mt-5">

        <?php include('message.php'); ?>

        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h4>Adicionar Agendamento
                            <a href="index.php" class="btn btn-danger float-end">VOLTAR</a>
                        </h4>
                    </div>
                    <div class="card-body">
                        <form action="code.php" method="POST">
                        <div class="mb-3">
                                <label>ID</label>
                                <input type="text" name="agendamento_id" class="form-control">
                            </div>
                            <div class="mb-3">
                                <label>Nome da sala</label>
                                <input type="text" name="idSala2" class="form-control" value="Sala 106" readonly="readonly">
                            </div>
                            <div class="mb-3">
                                <label>Data</label>
                                <input type="date" name="dataAgendamento" class="form-control">
                            </div>
                            <div class="mb-3">
                                <label>Período</label>
                                <input type="text" name="periodo" class="form-control">
                            </div>
                            <div class="mb-3">
                                <button type="submit" name="save_schedule" class="btn btn-primary">Salvar agendamento</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>