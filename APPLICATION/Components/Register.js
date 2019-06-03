import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Platform, KeyboardAvoidingView, ScrollView, Image} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'

class Register extends React.Component {


  constructor(){
      super();

      this.state = {Email: '', Name: '', LastName: '', Photo:'', Tel : '', Password : '', VerifPassword : '',  loading: false, disabled: false }
  }

  _connectionReducer(email = "", value){
    const action = { type: value, value: email}
    this.props.dispatch(action);
    this.props.navigation.navigate("Connexion");
  }

  myOrders(){
    return fetch('https://olitot.com/DB/INC/postgres.php', {
        method: 'POST',
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
        {
          action : 'getMyOrders',
          email : this.props.email
        })

    }).then((response) => response.json()).then((responseJson) => {
        if(responseJson != false ){
          this._connectionReducer(responseJson, 'myOrders');
        } else {

        }

      })
      .catch((error) => {
        console.error(error);
      });
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
        if(responseJson != false ){
          this._connectionReducer(responseJson, 'address');
          this._connectionReducer(responseJson.length, 'nbAddress');
        } else {

        }

      })
      .catch((error) => {
        console.error(error);
      });

  }

  annonce() {
    return fetch('https://olitot.com/DB/INC/postgres.php', {
        method: 'POST',
        headers:
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
        {
          action : 'getAdverts',
          email : this.props.email
        })

    }).then((response) => response.json()).then((responseJson) => {
        if(responseJson != false ){
          this._connectionReducer(responseJson, 'annonce');
        } else {

        }

      })
      .catch((error) => {
        console.error(error);
      });

    }

  createNewUser = () =>  {

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
                action : 'testEmail',
                email : this.state.Email,
              })

          }).then((response) => response.json()).then((responseJson) =>
          {
              if(this.state.Email === '') {
                alert("Champ email vide!")
              } else if (this.state.Name === ''){
                alert("Champ prénom vide!")
              } else if (this.state.LastName === ''){
                alert("Champ nom vide!")
              } else if(this.state.Tel === '' || isNaN(this.state.Tel) || this.state.Tel.length < 8 || this.state.Tel.length > 10){
                alert("Champ téléphone vide ou contient autre chose que des chiffres!")
              } else if(this.state.Password === ''){
                alert("Champ mot de passe vide!")
              } else if(this.state.VerifPassword === ''){
                alert("Champ vérification de mot de passe vide!")
              } else if(responseJson){
                alert("Email déjà existant!")
              } else if(this.state.Password.length < 8){
                alert("Veuillez indiquer un mot de passe d'au moins 8 caractères!")
              } else {
                if(this.state.Password === this.state.VerifPassword){
                  this.saveData();
                } else {
                  alert("Mot de passe différents!");
                }
              }
          }).catch((error) =>
          {
              //alert(error);
              console.error(error);
          });

  }

  saveData = () =>  {
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
                action : 'userRegistration',
                email : this.state.Email,
                firstname: this.state.Name,
                lastname: this.state.LastName,
                phone: this.state.Tel,
                password: this.state.Password
              })

          }).then((response) => response.json()).then((responseJson) =>{
              this._connectionReducer(this.state.Email, "login");
              this.annonce();
              this.address();
              this.myOrders();
              this.props.navigation.navigate("Connexion");
              this.setState({ loading: false, disabled: false });
          }).catch((error) =>
          {
              //alert(error);
              console.error(error);
              this.setState({ loading: false, disabled: false });
          });
      });
  }

  render()
  {
      return(
        <KeyboardAwareScrollView
          //style={styles.container}
          //behavior="padding"
          style={{ backgroundColor: '#4c69a5' }}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container}
          scrollEnabled={false}
        >
            <Image
              style={styles.img}
              source={require('../Image/olitoLogo.png')}
            />
            <TextInput
              textContentType = "emailAddress"
              keyboardType = "email-address"
              autoComplete = "email"
              underlineColorAndroid = "transparent"
              placeholder = "Votre Email"
              style = { styles.textInput }
              onChangeText = {(text) => this.setState({ Email: text })}
            />

            <TextInput
              underlineColorAndroid = "transparent"
              placeholder = "Votre prénom"
              style = { styles.textInput }
              onChangeText = {(text) => this.setState({ Name: text })}
            />

            <TextInput
              underlineColorAndroid = "transparent"
              placeholder = "Votre nom"
              style = { styles.textInput }
              onChangeText = {(text) => this.setState({ LastName: text })}
            />

            <TextInput
              underlineColorAndroid = "transparent"
              placeholder = "Votre numéro de téléphone"
              style = { styles.textInput }
              onChangeText = {(text) => this.setState({ Tel: text })}
            />

            <TextInput
              secureTextEntry={true}
              underlineColorAndroid = "transparent"
              placeholder = "Votre mot de passe"
              style = { styles.textInput }
              onChangeText = {(text) => this.setState({ Password: text })}
            />
            <TextInput
              secureTextEntry={true}
              underlineColorAndroid = "transparent"
              placeholder = "Retapez votre mot de passe"
              style = { styles.textInput }
              onChangeText = {(text) => this.setState({ VerifPassword: text })}
            />

            <TouchableOpacity
              disabled = { this.state.disabled }
              activeOpacity = { 0.8 } style = { styles.Btn }
              onPress = { this.createNewUser }>
                <Text style = { styles.btnText }>S'enregistrer</Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled = { this.state.disabled }
              activeOpacity = { 0.8 } style = { styles.Btn }
              onPress = {() => this.props.navigation.navigate("Connexion") }>
                <Text style = { styles.btnText }>Retour</Text>
            </TouchableOpacity>

            {
                (this.state.loading) ? (<ActivityIndicator size = "large" />) : null
            }

        </KeyboardAwareScrollView>
      );
  }
}


const styles = StyleSheet.create(
{
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      paddingHorizontal: 25,
      paddingTop: (Platform.OS == 'ios') ? 20 : 0
    },
    img: {
      width:105,
      height:100,
      paddingHorizontal: 5,
      paddingVertical: 0,
      marginHorizontal: 5,
      marginVertical:0,
    },
    textInput: {
        backgroundColor: 'white',
        height: 40,
        borderBottomColor: 'grey',
        borderBottomWidth: 2,
        marginVertical: 5,
        alignSelf: 'stretch',
        padding: 8,
        fontSize: 16
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
    }
});


const mapStateToPros = (state) => {
  return {
    email: state.email,
  }
}
export default connect(mapStateToPros)(Register)
