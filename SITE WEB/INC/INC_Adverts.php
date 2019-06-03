<?php
  require "../header.php";
  include "./functions/func.php";
  if(!isset($_SESSION['isConnected'])){
    header('Location: ../index.php');
    exit;
  }
?>

<script>
    var data = {'action' : 'getAdverts', 'email' : '<?php echo $_SESSION['dataAccount']['email'] ?>'};
    var data = JSON.stringify(data);
    $.ajax({
      url : './DB/INC/postgres.php',
      type : 'POST',
      data : data,
      success: function(output){
        var responseJson = JSON.parse(output);
        console.log(responseJson);
        var html = "";
        html += "<p id='labelCo'>Mes annonces</p>";
        html += '<input id="newAdvert" type="button" class="buttonCo" value="Nouvelle annonce"><br><br>'
        for(var i =0; i < responseJson.length; i++){
          html += "<div id='"+responseJson[i]['id']+"' class='advert'>";
          html += "<div class='orderContent_image'>";
          html += "<img class='order_advertpicture' src='"+responseJson[i]['advertpicture']+"' alt='advertpicture'>";
          html += "</div>";
          html += "<div class='orderContent_infos'>";
          html += "<p class='infos'>"+responseJson[i]['name']+"</p>";
          var qtSent = responseJson[i]['qttotal'] - responseJson[i]['qtavaible'];
          html += "<p class='sousInfos'>"+qtSent+" part(s) vendue<br>Encore "+responseJson[i]['qtavaible']+" à vendre<br>"+responseJson[i]['date']+"</p>";
          html += "</div>";
          html += "</div>";
        }

        $('#main_advertsScreen').html(html);
        return false;
      }
    });

    $('body').bind('click').on('click', '#newAdvert', function(){
      $('#main').load("./INC/INC_NewAdvert.php?");

    });

    $('body').bind('click').on('click', '.advert', function(){
      var id = $(this).attr('id');
      id  = id.split(' '),
      $('#main').load("./INC/INC_MyAdvertDetail.php?id="+id[0]+"&idadvert="+id[1]);
    });
</script>
<div id="error"></div>

<div id="main_advertsScreen"></div>

<div id ="notCorrectLogs"></div>
