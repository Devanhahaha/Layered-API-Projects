import prisma from "../db/index.js";

export const findProduct = async () => {
    const products = await prisma.products.findMany();

    return products;
}

export const findProductById = async (id) => {
    const product = await prisma.products.findUnique({
        where: {
            id,
        },
    });

    return product
}

export const findProductByName = async (name) => {
    const product = await prisma.products.findFirst({
        where: {
            name,
        },
    });

    return product;
}

export const insertProduct = async (newDataProducts) => {
    const products = await prisma.products.create({
        data: {
            name: newDataProducts.name,
            price: Number(newDataProducts.price),
            description: newDataProducts.description,
            image: newDataProducts.image
        }
    });

    return products;
}

export const deletedProductById = async (id) => {
    const product = await prisma.products.delete({
        where: {
            id: id,
        },
    });

    return product;
}

export const updateProductById = async (ProductUpdate, id) => {

    const data = {
        name: ProductUpdate.name,
        price: Number(ProductUpdate.price),
        description: ProductUpdate.description,
    };

    // ✅ kalau user upload gambar baru
    if (ProductUpdate.image) {
        data.image = ProductUpdate.image;
    }

    const products = await prisma.products.update({
        where: {
            id: id,
        },
        data: data,
    });

    return products;
};


export const patchhProductById = async (updateProduct, id) => {
    const products = await prisma.products.update({
        where: {
            id: parseInt(id),
        },
        data: {
            name: updateProduct.name,
            price: updateProduct.price,
            description: updateProduct.description,
            image: updateProduct.image
        },
    });

    return products;
}