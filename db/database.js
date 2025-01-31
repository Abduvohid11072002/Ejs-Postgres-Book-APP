import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user : process.env.DB_USERNAME,
    host : process.env.DB_HOST,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    port : process.env.DB_PORT
});

export default pool;

