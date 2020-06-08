
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase(
   { name:'dbGameDeuVelha'},
  () => { },
  error => {
    console.debug("ERROR: " + error);
})

const Query = (sql,params = []) => new Promise(function(resolve, reject){
   
   db.transaction(function(txn) {
      txn.executeSql(sql, params,
         (tx, res) => {
            resolve({
               error:false,
               data: res,
               transaction: tx
            })
         },
         (error) => {
            reject({
               error:true,
               data: null,
               errorMessage: error
            })
         }
      );

   })

})

const createTables = async () => {
   return await Query("CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY NOT NULL, uuid TEXT, nome TEXT)",[]);
}

createTables()

export {
   db,
   Query
}