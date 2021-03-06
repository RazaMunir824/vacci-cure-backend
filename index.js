const express =  require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const sms = require("./sms");
const app = express()

//Files
const user = require('./routes/user')
const login = require('./routes/login')
const logout = require('./routes/logout')
const hospital = require("./routes/hospital");
const child = require("./routes/child");

//MiddleWare
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Routes
app.use('/api' , user)
app.use('/api' , login)
app.use('/api' , logout)
app.use("/api", hospital);
app.use("/api", child);



//Listen 
const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => console.log("Serverr running at port, ", PORT));