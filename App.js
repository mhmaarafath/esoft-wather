import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import WeatherInfo from './components/WeatherInfo';
import UnitPicker from './components/UnitPicker';
import {colors} from './utils/index';
import ReloadIcon from './components/ReloadIcon';
import WeatherDetails from './components/WeatherDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';

import { AntDesign } from '@expo/vector-icons';
import ForcastScreen from './screens/ForcastScreen';
import AppContextProvider from './contexts/AppContext';
import WeatherScreen from './screens/WeatherScreen';
import HistoryScreen from './screens/HistoryScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



function HomeStackNavigator(){

  return (

    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: 'red',
        },
        title: ''
      }}
    >
      <Stack.Screen name="Main" component={HomeScreen} />
      <Stack.Screen name="Forcast" component={ForcastScreen} />
      <Stack.Screen name="Weather" component={WeatherScreen} />
    </Stack.Navigator>

  )
}

function SearchStackNavigator(){

  return (

    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: 'red',
        },
        title: ''
      }}
    >
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
    </Stack.Navigator>

  )
}




export default function App() {
  return (
    <AppContextProvider>
      <NavigationContainer>
      <Tab.Navigator>
            <Tab.Screen 
              name="HomeTab" 
              component={HomeStackNavigator} 
              initialParams={{cityName: ''}}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <AntDesign name="home" size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen 
              name="SearchTab" 
              component={SearchStackNavigator} 
              initialParams={{cityName: ''}}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <AntDesign name="search1" size={size} color={color} />
                ),
              }}
            />
          </Tab.Navigator>

      </NavigationContainer>
    </AppContextProvider>

  )
  /*
  
  */

}
