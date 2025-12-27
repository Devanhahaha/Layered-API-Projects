import express from 'express';
import { createUsers, deletedUser, getAllUsers, getUsersById, patchUserById, updateUser } from './UserServices.js';
import { uploadUser } from '../multer/user.js';
const router = express.Router();

// get all users
router.get("/", async (req, res) => {
    try {
        const user = await getAllUsers();

        res.send({
            data: user,
            message: "Users fetched successfully"
        });
    } catch (error) {
        res.status(500).send(`Error fetching users: ${error.message}`);
    }
});

// get users by id
router.get("/:id", async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const users = await getUsersById(userId);

        res.status(200).send({
            data: users,
            message: `User fetched by id ${users.id} successfully`
        });

    } catch (error) {
        res.status(500).send(`Error fetching user by id ${users.id}: ${error.message}`);
    }
});

router.post("/", uploadUser.single("image"), async (req, res) => {
    try {
        const { name, email, contact, address } = req.body;
        const image = req.file?.filename; // ✅ FILE DARI MULTER

        if (!name || !email || !contact || !address || !image) {
            return res.status(400).json({
                message: "Semua field wajib diisi termasuk gambar"
            });
        }

        const users = await createUsers({
            name,
            email,
            contact,
            address,
            image,
        });

        res.status(200).send({
            data: users,
            message: "User created successfully"
        })
    } catch (error) {
        res.status(500).send(`Error creating user: ${error.message}`);
    }
});

router.delete("/:id", async (req, res) => {

    try {
        const userId = parseInt(req.params.id);
        const deleteUser = await deletedUser(userId);

        res.status(200).send({
            data: deleteUser,
            message: "User deleted successfully"
        });

    } catch (error) {
        res.status(500).send(`Error deleting user: ${error.message}`);
    }

});

router.put("/:id", uploadUser.single("image"), async (req, res) => {

    try {
        const userId = parseInt(req.params.id);
        const { name, email, contact, address } = req.body;
        const image = req.file?.filename; // ✅ FILE DARI MULTER

        if (!name || !email || !contact || !address ) {
            return res.status(400).json({
                message: "Semua field wajib diisi"
            });
        }

        const userUpdate = await updateUser({
            name,
            email,
            contact,
            address,
            image,
        },
        userId
    );

        res.status(200).send({
            data: userUpdate,
            message: "User updated successfully"
        });

    } catch (error) {
        res.status(200).send(`Error updating user: ${error.message}`);
    }

});

router.patch("/:id", async (req, res) => {

    try {

        const userId = parseInt(req.params.id);
        const patchUser = req.body;

        const user = await patchUserById(patchUser, userId);

        res.status(200).send({
            data: user,
            message: "User updated patch successfully"
        });

    } catch (error) {
        res.status(500).send(`Error updating user: ${error.message}`);
    }

});

export default router;