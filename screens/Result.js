import React, {useEffect, useState} from 'react';
import { View, Text } from 'react-native';

const Result = props => {

    const [data, setData] = useState('');

    var currentLatitude = props.route.params.lat
    var currentLongitude = props.route.params.lon

    let url =  'https://api.openweathermap.org/data/2.5/forecast?lat=' + currentLatitude + '&lon=' + currentLongitude + '&units=metric&appid=2ec381ce0f6e7d0f399a48f0d48c70fa';

    useEffect(() => {
        fetch(url)
        .then(response => response.json())
        .then(data => {
          setData(data.city)
          console.log(data.city)
        
        })
      }, []);

      
return(
    <View style={{margin: 20,}}>
    <View style={{padding: 20}}></View>
    <View style={{padding: 20}}></View>
    <View style={{padding: 20}}></View>
    <View style={{padding: 20}}></View>
        <Text>Name: {data.name}</Text>
        <Text> Population: {data.population}</Text>
        <Text> Sunset: {data.sunset}</Text>
        <Text> Country: {data.country}</Text>
    </View>
)
}

export default Result;