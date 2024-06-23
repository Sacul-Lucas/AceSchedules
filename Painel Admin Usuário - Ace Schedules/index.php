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
                        <h4>Detalhes do usuário
                            <a href="student-create.php" class="btn btn-primary float-end">Adicionar usuário</a>
                            <a href="/AceSchedules/Painel Admin Salas - Ace Schedules/Auditório/index.php" class="btn btn-primary float-end" style="margin-right:2%">Administração de salas</a>
                        </h4>
                    </div>
                    <div class="card-body">

                        <table class="table table-bordered table-striped">
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
                                <?php
                                $query = "SELECT * FROM cadastro";
                                $query_run = mysqli_query($con, $query);

                                if (mysqli_num_rows($query_run) > 0) {
                                    foreach ($query_run as $cadastro) {
                                ?>
                                        <tr>
                                            <td><?= $cadastro['id']; ?></td>
                                            <td><?= $cadastro['usuario']; ?></td>
                                            <td><?= $cadastro['email']; ?></td>
                                            <td><?= $cadastro['senha']; ?></td>
                                            <td><?= $cadastro['usertype']; ?></td>

                                            <td>
                                                <a href="student-view.php?id=<?= $cadastro['id']; ?>" class="btn btn-info btn-sm">Visualizar</a>
                                                <a href="student-edit.php?id=<?= $cadastro['id']; ?>" class="btn btn-success btn-sm">Editar</a>
                                                <form action="code.php" method="POST" class="d-inline">
                                                    <button type="submit" name="delete_cadastro" value="<?= $cadastro['id']; ?>" class="btn btn-danger btn-sm">Deletar</button>
                                                </form>
                                            </td>
                                        </tr>
                                <?php
                                    }
                                } else {
                                    echo "<h5> Nenhum aluno cadastrado </h5>";
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