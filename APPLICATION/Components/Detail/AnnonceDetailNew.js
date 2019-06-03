// Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image } from 'react-native'
import { CheckBox } from 'react-native-elements'

class AnnonceDetail extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      isLoading : false, annonce : undefined, buyer : [], checked : true,
    }
  }

  _displayLoading(){
    if(this.state.isLoading){
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  componentDidMount() {
    this.setState({isLoading : true})
    return fetch('https://olitot.com/DB/INC/postgres.php', {
        method: 'POST',
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
        {
          action : 'displayAdverts',
          id : this.props.navigation.state.params.id
        })

    }).then((response) => response.json()).then((responseJson) => {
      console.log(responseJson);
        this.setState({
          annonce : responseJson[0],
          buyer : responseJson,
          isLoading : false
        });
      })
      .catch((error) => {
        this.setState({isLoading : false})
        console.error(error);
      });
  }

  buyerListing(resp){
    var temp = [];
    for(var i = 0; i < resp.length; i++){
      var act = resp[i];
      if(act.validatedsender == 'true'){
        var bool = true;
      } else {
        var bool = false;
      }
      if(act.emailbuyer != null){
        temp.push({'id': act.reservid,'sender' : act.validatedsender, 'idAdvert' : act.id, 'txt' : act.emailbuyer + ", " + act.qtbought + " parts achetée(s)", 'checked' : bool});
      }
    }
    return temp;
  }

  checkSender(id, validated){
    this.setState({isLoading : true})
    if(validated != 'true'){
      return fetch('https://olitot.com/DB/INC/postgres.php', {
          method: 'POST',
          headers:
          {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(
          {
            action : 'checkReservation',
            id : id,
            who : 'sender'
          })

      }).then((response) => response.json()).then((responseJson) => {
          if(responseJson == true){
            this.componentDidMount();
          } else {
            alert("Une erreur s'est produite");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  _displayAnnonce() {
    {/* ici on définit une constante nommé film qui sera égale a this.state.film donc au lieu de faire
        this.state.film.qqchose on peut juste faire film.qqchose */}
    const { annonce } = this.state;

    let arrB = this.buyerListing(this.state.buyer);
    const arrBText = arrB.map((type)=> <CheckBox key={type['id']} style={styles.checkbox} checked={type['checked']} onPress={() => this.checkSender(type['id'], type['sender'])} title={type['txt']}/>)
    //console.log(this.state.buyer);
    if (this.state.annonce != undefined) {
      let sold = "";
      if(this.state.annonce.qtavaible == 0){
        sold = "Vous avez du succès! Il ne vous reste aucune par disponible!";
      } else if(this.state.annonce.qtavaible == this.state.annonce.qttotal){
        sold = "Aucune part n'a encore été vendue... Pas de panique je les entends arriver!";
      } else {
        let s = this.state.annonce.qttotal - this.state.annonce.qtavaible;
        if(s == 1){
          sold = "Déjà une part a été vendue! Encore " + this.state.annonce.qtavaible;
        } else {
          sold = "Déjà " + s + " parts ont été vendue! " + + this.state.annonce.qtavaible;
        }
      }
      return (
        <View>
            <View style={styles.image_container}>
              <View style={styles.imageProfil_container}>
                <Image
                  style={styles.imageAdvert}
                  source={{uri : annonce.advertpicture}}
                />
              </View>
              <Text style={styles.foodName}>{annonce.name}</Text>
            </View>
            <View>
              <View style={styles.details_container}>
                <Text style={styles.description}>{annonce.description}</Text>
                <Text style={styles.sold}>{sold}</Text>
                <Text style={styles.ref_title}>Réferences choisies</Text>
                <Text style={styles.ref}>Prix : {annonce.price}€/part</Text>
                <Text style={styles.ref}>{annonce.address} {annonce.number}, {annonce.city} ({annonce.zip})</Text>
                <Text style={styles.ref}>Disponible de {annonce.beginhour} à {annonce.endhour}</Text>
              </View>
            </View>
            <View style={styles.container_buyers}>
              <View style={styles.buyerText}>
                <Text style={styles.foodName}>Ci-dessous, la liste de vos acheteurs</Text>
              </View>
              {arrBText}
            </View>
        </View>
      )
    }
  }

  render() {

    return (
      <ScrollView>
        {this._displayAnnonce()}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  image_container : {
      alignItems : 'center',
  },
  imageProfil_container : {
    borderTopColor : 'black',
    borderTopWidth : 1,
    borderBottomColor : 'black',
    borderBottomWidth : 1,
    height : 170,
    width : '100%',
  },
  imageAdvert : {
    height : '100%',
    width : '100%',
  },
  foodName : {
    marginTop : '3%',
    fontSize : 16,
    fontWeight : 'bold',
    marginBottom :'3%',
  },
  details_container : {
    marginBottom : '3%',
    paddingBottom : '3%',
    borderBottomColor : 'black',
    borderBottomWidth : 1,
  },
  description : {
     marginHorizontal : '5%',
     textAlign : 'justify',
    marginBottom : '5%',
  },
  sold : {
    marginHorizontal : '5%',
    fontSize : 15,
    fontStyle : 'italic',
  },
  ref : {
    marginHorizontal : '5%',
    marginLeft : '8%',
    fontSize : 12,
  },
  ref_title : {
    marginTop : '5%',
    marginHorizontal : '5%',
    fontSize : 15,
    fontWeight : 'bold',
  },
  container_buyers : {
    paddingHorizontal : 20,
    flex : 4,

  },
  buyerText : {
    alignItems : 'center',
  }
})

export default AnnonceDetail
