import React from 'react'
import {View,StyleSheet} from 'react-native'

export default props => {

   return (
      <View style={styles.container}>
         <View style={[styles.circle]}></View>
      </View>
   )

}

const styles = StyleSheet.create({
   container:{
      alignItems:'center'
   },
   circle:{
      width: 50,
      height: 50,
      borderRadius: 50,
      borderColor: 'black',
      borderWidth: 4
   }
})