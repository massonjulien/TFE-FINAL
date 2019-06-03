<?php
  require "../header.php";
  include "./functions/func.php";
  if(!isset($_SESSION['isConnected'])){
    header('Location: ../index.php');
    exit;
  }
?>

<script>
    var data = {'action' : 'getAddress', 'email' : '<?php echo $_SESSION['dataAccount']['email'] ?>'};
    var data = JSON.stringify(data);
    $.ajax({
      url : './DB/INC/postgres.php',
      type : 'POST',
      data : data,
      success: function(output){
        var responseJson = JSON.parse(output);
        var html = "";
        html += "<p id='labelCo'>Mes Adresses</p>";
        var id = [];
        for(var i = 0; i < responseJson.length; i++) {
          html += "<div class='contentAddress'>";
          html += "<div class='infoAddress'>";
          html += "<p class='rightAddress'>" + responseJson[i]['country'] + "</p>";
          html += "<p class='leftAddress'>" + responseJson[i]['address'] + ' ' + responseJson[i]['number'] + "</p>";
          html += "<p class='leftAddress'>" + responseJson[i]['city'] + ' ' + responseJson[i]['zip'] + "</p>";
          html += "</div>";
          html += "<div id=" + responseJson[i]['id'] + " class='deleteAddress'>X</div>";
          html += "</div>";
        }
        html += '<input id="newAddress" type="button" class="buttonCo" value="Nouvelle adresse">'
        $('#main_addressScreen').html(html);
      }
    });

    $('body').on('click', '#newAddress', function(){
      $.ajax({
        url : './DB/INC/postgres.php',
        type : 'POST',
        data : data,
        success: function(output){
          responseJson = JSON.parse(output);
          if(responseJson.length >= 3){
            $('#notCorrectLogs').text("Maximum 3 adresses!");
          } else {
            $('#main').load("./INC/INC_NewAddress.php");
          }
        }
      });
    });

    $('body').on('click', '.deleteAddress', function(){
      var id = $(this).attr('id');
      var data = {'action' : 'deleteAddress','id' : id};
      var data = JSON.stringify(data);
      $.ajax({
        url : './DB/INC/postgres.php',
        type : 'POST',
        data : data,
        success : function(output){
          if(output){
            componentDidMount();
          }
        }
      });
    });

    function componentDidMount(){
      $.ajax({
        url : './DB/INC/postgres.php',
        type : 'POST',
        data : data,
        success: function(output){
          var responseJson = JSON.parse(output);
          var html = "";
          html += "<p id='labelCo'>Mes Adresses</p>";
          var id = [];
          for(var i = 0; i < responseJson.length; i++) {
            html += "<div class='contentAddress'>";
            html += "<div class='infoAddress'>";
            html += "<p class='rightAddress'>" + responseJson[i]['country'] + "</p>";
            html += "<p class='leftAddress'>" + responseJson[i]['address'] + ' ' + responseJson[i]['number'] + "</p>";
            html += "<p class='leftAddress'>" + responseJson[i]['city'] + ' ' + responseJson[i]['zip'] + "</p>";
            html += "</div>";
            html += "<div id=" + responseJson[i]['id'] + " class='deleteAddress'>X</div>";
            html += "</div>";
          }

          html += '<input id="newAddress" type="button" class="buttonCo" value="Nouvelle adresse">'
          $('#main_addressScreen').html(html);
        }
      });
    }
</script>
<div id="error"></div>

<div id="main_addressScreen">

</div>
<div id ="notCorrectLogs"></div>
