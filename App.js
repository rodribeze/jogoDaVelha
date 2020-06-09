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
  Animated,
  Alert,
  Text
} from 'react-native';

import Board from './src/components/Board'
// import { Header } from 'react-native-elements'
import { Container,Header,Left,Right,Title, StyleProvider } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons';

import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';

import { 
   createBoard,
   cloneBoard,
   finish,
   wonGame,
   getUser 
} from './src/functions'

import Multiplayer from './src/components/Multiplayer'

class App extends Component {

   constructor(props){
      super(props)
      this.state = this.createState()
   }

   createState = () => {

      return {
         mode: 'offline',
         user: getUser(),
         gameId: null,
         board: createBoard(),
         won: false,
         finish: false,
         currentDrawing: false,
         showOptionsMultiplayer: false,
         boardTranslateY: new Animated.Value(350)
      }
   }

   onSelected = (row,column) => {

      this.changeState(row,column)

   }

   changeState = (row,column) => {
      let board = cloneBoard(this.state.board)

      if(this.state.finish || this.state.won || board[row][column].drawing !== false) return;

      const newDrawing = this.state.currentDrawing === 'X' ? 'O' : 'X'
      board[row][column].drawing = newDrawing

      const fn = finish(board)
      const won = wonGame(board,newDrawing)

      if(won){
         Alert.alert('Ganhou!!!',`O jogador com (${newDrawing}) ganhou o jogo`)
      }

      if(fn && !won){
         Alert.alert('Que pena!!!',`Ninguem ganhou`)
      }

      this.setState({
         board: board,
         currentDrawing:newDrawing,
         finish:fn,
         won: won
      })
   }

   boardDown = () => {
      Animated.timing(this.state.boardTranslateY, {
         toValue: 350,
         duration: 1000,
         useNativeDriver: true
       }).start();
   }

   boardUp = () => {
      Animated.timing(this.state.boardTranslateY, {
         toValue: 0,
         duration: 1000,
         useNativeDriver: true
       }).start();
   }

   onOptionsMultiplayer = () => {

      if(!this.state.showOptionsMultiplayer) this.boardDown()
      else this.boardUp()

      this.setState({
         showOptionsMultiplayer:!this.state.showOptionsMultiplayer
      })
   }

   resetGame = () => {
      this.setState(this.createState())
   }
  
   render(){

      const styleBoard = [styles.board]

      styleBoard.push({
         marginTop:10,
         transform:[{
            translateY:this.state.boardTranslateY
         }]
      })

      return (
         <StyleProvider style={getTheme(material)}>
            <Container style={styles.container}>
               <Header>
                  <Left style={{flex:1}}>
                     <Icon name="ios-qr-scanner" size={30} color="white" onPress={this.onOptionsMultiplayer} />
                  </Left>
                  <View style={{alignItems:'center',justifyContent:'center',flex:2}}>
                     <Title># Jogo da velha</Title>
                  </View>
                  <Right style={{flex:1}}>
                     {this.state.mode == 'offline' ? 
                     <Icon name="ios-refresh" size={30} color="white" onPress={this.resetGame} /> : 
                     <Icon name="ios-return-right" size={30} color="white" onPress={this.resetGame} />}
                  </Right>
               </Header>
               {this.state.showOptionsMultiplayer ? (<View style={{position:'absolute',top:56}}>
                  <Multiplayer></Multiplayer>
               </View>) : null}
               
               <Animated.View style={styleBoard}>
                  <Board  onSelected={this.onSelected} board={this.state.board}></Board>
               </Animated.View>
            </Container>
         </StyleProvider>
      )
   }

};

const styles = StyleSheet.create({
  container:{
     backgroundColor: '#1b7ed7',

  },
  board:{
      flex:2,
      alignItems: 'center',
  },
  containerOptionOpened:{

  },
  header:{
      fontWeight:'bold',
      fontSize:20
  }
});

export default App;
