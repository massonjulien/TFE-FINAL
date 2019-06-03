<?php
  require "../header.php";
  include "./functions/func.php";
?>
<script>
    $('#backButton').click(function(){
      $('#main').load("./INC/INC_Connexion.php");
    });

    $('#signin').click(function(){
      if($('input[name=username]').val() == "" || $('input[name=lastname]').val() == "" || $('input[name=firstname]').val() == "" || $('input[name=phone]').val() == "" || $('input[name=password]').val() == "" || $('input[name=verifPassword]').val() == ""){
        $('#notCorrectLogs').text('Tout les champs doivent être remplis');
      } else {
        if(isNaN($('input[name=phone]').val()) || $('input[name=phone]').val().length > 11 || $('input[name=phone]').val().length < 9){
            $('#notCorrectLogs').text('Le numéro de téléphone est incorrect');
        } else {
          if($('input[name=verifPassword]').val() != $('input[name=password]').val()){
            $('#notCorrectLogs').text('Mots de passes différents');
          } else {
            if($('input[name=password]').val().length <= 8){
              $('#notCorrectLogs').text('Mot de passe trop court, 8 caractères minimum.');
            } else {
              var data = {'action': 'testEmail', 'email': $('input[name=username]').val(),};
              var data = JSON.stringify(data);
              $.ajax({
                 url : './DB/INC/postgres.php',
                 type : 'POST',
                 data : data,
                 success : function(output){ // code_html contient le HTML renvoyé
                  $('#error').html(output);
                  responseJson = JSON.parse(output);
                  if(output == "true"){
                    $('#notCorrectLogs').text("Email déjà existant.");
                  } else {
                    var data = {
                      'action': 'userRegistration',
                      'email': $('input[name=username]').val(),
                      'firstname': $('input[name=firstname]').val(),
                      'lastname': $('input[name=lastname]').val(),
                      'phone': $('input[name=phone]').val(),
                      'password': $('input[name=password]').val()
                    };
                    var data = JSON.stringify(data);
                    $.ajax({
                       url : './DB/INC/postgres.php',
                       type : 'POST',
                       data : data,
                       success : function(output){ // code_html contient le HTML renvoyé
                        $('#error').html(output);
                        responseJson = JSON.parse(output);
                        console.log(responseJson);
                        if(output != "false"){
                          $('#notCorrectLogs').text("Une erreur s'est produite.");
                        } else {
                          var data = {
                            'action': 'getUser',
                            'email': $('input[name=username]').val(),
                          };
                          var data = JSON.stringify(data);
                          $.ajax({
                             url : './DB/INC/postgres.php',
                             type : 'POST',
                             data : data,
                             success : function(output){ // code_html contient le HTML renvoyé
                              $('#error').html(output);
                              responseJson = JSON.parse(output);
                              console.log(responseJson);
                              if(output != "false"){
                                $.ajax({
                                   url : 'header.php',
                                   type : 'POST',
                                   data : "action=login&dataAccount="+JSON.stringify(responseJson[0]),
                                });
                                location.reload();
                              } else {
                                $('#notCorrectLogs').text("Une erreur s'est produite. Essayez de vous connecter utlérieurement");
                              }
                             }
                          });
                        }
                       }
                    });
                  }
                 }
              });
            }
          }
        }
      }
    });
</script>
<div id="error"></div>
<div class="main_registerScreen">
  <p id="labelCo">Inscription</p>
  <p class="labelCo">Email</p>
  <input class="loginInput" placeholder="Email" type="text" name="username"><br>
  <p class="labelCo">Nom</p>
  <input class="loginInput" placeholder="Nom" type="text" name="lastname"><br>
  <p class="labelCo">Prénom</p>
  <input class="loginInput" placeholder="Prénom" type="text" name="firstname"><br>
  <p class="labelCo">Numéro de téléphone</p>
  <input class="loginInput" placeholder="Numéro de téléphone" type="text" name="phone"><br>
  <p class="labelCo">Mot de passe</p>
  <input class="loginInput" placeholder="Mot de passe" type="password" name="password"><br>
  <p class="labelCo">Retapez le mot de passe</p>
  <input class="loginInput" placeholder="Retapez le mot de passe" type="password" name="verifPassword"><br>
  <input class="buttonCo" id="signin" type="button" value="S'enregistrer"><br>
  <input class="buttonCo" id="backButton" type="button" value="Retour"><br>
  <div id="notCorrectLogs"></div>
</div>
