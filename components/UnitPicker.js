import { Picker } from '@react-native-picker/picker'
import React, { useContext } from 'react'
import { View, Text, StyleSheet, Image, Platform } from 'react-native'
import { AppContext } from '../contexts/AppContext'

export default function UnitPicker() {
    const {unitSystem, setUnitSystem} = useContext(AppContext)
    return (
        <View style={styles.unitSystem}>
            <Picker mode="dropdown" selectedValue={unitSystem} onValueChange={(item)=>setUnitSystem(item)}>
                <Picker.Item label="C" value="metric"/>
                <Picker.Item label="F" value="imperial"/>
            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    unitSystem: {
        height: 50,
        width: 100,
    }
});
