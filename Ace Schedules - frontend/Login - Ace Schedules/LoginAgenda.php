<?php
include('conexao.php');

if (isset($_POST['email']) || isset($_POST['senha'])) {

    if (strlen($_POST['email']) == 0) {
        echo "Preencha seu e-mail";
    } else if (strlen($_POST['senha']) == 0) {
        echo "Preencha sua senha";
    } else {
        include('verifyLogin.php');
    }
}
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <link rel="stylesheet" href="index.css">
    <title>Ace Schedules</title>
    <meta charset="utf-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="icon" type="image/x-icon" href="https://cdn-icons-png.flaticon.com/512/9131/9131529.png">
</head>

<body>
    <div class="Cadastro-img">
        <img id="logoETPC" src="img/Logo_etpc.png">
    </div>
    <section>
        <form class="form-box" id="inputCadastro" method="POST">
            <div class="form-value" method="POST">
                <h2>Login</h2>
                <div class="inputbox" hidden="">
                    <input hidden="" type="text" id="usuario" name="usuario" placeholder="Insira o nome de usuário" autocomplete="given-name">
                    <label hidden="" for="usuario">Usuario</label>
                </div>

                <div class="inputbox">
                    <input type="text" id="email" name="email" placeholder="Insira o seu email ou nome de usuário" autocomplete="off">
                    <label for="email">Email/Usuário</label>
                </div>

                <div class="inputbox">
                    <input type="password" id="senha" name="senha" placeholder="Insira a sua senha">
                    <label for="senha">Senha</label>
                </div>

                <div class="forget">
                    <label for="remember"><input id="remember" type="text" hidden="" onclick="window.location='/AceSchedules/Ace Schedules - frontend/Cadastro - Ace Schedules/index.php'">Ainda não é cadastrado? Cadastre-se</label>
                </div>

                <div class="typebox">
                    <label for="types" id="userType">
                        Tipo de usuário:
                        <select name="types" id="types">
                            <option value="empresa">Empresa</option>
                            <option value="admin">Administrador</option>
                        </select>
                    </label>
                </div>

                <button type="submit" id="cadastrar" name="cadastrar"> Entrar</button>
            </div>
        </form>

        </div>
    </section>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
</body>

</html>