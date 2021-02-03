import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import API_KEY from '../utils/WeatherAPIKey';

const Weather = props => {

    const [temp, setTemp] = useState(0);
    const [weatherCon, setWeatherCon] = useState('N/A');
    const [city, setCity] = useState("N/A");
    const [loading, setLoading] = useState(true)

    var currentLatitude = props.route.params.lat
    var currentLongitude = props.route.params.lon

    let url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + currentLatitude + '&lon=' + currentLongitude + '&units=metric&appid=2ec381ce0f6e7d0f399a48f0d48c70fa';



    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log("THIS IS THE TEMP OF THE CURRENT LOACTION")
                console.log(data.name)
                setCity(data.name)
                setTemp(data.main.temp)
                setWeatherCon(data.weather[0].main)
                setLoading(false)
            })
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <ActivityIndicator size="small" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.weatherContainer}>
            <View style={styles.headerContainer}>
                <MaterialCommunityIcons size={100} name="weather-sunny" color={'#fff'} />
                <Text style={styles.tempText}>{temp}˚</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, justifyContent: 'space-evenly' }}>
                <MaterialCommunityIcons size={100} name="city" color={'#fff'} />
                <Text style={styles.tempText}>{city}</Text>
            </View>
            <View style={styles.bodyContainer}>
                <Text style={styles.title}>{weatherCon}</Text>
                <Text style={styles.subtitle}>It hurts my eyes!</Text>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    weatherContainer: {
        flex: 1,
        backgroundColor: '#f7b733',
        justifyContent: 'space-between'
    },
    headerContainer: {
        marginTop: 50,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    tempText: {
        fontSize: 60,
        color: '#fff'
    },
    bodyContainer: {
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingLeft: 25,
        marginBottom: 40
    },
    title: {
        fontSize: 48,
        color: '#fff'
    },
    subtitle: {
        fontSize: 24,
        color: '#fff'
    }
});

export default Weather;