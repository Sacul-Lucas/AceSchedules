<?php

include("tconect.php");

if (isset($_GET['logout'])) {
    session_destroy();
    unset($_SESSION['usuario']);
    header('location: /AceSchedules/Ace Schedules - frontend/Login - Ace Schedules/LoginAgenda.php');
}
