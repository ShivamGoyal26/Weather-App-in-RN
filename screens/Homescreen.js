import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
  Button,
} from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeScreen = props => {

  Geocoder.init("AIzaSyCObnoyoYJUouJ-ezxDVZMEhRuWSD9HdtI");

  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('');
  const [done, setDone] = useState(false);


  const getLocationName = () => {
    let url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + currentLatitude + '&lon=' + currentLongitude + '&units=metric&appid=2ec381ce0f6e7d0f399a48f0d48c70fa';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data.city.name)

      })
  }

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        setLocationStatus('You are Here');

        //getting the Longitude from the location json
        const currentLongitude =
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude =
          JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        //Will give you the location on location change

        setLocationStatus('You are Here');
        setDone(true)
        console.log(position);

        //getting the Longitude from the location json        
        const currentLongitude =
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude =
          JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000
      },
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.container}>


          <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
            <Image
              source={{
                uri:
                  'https://raw.githubusercontent.com/AboutReact/sampleresource/master/location.png',
              }}
              style={{ width: 100, height: 100 }}
            />
            <Text style={styles.boldText}>
              {locationStatus}
            </Text>
          </View>


          <View>
            <Text
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 16,
              }}>
              Longitude: {currentLongitude}
            </Text>
            <Text
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 16,
              }}>
              Latitude: {currentLatitude}
            </Text>
          </View>


          <View style={{ marginBottom: 20 }}>

            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={getOneTimeLocation}>
              <Text style={{ fontSize: 20, color: 'grey' }}>Get the update Location</Text>
            </TouchableOpacity>

           { done && <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => {
              props.navigation.navigate("Weather", { lat: currentLatitude, lon: currentLongitude })
            }}>
              <Text style={{ fontSize: 20, color: 'grey', marginTop: 20 }}>Check the Weather!</Text>
            </TouchableOpacity>}

          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  boldText: {
    fontSize: 25,
    color: 'red',
    marginVertical: 16,
  },
});

export default HomeScreen;