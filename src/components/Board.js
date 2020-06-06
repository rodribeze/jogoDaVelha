import React from 'react'
import {View,StyleSheet} from 'react-native'
import Field from './Field'

export default props => {

   const rows = props.board.map((row,r) => {

      const columns = row.map((column,c) => {

         const styleField = [styles.field]

         if(c == 1) styleField.push(styles.columnCenter)

         return <Field onClick={props.onCLick}></Field>
      })

      return <View>{columns}</View>

   })

   return (
      <View>
         
      </View>
   )
}

const styles = StyleSheet.create({
   
})