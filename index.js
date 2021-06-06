const express =  require('express');
const bodyParser = require('body-parser')
const app = express()

//Files
const user = require('./routes/user')
const login = require('./routes/login')
const logout = require('./routes/logout')

//MiddleWare
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Routes
app.use('/api' , user)
app.use('/api' , login)
app.use('/api' , logout)




//Listen 
const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => console.log("Serverr running at port, ", PORT));