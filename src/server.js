const express = require('express');
const dotenv = require('dotenv').config()
const session = require('express-session');
const redis = require('redis');
const connectRedis = require('connect-redis');
const mysql = require('mysql');
const passport = require('passport');
const LocalStrategy = require('passport-local/lib').Strategy;
const bcrypt = require('bcryptjs');



const app = express();


app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'postgres',
    password: ''
});
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

const RedisStore = connectRedis(session)
//Configure redis client
const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
})
redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});



//Configure session middleware
const SESSION_SECRET = process.env.SESSION_SECRET;

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: '_sessionStore',
    cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: false, // if true prevent client side JS from reading the cookie 
        maxAge: 1000 * 60 * 10 // session max age in miliseconds
    }
}))
app.use(passport.initialize());
app.use(passport.session());

app.listen(4000, () => {
    console.log("Server started at port 4000")
})
