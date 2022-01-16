import React, { useContext } from 'react'
import { ActivityIndicator, Text, View, StyleSheet, Button } from 'react-native';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import WeatherInfo from '../components/WeatherInfo';
import UnitPicker from '../components/UnitPicker';
import {colors, styles, weatherLongLatUrl, weatherCityUrl} from '../utils/index';
import ReloadIcon from '../components/ReloadIcon';
import WeatherDetails from '../components/WeatherDetails';
import { AppContext } from '../contexts/AppContext';



export default function HomeScreen({navigation, route}) {
        const {unitSystem} = useContext(AppContext)
        const [errorMessage, setErrorMessage] = useState(null);
        const [currentWeather, setCurrentWeather] = useState(null);
        useEffect(() => {
          load();
        }, [unitSystem]);
      
        async function load(){
          setCurrentWeather(null);
          setErrorMessage(null);
          try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if(status != 'granted'){
              setErrorMessage('Access to location is needed to run the app');
              return;
            } else {
              // const location = await Location.getCurrentPositionAsync();
              // const { latitude,longitude } = location.coords;
              // const response = await fetch(weatherLongLatUrl(unitSystem, latitude, longitude));
              const response = await fetch(weatherCityUrl(unitSystem, 'galkissa'));
              const result = await response.json();
              response.ok ? setCurrentWeather(result) : setErrorMessage(result.message);
            }
          }
          catch(error) {
            setErrorMessage(error.message);
          }
          finally {
          } 
        }
      
        if(currentWeather){
          return (
            <View style={styles.container}>
                <View style={{
                  flexDirection:'row', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  margin: 15,
                  }}
                >
                  <UnitPicker/>
                  <ReloadIcon load={load}/>
                </View>

              <View style={styles.main}>
                <WeatherInfo currentWeather={currentWeather}/>
              </View>
              <WeatherDetails currentWeather={currentWeather} type="summery"/>
              <View style={{
                flexDirection:'row', 
                margin: 15,
                }}
              >
                <View style={{flex: 1, margin: 10}}>
                  <Button
                    title='Forcast'
                    onPress={()=>{
                      navigation.navigate('Forcast', {
                        cityName: currentWeather.name
                      })      
                    }}
                  />
                </View>
                <View style={{flex: 1, margin: 10}}>
                  <Button
                    title='Complete Data'
                    onPress={()=>{
                      navigation.navigate('Weather', {
                        cityWeather: currentWeather
                      })      
                    }}
                  />
                </View>
              </View>
            </View>
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


