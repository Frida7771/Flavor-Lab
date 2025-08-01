import dotenv from 'dotenv';
import express from 'express';
import initialize from './service/app.js';

dotenv.config();
const app = express();  
const port = process.env.PORT; 
initialize(app);
app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${port}`);
});