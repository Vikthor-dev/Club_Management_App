import express from "express";
import mongo from "mongodb"
import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose"
import cors from "cors"
import bodyParser from "body-parser";
import jwt from "jsonwebtoken"

const url = "mongodb+srv://viktor:vadmin@maincluster.pf7nvqb.mongodb.net/?retryWrites=true&w=majority";

const app = express();
const port = 9000;
app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


MongoClient.connect(url, function (err, client) {
  if (err) {
    console.log('Error occurred while connecting to MongoDB:', err);
  } else {
    console.log('Connected successfully to MongoDB server');
    const db = client.db('Masterbase');

    app.get("/user", async (req, res) => {
      let token = req.headers.token;
      jwt.verify(token, 'secretKey', async (err, decoded) => {
        if (err) {
          res.json({
            status: 'Unauthorized!'
          })
        }
        console.log("Decoded:", decoded);
        db.collection("Users").findOne({ _id: mongo.ObjectId(decoded.userId) }, (err, user) => {
          if (err) {
            console.log("Error:", err);
            res.json({
              error: "Error getting user!"
            })
          }
          else {
            console.log("User fetched!");
            res.json({
              user: {
                Ime: user.Ime,
                Prezime: user.Prezime,
                Email: user.Email,
                Dob: user.Dob,
                Id: user._id,
                Base64: user.Base64data,
                Admin: user.Admin
              }
            })
          }

        })
      })
    })

    app.post("/login", async (req, res) => {
      console.log("Credentials:", req.body)
      db.collection("Users").findOne({ Email: req.body.Email }, (err, user) => {
        console.log("Database user:", user)
        if (!user) {
          console.log("User not found!")
          res.json({
            error: 'User not found!'
          })
        }
        if (req.body.Password !== user.Password) {
          console.log("Incorrect password!")
          res.json({
            error: 'Incorrect Password'
          })
        }
        else {
          let token = jwt.sign({ userId: user._id }, 'secretKey');
          console.log("Login success!")
          res.json({
            token: token,
            userData: user
          })
        }
      })
    })

    app.post("/userImage", async (req, res) => {
      console.log("User Id: ", req.body.userId)
      const userId = req.body.userId
      const obj = req.body.base64
      if (Object.keys(obj).length === 0) {
        console.log("No data received!")
        res.json({
          error: "No data received!"
        })
      } else {
        console.log("Base64 data received!")
        db.collection("Users").updateOne({ _id: mongo.ObjectID(userId) }, { $set: { Base64data: obj } })
        res.json({
          status: "Base64 data reveived!"
        })
      }
    })

    app.post("/userPassword", async (req, res) => {
      console.log("Received password data: ", req.body)
      const pass = req.body.pass
      const npass = req.body.npass
      const cnpass = req.body.cnpass
      const userId = req.body.userId
      db.collection("Users").findOne({ _id: mongo.ObjectId(userId) }, (err, user) => {
        if (pass === user.Password) {
          console.log("Password Correct!")
          db.collection("Users").updateOne({ _id: mongo.ObjectID(userId) }, { $set: { Password: npass } })
          res.json({
            status: "Password Changed!"
          })
        } else {
          console.log("Incorrect Password!")
          res.json({
            error: "Incorrect Password!"
          })
        }
      })
    })

    app.post("/newNews", async (req, res) => {
      console.log("Received News data!")
      let data = req.body
      db.collection("NewsPosts").insertOne(data)
      res.json({
        status: "Data inserted!"
      })
    })

    app.get("/getNews", async (req, res) => {
      let cursor = await db.collection("NewsPosts").find().sort({ Datum: -1 })
      let results = await cursor.toArray();
      res.json(results)
    })

    app.get("/getNews/:id", async (req, res) => {
      let id = req.params.id
      let doc = await db.collection("NewsPosts").findOne({ _id: mongo.ObjectId(id) })
      res.json(doc)
    })

    app.post("/updateNews", async (req, res) => {
      let id = req.body.newsId
      db.collection("NewsPosts").updateOne({ _id: mongo.ObjectID(id) }, { $set: { Title: req.body.title, Text: req.body.text } })
      res.json({
        status: "News Updated!"
      })
    })

    app.post("/deleteNews", async (req, res) => {
      let id = req.body.id
      console.log(id)
      db.collection("NewsPosts").deleteOne({ _id: mongo.ObjectId(id) })
      res.json({
        status: "News deleted!"
      })
    })

    app.post("/addComment", async (req, res) => {
      let data = req.body
      db.collection("Comments").insertOne(data)
      res.json({
        status: "Data inserted!"
      })
    })

    app.get("/getChat", async (req, res) => {
      let cursor = await db.collection("Comments").find().sort({ Datum: -1 })
      let results = await cursor.toArray();
      res.json(results)
    })

    app.post("/deleteChat", async (req, res) => {
      let id = req.body.id
      console.log(id)
      db.collection("Comments").deleteOne({ _id: mongo.ObjectId(id) })
      res.json({
        status: "Chat deleted!"
      })
    })

    app.post("/newMarket", async (req, res) => {
      console.log("Received Market data!")
      let data = req.body
      db.collection("MarketPosts").insertOne(data)
      res.json({
        status: "Data inserted!"
      })
    })


    app.get("/getMarket", async (req, res) => {
      let cursor = await db.collection("MarketPosts").find().sort({ Datum: -1 })
      let results = await cursor.toArray();
      res.json(results)
    })

    app.get("/getMarkets/:id", async (req, res) => {
      let id = req.params.id
      console.log(id)
      let doc = await db.collection("MarketPosts").findOne({ _id: mongo.ObjectId(id) })
      res.json(doc)
    })

    app.post("/updateMarket", async (req, res) => {
      let id = req.body.marketId
      db.collection("MarketPosts").updateOne({ _id: mongo.ObjectID(id) }, { $set: { Title: req.body.title, Price: req.body.price, Image: req.body.image } })
      res.json({
        status: "News Updated!"
      })
    })


    app.post("/deleteMarket", async (req, res) => {
      let id = req.body.id
      console.log(id)
      db.collection("MarketPosts").deleteOne({ _id: mongo.ObjectId(id) })
      res.json({
        status: "Market deleted!"
      })
    })

    app.post("/newGallery",async(req,res)=>{
      console.log("Received Gallery data!")
      let data = req.body
      db.collection("Gallery").insertOne(data)
      res.json({
        status: "Data inserted!"
      })
    })

  }
});


app.listen(port, () => console.log(
  `Listening on port ${port}!`
))