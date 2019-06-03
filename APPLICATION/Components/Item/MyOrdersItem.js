// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'




class MyOrdersItem extends React.Component {

  render() {
    const { order, displayDetailOrder } = this.props
      return (
        <TouchableOpacity
          style={styles.main_container}
          onPress={() => displayDetailOrder(order.idadverts, order.id)}>
          <Image
            style={styles.image}
            source={{uri : order.advertpicture}}
          />
          <View style={styles.content_container}>
            <View style={styles.header_container}>
              <Text style={styles.title_text}>{order.name}</Text>
            </View>
            <View style={styles.bodyContainer}>
              <Text style={styles.auteur}>{order.firstname} {order.lastname }</Text>
              <Text style={styles.auteur}>{order.qtbought} parts achetée(s) à {order.price}€</Text>
              {/* La propriété numberOfLines permet de couper un texte si celui-ci est trop long, il suffit de définir un nombre maximum de ligne */}
            </View>
          </View>
        </TouchableOpacity>
      )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 130,
    flexDirection: 'row'
  },
  image: {
    width: 120,
    height: 120,
    margin: 5,
    backgroundColor: 'gray'
  },
  imageRate: {
    width: 100,
    height: 20,
    margin: 5,
    backgroundColor: 'gray'
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header_container: {
    flex: 3,
    flexDirection: 'row'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  nbPart: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#666666'
  },
  bodyContainer: {
    flex: 7,
  },
  auteur: {
    fontStyle: 'italic',
    color: '#666666',
  },
  rate: {
    flex: 4,
    width: 20,
    height: 23
  },
  imageRate: {

  }
})

export default MyOrdersItem
