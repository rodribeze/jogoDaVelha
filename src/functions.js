

createBoard = () => {

   return Array(3).fill(0).map((_,row) => {
      return Array(3).fill(0).map((_,column) => {
         return {
            row,
            column,
            drawing: false,
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

const pendding = field => field.drawing !== false

const finish = board => fields(board).filter(pendding).length == 0

export default {
   createBoard,
   finish,
   cloneBoard
}