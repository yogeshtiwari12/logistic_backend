import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import userroutes from "./routes/routes.js";
import cookieParser from "cookie-parser";


const app = express();

mongoose.connect("mongodb+srv://yt781703:oOMjOmEC0GNFf64L@cluster0.0szdh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{

}).then(()=>{
    console.log("coonected to the database",mongoose.connection.db.databaseName);
})
.catch((error)=>{
    console.log("error connecting to the database", error.message);
})

app.use(cookieParser())

app.use(cors({
    origin: 'https://logistic-frontend-delta.vercel.app',
    credentials: true,
  }));
app.use(express.json())


  app.use('/userroutes1', userroutes)
app.listen(4000,()=>{
    console.log("Connected to MongoDB ");
})
