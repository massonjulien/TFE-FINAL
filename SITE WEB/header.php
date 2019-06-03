<?php
session_start();

if(!empty($_POST)){
    $action = $_POST['action'];
    switch($action){
      case 'login' :
        $_SESSION['isConnected'] = true;
        $_SESSION['dataAccount'] = json_decode($_POST['dataAccount'], true);
        break;
      case 'logoff' :
        session_unset();
    }
}



?>
