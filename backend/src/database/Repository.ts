import { Connection } from 'oracledb';

import oracledb from 'oracledb';
oracledb.autoCommit = true;
oracledb.fetchAsString = [oracledb.CLOB ];

import { connection, createConnection } from './connectDB';

// require('dotenv').config({ path: '../.env' });
class Repository {
  public _connection: Connection | undefined;
  constructor() {
    this._connection = connection;
  }

  query = async (query: string, params: any) => {
    console.log(query);
    console.log(params);
    oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

    try {
      if (!this._connection) this._connection = await createConnection();
      let data: any;
      // console.log(params);

      if (params == []) data = await this._connection?.execute(query);
      else data = await this._connection?.execute(query, params);
      // console.log(data);

      return {
        success: true,
        data: data.rows,
        outBinds: data.outBinds
      };
    } catch (error:any) {
      console.log(error);
      return {
        success: false,
        error,
      };
    }
  };
}

export default Repository;
