import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
	user: process.env.POSTGRES_USER,
	host: 'postgres',
	database: process.env.POSTGRES_DB,
	password: process.env.POSTGRES_PASSWORD,
	port: '5432'
});

export default pool;
