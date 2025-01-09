import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
import dotenv from 'dotenv'

dotenv.config()
cloudinary.config({
    cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`,
    api_key: `${process.env.CLOUDINARY_API_KEY}`,
    api_secret: `${process.env.CLOUDINARY_API_SECRET}`
});


export const uploadToCloudinary = async (localPath) => {
    try {
        if (!localPath) return null;
        const uploadResult = await cloudinary.uploader.upload(localPath, { resource_type: "auto" });
        if (!uploadResult) {
            fs.unlinkSync(localPath);
            return null;
        }


        fs.unlinkSync(localPath);
        return uploadResult;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const deleteFromCloudinary = async (publicURL) => {
    try {
        const response = await cloudinary.uploader.destroy(publicURL);
        return;
    } catch (error) {
        console.log(error);
        return
    }
}