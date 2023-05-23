const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://al3ksandramakara:al3ksandramakara@onlineshop.r3fzbze.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const corsOptions = {
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());

// Set up a route to retrieve the data from the MongoDB collection and send it to the Angular app
app.get('/customers', async (req, res) => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("OnlineShop").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Retrieve all documents from the "customers" collection
    const customersCollection = client.db("OnlineShop").collection("customers");
    const customers = await customersCollection.find().toArray();
    console.log(customers);

    // Send the retrieved data to the Angular app as JSON
    res.json(customers);

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
});

app.get('/products', async (req, res) => {
  try {
    await client.connect();
    await client.db("OnlineShop").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const productsCollection = client.db("OnlineShop").collection("products");
    const products = await productsCollection.find().toArray();
    const count = await productsCollection.countDocuments();
    
    console.log(products);
    console.log(count);

    res.json({products, count});

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.get('/products/:user_id', async (req, res) => {
  const user_id = req.params.user_id;
  try {
    await client.connect();
    await client.db("OnlineShop").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const productsCollection = client.db("OnlineShop").collection("products");
    const products = await productsCollection.find().toArray();
    const count = await productsCollection.countDocuments();
    const usersCollection = client.db("OnlineShop").collection("users");
    const user = await usersCollection.find({_id: new ObjectId(user_id)}).toArray();
    
    console.log(products);
    console.log(count);
    console.log(user)

    res.json({products, count, user});

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.get('/cart_item', async (req, res) => {
  try {
    await client.connect();
    await client.db("OnlineShop").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const cartItemsCollection = client.db("OnlineShop").collection("cart_item");
    const cartItems = await cartItemsCollection.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: 'product_id',
          foreignField: '_id',
          as: 'product'
        }
      }
    ]).toArray();

    console.log(cartItems);

    res.json(cartItems);

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.get('/cart', async (req, res) => {
  try {
    await client.connect();
    await client.db("OnlineShop").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const cartCollection = client.db("OnlineShop").collection("cart");
    const products = await cartCollection.find().toArray();
    console.log(products);

    res.json(products);

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.put('/products/:id', async (req, res) => {
  console.log("weszlo");
  const id = req.params.id;
  // const updatedProduct = req.body;
  const update = { $set: {"quantity": req.body.quantity} };

  try {
    await client.connect();
    const productsCollection = client.db("OnlineShop").collection("products");

    const result = await productsCollection.updateOne({ _id: new ObjectId(id) }, update);
    if (result.modifiedCount === 1) {
      res.json({ message: 'Product updated successfully.' });
    } else {
      res.status(404).json({ error: 'Product not found.' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to update product.' });
  } finally {
    await client.close();
  }
});

app.post('/cart_item', async (req, res) => {
  console.log("cart post");
  // const newCartItem = req.body;
  const newCartItem = {
    cart_id: new ObjectId(req.body.cart_id),
    product_id: new ObjectId(req.body.product_id),
    quantity: req.body.quantity
  };
  console.log(newCartItem);

  try {
    await client.connect();
    const cartItemsCollection = client.db("OnlineShop").collection("cart_item");
    const result = await cartItemsCollection.insertOne(newCartItem);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to create new customer.' });
  } finally {
    await client.close();
  }
});

app.put('/users/:id', async (req, res) => {
  console.log("cart post");
  const id = req.params.id;
  const basket_name = req.body.basket_name;
  // const newCartItem = req.body;
  const newBasketItem = {
    product_id: new ObjectId(req.body._id),
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
    image: req.body.image,
    seller_id: new ObjectId(req.body.seller_id)
  };
  console.log(newBasketItem);

  try {
    await client.connect();

    const filter = {_id: new ObjectId(id), "baskets.basket": basket_name};
    const update = {$push: {"baskets.$.products": newBasketItem}};
    // const options = {arrayFilters: [{basket: "zabawki"}]};
    const basketItemsCollection = client.db("OnlineShop").collection("users");
    const result = await basketItemsCollection.updateOne(filter, update);
    console.log(`${result.modifiedCount} document(s) updated`);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to add product to basket.' });
  } finally {
    await client.close();
  }
});

app.put('/del_product/:basket', async (req, res) => {
  console.log("cart post");
  const user_id = req.body.user_id;
  const product_id = req.body.product_id;
  const basket = req.params.basket;

  try {
    await client.connect();

    const filter = {_id: new ObjectId(user_id), "baskets.basket": basket};
    const update = {$pull: {"baskets.$.products": {product_id: new ObjectId(product_id)}}};
    // const options = {arrayFilters: [{basket: "zabawki"}]};
    const usersCollection = client.db("OnlineShop").collection("users");
    const result = await usersCollection.updateOne(filter, update);
    console.log(`${result.modifiedCount} document(s) updated`);

    const user = await usersCollection.find({_id: new ObjectId(user_id)}).toArray();
    console.log(user);

    res.json(user);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to add product to basket.' });
  } finally {
    await client.close();
  }
});

app.put('/del_basket', async (req, res) => {
  console.log("delete basket");
  const user_id = req.body.user_id;
  const name = req.body.name;

  try {
    await client.connect();

    const filter = {_id: new ObjectId(user_id), };
    const update = {$pull: {baskets: {basket: name}}};
    const usersCollection = client.db("OnlineShop").collection("users");
    const result = await usersCollection.updateOne(filter, update);
    console.log(`${result.modifiedCount} document(s) updated`);

    const user = await usersCollection.find({_id: new ObjectId(user_id)}).toArray();
    console.log(user);

    res.json(user);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to add product to basket.' });
  } finally {
    await client.close();
  }
});

app.put('/add_basket/:id', async (req, res) => {
  console.log("cart post");
  const user_id = req.params.id;
  const basket_name = req.body.name;
  const newBasket = {
    basket: basket_name,
    products: []
  }

  try {
    await client.connect();

    const filter = {_id: new ObjectId(user_id)};
    const update = {$push: {baskets: newBasket}};
    const usersCollection = client.db("OnlineShop").collection("users");
    const result = await usersCollection.updateOne(filter, update);
    console.log(`${result.modifiedCount} document(s) updated`);

    const user = await usersCollection.find({_id: new ObjectId(user_id)}).toArray();
    console.log(user);

    res.json(user);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to add new basket.' });
  } finally {
    await client.close();
  }
});

app.get('/users/:id', async (req, res) => {
  console.log("weszlo");
  const id = req.params.id;

  try {
    await client.connect();
    const usersCollection = client.db("OnlineShop").collection("users");
    const user = await usersCollection.find({ _id: new ObjectId(id) }).toArray();
    console.log(user);

    res.json(user);

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.put('/buy_product', async (req, res) => {
  console.log("buy product");
  const customer_id = req.body.customer_id;
  const price = req.body.price * req.body.quantity;
  const basket = req.body.basket;
  const new_product = {
    product_id: req.body.product_id,
    name: req.body.name,
    seller_id: req.body.seller_id,
    quantity: req.body.quantity,
    price: req.body.price
  }

  const newOrder = {
    customer_id: customer_id,
    products: [new_product],
    price: price
  }
  
  // const update = { $set: {"quantity": req.body.quantity} };

  try {
    await client.connect();
    const productsCollection = client.db("OnlineShop").collection("products");
    const ordersCollection = client.db("OnlineShop").collection("orders");
    const usersCollection = client.db("OnlineShop").collection("users");

    // check whether can buy or not
    const product = await productsCollection.find({_id: new ObjectId(new_product.product_id)}).toArray();
    const diff = parseFloat(product[0].quantity) - parseFloat(new_product.quantity);
    if (diff < 0) {
      res.json(-1);
      return;
    }
    console.log(diff);
    console.log(product[0].quantity);
    console.log(new_product.quantity);

    // delete quantity from products
    const result = await productsCollection.updateOne({ _id: new ObjectId(new_product.product_id) }, { $set: {"quantity": diff} });
    if (result.modifiedCount === 1) {
      // res.json({ message: 'Product updated successfully.' });
    } else {
      res.status(404).json({ error: 'Product not found.' });
    }

    // delete from user basket
    const filter = {_id: new ObjectId(customer_id), "baskets.basket": basket};
    const update = {$pull: {"baskets.$.products": {product_id: new ObjectId(new_product.product_id)}}};
    const del_bas = await usersCollection.updateOne(filter, update);
    console.log(`${del_bas.modifiedCount} document(s) updated`);

    // add to orders
    const add_ord = await ordersCollection.insertOne(newOrder);

    const user = await client.db("OnlineShop").collection("users").find({_id: new ObjectId(customer_id)}).toArray();
    console.log(user);
    res.json(user);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to update product.' });
  } finally {
    await client.close();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});