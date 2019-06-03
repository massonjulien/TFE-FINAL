<?php
  include('./functions/func.php');
?>
<script>
    var data = {'action': 'getSearch'};
    var data = JSON.stringify(data);
    $.ajax({
       url : './DB/INC/postgres.php',
       type : 'POST',
       data : data,
       //data: ""
       success : function(output){ // code_html contient le HTML renvoyé
        responseJson = JSON.parse(output);
        html = "";
        for(var i =0; i< responseJson.length; i++){
          html += "<div id=" + responseJson[i]['id'] + " class='contentDataSearch'>";
          html += "<div class='imgContainerSearch'>";
          html += '<img class="advertPictureSearch" src='+responseJson[i]['advertpicture']+' alt="advertpicture"><br>';
          html += "</div>";
          html += '<img class="ratePictureSearch" src=./IMG/'+imgRate(responseJson[i]['rate'])+'.jpg alt="rate">';
          html += "<div class='infoSearch'>";
          html += "<p class='infos'>";
          html += responseJson[i]['name'];
          html += "<p class='sousInfos'>";
          html += responseJson[i]['qtavaible'] + " part(s) au prix de <b>" + responseJson[i]['price'] + "€</b><br>";
          html += responseJson[i]['beginhour'] + " - " + responseJson[i]['endhour'];
          html += "</p>";
          html += "</p>";
          html += "</div>";
          html += "</div>";
        }
        $('#dataSearch').html(html);
       }
    });

    $('body').on('click', '.contentDataSearch', function(){
      var id = $(this).attr('id');
      $('#main').load("./INC/INC_AdvertDetail.php?id="+id);
    });

    $('input[type=range]').change(function(){
      var val = $('input[type=range]').val();
      $('#rayonKm').html('<i>Rayon de ' + val + ' km</i>')
    });

    $('#buttonSearch').click(function(){
      var radius = $('input[type=range]').val();
      var text = $('input[name=search]').val();
      if(text != ""){
        $('#dataSearch').html("");
        var data = {'action': 'getSearchText', 'text' : text, 'radius' : radius};
        var data = JSON.stringify(data);
        $.ajax({
           url : './DB/INC/postgres.php',
           type : 'POST',
           data : data,
           //data: ""
           success : function(output){ // code_html contient le HTML renvoyé
            responseJson = JSON.parse(output);
            if(responseJson.length > 0){
              var html = "";
              for(var i =0; i< responseJson.length; i++){
                html += "<div id=" + responseJson[i]['id'] + " class='contentDataSearch'>";
                html += "<div class='imgContainerSearch'>";
                html += '<img class="advertPictureSearch" src='+responseJson[i]['advertpicture']+' alt="advertpicture"><br>';
                html += "</div>";
                html += '<img class="ratePictureSearch" src=./IMG/'+imgRate(responseJson[i]['rate'])+'.jpg alt="rate">';
                html += "<div class='infoSearch'>";
                html += "<p class='infos'>";
                html += responseJson[i]['name'];
                html += "<p class='sousInfos'>";
                html += responseJson[i]['qtavaible'] + " part(s) au prix de <b>" + responseJson[i]['price'] + "€</b><br>";
                html += responseJson[i]['beginhour'] + " - " + responseJson[i]['endhour'];
                html += "</p>";
                html += "</p>";
                html += "</div>";
                html += "</div>";
              }
              $('#dataSearch').html(html);
            } else {
            }
           }
        });
      } else {
          var data = {'action': 'getSearch'};
          var data = JSON.stringify(data);
          $.ajax({
             url : './DB/INC/postgres.php',
             type : 'POST',
             data : data,
             //data: ""
             success : function(output){ // code_html contient le HTML renvoyé
              responseJson = JSON.parse(output);
              html = "";
              for(var i =0; i< responseJson.length; i++){
                html += "<div id=" + responseJson[i]['id'] + " class='contentDataSearch'>";
                html += "<div class='imgContainerSearch'>";
                html += '<img class="advertPictureSearch" src='+responseJson[i]['advertpicture']+' alt="advertpicture"><br>';
                html += "</div>";
                html += '<img class="ratePictureSearch" src=./IMG/'+imgRate(responseJson[i]['rate'])+'.jpg alt="rate">';
                html += "<div class='infoSearch'>";
                html += "<p class='infos'>";
                html += responseJson[i]['name'];
                html += "<p class='sousInfos'>";
                html += responseJson[i]['qtavaible'] + " part(s) au prix de <b>" + responseJson[i]['price'] + "€</b><br>";
                html += responseJson[i]['beginhour'] + " - " + responseJson[i]['endhour'];
                html += "</p>";
                html += "</p>";
                html += "</div>";
                html += "</div>";
              }
              $('#dataSearch').html(html);
             }
          });
      }
    });

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
</script>
<div id="main_searchScreen">
  <input class="loginInput" type='text' placeholder="Adresse" name="search"><br>
  <div class="slidecontainer">
    <input type="range" min="0" max="10" value=5 class="slider" id="myRange">
  </div>
  <p id="rayonKm"><i>Rayon de 5 km</i></p>
  <input id="buttonSearch" class="buttonCo" type='button' value='Recherche'>
  <div id="dataSearch">
  </div>
</div>
