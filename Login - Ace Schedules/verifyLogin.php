<?php

include('conexao.php');

$email = mysqli_real_escape_string($mysqli, trim($_POST['email']));
$usuario = mysqli_real_escape_string($mysqli, trim($_POST['usuario']));
$senha = mysqli_real_escape_string($mysqli, trim($_POST['senha']));

$sql = "SELECT * FROM cadastro WHERE email = '$email' OR usuario = '$email' AND senha = '$senha'";
$result = mysqli_query($mysqli, $sql);
$row = mysqli_fetch_assoc($result);

if (mysqli_num_rows($result) > 0) {

    if ($senha == $row['senha'] && ($email == $row['email'] || $email == $row['usuario'])) {

        if (!isset($_SESSION)) {
            session_start();
        }

        $_SESSION['id'] = $row['id'];
        $_SESSION['email'] = $row['email'];
        $_SESSION['usuario'] = $row['usuario'];
        $_SESSION['usertype'] = $row['usertype']; // Adicionando o campo usertype à sessão

        // Código para exibir mensagem de sucesso e redirecionamento
        echo "<head>
              <script src='https://cdn.jsdelivr.net/npm/sweetalert2@11.7.32/dist/sweetalert2.all.min.js'></script>
              <link href='https://cdn.jsdelivr.net/npm/sweetalert2@11.7.32/dist/sweetalert2.min.css' rel='stylesheet'>
          </head>
          <body>
              <script>
                  Swal.fire({
                      icon: 'success',
                      title: 'Pronto!',
                      text: 'Login realizado com sucesso',
                  }).then(function() {
                      window.location = '/AceSchedules/Ace Schedules - frontend/Painel - Ace Schedules/painel.php';
                  });
              </script> 
          </body>
        ";
        exit;
    }
} else {
    // Código para exibir mensagem de erro e redirecionamento
    echo "<head>
            <script src='https://cdn.jsdelivr.net/npm/sweetalert2@11.7.32/dist/sweetalert2.all.min.js'></script>
            <link href='https://cdn.jsdelivr.net/npm/sweetalert2@11.7.32/dist/sweetalert2.min.css' rel='stylesheet'>
        </head>
        <body>
            <script>
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Email, senha e/ou tipo de usuário incorretos',
                }).then(function() {
                    window.location = 'LoginAgenda.php';
                });
            </script> 
        </body>
    ";
    exit;
}
?>