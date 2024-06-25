<?php
require 'dbcon.php';

$nome_sala = isset($_GET['nome_sala']) ? $_GET['nome_sala'] : '';

$sql = "SELECT id, nome, capacidade FROM salas WHERE 1=1";

$types = "";
$params = [];

if (!empty($nome_sala)) {
    $sql .= " AND nome LIKE ?";
    $params[] = "%$nome_sala%";
    $types .= "s";
}

$stmt = $con->prepare($sql);

if ($stmt === false) {
    error_log('MySQL Error: ' . $con->error);
    die('Prepare failed: ' . htmlspecialchars($con->error));
}

if (!empty($params)) {
    $stmt->bind_param($types, ...$params);
}

$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>".$row['id']."</td>
                <td>".$row['nome']."</td>
                <td>".$row['capacidade']."</td>
                <td>
                    <a href='schedule-view.php?id=".$row['id']."' class='btn btn-info btn-sm'>Visualizar</a>
                    <a href='schedule-edit.php?id=".$row['id']."' class='btn btn-success btn-sm'>Editar</a>
                    <form action='code.php' method='POST' class='d-inline'>
                        <button type='submit' name='delete_sala' value='".$row['id']."' class='btn btn-danger btn-sm'>Deletar</button>
                    </form>
                </td>
              </tr>";
    }
} else {
    echo "<tr><td colspan='4'>Nenhuma sala encontrada.</td></tr>";
}

$stmt->close();
$con->close();
?>