import express, { Request, response, Response } from "express";
import { getSupabase, supabaseMiddleWare } from "../middleware/supabase";
import multer, { memoryStorage } from "multer";
import { v4 as uuidv4 } from "uuid";

const app = express();
const upload = multer({ storage: memoryStorage() });

app.use(supabaseMiddleWare);

app.get("/getBeneficiaries/:filename", async (req: Request, res: Response) => {
  try {
    const { filename } = req.params;
    const supabase = getSupabase(req);
    const { data, error } = await supabase.storage
      .from(process.env.BUCKET_NAME ?? "")
      .download(`beneficiaries/${filename}`);

    if (error) {
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
    res.status(500).json({ error: "No existe el archivo solicitado" });
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
    res.status(500).json({ error: "No existe el archivo solicitado" });
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
      const { originalname, buffer } = req.file;

      // Generate a UUID for the file
      const fileExtension = originalname.split(".").pop();
      const uniqueFileName = `${uuidv4()}.${fileExtension}`;

      // Sube el archivo a Supabase Storage
      const { data, error } = await supabase.storage
        .from(process.env.BUCKET_NAME ?? "")
        .upload(`beneficiaries/${originalname}`, buffer, {
          upsert: false,
        });

      if (error) {
        throw error;
      }

      // Return success response with the generated file ID
      res.status(200).json({
        message: "El archivo se subió exitosamente",
        fileId: uniqueFileName,
      });
    } catch (error: any) {
      res
        .status(500)
        .json({ error: "Error al subir el archivo.", message: error.message });
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
      const { originalname, buffer } = req.file;

      // Generate a UUID for the file
      const fileExtension = originalname.split(".").pop();
      const uniqueFileName = `${uuidv4()}.${fileExtension}`;

      // Sube el archivo a Supabase Storage
      const { data, error } = await supabase.storage
        .from(process.env.BUCKET_NAME ?? "")
        .upload(`certifications/${originalname}`, buffer, {
          upsert: false,
        });

      if (error) {
        throw error;
      }

      // Return success response with the generated file ID
      res.status(200).json({
        message: "El archivo se subió exitosamente",
        fileId: uniqueFileName,
      });
    } catch (error: any) {
      res
        .status(500)
        .json({ error: "Error al subir el archivo.", message: error.message });
    }
  }
);

export default app;
