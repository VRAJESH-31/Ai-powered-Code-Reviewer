const express = require('express');
const aiRoutes = require('./ai.routes');
const cors = require('cors');   



const app = express();
app.use(cors({
    origin: "https://your-frontend-url.onrender.com" 
}));
app.use(express.json()); 


app.use('/ai', aiRoutes);

module.exports = app;