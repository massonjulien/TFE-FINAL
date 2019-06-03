<?php
  require "../header.php";
  include "./functions/func.php";
  if(!isset($_SESSION['isConnected'])){
    header('Location: ../index.php');
    exit;
  }
?>
<script>
    $('#retourOrderDetail').click(function(){
      $('#main').load("./INC/INC_Orders.php");
    });
    var data = {'action' : 'displayMyOrder', 'id' : <?php echo $_GET['id']; ?>, 'email' : '<?php echo $_SESSION['dataAccount']['email'] ?>', 'idadvert' : <?php echo $_GET['idadvert']; ?>}
    data = JSON.stringify(data);
    $.ajax({
      url : './DB/INC/postgres.php',
      type : 'POST',
      data : data,
      success : function(output){
        var responseJson = JSON.parse(output);
        responseJson = responseJson[0];
        console.log(responseJson);
        var html = "";
        html += "<img class='profileimgAdvertDetail' src='" + responseJson['profilepicture'] + "' alt='pictureprofil'><br>";
        html += '<img class="ratePictureSearchAdvertDetail" src=./IMG/'+imgRate(responseJson['rate'])+'.jpg alt="rate"><br>';
        html += '<p class="identity">' + responseJson['firstname'] + ' ' + responseJson['lastname'] + '</p>';
        html += '<div class="imgContainerAdvertDetail"><img class="advertPictureAdvertDetail" src="'+responseJson['advertpicture']+'" alt="pictureAdvert"></div>';
        html += "<p class='infosAdvertDetail'>";
        html += responseJson['name'];
        html += "</p>";
        html += "<p class='infoDesc'>" + responseJson['description'];
        html += "<br><br><b>Informations</b>";
        html += "<p class='infosOrderDetail'>";
        html += "Vous avez acheté " + responseJson['qtbought'] + "part(s)";
        html += "<br>Téléphone : " + responseJson['phone'];
        html += "<br>" + responseJson['address'] + ' ' + responseJson['number'] + ', ' + responseJson['city'] + ' (' + responseJson['zip'] + ')';
        html += "<br>" + responseJson['date']+" =>  " + responseJson['beginhour'] + " - " + responseJson['endhour'];
        html += "</p>";
        html += "<hr>";
        if(responseJson['validatedbuyer'] == "false"){
          html += "<p id='labelCo'>Commande</p>";
          html += "<div class='checkboxOrderDetail'>";
          html += '<input type="checkbox" id="buttonCheckOrderDetail" />';
          html += '<label for="buttonCheckOrderDetail">Avez vous reçu votre commande ?</label>';
          html += "</div>";
        } else {
          if(responseJson['ratereserv'] == null){
            html += "<p id='labelCo'>Commande</p>";
            html += "N'oubliez pas de noter votre cuisinier après la dégustation !"
            html += "<div class='container_rateImg'>";
            html += "<img id='rate1' class='starRate' src=./IMG/unselectedStar.jpg alt='unselectedStar'>";
            html += "<img id='rate2' class='starRate' src=./IMG/unselectedStar.jpg alt='unselectedStar'>";
            html += "<img id='rate3' class='starRate' src=./IMG/unselectedStar.jpg alt='unselectedStar'>";
            html += "<img id='rate4' class='starRate' src=./IMG/unselectedStar.jpg alt='unselectedStar'>";
            html += "<img id='rate5' class='starRate' src=./IMG/unselectedStar.jpg alt='unselectedStar'>";
            html += "</div>";
          } else {
            html += "Merci d'avoir noté " + responseJson['firstname']+"<br>";
            html += "<img class='ratePictureSearchAdvertDetail' src='./IMG/"+imgRate(responseJson['ratereserv'])+".jpg' alt=imgRate>";
          }
        }
        $('#main_OrderDetail').html(html);
      }
    });
    var rate = -1;
    $('body').on('mouseover', '.starRate', function(){

      id = $(this).attr('id');
      var html = "";
      switch(id){
        case 'rate1' :
          html += "<img id='rate1' class='starRate' src=./IMG/selectedStar.jpg alt='unselectedStar'>";
          html += "<img id='rate2' class='starRate' src=./IMG/unselectedStar.jpg alt='unselectedStar'>";
          html += "<img id='rate3' class='starRate' src=./IMG/unselectedStar.jpg alt='unselectedStar'>";
          html += "<img id='rate4' class='starRate' src=./IMG/unselectedStar.jpg alt='unselectedStar'>";
          html += "<img id='rate5' class='starRate' src=./IMG/unselectedStar.jpg alt='unselectedStar'>";
          html += "<div class='uSure'><input id='validateRate' class='buttonCo buttonCoRate' type='button' value='valider'></div>";
          rate = 1;
          $('.container_rateImg').html(html);
          break;
        case 'rate2' :
          html += "<img id='rate1' class='starRate' src=./IMG/selectedStar.jpg alt='unselectedStar'>";
          html += "<img id='rate2' class='starRate' src=./IMG/selectedStar.jpg alt='unselectedStar'>";
          html += "<img id='rate3' class='starRate' src=./IMG/unselectedStar.jpg alt='unselectedStar'>";
          html += "<img id='rate4' class='starRate' src=./IMG/unselectedStar.jpg alt='unselectedStar'>";
          html += "<img id='rate5' class='starRate' src=./IMG/unselectedStar.jpg alt='unselectedStar'>";
          html += "<div class='uSure'><input id='validateRate' class='buttonCo buttonCoRate' type='button' value='valider'></div>";
          rate = 2;
          $('.container_rateImg').html(html);
          break;
        case 'rate3' :
          html += "<img id='rate1' class='starRate' src=./IMG/selectedStar.jpg alt='unselectedStar'>";
          html += "<img id='rate2' class='starRate' src=./IMG/selectedStar.jpg alt='unselectedStar'>";
          html += "<img id='rate3' class='starRate' src=./IMG/selectedStar.jpg alt='unselectedStar'>";
          html += "<img id='rate4' class='starRate' src=./IMG/unselectedStar.jpg alt='unselectedStar'>";
          html += "<img id='rate5' class='starRate' src=./IMG/unselectedStar.jpg alt='unselectedStar'>";
          html += "<div class='uSure'><input id='validateRate' class='buttonCo buttonCoRate' type='button' value='valider'></div>";
          rate = 3;
          $('.container_rateImg').html(html);
          break;
        case 'rate4' :
          html += "<img id='rate1' class='starRate' src=./IMG/selectedStar.jpg alt='unselectedStar'>";
          html += "<img id='rate2' class='starRate' src=./IMG/selectedStar.jpg alt='unselectedStar'>";
          html += "<img id='rate3' class='starRate' src=./IMG/selectedStar.jpg alt='unselectedStar'>";
          html += "<img id='rate4' class='starRate' src=./IMG/selectedStar.jpg alt='unselectedStar'>";
          html += "<img id='rate5' class='starRate' src=./IMG/unselectedStar.jpg alt='unselectedStar'>";
          html += "<div class='uSure'><input id='validateRate' class='buttonCo buttonCoRate' type='button' value='valider'></div>";
          rate = 4;
          $('.container_rateImg').html(html);
          break;
        case 'rate5' :
          html += "<img id='rate1' class='starRate' src=./IMG/selectedStar.jpg alt='unselectedStar'>";
          html += "<img id='rate2' class='starRate' src=./IMG/selectedStar.jpg alt='unselectedStar'>";
          html += "<img id='rate3' class='starRate' src=./IMG/selectedStar.jpg alt='unselectedStar'>";
          html += "<img id='rate4' class='starRate' src=./IMG/selectedStar.jpg alt='unselectedStar'>";
          html += "<img id='rate5' class='starRate' src=./IMG/selectedStar.jpg alt='unselectedStar'>";
          html += "<div class='uSure'><input id='validateRate' class='buttonCo buttonCoRate' type='button' value='valider'></div>";
          rate = 5;
          $('.container_rateImg').html(html);
          break;
      }
    });

    $('body').on('click', '#validateRate', function(){
      if(rate > 5 && rate == -1){
        $('#notCorrectLogs').text('Note invalide!');
      } else {
        //console.log(rate);
        var data = {'action' : 'checkRate', 'id' : <?php echo $_GET['id'] ?>, 'rate' : rate};
        data = JSON.stringify(data);
        $.ajax({
          url : './DB/INC/postgres.php',
          type : 'POST',
          data : data,
          success : function(output){
            if(output){
              componentDidMount();
            } else {
              $('#notCorrectLogs').text('Une erreur s\'est produite');
            }
          }
        })
      }
    });

    $('body').on('click', '#buttonCheckOrderDetail', function(){
      var data = {'action' : 'checkReservation', 'id' : <?php echo $_GET['id'] ?>, 'who' : 'buyer'};
      data = JSON.stringify(data);
      $.ajax({
        url : './DB/INC/postgres.php',
        type : 'POST',
        data : data,
        success : function(output){
          if(output){
            componentDidMount();
          } else {
            $('#notCorrectLogs').text('Une erreur s\'est produite');
          }
        }
      })
    });

    function componentDidMount(){
      $.ajax({
        url : './DB/INC/postgres.php',
        type : 'POST',
        data : data,
        success : function(output){
          var responseJson = JSON.parse(output);
          responseJson = responseJson[0];
          console.log(responseJson);
          var html = "";
          html += "<img class='profileimgAdvertDetail' src='" + responseJson['profilepicture'] + "' alt='pictureprofil'><br>";
          html += '<img class="ratePictureSearchAdvertDetail" src=./IMG/'+imgRate(responseJson['rate'])+'.jpg alt="rate"><br>';
          html += '<p class="identity">' + responseJson['firstname'] + ' ' + responseJson['lastname'] + '</p>';
          html += '<div class="imgContainerAdvertDetail"><img class="advertPictureAdvertDetail" src="'+responseJson['advertpicture']+'" alt="pictureAdvert"></div>';
          html += "<p class='infosAdvertDetail'>";
          html += responseJson['name'];
          html += "</p>";
          html += "<p class='infoDesc'>" + responseJson['description'];
          html += "<br><br><b>Informations</b>";
          html += "<p class='infosOrderDetail'>";
          html += "Vous avez acheté " + responseJson['qtbought'] + "part(s)";
          html += "<br>Téléphone : " + responseJson['phone'];
          html += "<br>" + responseJson['address'] + ' ' + responseJson['number'] + ', ' + responseJson['city'] + ' (' + responseJson['zip'] + ')';
          html += "<br>" + responseJson['date']+" =>  " + responseJson['beginhour'] + " - " + responseJson['endhour'];
          html += "</p>";
          html += "<hr>";
          if(responseJson['validatedbuyer'] == "false"){
            html += "<p id='labelCo'>Commande</p>";
            html += "<div class='checkboxOrderDetail'>";
            html += '<input type="checkbox" id="buttonCheckOrderDetail" />';
            html += '<label for="buttonCheckOrderDetail">Avez vous recu votre commande ?</label>';
            html += "</div>";
          } else {
            if(responseJson['ratereserv'] == null){
              html += "<p id='labelCo'>Commande</p>";
              html += "N'oubliez pas de noter votre cuisinier après la dégustation !"
              html += "<div class='container_rateImg'>";
              html += "<img id='rate1' class='starRate' src=./IMG/unselectedStar.jpg alt='unselectedStar'>";
              html += "<img id='rate2' class='starRate' src=./IMG/unselectedStar.jpg alt='unselectedStar'>";
              html += "<img id='rate3' class='starRate' src=./IMG/unselectedStar.jpg alt='unselectedStar'>";
              html += "<img id='rate4' class='starRate' src=./IMG/unselectedStar.jpg alt='unselectedStar'>";
              html += "<img id='rate5' class='starRate' src=./IMG/unselectedStar.jpg alt='unselectedStar'>";
              html += "</div>";
            } else {
              html += "Merci d'avoir noté " + responseJson['firstname']+"<br>";
              html += "<img class='ratePictureSearchAdvertDetail' src='./IMG/"+imgRate(responseJson['ratereserv'])+".jpg' alt=imgRate>";
            }
          }
          $('#main_OrderDetail').html(html);
        }
      });
    }
</script>
<div id="error"></div>
<input class="buttonCo" id='retourOrderDetail' type='button' value='retour'>
<div id="main_OrderDetail"></div>
<div id="notCorrectLogs"></div>
