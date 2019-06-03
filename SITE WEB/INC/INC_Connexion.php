<?php
  require "../header.php";
  include "./functions/func.php";
?>
<script>
    $('.modal').hide();
    $('#loginButton').click(function(){
      if($('input[name=username]').val() != "" && $('input[name=password]').val() != ""){
        var data = {'action': 'testUser', 'email': $('input[name=username]').val(), 'password': $('input[name=password]').val()};
        var data = JSON.stringify(data);
        $.ajax({
           url : './DB/INC/postgres.php',
           type : 'POST',
           data : data,
           //data: ""
           success : function(output){ // code_html contient le HTML renvoyé
            responseJson = JSON.parse(output);
            if(output == "false"){
              $('#notCorrectLogs').text("Email ou mot de passe incorrect.")
            } else {
              $.ajax({
                 url : 'header.php',
                 type : 'POST',
                 data : "action=login&dataAccount="+JSON.stringify(responseJson[0]),
              });
              location.reload();
            }
           }
        });

      } else {
        $('#notCorrectLogs').text("Champ email ou mot de passe vide");
      }
    });

    $('#logoffButton').click(function(){
      $.ajax({
         url : 'header.php',
         type : 'POST',
         data : "action=logoff",
      });
      location.reload();
    });

    $('.info').click(function(){
      var x = $(this).attr('class');
      x = x.split(' ');
      x = x[0];
      if(x == 'phone'){
        $('#modalPhone').show();
      } else if(x == 'password'){
        $('#modalPassword').show();
      }
    });

    $('.modal-cancel').click(function(){
      $('.modal').hide();
    });

    $('#registerButton').click(function(){
        $('#main').load("./INC/INC_Register.php");
    });
</script>
<div id="error">
</div>

  <?php
    if(isset($_SESSION['isConnected'])){
      $rateSrc = imgRate($_SESSION['dataAccount']['rate']);
      echo '<div class="connected">
              <img class="profileimg" src="'.$_SESSION['dataAccount']['profilepicture'].'" alt="pictureprofile"><br>
              <img class="rateImg" src="./IMG/'.$rateSrc.'.jpg" alt='.$rateSrc.'><br>
              <hr>
              <div class="info">
                <div class="labelInfo">
                  Email
                </div>
                <div class="dataInfo">
                  '.$_SESSION['dataAccount']['email'].'
                </div>
              </div>
              <hr>
              <div class="info">
                <div class="labelInfo">
                  Identité
                </div>
                <div class="dataInfo">
                  '.$_SESSION['dataAccount']['firstname'].' '.$_SESSION['dataAccount']['lastname'].'
                </div>
              </div>
              <hr>
              <div class="phone info">
                <div class="labelInfo">
                  Téléphone
                </div>
                <div class="dataInfo">
                  '.$_SESSION['dataAccount']['phone'].'
                </div>
              </div>
              <hr>
              <div class="password info">
                <div class="labelInfo">
                  Mot de passe
                </div>
                <div class="dataInfo">
                  **********
                </div>
              </div>
              <hr>
              <input class="buttonCo" id="logoffButton" type="button" value="Déconnexion">
            </div>';
    } else {
      echo '
      <div class="main_connectionScreen">
        <p id="labelCo">Connexion</p>
        <p class="labelCo">Email</p>
        <input class="loginInput" placeholder="Email" type="text" name="username"><br>
        <p class="labelCo">Mot de passe</p>
        <input class="loginInput" placeholder="Mot de passe" type="password" name="password"><br>
        <input class="buttonCo" id="loginButton" type="button" value="connexion"><br>
        <input class="buttonCo" id="registerButton" type="button" value="s\'inscrire"><br>
        <div id="notCorrectLogs"></div>
      </div>
    ';
    }
  ?>
  <div id="modalPhone" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
      <div class="modal-header">
        <h3>Changer le numéro de téléphone</h3>
        <input class="inputModalPhone" placeholder="Nouveau numéro de téléphone" type="text" name="newPhone">
      </div>
      <div class="modal-ok phone">
        <h4><input class="buttonModal"  type="button" value="Changer" ></h4>
      </div>
      <div class="modal-cancel phone">
        <h4><input class="buttonModal" type="button" value="Annuler" ></h4>
      </div>
    </div>
  </div>

  <div id="modalPassword" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
      <div class="modal-header-password">
        <h3>Changer de mot de passe</h3>
        <input class="inputModalMDP" type="text" placeholder="Ancien mot de passe" name="oldPassword"><br>
        <input class="inputModalMDP" type="text" placeholder="Nouveau mot de passe" name="newPassword"><br>
        <input class="inputModalMDP" type="text" placeholder="Retapez le nouveau mot de passe" name="newPasswordVerif">
      </div>
      <div class="modal-ok password">
        <h4><input class="buttonModal" type="button" value="Changer" ></h4>
      </div>
      <div class="modal-cancel password">
        <h4><input class="buttonModal" type="button" value="Annuler" ></h4>
      </div>
    </div>

  </div>
