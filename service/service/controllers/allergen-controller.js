import * as allergenService from '../services/allergen-service.js';


export const getAllAllergens = async (req, res) => {
    try {
        const allergens = await allergenService.getAllAllergens();
        res.status(200).json(allergens);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const createAllergen = async (req, res) => {
    try {
        const allergen = await allergenService.createAllergen(req.body);
        res.status(201).json(allergen);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
