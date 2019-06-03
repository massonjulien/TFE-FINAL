// Components/FilmDetail.js
import { connect } from 'react-redux'
import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, Picker, Table, TouchableOpacity } from 'react-native'
import Modal from "react-native-modal"
import { CheckBox, Button } from 'react-native-elements'
import { Rating, AirbnbRating } from 'react-native-ratings';

class MyOrderDetail extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      food : undefined, qteArray : [], qte : '', rate : undefined, isModalError : false, isModalRate : false, isModalRateOk : false,
    }
  }

  componentDidMount() {
    return fetch('https://olitot.com/DB/INC/postgres.php', {
        method: 'POST',
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
        {
          action : 'displayMyOrder',
          id : this.props.navigation.state.params.id,
          idadvert : this.props.navigation.state.params.idadvert,
          email : this.props.email
        })

    }).then((response) => response.json()).then((responseJson) => {
        //this.countQteDisp(responseJson.qtavaible)
        this.setState({
          food : responseJson[0]
        });

      })
      .catch((error) => {
        console.error(error);
      });
  }

  checkSender(validated, id){
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
            who : 'buyer'
          })

      }).then((response) => response.json()).then((responseJson) => {
          if(responseJson == true){
            this.componentDidMount();
            this.setState({isModalRate: !this.state.isModalRate});
          } else {
            this.setState({isModalError: !this.state.isModalError});
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  validateRate(){
    if(this.state.rate != undefined){
        console.log(this.props.navigation.state.params.id);
        return fetch('https://olitot.com/DB/INC/postgres.php', {
            method: 'POST',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
            {
              action : 'checkRate',
              id : this.props.navigation.state.params.id,
              rate : this.state.rate
            })

        }).then((response) => response.json()).then((responseJson) => {
            if(responseJson == true){
              this.componentDidMount();
              this.setState({isModalRateOk: !this.state.isModalRateOk});
            } else {
              this.setState({isModalError: !this.state.isModalError});
            }
          })
          .catch((error) => {
            console.error(error);
          });
    }
  }

  ratingCompleted(rating) {
    this.setState({rate : rating});
    console.log(this.state.rate);
  }

  whichRate(rate, validated, firstname){
    if(validated == 'true'){
      if(rate == null){
        return <View style={styles.rate_container}><Text style={styles.txt_rate}>Notez {firstname} !</Text><AirbnbRating  count={5} onFinishRating={this.ratingCompleted.bind(this)} reviews={["Oula...", "M'ouais", "Pas mal !", "Très bon !", "Incroyable !"]}  defaultRating={2.5}  size={36}/><Button onPress={this.validateRate.bind(this)} containerStyle={styles.button_rate} title="Confirmer ?"  type="solid"/></View>
      } else {
        return <View style={styles.rate_container}><Text style={styles.txt_rate}>Vous avez noté {firstname} !</Text><AirbnbRating isDisabled={true} count={5}  defaultRating={rate} showRating={false} size={36}/></View>
      }
    } else {
        return <Text></Text>;
    }
  }

  _toggleModaError = () =>
      this.setState({ isModalError : !this.state.isModalError});

  _toggleModalRate = () =>
      this.setState({ isModalRate : !this.state.isModalRate});

  _toggleModalRateOk = () =>
      this.setState({ isModalRateOk : !this.state.isModalRateOk});


  _displayAnnonce() {
    {/* ici on définit une constante nommé film qui sera égale a this.state.film donc au lieu de faire
        this.state.film.qqchose on peut juste faire film.qqchose */}
    const { food } = this.state

    if (this.state.food != undefined) {
      const rating = this.whichRate(food.ratereserv, food.validatedbuyer, food.firstname);
      if(food.validatedbuyer == 'true'){
        this.check = true;
      } else {
        this.check = false;
      }
      return (
        <View style={styles.main_container}>
        <Modal  isVisible={this.state.isModalError} >
          <View style={styles.modalContainerFirst}>
            <View style={styles.modalMain}>
                <Text>Une erreur s'est produite</Text>
            </View>
            <TouchableOpacity style={styles.sendTouch} onPress={this._toggleModaError}>
              <Text style={styles.btnModal}> OK </Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal  isVisible={this.state.isModalRate} >
          <View style={styles.modalContainerFirst}>
            <View style={styles.modalMain}>
                <Text>Pensez à noter votre cuisinier après votre dégustation!</Text>
            </View>
            <TouchableOpacity style={styles.sendTouch} onPress={this._toggleModalRate}>
              <Text style={styles.btnModal}> OK </Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal  isVisible={this.state.isModalRateOk} >
          <View style={styles.modalContainerFirst}>
            <View style={styles.modalMain}>
                <Text>Merci pour votre évaluation!</Text>
            </View>
            <TouchableOpacity style={styles.sendTouch} onPress={this._toggleModalRateOk}>
              <Text style={styles.btnModal}> OK </Text>
            </TouchableOpacity>
          </View>
        </Modal>

         <View style={styles.image_container}>
            <Image
              style={styles.image}
              source={{uri : food.advertpicture}}
            />
            <Image
              style={styles.profil}
              source={{uri : food.profilepicture}}
            />
          </View>
          <View fillViewport="true" style={styles.data_container}>
            <ScrollView fillViewport="true" style={styles.scroll_container}>
                <Text style={styles.identity}>{food.firstname} {food.lastname}{"\n"}</Text>
                <View style={styles.container_plat}>
                  <Text style={styles.identity}>{food.name}</Text>
                  <Text style={styles.description}>{food.description}</Text>
                  <Text style={styles.identity}>Vous avez commandé {food.qtbought} parts</Text>
                </View>
                <Text style={styles.identity}>Coordonnées du vendeur</Text>
                <Text style={styles.coordonnees}>{food.phone} </Text>
                <Text style={styles.coordonnees}>{food.address} {food.number}, {food.city} {food.zip}</Text>
                <CheckBox style={styles.checkbox} checked={this.check} onPress={() => this.checkSender(food.validatedbuyer, this.props.navigation.state.params.id)} title={"Avez vous recu votre plat?"}/>
                {rating}
            </ScrollView>
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
  main  : {
    flex : 1,
  },
  main_container : {
    flex : 1,
  },
  image_container : {
    flex : 3,
    borderBottomColor : 'black',
    borderBottomWidth : 1,
    alignItems: 'center',
  },
  button_rate : {
    marginTop:20,
    marginHorizontal:20,
    backgroundColor : 'grey'
  },
  txt_rate : {
    color : 'grey',
    fontSize : 18,
    marginHorizontal : '2%',
    textAlign:'center',
    marginBottom : '2%',
  },
  rate_container : {
    marginTop : 5,
    marginBottom : 5,
    borderTopColor : 'black',
    borderTopWidth : 1,
    paddingVertical : 20,
    textAlign : 'center'
  },
  data_container : {
    flex : 5,
    paddingTop: 20,
  },
  image : {
    height: '100%',
    width:'100%',
    position : 'absolute',
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
  modalTxtIntro : {
    color: 'grey',
    margin : 10,
    fontSize : 20,
  },
  btnModal : {
    textAlign : 'center',
    color : '#6495ED',
    fontSize : 17,
    margin : 10,
  },
  modalMain : {
    marginTop: 5,
    paddingVertical : 15,
    marginBottom: 5,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    alignItems: 'center',
  },
  profil : {
    borderWidth:1,
    borderColor:'black',
    alignItems:'center',
    justifyContent:'center',
    width:100,
    height:100,
    backgroundColor:'#fff',
    borderRadius:50,
    marginTop : '51%',
  },
  scroll_container : {
    //marginHorizontal : '2%',
    height : 300,
    marginBottom : 20,

  },
  rate : {
    width : 20,
    height : 23,
  },
  btnText: {
      textAlign: 'center',
      color: 'white',
      fontSize: 16
  },
  description : {
    marginHorizontal : '2%',
  },
  btn : {
    marginHorizontal : 5,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignSelf: 'stretch',
    padding: 10,
    marginTop: 10,
    marginBottom : 10,
  },
  identity : {
    color : 'grey',
    fontSize : 18,
    marginHorizontal : '2%',
  },
  coordonnees : {
    marginLeft : '10%',
    fontSize : 16,
    marginHorizontal : '2%',
  },
  container_plat : {
    marginTop : '5%',
    marginBottom : '5%',
    paddingTop : '5%',
    paddingBottom : '5%',
    borderTopColor : 'grey',
    borderTopWidth : 1,
    borderBottomColor : 'grey',
    borderBottomWidth : 1,
  }

})

const mapStateToPros = (state) => {
  return {
    email: state.email,
    connected: state.connected
  }
}
export default connect(mapStateToPros)(MyOrderDetail)
