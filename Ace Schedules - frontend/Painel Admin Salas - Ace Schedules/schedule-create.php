<?php
session_start();
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
    <title>Criar sala</title>
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
</head>
<body>
  
    <div class="container mt-5">

        <?php include('message.php'); ?>

        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h4>Adicionar sala
                            <a href="index.php" class="btn btn-danger float-end">VOLTAR</a>
                        </h4>
                    </div>
                    <div class="card-body">
                        <form action="code.php" method="POST" enctype = "multipart/form-data">
                        <div class="mb-3">
                                <label>Nome da Sala</label>
                                <input class="form-control" type="text" id="nome" name="nome" placeholder="Nome sala" autocomplete="off" required>
                            </div>
                            <div class="mb-3">
                                <label>Capacidade</label>
                                <input class="form-control" type="number"  id="capacidade" name="capacidade" placeholder="Texto capacidade" autocomplete="off" required>
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
                           <input class="input-img" accept="image/*" type="file" id="img" name="img" placeholder="Img nome"  hidden required>
                            </div>
                            <div class="mb-3">
                                <button type="submit" name="save_salas" class="btn btn-primary">Salvar sala</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <script type="text/javascript" src="js.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>