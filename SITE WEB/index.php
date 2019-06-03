<?php require "header.php"; ?>
<!DOCTYPE html>
<html>
<head>
<title>Olitot - Acceuil</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel='stylesheet' type='text/css' href='./CSS/index.css'>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <script src="./JS/index.js"></script>
</head>
<body>
<div id="container">
  <div class="header">
    Olitot
  </div>

  <div class="row">
    <div class="topnav" id="myTopnav">
      <div class="topnavCentered">
        <div id='INC_Search' class='containerSearch'>
          <img class='menuImg' src='./IMG/unselectedSearch.png' alt="search">
        </div>
        <?php
        if(isset($_SESSION['isConnected'])){
          echo "<div id='INC_Orders' class='containerSearch'>
            <img class='menuImg' src='./IMG/unselectedCommande.png' alt='orders'>
          </div>";
          echo "<div id='INC_Adverts' class='containerSearch'>
            <img class='menuImg' src='./IMG/unselectedPoster.png' alt='adverts'>
          </div>";
          echo "<div id='INC_Address' class='containerSearch'>
            <img class='menuImg' src='./IMG/unselectedHome.png' alt='address'>
          </div>";
          echo "<div id='INC_Connexion' class='containerSearch'>
            <img class='menuImg' src='./IMG/unselectedProfil.png' alt='search'>
          </div>";
        } else {
          echo "<div id='INC_Connexion' class='containerSearch'>
            <img class='menuImg' src='./IMG/unselectedProfil.png' alt='search'>
          </div>";
        }
      ?>

      </div>
  </div>

    <div id="main" class="col-6 col-s-9">
    </div>


  </div>

  <div class="footer">
    <p>© 2019 - Olitot</p>
  </div>
</div>
</body>
</html>
