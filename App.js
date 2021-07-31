import 'react-native-gesture-handler';

import { StyleSheet, Text, View } from 'react-native'

import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import { NavigationContainer } from "@react-navigation/native";
import React from 'react'
import RegisterScreen from './src/screens/RegisterScreen';
import UserProfileScreen from './src/screens/UserProfileScreen';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: "Login",
            headerStyle: {
              backgroundColor: "#2C5F2D",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              //alignSelf: "center",
            },
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            title: "Register",
            headerStyle: {
              backgroundColor: "#2C5F2D",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              marginLeft: 100,
            },
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Home",
            headerStyle: {
              backgroundColor: "#2C5F2D",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              alignSelf: "center",
            },
          }}
        />
         <Stack.Screen
          name="UserProfile"
          component={UserProfileScreen}
          options={{
            title: " User Profile",
            headerStyle: {
              backgroundColor: "#2C5F2D",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});


export default App
