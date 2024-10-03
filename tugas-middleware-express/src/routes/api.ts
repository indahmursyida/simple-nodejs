import express, { Request, Response } from "express";
import { single, multiple } from "../middlewares/upload.middleware";
import { handleUpload } from "../utils/cloudinary";

const router = express.Router();
router.post("/upload/single", single, async (req: Request, res: Response) => {
    try {
        const file = req.file;
    
        if (file) {
            const { path } = file;
    
            const response: any = await handleUpload(path);
    
            res.status(200).json(response.res);
        } else {
            res.status(400).json({ message: 'No file uploaded' });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/upload/multiple", multiple, async (req: Request, res: Response) => {
    try {
        const responses = []
        let files: any
        
        files = req.files
        for (const file of files) {
            const { path } = file
            const response = await handleUpload(path)
            responses.push(response)
        }
        const multiFiles = responses.map((url: any) => url.res)
        res.status(200).json(multiFiles)
    }
    catch (err: any) {
        res.status(500).json({ message: err.message })
    }
});

export default router;