// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import { Rating, AirbnbRating } from 'react-native-ratings';
import RF from "react-native-responsive-fontsize"


class FoodItem extends React.Component {

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
    today = dd + '-' + mm + '-' + yyyy;

    return today;
  }

  whichRate(rate){
    if(rate != -1){
        return <AirbnbRating isDisabled={true} count={5}  defaultRating={rate} showRating={false} size={15}/>
    } else {
        return <Text></Text>
    }
  }

  render() {
    const { food, displayDetailFood } = this.props
    var today = this.todaysDate();
    var rate = this.whichRate(food.rate);
    if(food.qtavaible > 0 && food.date == today){
      return (
        <TouchableOpacity
          style={styles.main_container}
          onPress={() => displayDetailFood(food.id)}>
          <View   style={styles.advertPicture_container}>
            <Image
              style={styles.image}
              resizeMode = {'contain'}
              source={{uri : food.advertpicture}}
            />
          </View>
            {rate}
            <Text style={styles.title_text}>{food.name}</Text>
            <Text style={styles.nbPart}>{food.qtavaible} part(s) au prix de {food.price}€</Text>
            <Text style={styles.nbPart}>{food.beginhour} - {food.endhour}</Text>
          <View>
          </View>
        </TouchableOpacity>
      )
    } else {
      return (
        <View>
        </View>
      )
    }
  }
}


const styles = StyleSheet.create({
  main_container : {
    height : 230,
    marginTop : 10,
    marginBottom : 10,
    marginRight : 20,
    marginLeft : 20,
    borderColor : 'black',
    borderWidth : 1,
    borderRadius : 10,
  },
  image : {
    height : 130,
  },
  advertPicture_container : {
    height : 130,
    borderTopLeftRadius : 10,
    borderTopRightRadius : 10,
    backgroundColor : 'grey',
  },
  title_text : {
    fontWeight: 'bold',
    color : 'black',
    marginLeft : 15,
  },
  nbPart : {
    fontStyle : 'italic',
    color : 'black',
    marginLeft : 20,
  }

})

export default FoodItem
