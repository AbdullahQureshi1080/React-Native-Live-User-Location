import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { ScrollView, Text, TouchableOpacity } from "react-native";
// import { auth, db } from "../../firebase";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';


import AntDesign from 'react-native-vector-icons/AntDesign';
import MapContainer from "../components/MapContainer";
import Geolocation from 'react-native-geolocation-service';


function HomeScreen({ navigation }) {
  const [currentUser, setCurrentUser] = useState(auth().currentUser);
  const [userLocation, setUserLocation] = useState({
    latitude: 33.5651,
    longitude: 73.0169,

  });
  
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setUserLocation({
          latitude,
          longitude,
        });
        setCurrentUser(auth().currentUser)
        userData();
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  // signOut function
  const signOutUser = () => {

    auth()
  .signOut()
      .then(() => navigation.replace("Login"));
  };

  const userProfile = () => {
      navigation.navigate("UserProfile");
  };


  const userData = () => {
    const userId = auth().currentUser.uid;
    console.log(userId);
    
      database()
      .ref(`/users/${userId}`).set({
        username: currentUser.displayName,
        email: currentUser.email,
        location:userLocation,

      });
  
}
  // useEffect(() => {
  //   const user = auth().currentUser;
  //   const userId = auth().currentUser.uid;
  //   console.log(userId);
    
  //     database()
  //     .ref(`/users/${userId}`).set({
  //       username: user.displayName,
  //       email: user.email,
  //       location:userLocation,

  //     });
   
  // }, [])
  



  useEffect(() => {
    // Assuming user is logged in
    // const user = auth().currentUser;
    const userId = auth().currentUser.uid;
    // console.log(userId);
    
    //   database()
    //   .ref(`/users/${userId}`).set({
    //     username: user.displayName,
    //     email: user.email,

    //   });

  // database()
  // .ref(`/users/${userId}`)
  // .on('value', snapshot => {
  //   console.log('User data: ', snapshot.val());
  // });


    const reference = database().ref(`/online/${userId}`);
    // console.log(reference)

    // Set the /users/:userId value to true
    reference.set(true).then((res) => console.log('Online presence set',res));

    // Remove the node whenever the client disconnects
    reference
      .onDisconnect()
      .remove()
      .then(() => console.log('On disconnect function configured.'));
  }, []);


  

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Home",
      headerStyle: { backgroundColor: "#2C5F2D" },
      headerTitleStyle: { color: "white", marginLeft: 100 },
      headerTintColor: "black",
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
   <MapContainer/>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});

export default HomeScreen;
