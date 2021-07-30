import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Geolocation from 'react-native-geolocation-service';

const MapContainer = () => {
    const [location, setLocation] = useState({
        latitude: 33.5651,
        longitude: 73.0169,

    });

    useEffect(() => {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            setLocation({
              latitude,
              longitude,
            });
          },
          error => {
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }, []);
    return (
       
        
    <View style={styles.container}>
        {location && (
            <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
          >
              <Marker
 coordinate={{
    latitude: location.latitude,
    longitude: location.longitude,
  }}               title="That's me"
               description="My Location on the marker"
             />
          </MapView>
            
        )}
     
   </View>

   
    
    )
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: "100%",
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },

});

export default MapContainer
