import { Button, Input, Text } from "react-native-elements";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import React, { useState,useEffect } from "react";
import auth from '@react-native-firebase/auth';


// import { auth } from "../../firebase";

function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();


  



  function onAuthStateChanged(user) {
    setUser(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);


  useEffect(() => {

    const updateProfile = async () => {
      const update = {
        displayName: name,
      };
      auth().currentUser.updateProfile(update).then(() => {
        setTimeout(() => {
          console.log("checking");
          navigation.replace("Home")
      },2000 )
        
      })     
    }
    if (user) {
      updateProfile();   
    }
    else {
      // navigation.navigate("Login")
    }  
  }, [user])



  
  const register = () => {
    auth()
    .createUserWithEmailAndPassword(email,password)
    .then(() => {
      console.log('User account created & signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
  
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
  
      console.error(error);
    });
    }


  // const register = () => {
  //   auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((authUser) => {
  //       authUser.user.updateProfile({
  //         displayName: name,
  //         email : email
         
  //       });
  //     })
  //     .catch((error) => alert(error.message));
  // };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text
        h3
        style={{
          marginBottom: 50,
          color: "#696969",
        }}
      >
        Register New Account
      </Text>
      <View style={styles.inputContainer}>
       
        <Input
          placeholder="Full Name"
          type="text"
          autoFocus
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          type="password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <Button
      buttonStyle={{backgroundColor:"#2C5F2D"}}
        raised
        title="Register"
        onPress={register}
        containerStyle={{ width: 250, marginTop: 10 }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    marginTop: 50,
  },
  inputContainer: {
    width: 300,
  },
});

export default RegisterScreen;
