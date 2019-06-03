// Components/FilmDetail.js
import { connect } from 'react-redux'
import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, Picker, Table, TouchableOpacity } from 'react-native'


class FoodDetail extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      food : undefined, qteArray : [], qte : '',
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
      alert('Vous devez être connecté pour pouvoir commander!');
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
                alert("Vous avez commandé!");
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
        alert("Veuillez selectionner au moins une portion.")
      }
    }


  }




  _displayAnnonce() {
    {/* ici on définit une constante nommé film qui sera égale a this.state.film donc au lieu de faire
        this.state.film.qqchose on peut juste faire film.qqchose */}
    const { food } = this.state

    let qteDispItems = this.state.qteArray.map( (i) => {
        return <Picker.Item key={i} value={i} label={i.toString()} />
    });
    if (this.state.food != undefined) {
      return (
        <View style={styles.main_container}>
          <View style={styles.image_container}>
            <Image
              style={styles.profil}
              source={{uri : food.profilepicture}}
            />
            <View style={styles.rate_container}>
              <Image
                style={styles.rate}
                source={this.rate(food.rate)}
              />
            </View>
            <Image
              style={styles.image}
              source={{uri : food.advertpicture}}
            />

          </View>
          <View style={styles.data_container}>
            <View fillViewport="true" style={styles.scroll_container}>
              <View style={styles.txt_profil}>
                <Text style={styles.identity}>{food.name}</Text>
                <Text style={styles.description}>{food.description}</Text>
                <Text style={styles.identity}>{food.price}€ / parts</Text>
                <Text style={styles.identity}>Disponible de {food.beginhour} à {food.endhour}</Text>
              </View>
              <View style={styles.cmd}>
                <Picker
                  selectedValue={this.state.qte}
                  style={{height: 50, width: 300}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({qte: itemValue})
                  }>
                  {qteDispItems}
                </Picker>
              </View>
            </View>
            <View style={styles.last_container}>
            <TouchableOpacity
              activeOpacity = { 0.8 } style = { styles.btn }
              onPress={this.commander}>
                <Text style = { styles.btnText }>Commander</Text>
            </TouchableOpacity>
            </View>
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
  last_container : {
    flex : 2,
    marginBottom : '4%'
  },
  image_container : {
    flex : 3,
    borderBottomColor : 'black',
    borderBottomWidth : 1,
    alignItems: 'center',
  },
  data_container : {
    flex : 5,
    marginTop: '15%',
  },
  image : {
    height: '100%',
    width:'100%',
  },
  profil : {
    borderWidth:1,
    borderColor:'black',
    alignItems:'center',
    justifyContent:'center',
    width:"25%",
    height:"40%",
    backgroundColor:'#fff',
    borderRadius:50,
  },
  txt_profil : {
    marginHorizontal : '2%',
  },
  identity : {
    fontSize : 18,
    color: 'grey',
    marginBottom : '5%',
  },
  cmd : {
    marginTop : '2%',
    borderTopColor : 'black',
    borderTopWidth : 1
  },
  profil_rate : {
    flex : 1,
  },
  rate_container : {
    alignItems:'center',
    marginBottom : '5%',
  },
  rate : {
    width : 150,
    height : 28,
    alignItems:'center',
  },
  btnText: {
      textAlign: 'center',
      color: 'white',
      fontSize: 16
  },
  btn : {
    marginHorizontal : 5,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignSelf: 'stretch',
    padding: 10,
    marginTop: 10,
    marginBottom : '5%',
  }

})

const mapStateToPros = (state) => {
  return {
    email: state.email,
    connected: state.connected
  }
}
export default connect(mapStateToPros)(FoodDetail)
