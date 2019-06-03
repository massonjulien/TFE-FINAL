// Components/FilmItem.js
import { connect } from 'react-redux'
import React from 'react'
import { StyleSheet, ActivityIndicator, ScrollView, Button, ListView, Text, View, Alert, FlatList, Image, TouchableOpacity, TextInput } from 'react-native'
import Modal from "react-native-modal"
import { Rating, AirbnbRating } from 'react-native-ratings';

class AccountItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false, dataSource: [],
      isModalTelContent : "", isModalTelVisible : false, isModalTelChangedVisible : false, phoneOk : undefined,
      isModalPwdContent : "", isModalPwdVisible : false, isModalPwdChangedVisible : false, pwdMsg : "",
      isModalPhotoVisible : false,
      Tel : '', Password : '', newTel : '',  oldPwd : '', verifPwd : '', newPwd : '', Photo : 'x',
    };
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

  countPassword(pass = ""){
    let x = "";
    for(let i = 0; i < pass.length; i++){
      x += "*"
    }
    return x
  }

  _changeTel = () => {
    if(this.state.newTel.length < 9 || this.state.newTel.length > 10 || isNaN(this.state.newTel)){
      this.setState({isModalTelVisible : !this.state.isModalTelVisible, phoneOk : false});
    } else {
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
                action : 'changePhone',
                email : this.state.dataSource['email'],
                phone : this.state.newTel
              })

          }).then((response) => response.json()).then((responseJson) =>
          {
              this.setState({ isLoading : false, isModalTelVisible: !this.state.isModalTelVisible, phoneOk : true, Tel : this.state.newTel, newTel : '' });
          }).catch((error) =>
          {
              //alert(error);
              console.error(error);
              this.setState({ isLoading : false, isModalPwdVisible : !this.state.isModalPwdVisible, phoneOk : false, loading: false, disabled: false });
          });
      });
    }
  }

  _changePwd = () => {
    this.setState({isLoading: true}, () => {
          fetch('https://olitot.com/DB/INC/postgres.php', {
              method: 'POST',
              headers:
              {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(
              {
                action : 'testUser',
                email : this.state.dataSource['email'],
                password : this.state.oldPwd,
              })
          }).then((response) => response.json()).then((responseJson) => {
              if(responseJson){
                if(this.state.newPwd == this.state.verifPwd){
                  if(this.state.newPwd.length > 8){
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
                          action : 'changePassword',
                          email : this.state.dataSource['email'],
                          password : this.state.newPwd,
                        })

                    }).then((response) => response.json()).then((responseJson) =>
                    {
                        //alert("Mot de passe changé!");
                        this.setState({ isLoading : false, pwdMsg : "ok", isModalPwdVisible: !this.state.isModalPwdVisible, Password : this.state.newPwd, oldPwd : '', verifPwd : '', newPwd : '' });
                    }).catch((error) =>
                    {
                        //alert(error);
                        //console.error(error);
                        this.setState({ isLoading : false, isModalPwdVisible : !this.state.isModalPwdVisible, pwdMsg : "error", loading: false, disabled: false });
                    });
                  } else {
                      this.setState({isLoading : false, pwdMsg : "toShort",  isModalPwdVisible : !this.state.isModalPwdVisible});
                  }
                } else {
                  this.setState({isLoading : false, pwdMsg : "notSame",  isModalPwdVisible : !this.state.isModalPwdVisible});
                }
              } else {
                this.setState({isLoading : false,  pwdMsg : "wrongPwd",  isModalPwdVisible : !this.state.isModalPwdVisible});
              }
          }).catch((error) => {
              //alert(error);
              this.setState({isLoading : false})
              console.error(error);
          });
    });
  }

  _toggleModalTel = () =>
      this.setState({ isModalTelVisible: !this.state.isModalTelVisible, newTel : '' });

  _toggleModalTelChanged = () =>
      this.setState({ isModalTelChangedVisible: !this.state.isModalTelChangedVisible });

  _toggleModalPwd = () =>
      this.setState({ isModalPwdVisible: !this.state.isModalPwdVisible, oldPwd : '', newPwd : '', verifPwd : '' });

  _toggleModalPwdChanged = () =>
      this.setState({ isModalPwdChangedVisible: !this.state.isModalPwdChangedVisible });

  _toggleModalPhoto = () =>
      this.setState({ isModalPhotoVisible: !this.state.isModalPhotoVisible });


componentDidMount() {
  this.setState({isLoading : true});
  return fetch('https://olitot.com/DB/INC/postgres.php', {
      method: 'POST',
      headers:
      {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(
      {
        action : 'getData',
        email : this.props.email
      })

  }).then((response) => response.json()).then((responseJson) => {
      this.setState({
        dataSource : responseJson[0],
        Tel : responseJson[0].phone,
        Password : responseJson[0].password,
        Photo : responseJson[0].profilepicture,
        isLoading : false
      });
    })
    .catch((error) => {
      console.error(error);
      this.setState({isLoading : false})
    });
}

whichRate(rate){
  if(rate != -1){
      return <AirbnbRating isDisabled={true} count={5}  defaultRating={rate} showRating={false} size={25}/>
  } else {
      return <Text></Text>
  }
}

  displayAnswerPhone(text){
    if(text == "fromForm"){
      if(this.state.phoneOk == undefined){

      } else if(this.state.phoneOk == true){
        this.setState({phoneOk : undefined, isModalTelContent : "Votre numéro a changé!", isModalTelChangedVisible : true});
      } else {
        this.setState({isModalTelContent : "Numéro incorrect", isModalTelChangedVisible : true});
      }
    } else if(text == "fromMessage") {
      if(this.state.phoneOk == undefined){

      } else if(this.state.phoneOk != true){
        this.setState({phoneOk : undefined, isModalTelContent : "", isModalTelVisible : true});
      } else {
        this.setState({phoneOk : undefined});
      }
    }
  }

  displayAnswerPwd(text){
    if(text == "fromForm"){
      switch(this.state.pwdMsg){
        case "" :
          break;
        case 'toShort' :
          this.setState({isModalPwdContent : "Mot de passe trop court", isModalPwdChangedVisible : true});
          break;
        case 'wrongPwd' :
          this.setState({isModalPwdContent : "Ancien mot de passe incorrect", isModalPwdChangedVisible : true});
          break;
        case 'notSame' :
          this.setState({isModalPwdContent : "Mots de passe entré pas les mêmes", isModalPwdChangedVisible : true});
          break;
        case 'ok' :
          this.setState({pwdMsg: "",isModalPwdContent : "Votre mot de passe a changé!", isModalPwdChangedVisible : true});
          break;
      }
    } else if(text == "fromMessage"){
      switch(this.state.pwdMsg){
        case "" :
          break;
        case 'ok' :
          this.setState({pwdMsg : ""});
          break;
        default :
          this.setState({pwdMsg : "", isModalPwdContent : "", isModalPwdVisible : true});
          break;
      }
    }
  }

render() {
  var rate = this.whichRate(this.state.dataSource['rate']);
  return (
    <View style={styles.mainContainer}>
      {this._displayLoading()}

      <Modal onModalHide={() => this.displayAnswerPwd("fromForm")} isVisible={this.state.isModalPwdVisible} >
        <View style={styles.modalContainerFirst}>
          <View style={styles.modalMain}>
              <Text style={styles.modalTxtIntro}>Changer le mot de passe</Text>
              <TextInput
                underlineColorAndroid = "transparent"
                placeholder = "Ancien mot de passe"
                secureTextEntry={true}
                style = { styles.textInput }
                onChangeText = {(text) => this.setState({ oldPwd: text })}
              />
              <TextInput
                underlineColorAndroid = "transparent"
                placeholder = "Nouveau mot de passe"
                secureTextEntry={true}
                style = { styles.textInput }
                onChangeText = {(text) => this.setState({ newPwd: text })}
              />
              <TextInput
                underlineColorAndroid = "transparent"
                placeholder = "Retapez le nouveau mot de passe"
                secureTextEntry={true}
                style = { styles.textInput }
                onChangeText = {(text) => this.setState({ verifPwd: text })}
              />
          </View>
          <TouchableOpacity style={styles.sendTouch} onPress={this._changePwd}>
            <Text style={styles.btnModal}> CHANGER </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.modalContainerLast}>
          <TouchableOpacity style={styles.sendTouch} onPress={this._toggleModalPwd}>
            <Text style={styles.btnModal}> CANCEL </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal onModalHide={() => this.displayAnswerPwd("fromMessage")}  isVisible={this.state.isModalPwdChangedVisible} >
        <View style={styles.modalContainerFirst}>
          <View style={styles.modalMainR}>
              <Text style={styles.TxtModal}>{this.state.isModalPwdContent}</Text>
          </View>
        </View>
        <View style={styles.modalContainerLast}>
          <TouchableOpacity style={styles.sendTouch} onPress={this._toggleModalPwdChanged}>
            <Text style={styles.btnModal}> OK </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal onModalHide={() => this.displayAnswerPhone("fromForm")} isVisible={this.state.isModalTelVisible} >
        <View style={styles.modalContainerFirst}>
          <View style={styles.modalMain}>
              <Text style={styles.modalTxtIntro}>Changer de numéro de téléphone</Text>
              <TextInput
                underlineColorAndroid = "transparent"
                placeholder = "Nouveau numéro"
                style = { styles.textInput }
                onChangeText = {(text) => this.setState({ newTel: text })}
              />
          </View>
          <TouchableOpacity style={styles.sendTouch} onPress={this._changeTel}>
            <Text style={styles.btnModal}> CHANGER </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.modalContainerLast}>
          <TouchableOpacity style={styles.sendTouch} onPress={this._toggleModalTel}>
            <Text style={styles.btnModal}> CANCEL </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal onModalHide={() => this.displayAnswerPhone("fromMessage")}  isVisible={this.state.isModalTelChangedVisible} >
        <View style={styles.modalContainerFirst}>
          <View style={styles.modalMainR}>
              <Text style={styles.TxtModal}>{this.state.isModalTelContent}</Text>
          </View>
        </View>
        <View style={styles.modalContainerLast}>
          <TouchableOpacity style={styles.sendTouch} onPress={this._toggleModalTelChanged}>
            <Text style={styles.btnModal}> OK </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal  isVisible={this.state.isModalPhotoVisible} >
        <View style={styles.modalContainerFirst}>
          <View style={styles.modalMain}>
              <Text style={styles.modalTxtIntro}>Changer la photo du profil</Text>
              <TouchableOpacity onPress={() => {}}>
                <Image
                  style={styles.image}
                  source={{uri: this.state.Photo}}
                />
              </TouchableOpacity>

          </View>
          <TouchableOpacity style={styles.sendTouch} onPress={() => {}}>
            <Text style={styles.btnModal}> CHANGER </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.modalContainerLast}>
          <TouchableOpacity style={styles.sendTouch} onPress={this._toggleModalPhoto}>
            <Text style={styles.btnModal}> CANCEL </Text>
          </TouchableOpacity>
        </View>
      </Modal>




      <View style={styles.firstContainer}>
        <TouchableOpacity style={styles.image} onPress={this._toggleModalPhoto}>
          <Image
            style={styles.image}
            source={{uri: this.state.Photo}}
          />
        </TouchableOpacity>
        <View style={styles.rate}>
          {rate}
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.enoncs}> Email </Text>
        <View style={styles.datas}>
          <Text style={styles.datasText}> {this.state.dataSource['email']}</Text>
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.enoncs}> Identité </Text>
        <View style={styles.datas}>
          <Text style={styles.datasText}> {this.state.dataSource['firstname']} {this.state.dataSource['lastname']} </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.container} onPress={this._toggleModalTel}>
          <Text style={styles.enoncs}> Téléphone </Text>
          <View style={styles.datas}>
           <Text style={styles.datasText}>{this.state.Tel} </Text>
          </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.container} onPress={this._toggleModalPwd}>
        <Text style={styles.enoncs}> Password </Text>
        <View style={styles.datas}>
         <Text style={styles.datasText}> {this.countPassword("coucoucu")} </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

}

const styles = StyleSheet.create({
  mainContainer : {
    flex : 1,
    backgroundColor: 'white',
  },
  modalMain : {
    marginTop: 5,
    paddingVertical : 15,
    marginBottom: 5,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    alignItems: 'center',
  },
  imgRate : {
    width : 200,
    height : 37,
    marginTop : 10,
  },
  modalEnoncs : {
    marginLeft : 15,
  },
  modalTxtIntro : {
    color: 'grey',
    margin : 10,
    fontSize : 20,
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
  Btn: {
      backgroundColor: 'rgba(0,0,0,0.6)',
      alignSelf: 'stretch',
      padding: 10,
      marginTop: 10
  },
  btnText: {
      textAlign: 'center',
      color: 'white',
      fontSize: 16
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
      marginHorizontal : 15
  },
  image : {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:100,
    height:100,
    backgroundColor:'#fff',
    borderRadius:50,
    marginBottom : '2%',
  },
  rate : {
    flex : 1,
  },
  firstContainer : {
    marginTop: 40,
    flex: 2,
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    marginHorizontal: 20,
  },
  container : {
    flex : 1,
    height : 100,
    marginHorizontal: 20,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5
  },
  enoncs : {
    color : 'grey',
    marginHorizontal : 15,
  },
  datas : {
    justifyContent: 'center',
    alignItems: 'center',
  },
  datasText : {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize : 15,
    fontStyle : 'italic',
  },
  TxtModal : {
    textAlign : 'center',
    color : 'black',
    fontSize : 15,
    margin : 10,
  },
  modalMainR : {
    marginTop: 5,
    paddingVertical : 15,
    marginBottom: 5,
    alignItems: 'center',
  },
});

const mapStateToPros = (state) => {
  return {
    email: state.email,
    connected: state.connected
  }
}
export default connect(mapStateToPros)(AccountItem)
