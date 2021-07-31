import MapView, { Marker, PROVIDER_GOOGLE ,Callout} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, View,TouchableHighlight } from 'react-native'
import database from '@react-native-firebase/database';


import Geolocation from 'react-native-geolocation-service';

const MapContainer = ({ navigation}) => {
    const [location, setLocation] = useState({
        latitude: 33.5651,
        longitude: 73.0169,

    });
  const [usersOnline, setUsersOnline] = useState([]);
  
  useEffect(() => {
    database()
      .ref('/online/')
      .on('value', snapshot => {
        const onlineUsers = snapshot.val();
        console.log('online users', onlineUsers);
        setUsersOnline(onlineUsers);
      });

    return () =>
      database()
        .ref('/online/')
        .off('value', () => {
          console.log('online listening off');
        });
  }, []);

  const CreateMarkers = () =>
    Object.keys(usersOnline).map((user, index) => {
      return (
       
        <Marker
          coordinate={{
            latitude: usersOnline[user].location.latitude,
            longitude: usersOnline[user].location.longitude,
          }}
          title={usersOnline[user].username}
          description={usersOnline[user].email}
          key={index}
          onPress={()=>navigation.navigate("UserProfile")}
        >
          </Marker>
      );
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
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
          >
             {CreateMarkers()}
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
