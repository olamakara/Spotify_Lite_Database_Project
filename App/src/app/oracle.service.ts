import { Injectable } from '@angular/core';
import * as oracledb from 'oracledb';

@Injectable({
  providedIn: 'root'
})
export class OracleService {

//   private dbConfig = {
//     user: 'your_username',
//     password: 'your_password',
//     connectString: 'your_connection_string'
//   };
  constructor() {}

//   constructor() {
//     oracledb.initOracleClient({ libDir: '/opt/oracle/instantclient' });
//   }

//   getTableData(): Promise<any[]> {
//     return new Promise((resolve, reject) => {
//       oracledb.getConnection(this.dbConfig, (err, connection) => {
//         if (err) {
//           reject(err);
//           return;
//         }
//         const sql = `SELECT * FROM your_table`;
//         connection.execute(sql, [], { outFormat: oracledb.OUT_FORMAT_OBJECT }, (err, result) => {
//           if (err) {
//             connection.close(() => {
//               reject(err);
//             });
//             return;
//           }
//           const rows: any[] = result.rows || [];
//           connection.close(() => {
//             resolve(rows);
//           });
//         });
//       });
//     });
//   }
}
