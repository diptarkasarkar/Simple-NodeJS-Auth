require('dotenv').config();
const express = require('express');
const connectToDB = require('./database/db');
const authRoutes = require('./routes/auth-routes');
const homeRoute = require('./routes/home-routes');
const adminRoutes = require('./routes/admin-routes');

const app = express();
const PORT = process.env.PORT;
connectToDB();

//Middlewares
app.use(express.json());

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoute);
app.use('/api/admin', adminRoutes);
app.listen(PORT, () => {
    console.log(`Server is starting at port: ${PORT}`);
});


