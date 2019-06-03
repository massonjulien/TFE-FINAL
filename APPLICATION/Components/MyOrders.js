// Components/Poster.js
import { connect } from 'react-redux'
import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native'
import MyOrdersItem from './Item/MyOrdersItem'


class MyOrders extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       dataSource : [], isFetching: false,
      };
  }

  _displayDetailOrder = (idadvert, id) => {
      //console.log(id);
      //console.log(idadvert);
      this.props.navigation.navigate("MyOrderDetailNew", { idadvert: idadvert, id : id});
  }

  onRefresh() {
       this.setState({ isFetching: true }, function() { this.myOrders() });
       this.setState({ isFetching: false });
  }

  _connectionReducer(email = "", value){
    const action = { type: value, value: email}
    this.props.dispatch(action)
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
          //console.log(responseJson);
          this._connectionReducer(responseJson, 'myOrders');
        } else {

        }

      })
      .catch((error) => {
        console.error(error);
      });
  }



  render() {
    if(this.props.connected){
      return (
        <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.Title}>Mes commandes</Text>
          </View>
          <FlatList
            data={this.props.dataMyOrders}
            keyExtractor={(item) => item.id.toString()}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
            renderItem={({item}) => <MyOrdersItem displayDetailOrder={this._displayDetailOrder} order={item}/>}
          />

        </View>
      )
    } else {
      return (
          <View style={styles.containerUnconnected}><Text style={styles.txUnconnected}>Vous devez être connecté pour avoir accès à vos commandes !</Text></View>
      )
    }
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 30,
  },
  Title : {
      textAlign: 'center',
      fontSize: 20,
      color: 'grey',
      marginBottom: 10
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: 'grey',
    marginBottom: 10
  },
  textInput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5,
    marginTop: 5
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
    dataMyOrders : state.dataMyOrders,
    myOrdersEmpty : state.myOrdersEmpty
  }
}

export default connect(mapStateToPros)(MyOrders)
