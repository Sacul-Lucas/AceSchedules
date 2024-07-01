<?php
require 'dbcon.php';

$salaId = isset($_GET['sala_id']) ? intval($_GET['sala_id']) : '';
$data = isset($_GET['data']) ? $_GET['data'] : '';
$hora = isset($_GET['hora']) ? $_GET['hora'] : '';
$nome = isset($_GET['nome']) ? $_GET['nome'] : '';
$status = isset($_GET['status']) ? intval($_GET['status']) : 0;

$sql = "SELECT r.id, DATE_FORMAT(r.dataAgendamento, '%d/%m/%Y') as dataAgendamento, r.horaAgendamento, s.nome AS sala_nome, c.usuario AS usuario
        FROM reservas r
        JOIN salas s ON r.sala = s.id
        JOIN cadastro c ON r.usuario = c.id
        WHERE r.status = ?";

$params = [$status];
$types = "i";

if ($salaId) {
    $sql .= " AND r.sala = ?";
    $params[] = $salaId;
    $types .= "i";
}
if ($data) {
    $sql .= " AND r.dataAgendamento = ?";
    $params[] = date('Y-m-d', strtotime(str_replace('/', '-', $data)));
    $types .= "s";
}
if ($hora) {
    $sql .= " AND r.horaAgendamento = ?";
    $params[] = $hora;
    $types .= "s";
}
if ($nome) {
    // Ajuste para correspondência exata do nome do usuário
    $sql .= " AND c.usuario LIKE ?";
    $params[] = "%$nome%";
    $types .= "s";
}

$stmt = $con->prepare($sql);

if ($stmt === false) {
    error_log('MySQL Error: ' . $con->error);
    die('Prepare failed: ' . htmlspecialchars($con->error));
}

$stmt->bind_param($types, ...$params);
$stmt->execute();
$result = $stmt->get_result();

$reservas = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $reservas[] = $row;
    }
}

$stmt->close();

// Contagem de reservas com os filtros aplicados
$sqlCount = "SELECT COUNT(*) AS count FROM reservas r
             JOIN cadastro c ON r.usuario = c.id
             WHERE r.status = ?";

if ($salaId) {
    $sqlCount .= " AND r.sala = ?";
}
if ($data) {
    $sqlCount .= " AND r.dataAgendamento = ?";
}
if ($hora) {
    $sqlCount .= " AND r.horaAgendamento = ?";
}
if ($nome) {
    // Ajuste para correspondência exata do nome do usuário
    $sqlCount .= " AND c.usuario LIKE ?";
}

$stmtCount = $con->prepare($sqlCount);

if ($stmtCount === false) {
    error_log('MySQL Error: ' . $con->error);
    die('Prepare failed: ' . htmlspecialchars($con->error));
}

$paramsCount = [$status];
$typesCount = "i";

if ($salaId) {
    $paramsCount[] = $salaId;
    $typesCount .= "i";
}
if ($data) {
    $paramsCount[] = date('Y-m-d', strtotime(str_replace('/', '-', $data)));
    $typesCount .= "s";
}
if ($hora) {
    $paramsCount[] = $hora;
    $typesCount .= "s";
}
if ($nome) {
    $paramsCount[] = "%$nome%";
    $typesCount .= "s";
}

$stmtCount->bind_param($typesCount, ...$paramsCount);
$stmtCount->execute();
$resultCount = $stmtCount->get_result();
$count = $resultCount->fetch_assoc()['count'];

$stmtCount->close();
$con->close();

$html = '';
if (empty($reservas)) {
    $html = "<tr><td colspan='5'>Nenhuma reserva encontrada</td></tr>";
} else {
    foreach ($reservas as $row) {
        $html .= "<tr>
                    <td>" . $row['id'] . "</td>
                    <td>" . $row['dataAgendamento'] . "</td>
                    <td>" . ($row['horaAgendamento']) . "</td>
                    <td>" . $row['sala_nome'] . "</td>
                    <td>" . $row['usuario'] . "</td>
                    <td>";
        if ($status == 0) {
            $html .= "<a href='schedule-view.php?id=" . $row['id'] . "' class='btn btn-info btn-sm'>Visualizar</a>
                    <button class='btn btn-success btn-sm approve-btn' data-id='" . $row['id'] . "'>Aprovar</button>
                    <form action='code.php' method='POST' class='d-inline'>
                    <button type='submit' name='delete_schedule' value='" . $row['id'] . "' class='btn btn-danger btn-sm'>Rejeitar</button>
                    </form>                    
                </td>
              </tr>";
        } else {
            $html .= "<a href='schedule-view.php?id=" . $row['id'] . "' class='btn btn-info btn-sm'>Visualizar</a>
                      <a href='schedule-edit.php?id=" . $row['id'] . "' class='btn btn-success btn-sm'>Editar</a>
                      <form action='code.php' method='POST' class='d-inline'>
                      <button type='submit' name='delete_schedule' value='" . $row['id'] . "' class='btn btn-danger btn-sm'>Cancelar reserva</button>
                      </form>
                    </td>
                  </tr>";
        }
    }
}

echo json_encode(['html' => $html, 'count' => $count]);
?>