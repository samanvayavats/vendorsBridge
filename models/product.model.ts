import mongoose, { Schema } from "mongoose";


const productSchema = new mongoose.Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    productDescription: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    price :{
        type: Number,
        required: true
    }
})

export default mongoose.models.Product || mongoose.model('Product' , productSchema)