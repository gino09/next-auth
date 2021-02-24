const {Pool} = require('pg');

const pool = new Pool({
  user: 'giarinogarcia',
  host: 'localhost',
  database: 'auth',
  password: 'sun2valley',
  port: 5432
})

async function setup() {
    pool.query
    const people = await pool.query('SELECT * FROM person');
    console.log('ALL PEOPLE', JSON.stringify(people.rows, null, 2));

    const vehicles = await pool.query('SELECT * FROM vehicle');
    console.log('ALL VEHICLES', JSON.stringify(vehicles.rows, null, 2));
    
    process.exit()
}

setup();