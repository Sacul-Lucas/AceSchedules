<?php
session_start();
require 'dbcon.php';
?>

<!doctype html>
<html lang="pt-BR">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://kit.fontawesome.com/e768c9bedf.js" crossorigin="anonymous"></script>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="css.css" rel="stylesheet">
    <script>
        function dragNdrop(event){
            
        }
        function drag(){  
            //enquanto estiver arrastando ativará esta função que adicionara a seguinte classe
            document.getElementById('uploadFile').parentNode.className = "draging dragbox";
        }
        function drop(){
            document.getElementById('uploadFile').parentNode.className = 'dragBox';
        }
    </script>
    <title>Edição de sala</title>
</head>

<body>

    <div class="container mt-5">

        <?php include('message.php'); ?>

        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h4>Editar sala
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
                                <form action="code.php" method="POST" enctype = "multipart/form-data">
                                    <input type="hidden" name="id" value="<?= $sala['id']; ?>">

                                    <div class="mb-3">
                                        <label>Nome da sala</label>
                                        <input type="text" name="nome" value="<?= $sala['nome']; ?>" class="form-control">
                                    </div>
                                    <div class="mb-3">
                                        <label>Capacidade</label>
                                        <input type="number" name="capacidade" value="<?= $sala['capacidade']; ?>" class="form-control">
                                    </div>
                                    <div class="container">
                                            <h3>Enviar imagem</h3>
                                            <div class="drag-area">
                                            <div class="icon">
                                                <i class="fas fa-images"></i>
                                            </div>
                                            <span class="header">Arrastar & soltar </span>
                                            <span class="header"> ou <span class="button"> procurar </span></span>
                                            <span class="support">Tipos acceitos: JPEG, JPG, PNG </span>
                                        </div>
                                        <div class="mb-3">
                                    <input class="input-img" accept="image/*" type="file" id="img" name="img" placeholder="Img nome"  hidden>
                                    <div class="mb-3">
                                        <label>Bloquear sala</label>
                                        <input type="hidden" name="status" value="0">
                                        <input type="checkbox" name="status" value="1" <?php echo ($sala['status'] == 1) ? 'checked' : ''; ?>>
                                    </div>

                                    <div class="mb-3">
                                        <button type="submit" name="update_sala" class="btn btn-primary">
                                            Atualizar sala
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
    <script type="text/javascript" src="js.js"></script>                    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>