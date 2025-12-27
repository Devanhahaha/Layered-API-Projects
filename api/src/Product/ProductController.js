import express from 'express';
import { createProduct, deletedProduct, getAllProducts, getProductById, patchProductById, updateProduct } from './ProductServices.js';
import { upload } from "../multer/index.js";

const router = express.Router();

// get all products
router.get("/", async (req, res) => {
    const products = await getAllProducts();

    res.send(products);
});

// get a single product by id
router.get("/:id", async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const product = await getProductById(productId);

        res.send({
            data: product,
            message: `Product fetched by id ${product.id} successfully`
        });

    } catch (error) {
        res.status(500).send(`Error fetching product by id ${product.id}: ${error.message}`);
    }
});

// create a new product
router.post("/", upload.single("image"), async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const image = req.file?.filename; // ✅ FILE DARI MULTER

        // ✅ VALIDASI YANG BENAR
        if (!name || !price || !description || !image) {
            return res.status(400).json({
                message: "Semua field wajib diisi termasuk gambar",
            });
        }

        const products = await createProduct({
            name,
            price,
            description,
            image, // ✅ KIRIM IMAGE KE SERVICE
        });

        res.status(201).json({
            data: products,
            message: "Product created successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

// delete a product
router.delete("/:id", async (req, res) => {

    try {
        const productId = parseInt(req.params.id);
        const product = await deletedProduct(productId);
        res.status(200).send({
            data: product,
            message: "Product deleted successfully"
        });

    } catch (error) {
        res.status(500).send(`Error deleting product: ${error.message}`);
    }

});

// update a product
router.put("/:id", upload.single("image"), async (req, res) => {

    try {
        const productId = parseInt(req.params.id);
        const { name, price, description } = req.body;
        const image = req.file?.filename; // ✅ FILE DARI MULTER 

        // ✅ VALIDASI YANG BENAR
        if (!name || !price || !description ) {
            return res.status(400).json({
                message: "Semua field wajib diisi termasuk gambar",
            });
        }

        const products = await updateProduct({
            name,
            price,
            description,
            image,
        },
            productId,
        );

        res.status(200).send({
            data: products,
            message: "Product updated successfully"
        });

    } catch (error) {
        res.status(500).send(`Error updating product: ${error.message}`);
    }
});

// partially update a product
router.patch("/:id", async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const updateProduct = req.body;

        const products = await patchProductById(updateProduct, productId);

        res.status(200).send({
            data: products,
            message: "Product updated successfully"
        });

    } catch (error) {
        res.status(500).send(`Error updating product: ${error.message}`);
    }
});

export default router;