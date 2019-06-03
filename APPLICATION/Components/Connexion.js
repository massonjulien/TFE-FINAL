import React from 'react';
import { Button, View, Text, TextInput, StyleSheet, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import { connect } from 'react-redux'
import AccountItem from './Item/AccountItem'


class Connexion extends React.Component {

  constructor(props){
      super(props);
      this.state = {loading : false, disabled : false, isConnected : false, Email: '', Password: '',  loading: false, disabled: false}
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

  _connectionReducer(email = "", value){
    const action = { type: value, value: email}
    this.props.dispatch(action)
  }

  componentDidUpdate(){
    console.log(this.props.email);
    console.log(this.props.connected);
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
        console.log(responseJson);
        if(responseJson != false ){
          this._connectionReducer(responseJson, 'address');
          this._connectionReducer(responseJson.length, 'nbAddress');
        }
        console.log(this.props.nbAdress);


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


  connexion = () => {
    this.setState({loading: true, disabled: true }, () => {
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
                email : this.state.Email,
                password : this.state.Password
              })

          }).then((response) => response.json()).then((responseJson) => {
              console.log(responseJson);
              if(responseJson){
                this._connectionReducer(responseJson[0]['email'], "login");
                this.annonce();
                this.address();
                this.myOrders();
                this.setState({isConnected : true,loading: false, disabled: false });
              } else {
                alert('Identifiant ou mot de passe incorrect');
                this.setState({ loading: false, disabled: false });
              }
          }).catch((error) => {
              //alert(error);
              console.error(error);
          });
    });
  }

  logoff = () => {
    this._connectionReducer("", "logoff")
    this.setState({isConnected: false, Email : '', Password : ''})
  }


  render() {
    if(this.props.connected == true){
      return (
          <View style={styles.LoggedContainer}>
            <AccountItem style={styles.account} />
            <TouchableOpacity
              activeOpacity = { 0.8 } style = { styles.BtnLogOff }
              onPress={this.logoff}>
                <Text style = { styles.btnText }>Déconnexion</Text>
            </TouchableOpacity>
          </View>
      )
    } else if(this.props.connected == false){
      return(
        <KeyboardAwareScrollView
          style={{ backgroundColor: '#4c69a5' }}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container}
          scrollEnabled={false}
        >
            <Image
              style={styles.img}
              source={require('../Image/olitoLogo.png')}
            />
            <Text style={styles.text}> Veuillez vous connecter </Text>
            <TextInput
              textContentType = "emailAddress"
              keyboardType = "email-address"
              underlineColorAndroid = "transparent"
              placeholder = "Email"
              style = { styles.textInput }
              onChangeText = {(text) => this.setState({ Email: text })}
            />
            <TextInput
              secureTextEntry={true}
              underlineColorAndroid = "transparent"
              placeholder = "Mot de passe"
              style = { styles.textInput }
              onChangeText = {(text) => this.setState({ Password: text })}
            />

            <TouchableOpacity
              activeOpacity = { 0.8 } style = { styles.Btn }
              onPress={this.connexion}>
                <Text style = { styles.btnText }>Connexion</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity = { 0.8 } style = { styles.Btn }
              onPress = {() => this.props.navigation.navigate("Register")}>
                <Text style = { styles.btnText }>S'enregistrer</Text>
            </TouchableOpacity>
            {this._displayLoading()}
        </KeyboardAwareScrollView>

      );
    }
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: 'grey',
    marginBottom: 10
  },
  LoggedContainer : {
    backgroundColor: 'white',
    flex : 1,
  },
  container: {
      overflow: "scroll",
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      paddingHorizontal: 25,
      paddingTop: (Platform.OS == 'ios') ? 20 : 0
  },
  account : {
    marginBottom : 500,
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
      marginTop: 10,
  },
  btnText: {
      textAlign: 'center',
      color: 'white',
      fontSize: 16
  },
  BtnLogOff : {
    marginHorizontal : 5,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignSelf: 'stretch',
    padding: 10,
    marginTop: 10,
    marginBottom : 10,
  }
})

const mapStateToPros = (state) => {
  return {
    email: state.email,
    connected: state.connected,
    nbAdress : state.nbAddress
  }
}
export default connect(mapStateToPros)(Connexion)
