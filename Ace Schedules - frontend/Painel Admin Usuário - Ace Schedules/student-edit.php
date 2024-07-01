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

    <!-- IMask JS -->
    <script src="https://unpkg.com/imask"></script>

    <title>Edição de usuário</title>
</head>

<body>

    <div class="container mt-5">

        <?php include('message.php'); ?>

        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h4>Editar usuário
                            <a href="index.php" class="btn btn-danger float-end">VOLTAR</a>
                        </h4>
                    </div>
                    <div class="card-body">

                        <?php
                        if (isset($_GET['id'])) {
                            $cadastro_id = mysqli_real_escape_string($con, $_GET['id']);
                            $query = "SELECT * FROM cadastro WHERE id='$cadastro_id' ";
                            $query_run = mysqli_query($con, $query);

                            if (mysqli_num_rows($query_run) > 0) {
                                $cadastro = mysqli_fetch_array($query_run);
                                $currentType = $cadastro['usertype'];
                                $otherType = ($currentType === 'Empresa') ? 'Administrador' : 'Empresa';
                        ?>
                                <form action="code.php" method="POST" id="inputCadastro">
                                    <input type="hidden" name="cadastro_id" value="<?= $cadastro['id']; ?>">

                                    <div class="mb-3">
                                        <label for="usuario">Empresa/Usuário</label>
                                        <input type="text" id="usuario" name="usuario" value="<?= $cadastro['usuario']; ?>" class="form-control" placeholder="Insira o nome da Empresa" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="email">Email</label>
                                        <input type="email" id="email" name="email" value="<?= $cadastro['email']; ?>" class="form-control" placeholder="Insira o seu email" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="senha">Senha</label>
                                        <input type="password" id="senha" name="senha" value="<?= $cadastro['senha']; ?>" class="form-control" placeholder="Insira a sua senha" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="tel">Número de telefone</label>
                                        <input type="text" id="tel" name="tel" value="<?= $cadastro['telefone']; ?>" class="form-control" placeholder="Insira o seu telefone" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="cnpj">CNPJ</label>
                                        <input type="text" id="cnpj" name="cnpj" value="<?= $cadastro['cnpj']; ?>" class="form-control" placeholder="Insira o CNPJ da empresa" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="types" id="userType">Tipo de usuário:</label>
                                        <select name="types" id="types" class="form-control">
                                            <option value="<?= $currentType ?>"><?= $currentType ?></option>
                                            <option value="<?= $otherType ?>"><?= $otherType ?></option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <button type="submit" name="update_cadastro" class="btn btn-primary">Atualizar usuário</button>
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

    <!-- Script para aplicar a máscara de entrada -->
    <script>
        // Aplica a máscara de telefone
        var telMask = IMask(document.getElementById('tel'), {
            mask: '(00) 0000-0000'
        });

        // Aplica a máscara de CNPJ
        var cnpjMask = IMask(document.getElementById('cnpj'), {
            mask: '00.000.000/0000-00'
        });
    </script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>