const express = require('express')
const mongoClient = require('mongodb').MongoClient
const bodyParser=require('body-parser')
const ObjectID = require('mongodb').ObjectID

const app = express()
const port = 3000
app.use(express.json())
const DB_URL = 'mongodb+srv://superadmin:kingslex@cluster0-vaebr.gcp.mongodb.net/admin?retryWrites=true&w=majority'
const DB_NAME = 'example'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.get('/', (req , res) => {
    res.send({message: 'hi mongo'})
})
app.post('/people',(req,res)=>{
    var person =req.body
    collection.insert(person,(err,result)=>{
        if(err){
            return res.status(500).send({error:err})
        }
        res.send(result.result)
    })
})

app.get('/people',(req,res)=>{
    collection.find({}).toArray((err,result)=>{
        if(err){
            return res.status(500).send({error:err})

        }
        res.send(result)
    })
})

var collection , database
app.listen(port, () => {
   mongoClient.connect(DB_URL,{useNewUrlParser: true , useUnifiedTopology: true}, (error , client) => {
       if (error) {
           throw error
       }

        database = client.db(DB_NAME)
        collection = database.collection('people')

        console.log('Try-mongo started at 3000') 
    }) 
 
})