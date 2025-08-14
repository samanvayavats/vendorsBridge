import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
     email: {
        type: String,
        required : true
    },
    userName: {
        type: String,
        
    },
    storeName: {
        type: String,
        
    },
    address: {
        type: String,
        
    },
    description: {
        type: String,
        
    },
    avatar: {
        type: String,
        
    },
    coverImage: {
        type: String,
        
    },
    mobileNumber: {
        type: String,
        
    },
    rating: {
        type: Number,   
    },
    comment: [
        {
            type: String
        }
    ]
})

export default mongoose.models.User || mongoose.model('User', userSchema)