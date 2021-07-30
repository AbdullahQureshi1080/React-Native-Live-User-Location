import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useState} from 'react'
import { auth, db } from "../../firebase";

export default function UserProfileScreen() {
    const user = auth.currentUser;

    return (
        <View style={styles.container}>
        <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
              <View style={styles.border}>
            <Text style={styles.name}>Name</Text>
            <Text style={styles.info}>{user.displayName}</Text>
              </View>
              <View style={styles.border}>

            <Text style={styles.name}>Email</Text>
            <Text style={styles.info}>{user.email}</Text>
            </View>
          </View>
      </View>
    </View>
    )
}

const styles = StyleSheet.create({

    container:{
        flex:1,

    },
   
      avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "#2C5F2D",
        marginBottom:10,
        alignSelf:'center',
        marginTop:130
      },
    
      body:{
        marginTop:20,
      },
      bodyContent: {
        alignItems: 'center',
        padding:30,
      },
      name:{
        fontSize:20,
        fontWeight: "600",
        fontWeight:"bold",
        color: "#2C5F2D",

      },
      info:{
        fontSize:20,
        color: "#696969",

        marginTop:5,
        marginBottom:20,
        fontWeight:"500"
      },
      border:{
          width:"100%",
          flexDirection:"row",
          justifyContent:"space-between",
          alignItems:"baseline",
          borderWidth:2,
          borderRadius:10,
          borderColor:"#2C5F2D",
          marginVertical:10,
          paddingHorizontal:30,
      }
     
});
