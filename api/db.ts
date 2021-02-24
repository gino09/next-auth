import { Pool } from 'pg';

export const pool = new Pool({
    user: 'giarinogarcia',
    host: 'localhost',
    database: 'auth',
    password: 'sun2valley',
    port: 5432
})