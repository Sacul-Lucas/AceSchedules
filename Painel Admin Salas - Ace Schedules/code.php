<?php
session_start();
require 'dbcon.php'; // Certifique-se de que o arquivo dbcon.php está configurado corretamente com suas credenciais de banco de dados

// Função para validar e limpar dados
function sanitize($input) {
    return htmlspecialchars(strip_tags($input));
}

try {
    $pdo = new PDO('mysql:host=localhost;dbname=aceschedule', 'root', ''); // Substitua com suas próprias credenciais
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die('Connection failed: ' . $e->getMessage());
}

// Adicionar
if (isset($_POST['save'])) {
    $name = sanitize($_POST['nome']);
    $capacidade = sanitize($_POST['capacidade']);

    // Verificar se o arquivo foi enviado
    $file_name = isset($_FILES['img']['name']) ? $_FILES['img']['name'] : '';
    $tempname = isset($_FILES['img']['tmp_name']) ? $_FILES['img']['tmp_name'] : '';
    $folder = '../Painel - Ace Schedules/img_salas/'.$file_name;

    $response = [];

    if (empty($name) || empty($capacidade) || empty($file_name)) {
        $response = [
            'status' => 422,
            'message' => 'Preencha todos os campos'
        ];
    } else {
        if (file_exists($folder)) {
            $response = [
                'status' => 409,
                'message' => 'A imagem já existe'
            ];
        } else {
            try {
                $stmt = $pdo->prepare('INSERT INTO salas (nome, capacidade, img) VALUES (:na, :cap, :im)');
                $stmt->bindParam(':na', $name);
                $stmt->bindParam(':cap', $capacidade);
                $stmt->bindParam(':im', $file_name);

                if (move_uploaded_file($tempname, $folder)) {
                    $stmt->execute();
                    $response = [
                        'status' => 200,
                        'message' => 'Sala adicionada com sucesso'
                    ];
                } else {
                    $response = [
                        'status' => 500,
                        'message' => 'Erro ao enviar o arquivo'
                    ];
                }
            } catch(PDOException $e) {
                $response = [
                    'status' => 500,
                    'message' => 'Erro ao adicionar a sala: ' . $e->getMessage()
                ];
            }
        }
    }

    echo json_encode($response);
    exit();
}

if (isset($_POST['update'])) {
    $id = sanitize($_POST['id']);
    $name = sanitize($_POST['nome']);
    $capacidade = sanitize($_POST['capacidade']);
    $status = isset($_POST['status']);

    // Verificar se o arquivo foi enviado
    $file_name = isset($_FILES['img']['name']) ? $_FILES['img']['name'] : '';
    $tempname = isset($_FILES['img']['tmp_name']) ? $_FILES['img']['tmp_name'] : '';
    $folder = '../Painel - Ace Schedules/img_salas/'.$file_name;

    try {
        if (!empty($file_name)) {
            // Verificar a imagem antiga
            $stmt_old_img = $pdo->prepare("SELECT img FROM salas WHERE id = :id");
            $stmt_old_img->bindValue(':id', $id);
            $stmt_old_img->execute();
            $old_img = $stmt_old_img->fetchColumn();

            if ($old_img && file_exists('../Painel - Ace Schedules/img_salas/' . $old_img)) {
                unlink('../Painel - Ace Schedules/img_salas/' . $old_img);
            }

            // Atualizar imagem
            if (move_uploaded_file($tempname, $folder)) {
                $update_query = "UPDATE salas SET nome = :na, capacidade = :cap, img = :im, status = :status WHERE id = :id";
                $stmt = $pdo->prepare($update_query);
                $stmt->bindParam(':na', $name);
                $stmt->bindParam(':cap', $capacidade);
                $stmt->bindParam(':im', $file_name);
                $stmt->bindParam(':status', $status);
                $stmt->bindParam(':id', $id);
                $stmt->execute();

                echo json_encode(['status' => 200, 'message' => "Sala atualizada com sucesso"]);
            } else {
                echo json_encode(['status' => 500, 'message' => "Erro ao enviar o arquivo"]);
            }
        } else {
            // Atualizar sem imagem
            $update_query = "UPDATE salas SET nome = :na, capacidade = :cap, status = :status WHERE id = :id";
            $stmt = $pdo->prepare($update_query);
            $stmt->bindParam(':na', $name);
            $stmt->bindParam(':cap', $capacidade);
            $stmt->bindParam(':status', $status);
            $stmt->bindParam(':id', $id);
            $stmt->execute();

            echo json_encode(['status' => 200, 'message' => "Sala atualizada com sucesso"]);
        }
    } catch(PDOException $e) {
        echo json_encode(['status' => 500, 'message' => "Erro ao atualizar a sala: " . $e->getMessage()]);
    }
    exit();
}

// Visualizar
if (isset($_GET['id'])) {
    $id = sanitize($_GET['id']);

    try {
        $stmt = $pdo->prepare("SELECT * FROM salas WHERE id = :id");
        $stmt->bindValue(':id', $id);
        $stmt->execute();
        $sala = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($sala) {
            // Adicione o caminho completo da imagem
            $sala['img'] = $sala['img'] ? '' . $sala['img'] : ''; // Atualize este caminho
            $response = [
                'status' => 200,
                'message' => 'Sala encontrada',
                'data' => $sala
            ];
        } else {
            $response = [
                'status' => 404,
                'message' => 'Sala não encontrada'
            ];
        }
    } catch(PDOException $e) {
        $response = [
            'status' => 500,
            'message' => 'Erro ao encontrar a sala: ' . $e->getMessage()
        ];
    }

    echo json_encode($response);
    exit();
}

// Deletar
if (isset($_POST['delete'])) {
    $id = sanitize($_POST['id']);

    try {
        $stmt = $pdo->prepare('SELECT img FROM salas WHERE id = :id');
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $old_image = $stmt->fetchColumn();

        $delete_query = "DELETE FROM salas WHERE id = :id";
        $stmt = $pdo->prepare($delete_query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        if ($stmt->rowCount()) {
            if (!empty($old_image) && file_exists('../Painel - Ace Schedules/img_salas/' . $old_image)) {
                unlink('../Painel - Ace Schedules/img_salas/' . $old_image);
            }
            $response = [
                'status' => 200,
                'message' => "Sala excluída com sucesso"
            ];
        } else {
            $response = [
                'status' => 500,
                'message' => "Não foi possível excluir a sala"
            ];
        }
    } catch(PDOException $e) {
        $response = [
            'status' => 500,
            'message' => "Erro ao excluir a sala: " . $e->getMessage()
        ];
    }

    header('Content-Type: application/json');
    echo json_encode($response);
    exit();
}
?>