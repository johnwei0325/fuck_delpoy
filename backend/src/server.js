// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ server.js ]
// * PackageName  [ server ]
// * Synopsis     [ Connect to Database and Infrastructure of Backend ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////
import path from "path";
import express from 'express'
import cors from 'cors'
import routes from './routes'
import mongoose from 'mongoose'
import { dataInit } from './upload'
require('dotenv').config()
const app = express()
if (process.env.NODE_ENV === "development") {
	
}
app.use(cors());
if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "../frontend", "build")));
    app.get("/*", function (req, res) {
      res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
    });
  }
// init middleware

app.use(express.json())
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4000')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Credentials', 'true')
    next()
})

const port = process.env.PORT || 4000
const dboptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

// TODO Part I-3: check .env exists
// dotenv.config();
if(!process.env.MONGO_URL) {
    console.error("Missing MONGO_URL!!!");
    process.exit(1);
}
// console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
}
    // TODO Part I-3: connect the backend to mongoDB
).then(async res => {
    if (process.env.MODE === 'Reset') {
        console.log('Reset Mode: reset the data')
        dataInit()
    }
})

// TODO Part I-3: check DB connection
mongoose.connection.on('error',
            console.error.bind(console, 'connection error:'));

routes(app)
app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})
