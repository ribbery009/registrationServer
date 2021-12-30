require("dotenv").config()

const User = require("./models/user_schema");
const bcrypt = require("bcrypt");
const express = require('express')
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dbConnect = require("./database/db");
const jsonwebtoken = require("jsonwebtoken");
const { request } = require("http");
const auth = require("./middleware/auth");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

dbConnect();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });

  
app.post("/login", async (req, res) => {
const test = User.findOne({ email: req.body.email })

    User.findOne({ email: req.body.email })

        // if email exists
        .then((user) => {
            // compare the password entered and the hashed password found
            bcrypt
                .compare(req.body.password, user.password)

                // if the passwords match
                .then((passwordCheck) => {
                   
                    // check if password matches
                    if (!passwordCheck) {
                        return res.status(400).send({
                            message: "Passwords does not match",
                            error,
                        });
                    }

                    //   create JWT token
                    console.log(user)
                    const token = jsonwebtoken.sign(
                        {
                            id: user._id,
                            email: user.email,
                        },
                        "RANDOM-TOKEN",
                        { expiresIn: "24h" }
                    );

                    //   return success response
                    res.status(200).send({
                        message: "Login Successful",
                        email: user.email,
                        token,
                    });
                })
                // catch error if password do not match
                .catch((error) => {
                    res.status(400).send({
                        message: "Passwords does not match",
                        error,
                    });
                });
        })
        // catch error if email does not exist
        .catch((e) => {
            res.status(404).send({
                message: "Email not found",
                e,
            });
        });

});

app.post("/register", async (req, res) => {



    console.log(req.body)
    try {
        req.body.password = await bcrypt.hash(req.body.password, 8);

        // req.body.activated_token = token;
        let user = new User({
            email: req.body.email.toLowerCase(), //sanitize: convert email to lowercase
            username: req.body.username,
            password: req.body.password
        });

        user.save()

        res.send(user);
    } catch (err) {
        console.log(err)
        res.send({ error: "insert error" });
    }
});

app.get("/auth-endpoint", auth, (request, response) => {
    response.send({ message: "You are authorized to access me" });
  });


module.exports = app;