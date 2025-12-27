import prisma from "../db/index.js";

export const findCity = async () => {
    const city = await prisma.cities.findMany();

    return city;
}

export const findCityById = async (id) => {
    const city = prisma.cities.findUnique({
        where: {
            id,
        },
    });

    return city;
}

export const findCityByName = async (name) => {
    const city = await prisma.cities.findFirst({
        where: {
            name,
        },
    });

    return city;
}

export const insertCity = async (newDataCity) => {
    const city = await prisma.cities.create({
        data: {
            name: newDataCity.name,
            province: newDataCity.province,
            image: newDataCity.image
        },
    });

    return city;
}

export const deleteCityById = async (id) => {
    const city = await prisma.cities.delete({
        where: {
            id,
        },
    });

    return city;
}

export const updateCityById = async (cityUpdate, id) => {

    const data = {
        name: cityUpdate.name,
        province: cityUpdate.province,
    }

    if (cityUpdate.image) {
        data.image = cityUpdate.image;
    }

    const city = await prisma.cities.update({
        where: {
            id,
        },
        data: data,
    });

    return city;
}