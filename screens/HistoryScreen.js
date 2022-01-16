import React from 'react'
import { View, Text, useEffect } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistoryScreen({navigation}) {

    const [history, setHistory] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            AsyncStorage.getItem('newcity')
            .then(response => setHistory([...response]));    
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <View>
            <Text>{history[0]}</Text>
        </View>
    )
}
