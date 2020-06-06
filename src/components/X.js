import React from 'react'
import {View,StyleSheet} from 'react-native'

export default props => {

   const styleColor = {
      backgroundColor: props.color || 'black'
   }

   return (
      <View style={styles.container}>
         <View style={[styles.line,{ transform: [{ rotate:'45deg' }] },styleColor]}></View>
         <View style={[styles.line,{ transform: [{ rotate:'135deg' }] },styleColor]}></View>
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