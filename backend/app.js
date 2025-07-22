import express from 'express';
import {createServer} from 'http';
import { Server } from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import connectToSocket from './controallers/socketmanger.js';
const app=express();
app.get("/home",(req,res)=>{
    res.send("hello world");
});
const server=createServer(app);
const io=connectToSocket(server);

app.set("port",(process.env.PORT || 8000));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

async function start() {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb+srv://devadiprudhvi4:Prudhvi%40123@cluster0.piyygj2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("✅ Connected to MongoDB");

    // Start the server
    app.listen(app.get('port'), () => {
      console.log(`🚀 Server started on port ${app.get('port')}`);
    });

  } catch (err) {
    console.error("❌ Error starting app:", err.message);
    process.exit(1); // Optional: Exit if connection fails
  }
}

start();