const express = require("express");
const dotenv = require("dotenv").config();
const session = require("express-session");
const connectRedis = require("connect-redis");
const { createClient } = require("redis");
const passport = require("passport");
const router = require("./routes");
const { passportConfig } = require("./utils/passport");


const app = express();
const PORT = 4300;

//app middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//Redis congurations
const redisClient = createClient({ legacyMode: true });
redisClient.connect().catch(console.error);
const RedisStore = connectRedis(session);

//Configure session middleware
const SESSION_SECRET = process.env.SESSION_SECRET;

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie
      maxAge: 1000 * 60 * 10, // session max age in miliseconds
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

passportConfig();

//Router middleware
app.use(router);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
