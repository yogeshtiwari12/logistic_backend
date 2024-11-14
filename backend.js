import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import userroutes from "./routes/routes.js";
import cookieParser from "cookie-parser";


const app = express();
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/logistic",{

}).then(()=>{
    console.log("coonected to the database",mongoose.connection.db.databaseName);
})
.catch((error)=>{
    console.log("error connecting to the database", error.message);
})

app.use(cookieParser())



app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));


app.use('/userroutes1', userroutes)
app.listen(4000,()=>{
    console.log("Connected to MongoDB ");
})