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
    const wishlistRoutes = require('./src/routes/wishlistRoutes');

const Products = require('./src/models/Product');
const User = require('./src/models/User');

    // use middlewire
    app.use('/users', userRoutes)
    app.use('/products', productRoutes)
    app.use('/cart_products', cartRoutes)
    app.use('/wishlist', wishlistRoutes)

    // Aggrigation pipeline

    app.get('/category', async (req, res) => {
      const category =await Products.aggregate([
        {
          $group: {
            _id: "$category"
          }
        }
      ])
      res.json(category)
    })

    // admin state
    app.get("/admin-state", async(req, res)=>{
      const totalUsers = await User.estimatedDocumentCount() 
      const totalProducts = await Products.estimatedDocumentCount()
      
    })

app.listen(port, () => {
  console.log(`The server is running of port ${port}`);
})

// export default app