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

//routes
const walletRoute = require('./routes/wallet');
app.use('/wallet',walletRoute);


//demo object
var userProfile = {
    name:'Krishna',
    email:'abc@gmail.com',
    wallet:0,
    stocks:[{name:'google'
,price: 523.0,quantity:10},{
    name:'amazon',price:1230.23,quantity:12
}]
};


//home route
app.get('/',(req,res)=>{
    res.send(JSON.stringify(userProfile));
})

//start server
app.listen(3000,()=>{
    console.log("Started the server!");
});
