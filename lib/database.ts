import mongoose from "mongoose";


const dbConnect = async () => {
    try {
        await mongoose.connect(`${process.env.DB_STRING}vendorsBridgeDb`)
        console.log("the backend has been connected")
    } catch (error : string | any ) {
        throw new Error("something went wrong in connecting with the database", error)
    }

}

export default dbConnect