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
      $('#main').html("");
      $('#main').load("./INC/INC_Adverts.php");
    });
    var data = {'action' : 'getAddress', 'email' : '<?php echo $_SESSION['dataAccount']['email'] ?>'};
    data = JSON.stringify(data);
    $.ajax({
      url : './DB/INC/postgres.php',
      type : 'POST',
      data : data,
      success : function(output){
        var html = "";
        var responseJson = JSON.parse(output);
        for(var i = 0; i < responseJson.length; i++){
          html += "<option value="+responseJson[i]['id']+">"+responseJson[i]['address'] + " "+responseJson[i]['number']+" ("+responseJson[i]['city']+")</option>"
        }
        $('#selectAddresNewAdvert').html(html);
      }
    });
    function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
          $('#blah').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
      }
    }

    $("#imgInp").change(function() {
      readURL(this);
    });

    document.querySelector("html").classList.add('js');

    // initialisation des variables
    var fileInput  = document.querySelector( ".input-file" ),
        button     = document.querySelector( ".input-file-trigger" ),
        the_return = document.querySelector(".file-return");

    // action lorsque la "barre d'espace" ou "Entrée" est pressée
    button.addEventListener( "keydown", function( event ) {
        if ( event.keyCode == 13 || event.keyCode == 32 ) {
            fileInput.focus();
        }
    });

    // action lorsque le label est cliqué
    button.addEventListener( "click", function( event ) {
       fileInput.focus();
       return false;
    });

    // affiche un retour visuel dès que input:file change
    fileInput.addEventListener( "change", function( event ) {
        the_return.innerHTML = this.value;
    });

    $('#addNewAdvert').click(function(){
        if(
          $('input[name=name]').val() != "" &&
          $('input[name=nbPart]').val() != "" &&
          $('input[name=description]').val() != "" &&
          $('input[name=price]').val() != "" &&
          $('input[name=date]').val() != "" &&
          $('input[name=beginhour]').val() != "" &&
          $('input[name=endhour]').val() != "" &&
          $('input[name=name]').val() != "" &&
          $('input[name=file]').val() != ""
        ){
          if(isNaN($('input[name=price]').val()) || isNaN($('input[name=nbPart]').val())){
            $('#notCorrectLogs').text("Prix ou quantité incorrect");
          } else {
            var beginhour = $('input[name=beginhour]').val();
            var endhour = $('input[name=endhour]').val();
            beginhour = beginhour.split(':');
            endhour = endhour.split(':');
            beginhour = parseInt(beginhour[0]) + parseInt(beginhour[1])/60;
            endhour = parseInt(endhour[0]) + parseInt(endhour[1])/60;
            var result = endhour - beginhour;
            var newDate = $('input[name=date]').val().split('-');
            newDate = newDate[2] + '-' + newDate[1] + '-' + newDate[0];

            if(result >= 1){
              var file_data = $('#imgInp').prop('files')[0];
              var form_data = new FormData();
              form_data.append('file', file_data);
              $.ajax({
                url: './DB/INC/addAdvert.php', // point to server-side PHP script
                dataType: 'text',  // what to expect back from the PHP script, if anything
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: 'post',
                success: function(output){
                  responseJson = JSON.parse(output);
                  console.log(output);

                  $('#error').html(output);
                  if(responseJson == "toheavy"){
                    $('#notCorrectLogs').text("Votre image est trop lourde");
                  } else {
                    if(responseJson == "notanimage"){
                      $('#notCorrectLogs').html("Format d'image incorrect.<br>Formats acceptés : 'JPG', 'JPEG, 'PNG'");
                    } else {
                      var data = {
                          'action' : 'addAdvert',
                          'nom' : $('input[name=name]').val(),
                          'img' : responseJson,
                          'description' : $('textarea[name=description]').val(),
                          'prix' : $('input[name=price]').val(),
                          'qte' : $('input[name=nbPart]').val(),
                          'email' : '<?php echo $_SESSION['dataAccount']['email']; ?>',
                          'idAddress' : $('#selectAddresNewAdvert').val(),
                          'date' : newDate,
                          'begin' : $('input[name=beginhour]').val(),
                          'end' : $('input[name=endhour]').val()
                      };
                      data = JSON.stringify(data);
                      $.ajax({
                        url : './DB/INC/postgres.php',
                        type : 'POST',
                        data : data,
                        success : function(output){
                          var responseJson = JSON.parse(output);
                          if(responseJson){
                            $('#main').load("./INC/INC_Adverts.php");
                          } else {
                            $('#notCorrectLogs').text("Une erreur s'est produite, veuillez réessayez plus tard");
                          }
                        }
                      });
                    }
                  }
                }
              });

            } else {
              $('#notCorrectLogs').text("Veuillez laisser au moins une heure de takeaway");
            }
          }
        } else {
          $('#notCorrectLogs').text("Veuillez remplir tout les champs");
        }

    });
</script>
<div id="error"></div>
<div id="main_newAdvertScreen">

  <p id="labelCo">Nouvelle annonce</p>

  <div class="imgContainerNewAdver">

    <img class="imgNewAdvert" id="blah" src="./IMG/no-image.jpg"/>
  </div>

  <div class="input-file-container">
    <input class="input-file" name="file" type='file' id="imgInp" />
    <label for="imgInp" class="input-file-trigger" tabindex="0">Ajouter une photo</label>
  </div>



  <p class="labelCo">Nom du plat</p>
  <input class="loginInput" placeholder="Nom du plat" type="text" required name="name"><br>

  <p class="labelCo">Nombre de part</p>
  <input class="loginInput" placeholder="Nombre de part" type="text" required name="nbPart"><br>

  <p class="labelCo">Description</p>
  <textarea class="descriptionNewAdvert loginInput" name="description" placeholder="Description" rows="5" cols="33" maxlength="500"></textarea>

  <p class="labelCo">Prix</p>
  <input class="loginInput" placeholder="Prix" type="text" required name="price"><br>

  <p class="labelCo">Date</p>
  <input class="loginInput" placeholder="Prix" type="date" required min=<?php echo date("Y-m-d") ?> max=<?php $date = new DateTime('+3 day'); echo $date->format('Y-m-d H:i:s'); ?> name="date"><br>

  <p class="labelCo">Heure de début pour le takeaway</p>
  <input class="loginInput" type="time" id="appt" name="beginhour" min="09:00" max="21:00" required><br>

  <p class="labelCo">Heure de fin pour le takeaway</p>
  <input class="loginInput" type="time" id="appt" name="endhour" min="12:00" max="23:00" required><br>

  <p class="labelCo">Adresse</p>
  <select class="loginInput" id="selectAddresNewAdvert"></select>

  <input class="buttonCo" id="addNewAdvert" type="button" value="Ajouter l'annonce"><br>
  <input class="buttonCo" id="backButton" type="button" value="Retour"><br>
  <div id="notCorrectLogs"></div>
</div>
