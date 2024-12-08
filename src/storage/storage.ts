import express, { Request, Response } from "express";
import { getSupabase, supabaseMiddleWare } from "../middleware/supabase";
import multer from "multer";

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(supabaseMiddleWare);

app.post("/uploadBeneficiaries", upload.single("beneficiariesFile"), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).send("No file uploaded.");
      }

      const supabase = getSupabase(req);
      const { path, originalname } = req.file;

      // Lee el archivo desde el sistema de archivos
      const fs = require("fs");
      const fileBuffer = fs.readFileSync(path);

      // Sube el archivo a Supabase Storage
     
      const { data, error } = await supabase.storage
        .from("organizations")
        .upload(`beneficiaries/${originalname}`, fileBuffer);

      if (error) {
        throw error;
      }

      res.status(200).send(`Archivo subido exitosamente`);
    } catch (error) {
      res.status(500).send("Error al subir el archivo.");
    }
  }
);

app.post("/uploadCertifications", upload.single("certificationFile"), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).send("No file uploaded.");
      }

      const supabase = getSupabase(req);
      const { path, originalname } = req.file;

      // Lee el archivo desde el sistema de archivos
      const fs = require("fs");
      const fileBuffer = fs.readFileSync(path);

      // Sube el archivo a Supabase Storage
      const { data, error } = await supabase.storage
        .from("organizations")
        .upload(`certifications/${originalname}`, fileBuffer);

      if (error) {
        throw error;
      }

      res.status(200).send(`Archivo subido exitosamente`);
    } catch (error) {
      res.status(500).send("Error al subir el archivo.");
    }
  }
);

export default app;
