<?php
require 'dbcon.php';
?>
<!doctype html>
<html lang="pt-BR">
  <head>
  
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <title>Detalhes do usuário</title>
</head>
<body>

    <div class="container mt-5">

        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h4>Dados do usuário
                            <a href="index.php" class="btn btn-danger float-end">VOLTAR</a>
                        </h4>
                    </div>
                    <div class="card-body">

                        <?php
                        if(isset($_GET['id']))
                        {
                            $cadastro_id = mysqli_real_escape_string($con, $_GET['id']);
                            $query = "SELECT * FROM cadastro WHERE id='$cadastro_id' ";
                            $query_run = mysqli_query($con, $query);

                            if(mysqli_num_rows($query_run) > 0)
                            {
                                $cadastro = mysqli_fetch_array($query_run);
                                ?>
                                
                                    <div class="mb-3">
                                        <label>Usuario</label>
                                        <p class="form-control">
                                            <?=$cadastro['usuario'];?>
                                        </p>
                                    </div>
                                    <div class="mb-3">
                                        <label>Email</label>
                                        <p class="form-control">
                                            <?=$cadastro['email'];?>
                                        </p>
                                    </div>
                                    <div class="mb-3">
                                        <label>Senha</label>
                                        <p class="form-control">
                                            <?=$cadastro['senha'];?>
                                        </p>
                                    </div>
                                    <div class="mb-3">
                                        <label>Tipo de usuário</label>
                                        <p class="form-control">
                                            <?=$cadastro['usertype'];?>
                                        </p>
                                    </div>

                                <?php
                            }
                            else
                            {
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