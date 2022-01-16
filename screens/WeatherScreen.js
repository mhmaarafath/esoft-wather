import React, { useContext, useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import WeatherDetails from '../components/WeatherDetails';

export default function WeatherScreen({navigation, route}) {
    return (
        <View>            
            <WeatherDetails currentWeather={route.params.cityWeather}/>
        </View>

    )
}
