<?php

include("tconect.php");

if(isset($_GET['logout'])) {
    session_destroy();
    unset($_SESSION['usuario']);
    header('location:http://localhost/AceSchedules/Login%20-%20Ace%20Schedules/LoginAgenda.php');
}

?>