import { connect } from 'react-redux'
import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Picker, Image, ScrollView } from 'react-native'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
import DatePicker from 'react-native-datepicker'

class NewPost extends React.Component {

  constructor(){
      super();
      this.state = {nom : '', qte : '0', description :'', photo : '', prix : '', endHour : '00:00', beginHour : '00:00', date : ''}
  }

  _connectionReducer(data, value){
    const action = { type: value, value: data}
    this.props.dispatch(action)
  }

  saveData = () => {
    //console.log('date : ' + this.state.date);
    //console.log('beginHour : ' + this.state.beginHour);
  //  console.log('endHour : ' + this.state.endHour);
    //console.log(this.state.value);
    if(this.state.date == ''){
      alert('Veuillez selectionner une date')
    } else {
      if(this.state.beginHour == ''){
        alert("Veuillez selectionner le début de l'heure de retrait")
      } else {
        if(this.state.endHour == ''){
          alert("Veuillez selectionner la fin de l'heure de retrait")
        } else {
          var beginHour = this.state.beginHour;
          xb = beginHour.split(':');
          yb = parseInt(xb[0]) + (parseInt(xb[1])/100);
          yb = yb + 1;
          console.log(yb);

          var endHour = this.state.endHour;
          xe = endHour.split(':');
          ye = parseInt(xe[0]) + (parseInt(xe[1])/100);
          console.log(ye);

          if(yb > ye){
          	alert('Il doit y avoir au moins heure heure de retrait')
          } else {
            if(this.state.value == undefined){
              alert("Choissisez une adresse pour l'annonce!");
            } else {
              if(this.state.nom != '' && this.state.description != '' && this.state.prix != '' && this.state.qte != '' && this.state.qte != undefined  && !isNaN(this.state.prix) && !isNaN(this.state.qte)){
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
                          action :'addAdvert',
                          email : this.props.email,
                          nom : this.state.nom,
                          description : this.state.description,
                          prix : this.state.prix,
                          qte : this.state.qte,
                          idAddress : this.state.value,
                          date : this.state.date,
                          begin : this.state.beginHour,
                          end : this.state.endHour,
                        })

                    }).then((response) => response.json()).then((responseJson) =>
                    {
                        if(responseJson == true){
                          this.annonce();
                          this.setState({nom : '', description : '', prix : '', qte : '' }, () => this.props.navigation.navigate("Poster"));
                        } else {
                          alert("une erreur s'est produite");
                        }

                    }).catch((error) =>
                    {
                        //alert(error);
                        console.error(error);
                        this.setState({ loading : false, isModalAdVisible: !this.state.isModalAdVisible, country : '', city : '', address : '', num : '', postal : '' });
                    });
                });
              } else {
                alert("Oubli ou erreur dans votre annonce!");
              }
            }
          }
        }
      }
    }

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
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }

  listingAddress(){
    var arr = [];
    if(this.props.nbAddress > 0){
      for(var i =0; i < this.props.nbAddress; i++){
        var temp = '';
        temp += this.props.address[i].address;
        temp += this.props.address[i].number;
        temp += ', ' + this.props.address[i].zip;
        arr.push({label: temp, value:this.props.address[i].id});
      }
      return arr;
    }

  }

  todaysDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) {
        dd = '0'+dd
    }
    if(mm<10) {
        mm = '0'+mm
    }
    today = dd + '/' + mm + '/' + yyyy;

    return today;
  }

  maxDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    switch(mm){
      case 12 :
        mm = 2;
        break;
      case 11 :
        mm = 1;
        break;
      default :
        mm = mm + 2;
        break;
    }
    if(dd<10) {
        dd = '0'+dd
    }
    if(mm<10) {
        mm = '0'+mm
    }
    return today = dd + '/' + mm + '/' + yyyy;
  }


  render() {
    var radio_props = this.listingAddress();
    var todaysDate = this.todaysDate();
    var maxDate = this.maxDate();
    return (
      <View style={styles.container}>
        <View style={styles.firstContainer}>
          <Text style={styles.Title}>Nouvelle annonce</Text>
        </View>
        <ScrollView style={styles.main}>
          <View style={styles.containerImg}>
            <TouchableOpacity style={styles.image} onPress={() => {}}>
              <Image
                style={styles.image}
                source={{uri: this.state.Photo}}
              />
            </TouchableOpacity>
          </View>
          <TextInput
            underlineColorAndroid = "transparent"
            placeholder = "Nom du plat"
            style = { styles.textInput }
            onChangeText = {(text) => this.setState({ nom: text })}
          />
          <View style={styles.picker}>
            <Text style={styles.ennoncPicker}>Nombre de part </Text>
            <TextInput
              maxLength = {2}
              blurOnSubmit = {true}
              keyboardType = 'numeric'
              placeholder = "0"
              style = { styles.prix }
              onChangeText = {(text) => this.setState({ qte: text })}
            />
          </View>
          <TextInput
            multiline = {true}
            numberOfLines = {4}
            maxLength = {200}
            blurOnSubmit = {true}
            underlineColorAndroid = "transparent"
            placeholder = "Description du plat, ingrédients, ..."
            style = { styles.description }
            onChangeText = {(text) => this.setState({ description: text })}
          />
          <View style={styles.picker}>
            <Text style={styles.ennoncPicker}>Prix par part     </Text>
            <TextInput
              maxLength = {2}
              blurOnSubmit = {true}
              keyboardType = 'numeric'
              placeholder = "€"
              style = { styles.prix }
              onChangeText = {(text) => this.setState({ prix: text })}
            />
          </View>
          <View style={styles.address_container}>
            <RadioForm
              radio_props={radio_props}
              initial= {-1}
              buttonColor={'#000000'}
              selectedButtonColor={'#000000'}
              onPress={(value) => {this.setState({value:value})}}
            />
          </View>
          <View style={styles.date_container}>
            <Text>Date de l'annonce</Text>
            <DatePicker
              style={{width: 200}}
              mode="date"
              date={this.state.date}
              placeholder="selectionnez une date"
              format="DD-MM-YYYY"
              minDate={todaysDate}
              maxDate={maxDate}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {this.setState({date: date})}}
            />
            <Text>Début du retrait</Text>
            <DatePicker
              style={{width: 200}}
              mode="time"
              date={this.state.beginHour}
              minDate="09:00"
              maxDate="23:59"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(hour) => {this.setState({beginHour: hour})}}
            />
            <Text>Fin du retrait</Text>
            <DatePicker
              style={{width: 200}}
              mode="time"
              date={this.state.endHour}
              minDate="09:00"
              maxDate="23:59"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(hour) => {this.setState({endHour: hour})}}
            />
          </View>
          <View style={styles.lastContainer}>
            <TouchableOpacity
              disabled = { this.state.disabled }
              activeOpacity = { 0.8 } style = { styles.Btn }
              onPress = {this.saveData}>
                <Text style = { styles.btnText }>Ajouter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled = { this.state.disabled }
              activeOpacity = { 0.8 } style = { styles.Btn }
              onPress = {() => this.props.navigation.navigate("Poster") }>
                <Text style = { styles.btnText }>Retour</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
      flex : 1,
      marginHorizontal : 15,
      marginBottom : '2%',
  },
  containerImg : {
        alignItems: 'center',
  },
  firstContainer : {
    marginTop : 30,
    height : '10%',
  },
  main : {
    height : '80%',
  },
  prix : {
    fontSize : 17,
    width : 200,
    marginTop : 10,
    marginBottom : 10,
  },
  picker : {
    flexDirection : 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
  },
  description : {
    marginTop : 20,
    textAlignVertical: "top",
    height : 100,
    fontSize : 12,
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
  },
  lastContainer : {
    flex : 1,
  },
  ennoncPicker : {
    marginTop : 10,
    fontSize : 18,
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
  image : {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width: 150,
    height:150,
    backgroundColor:'#fff',
    borderRadius:0 ,
  },
  btnText: {
      textAlign: 'center',
      color: 'white',
      fontSize: 16
  },
  Title : {
      textAlign: 'center',
      fontSize: 20,
      color: 'grey',
      marginBottom: 10
  },
  address_container : {
    paddingTop : '4%',
    borderBottomColor : 'black',
    borderBottomWidth : 1,
  }
})

const mapStateToPros = (state) => {
  return {
    email: state.email,
    connected: state.connected,
    address: state.dataAddress,
    nbAddress : state.nbAddress
  }
}

export default connect(mapStateToPros)(NewPost)
