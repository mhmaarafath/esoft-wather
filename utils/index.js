import { useContext } from 'react';
import { StyleSheet } from 'react-native'
import { AppContext } from '../contexts/AppContext';

export const colors = {
    PRIMARY_COLOR: '#ff304f',
    SECONDARY_COLOR: '#002651',
    BORDER_COLOR: '#dbdbdb',
}

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    main: {
      justifyContent: 'center',
      flex: 1,
    }
});

const OPENWEATHERMAP_KEY = '2a7873c955a7f91f019f0383741231b5';

export function weatherLongLatUrl(unitSystem, latitude, longitude){
  return `https://api.openweathermap.org/data/2.5/weather?appid=${OPENWEATHERMAP_KEY}&units=${unitSystem}&lat=${latitude}&lon=${longitude}`
}

export function weatherCityUrl(unitSystem, city){
  return `https://api.openweathermap.org/data/2.5/weather?appid=${OPENWEATHERMAP_KEY}&units=${unitSystem}&q=${city}`
}

export function forecast(unitSystem, city){
  return `https://api.openweathermap.org/data/2.5/forecast?appid=${OPENWEATHERMAP_KEY}&units=${unitSystem}&q=${city}&cnt=4`
}

  
