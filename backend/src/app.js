const express = require('express');
const cors = require('cors');
const aiRoutes = require('./ai.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Mount AI routes with /ai prefix
app.use('/ai', aiRoutes);

module.exports = app;