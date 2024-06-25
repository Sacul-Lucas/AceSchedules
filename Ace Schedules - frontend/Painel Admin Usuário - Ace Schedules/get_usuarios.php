<?php
require 'dbcon.php';

$usertype = isset($_GET['user_type']) ? $_GET['user_type'] : '';
$email = isset($_GET['email']) ? $_GET['email'] : '';
$nome = isset($_GET['nome']) ? $_GET['nome'] : '';

$sql = "SELECT id, usuario, email, senha, usertype FROM cadastro WHERE 1=1";

$types = "";
$params = [];

if (!empty($usertype) && $usertype != "--Tipo de usuário--") {
    $sql .= " AND usertype = ?";
    $params[] = $usertype;
    $types .= "s";
}
if (!empty($email)) {
    $sql .= " AND email LIKE ?";
    $params[] = "%$email%";
    $types .= "s";
}
if (!empty($nome)) {
    $sql .= " AND usuario LIKE ?";
    $params[] = "%$nome%";
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
                <td>" . $row['id'] . "</td>
                <td>" . $row['usuario'] . "</td>
                <td>" . $row['email'] . "</td>
                <td>" . $row['senha'] . "</td>
                <td>" . $row['usertype'] . "</td>

                <td>
                    <a href= 'student-view.php?id= ".$row['id']."'  class='btn btn-info btn-sm'>Visualizar</a>
                    <a href='student-edit.php?id= ".$row['id']." ' class='btn btn-success btn-sm'>Editar</a>
                    <form action='code.php' method='POST' class='d-inline'>
                        <button type='submit' name='delete_cadastro' value='".$row['id']."' class='btn btn-danger btn-sm'>Deletar</button>
                    </form>
                </td>
            </tr>";
    }
} else {
    echo "<tr><td colspan='5'>Nenhum usuario encontrado.</td></tr>";
}

$stmt->close();
$con->close();
?>