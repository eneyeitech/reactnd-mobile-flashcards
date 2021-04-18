import React from "react"
import { createStore } from "redux"
import { Provider } from "react-redux"
import { Platform, StatusBar, View } from "react-native"
import Constants from 'expo-constants'
import {
  //createBottomTabNavigator,
  //createMaterialTopTabNavigator
} from "react-navigation-tabs"
import {
  createAppContainer,
  //createStackNavigator,
  //HeaderBackButton
} from "react-navigation"

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HeaderBackButton } from '@react-navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import { clearLocalNotification, setLocalNotification } from "./utils/helpers"
import { Icon } from "react-native-elements"

import reducer from "./reducers"
import Decks from "./components/Decks"
import Deck from "./components/Deck"
import AddDeck from "./components/AddDeck"
import AddCard from "./components/AddCard"
import Quiz from "./components/Quiz"

import { purple, white } from './utils/colors'

const store = createStore(reducer)

const Stack = createStackNavigator()

const Tab =
  Platform.OS === 'ios'
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator()

function Home() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let icon
          if (route.name === 'Add Deck') {
            icon = (
              <Icon name="add" type="material" iconStyle={{ color }} />
            )
          } else if (route.name === 'Decks') {
            icon = (
              <Icon
                name="cards-outline"
                type="material-community"
                iconStyle={{ color }}
              />
            )
          }
          return icon
        },
      })}
      tabBarOptions={{
        activeTintColor: Platform.OS === 'ios' ? purple : white,
        style: {
          backgroundColor: Platform.OS === 'ios' ? white : purple,
        },
        indicatorStyle: {
          // Android tab indicator (line at the bottom of the tab)
          backgroundColor: 'yellow',
        },
      }}
    >
      <Tab.Screen name="Decks" component={Decks} />
      <Tab.Screen name="Add Deck" component={AddDeck} />
    </Tab.Navigator>
  );
}

function FlashcardsStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}


export default class App extends React.Component {
  async componentDidMount() {
    // await clearLocalNotification()
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <FlashcardsStatusBar
            backgroundColor="dimgray"
            barStyle="light-content"
          />
          <NavigationContainer>

            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerStyle: { backgroundColor: '#633689' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' }
              }}>
              <Stack.Screen name="Home" component={Home} options={{ title: 'Home', headerShown: false }} />
              <Stack.Screen name="Deck" component={Deck}
                options={{
                  headerLeft: (
                    <HeaderBackButton
                      onPress={({navigation}) => {
                        navigation.navigate("Decks")
                      }}
                      tintColor="white"
                    />
                  ),
                }}
              />
              <Stack.Screen name="Add Card" component={AddCard} />
              <Stack.Screen name="Quiz" component={Quiz} />
            </Stack.Navigator>

          </NavigationContainer>
        </View>
      </Provider>
    )
  }
}
