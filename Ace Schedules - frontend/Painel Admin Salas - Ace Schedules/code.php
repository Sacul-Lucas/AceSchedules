<?php
session_start();
require 'dbcon.php';
include ('dbcon.php');

if(isset($_POST['delete_sala'])) {
    $sala_id = $_POST['delete_sala'];

    $pdo = new PDO('mysql:host=localhost;dbname=aceschedule', 'root', '');
    
    // Obtenha o nome da imagem antes de deletar o registro
    $stmt = $pdo->prepare('SELECT img FROM salas WHERE id = :id');
    $stmt->bindValue(':id', $sala_id);
    $stmt->execute();
    $old_image = $stmt->fetchColumn();

    $query = "DELETE FROM salas WHERE id = :id";
    $stmt = $pdo->prepare($query);
    $stmt->bindValue(':id', $sala_id);
    $stmt->execute();

    if ($stmt->rowCount()) {       
        // Delete a imagem do diretório
        if (!empty($old_image) && file_exists('../ajax/img_salas/'.$old_image)) {
            if (unlink('../ajax/img_salas/'.$old_image)) {
                $_SESSION['message'] = "Sala excluída com sucesso";
            } else {
                $_SESSION['message'] = "Sala excluída, mas houve um erro ao deletar a imagem";
            }
        } else {
            $_SESSION['message'] = "Sala excluída com sucesso";
        }
        
    } else {
        $_SESSION['message'] = "Não foi possível excluir a sala";
    }

    header("Location: index.php");
    exit();
}

if(isset($_POST['update_sala'])) {   
    $sala_id = $_POST['id'];
    $name = isset($_POST['nome']) ? $_POST['nome'] : null;
    $capacidade = isset($_POST['capacidade']) ? $_POST['capacidade'] : null;
    $file_name = isset($_FILES['img']['name']) ? $_FILES['img']['name'] : null;
    $tempname = isset($_FILES['img']['tmp_name']) ? $_FILES['img']['tmp_name'] : null;
    $folder = '../ajax/img_salas/'.$file_name;
    $status = isset($_POST['status']) && $_POST['status'] == '1' ? TRUE : FALSE;  // Captura correta do valor do checkbox
    
    $pdo = new PDO('mysql:host=localhost;dbname=aceschedule', 'root', '');

    // Se uma nova imagem foi enviada, deletar a imagem antiga
    if (!empty($file_name)) {
        $stmt_old_img = $pdo->prepare("SELECT img FROM salas WHERE id = :id");
        $stmt_old_img->bindValue(':id', $sala_id);
        $stmt_old_img->execute();
        $old_img = $stmt_old_img->fetchColumn();

        $checkbox_value = !empty($_POST['ele3'])?$_POST['ele3']:0;

        if ($old_img && file_exists('../Painel - Ace Schedules/img_salas/' . $old_img)) {
            unlink('../Painel - Ace Schedules/img_salas/' . $old_img);
        }
    }

    $fields = [];
    
    if (!empty($name)) {
        $fields[] = "nome = :na";
    }

    if (!empty($capacidade)) {
        $fields[] = "capacidade = :cap";
    }

    if (!empty($file_name)) {
        $fields[] = "img = :im";
    }

    $fields[] = "status = :status";  // Sempre incluir o campo status

    if (!empty($fields)) {
        $update_query = "UPDATE salas SET " . implode(", ", $fields) . " WHERE id = :id";
        $stmt = $pdo->prepare($update_query);
        
        if (!empty($name)) {
            $stmt->bindValue(':na', $name);
        }
        
        if (!empty($capacidade)) {
            $stmt->bindValue(':cap', $capacidade);
        }
        
        if (!empty($file_name)) {
            $stmt->bindValue(':im', $file_name);
        }

        $stmt->bindValue(':status', $status);
        $stmt->bindValue(':id', $sala_id);
        $stmt->execute();

        if (!empty($file_name) && move_uploaded_file($tempname, $folder)) {
            echo "<h2>File uploaded successfully</h2>";
        } elseif (!empty($file_name)) {
            echo "<h2>File not uploaded</h2>";
        }
        
        $_SESSION['message'] = "Sala atualizada com sucesso";
    } else {
        $_SESSION['message'] = "Sala não foi atualizada.";
    }
}


if(isset($_POST['save_salas'])) {

    $name = $_POST['nome'];
    $capacidade = $_POST['capacidade'];
    $file_name = $_FILES ['img']['name'];
    $tempname = $_FILES['img']['tmp_name'];
    $folder = '../Painel - Ace Schedules/img_salas/'.$file_name;  

    if (!empty($name) && !empty($capacidade) && !empty($file_name)) {
        $pdo = new PDO('mysql:host=localhost;dbname=aceschedule', 'root', '');
        $stmt = $pdo->prepare('INSERT INTO salas (nome,capacidade,img) VALUES (:na,:cap,:im)');
        $stmt->bindValue(':na', $name);
        $stmt->bindValue(':cap', $capacidade);
        $stmt->bindValue(':im', $file_name);

        if(move_uploaded_file($tempname,$folder)) {
            echo "<h2>File uploaded successfully</h2>";
        }else {
            echo "<h2>File not uploaded</h2>";
        }

        $stmt->execute(); 
    }
}
header('Location: index.php');
exit();



//------------------------------------------------------------------------------------------------------------------------