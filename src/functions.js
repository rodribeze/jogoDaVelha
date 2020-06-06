

const createBoard = () => {

   return Array(3).fill(0).map((_,row) => {
      return Array(3).fill(0).map((_,column) => {
         return {
            row,
            column,
            drawing: false,
            won: false
         }
      })
   })

}

const cloneBoard = board => {
   return board.map(rows => {
      return rows.map(field => {
         return {...field}
      })
   })
}

const fields = board => [].concat(...board) 

const pendding = field => field.drawing === false

const finish = (board) => {
   return fields(board).filter(pendding).length == 0
}

const wonDrawingVertical = (board,drawing) => {

   let column = 0
   let wonSchema = false
   let wonGame = false

   while(column <= 2){

      let row = 0
      let won = true
      let schema = []
      while(row <= 2){
         if(board[row][column].drawing !== drawing){
            won = false
            break
         }
         schema.push({
            row,
            column
         })
         row++
      }

      if(won){
         wonGame = true
         wonSchema = schema
         break;
      }

      column++

   }

   return {
      won: wonGame,
      wonSchema
   }

}
const wonDrawingHorizontal = (board,drawing) => {

   let row = 0
   let wonSchema = false
   let wonGame = false

   while(row <= 2){

      let column = 0
      let won = true
      let schema = []

      while(column <= 2){
         if(board[row][column].drawing !== drawing){
            won = false
            break
         }
         schema.push({
            row,
            column
         })
         column++
      }

      if(won){
         wonGame = true
         wonSchema = schema
         break;
      }

      row++

   }

   return {
      won: wonGame,
      wonSchema
   }

}

const wonTracedRight = (board,drawing) => {

   let won = true
   let wonSchema = []
   let row = 0
   let column = 0

   while(row <= 2){

      if(board[row][column].drawing !== drawing){
         won = false
         break;
      }

      wonSchema.push({
         row,
         column
      })

      row++
      column++

   }

   return {
      won,
      wonSchema
   }

}

const wonTracedLeft = (board,drawing) => {

   let won = true
   let wonSchema = []
   let row = 0
   let column = 2

   while(row <= 2){

      if(board[row][column].drawing !== drawing){
         won = false
         break;
      }

      wonSchema.push({
         row,
         column
      })

      row++
      column--

   }

   return {
      won,
      wonSchema
   }

}

const wonGame = (board,drawing) => {

   let won = false

   const vertical = wonDrawingVertical(board,drawing)
   if(vertical.won) won = vertical

   const horizontal = wonDrawingHorizontal(board,drawing)
   if(!won && horizontal.won) won = horizontal

   const tracedLeft = wonTracedLeft(board,drawing)
   if(!won && tracedLeft.won) won = tracedLeft

   const tracedRight = wonTracedRight(board,drawing)
   if(!won && tracedRight.won) won = tracedRight

   if(won && won.won){
      won.wonSchema.forEach(w => board[w.row][w.column].won = true)
   }

   console.debug(won && won.won)

   return won && won.won

}

export {
   createBoard,
   finish,
   cloneBoard,
   wonGame
}