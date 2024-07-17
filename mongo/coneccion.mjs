import mysql from 'mysql2/promise';

// Create the connection to database

  // Create the connection to database
const connection =  mysql.createPool({
  host: '173.249.41.129',
  user: 'root',
  database: 'ferreteria',
  password: '>4KjP15[F6Zx',
  port: 3306,
});

const testConnection = async () => {
  try {
    await connection.query('SELECT 1');
    console.log('Conexión a la base de datos exitosa');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
};

testConnection();
 
export default connection;