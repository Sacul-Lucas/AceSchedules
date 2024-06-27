<?php
session_start();
require 'dbcon.php';
include ('dbcon.php');
require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if (isset($_POST['delete_schedule'])) {
    $reserva_id = mysqli_real_escape_string($con, $_POST['delete_schedule']);

    // Buscar informações da reserva
    $query_reserva = "SELECT * FROM reservas WHERE id='$reserva_id'";
    $result_reserva = mysqli_query($con, $query_reserva);

    if (mysqli_num_rows($result_reserva) > 0) {
        $reserva = mysqli_fetch_assoc($result_reserva);

        // Buscar remetente (ID 1 na tabela cadastro)
        $query_remetente = "SELECT email FROM cadastro WHERE id=1";
        $result_remetente = mysqli_query($con, $query_remetente);
        $remetente = mysqli_fetch_assoc($result_remetente)['email'];

        // Buscar destinatário (usuário associado à reserva)
        $id_destinatario = $reserva['usuario']; // Supondo que 'id_usuario' seja o campo na tabela reservas
        $query_destinatario = "SELECT email FROM cadastro WHERE id='$id_destinatario'";
        $result_destinatario = mysqli_query($con, $query_destinatario);
        $destinatario = mysqli_fetch_assoc($result_destinatario)['email'];

        // Apenas enviar o email se o status for igual a 0 (pendente)
        if ($reserva['status'] == 0) {
            // Verificar se o destinatário é diferente do remetente
            if ($destinatario != $remetente) {
                $mail = new PHPMailer(true);
                try {
                    // Configurações do servidor
                    $mail->isSMTP();
                    $mail->Host = 'smtp.gmail.com'; // Substitua pelo host SMTP do seu servidor de email
                    $mail->SMTPAuth = true;
                    $mail->Username = $remetente; // Substitua pelo seu email SMTP
                    $mail->Password = 'Doge123@'; // Substitua pela sua senha SMTP
                    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                    $mail->Port = 587; // Porta SMTP

                    // Remetente e destinatário
                    $mail->setFrom($remetente, 'ETPC');
                    $mail->addAddress($destinatario);

                    // Conteúdo do email
                    $mail->isHTML(true);
                    $mail->Subject = 'Reserva Rejeitada';
                    $mail->Body    = 'Sua reserva foi rejeitada.';

                    $mail->send();

                    // Email enviado com sucesso, agora deletar a reserva
                    $query = "DELETE FROM reservas WHERE id='$reserva_id'";
                    $query_run = mysqli_query($con, $query);

                    if ($query_run) {
                        $_SESSION['message'] = "Agendamento excluído com sucesso e email enviado.";
                        header("Location: index.php");
                        exit(0);
                    } else {
                        $_SESSION['message'] = "Erro ao excluir agendamento.";
                        header("Location: index.php");
                        exit(0);
                    }
                } catch (Exception $e) {
                    $_SESSION['message'] = "Erro ao enviar email: {$mail->ErrorInfo}";
                    header("Location: index.php");
                    exit(0);
                }
            } else {
                // Se destinatário é igual ao remetente, apenas deletar a reserva
                $query = "DELETE FROM reservas WHERE id='$reserva_id'";
                $query_run = mysqli_query($con, $query);

                if ($query_run) {
                    $_SESSION['message'] = "Agendamento excluído com sucesso (sem envio de email).";
                    header("Location: index.php");
                    exit(0);
                } else {
                    $_SESSION['message'] = "Erro ao excluir agendamento.";
                    header("Location: index.php");
                    exit(0);
                }
            }
        } else {
            // Se o status não for 0, apenas deletar a reserva sem enviar email
            $query = "DELETE FROM reservas WHERE id='$reserva_id'";
            $query_run = mysqli_query($con, $query);

            if ($query_run) {
                $_SESSION['message'] = "Agendamento excluído com sucesso.";
                header("Location: index.php");
                exit(0);
            } else {
                $_SESSION['message'] = "Erro ao excluir agendamento.";
                header("Location: index.php");
                exit(0);
            }
        }
    } else {
        $_SESSION['message'] = "Reserva não encontrada.";
        echo $destinatario;
        echo $remetente;
        header("Location: index.php");
        exit(0);
    }
}



if (isset($_POST['update_schedule'])) {
    $reserva_id = mysqli_real_escape_string($con, $_POST['id']);
    $sala_nome = $_POST['sala'];
    $dataAgendamento = mysqli_real_escape_string($con, $_POST['dataAgendamento']);
    $periodo = mysqli_real_escape_string($con, $_POST['periodo']);    

    // Atualizar a reserva no banco de dados
    $query = "UPDATE reservas SET dataAgendamento='$dataAgendamento', periodo='$periodo', sala='$sala_nome' WHERE id='$reserva_id'";
    $query_run = mysqli_query($con, $query);

    if ($query_run) {
        $_SESSION['message'] = "Agendamento atualizado com sucesso";
    } else {
        $_SESSION['message'] = "Erro ao atualizar agendamento.";
    }

    // Redirecionar de volta para a página inicial ou página de visualização de agendamentos
    header("Location: index.php");
    exit(0);
}


if (isset($_POST['save_schedule'])) {

    // Recuperar dados do formulário
    $dataAgendamento = $_POST['dataAgendamento'];
    $periodo = $_POST['periodo'];
    $nome_sala = $_POST['sala'];
    

    // Verificar se todos os campos estão preenchidos
    if (!empty($dataAgendamento) && !empty($periodo) && !empty($nome_sala)) {
        try {
            // Conectar ao banco de dados usando PDO
            $pdo = new PDO('mysql:host=localhost;dbname=aceschedule', 'root', '');
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Preparar e executar a inserção
            $stmt = $pdo->prepare('INSERT INTO reservas (dataAgendamento, periodo, sala, status) VALUES (:da, :pe, :sa, :st)');
            $stmt->bindValue(':da', $dataAgendamento);
            $stmt->bindValue(':pe', $periodo);
            $stmt->bindValue(':sa', $nome_sala);
            $stmt->bindValue(':st', 1, PDO::PARAM_INT);

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

    // Redirecionar para a página de criação de agendamentos
    header("Location: schedule-create.php");
    exit(0);
}
//header('Location: index.php');
//exit();


//------------------------------------------------------------------------------------------------------------------------