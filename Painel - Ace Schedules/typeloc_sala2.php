<?php
session_start();
include("tconect.php");

$dataAgendamento = mysqli_real_escape_string($conexao, trim($_POST['dataAgendamento']));
$periodo = mysqli_real_escape_string($conexao, trim($_POST['periodo']));
$id = $_SESSION['id'];
$idSala2 = 'Sala128';

$sql = "select count(*) as total from sala2 where dataAgendamento = '$dataAgendamento'";
$result = mysqli_query($conexao, $sql);
$row = mysqli_fetch_assoc($result);

if($row['total'] == 1) {
	$_SESSION['data-exixte'] = true;
	$_SESSION['idSala2'] = false;
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

	$sql = "INSERT INTO sala2 (id, dataAgendamento, periodo, idSala2) VALUES ('$id', '$dataAgendamento', '$periodo', '$idSala2')";

    if($conexao->query($sql) === TRUE) {
	    $_SESSION['status_data'] = true;
    }

	$_SESSION['idSala2'] = true;

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
