<?php
session_start();
include("tconect.php");

$dataAgendamento = mysqli_real_escape_string($conexao, trim($_POST['dataAgendamento']));
$periodo = mysqli_real_escape_string($conexao, trim($_POST['periodo']));
$id = $_SESSION['id'];

$idSala4 = 'Sala130';

$sql = "select count(*) as total from sala4 where dataAgendamento = '$dataAgendamento'";
$result = mysqli_query($conexao, $sql);
$row = mysqli_fetch_assoc($result);

if($row['total'] == 1) {
	$_SESSION['data-exixte'] = true;
	$_SESSION['idSala4'] = false;
	echo"<head>
	        <script src='https://cdn.jsdelivr.net/npm/sweetalert2@11.7.32/dist/sweetalert2.all.min.js'></script>
	        <link href='https://cdn.jsdelivr.net/npm/sweetalert2@11.7.32/dist/sweetalert2.min.css' rel='stylesheet'>
        </head>
    <body>
	    <script>
		    Swal.fire({
			    icon: 'error',
			    title: 'Oops...',
			    text: 'Data indisponível',
		    }).then(function() {
			    window.location = 'painel.php';
		    });
	    </script> 
    </body>
    ";
    exit;
	  
} else{
	$_SESSION['data-exixte'] = false;
	$_SESSION['idSala4'] = true;
	$sql = "INSERT INTO sala4 (id, dataAgendamento, periodo, idSala4) VALUES ('$id', '$dataAgendamento', '$periodo', '$idSala4')";

    if($conexao->query($sql) === TRUE) {
	    $_SESSION['status_data'] = true;
    }

    $conexao->close();
	echo"<head>
	        <script src='https://cdn.jsdelivr.net/npm/sweetalert2@11.7.32/dist/sweetalert2.all.min.js'></script>
	        <link href='https://cdn.jsdelivr.net/npm/sweetalert2@11.7.32/dist/sweetalert2.min.css' rel='stylesheet'>
        </head>
    <body>
	    <script>
		    Swal.fire({
			    icon: 'success',
			    title: 'Pronto!',
			    text: 'Pedido de agendamento realizado com sucesso',
		    }).then(function() {
			    window.location = 'painel.php';
		    });
	    </script> 
    </body>
    ";
    exit;
}
