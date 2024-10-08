import { v2 as cloudinary } from "cloudinary";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "./env";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
})

export const handleUpload = async (file: any) => {
  return new Promise(resolve => {
    cloudinary.uploader.upload(file, (_err: any, res: any) => {
      resolve({
        res: res,
      })
    })
  })
}

export default cloudinary;