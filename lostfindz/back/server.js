var express = require("express");
const app = express();
// var bodyParser = require('body-parser')
// const morgan =require('morgan')
require("dotenv").config({ path: "./.env" });
const cors = require("cors");
// const port = 5000
const port = process.env.PORT || 5000;
const cookie_parser = require("cookie-parser");
const mongoose = require("mongoose");
const routes = require("./routes/auth");
const category = require("./routes/category");
const passport = require("passport");
var path = require("path");
app.use(cors());
// const session = require('express-session');
// const cookieSession = require('cookie-session')
// require('./config/passport')(passport)

// app.use('/public',express.static('./uploads'))
app.enable("trust proxy");
// app.use(fileUpload())
// app.use(cors())//avoid inter port communication error
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, "uploads")));
app.use(cookie_parser());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }));
//Data parsing
app.use(express.json());
// app.use(express.urlencoded({extended:false}))
//Express session
// app.use(session({
//     secret:'secret',
//     resave:true,
//     saveUninitialized:true
// }))
//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// app.use(cookieSession({
//     name:'session',
//     keys:['key1','key2']
// }))
// passport.serializeUser(function(user, done) {
//     console.log('serialize')
//     done(null, user.email);
//   });

// passport.deserializeUser(function(id, done) {
//     console.log('deserialize')

//     User.findById(id, function(err, user) {
//       done(err, user);
//     });
// });

// mongoose.connect('mongodb+srv://swarupkumar:eashok410@lfs.q2in2.mongodb.net/test',{
//     useNewUrlParser: true,
//     useUnifiedTopology:true,
//     useCreateIndex:true
// })

try {
  //console.log("MONGO_URL:", process.env.MONGO_URL);
  const conn = mongoose.connect(
    "mongodb+srv://best:anand123@cluster0.0ffrhwj.mongodb.net/lostfound",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  );
  console.log(`connected to mongodb database`);
} catch (error) {
  console.log(`error in mongodb ${error}`);
}

mongoose.connection.on("connected", () => {
  console.log("Database connected !");
});

app.use("/", routes);
app.use("/", category);

app.listen(port, () => console.log(`Listening to port ${port} !!`));
