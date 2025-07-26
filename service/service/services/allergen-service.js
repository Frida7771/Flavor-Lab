import Allergen from '../models/Allergen.js';

export const getAllAllergens = async () => {
    return await Allergen.find();
};

export const createAllergen = async (data) => {
    const allergen = new Allergen(data);
    return await allergen.save();
};
