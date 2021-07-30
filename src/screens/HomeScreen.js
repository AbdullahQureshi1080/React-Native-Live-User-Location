import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { auth, db } from "../../firebase";

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MapContainer from "../components/MapContainer";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function HomeScreen({ navigation }) {

  // signOut function
  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  const userProfile = () => {
      navigation.navigate("UserProfile");
  };


  

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
