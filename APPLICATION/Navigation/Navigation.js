// Navigation/Navigation.js
import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator  } from 'react-navigation'


import Poster from '../Components/Poster'
import Search from '../Components/Search'
import Connexion from '../Components/Connexion'
import Register from '../Components/Register'
import MyOrders from '../Components/MyOrders'
import NewPost from '../Components/NewPost'
import Address from '../Components/Address'
import AnnonceDetail from '../Components/Detail/AnnonceDetail'
import AnnonceDetailNew from '../Components/Detail/AnnonceDetailNew'
import FoodDetail from '../Components/Detail/FoodDetail'
import FoodDetailNew from '../Components/Detail/FoodDetailNew'
import MyOrderDetail from '../Components/Detail/MyOrderDetail'
import MyOrderDetailNew from '../Components/Detail/MyOrderDetailNew'

const PostNavigator = createStackNavigator({
  Poster: {
    screen: Poster,
    navigationOptions: {
      headerLeft: null,
      header: null
    }
  },
  NewPost: {
    screen: NewPost,
    navigationOptions: {
      headerLeft: null,
      header: null
    }
  },
  AnnonceDetailNew : {
    screen : AnnonceDetailNew
  }
});

const ConnectionNagivator = createStackNavigator({
  Connexion: {
    screen: Connexion,
    navigationOptions: {
      headerLeft: null,
      header: null
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {
      headerLeft: null,
      header: null
    }
  }
});

const SearchNavigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      headerLeft: null,
      header: null
    }
  },
  FoodDetailNew: {
    screen: FoodDetailNew,
  }
});

const MyOrdersNavigator = createStackNavigator({
  MyOrders: {
    screen: MyOrders,
    navigationOptions: {
      headerLeft: null,
      header: null
    }
  },
  MyOrderDetailNew: {
    screen: MyOrderDetailNew,
  }
});

const OlitotTabNavigator = createBottomTabNavigator({
  Search: {
    screen: SearchNavigator,
    navigationOptions: {
      tabBarIcon: ({ focused }) => {
        const icon = focused
          ? styles.activeIcon
          : styles.inactiveIcon
        const image = focused
          ? require('../Image/selectedSearch.png')
          : require('../Image/unselectedSearch.png')
          return (
              <Image
                  source={image}
                  style={icon}
              />
          )
      }
    }
  },
  MyOrders: {
    screen: MyOrdersNavigator,
    navigationOptions: {
      tabBarIcon: ({ focused }) => {
        const icon = focused
          ? styles.activeIcon
          : styles.inactiveIcon
        const image = focused
          ? require('../Image/selectedCommande.png')
          : require('../Image/unselectedCommande.png')
          return (
              <Image
                  source={image}
                  style={icon}
              />
          )
      }
    }
  },
  Poster: {
    screen: PostNavigator,
    navigationOptions: {
      tabBarIcon: ({ focused }) => {
        const icon = focused
          ? styles.activeIconPoster
          : styles.inactiveIconPoster
        const image = focused
          ? require('../Image/selectedPoster.png')
          : require('../Image/unselectedPoster.png')
          return (
              <Image
                  source={image}
                  style={icon}
              />
          )
      }
    }
  },
  Address: {
    screen: Address,
    navigationOptions: {
      tabBarIcon: ({ focused }) => {
        const icon = focused
          ? styles.activeIcon
          : styles.inactiveIcon
        const image = focused
          ? require('../Image/homeSelected.png')
          : require('../Image/homeUnselected.png')
          return (
              <Image
                  source={image}
                  style={icon}
              />
          )
      }
    }
  },
  Profil: {
    screen: ConnectionNagivator,
    navigationOptions: {
      tabBarIcon: ({ focused }) => {
        const icon = focused
          ? styles.activeIcon
          : styles.inactiveIcon
        const image = focused
          ? require('../Image/selectedProfil.png')
          : require('../Image/unselectedProfil.png')
          return (
              <Image
                  source={image}
                  style={icon}
              />
          )
      }
    }
  }
},{
  tabBarOptions: {
    //activeBackgroundColor: '#DDDDDD',
    //inactiveBackgroundColor: '#FFFFFF',
    showLabel: false,
    showIcon: true,

  }
})

const styles = StyleSheet.create({
  icon:{
    width:30,
    height:30
  },
  activeIconPoster : {
    width: 40,
    height:40
  },
  inactiveIconPoster : {
    width: 35,
    height:35
  },
  activeIcon:{
    width: 35,
    height:35
  },
  inactiveIcon:{
    width:30,
    height:30
  }
})
const mapStateToProps = (state) => {
  return {
    email: state.email,
    connected: state.connected
  }
}
export default createAppContainer(OlitotTabNavigator)
