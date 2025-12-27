import { deleteCityById, findCity, findCityById, findCityByName, insertCity, updateCityById } from "./CityRepository.js"

export const getAllCity = async () => {
    const city = await findCity();

    return city;
}

export const getCityById = async (id) => {
    const city = await findCityById(id);

    if (!(city)) {
        throw Error("City not found");
    }

    return city;
}

export const createCity = async (newDataCity) => {
    const findCityByNamee = await findCityByName(newDataCity.name);

    if (findCityByNamee) {
        throw Error("City already exists");
    }

    const city = await insertCity(newDataCity);

    return city;
}

export const deleteCity = async (id) => {
    if (typeof id !== "number") {
        throw Error("City ID must be a number");
    }

    await getCityById(id);

    const deleteCity = await deleteCityById(id);

    if (!(deleteCity)) {
        throw Error("City not found");
    }

    return deleteCity;
}

export const updateCity = async (cityUpdate, id) => {
    if (typeof id !== "number") {
        throw Error("City ID must be a number");
    }

    const city = await updateCityById(cityUpdate, id);

    return city;
}