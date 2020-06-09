import React from 'react'
import { View, StyleSheet,Text } from 'react-native'
import QRCode from 'react-native-qrcode-svg';
import {Input, Item, Icon} from 'native-base'
export default props => {

   return (
      <View>
         <View style={{
            alignItems:'center',
            justifyContent: 'center',
            margin:30
         }}>
            <View style={styles.code}>
               <QRCode
                  value="teste"
                  size={100}
                  backgroundColor='transparent'/>
            </View>
         </View>
         <Text style={{textAlign:'center',color:'white'}}>
            Peça pro seu amigo(a) scanear este código de barras
         </Text>

         <View style={{padding:15}}>
            <Item style={{backgroundColor:'white'}} rounded>
               <Text style={{padding:15}}>COMPARTILHE SEU CODIGO</Text>
               <Input disabled placeholder="12333232323"></Input>
               <Icon active name='md-copy' />
            </Item>
         </View>
      </View>
   )

}

const styles = StyleSheet.create({
   code:{
      padding:12,
      backgroundColor: 'white'
   }
})

