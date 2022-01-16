import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../utils'
import { FontAwesome5, MaterialCommunityIcons, Ionicons, EvilIcons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { AppContext } from '../contexts/AppContext';
import time from '../utils/time';


const {PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR} = colors

export default function WeatherDetails({currentWeather, type = 'detailed'}) {
    const {unitSystem} = useContext(AppContext)
    const {
        name,
        dt,
        weather: [{
            main,
            description,
        }],
        coord: {
            lon,
            lat,
        },
        main: {
            feels_like,
            humidity,
            pressure
        },
        wind: {
            speed
        }
    } = currentWeather;

    
    
    
    function Summery() {
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

    function Detail() {
        return (
            <>
                <View style={styles.weatherDetailsRow}>
                    <View style={[styles.weatherDetailsBox, {borderRightWidth: 1, borderRightColor: BORDER_COLOR}]}>
                        <View style={styles.weatherDetailsRow}>
                            <FontAwesome5 name="city" size={24} color={PRIMARY_COLOR} />
                            <View style={styles.weatherDetailsItems}>
                                <Text>City</Text>
                                <Text style={styles.textSecondary}>{name}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.weatherDetailsBox, {borderRightWidth: 1, borderRightColor: BORDER_COLOR}]}>
                        <View style={styles.weatherDetailsRow}>
                            <EvilIcons name="clock" size={28} color={PRIMARY_COLOR} />
                            <View style={styles.weatherDetailsItems}>
                                <Text>Time</Text>
                                <Text style={styles.textSecondary}>{time(dt)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[styles.weatherDetailsRow, {borderTopWidth: 1, borderTopColor: BORDER_COLOR}]}>
                    <View style={[styles.weatherDetailsBox, {borderRightWidth: 1, borderRightColor: BORDER_COLOR}]}>
                        <View style={styles.weatherDetailsRow}>
                            <AntDesign name="exclamation" size={24} color={PRIMARY_COLOR} />
                            <View style={styles.weatherDetailsItems}>
                                <Text>Main</Text>
                                <Text style={styles.textSecondary}>{main}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.weatherDetailsBox, {borderRightWidth: 1, borderRightColor: BORDER_COLOR}]}>
                        <View style={styles.weatherDetailsRow}>
                            <MaterialIcons name="details" size={24} color={PRIMARY_COLOR} />
                            <View style={styles.weatherDetailsItems}>
                                <Text>Description</Text>
                                <Text style={styles.textSecondary}>{description}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[styles.weatherDetailsRow, {borderTopWidth: 1, borderTopColor: BORDER_COLOR}]}>
                    <View style={[styles.weatherDetailsBox, {borderRightWidth: 1, borderRightColor: BORDER_COLOR}]}>
                        <View style={styles.weatherDetailsRow}>
                            <Ionicons name="location" size={24} color={PRIMARY_COLOR} />
                            <View style={styles.weatherDetailsItems}>
                                <Text>Longtitute</Text>
                                <Text style={styles.textSecondary}>{lon}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.weatherDetailsBox, {borderRightWidth: 1, borderRightColor: BORDER_COLOR}]}>
                        <View style={styles.weatherDetailsRow}>
                            <Ionicons name="location" size={24} color={PRIMARY_COLOR} />
                            <View style={styles.weatherDetailsItems}>
                                <Text>Latitute</Text>
                                <Text style={styles.textSecondary}>{lat}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </>
        )
    }
    

    const windSpeed = unitSystem == 'metric' ? `${Math.round(speed)} m/s` : `${Math.round(speed)} miles/h` 

    if(type == 'summery'){
        return (
            <View style={styles.weatherDetails}>
                <Summery/>
            </View>
        )
    } else {
        return (
            <View style={styles.weatherDetails}>
                <Detail/>
                <Summery/>
            </View>
        )

    }
}

const styles = StyleSheet.create({
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
