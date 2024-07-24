<?php
require 'dbcon.php';

$nome_sala = isset($_GET['filter_nome']) ? $_GET['filter_nome'] : '';
$capacidade = isset($_GET['filter_capacidade']) ? $_GET['filter_capacidade'] : '';
$apenas_bloqueadas = isset($_GET['apenas_bloqueadas']) && $_GET['apenas_bloqueadas'] == 'true';

$sql = "SELECT id, nome, capacidade, status FROM salas WHERE 1=1";
$sqlTotal = "SELECT COUNT(*) AS total FROM salas WHERE 1=1";
$sqlBloqueadas = "SELECT COUNT(*) AS bloqueadas FROM salas WHERE status = 1";

$types = "";
$params = [];

if (!empty($nome_sala)) {
    $sql .= " AND nome LIKE ?";
    $sqlTotal .= " AND nome LIKE ?";
    $sqlBloqueadas .= " AND nome LIKE ?";
    $params[] = "%$nome_sala%";
    $types .= "s";
}

if (!empty($capacidade)) {
    $sql .= " AND capacidade = ?";
    $sqlTotal .= " AND capacidade = ?";
    $sqlBloqueadas .= " AND capacidade = ?";
    $params[] = $capacidade;
    $types .= "i";
}

if ($apenas_bloqueadas) {
    $sql .= " AND status = 1";
    $sqlTotal .= " AND status = 1";
}

$stmt = $con->prepare($sql);
$stmtTotal = $con->prepare($sqlTotal);
$stmtBloqueadas = $con->prepare($sqlBloqueadas);

if ($stmt === false || $stmtTotal === false || $stmtBloqueadas === false) {
    error_log('MySQL Error: ' . $con->error);
    die('Prepare failed: ' . htmlspecialchars($con->error));
}

if (!empty($params)) {
    $stmt->bind_param($types, ...$params);
    $stmtTotal->bind_param($types, ...$params);
    $stmtBloqueadas->bind_param($types, ...$params);
}

$stmt->execute();
$result = $stmt->get_result();

$stmtTotal->execute();
$resultTotal = $stmtTotal->get_result();
$total = $resultTotal->fetch_assoc()['total'];

$stmtBloqueadas->execute();
$resultBloqueadas = $stmtBloqueadas->get_result();
$bloqueadas = $resultBloqueadas->fetch_assoc()['bloqueadas'];

$html = '';
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $nomeEstilo = ($row['status'] == 1) ? 'style="color:red;"' : '';
        $html .= "<tr>
                    <td>".$row['id']."</td>
                    <td $nomeEstilo>".$row['nome']."</td>
                    <td>".$row['capacidade']."</td>
                    <td>
                        <button type='button' data-id='".$row['id']."' class='viewBtn btn btn-info btn-sm'>View</button>
                        <button type='button' data-id='".$row['id']."' class='editBtn btn btn-success btn-sm'>Edit</button>
                        <button type='button' data-id='".$row['id']."' class='deleteBtn btn btn-danger btn-sm'>Delete</button>
                    </td>
                </tr>";
    }
} else {
    $html .= "<tr><td colspan='4'>Nenhuma sala encontrada.</td></tr>";
}

$response = [
    'html' => $html,
    'total' => $total,
    'bloqueadas' => $bloqueadas
];

echo json_encode($response);

$stmt->close();
$stmtTotal->close();
$stmtBloqueadas->close();
$con->close();
?>