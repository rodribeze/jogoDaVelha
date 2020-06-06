import React from 'react'
import {View,TouchableWithoutFeedback} from 'react-native'
import X from './X'
import O from './O'

export default props => {
   
   return (
      <TouchableWithoutFeedback onPress={props.onClick}>
         <View>
            {props.drawing === 'X' ? 
               <X/>: null}
            {props.drawing === 'O' ? 
               <O/>: null}
         </View>
      </TouchableWithoutFeedback>
   )

}