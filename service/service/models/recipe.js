import mongoose from 'mongoose';


const ingredientSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number
    },
    unit: {
        type: String
    },
    creator: {
        type: String
    },
    allergy: {
        type: String
    }
});


const recipeSchema = new mongoose.Schema({
    id:{
        required:true,
        type: String, // uuid()
        immutable: true
    }, 
    name:{
        required:true,
        type: String
    },
    steps: {
        type: [String], // Detailed cooking steps
        required: true
    },
    picture: {
        type: String // URI format
    },
    creationTime: {
        type: Date,
        default: Date.now, // Auto-generate creation time
        immutable: true
    },
    lastModifiedTime: {
        type: Date,
        default: Date.now // Auto-update on modification
    },
    ingredients: {
        type: [ingredientSchema], // Array of Ingredient sub-documents
        required: true
    },
    rating: {
        type: Number, // 1-5
        default: 0
    },
    creator: {
        type: String, // User ID of the recipe creator
        required: true,
        immutable: true
    }
});

// Pre hook to update lastModifiedTime
recipeSchema.pre('save', function(next){
    this.lastModifiedTime = Date.now();
    next();
});
recipeSchema.pre('findOneAndUpdate', function(next) {
    this.set({ lastModifiedTime: Date.now() }); // Set lastModifiedTime manually
    next();
});

const RecipeModel= mongoose.model('Recipe', recipeSchema)
export default RecipeModel;