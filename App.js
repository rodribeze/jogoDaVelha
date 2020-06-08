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
  Alert
} from 'react-native';

import Board from './src/components/Board'
import { Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons';
import Multiplayer from './src/components/Multiplayer'


import { 
   createBoard,
   cloneBoard,
   finish,
   wonGame,
   getUser 
} from './src/functions'


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
         boardTranslateY: new Animated.Value(0)
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
         toValue: 150,
         duration: 1000,
         useNativeDriver: true
       }).start(() => {
          this.setState({boardTranslateY:new Animated.Value(150)})
       });
   }

   boardUp = () => {
      Animated.timing(this.state.boardTranslateY, {
         toValue: 0,
         duration: 1000,
         useNativeDriver: true
       }).start(() => {
         this.setState({boardTranslateY:new Animated.Value(0)})
      });
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

      const styleBoard = []

      if(this.state.showOptionsMultiplayer) styleBoard.push({
         transform:[{
            translateY:this.state.boardTranslateY
         }]
      })

      return (
         <View style={styles.container}>
            <Header
               backgroundColor="#1b7ed7"
               statusBarProps={{ translucent: true }}
               leftComponent={<Icon name="ios-add" size={30} color="white" onPress={this.onOptionsMultiplayer} />}
               centerComponent={{ text: '# Jogo da Velha', style: { color: '#fff' } }}
               rightComponent={this.state.mode == 'offline' ? 
                  <Icon name="ios-refresh" size={30} color="white" onPress={this.resetGame} /> : 
                  <Icon name="ios-return-right" size={30} color="white" onPress={this.resetGame} />}
            />
            {this.showOptionsMultiplayer ? (<Multiplayer></Multiplayer>) 
            : null}
            <Animated.View style={styleBoard}>
               <Board onSelected={this.onSelected} board={this.state.board}></Board>
            </Animated.View>
         </View>
      )
   }

};

const styles = StyleSheet.create({
  container:{
     flex:1,
     alignItems: 'center',
     backgroundColor: '#1b7ed7'
  },
  containerOptionOpened:{

  },
  header:{
      fontWeight:'bold',
      fontSize:20
  },
  boardDown:{
     transform: [{
         translateY: 150
     }]
  }
});

export default App;
