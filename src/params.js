
import { Dimensions } from 'react-native'

export default {
   headerRatio: 0.15,
   getColumnAmount(){
      const width = Dimensions.get('window').width
      return Math.floor(width / 3) - 15
   },
   getRowAmount(){
      const toalHeight = Dimensions.get('window').height 
      const boardHeight = toalHeight * (1 - this.headerRatio)
      return Math.floor(boardHeight / 3)
   }
}