<?php
require 'dbcon.php';

$salaId = isset($_GET['sala_id']) ? intval($_GET['sala_id']) : '';
$data = isset($_GET['data']) ? $_GET['data'] : '';
$nome = isset($_GET['nome']) ? $_GET['nome'] : '';
$status = isset($_GET['status']) ? intval($_GET['status']) : 0;

$sql = "SELECT r.id, DATE_FORMAT(r.dataAgendamento, '%d/%m/%Y') as dataAgendamento, r.periodo, s.nome AS sala_nome, c.usuario AS usuario
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
if ($nome) {
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

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>" . $row['id'] . "</td>
                <td>" . $row['dataAgendamento'] . "</td>
                <td>" . htmlspecialchars($row['periodo'], ENT_QUOTES, 'UTF-8') . "</td>
                <td>" . $row['sala_nome'] . "</td>
                <td>" . $row['usuario'] . "</td>
                <td>";
        if ($status == 0) {
            echo "<a href='schedule-view.php?id=" . $row['id'] . "' class='btn btn-info btn-sm'>Visualizar</a>
                <button class='btn btn-success btn-sm approve-btn' data-id='" . $row['id'] . "'>Aprovar</button>
                <form action='code.php' method='POST' class='d-inline'>
                <button type='submit' name='delete_schedule' value='" . $row['id'] . "' class='btn btn-danger btn-sm'>Rejeitar</button>
                </form>                    
            </td>
          </tr>";
        } else {
            echo "<a href='schedule-view.php?id=" . $row['id'] . "' class='btn btn-info btn-sm'>Visualizar</a>
                  <a href='schedule-edit.php?id=" . $row['id'] . "' class='btn btn-success btn-sm'>Editar</a>
                  <form action='code.php' method='POST' class='d-inline'>
                  <button type='submit' name='delete_schedule' value='" . $row['id'] . "' class='btn btn-danger btn-sm'>Cancelar reserva</button>
                  </form>
                </td>
              </tr>";
        }
    }
} else {
    echo "<tr><td colspan='6'>Nenhuma reserva encontrada.</td></tr>";
}

$stmt->close();
$con->close();
?>