<?php
session_start();
include("conexao.php");

$email = mysqli_real_escape_string($mysqli, trim($_POST['email']));
$usuario = mysqli_real_escape_string($mysqli, trim($_POST['usuario']));
$senha = mysqli_real_escape_string($mysqli, trim($_POST['senha']));
$telefone = mysqli_real_escape_string($mysqli, trim($_POST['tel']));
$cnpj = mysqli_real_escape_string($mysqli, trim($_POST['cnpj']));

$sql = "SELECT COUNT(*) AS total FROM cadastro WHERE email = '$email'";
$result = mysqli_query($mysqli, $sql);
$row = mysqli_fetch_assoc($result);

if ($row['total'] > 0) {
    $_SESSION['nome_existe'] = true;
    echo "<head>
            <script src='https://cdn.jsdelivr.net/npm/sweetalert2@11.7.32/dist/sweetalert2.all.min.js'></script>
            <link href='https://cdn.jsdelivr.net/npm/sweetalert2@11.7.32/dist/sweetalert2.min.css' rel='stylesheet'>
          </head>
          <body>
                <script>
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Email já cadastrado',
                    }).then(function() {
                        window.location = 'index.php';
                    });
                </script> 
          </body>";
    exit;
} else {
    $_SESSION['nome_existe'] = false;
    $sql = "INSERT INTO cadastro (email, usuario, senha, usertype, telefone, cnpj) VALUES ('$email', '$usuario', '$senha', 'Empresa', '$telefone', '$cnpj')";

    if ($mysqli->query($sql) === TRUE) {
        $_SESSION['status_cadastro'] = true;
    }

    $mysqli->close();

    echo "<head>
            <script src='https://cdn.jsdelivr.net/npm/sweetalert2@11.7.32/dist/sweetalert2.all.min.js'></script>
            <link href='https://cdn.jsdelivr.net/npm/sweetalert2@11.7.32/dist/sweetalert2.min.css' rel='stylesheet'>
          </head>
          <body>
                <script>
                    Swal.fire({
                        icon: 'success',
                        title: 'Pronto!',
                        text: 'Usuário cadastrado com sucesso',
                    }).then(function() {
                        window.location = '/AceSchedules/Ace Schedules - frontend/Login - Ace Schedules/LoginAgenda.php';
                    });
                </script> 
          </body>";
    exit;
}
?>