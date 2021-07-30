import { Button, Input, Text } from "react-native-elements";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import React, { useState } from "react";

import { auth } from "../../firebase";

function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  


  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          email : email
         
        });
      })
      .catch((error) => alert(error.message));
  };

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
