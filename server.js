const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Sample product data
const products = [
    {
        id: 1,
        category: 'device',
        title: 'Smartphone XYZ',
        price: 699,
        image: 'https://via.placeholder.com/300x180?text=Smartphone+XYZ',
        description: 'A powerful smartphone with a stunning display and excellent camera.'
    },
    {
        id: 2,
        category: 'device',
        title: 'Laptop ABC',
        price: 1299,
        image: 'https://via.placeholder.com/300x180?text=Laptop+ABC',
        description: 'A lightweight laptop with high performance for work and play.'
    },
    {
        id: 3,
        category: 'accessory',
        title: 'Wireless Headphones',
        price: 199,
        image: 'https://via.placeholder.com/300x180?text=Wireless+Headphones',
        description: 'Comfortable wireless headphones with noise cancellation.'
    },
    {
        id: 4,
        category: 'accessory',
        title: 'Portable Charger',
        price: 49,
        image: 'https://via.placeholder.com/300x180?text=Portable+Charger',
        description: 'Compact portable charger with fast charging capabilities.'
    }
];

// Endpoint to get all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Endpoint to get product by id
app.get('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`ElectroShop backend API listening at http://localhost:${port}`);
});
