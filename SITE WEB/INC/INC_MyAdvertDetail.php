<?php
  require "../header.php";
  include "./functions/func.php";
  if(!isset($_SESSION['isConnected'])){
    header('Location: ../index.php');
    exit;
  }
?>
<script>
    $('#retourAdvertDetail').click(function(){
      $('#main').load("./INC/INC_Adverts.php");
    });

    componentDidMount();

    function componentDidMount(){
      var data = {'action' : 'displayAdverts', 'id' : <?php echo $_GET['id'] ;?>}
      data = JSON.stringify(data);
      $.ajax({
        url : './DB/INC/postgres.php',
        type : "POST",
        data : data,
        success : function(output){
          var responseJson = JSON.parse(output);
          console.log(responseJson);
          var buyer = responseJson;
          responseJson = responseJson[0];


          $('#error').html(output);

          var html = "";
          html += '<div class="imgContainerAdvertDetail"><img class="advertPictureAdvertDetail" src="'+responseJson['advertpicture']+'" alt="pictureAdvert"></div>';
          html += "<p class='infosAdvertDetail'>";
          html += responseJson['name'];
          html += "</p>";
          html += "<p class='infoDesc'>" + responseJson['description'];
          html += "<br><br><b>Informations</b>";
          html += "</p>";
          html += "<p class='infosOrderDetail'>";
          html += "Vous avez vendu " + (responseJson['qttotal'] - responseJson['qtavaible']) + " part(s)<br>";
          html += responseJson['qtavaible'] + " part(s) restante(s)<br>";
          html += "</p>";
          html += "<hr>";
          if(responseJson['emailbuyer'] == null){
            html += "Vous n'avez pas encore vendu de part";
          } else {
            html += "<p id='labelCo'>Commandes</p>";
            for(var i = 0; i < buyer.length; i++){
              if(responseJson['emailbuyer'] != null){
                console.log(buyer[i]['validatedsender']);
                if(buyer[i]['validatedsender'] == "false"){
                  html += "<div class='checkboxOrderDetail'>";
                  html += '<input type="checkbox" id="'+buyer[i]['reservid']+'" />';
                  html += '<label for="'+buyer[i]['reservid']+'">'+buyer[i]['emailbuyer']+' a t\'il reçu sa commande ?</label>';
                  html += "</div><br>";
                } else {
                  html += "<div class='checkboxOrderDetail'>";
                  html += "<img class='greenVImg' src=./IMG/greenV.png alt='greenV'>"+buyer[i]['emailbuyer']+' a reçu sa commande.';
                  html += "</div><br>";
                }

              }
            }
          }

          $('#main_AdvertDetailScreen').html(html);

        }
      });

      $('body').on('click', 'input[type=checkbox]', function(){
          var id = $(this).attr('id');
          var data = {'action' : 'checkReservation' , 'id' : id, 'who' : 'sender'};
          data = JSON.stringify(data);
          $.ajax({
            url : './DB/INC/postgres.php',
            type : 'POST',
            data : data,
            success : function(output){
              console.log(output);
            }
          });
      });
    }
</script>
<div id="error"></div>
<input class="buttonCo" id='retourAdvertDetail' type='button' value='retour'>
<div id="main_AdvertDetailScreen"></div>
<div id="notCorrectLogs"></div>
