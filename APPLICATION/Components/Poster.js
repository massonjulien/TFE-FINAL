import { connect } from 'react-redux'
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import AnnonceItem from './Item/AnnonceItem'

class Poster extends React.Component {

  constructor(props) {
  super(props);
  this.state = {
      annonceEmpty : true, nbAnnonce : 0,
    };
  }

  _displayDetailAnnonce = (id) => {
    this.props.navigation.navigate("AnnonceDetailNew", { id: id })
  }

  navigateToNewPost(){
    //console.log('coucou');
    //console.log(this.props.nbAddress);
    if(this.props.nbAddress == undefined || this.props.nbAddress == 0){
      alert("Vous devez d'abord réferencer une adresse pour pouvoir poster une annonce");
    } else {
      this.props.navigation.navigate("NewPost");
    }
  }

  render() {
      if(this.props.connected){
        if(this.props.annonceEmpty){
          return (
            <View style={styles.container}>
              <View style={styles.firstContainer}>
                <Text style={styles.Title}>Mes annonces</Text>
                <TouchableOpacity
                  activeOpacity = { 0.8 } style = { styles.Btn }
                  onPress = {() => this.navigateToNewPost()}>
                    <Text style = { styles.btnText }>Nouvelle annonce</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        } else {
          return (
            <View style={styles.container}>
              <View style={styles.firstContainer}>
                <Text style={styles.Title}>Mes annonces</Text>
                <TouchableOpacity
                  activeOpacity = { 0.8 } style = { styles.Btn }
                  onPress = {() => this.navigateToNewPost()}>
                    <Text style = { styles.btnText }>Nouvelle annonce</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.flatContainer}>
                <FlatList
                  data={this.props.dataAnnonce}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({item}) => <AnnonceItem displayDetailAnnonce={this._displayDetailAnnonce} annonce={item}/>}
                />
              </View>
            </View>
          )
        }

      } else {
        return (
          <View style={styles.containerUnconnected}><Text style={styles.txUnconnected}>Vous devez être connecté pour pouvoir poster une annonce !</Text></View>
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
  txUnconnected : {
    margin : 25,
    color : 'grey',
    fontSize : 17,
    textAlign:'center',
  },
  containerUnconnected : {
    flex : 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container : {
    flex : 1,
    marginBottom : '5%',
  },
  firstContainer : {
    marginTop : 30,
    flex : 1,
  },
  flatContainer : {
    flex : 6,
  },
  Btn: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignSelf: 'stretch',
    padding: 10,
    marginTop: 10,
    marginHorizontal : '2%',
  },
  btnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
})

const mapStateToPros = (state) => {
  return {
    email: state.email,
    connected: state.connected,
    dataAnnonce : state.dataAnnonce,
    annonceEmpty : state.annonceEmpty,
    nbAddress : state.nbAddress,
  }
}
export default connect(mapStateToPros)(Poster)
