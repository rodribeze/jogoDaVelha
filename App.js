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
  Text,
  Alert
} from 'react-native';

import { createBoard,cloneBoard,finish,wonGame } from './src/functions'
import Board from './src/components/Board'
import { Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons';

class App extends Component {

   constructor(props){
      super(props)
      this.state = this.createState()
   }

   createState = () => {
      return {
         board: createBoard(),
         won: false,
         finish: false,
         currentDrawing: false,
      }
   }

   onSelected = (row,column) => {

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

   resetGame = () => {
      this.setState(this.createState())
   }
  
   render(){
      return (
         <View style={styles.container}>
            <Header
               centerComponent={{ text: '# Jogo da Velha', style: { color: '#fff' } }}
               rightComponent={<Icon name="ios-refresh" size={30} color="white" onPress={this.resetGame} />}
            />
            <Board onSelected={this.onSelected} board={this.state.board}></Board>
         </View>
      )
   }

};

const styles = StyleSheet.create({
  container:{
     flex:1,
     alignItems: 'center',
  },
  header:{
      fontWeight:'bold',
      fontSize:20
  }
});

export default App;
