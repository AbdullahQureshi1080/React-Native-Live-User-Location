import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MapContainer from '../components/MapContainer';
import GetLocation from 'react-native-get-location';

function HomeScreen({ navigation }) {
  const [currentUser, setCurrentUser] = useState(auth().currentUser);
  const [userLocation, setUserLocation] = useState({});
  const [usersOnline, setUsersOnline] = useState([]);

  //  Setting User Reference, when location is fetched.

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log(location);
        const { latitude, longitude } = location;
        setUserLocation({
          latitude: latitude,
          longitude: longitude,
        });
        setCurrentUser(auth().currentUser);
        userData(latitude, longitude);
      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      });
  }, []);

  // const setting user data

  const userData = (latitude, longitude) => {
    const userId = auth().currentUser.uid;
    const reference = database().ref(`/online/${userId}`);
    // Set the /users/:userId value to true
    reference
      .set({
        username: currentUser.displayName,
        email: currentUser.email,
        location: { latitude: latitude, longitude: longitude },
      })
      .then(res => console.log('Online presence set', res));

    // Remove the node whenever the client disconnects
    reference
      .onDisconnect()
      .remove()
      .then(() => console.log('On disconnect function configured.'));
  };

  // signOut function
  const signOutUser = () => {
    auth()
      .signOut()
      .then(() => navigation.replace('Login'));
  };

  // navigate to user profile
  const userProfile = () => {
    navigation.navigate('UserProfile');
  };

  //  Getting online users
  const getOnlineUsers = async () => {
    database()
      .ref('/online/')
      .on('value', snapshot => {
        const onlineUsers = snapshot.val();
        console.log('online users', onlineUsers);
        setUsersOnline(onlineUsers);
      });
  };

  // Stop Listening
  const stopOnlineListening = async () => {
    database()
      .ref('/online/')
      .off('value', () => {
        console.log('online listening off');
      });
  };

  useEffect(() => {
    getOnlineUsers();
    return stopOnlineListening();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Home',
      headerStyle: { backgroundColor: '#2C5F2D' },
      headerTitleStyle: { color: 'white', marginLeft: 100 },
      headerTintColor: 'black',
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity onPress={userProfile} activeOpacity={0.5}>
            <AntDesign name="user" color="white" size={24} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            marginRight: 20,
          }}
        >
          <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
            <AntDesign name="logout" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <MapContainer
      navigation={navigation}
      usersOnline={usersOnline === null ? [] : usersOnline}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});

export default HomeScreen;
