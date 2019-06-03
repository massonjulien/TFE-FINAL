<?php
  require "../header.php";
  include "./functions/func.php";
  if(!isset($_SESSION['isConnected'])){
    header('Location: ../index.php');
    exit;
  }
?>
<script>
    $('#backButton').click(function(){
      $('#main').load("./INC/INC_Address.php");
    });

    $('#addAddress').bind('click').unbind('click').click(function(){
      if($('input[name=country]').val() == "" || $('input[name=city]').val() == "" || $('input[name=zip]').val() == "" || $('input[name=street]').val() == "" || $('input[name=number]').val() == ""){
        $('#notCorrectLogs').text("Veuillez remplir tout les champs");
      } else {
        if(isNaN($('input[name=zip]').val()) || isNaN($('input[name=number]').val())) {
          $('#notCorrectLogs').text("Le code postal et le numéro doivent être des nombres !");
        } else {
          var data = {
              'action': 'addAddress',
              'email': '<?php echo $_SESSION['dataAccount']['email'] ?>',
              'country' : $('input[name=country]').val(),
              'city' : $('input[name=city]').val(),
              'zip' : $('input[name=zip]').val(),
              'address' : $('input[name=street]').val(),
              'num' : $('input[name=number]').val()
          };
          var data = JSON.stringify(data);
          $.ajax({
            url : './DB/INC/postgres.php',
            type : 'POST',
            data : data,
            success : function(output){
              if(output == "true"){
                $('#main').load("./INC/INC_Address.php");
              } else {
                $('#notCorrectLogs').text("Adresse incorrect ! ");
              }
            }
          })
        }
      }
    });
</script>

<div id="error"></div>
<div class="main_registerScreen">
  <p id="labelCo">Nouvelle adresse</p>

  <p class="labelCo">Pays</p>
  <input class="loginInput" placeholder="Pays" type="text" name="country"><br>

  <p class="labelCo">Ville</p>
  <input class="loginInput" placeholder="Ville" type="text" name="city"><br>

  <p class="labelCo">Code postal</p>
  <input class="loginInput" placeholder="Code postal" type="text" name="zip"><br>

  <p class="labelCo">Rue</p>
  <input class="loginInput" placeholder="Rue" type="text" name="street"><br>

  <p class="labelCo">Numéro</p>
  <input class="loginInput" placeholder="Numéro" type="text" name="number"><br>

  <input class="buttonCo" id="addAddress" type="button" value="Ajouter"><br>
  <input class="buttonCo" id="backButton" type="button" value="Retour"><br>
  <div id="notCorrectLogs"></div>
</div>
