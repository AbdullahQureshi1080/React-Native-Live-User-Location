import { Button, Image, Input } from "react-native-elements";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import { auth } from "../../firebase";

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error));
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View
        style={styles.credentialsContainer}
      >
     
        <View style={styles.inputContainer}>
          <Input
            placeholder="Email"
            autoFocus
            type="email"
            autoCapitalize = 'none'
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            placeholder="Password"
            secureTextEntry
            type="password"
            autoCapitalize = 'none'
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <Button buttonStyle={{backgroundColor:"#2C5F2D"}}  containerStyle={styles.loginButton} title="Login" onPress={signIn} />
        <Button
          containerStyle={styles.button}
          title="Register"
          titleStyle={{ color: '#2C5F2D' }}
          type="outline"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
  },
  credentialsContainer:{
    justifyContent: "center",
    alignItems: "center",
    marginTop: 120,

  },
  
  inputContainer: {
    width: 300,
  },
  loginButton: {
    width: 250,
    marginTop: 20,
  },
  button: {
    width: 250,
    marginTop: 20,
  },
});

export default LoginScreen;
