import { deleteUserById, findUser, findUserById, findUserByName, insertUser, patchhUserById, updateUserById } from "./UserRepository.js";

// get all users
export const getAllUsers = async () => {
    const user = await findUser();

    return user;
}

export const getUsersById = async (id) => {
    const users = await findUserById(id);

    if (!(users)) {
        throw Error("User not found");
    };

    return users;
}

export const createUsers = async (newDataUsers) => {

    const findUsersByName = await findUserByName(newDataUsers.name);

    if (findUsersByName) {
        throw Error("User already exists");
    }

    const users = await insertUser(newDataUsers);

    return users;
}

export const deletedUser = async (id) => {
    if (typeof id !== "number") {
        throw Error("User ID must be a number");
    }

    await getUsersById(id);

    const deleteProduct = await deleteUserById(id);

    if (!(deleteProduct)) {
        throw Error("User not found");
    }

    return deleteProduct;
}

export const updateUser = async (UserUpdate, id) => {
    if (typeof id !== "number") {
        throw Error("User ID must be a number");
    }

    const users = await updateUserById(UserUpdate, id);

    return users;
}

export const patchUserById = async (patchUser, id) => {

    if (typeof id !== "number") {
        throw Error("User ID must be a number");
    }

    const users = await patchhUserById(patchUser, id);

    return users;
}