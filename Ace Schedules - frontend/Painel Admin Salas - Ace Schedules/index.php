<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel Administrador de Salas</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        $(document).ready(function () {
            function updateCounts() {
                var nome_sala = $('#nome_sala').val();
                var capacidade = $('#capacidade').val();
                var apenasBloqueadas = $('#apenas_bloqueadas').is(':checked');

                $.ajax({
                    url: 'get_salas.php',
                    type: 'GET',
                    data: {
                        nome_sala: nome_sala,
                        capacidade: capacidade,
                        apenas_bloqueadas: apenasBloqueadas
                    },
                    success: function (data) {
                        var response = JSON.parse(data);
                        $('#total_salas').text(response.total);
                        $('#bloqueadas_salas').text(response.bloqueadas);
                        $('#salas tbody').html(response.html);

                        // Esconder ou mostrar a quantidade de salas conforme o estado do checkbox
                        if (apenasBloqueadas) {
                            $('#quantidade_salas_text').hide();
                        } else {
                            $('#quantidade_salas_text').show();
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error(error);
                    }
                });
            }

            $('#nome_sala, #capacidade, #apenas_bloqueadas').on('change keyup', function () {
                updateCounts();
            });

            updateCounts();
        });
    </script>
</head>

<body>
    <div class="container mt-4">
        <?php include('message.php'); ?>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h4>
                            <span id="quantidade_salas_text">Quantidade de Salas: (<span id="total_salas">0</span>) ; </span> Salas bloqueadas: (<span id="bloqueadas_salas">0</span>)
                            <a href="schedule-create.php" class="btn btn-primary float-end">Adicionar Sala</a>
                            <a href="/AceSchedules/Ace Schedules - frontend/Painel Admin Usuário - Ace Schedules/index.php"
                                class="btn btn-primary float-end" style="margin-right:2%">Administração de usuários</a>
                            <a href="/AceSchedules/Ace Schedules - frontend/Painel Admin Reservas - Ace Schedules/index.php"
                                class="btn btn-primary float-end" style="margin-right:2%">Administração de reservas</a>
                            <div class="form-group" style="display: -webkit-box; margin-top: 2vh;">
                                <label style="font-size: 1rem;" for="nome_sala">Nome da sala:</label>
                                <input style="font-size: 1rem; margin-left: 4px;" type="text" id="nome_sala"
                                    name="nome_sala" autocomplete="OFF">
                                <label style="font-size: 1rem; margin-left: 1vw;" for="capacidade">Capacidade da
                                    sala:</label>
                                <input style="font-size: 1rem; margin-left: 4px;" type="number" id="capacidade"
                                    name="capacidade" autocomplete="OFF">
                                <label style="font-size: 1rem; margin-left: 1vw;">
                                    <input type="checkbox" id="apenas_bloqueadas" name="apenas_bloqueadas"> Mostrar apenas
                                    bloqueadas
                                </label>
                            </div>
                        </h4>
                    </div>
                    <div class="card-body">
                        <table class="table table-bordered table-striped" id="salas">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome da Sala</th>
                                    <th>Capacidade</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- As salas serão carregadas aqui -->
                            </tbody>
                        </table>
                    </div>
                </div>
                <a class="funcenviar" href="/AceSchedules/Ace Schedules - frontend/Painel - Ace Schedules/painel.php"
                    style="margin-right:2%;left: auto;top: 20px;text-decoration: none;width: 100%;position: relative;display: inline-block;overflow: hidden;font-size: 1.875rem;font-weight: 600;background-color: white;">Painel de
                    salas</a>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>