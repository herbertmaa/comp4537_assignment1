const { Client }= require('pg')

const sql = new Client({
  user: 'ec2-user',
  host: 'localhost',
  database: 'postgres',
  password: '1',
  port: 5432,
})

sql.connect(err => {
  if(err){
    console.error('Connection error', err.stack)
  }else{
    console.log("Connected to DB successfully");
  }
});


module.exports = sql;
