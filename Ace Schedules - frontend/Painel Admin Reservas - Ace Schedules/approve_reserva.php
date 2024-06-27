<?php
require 'dbcon.php';

if (isset($_POST['id'])) {
    $id = intval($_POST['id']);
    
    // Consulta para obter os emails do usuário remetente (ID 1) e do destinatário (usuário da reserva)
    $sql = "SELECT u1.email AS remetente, u2.email AS destinatario 
            FROM usuarios u1, reservas r 
            JOIN usuarios u2 ON r.user_id = u2.id
            WHERE u1.id = 1 AND r.id = ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $emails = $result->fetch_assoc();

    if ($emails && $emails['destinatario'] != $emails['remetente']) {
        // Atualizar o status da reserva para aprovada
        $sqlUpdate = "UPDATE reservas SET status = 1 WHERE id = ?";
        $stmtUpdate = $con->prepare($sqlUpdate);
        $stmtUpdate->bind_param("i", $id);

        if ($stmtUpdate->execute()) {
            // Enviar email de notificação
            $to = $emails['destinatario'];
            $subject = 'Reserva ETPC';
            $message = 'Sua reserva foi aprovada.';
            $headers = 'From: ' . $emails['remetente'] . "\r\n" .
                       'Reply-To: ' . $emails['remetente'] . "\r\n" .
                       'X-Mailer: PHP/' . phpversion();

            if (mail($to, $subject, $message, $headers)) {
                echo 'success';
            } else {
                echo 'Erro ao enviar email.';
            }
        } else {
            echo "error";
        }
        $stmtUpdate->close();
    } else {
        echo "invalid";
    }

    $stmt->close();
    $con->close();
} else {
    echo "invalid";
}
?>