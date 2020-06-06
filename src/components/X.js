import React from 'react'
import {View,StyleSheet} from 'react-native'

export default props => {

   return (
      <View style={styles.container}>
         <View style={[styles.line,{ transform: [{ rotate:'45deg' }] }]}></View>
         <View style={[styles.line,{ transform: [{ rotate:'135deg' }] }]}></View>
      </View>
   )

}

const styles = StyleSheet.create({
   container:{
      alignItems:'center'
   },
   line:{
      height: 10,
      width: 50,
      backgroundColor: 'black',
      position:'absolute'
   }
})