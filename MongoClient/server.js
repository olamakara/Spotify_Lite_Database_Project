const { MongoClient, ServerApiVersion } = require('mongodb');
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

const corsOptions = {
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));

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
    console.log(products);

    res.json(products);

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});