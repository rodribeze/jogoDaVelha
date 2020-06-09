import React from 'react'
import {View,StyleSheet} from 'react-native'
import Field from './Field'
import params from '../params'

export default props => {

   const rows = props.board.map((row,r) => {

      const columns = row.map((column,c) => {

         let styleField = [styles.column]
         if(c === 1) styleField.push(styles.columnCenter)

         return <View style={styleField}><Field {...column} onClick={() => {
            props.onSelected(r,c)
         }} key={c}></Field></View>

      })

      const styleRow = [styles.row]

      if(r == 1) styleRow.push(styles.rowCenter)
      
      return <View style={styleRow} key={r}>{columns}</View>

   })
   
   return <View style={styles.container}>{rows}</View>
}

const styles = StyleSheet.create({
   container:{
      backgroundColor:'white',
      borderRadius: 5,
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,

      elevation: 3,
   },
   row:{
      flexDirection:'row',
      justifyContent:'flex-end',
      alignItems:'center',
      height:params.getRowAmount(),
   },
   rowCenter:{
      borderTopColor:'black',
      borderBottomColor:'black',
      borderBottomWidth:2,
      borderTopWidth:2
   },
   column:{
      justifyContent: 'center',
      alignItems:'center',
   },
   columnCenter:{
      borderLeftColor: 'black',
      borderRightColor: 'black',
      borderRightWidth: 2,
      borderLeftWidth: 2
   }
})