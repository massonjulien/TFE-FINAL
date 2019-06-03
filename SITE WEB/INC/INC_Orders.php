<?php
  require "../header.php";
  include "./functions/func.php";
  if(!isset($_SESSION['isConnected'])){
    header('Location: ../index.php');
    exit;
  }
?>

<script>
    var data = {'action' : 'getMyOrders', 'email' : '<?php echo $_SESSION['dataAccount']['email'] ?>'};
    var data = JSON.stringify(data);
    $.ajax({
      url : './DB/INC/postgres.php',
      type : 'POST',
      data : data,
      success: function(output){
        var responseJson = JSON.parse(output);
        console.log(responseJson);
        var html = "";
        html += "<p id='labelCo'>Mes Commandes</p>";
        for(var i =0; i < responseJson.length; i++){
          html += "<div id='"+responseJson[i]['id']+" "+responseJson[i]['idadverts']+"' class='orderContent'>";
          html += "<div class='orderContent_image'>";
          html += "<img class='order_advertpicture' src='"+responseJson[i]['advertpicture']+"' alt='advertpicture'>";
          html += "</div>";
          html += "<div class='orderContent_infos'>";
          html += "<p class='infos'>"+responseJson[i]['name']+"</p>";
          html += "<p class='sousInfos'>"+responseJson[i]['qtbought']+" part(s) achetée<br>"+responseJson[i]['date']+"</p>";
          html += "</div>";
          html += "</div>";
        }

        $('#main_ordersScreen').html(html);
      }
    });

    $('body').on('click', '.orderContent', function(){
      var id = $(this).attr('id');
      id  = id.split(' '),
      $('#main').load("./INC/INC_OrderDetail.php?id="+id[0]+"&idadvert="+id[1]);
    });
</script>
<div id="error"></div>

<div id="main_ordersScreen"></div>

<div id ="notCorrectLogs"></div>
