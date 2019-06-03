import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import Swipeout from 'react-native-swipeout';


class AddressItem extends React.Component {

  render() {
    const { address, deleteAddress } = this.props

    let swipeBtns = [{
      text: 'Delete',
      backgroundColor: 'red',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => deleteAddress(address.id)
    }];

    return (
      <Swipeout
      style={styles.container}
      right={swipeBtns}>
          <View>
            <Text style={styles.country}>{address.country}</Text>
            <Text style={styles.txt}>{address.address} {address.number}</Text>
            <Text style={styles.txt}>{address.city} {address.zip}</Text>
          </View>
      </Swipeout>
    )
  }
}

const styles = StyleSheet.create({
 container : {
   backgroundColor : 'white',
   borderBottomColor : 'grey',
   borderBottomWidth : 1,
 },
 country : {
   textAlign: 'right',
   fontSize : 20,
   color : 'grey',
 },
 txt : {
   fontSize : 17,
   color : 'darkgrey',
 }

})

export default AddressItem
