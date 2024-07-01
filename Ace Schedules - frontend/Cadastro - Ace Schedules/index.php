<!DOCTYPE html>
<html lang="pt-br">

<head>
    <link rel="stylesheet" href="index.css">
    <title>Ace Schedule</title>
    <link rel="icon" type="image/x-icon" href="https://cdn-icons-png.flaticon.com/512/9131/9131529.png">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Incluir SweetAlert2 para feedback -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.7.32/dist/sweetalert2.all.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11.7.32/dist/sweetalert2.min.css" rel="stylesheet">

    <!-- Incluir InputMask.js para máscara de entrada -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/imask/6.1.0/imask.min.js"></script>

</head>

<body>
    <div class="Cadastro-img">
        <img id="logoETPC" src="img/Logo_etpc.png">
    </div>
    <section>
        <form class="form-box" id="inputCadastro" method="POST" action="cadastrar.php">
            <div class="form-value">
                <h2>Cadastro</h2>
                <div class="inputbox">
                    <input type="text" id="usuario" name="usuario" placeholder="Insira o nome da Empresa" required>
                    <label for="usuario">Empresa/Usuário</label>
                </div>
                <div class="inputbox">
                    <input type="email" id="email" name="email" placeholder="Insira o seu email" required>
                    <label for="email">Email</label>
                </div>
                <div class="inputbox">
                    <input type="password" id="senha" name="senha" placeholder="Insira a sua senha" required>
                    <label for="senha">Senha</label>
                </div>
                <div class="inputbox">
                    <input type="text" id="tel" name="tel" placeholder="Insira o seu telefone" required>
                    <label for="tel">Número de telefone</label>
                </div>
                <div class="inputbox">
                    <input type="text" id="cnpj" name="cnpj" placeholder="Insira o CNPJ da empresa" required>
                    <label for="cnpj">CNPJ</label>
                </div>
                <button type="submit" id="cadastrar" name="cadastrar">Cadastrar</button>
            </div>
        </form>
    </section>

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

</body>

</html>