import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



 const deleteFromCloudinary = async (publicId:any , type:any) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: type ,
    });
    console.log("Cloudinary delete result:", result);
    return result;
  } catch (error) {
    console.error("Cloudinary deletion error:", error);
    throw error;
  }
};

export default deleteFromCloudinary