<?php
session_start();
require 'dbcon.php';
include ('dbcon.php');

if(isset($_POST['delete_cadastro']))
{
    
    $cadastro_id = mysqli_real_escape_string($con, $_POST['delete_cadastro']);

    $query = "DELETE FROM cadastro WHERE id='$cadastro_id' ";

    $query_run = mysqli_query($con, $query);


    if($query_run)
    {       
        $_SESSION['message'] = "Usuário excluído com sucesso";
        header("Location: index.php");
        exit(0);
    }
    else
    {
        $_SESSION['message'] = "Não foi possivel excluir o usuário";
        header("Location: index.php");
        exit(0);
    }
}

if(isset($_POST['update_cadastro']))
{
    $cadastro_id = mysqli_real_escape_string($con, $_POST['cadastro_id']);

    $usuario = mysqli_real_escape_string($con, $_POST['usuario']);
    $email = mysqli_real_escape_string($con, $_POST['email']);
    $senha = mysqli_real_escape_string($con, $_POST['senha']);
    $usertype = mysqli_real_escape_string($con, $_POST['types']);
   

    $query = "UPDATE cadastro SET usuario='$usuario', email='$email', senha='$senha', usertype='$usertype' WHERE id='$cadastro_id' ";
    $query_run = mysqli_query($con, $query);

    if($query_run)
    {
        $_SESSION['message'] = "Usuário atualizado com sucesso";
        header("Location: index.php");
        exit(0);
    }
    else
    {
        $_SESSION['message'] = "Usuário não atualizado";
        header("Location: index.php");
        exit(0);
    }

}


if(isset($_POST['save_cadastro']))
{
    $usuario = mysqli_real_escape_string($con, $_POST['usuario']);
    $email = mysqli_real_escape_string($con, $_POST['email']);
    $senha = mysqli_real_escape_string($con, $_POST['senha']);
    $usertype = mysqli_real_escape_string($con, $_POST['types']);
    

    $query = "INSERT INTO cadastro (usuario,email,senha,usertype) VALUES ('$usuario','$email','$senha','$usertype')";

    $query_run = mysqli_query($con, $query);
    if($query_run)
    {
        $_SESSION['message'] = "Usuário cadastrado com sucesso!";
        header("Location: student-create.php");
        exit(0);
    }
    else
    {
        $_SESSION['message'] = "Usuário não cadastrado";
        header("Location: student-create.php");
        exit(0);
    }
}



//------------------------------------------------------------------------------------------------------------------------