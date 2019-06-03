import { connect } from 'react-redux'
import React from 'react'
import {StyleSheet, ActivityIndicator, Text, View, FlatList, Image, TouchableOpacity, TextInput} from 'react-native'
import Modal from "react-native-modal"
import AddressItem from './Item/AddressItem'

class Address extends React.Component {

  constructor(props) {
  super(props);
  this.state = {
      isModalAdVisible : false, isModalAdChanged : false, adMsg : "", isModalAdContent : "",
      country : '', city : '', postal : '', address: '', num : ''
    };
  }

  _connectionReducer(data, value){
    const action = { type: value, value: data}
    this.props.dispatch(action)
  }

  _deleteAddress = (id) =>{
    this.setState({ loading: true, disabled: true }, () =>
    {
        fetch('https://olitot.com/DB/INC/postgres.php',
        {
            method: 'POST',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
            {
              action : 'deleteAddress',
              id : id

            })

        }).then((response) => response.json()).then((responseJson) => {
            this.address();
        }).catch((error) => {

        });
    });
  }

  addAd = () => {
    if(this.state.country != '' && this.state.num != '' && this.state.city != '' && this.state.postal != '' && this.state.address !=''){
        if(!isNaN(this.num) || !isNaN(this.state.postal)){
          this.setState({ loading: true, disabled: true }, () =>
          {
              fetch('https://olitot.com/DB/INC/postgres.php',
              {
                  method: 'POST',
                  headers:
                  {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(
                  {
                    action : 'addAddress',
                    email : this.props.email,
                    country : this.state.country,
                    city : this.state.city,
                    zip : this.state.postal,
                    address : this.state.address,
                    num : this.state.num
                  })

              }).then((response) => response.json()).then((responseJson) =>
              {
                    if(responseJson){
                      this.address();
                      this.setState({ adMsg : "", loading : false, isModalAdVisible: !this.state.isModalAdVisible, country : '', city : '', address : '', num : '', postal : '' });

                    } else {
                      this.setState({ adMsg : "fakeAddress", loading : false, isModalAdVisible: !this.state.isModalAdVisible,})
                    }
                  }).catch((error) =>
              {
                  //alert(error);
                  console.error(error);
                  this.setState({ adMsg : "error", loading : false, isModalAdVisible: !this.state.isModalAdVisible, country : '', city : '', address : '', num : '', postal : '' });
              });
          });
        } else {
          this.setState({adMsg : "NaN", isModalAdVisible: !this.state.isModalAdVisible});
        }
      } else {
        this.setState({adMsg : "empty", isModalAdVisible: !this.state.isModalAdVisible});
    }
  }

  address() {
    return fetch('https://olitot.com/DB/INC/postgres.php', {
        method: 'POST',
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
        {
          action : 'getAddress',
          email : this.props.email
        })

    }).then((response) => response.json()).then((responseJson) => {
          this._connectionReducer(responseJson, 'address');
          this._connectionReducer(responseJson.length, 'nbAddress');
          //this.forceUpdate();

      })
      .catch((error) => {
        console.error(error);
      });
  }

  _toggleModalAd = () => {
    if(this.props.nbAddress >= 3){
      alert("Trop d'adresse. Veuillez en supprimer une pour en pouvoir en ajouter une nouvelle.")
    } else {
      this.setState({ isModalAdVisible: !this.state.isModalAdVisible });
    }
  }

  _toggleModalChanged = () =>
      this.setState({isModalAdChanged: !this.state.isModalAdChanged});


  displayAnswerAd(text){
    if(text == "fromForm"){
      switch(this.state.adMsg){
        case 'fakeAddress' :
          this.setState({isModalAdContent : "L'adresse referencée est incorrect", isModalAdChanged: !this.state.isModalAdChanged});
          break;
        case "" :
          break;
        case "empty" :
          this.setState({isModalAdContent : "Un ou plusieurs champs sont vide!", isModalAdChanged: !this.state.isModalAdChanged});
          break;
        case "error" :
          this.setState({isModalAdContent : "Une erreur s'est produite", isModalAdChanged: !this.state.isModalAdChanged});
          break
        case "NaN" :
          this.setState({isModalAdContent : "Le code postal et le numéro doivent être uniquement composé de chiffre", isModalAdChanged: !this.state.isModalAdChanged});
          break;
      }
    } else if(text == "fromMessage") {
      switch(this.state.adMsg){
        case "" :
          this.setState({adMsg : "" , isModalAdContent : "", isModalAdVisible: !this.state.isModalAdVisible});
          break;
        default :
          this.setState({adMsg : "" ,isModalAdContent : "", isModalAdVisible: !this.state.isModalAdVisible});
          break;
      }
    }
  }


  render() {
    if(this.props.connected){
      if(this.props.addressEmpty){
        return (
          <View style={styles.container}>

          <Modal onModalHide={() => this.displayAnswerAd("fromMessage")} isVisible={this.state.isModalAdChanged}>
            <View style={styles.modalContainerFirst}>
              <View style={styles.modalMainR}>
                  <Text style={styles.TxtModal}>{this.state.isModalAdContent}</Text>
              </View>
            </View>
            <View style={styles.modalContainerLast}>
              <TouchableOpacity style={styles.sendTouch} onPress={this._toggleModalChanged}>
                <Text style={styles.btnModal}> OK </Text>
              </TouchableOpacity>
            </View>
          </Modal>


          <Modal onModalHide={() => this.displayAnswerAd("fromForm")}  isVisible={this.state.isModalAdVisible} >
            <View style={styles.modalContainerFirst}>
              <View style={styles.modalMain}>
                  <Text style={styles.modalTxtIntro}>Ajouter une adresse</Text>
                  <TextInput
                    underlineColorAndroid = "transparent"
                    placeholder = "Pays"
                    style = { styles.textInput }
                    onChangeText = {(text) => this.setState({ country: text })}
                  />
                  <TextInput
                    underlineColorAndroid = "transparent"
                    placeholder = "Ville"
                    style = { styles.textInput }
                    onChangeText = {(text) => this.setState({ city: text })}
                  />
                  <TextInput
                    underlineColorAndroid = "transparent"
                    placeholder = "Code Postal"
                    style = { styles.textInput }
                    onChangeText = {(text) => this.setState({ postal: text })}
                  />
                  <TextInput
                    underlineColorAndroid = "transparent"
                    placeholder = "Adresse"
                    style = { styles.textInput }
                    onChangeText = {(text) => this.setState({ address: text })}
                  />
                  <TextInput
                    underlineColorAndroid = "transparent"
                    placeholder = "Numéro"
                    style = { styles.textInput }
                    onChangeText = {(text) => this.setState({ num: text })}
                  />
              </View>
              <TouchableOpacity style={styles.sendTouch} onPress={this.addAd}>
                <Text style={styles.btnModal}> Ajouter </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalContainerLast}>
              <TouchableOpacity style={styles.sendTouch} onPress={this._toggleModalAd}>
                <Text style={styles.btnModal}> Annuler </Text>
              </TouchableOpacity>
            </View>
          </Modal>


            <View style={styles.firstContainer}>
              <Text style={styles.Title}>Mes adresses</Text>
              <TouchableOpacity
                activeOpacity = { 0.8 } style = { styles.Btn }
                onPress={this._toggleModalAd}>
                  <Text style = { styles.btnText }>Nouvelle adresse</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      } else {
        return (
          <View style={styles.container}>
              <Modal onModalHide={() => this.displayAnswerAd("fromMessage")} isVisible={this.state.isModalAdChanged}>
                <View style={styles.modalContainerFirst}>
                  <View style={styles.modalMainR}>
                      <Text style={styles.TxtModal}>{this.state.isModalAdContent}</Text>
                  </View>
                </View>
                <View style={styles.modalContainerLast}>
                  <TouchableOpacity style={styles.sendTouch} onPress={this._toggleModalChanged}>
                    <Text style={styles.btnModal}> OK </Text>
                  </TouchableOpacity>
                </View>
              </Modal>

              <Modal onModalHide={() => this.displayAnswerAd("fromForm")} isVisible={this.state.isModalAdVisible} >
                <View style={styles.modalContainerFirst}>
                  <View style={styles.modalMain}>
                      <Text style={styles.modalTxtIntro}>Ajouter une adresse</Text>
                      <TextInput
                        underlineColorAndroid = "transparent"
                        placeholder = "Pays"
                        style = { styles.textInput }
                        onChangeText = {(text) => this.setState({ country: text })}
                      />
                      <TextInput
                        underlineColorAndroid = "transparent"
                        placeholder = "Ville"
                        style = { styles.textInput }
                        onChangeText = {(text) => this.setState({ city: text })}
                      />
                      <TextInput
                        underlineColorAndroid = "transparent"
                        placeholder = "Code Postal"
                        style = { styles.textInput }
                        onChangeText = {(text) => this.setState({ postal: text })}
                      />
                      <TextInput
                        underlineColorAndroid = "transparent"
                        placeholder = "Adresse"
                        style = { styles.textInput }
                        onChangeText = {(text) => this.setState({ address: text })}
                      />
                      <TextInput
                        underlineColorAndroid = "transparent"
                        placeholder = "Numéro"
                        style = { styles.textInput }
                        onChangeText = {(text) => this.setState({ num: text })}
                      />
                  </View>
                  <TouchableOpacity style={styles.sendTouch} onPress={this.addAd}>
                    <Text style={styles.btnModal}> Ajouter </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.modalContainerLast}>
                  <TouchableOpacity style={styles.sendTouch} onPress={this._toggleModalAd}>
                    <Text style={styles.btnModal}> Annuler </Text>
                  </TouchableOpacity>
                </View>
              </Modal>


            <View style={styles.firstContainer}>
              <Text style={styles.Title}>Mes adresses</Text>
              <TouchableOpacity
                activeOpacity = { 0.8 } style = { styles.Btn }
                onPress={this._toggleModalAd}>
                  <Text style = { styles.btnText }>Nouvelle adresse</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.flatList}>
              <FlatList
                data={this.props.dataAddress}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <AddressItem address={item} deleteAddress={this._deleteAddress}/>}
              />
            </View>
          </View>
        )
      }
    } else {
      return (
          <View style={styles.containerUnconnected}><Text style={styles.txUnconnected}>Vous devez être connecté pour avoir accès à vos adresses !</Text></View>
      )
    }
  }
}

const styles = StyleSheet.create({
  Title : {
      textAlign: 'center',
      fontSize: 20,
      color: 'grey',
      marginBottom: 10
  },
  textInput: {
      backgroundColor: 'white',
      height: 40,
      marginBottom: 15,
      borderBottomColor: 'grey',
      borderBottomWidth: 2,
      marginVertical: 5,
      alignSelf: 'stretch',
      padding: 8,
      fontSize: 16,
      marginHorizontal : '2%'
  },
  container : {
      flex : 1,
      marginHorizontal : '2%',
  },
  firstContainer : {
    marginTop : 30,
    flex : 1,
  },
  flatList : {
    flex : 6,
    borderTopColor : 'grey',
    borderTopWidth : 1,
  },
  Btn: {
      backgroundColor: 'rgba(0,0,0,0.6)',
      alignSelf: 'stretch',
      padding: 10,
      marginTop: 10,
  },
  btnText: {
      textAlign: 'center',
      color: 'white',
      fontSize: 16
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
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    alignItems: 'center',
  },
  modalMainR : {
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
    fontSize : 17,
    margin : 10,
  },
  TxtModal : {
    textAlign : 'center',
    color : 'black',
    fontSize : 15,
    margin : 10,
  },
  containerUnconnected : {
    flex : 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txUnconnected : {
    margin : 25,
    color : 'grey',
    fontSize : 17,
    textAlign:'center',
  },
})

const mapStateToPros = (state) => {
  return {
    email: state.email,
    connected: state.connected,
    dataAddress : state.dataAddress,
    addressEmpty : state.addressEmpty,
    nbAddress : state.nbAddress,
  }
}

export default connect(mapStateToPros)(Address)
