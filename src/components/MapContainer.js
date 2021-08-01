import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

const MapContainer = ({ navigation, usersOnline }) => {
  const [location, setLocation] = useState({
    latitude: 33.5651,
    longitude: 73.0169,
  });

  const CreateMarkers = () =>
    Object.keys(usersOnline).map((user, index) => {
      if (usersOnline[user].location !== undefined) {
        return (
          <Marker
            coordinate={{
              latitude: usersOnline[user].location.latitude,
              longitude: usersOnline[user].location.longitude,
            }}
            title={usersOnline[user].username}
            description={usersOnline[user].email}
            onPress={() => navigation.navigate('UserProfile')}
            key={index}
          />
        );
      }
    });

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
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapContainer;
