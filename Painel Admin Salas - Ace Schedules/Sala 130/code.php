<?php
session_start();
require 'dbcon.php';
include ('dbcon.php');

if(isset($_POST['delete_schedule']))
{
    
    $agendamento_id = mysqli_real_escape_string($con, $_POST['delete_schedule']);

    $query = "DELETE FROM sala4 WHERE id='$agendamento_id'";

    $query_run = mysqli_query($con, $query);


    if($query_run)
    {       
        $_SESSION['message'] = "Agendamento excluído com sucesso";
        header("Location: index.php");
        exit(0);
    }
    else
    {
        $_SESSION['message'] = "Não foi possivel excluir o agendamento";
        header("Location: index.php");
        exit(0);
    }
}

if(isset($_POST['update_schedule']))
{
    $agendamento_id = mysqli_real_escape_string($con, $_POST['agendamento_id']);
    
    $idSala4 = mysqli_real_escape_string($con, $_POST['idSala4']);
    $dataAgendamento = mysqli_real_escape_string($con, $_POST['dataAgendamento']);
    $periodo = mysqli_real_escape_string($con, $_POST['periodo']);    
   

    $query = "UPDATE sala4 SET idSala4='$idSala4', dataAgendamento='$dataAgendamento', periodo='$periodo' WHERE id='$agendamento_id' ";
    $query_run = mysqli_query($con, $query);

    if($query_run)
    {
        $_SESSION['message'] = "Agendamento atualizado com sucesso";
        header("Location: index.php");
        exit(0);
    }
    else
    {
        $_SESSION['message'] = "Agendamento não atualizado";
        header("Location: index.php");
        exit(0);
    }

}


if(isset($_POST['save_schedule']))
{
    $agendamento_id = mysqli_real_escape_string($con, $_POST['agendamento_id']);
    $dataAgendamento = mysqli_real_escape_string($con, $_POST['dataAgendamento']);
    $periodo = mysqli_real_escape_string($con, $_POST['periodo']);    
    $idSala4 = mysqli_real_escape_string($con, $_POST['idSala4']);
    

    $query = "INSERT INTO sala4 (id,idSala4,dataAgendamento,periodo) VALUES ('$agendamento_id','$idSala4','$dataAgendamento','$periodo')";

    $query_run = mysqli_query($con, $query);
    if($query_run)
    {
        $_SESSION['message'] = "Agendamento cadastrado com sucesso!";
        header("Location: schedule-create.php");
        exit(0);
    }
    else
    {
        $_SESSION['message'] = "Agendamento não cadastrado";
        header("Location: schedule-create.php");
        exit(0);
    }
}



//------------------------------------------------------------------------------------------------------------------------