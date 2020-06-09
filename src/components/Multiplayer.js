import React from 'react'
import { Container,Tab,Tabs } from 'native-base'
import {Text,View} from 'react-native'
import NewGame from './NewGame'

export default props => {

   return (
      <Tabs initialPage={0}>   
         <Tab  style={{backgroundColor:'transparent'}} heading="Novo jogo">
            <NewGame></NewGame>
         </Tab>
         <Tab heading="Entrar em jogo">
            <Text>B</Text>
         </Tab>
      </Tabs>
   )

}