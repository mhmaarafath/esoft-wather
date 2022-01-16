import React, { useState, useEffect, useContext } from 'react'
import time from '../utils/time';


import { ActivityIndicator, Text, View, StyleSheet, Button, FlatList } from 'react-native';

import WeatherInfo from '../components/WeatherInfo';
import UnitPicker from '../components/UnitPicker';
import {colors, forecast} from '../utils/index';
import ReloadIcon from '../components/ReloadIcon';
import WeatherDetails from '../components/WeatherDetails';
import { AppContext } from '../contexts/AppContext';
import { Card } from 'react-native-paper';
import { FontAwesome5, MaterialCommunityIcons, Ionicons, EvilIcons, AntDesign, MaterialIcons } from '@expo/vector-icons';

const {PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR} = colors




export default function ForcastScreen({navigation, route}) {
    const {unitSystem} = useContext(AppContext)
    const [errorMessage, setErrorMessage] = useState(null);
    const [forcasts, setForcasts] = useState(null);

    async function load(cityName){        
        fetch(forecast(unitSystem, cityName))
        .then(response => response.json())
        .then(result => setForcasts(result.list))
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            load(route.params.cityName);
        });
        return unsubscribe;
    }, [navigation]);


    function Summery({feels_like, humidity, windSpeed, pressure}) {
      return (
          <>
              <View style={styles.weatherDetailsRow}>
                  <View style={[styles.weatherDetailsBox, {borderRightWidth: 1, borderRightColor: BORDER_COLOR}]}>
                      <View style={styles.weatherDetailsRow}>
                          <FontAwesome5 name="temperature-low" size={24} color={PRIMARY_COLOR} />
                          <View style={styles.weatherDetailsItems}>
                              <Text>Feels Like</Text>
                              <Text style={styles.textSecondary}>{feels_like}</Text>
                          </View>
                      </View>
                  </View>
                  <View style={[styles.weatherDetailsBox, {borderRightWidth: 1, borderRightColor: BORDER_COLOR}]}>
                      <View style={styles.weatherDetailsRow}>
                          <MaterialCommunityIcons name="water" size={30} color={PRIMARY_COLOR} />
                          <View style={styles.weatherDetailsItems}>
                              <Text>Humidity</Text>
                              <Text style={styles.textSecondary}>{humidity} %</Text>
                          </View>
                      </View>
                  </View>
              </View>
              <View style={[styles.weatherDetailsRow, {borderTopWidth: 1, borderTopColor: BORDER_COLOR}]}>
                  <View style={[styles.weatherDetailsBox, {borderRightWidth: 1, borderRightColor: BORDER_COLOR}]}>
                      <View style={styles.weatherDetailsRow}>
                          <MaterialCommunityIcons name="weather-windy" size={24} color={PRIMARY_COLOR} />
                          <View style={styles.weatherDetailsItems}>
                              <Text>Wind Speed</Text>
                              <Text style={styles.textSecondary}>{windSpeed}</Text>
                          </View>
                      </View>
                  </View>
                  <View style={[styles.weatherDetailsBox, {borderRightWidth: 1, borderRightColor: BORDER_COLOR}]}>
                      <View style={styles.weatherDetailsRow}>
                          <MaterialCommunityIcons name="speedometer" size={30} color={PRIMARY_COLOR} />
                          <View style={styles.weatherDetailsItems}>
                              <Text>Pressure</Text>
                              <Text style={styles.textSecondary}>{pressure} hPa</Text>
                          </View>
                      </View>
                  </View>
              </View>
          </>
      )
    }

        
      if(forcasts){
        return (

          <FlatList
          data={forcasts}
          keyExtractor={item=>item.dt}
          renderItem={({item})=>(
              <View>
                <View style={{padding: 10}}>
                  <Text>{time(item.dt)}</Text>
                </View>
                <View style={styles.weatherDetails}>
                <Summery 
                  feels_like={item.main.feels_like}
                  humidity={item.main.humidity}
                  windSpeed={item.main.windSpeed}
                  pressure={item.main.pressure}
                />
              </View>
            </View>
          )}
          />


        );
      } else if(errorMessage) {
        return (
          <View style={styles.container}>
              <ReloadIcon load={load}/>
              <Text style={{textAlign: 'center'}}>{errorMessage}</Text>
          </View>
        );
      } else {
        return (
          <View style={styles.container}>
            <ActivityIndicator size="large" color={colors.PRIMARY_COLOR}/>
          </View>
        );
      }
  
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      
      justifyContent: 'center',
    },
    main: {
      justifyContent: 'center',
      flex: 1,
    },



    weatherDetails : {
      marginTop: 'auto',
      borderWidth: 1,
      margin: 10,
      borderColor: BORDER_COLOR,
      borderRadius: 10,
      borderRightWidth: 1
  },
  weatherDetailsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
  },
  weatherDetailsBox: {
      flex: 1,
      padding: 20,
  },
  weatherDetailsItems: {
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
  },
  textSecondary: {
      fontSize: 15,
      color: SECONDARY_COLOR,
      fontWeight: '700',
      margin: 7
  }


  });


  
