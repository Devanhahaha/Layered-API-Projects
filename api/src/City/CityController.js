import express from 'express'
import { createCity, deleteCity, getAllCity, getCityById, updateCity } from './CityServices.js';
import { uploadCity } from '../multer/city.js';

const router = express.Router();

router.get("/", async (req, res) => {
    try {

        const city = await getAllCity();

        res.send({
            data: city,
            message: "Cities fetched successfully"
        });
    } catch (error) {
        res.status(500).send(`Error fetching cities: ${error.message}`);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const cityId = parseInt(req.params.id);
        const city = await getCityById(cityId);

        res.status(200).send({
            data: city,
            message: `City fetched by id ${city.id} successfully`
        });
    } catch (error) {
        res.status(500).send(`Error fetching city by id ${city.id}: ${error.message}`);
    }
});

router.post("/", uploadCity.single("image"), async (req, res) => {
    try {
        const { name, province } = req.body;
        const imageFile = req.file?.filename; // ✅ FILE DARI MULTER

        if (!name || !province || !imageFile) {
            return res.status(400).json({
                message: "Semua field wajib diisi termasuk gambar"
            });
        }

        const city = await createCity({
            name,
            province,
            image: imageFile,
        });

        res.status(200).send({
            data: city,
            message: "City created successfully"
        });

    } catch (error) {
        res.status(500).send(`Error creating city: ${error.message}`);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const cityId = parseInt(req.params.id);
        const deletedCity = await deleteCity(cityId);

        res.status(200).send({
            data: deletedCity,
            message: `City with id ${cityId} deleted successfully`
        });

    } catch (error) {
        res.status(500).send(`Error deleting city by id ${cityId}: ${error.message}`);
    }
});

router.put("/:id", uploadCity.single("image"), async (req, res) => {
    try {
        const cityId = parseInt(req.params.id);
        const { name, province } = req.body;
        const imageFile = req.file?.filename; // ✅ FILE DARI MULTER

        if (!name || !province || !imageFile) {
            return res.status(400).json({
                message: "Semua field wajib diisi termasuk gambar"
            });
        }

        const city = await updateCity({
            name,
            province,
            image: imageFile,
        },
            cityId
        )

        res.status(200).send({
            data: city,
            message: "City updated successfully"
        });
        
    } catch (error) {
        res.status(500).send(`Error updating city: ${error.message}`);
    }
})

export default router;