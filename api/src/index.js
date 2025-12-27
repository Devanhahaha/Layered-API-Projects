import express from 'express';
import dotenv from 'dotenv';
import productController from './Product/ProductController.js';
import userController from './User/UserController.js';
import cityController from './City/CityController.js';
import cors from 'cors';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/product", express.static("public/product"));
app.use("/users", express.static("public/users"));
app.use("/cities", express.static("public/cities"));

// test api
app.get("/api", (req, res) => {
    res.send("Hello World")
});

app.use("/products", productController);
app.use("/users", userController);
app.use("/cities", cityController);

// start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});