<?php
session_start(); // Inicia a sessão para usar $_SESSION

// Verificar se o formulário foi submetido
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Recuperar dados do formulário
    $dataAgendamento = $_POST['dataAgendamento'];
    $horaAgendamento = $_POST['horaAgendamento'];
    $horaAgendamento .= ":00";
    $nome_sala = $_POST['nome_sala'];
    $nome_usuario = $_POST['usuario'];

    // Verificar se todos os campos estão preenchidos
    if (!empty($dataAgendamento) && !empty($nome_usuario) && !empty($horaAgendamento) && !empty($nome_sala)) {
        try {
            // Conectar ao banco de dados usando PDO
            $pdo = new PDO('mysql:host=localhost;dbname=aceschedule', 'root', '');
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Preparar e executar a inserção
            $stmt = $pdo->prepare('INSERT INTO reservas (dataAgendamento, horaAgendamento, sala, usuario) VALUES (:da, :ho, :sa, :us)');
            $stmt->bindValue(':da', $dataAgendamento);
            $stmt->bindValue(':ho', $horaAgendamento);
            $stmt->bindValue(':sa', $nome_sala);
            $stmt->bindValue(':us', $nome_usuario);
            
            if ($stmt->execute()) {
                $_SESSION['message'] = "Agendamento cadastrado com sucesso!";
            } else {
                $_SESSION['message'] = "Agendamento não cadastrado";
            }
        } catch (PDOException $e) {
            // Log do erro (em uma aplicação real, não mostre o erro diretamente ao usuário)
            error_log($e->getMessage());
            $_SESSION['message'] = "Erro ao cadastrar o agendamento: " . $e->getMessage();
        }
    } else {
        $_SESSION['message'] = "Todos os campos são obrigatórios.";
    }
} else {
    // Se o método de requisição não for POST, redirecionar para a página de criação de agendamentos
    $_SESSION['message'] = "Método de requisição inválido para processar o agendamento.";
}

// Após processar o formulário, redirecione para painel.php
header("Location: painel.php");
exit();
?>