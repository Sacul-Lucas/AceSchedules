<?php
require 'dbcon.php';

if (isset($_POST['id'])) {
    $id = intval($_POST['id']);
    
    $sql = "UPDATE reservas SET status = 1 WHERE id = ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("i", $id);
    
    if ($stmt->execute()) {
        session_start();
        echo "success";
    } else {
        echo "error";
    }

    $stmt->close();
    $con->close();
} else {
    echo "invalid";
}
?>