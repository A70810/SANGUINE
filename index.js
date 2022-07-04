const express = require("express");
 const app = new express();
 const fs = require("fs");
 const path = require("path");
 const db = require("../SANGUINE/databaseconnection");
const bodyParser=require("body-parser");
app.use(express.static('public'))


app.use(express.static('/public'));
app.use('/css',express.static(__dirname+'/public'))
app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
	res.sendFile(path.join(__dirname,"./views/index.html"))
})

app.get('/Registration',(req,res)=>{

	res.sendFile(path.join(__dirname,"./forms/Registration_Form.html"));
})

app.get('/Login',(req,res)=>{

  res.sendFile(path.join(__dirname,"./views/login.html"));
})


app.post('/create',(req,res,next)=>{
  const caseDet = req.body;
  console.log(caseDet.cfd);
  if(!caseDet.cfd||new Date(caseDet.lhd)<new Date(caseDet.cfd))
{
  res.json({
    status:"error",
    message:"Case can't be heard before filing"
  })
}
else
{
  console.log(req.body)
  const sql = "INSERT INTO casedetail SET ? ";
  db.query(sql,caseDet,(err,data)=>{
    if(err)
      throw err;
    console.log("casedetail is inserted sucessfully");
    res.sendFile(path.join(__dirname,"./forms/Registration_Form.html"));
  });
   // res.send("Data Inserted Suceffuly");
// next();
 
}
 });






const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});