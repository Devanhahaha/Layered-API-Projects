import { deletedProductById, findProduct, findProductById, findProductByName, insertProduct, patchhProductById, updateProductById } from "./ProductRepository.js";

export const getAllProducts = async () => {
    const products = await findProduct();

    return products;
}

export const getProductById = async (id) => {
    const product = await findProductById(id);

    if (!(product)) {
        throw Error("Product not found");
    }

    return product;
}

export const createProduct = async (newDataProducts) => {

    const findProduct = await findProductByName(newDataProducts.name);

    if (findProduct) {
        throw Error("Product already exists");
    }

    const product = await insertProduct(newDataProducts);

    return product;
}

export const deletedProduct = async (id) => {
    if (typeof id !== "number") {
        throw Error("Product ID must be a number");
    }

    await getProductById(id);

    const product = await deletedProductById(id);

    if (!(product)) {
        throw Error("Product not found");
    }

    return product;
}

export const updateProduct = async (ProductUpdate, id) => {
    if (typeof id !== "number") {
        throw Error("Product ID must be a number");
    }

    const products = await updateProductById(ProductUpdate, id);

    return products;
}

export const patchProductById = async (updateProduct, id) => {

    if (typeof id !== "number") {
        throw Error("Product ID must be a number");
    }

    const products = await patchhProductById(updateProduct, id);

    return products;
}
