import express, { Request, Response } from "express";
import { getSupabase, supabaseMiddleWare } from "../middleware/supabase";
import multer from "multer";

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(supabaseMiddleWare);

app.get("/getBeneficiaries/:filename", async (req: Request, res: Response) => {
  try {
    const { filename } = req.params;
    const supabase = getSupabase(req);
    const { data, error } = await supabase.storage
      .from(process.env.BUCKET_NAME ?? "")
      .download(`beneficiaries/${filename}`);

    if (error) {
      console.error("Error al obtener el archivo:", error);
      throw error;
    }

    const fileBuffer = await data.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);

    // Determinar el tipo de archivo basado en la extensión
    const fileExtension = filename.split(".").pop()?.toLowerCase();

    if (fileExtension === "pdf") {
      // Configurar los encabezados para enviar el archivo como PDF
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    } else if (fileExtension === "png") {
      // Configurar los encabezados para enviar el archivo como PNG
      res.setHeader("Content-Type", "image/png");
      res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    } else {
      // Si el tipo de archivo no es soportado, enviar un error
      res.status(400).send("Tipo de archivo no soportado.");
      return;
    }
    res.status(200).send(buffer);
  } catch (error) {
    console.error("Error al obtener el archivo:", error);
    res.status(500).send("Error al obtener el archivo.");
  }
});

app.get("/getCertifications/:filename", async (req: Request, res: Response) => {
  try {
    const { filename } = req.params;
    const supabase = getSupabase(req);
    const { data, error } = await supabase.storage
      .from(process.env.BUCKET_NAME ?? "")
      .download(`certifications/${filename}`);

    if (error) {
      console.error("Error al obtener el archivo:", error);
      throw error;
    }

    const fileBuffer = await data.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);

    // Determinar el tipo de archivo basado en la extensión
    const fileExtension = filename.split(".").pop()?.toLowerCase();

    if (fileExtension === "pdf") {
      // Configurar los encabezados para enviar el archivo como PDF
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    } else if (fileExtension === "png") {
      // Configurar los encabezados para enviar el archivo como PNG
      res.setHeader("Content-Type", "image/png");
      res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    } else {
      // Si el tipo de archivo no es soportado, enviar un error
      res.status(400).send("Tipo de archivo no soportado.");
      return;
    }
    res.status(200).send(buffer);
  } catch (error) {
    console.error("Error al obtener el archivo:", error);
    res.status(500).send("Error al obtener el archivo.");
  }
});

app.post(
  "/uploadBeneficiaries",
  upload.single("beneficiariesFile"),
  async (req: Request, res: Response) => {
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
        .from(process.env.BUCKET_NAME ?? "")
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

app.post(
  "/uploadCertifications",
  upload.single("certificationFile"),
  async (req: Request, res: Response) => {
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
        .from(process.env.BUCKET_NAME ?? "")
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
