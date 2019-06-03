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
      return (
        <View style={styles.main_container}>
          <View style={styles.image_container}>
            <Image
              style={styles.image}
              source={{uri : annonce.advertpicture}}
            />
          </View>
          {this._displayLoading()}
          <View style={styles.data_container}>
            <Text style={styles.plat}>{annonce.name}</Text>
            <Text style={styles.prix}>{annonce.price}€/Part</Text>
            <Text style={styles.qt}>{annonce.qtavaible} / {annonce.qttotal} restantes</Text>
            <Text style={styles.qt}>{annonce.address} {annonce.number}, {annonce.city} {annonce.zip}</Text>
            <Text style={styles.desc}>{annonce.description}</Text>
          </View>
          <View style={styles.container_buyers}>
            {arrBText}
          </View>
        </View>
      )
    }
  }

  render() {

    return (
      <View style={styles.main}>
        {this._displayAnnonce()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main : {
    flex : 1,
  },
  checkbox : {
    padding : 25
  },
  main_container : {
    flex : 1,
  },
  data_container : {
    flex : 4,
    paddingLeft : 20,
    paddingTop : 20,
  },
  image_container : {
    height : 350,
    flex : 2,
    borderBottomColor : 'black',
    borderBottomWidth : 1,
  },
  container_buyers : {
    borderTopColor : 'black',
    borderTopWidth : 1,
    paddingHorizontal : 20,
    flex : 4,
  },
  image : {
    flex : 1
  },
  plat : {
    fontSize : 23,
    color : 'grey',
  },
  prix : {
    fontSize : 23,
    color : 'grey',
    marginTop : 10,
  },
  qt : {
    fontSize : 23,
    color : 'grey',
    marginTop : 10,
  },
  desc : {
    color : 'grey',
    marginTop : 10,
  },
  buyers : {
    color : 'grey',
    fontSize : 20,
  }


})

export default AnnonceDetail
