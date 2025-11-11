const express = require('express');
const cors = require('cors');
const app = express()
require('dotenv').config()
const mongoose = require('mongoose');
const port = process.env.PORT || 5700


app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
  res.send('This is Twine server')
})

// TwineDB
// AU4tOjKGcdFCYN0k

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_KEY}@cluster0.ttcu5.mongodb.net/TwineDB?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(res=> {
  console.log("MongoDB connected (Atlas)");
})
.catch(err=>{
  console.log("error from db", err);
})


// Impoort Routes

    const userRoutes = require('./src/routes/userRoutes');
    const productRoutes = require('./src/routes/productRoutes');
    const cartRoutes = require('./src/routes/cartRoutes');



const Products = require('./src/models/Product');

    // use middlewire
    app.use('/users', userRoutes)
    app.use('/products', productRoutes)
    app.use('/cart_products', cartRoutes)

// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const { default: mongoose } = require('mongoose');
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_KEY}@cluster0.ttcu5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)

// // Collection




    

//     // const productCollection = client.db("Twine").collection('products')
//     // const userCollection = client.db("Twine").collection("users")


//     // // User Collection

//     // app.get('/users', async (req, res) => {
//     //   const result = await userCollection.find().toArray();
//     //   res.send(result)
//     // })

//     // app.get('/users/:email', async (req, res) => {
//     //   const email = req.params.email;
//     //   const filter = { email: email };
//     //   const result = await userCollection.findOne(filter);
//     //   // console.log(result);
//     //   res.send(result);
//     // })

//     // app.post('/users', async (req, res) => {
//     //   const user = req.body;
//     //   const query = { email: user.email }
//     //   // console.log(query);
//     //   const existingUser = await userCollection.findOne(query);
//     //   if (existingUser) {
//     //     return res.send({ message: "User already exist", insertedId: null })
//     //   }

//     //   const result = await userCollection.insertOne(user);
//     //   res.send(result)
//     // })



//     // // Products Collection

//     // app.get("/products", async (req, res) => {
//     //   const result = await productCollection.find().toArray();
//     //   res.send(result);
//     // })

//     // app.get("/products/:id", async (req, res) => {
//     //   const id = req.params.id;
//     //   const filter = { _id: new ObjectId(id) }
//     //   const result = await productCollection.findOne(filter);
//     //   res.send(result)
//     // })

//     // app.delete("/products/delete/:id", async (req, res) => {
//     //   const id = req.params.id;
//     //   const filter = { _id: new ObjectId(id) };
//     //   const result = await productCollection.deleteOne(filter);
//     //   res.send(result)
//     // })

//     // app.post("/products", async (req, res) => {
//     //   const product = req.body;
//     //   const result = await productCollection.insertOne(product);
//     //   res.send(result)
//     // })






//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);



    // Aggrigation pipeline

    app.get('/category', async (req, res) => {
      const category =await Products.aggregate([
        {
          $group: {
            _id: "$category"
          }
        }
      ])
      // console.log(category);
      res.json(category)
    })

app.listen(port, () => {
  console.log(`The server is running of port ${port}`);
})