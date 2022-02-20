const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const {ApolloServer,gql} = require("apollo-server-express")

const serviceAccount = require("./authserver-5e528-firebase-adminsdk-2fxjk-63c026e279.json");
admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
    databaseURL: "https://authserver-5e528-default-rtdb.europe-west1.firebasedatabase.app"
})

const typeDefs = gql`
type Post {
    userId: Int
    id: Int
    title: String
    body: String 
}

type Query {
    posts: [Post]
}`

const resolvers = {
    Query: {
        posts: () => {
           return admin
           .database()
           .ref("posts")
           .once("value")
           .then(snap => snap.val())
           .then(val=>Object.keys(val).map(
               (key)=>val[key]))
        }
    }
};


const app = express();

let apolloServer = null;
async function startServer() {
    apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ 
        app,
    path:"/",
cors:true });
}
startServer();

exports.graphql = functions.https.onRequest(app)
