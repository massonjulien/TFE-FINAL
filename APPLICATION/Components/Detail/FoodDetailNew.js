// Components/FilmDetail.js
import { connect } from 'react-redux'
import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, Picker, Table, TouchableOpacity } from 'react-native'
import { Rating, AirbnbRating } from 'react-native-ratings';
import Modal from "react-native-modal"

class FoodDetail extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      food : undefined, qteArray : [], qte : '',
      isModalConnectedVisible : false, isModalZeroVisible : false, isModalOrderedVisible : false,
    }
  }

  rate(nb){
    if(nb >= 0 && nb < 1){
       return require('../../Image/noStar.jpg')
    } else if(nb >= 1 && nb < 2){
       return require('../../Image/oneStar.jpg')
    } else if(nb >= 2 && nb < 3){
       return require('../../Image/twoStar.jpg')
    } else if(nb >= 3 && nb < 4){
       return require('../../Image/threeStar.jpg')
    } else if(nb >= 4 && nb < 5){
       return require('../../Image/fourStar.jpg')
    } else if(nb == 5){
       return require('../../Image/fiveStar.jpg')
    } else if (nb == -1 ) {

    }
  }

  countQteDisp(nb){
    this.setState({qteArray : []})
    this.state.qteArray.push(0);
    for(var i = 0; i < nb; i++){
      this.state.qteArray.push(i+1);
    }
  }


  componentDidMount() {
    //console.log(this.props.navigation.state.params.idA)
    return fetch('https://olitot.com/DB/INC/postgres.php', {
        method: 'POST',
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
        {
          action : 'displaySearch',
          id : this.props.navigation.state.params.id
        })

    }).then((response) => response.json()).then((responseJson) => {
        this.countQteDisp(responseJson[0].qtavaible)
        this.setState({
          food : responseJson[0]
        });

      })
      .catch((error) => {
        console.error(error);
      });
  }

  commander = () => {
    //console.log(this.props.navigation.state.params.id);
    //console.log(this.props.email);
    //console.log(this.state.qte);
    this.componentDidMount();
    if(this.props.email == 'null'){
      this.setState({isModalConnectedVisible : true});
    } else {
      if(this.state.qte > 0){
        if(this.state.food.qtavaible >= this.state.qte){
          fetch('https://olitot.com/DB/INC/postgres.php', {
              method: 'POST',
              headers:
              {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(
              {
                action : 'order',
                id : this.props.navigation.state.params.id,
                emailA : this.props.email,
                qte : this.state.qte,
              })

          }).then((response) => response.json()).then((responseJson) =>
          {
              if(responseJson){
                this.setState({isModalOrderedVisible : true})
              } else {
                alert("Une erreur s'est produite!")
              }
              this.setState({qte : 0})
              this.componentDidMount();

          }).catch((error) =>
          {
              console.error(error);
          });
        } else {
          Alert("Une erreur s'est produite")
        }
      } else {
        this.setState({isModalZeroVisible : true})
      }
    }


  }

  whichRate(rate){
    if(rate != -1){
        return <AirbnbRating isDisabled={true} count={5}  defaultRating={rate} showRating={false} size={15}/>
    } else {
        return <Text></Text>
    }
  }

  _toggleModalConnectedVisible = () =>
      this.setState({isModalConnectedVisible : !this.state.isModalConnectedVisible});

  _toggleModalZeroVisible = () =>
      this.setState({isModalZeroVisible: !this.state.isModalZeroVisible});

  _toggleModalOrderedVisible = () =>
      this.setState({isModalOrderedVisible: !this.state.isModalOrderedVisible});

  _displayAnnonce() {
    {/* ici on définit une constante nommé film qui sera égale a this.state.film donc au lieu de faire
        this.state.film.qqchose on peut juste faire film.qqchose */}

    if (this.state.food != undefined) {
      const { food } = this.state
      var rate = this.whichRate(food.rate);
      let qteDispItems = this.state.qteArray.map( (i) => {
          return <Picker.Item key={i} value={i} label={i.toString()} />
      });
      return (
        <View>
          <Modal isVisible={this.state.isModalConnectedVisible} >
            <View style={styles.modalContainerFirst}>
              <View style={styles.modalMain}>
                  <Text style={styles.TxtModal}>Vous devez être connecté pour pouvoir commander !</Text>
              </View>
            </View>
            <View style={styles.modalContainerLast}>
              <TouchableOpacity style={styles.sendTouch} onPress={this._toggleModalConnectedVisible}>
                <Text style={styles.btnModal}> OK </Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <Modal isVisible={this.state.isModalOrderedVisible} >
            <View style={styles.modalContainerFirst}>
              <View style={styles.modalMain}>
                  <Text style={styles.TxtModal}>Vous avez commandé! Vous pouvez dés maintenant retrouver votre commande ainsi que les informations concernant le vendeur dans l'onglet "Mes Commandes".</Text>
              </View>
            </View>
            <View style={styles.modalContainerLast}>
              <TouchableOpacity style={styles.sendTouch} onPress={this._toggleModalOrderedVisible}>
                <Text style={styles.btnModal}> OK </Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <Modal isVisible={this.state.isModalZeroVisible} >
            <View style={styles.modalContainerFirst}>
              <View style={styles.modalMain}>
                  <Text style={styles.TxtModal}>Veuillez selectionner au moins une portion !</Text>
              </View>
            </View>
            <View style={styles.modalContainerLast}>
              <TouchableOpacity style={styles.sendTouch} onPress={this._toggleModalZeroVisible}>
                <Text style={styles.btnModal}> OK </Text>
              </TouchableOpacity>
            </View>
          </Modal>


          <View style={styles.image_container}>
            <Image
              style={styles.imageProfil}
              source={{uri : food.profilepicture}}
            />
            {rate}
            <Text style={styles.name}>{food.firstname} {food.lastname}</Text>
            <View style={styles.imageProfil_container}>
              <Image
                style={styles.imageAdvert}
                source={{uri : food.advertpicture}}
              />
            </View>
            <Text style={styles.foodName}>{food.name}</Text>
          </View>
          <View>
            <View style={styles.details_container}>
              <Text style={styles.description}>{food.description}</Text>
              <Text style={styles.identity}>{food.price}€ / parts</Text>
              <Text style={styles.identity}>Disponible de {food.beginhour} à {food.endhour}</Text>
            </View>
            <View style={styles.command_container}>
              <Text style={styles.command}>Ce plat vous tente ? Commandez ici en dessous!</Text>
            </View>
            <View style={styles.picker_container}>
              <Picker
                selectedValue={this.state.qte}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({qte: itemValue})
                }>
                {qteDispItems}
              </Picker>
            </View>
            <TouchableOpacity
              activeOpacity = { 0.8 } style = { styles.btn }
              onPress={this.commander}>
                <Text style = { styles.btnText }>Commander</Text>
            </TouchableOpacity>
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
      marginTop : '2%',
      alignItems : 'center',
  },
  imageAdvert : {
    height : '100%',
    width : '100%',
  },
  imageProfil_container : {
    borderTopColor : 'black',
    borderTopWidth : 1,
    borderBottomColor : 'black',
    borderBottomWidth : 1,
    height : 170,
    width : '100%',
  },
  imageProfil : {
    borderWidth:1,
    borderColor:'black',
    alignItems:'center',
    justifyContent:'center',
    width:70,
    height:70,
    backgroundColor:'#fff',
    borderRadius:50,
  },
  name : {
    color : 'grey',
    fontStyle : 'italic',
    marginBottom : '3%',
    fontSize : 18,
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
  },
  identity : {
    marginHorizontal : '5%',
    fontSize : 15,
    fontStyle : 'italic',
  },
  picker_container : {
    borderColor : 'black',
    borderWidth : 1,
    marginHorizontal : '5%',
  },
  picker : {
    height: 25,
    borderColor : 'black',
    borderWidth : 1,
  },
  btnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16
  },
  btn : {
    marginHorizontal : '5%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignSelf: 'stretch',
    padding: 10,
    marginTop: 10,
    marginBottom : '7%',
  },
  command : {
    marginHorizontal : '5%',
    fontSize : 15,
    fontStyle : 'italic',
    marginBottom :'3%',
  },
  command_container : {
    alignItems : 'center'
  },
  modalTxtIntro : {
    color: 'grey',
    margin : 10,
    fontSize : 20,
  },
  modalMain : {
    marginTop: 5,
    paddingVertical : 15,
    marginBottom: 5,
    alignItems: 'center',
  },
  modalContainerFirst : {
    backgroundColor : 'white',
    marginTop : 250,
    borderRadius: 10,
    borderWidth: 1,
  },
  modalContainerLast : {
    backgroundColor : 'white',
    marginTop : 10,
    marginBottom : 250,
    borderRadius: 10,
    borderWidth: 1,
  },
  btnModal : {
    textAlign : 'center',
    color : '#6495ED',
    fontSize : 15,
    margin : 10,
  },
  TxtModal : {
    textAlign : 'center',
    color : 'black',
    fontSize : 15,
    margin : 10,
  },
})

const mapStateToPros = (state) => {
  return {
    email: state.email,
    connected: state.connected
  }
}
export default connect(mapStateToPros)(FoodDetail)
