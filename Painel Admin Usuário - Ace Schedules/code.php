<?php

require 'dbcon.php';

if (isset($_POST['save_User'])) {
    $usuario = mysqli_real_escape_string($con, trim($_POST['usuario']));
    $email = mysqli_real_escape_string($con, trim($_POST['email']));
    $senha = mysqli_real_escape_string($con, trim($_POST['senha']));
    $usertype = mysqli_real_escape_string($con, $_POST['userType']);
    $telefone = mysqli_real_escape_string($con, trim($_POST['tel']));
    $cnpj = mysqli_real_escape_string($con, trim($_POST['cnpj']));

    if ($usuario == NULL || $email == NULL || $senha == NULL || $usertype == NULL || $telefone == NULL || $cnpj == NULL) {
        $res = [
            'status' => 422,
            'message' => 'Preencha todos os campos'
        ];
        echo json_encode($res);
        return;
    }

    // Verificar se o telefone já existe
    $tel_query = "SELECT * FROM cadastro WHERE telefone='$telefone'";
    $tel_query_run = mysqli_query($con, $tel_query);
    if (mysqli_num_rows($tel_query_run) > 0) {
        $res = [
            'status' => 422,
            'message' => 'O telefone já está cadastrado'
        ];
        echo json_encode($res);
        return;
    }

    // Verificar se o CNPJ já existe
    $cnpj_query = "SELECT * FROM cadastro WHERE cnpj='$cnpj'";
    $cnpj_query_run = mysqli_query($con, $cnpj_query);
    if (mysqli_num_rows($cnpj_query_run) > 0) {
        $res = [
            'status' => 422,
            'message' => 'O CNPJ já está cadastrado'
        ];
        echo json_encode($res);
        return;
    }

    $query = "INSERT INTO cadastro (usuario, email, senha, userType, telefone, cnpj) VALUES ('$usuario', '$email', '$senha', '$usertype', '$telefone', '$cnpj')";
    $query_run = mysqli_query($con, $query);

    if ($query_run) {
        $res = [
            'status' => 200,
            'message' => 'Usuário criado com sucesso'
        ];
        echo json_encode($res);
        return;
    } else {
        $res = [
            'status' => 500,
            'message' => 'Falha ao criar usuário'
        ];
        echo json_encode($res);
        return;
    }
}


if (isset($_POST['update_User'])) {
    $id = mysqli_real_escape_string($con, $_POST['id']);

    $usuario = mysqli_real_escape_string($con, trim($_POST['usuario']));
    $email = mysqli_real_escape_string($con, trim($_POST['email']));
    $senha = mysqli_real_escape_string($con, trim($_POST['senha']));
    $usertype = mysqli_real_escape_string($con, $_POST['userType']);
    $telefone = mysqli_real_escape_string($con, trim($_POST['tel']));
    $cnpj = mysqli_real_escape_string($con, trim($_POST['cnpj']));

    if ($usuario == NULL || $email == NULL || $senha == NULL || $usertype == NULL || $telefone == NULL || $cnpj == NULL) {
        $res = [
            'status' => 422,
            'message' => 'Preencha todos os campos vazios'
        ];
        echo json_encode($res);
        return;
    }

    // Verificar se o telefone já existe para outro usuário
    $tel_query = "SELECT * FROM cadastro WHERE telefone='$telefone' AND id != '$id'";
    $tel_query_run = mysqli_query($con, $tel_query);
    if (mysqli_num_rows($tel_query_run) > 0) {
        $res = [
            'status' => 422,
            'message' => 'O telefone já está cadastrado para outro usuário'
        ];
        echo json_encode($res);
        return;
    }

    // Verificar se o CNPJ já existe para outro usuário
    $cnpj_query = "SELECT * FROM cadastro WHERE cnpj='$cnpj' AND id != '$id'";
    $cnpj_query_run = mysqli_query($con, $cnpj_query);
    if (mysqli_num_rows($cnpj_query_run) > 0) {
        $res = [
            'status' => 422,
            'message' => 'O CNPJ já está cadastrado para outro usuário'
        ];
        echo json_encode($res);
        return;
    }

    $query = "UPDATE cadastro SET usuario='$usuario', email='$email', senha='$senha', usertype='$usertype', telefone='$telefone', cnpj='$cnpj' WHERE id='$id'";
    $query_run = mysqli_query($con, $query);

    if ($query_run) {
        $res = [
            'status' => 200,
            'message' => 'Usuário atualizado com sucesso'
        ];
        echo json_encode($res);
        return;
    } else {
        $res = [
            'status' => 500,
            'message' => 'Usuário não foi atualizado'
        ];
        echo json_encode($res);
        return;
    }
}


if(isset($_GET['id'])) {
    $id = mysqli_real_escape_string($con, $_GET['id']);

    $query = "SELECT * FROM cadastro WHERE id='$id'";
    $query_run = mysqli_query($con, $query);

    if(mysqli_num_rows($query_run) == 1)
    {
        $User = mysqli_fetch_array($query_run);

        $res = [
            'status' => 200,
            'message' => 'id do usuário foi salvo com sucesso',
            'data' => $User
        ];
        echo json_encode($res);
        return;
    }
    else
    {
        $res = [
            'status' => 404,
            'message' => 'id do usuário não foi encontrado'
        ];
        echo json_encode($res);
        return;
    }
}

if(isset($_POST['delete']))
{
    $id = mysqli_real_escape_string($con, $_POST['id']);

    $query = "DELETE FROM cadastro WHERE id='$id'";
    $query_run = mysqli_query($con, $query);

    if($query_run)
    {
        $res = [
            'status' => 200,
            'message' => 'usuário deletado com sucesso'
        ];
        echo json_encode($res);
        return;
    }
    else
    {
        $res = [
            'status' => 500,
            'message' => 'não foi possível deletar o usuário'
        ];
        echo json_encode($res);
        return;
    }
}

?>

