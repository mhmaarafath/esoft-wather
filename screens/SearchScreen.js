import React, { useContext, useState, useEffect} from 'react'
import { View, Text, StyleSheet, FlatList, Button } from 'react-native'
import { TextInput, Card } from 'react-native-paper'



import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../contexts/AppContext';
import { weatherCityUrl } from '../utils';


export default function SearchScreen({navigation}) {
    const {city, cityWeather} = useContext(AppContext)
    const [cityName, setCityName] = useState(null);
    const [cities, setCities] = useState([]);
    const [history, setHistory] = useState([]);
    const {unitSystem} =  useContext(AppContext)
    const fetchCities = (text) => {
        setCityName(text);
        fetch(`https://api.weather.com/v3/location/search?apiKey=6532d6454b8aa370768e63d6ba5a832e&language=en-US&query=${text}&locationType=city&format=json`)
        .then(res=>res.json())
        .then(data=>{setCities(data.location.address.slice(0,9))})
        .catch((e)=>{console.log(e)})
    };



    const listClick = async (cityName) => {
        setCityName(cityName);
        fetch(weatherCityUrl(unitSystem, cityName))
        .then(response => response.json())
        .then(result => {
            navigation.navigate('Weather', {
                cityWeather: result
            })
    
        })

    }

    
    return (
        <View style={{flex: 1}}>
            {console.log(city)}
            <TextInput
            label="City Name"
            theme={{
                colors: {
                    primary: '#00aaff'
                }
            }}
            value={cityName}
            onChangeText={(text)=>{
                fetchCities(text)
            }}
            />
            <Text>{cityName}</Text>
            {
            cities ?             
            <FlatList
                data={cities}
                keyExtractor={item=>item}
                renderItem={({item})=>(
                    <Card
                        onPress={()=>listClick(item)}
                        style={{margin: 2, padding: 12}}
                    >
                        <Text>{item}</Text>
                    </Card>    
                )}
            />
            :
            null
            }
        </View>
    )

}
