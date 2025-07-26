import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    userId: { 
        type: String, 
        required: true 
    }, // User ID reference
    creator: { 
        type: String, 
        required: true 
    }, // User's name
    recipeId: { 
        type: String, 
        required: true 
    },
    
    creationTime: {
        type: Date,
        default: () => {
            // Get current UTC time
            const now = new Date();
    
            // Convert UTC time to Eastern Time (ET)
            const easternTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    
            // Return the easternTime as a Date object
            return easternTime;
        },
        immutable: true
    }
    
    ,
    content: {
        type: String,
        required: true
    }
});

const CommentModel = mongoose.model('Comment', commentSchema);
export default CommentModel;
