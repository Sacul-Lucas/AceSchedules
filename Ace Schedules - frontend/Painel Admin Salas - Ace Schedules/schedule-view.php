<?php
require 'dbcon.php';
?>
<!doctype html>
<html lang="pt-BR">

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">


    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <title>Detalhes da sala</title>
</head>

<body>

    <div class="container mt-5">

        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h4>Dados do agendamento
                            <a href="index.php" class="btn btn-danger float-end">VOLTAR</a>
                        </h4>
                    </div>
                    <div class="card-body">

                        <?php
                        if (isset($_GET['id'])) {
                            $sala_id = mysqli_real_escape_string($con, $_GET['id']);
                            $query = "SELECT * FROM salas WHERE id='$sala_id' ";
                            $query_run = mysqli_query($con, $query);

                            if (mysqli_num_rows($query_run) > 0) {
                                $sala = mysqli_fetch_array($query_run);
                        ?>

                                <div class="mb-3">
                                    <label>Id</label>
                                    <p class="form-control">
                                        <?= $sala['id']; ?>
                                    </p>
                                </div>
                                <div class="mb-3">
                                    <label>Nome da sala</label>
                                    <p class="form-control">
                                        <?= $sala['nome']; ?>
                                    </p>
                                </div>
                                <div class="mb-3">
                                    <label>Capacidade </label>
                                    <p class="form-control">
                                        <?= $sala['capacidade']; ?>
                                    </p>
                                </div>
                                <div class="mb-3">
                                    <p class="form-control">
                                        <?= $sala['img']; 
                                         echo '<div  style="background-image:url(../ajax/img_salas/'.$sala["img"].')"'?>
                                    </p>
                                </div>
                          <!---      <div style="background-image:url(..="" ajax="" img_salas="" robloxscreenshot20240203_164936849.png;=""> ;width: 50px;height: 50px;"       --->                               <p></p>
                                </div>
                        <?php
                            } else {
                                echo "<h4>Nenhum ID encontrado</h4>";
                            }
                        }
                        ?>
                    </div>
                </div>
                <?php  echo '<center><div class="modelo" idcard="' . $sala["id"]. '" style="background-image: url(../ajax/img_salas/'.$sala["img"].');width: 250px;height: 400px;display: inline-block;border-radius: 10px;padding: 15px 25px;box-sizing: border-box;cursor: pointer;margin: 10px 15px;background-position: center;background-size: cover;transition-duration: 0.5s;margin-top: 50px;margin-left: 40px;"" onclick="abrirModal(' . $sala["id"]. ', \'' . $sala["nome"]. '\', ' . $sala["capacidade"]. ')"><h5 style="color:#edb700;font-size: 2vw;font-weight: 700;margin-top: 10px;text-align: center;" >' . $sala["nome"]. '</h5></div></center>'; ?>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>