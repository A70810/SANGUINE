var mysql = require('mysql');
const dotenv = require('dotenv').config();
var con = mysql.createConnection({
	host:process.env.DATABASE_HOST,
	user:process.env.DATABASE_USER,
	//password:process.env.PASSWORD,
	database:process.env.DATABASE

});

con.connect((err)=>{
	if(err)
		throw err;
	console.log("db connected");
});

module.exports=con;