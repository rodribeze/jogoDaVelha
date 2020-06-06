/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';



class App extends Component {
  
   render(){
      return (
         <View style={styles.container}>
            
         </View>
      )
   }

};

const styles = StyleSheet.create({
  container:{
     flex:1,
   //   flexDirection:'row',
     alignItems: 'center',
     justifyContent:'space-around'
  }
});

export default App;
