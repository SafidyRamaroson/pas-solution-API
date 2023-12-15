import mysql from 'mysql';

//create connection
export const connection = mysql.createConnection({
    user:process.env.USERNAME,
    host:process.env.DB_HOST,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    connectTimeout:1000000
});

//connect to the database
connection.connect((err) =>{
    if(err){
        console.log(err);
    }else {
        console.log("successfully connected to the database");
    }
});
