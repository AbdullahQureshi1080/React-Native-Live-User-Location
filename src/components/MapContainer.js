import { StyleSheet, Text, View } from 'react-native'

import React from 'react'

const MapContainer = () => {
    return (
       
        <View style={styles.mainContainer}>
            <View style={styles.mapConatiner}>

         <Text style={{color:"red"}}>Hello</Text>   
            </View>
      </View>
    
    )
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:"white",
    },
    mapConatiner:{
        width:"100%",
        height:"80%",
        backgroundColor:"blue",
    
     

    }
});

export default MapContainer
