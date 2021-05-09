/*--------------------------------setup----------------------------------------- */ 
require('rootpath')();
const express = require('express');
const app = express();
var morgan  = require('morgan');
app.use(morgan('dev'));
// body parser
var bodyParser = require('body-parser'); 
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
// jwt
const cors = require('cors');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);

//database
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/userDB", 
{useNewUrlParser: true,useUnifiedTopology: true}).then(()=> console.log("Succesfully connected!"))
.catch(()=>console.log("db connection failed"));

mongoose.set("useCreateIndex", true);
mongoose.Promise= global.Promise;

/*----------------------  adding a dummy object  ------------------------------*/
// importing db model
const userProfile = require("./models/user");

/*
userProfile.deleteMany({},function(err){
  if(err)
    console.log(err);
  else  
    console.log("Success");
});
*/

userProfile.findOne({username: 'prateek1106'}, (err,useru) => {
  if(useru === null){  
    const user = new userProfile( {
        id: 7,
        username: 'prateek1106',
        password: 'prateek123',
        firstName: 'Prateek',
        lastName: 'Sharma',
        wallet: 160,
        email: 'prateeksharma7599@gmail.com',
        stocks:[
          {name:'google',id: 1 ,quantity:10},
          {name:'amazon',id: 21,quantity:12}]
    });
    user.save((err,user) => {
      if(err)
        console.log(err);
      else{
        console.log("Dummy object added!");
      }
    });
    
  }else{
    console.log("Dummy object already added!");
  }
});

/*
userProfile.find((err,useru) => {
  console.log(useru);
});
*/

/*--------------------------------- routes -------------------------------------*/
const viewProfileRoute = require('./routes/viewProfile');
app.use('/profile',viewProfileRoute);
const walletRoute = require('./routes/wallet');
app.use('/wallet',walletRoute);
const buyStockRoute = require('./routes/buyStock');
app.use('/buystock',buyStockRoute);
const sellStockRoute = require('./routes/sellStock');
app.use('/sellstock',sellStockRoute)

/*-------------------------------starting the server-----------------------------*/
app.listen(4000,()=>{
    console.log("Started the server!");
});
