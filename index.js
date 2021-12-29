require("dotenv").config()

const User = require("./models/user_schema");
const jwt = require("./jwt");
const bcrypt = require("bcrypt");
const express = require('express')
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dbConnect = require("./db");
const jsonwebtoken = require("jsonwebtoken");
const { request } = require("http");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

dbConnect();

app.post("/login", async (req, res) => {
    console.log(req.body)
    if (!req.body.username || !req.body.password) {
        res.json({ result: "error", message: "Invalid password or username" });
        return;
    }
    let doc = await Users.findOne({ username: req.body.username });
    if (doc) {
        if (bcrypt.compareSync(req.body.password, doc.password)) {
            const payload = {
                id: doc._id,
                level: doc.level,
                username: doc.username
            };

            let token = jwt.sign(payload);
            console.log(token);
            res.json({ result: "success", token, message: "Login successfully" });
        } else {
            // Invalid password
            res.json({ result: "error", message: "Invalid password" });
        }
    } else {
        // Invalid username
        res.json({ result: "error", message: "Invalid username" });
    }
});

app.post("/register", async (req, res) => {
   


console.log(req.body)
    try {
        req.body.password = await bcrypt.hash(req.body.password, 8);

        // const { first_name, last_name, email } = req.body;
        // const token = jsonwebtoken.sign(
        //   { first_name, last_name, email },
        //   "process.env.JWT_ACCOUNT_ACTIVATION",
        //   { expiresIn: "365d" }
        // );

  
        // req.body.activated_token = token;
        let user = new User({
            email: req.body.email,
            username:req.body.username,
            password:req.body.password
        });

        user
        .save()
        // return success if the new user is added to the database successfully


        // const client = dbConnect();

        // client.connect(async (err) => {
        //     const collection = client.db("registration_app").collection("users");
        //     // perform actions on the collection object

        //     const users = await collection.insertOne(user);
          
        //     client.close();
        // });


        res.send(user);
    } catch (err) {
        console.log(err)
        res.send({ error: "insert error" });
    }
});
app.listen(8080)