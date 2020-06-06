import React from 'react'
import {View,StyleSheet,TouchableWithoutFeedback} from 'react-native'
import X from './X'
import O from './O'
import params from '../params'

export default props => {
   
   const styleField = [styles.field]

   return (
      <TouchableWithoutFeedback onPress={props.onClick}>
         <View style={styleField}>
            {props.drawing === 'X' ? 
               <X color={props.won ? 'green' : 'black'}/>: null}
            {props.drawing === 'O' ? 
               <O color={props.won ? 'green' : 'black'}/>: null}
         </View>
      </TouchableWithoutFeedback>
   )

}

const styles = StyleSheet.create({
   field:{
      flex:1,
      justifyContent:'center',
      width:params.getColumnAmount()
   }
})