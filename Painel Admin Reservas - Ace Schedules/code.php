<?php
session_start();
require 'dbcon.php';

if (isset($_POST['save'])) {
    // Recuperar dados do formulário
    $dataAgendamento = $_POST['dataAgendamento'];
    $horaAgendamento = $_POST['horaAgendamento'];
    $horaAgendamento .= ":00";
    $nome_sala = $_POST['sala'];

    // Verificar se todos os campos estão preenchidos
    if (!empty($dataAgendamento) && !empty($horaAgendamento) && !empty($nome_sala)) {
        try {
            // Conectar ao banco de dados usando PDO
            $pdo = new PDO('mysql:host=localhost;dbname=aceschedule', 'root', '');
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Preparar e executar a inserção
            $stmt = $pdo->prepare('INSERT INTO reservas (dataAgendamento, horaAgendamento, sala, status) VALUES (:da, :ho, :sa, :st)');
            $stmt->bindValue(':da', $dataAgendamento);
            $stmt->bindValue(':ho', $horaAgendamento);
            $stmt->bindValue(':sa', $nome_sala);
            $stmt->bindValue(':st', 1, PDO::PARAM_INT);

            if ($stmt->execute()) {
                $res = [
                    'status' => 200,
                    'message' => 'Agendamento cadastrado com sucesso!'
                ];
            } else {
                $res = [
                    'status' => 500,
                    'message' => 'Agendamento não cadastrado'
                ];
            }
        } catch (PDOException $e) {
            error_log($e->getMessage());
            $res = [
                'status' => 500,
                'message' => 'Erro ao cadastrar o agendamento: ' . $e->getMessage()
            ];
        }
    } else {
        $res = [
            'status' => 422,
            'message' => 'Todos os campos são obrigatórios.'
        ];
    }
    echo json_encode($res);
    exit(0);
}

if (isset($_POST['update'])) {
    $reserva_id = mysqli_real_escape_string($con, $_POST['id']);
    $sala_nome = $_POST['sala'];
    $dataAgendamento = mysqli_real_escape_string($con, $_POST['data']);
    $horaAgendamento = mysqli_real_escape_string($con, $_POST['hora']);

    // Atualizar a reserva no banco de dados
    $query = "UPDATE reservas SET dataAgendamento='$dataAgendamento', horaAgendamento='$horaAgendamento', sala='$sala_nome' WHERE id='$reserva_id'";
    $query_run = mysqli_query($con, $query);

    if ($query_run) {
        $res = [
            'status' => 200,
            'message' => 'Reserva atualizada com sucesso'
        ];
    } else {
        $res = [
            'status' => 500,
            'message' => 'Reserva não foi atualizada'
        ];
    }
    echo json_encode($res);
    exit(0);
}

if (isset($_GET['id'])) {
    $id = mysqli_real_escape_string($con, $_GET['id']);

    // Ajustar a query SQL para buscar os valores necessários das três tabelas
    $query = "SELECT r.id, 
                     DATE_FORMAT(r.dataAgendamento, '%Y-%m-%d') as dataAgendamento, 
                     r.horaAgendamento, 
                     s.id AS sala_id,
                     s.nome AS sala_nome, 
                     c.usuario AS locador_nome, 
                     c.email, 
                     c.telefone, 
                     c.cnpj
              FROM reservas r
              JOIN salas s ON r.sala = s.id
              JOIN cadastro c ON r.usuario = c.id
              WHERE r.id = '$id'";

    $query_run = mysqli_query($con, $query);

    if ($query_run && mysqli_num_rows($query_run) == 1) {
        $User = mysqli_fetch_array($query_run, MYSQLI_ASSOC);

        // Obter a lista de salas
        $salas_query = "SELECT id, nome FROM salas";
        $salas_query_run = mysqli_query($con, $salas_query);

        $salas = [];
        while ($sala = mysqli_fetch_assoc($salas_query_run)) {
            $salas[] = $sala;
        }

        $res = [
            'status' => 200,
            'message' => 'id da reserva foi salvo com sucesso',
            'data' => $User,
            'salas' => $salas
        ];
        echo json_encode($res);
    } else {
        $res = [
            'status' => 404,
            'message' => 'id da reserva não foi encontrado'
        ];
        echo json_encode($res);
    }
    return;
}

if(isset($_POST['delete'])) {
    $id = mysqli_real_escape_string($con, $_POST['id']);

    $query = "DELETE FROM reservas WHERE id='$id'";
    $query_run = mysqli_query($con, $query);

    if($query_run)
    {
        $res = [
            'status' => 200,
            'message' => 'reserva deletada com sucesso'
        ];
        echo json_encode($res);
        return;
    }
    else
    {
        $res = [
            'status' => 500,
            'message' => 'não foi possível deletar a reserva'
        ];
        echo json_encode($res);
        return;
    }
}


//header('Location: index.php');
//exit();


//------------------------------------------------------------------------------------------------------------------------