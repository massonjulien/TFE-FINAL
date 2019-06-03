import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import Swipeout from 'react-native-swipeout';


class AddressItem extends React.Component {

  render() {
    const { annonce, displayDetailAnnonce } = this.props
    return (
      <TouchableOpacity
        style={styles.main_container}
        onPress={() => displayDetailAnnonce(annonce.id)}>

            <Image
              style={styles.image}
              source={{uri: annonce.advertpicture}}
            />
            <View style={styles.content_container}>
              <View style={styles.header_container}>
                <Text numberOfLines={2} style={styles.title_text}>{annonce.name}</Text>
                <Text style={styles.nbPart}>{annonce.price}€</Text>
              </View>
              <View style={styles.bodyContainer}>
                <Text numberOfLines={3} style={styles.description}>{annonce.description}</Text>
              </View>
            </View>

        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 130,
    flexDirection: 'row',
    marginHorizontal : '2%',
  },
  image: {
    width: 120,
    height: 120,
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
    height : 90,
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
    flexDirection: 'row'
  },
  description: {
    fontStyle: 'italic',
    color: '#666666',
    flex: 3,
    marginTop : 10,
  },
  rate: {
    flex: 4,
    width: 20,
    height: 20
  },
  imageRate: {

  }
})

export default AddressItem
