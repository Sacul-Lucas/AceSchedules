<?php
require 'dbcon.php';

$usertype = isset($_GET['user_type']) ? $_GET['user_type'] : '';
$email = isset($_GET['email']) ? $_GET['email'] : '';
$nome = isset($_GET['nome']) ? $_GET['nome'] : '';

$sql = "SELECT id, usuario, email, senha, usertype FROM cadastro WHERE 1=1";
$sqlTotal = "SELECT COUNT(*) AS total FROM cadastro WHERE 1=1";

$types = "";
$params = [];

if (!empty($usertype) && $usertype != "---Todos---") {
    $sql .= " AND usertype = ?";
    $sqlTotal .= " AND usertype = ?";
    $params[] = $usertype;
    $types .= "s";
}
if (!empty($email)) {
    $sql .= " AND email LIKE ?";
    $sqlTotal .= " AND email LIKE ?";
    $params[] = "%$email%";
    $types .= "s";
}
if (!empty($nome)) {
    $sql .= " AND usuario LIKE ?";
    $sqlTotal .= " AND usuario LIKE ?";
    $params[] = "%$nome%";
    $types .= "s";
}

$stmt = $con->prepare($sql);
$stmtTotal = $con->prepare($sqlTotal);

if ($stmt === false || $stmtTotal === false) {
    error_log('MySQL Error: ' . $con->error);
    die('Prepare failed: ' . htmlspecialchars($con->error));
}

if (!empty($params)) {
    $stmt->bind_param($types, ...$params);
    $stmtTotal->bind_param($types, ...$params);
}

$stmt->execute();
$result = $stmt->get_result();

$stmtTotal->execute();
$resultTotal = $stmtTotal->get_result();
$total = $resultTotal->fetch_assoc()['total'];

$html = '';
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $html .= "<tr>
                    <td>".$row['id']."</td>
                    <td>".$row['usuario']."</td>
                    <td>".$row['email']."</td>
                    <td>".$row['senha']."</td>
                    <td>".$row['usertype']."</td>
                    <td>
                        <button type='button' value='".$row['id']."' class='viewBtn btn btn-info btn-sm'>View</button>
                        <button type='button' value='".$row['id']."' class='editBtn btn btn-success btn-sm'>Edit</button>
                        <button type='button' value='".$row['id']."' class='deleteBtn btn btn-danger btn-sm'>Delete</button>
                    </td>
                </tr>";
    }
} else {
    $html .= "<tr><td colspan='6'>Nenhum usuário encontrado.</td></tr>";
}

$response = [
    'html' => $html,
    'total' => $total
];

echo json_encode($response);

$stmt->close();
$stmtTotal->close();
$con->close();
?>