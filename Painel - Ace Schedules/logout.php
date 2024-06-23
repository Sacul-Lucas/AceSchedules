<?php

include("tconect.php");

if (isset($_GET['logout'])) {
    session_destroy();
    unset($_SESSION['usuario']);
    header('location: /AceSchedules/Login - Ace Schedules/LoginAgenda.php');
}
