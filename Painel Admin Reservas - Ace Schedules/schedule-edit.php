<?php
session_start();
require 'dbcon.php';

$sql = "SELECT nome FROM salas";
$result = $con->query($sql);

?>

<!doctype html>
<html lang="pt-BR">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <title>Edição de agendamento</title>
</head>

<body>

    <div class="container mt-5">

        <?php include('message.php'); ?>

        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h4>Editar agendamento **Mude apenas o necessário**
                            <a href="index.php" class="btn btn-danger float-end">VOLTAR</a>
                        </h4>
                    </div>
                    <div class="card-body">

                        <?php
                        if (isset($_GET['id'])) {
                            $agendamento_id = mysqli_real_escape_string($con, $_GET['id']);
                            $query = "SELECT * FROM reservas WHERE id='$agendamento_id' ";
                            $query_run = mysqli_query($con, $query);

                            if (mysqli_num_rows($query_run) > 0) {
                                $agendamento = mysqli_fetch_array($query_run);
                        ?>
                                <form action="code.php" method="POST">
                                <input type="hidden" name="id" value="<?= $agendamento['id']; ?>">

                                    <div class="mb-3">
                                    <label>Mudar sala alocada</label>
	                                    <select name="sala" class="form-control" >
                                        <?php $sql = "SELECT id,nome FROM salas"; 
                                        $result = $con->query($sql); if ($result->num_rows > 0) { 
                                            echo "<option value=".$agendamento['sala'].">--Selecione a sala que deseja alocar para a reserva--"; 
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
                                    </div>
                                    <div class="mb-3">
                                        <label>Data do agendamento</label>
                                        <input type="date" name="dataAgendamento" value="<?= $agendamento['dataAgendamento']; ?>" class="form-control">
                                    </div>
                                    <div class= "mb-3">
	                                    <label for=""> Período</label>
	                                    <select name="periodo" ><?php 
                                      echo "<option value=".$agendamento['periodo'].">--Selecione o período--</option>"?>
                                            <option value="Manha">Manhã</option>
                                            <option value="Tarde">Tarde</option>
                                            <option value="Noite">Noite</option>
                                        </select>
                                    </div>

                                    <div class="mb-3">
                                        <button type="submit" name="update_schedule" class="btn btn-primary">
                                            Atualizar agendamento
                                        </button>
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

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>