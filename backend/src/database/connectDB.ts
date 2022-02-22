import { Connection, createPool } from 'oracledb';

let connection: Connection;
const createConnection = async () => {
  try {
    const pool = await createPool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECTION_STRING,
      poolMax: 10, // maximum size of the pool
      poolMin: 0, // let the pool shrink completely
      poolIncrement: 1, // only grow the pool by one connection at a time
      poolTimeout: 0, // never terminate idle connections
    });
    console.log('Database connected');
    return pool.getConnection();
  } catch (error) {
    console.log('error occurred while connecting to database' + error);
    console.error(error);
  }
};

export { createConnection, connection };
