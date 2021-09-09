const express = require('express');
const morgan = require ('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db')
const app = express();

// Config .env to ./config/config.env
require('dotenv').config({
    path: './config/config.env'
})

//Connect to DB
connectDB()

// Config Use bodyPArser
app.use(bodyParser.json());



// Config for only  development
if(process.env.NODE_ENV === 'development') {
  app.use(cors({
      origin: process.env.CLIENT_URL,
    }));

  // Morgan gives info on each request
  app.use(morgan("dev"));
}

// Load all routes
const authRouter = require('./routes/auth.route.js')

// Use Routes
app.use('/api/', authRouter);

app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Page Not Found"
    });
});

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`🔥 App listening on port: ${PORT}!`);
});