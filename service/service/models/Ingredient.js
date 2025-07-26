import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true
     },
    amount: { 
        type: Number, 
        required: false,
        default: null,
    },
    unit: { 
        type: String, 
        required: false,
        default: null, 
    },
    allergens: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        required: false,
        ref: 'Allergen' 
    }]
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);
export default Ingredient;
