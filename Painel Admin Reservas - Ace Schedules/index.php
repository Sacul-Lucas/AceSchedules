<?php
require 'dbcon.php';
?>
<!doctype html>
<html lang="pt-BR">

<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<title>Painel Administrador</title>
</head>

<body>
<!-- Add modal -->
<div class="modal fade" id="AddModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add sala</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="add">
                <div class="modal-body">

                <div id="errorMessage" class="alert alert-warning d-none"></div>
                
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
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary">Salvar reserva</button>
                </div>
                </form>
            </div>
        </div>
    </div>
</div>
<!-- Editar modal -->
<div class="modal fade" id="EditModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Editar sala</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="update" method="POST">
                <div class="modal-body">
                    <div id="errorMessageUpdate" class="alert alert-warning d-none"></div>

                    <input type="hidden" name="id" id="id">

                    <div class="mb-3">
                        <label>Sala alocada</label>
                        <select name="sala" class="form-control">
                            <!-- Opções serão preenchidas pelo JavaScript -->
                        </select>
                    </div>
                    <div class="mb-3">
                        <label>Data do agendamento</label>
                        <input id="data" type="date" name="data" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label>Horário do agendamento</label>
                        <input id="hora" type="time" name="hora" class="form-control">
                    </div>

                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary">Atualizar reserva</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
<!-- Visualizar modal -->
<div class="modal fade" id="ViewModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Visualizar sala</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
                <div class="modal-body">

                    <div class="mb-3">
                        <label>Nome da sala alocada</label>
                        <p id="view_nome" class="form-control"></p>
                    </div>
                    <div class="mb-3">
                        <label>Data</label>
                        <p id="view_data" class="form-control"></p>
                    </div>
                    <div class="mb-3">
                        <label>Horario</label>
                        <p id="view_hora" class="form-control"></p>
                    </div>
                    <div class="mb-3">
                        <label>Locador da sala</label>
                        <p id="view_locador" class="form-control"></p>
                    </div>
                    <div class="mb-3">
                        <label>Email do locador</label>
                        <p id="view_email" class="form-control"></p>
                    </div>
                    <div class="mb-3">
                        <label>Contato do locador</label>
                        <p id="view_contato" class="form-control"></p>
                    </div>
                    <div class="mb-3">
                        <label>CNPJ do locador</label>
                        <p id="view_cnpj" class="form-control"></p>
                    </div>
                </div>
                <div class="modal-footer">
            </div>
        </div>
    </div>
</div>
<div class="container mt-4">
    <?php include('message.php'); ?>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <h4>Agendamentos pendentes (<span id="countPendente"><?= $countPendente ?></span>)
                        <a href="/AceSchedules/Ace Schedules - frontend/Painel Admin Usuário - Ace Schedules/index.php" class="btn btn-primary float-end" style="margin-right:2%">Administração de usuários</a>
                        <a href="/AceSchedules/Ace Schedules - frontend/Painel Admin Salas - Ace Schedules/index.php" class="btn btn-primary float-end" style="margin-right:2%">Administração de salas</a>
                    </h4>
                    <div style="display: -webkit-box">
                        Selecione a sala:
                        <select id="filter_sala" name="filter_sala" required>
                            <option value="">--Todas as salas--</option>
                            <?php
                            $sql = "SELECT id, nome FROM salas";
                            $result = $con->query($sql);
                            if ($result->num_rows > 0) {
                                while ($row = $result->fetch_assoc()) {
                                    echo '<option value="' . $row["id"] . '">' . $row["nome"] . '</option>';
                                }
                            } else {
                                echo "<option value=''>Nenhuma sala encontrada</option>";
                            }
                            ?>
                        </select>
                        <div class="form-group" style="margin-left: 1vw;">
                            <label for="data">Selecione a data:</label>
                            <input type="date" id="filter_data" name="filter_data">
                        </div>
                        <div class="form-group" style="margin-left: 1vw;">
                            <label for="hora">Selecione a hora:</label>
                            <input type="time" id="filter_hora" name="filter_hora">
                        </div>
                        <div class="form-group" style="margin-left: 1vw;">
                            <label for="nome">Nome do alocador:</label>
                            <input type="text" id="filter_nome" name="filter_nome" autocomplete="OFF">
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <table class="table table-bordered table-striped" id="reservas">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Data do agendamento</th>
                                <th>Hora do agendamento</th>
                                <th>Sala alocada</th>
                                <th>Nome do Alocador</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Reservas são carregadas aqui -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="container mt-4">
    <?php include('message.php'); ?>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <h4>Agendamentos aprovados (<span id="countAprovada"><?= $countAprovada ?></span>)
                    <button type="button" class="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#AddModal">Adicionar agendamento</button>
                    </h4>
                    <div style="display: -webkit-box">
                        Selecione a sala:
                        <select id="sala_aprov" name="sala_aprov" required>
                            <option value="">--Todas as salas--</option>
                            <?php
                            $sql = "SELECT id, nome FROM salas";
                            $result = $con->query($sql);
                            if ($result->num_rows > 0) {
                                while ($row = $result->fetch_assoc()) {
                                    echo '<option value="' . $row["id"] . '">' . $row["nome"] . '</option>';
                                }
                            } else {
                                echo "<option value=''>Nenhuma sala encontrada</option>";
                            }
                            ?>
                        </select>
                        <div class="form-group" style="margin-left: 1vw;">
                            <label for="data_aprov">Selecione a data:</label>
                            <input type="date" id="data_aprov" name="data">
                        </div>
                        <div class="form-group" style="margin-left: 1vw;">
                            <label for="hora_aprov">Selecione a hora:</label>
                            <input type="time" id="hora_aprov" name="hora">
                        </div>
                        <div class="form-group" style="margin-left: 1vw;">
                            <label for="nome_aprov">Nome do alocador:</label>
                            <input type="text" id="nome_aprov" name="nome" autocomplete="OFF">
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <table class="table table-bordered table-striped" id="reservas_aprov">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Data do agendamento</th>
                                <th>Hora do agendamento</th>
                                <th>Sala alocada</th>
                                <th>Nome do Alocador</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Reservas são carregadas aqui -->
                        </tbody>
                    </table>
                </div>
            </div>
            <a class="funcenviar" href="/AceSchedules/Ace Schedules - frontend/Painel - Ace Schedules/painel.php" style="margin-right:2%;left: auto;top: 20px;text-decoration: none;width: 100%;position: relative;display: inline-block;overflow: hidden;font-size: 1.875rem;font-weight: 600;background-color: white;">Painel de salas</a>
        </div>
    </div>
</div>
<script type="text/javascript" src="js.js"></script>           
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>