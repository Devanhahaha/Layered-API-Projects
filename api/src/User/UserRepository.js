import prisma from "../db/index.js";

// get all users
export const findUser = async () => {
    const user = await prisma.users.findMany();

    return user;
}

export const findUserById = async (id) => {
    const users = await prisma.users.findUnique({
        where: {
            id,
        },
    });

    return users;
}

export const findUserByName = async (name) => {
    const user = await prisma.products.findFirst({
        where: {
            name,
        },
    });

    return user;
}

export const insertUser = async (newDataUsers) => {
    const users = await prisma.users.create({
        data: {
            name: newDataUsers.name,
            email: newDataUsers.email,
            contact: newDataUsers.contact,
            address: newDataUsers.address,
            image: newDataUsers.image
        }
    });

    return users;
}

export const deleteUserById = async (id) => {
    const deleteUser = await prisma.users.delete({
        where: {
            id,
        },
    });

    return deleteUser;
}

export const updateUserById = async (UserUpdate, id) => {

    const data = {
        name: UserUpdate.name,
        email: UserUpdate.email,
        contact: UserUpdate.contact,
        address: UserUpdate.address,
    }

    if (UserUpdate.image) {
        data.image = UserUpdate.image;
    }

    const users = await prisma.users.update({
        where: {
            id: id,
        },
        data: data
    });

    return users;
}

export const patchhUserById = async (patchUser, id) => {
    const users = await prisma.users.update({
        where: {
            id,
        },
        data: {
            name: patchUser.name,
            email: patchUser.email,
            contact: patchUser.contact,
            address: patchUser.address,
            image: patchUser.image
        },
    });

    return users;
}