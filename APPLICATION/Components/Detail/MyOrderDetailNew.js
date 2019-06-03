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
        console.log(responseJson[0]);
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
        return <View style={styles.rate_container}><Text></Text></View>;
    }
  }
  whichRateBase(rate){
    if(rate != -1){
        return <AirbnbRating isDisabled={true} count={5}  defaultRating={rate} showRating={false} size={15}/>
    } else {
        return <Text></Text>
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
      var rate = this.whichRateBase(food.rate);
      const rating = this.whichRate(food.ratereserv, food.validatedbuyer, food.firstname);
      if(food.validatedbuyer == 'true'){
        this.check = true;
      } else {
        this.check = false;
      }
      return (
        <View>
          <Modal isVisible={this.state.isModalError} >
            <View style={styles.modalContainerFirst}>
              <View style={styles.modalMain}>
                  <Text style={styles.TxtModal}>Une erreur s'est produite</Text>
              </View>
            </View>
            <View style={styles.modalContainerLast}>
              <TouchableOpacity style={styles.sendTouch} onPress={this._toggleModaError}>
                <Text style={styles.btnModal}> OK </Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <Modal isVisible={this.state.isModalRate} >
            <View style={styles.modalContainerFirst}>
              <View style={styles.modalMain}>
                  <Text style={styles.TxtModal}>Pensez à noter votre cuisinier après votre dégustation!</Text>
              </View>
            </View>
            <View style={styles.modalContainerLast}>
              <TouchableOpacity style={styles.sendTouch} onPress={this._toggleModalRate}>
                <Text style={styles.btnModal}> OK </Text>
              </TouchableOpacity>
            </View>
          </Modal>

          <Modal isVisible={this.state.isModalRateOk} >
            <View style={styles.modalContainerFirst}>
              <View style={styles.modalMain}>
                  <Text style={styles.TxtModal}>Merci pour votre évaluation!</Text>
              </View>
            </View>
            <View style={styles.modalContainerLast}>
              <TouchableOpacity style={styles.sendTouch} onPress={this._toggleModalRateOk}>
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
              <Text style={styles.informations}>Informations</Text>
                <Text style={styles.identity}>Vous avez commandé {food.qtbought} parts {"\n"}{"\n"}</Text>
                <Text style={styles.identity}>Téléphone {food.phone}</Text>
                <Text style={styles.identity}>{food.address} {food.number}, {food.city} ({food.zip})</Text>
                <Text style={styles.identity}>Disponible de {food.beginhour} à {food.endhour}</Text>
            </View>
            <CheckBox style={styles.checkbox} checked={this.check} onPress={() => this.checkSender(food.validatedbuyer, this.props.navigation.state.params.id)} title={"Avez vous recu votre plat?"}/>
            {rating}
          </View>
        </View>
      )
    }
  }

  render() {
    return (
      <ScrollView fillViewport="true">
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
  details_container : {
    marginBottom : '3%',
    paddingBottom : '3%',
    borderBottomColor : 'black',
    borderBottomWidth : 1,
  },
  description : {
     marginHorizontal : '5%',
     textAlign : 'justify',
     marginBottom : '4%',
  },
  identity : {
    marginHorizontal : '9%',
    fontSize : 15,
    fontStyle : 'italic',
  },
  TxtModal : {
    textAlign : 'center',
    color : 'black',
    fontSize : 15,
    margin : 10,
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
  foodName : {
    marginTop : '3%',
    fontSize : 16,
    fontWeight : 'bold',
    marginBottom :'3%',
  },
  name : {
    color : 'grey',
    fontStyle : 'italic',
    marginBottom : '3%',
    fontSize : 18,
  },
  informations : {
      marginHorizontal : '5%',
      fontSize : 17,
      fontWeight : 'bold',
  },
  rate_container : {
    marginTop : 5,
    marginBottom : 8,
    paddingVertical : 20,
    textAlign : 'center'
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
})

const mapStateToPros = (state) => {
  return {
    email: state.email,
    connected: state.connected
  }
}
export default connect(mapStateToPros)(MyOrderDetail)
