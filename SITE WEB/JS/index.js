$(document).ready(function(){

  selected("INC_Search");
  changePage("INC_Search");

  $('.containerSearch').click(function(event){
    event.preventDefault();
    selected(this.id);
    changePage(this.id);
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav responsive") {
        x.className = "topnav";
    }
  });


  function selected(elem){
    switch(elem){
      case 'INC_Search' :
        $('#INC_Connexion').html("<img class='menuImg' src='./IMG/unselectedProfil.png' alt='profil'>");
        $('#INC_Search').html("<img class='menuImg' src='./IMG/search.png' alt='search'>");
        $('#INC_Orders').html("<img class='menuImg' src='./IMG/unselectedCommande.png' alt='orders'>");
        $('#INC_Adverts').html("<img class='menuImg' src='./IMG/unselectedPoster.png' alt='adverts'>");
        $('#INC_Address').html("<img class='menuImg' src='./IMG/homeUnselected.png' alt='adverts'>");
        break;
      case 'INC_Connexion' :
        $('#INC_Search').html("<img class='menuImg' src='./IMG/unselectedSearch.png' alt='search'>");
        $('#INC_Connexion').html("<img class='menuImg' src='./IMG/selectedProfil.png' alt='profil'>");
        $('#INC_Orders').html("<img class='menuImg' src='./IMG/unselectedCommande.png' alt='orders'>");
        $('#INC_Adverts').html("<img class='menuImg' src='./IMG/unselectedPoster.png' alt='adverts'>");
        $('#INC_Address').html("<img class='menuImg' src='./IMG/homeUnselected.png' alt='adverts'>");
        break;
      case 'INC_Orders' :
        $('#INC_Orders').html("<img class='menuImg' src='./IMG/selectedCommande.png' alt='orders'>");
        $('#INC_Search').html("<img class='menuImg' src='./IMG/unselectedSearch.png' alt='search'>");
        $('#INC_Connexion').html("<img class='menuImg' src='./IMG/unselectedProfil.png' alt='profil'>");
        $('#INC_Adverts').html("<img class='menuImg' src='./IMG/unselectedPoster.png' alt='adverts'>");
        $('#INC_Address').html("<img class='menuImg' src='./IMG/homeUnselected.png' alt='adverts'>");
        break;
      case 'INC_Adverts' :
        $('#INC_Adverts').html("<img class='menuImg' src='./IMG/selectedPoster.png' alt='adverts'>");
        $('#INC_Orders').html("<img class='menuImg' src='./IMG/unselectedCommande.png' alt='orders'>");
        $('#INC_Search').html("<img class='menuImg' src='./IMG/unselectedSearch.png' alt='search'>");
        $('#INC_Connexion').html("<img class='menuImg' src='./IMG/unselectedProfil.png' alt='profil'>");
        $('#INC_Address').html("<img class='menuImg' src='./IMG/homeUnselected.png' alt='adverts'>");
        break;
      case 'INC_Address' :
        $('#INC_Address').html("<img class='menuImg' src='./IMG/homeSelected.png' alt='adverts'>");
        $('#INC_Adverts').html("<img class='menuImg' src='./IMG/unselectedPoster.png' alt='adverts'>");
        $('#INC_Orders').html("<img class='menuImg' src='./IMG/unselectedCommande.png' alt='orders'>");
        $('#INC_Search').html("<img class='menuImg' src='./IMG/unselectedSearch.png' alt='search'>");
        $('#INC_Connexion').html("<img class='menuImg' src='./IMG/unselectedProfil.png' alt='profil'>");
    }
  }

  function changePage(elem){
    $('#main').load("./INC/" + elem + ".php");
  }


});

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
