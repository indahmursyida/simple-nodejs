import express, { Request, Response } from "express";
import path from "path";
const PORT = 3000;

function init() {
  const app = express();
  
  // Middleware untuk log setiap permintaan
  app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
  });

  // Melayani file statis dari direktori "public"
  app.use(express.static(path.join(__dirname, '../public')));

  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      message: "OK",
      data: null
    });
  });

  app.get("/hello", (req: Request, res: Response) => {
    res.status(200).json({
      message: "Success fetch message",
      data: "Hello World!"
    });
  });

  app.get("/user", (req: Request, res: Response) => {
    res.status(200).json({
      message: "Success fetch user",
      data: {
        "id": 1,
        "name": "Budi",
        "username": "budidu",
        "email": "budidu@mail.com"
      }
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

init();