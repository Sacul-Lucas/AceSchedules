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

    <!-- IMask JS -->
    <script src="https://unpkg.com/imask"></script>

    <title>Criar usuário</title>
</head>
<body>

<div class="container mt-5">

    <?php include('message.php'); ?>

    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <h4>Adicionar usuário
                        <a href="index.php" class="btn btn-danger float-end">VOLTAR</a>
                    </h4>
                </div>
                <div class="card-body">
                    <form action="code.php" method="POST" id="inputCadastro">

                        <div class="mb-3">
                            <label for="usuario">Empresa/Usuário</label>
                            <input type="text" id="usuario" name="usuario" class="form-control" placeholder="Insira o nome da Empresa" required>
                        </div>
                        <div class="mb-3">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" class="form-control" placeholder="Insira o seu email" required>
                        </div>
                        <div class="mb-3">
                            <label for="senha">Senha</label>
                            <input type="password" id="senha" name="senha" class="form-control" placeholder="Insira a sua senha" required>
                        </div>
                        <div class="mb-3">
                            <label for="tel">Número de telefone</label>
                            <input type="text" id="tel" name="tel" class="form-control" placeholder="Insira o seu telefone" required>
                        </div>
                        <div class="mb-3">
                            <label for="cnpj">CNPJ</label>
                            <input type="text" id="cnpj" name="cnpj" class="form-control" placeholder="Insira o CNPJ da empresa" required>
                        </div>
                        <div class="mb-3">
                            <label for="types" id="userType">Tipo de usuário:</label>
                            <select name="types" id="types" class="form-control">
                                <option value="Empresa">Empresa</option>
                                <option value="Administrador">Administrador</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <button type="submit" name="save_cadastro" class="btn btn-primary">Salvar usuário</button>
                        </div>

                    </form>
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