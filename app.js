const express = require('express');
const cors = require('cors');
const app = express()
const jwt = require('jsonwebtoken')
require('dotenv').config()
const mongoose = require('mongoose');
const port = process.env.PORT || 5700


app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
  res.send('This is Twine server')
})


mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_KEY}@cluster0.ttcu5.mongodb.net/TwineDB?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(res => {
    console.log("MongoDB connected (Atlas)");
  })
  .catch(err => {
    console.log("error from db", err);
  })

// Impoort Routes

const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const wishlistRoutes = require('./src/routes/wishlistRoutes');
const orderRoutes = require('./src/routes/orderRoutes')


// Jwt Api
app.post("/jwt", async(req, res)=>{
  const user = req.body;
  const token= jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1d'
  })
  res.json({token})
})




const Products = require('./src/models/Product');
const User = require('./src/models/User');
const Wishlist = require('./src/models/Wishlist');


// use middlewire
app.use('/users',  userRoutes)
app.use('/products', productRoutes)
app.use('/cart_products', cartRoutes)
app.use('/wishlist', wishlistRoutes)
app.use('/orders', orderRoutes)

// Aggrigation pipeline

app.get('/category', async (req, res) => {
  const category = await Products.aggregate([
    {
      $group: {
        _id: "$category"
      }
    }
  ])
  res.json(category)
})

// users state
app.get("/user-state/:email", async (req, res) => {
  const email = req.params.email
  const filter = { email: email };
  const user = await User.findOne(filter)
  if (user) {
    // user validation
    const wishlist = await Wishlist.estimatedDocumentCount()
    const totalPrice = await Products.aggregate([
      {
        $group: {
          _id: null,
          totalPrice: { $sum: "$price" }
        }
      }
    ])
    // const orders = await 

    return res.json({
      wishlist,
      totalPrice,

    })

  }else{
    return res.status(403).json({message: " Unauthorized! Access forbidden"})
  }

})

// admin state
app.get("/admin-state", async (req, res) => {
  const totalUsers = await User.estimatedDocumentCount()
  const totalProducts = await Products.estimatedDocumentCount()


  return res.json({
    totalProducts,
    totalUsers,

  })
})

app.listen(port, () => {
  console.log(`The server is running of port ${port}`);
})

// export default app