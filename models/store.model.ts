import mongoose, { model, Schema } from "mongoose";

const storeSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    storeName: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    storeViews: {
        type: Number,
        required: true
    },
    comments: [
        {
            type: String
        }
    ]

},{timestamps :true})

export default mongoose.models.Store || model('Store', storeSchema)