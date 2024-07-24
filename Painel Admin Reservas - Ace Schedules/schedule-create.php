<?php
session_start();
require 'dbcon.php';
include ('dbcon.php');

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
                        <label> Escolher sala da reserva:</label>
	                                    <select name="sala" class="form-control" required>
                                            <option value="">--Selecione a sala que deseja alocar para a reserva--
                                            <?php $sql = "SELECT id,nome FROM salas";$result = $con->query($sql); if ($result->num_rows > 0) {
                                                    // Output dos dados de cada linha
                                                        while($row = $result->fetch_assoc()) {
                                                            echo '<option value="' . $row["id"] . '">' . $row["nome"] . '</option>';
                                                            //Caso o dado da capacidade virar string colocar o contrabarra e em seguida a aspas simples, igual no nome    
                                                        }
                                                    } else {
                                                        echo "<option value=''>Nenhuma sala encontrada</option>";
                                                    }?>
                                            </option>
                                        </select>
                            <div class="mb-3">
                                <label>Data</label>
                                <input type="date" name="dataAgendamento" class="form-control" Required>
                            </div>
                            <div class= "mb-3">
                            <label>Horário</label>
	                        <input id="horaAgendamento" type="time" value="" name="horaAgendamento">
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