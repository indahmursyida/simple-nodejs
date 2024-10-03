import multer from "multer";
import 'dotenv/config'

const multerStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, './public/images')
  },
  filename: (_req, file, cb) => {
    const ext = file.mimetype.split('/')[1]
    cb(null, `${Date.now()}.${ext}`)
  },
})

const upload = multer({ storage: multerStorage })
export const single = upload.single("file");
export const multiple = upload.array("files", 10);

export default {
  single,
  multiple
};