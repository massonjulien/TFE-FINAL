<?php
require "../header.php";
?>
<script>
  $(document).ready(function(){
    var data = {'action': 'displaySearch', 'id' : <?php echo $_GET['id'] ?>};
    var data = JSON.stringify(data);
    $.ajax({
       url : './DB/INC/postgres.php',
       type : 'POST',
       data : data,
       //data: ""
       success : function(output){ // code_html contient le HTML renvoyé
        responseJson = JSON.parse(output);
        responseJson = responseJson[0];
        var html = "";
        html += "<img class='profileimgAdvertDetail' src='" + responseJson['profilepicture'] + "' alt='pictureprofil'><br>";
        html += '<img class="ratePictureSearchAdvertDetail" src=./IMG/'+imgRate(responseJson['rate'])+'.jpg alt="rate"><br>';
        html += '<p class="identity">' + responseJson['firstname'] + ' ' + responseJson['lastname'] + '</p>';
        html += '<div class="imgContainerAdvertDetail"><img class="advertPictureAdvertDetail" src="'+responseJson['advertpicture']+'" alt="pictureAdvert"></div>';
        html += "<p class='infosAdvertDetail'>";
        html +=  responseJson['name'];
        html += "<p class='infoDesc'>"+responseJson['description'];
        html += "<br><br><i>"+ responseJson['price'] + "€ / part</i>";
        html += "<br><i>Disponible de "+ responseJson['beginhour'] + " jusqu'à "+ responseJson['endhour'] +"</i>";
        html += "</p>";
        html += "</p>";
        html += "<hr>";
        html += "<select class='selectAdvertDetail'>";
        html += selectNbPart(responseJson['qtavaible']);
        html += "</select>";
        html += "<input id='commander' type='button' class='buttonCo' value='Commander'>"
        $('#main_advertDetail').html(html);
       }
    });
    $('#retourAdvertDetail').click(function(){
      $('#main_advertDetail').html("");
      $('#main').load("./INC/INC_Search.php");
    });

    $('body').unbind('click').on('click','#commander',function(){
      var nbPart = $('.selectAdvertDetail').val();
      if(nbPart < 1){
        $('#notCorrectLogs').text('Veuillez choisir au moins une part');
      } else {
        if(<?php $x = isset($_SESSION['isConnected']) ? json_encode(true) : json_encode(false); echo $x; ?>){
          var data = {'action': 'displaySearch', 'id' : <?php echo $_GET['id'] ?>};
          var data = JSON.stringify(data);
          var responseJson = "";
          $.ajax({
             url : './DB/INC/postgres.php',
             type : 'POST',
             data : data,
             success : function(output){ // code_html contient le HTML renvoyé
              responseJson = JSON.parse(output);
              responseJson = responseJson[0];
              console.log(responseJson);
              if(responseJson['qtavaible'] >= nbPart){
                var email = <?php $x = isset($_SESSION['isConnected']) ? json_encode($_SESSION['dataAccount']['email']) : json_encode(""); echo $x; ?>;
                var data = {'action': 'order', 'id' : <?php echo $_GET['id'] ?>, 'emailA': email, 'qte' : nbPart};
                var data = JSON.stringify(data);
                $.ajax({
                   url : './DB/INC/postgres.php',
                   type : 'POST',
                   data : data,
                   success : function(output){ // code_html contient le HTML renvoyé
                    if(output){
                      componentDidMount();
                      $('#notCorrectLogs').text('Vous avez commandé ! Retrouvez maintenant votre commande dans l\'onglet "Mes Commandes"');
                    } else {
                      componentDidMount();
                      $('#notCorrectLogs').text('Une erreur s\'est produite');
                    }
                   }
                });
              } else {
                  componentDidMount();
                  $('#notCorrectLogs').text('La quantitée selectionnée n\'est plus disponible');
              }
             }
          });
        } else {
          $('#notCorrectLogs').text('Vous devez être connecté pour commander !');
        }
      }
    });
  });

  function componentDidMount(){
    var data = {'action': 'displaySearch', 'id' : <?php echo $_GET['id'] ?>};
    var data = JSON.stringify(data);
    $.ajax({
       url : './DB/INC/postgres.php',
       type : 'POST',
       data : data,
       //data: ""
       success : function(output){ // code_html contient le HTML renvoyé
        responseJson = JSON.parse(output);
        responseJson = responseJson[0];
        var html = "";
        html += "<img class='profileimgAdvertDetail' src='" + responseJson['profilepicture'] + "' alt='pictureprofil'><br>";
        html += '<img class="ratePictureSearchAdvertDetail" src=./IMG/'+imgRate(responseJson['rate'])+'.jpg alt="rate"><br>';
        html += '<p class="identity">' + responseJson['firstname'] + ' ' + responseJson['lastname'] + '</p>';
        html += '<div class="imgContainerAdvertDetail"><img class="advertPictureAdvertDetail" src="'+responseJson['advertpicture']+'" alt="pictureAdvert"></div>';
        html += "<p class='infosAdvertDetail'>";
        html +=  responseJson['name'];
        html += "<p class='infoDesc'>"+responseJson['description'];
        html += "<br><br><i>"+ responseJson['price'] + "€ / part</i>";
        html += "<br><i>Disponible de "+ responseJson['beginhour'] + " jusqu'à "+ responseJson['endhour'] +"</i>";
        html += "</p>";
        html += "</p>";
        html += "<hr>";
        html += "<select class='selectAdvertDetail'>";
        html += selectNbPart(responseJson['qtavaible']);
        html += "</select>";
        html += "<input id='commander' type='button' class='buttonCo' value='Commander'>"
        $('#main_advertDetail').html(html);
       }
    });
  }

  function imgRate(rate){
    if(rate >= 0 && rate < 1){
      return "noStar";
    } else if(rate >= 1 && rate < 2){
      return "oneStar";
    } else if(rate >= 2 && rate < 3){
      return "twoStar";
    } else if(rate >= 3 && rate < 4){
      return "threeStar";
    } else if(rate >= 4 && rate < 5){
      return "fourStar";
    } else if(rate == 5){
      return "fiveStar";
    } else {

    }
  }

  function selectNbPart(nbPart){
    var options = "";
    options += '<option value="0">choisissez un nombre de part</option>';
    for(var i = 1; i <= nbPart; i++){
      options += '<option value='+i+'>'+i+'</option>';
    }
    return options;
  }
</script>

<input class="buttonCo" id='retourAdvertDetail' type='button' value='retour'>
<div id="main_advertDetail">

</div>
<div id="notCorrectLogs"></div>
