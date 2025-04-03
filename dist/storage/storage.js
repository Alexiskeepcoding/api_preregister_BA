"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const supabase_1 = require("../middleware/supabase");
const multer_1 = __importStar(require("multer"));
const uuid_1 = require("uuid");
const app = (0, express_1.default)();
const upload = (0, multer_1.default)({ storage: (0, multer_1.memoryStorage)() });
app.use(supabase_1.supabaseMiddleWare);
app.get("/getBeneficiaries/:filename", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { filename } = req.params;
        const supabase = (0, supabase_1.getSupabase)(req);
        const { data, error } = yield supabase.storage
            .from((_a = process.env.BUCKET_NAME) !== null && _a !== void 0 ? _a : "")
            .download(`beneficiaries/${filename}`);
        if (error) {
            throw error;
        }
        const fileBuffer = yield data.arrayBuffer();
        const buffer = Buffer.from(fileBuffer);
        // Determinar el tipo de archivo basado en la extensión
        const fileExtension = (_b = filename.split(".").pop()) === null || _b === void 0 ? void 0 : _b.toLowerCase();
        if (fileExtension === "pdf") {
            // Configurar los encabezados para enviar el archivo como PDF
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
        }
        else if (fileExtension === "png") {
            // Configurar los encabezados para enviar el archivo como PNG
            res.setHeader("Content-Type", "image/png");
            res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
        }
        else {
            // Si el tipo de archivo no es soportado, enviar un error
            res.status(400).send("Tipo de archivo no soportado.");
            return;
        }
        res.status(200).send(buffer);
    }
    catch (error) {
        res.status(500).json({ error: "No existe el archivo solicitado" });
    }
}));
app.get("/getCertifications/:filename", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { filename } = req.params;
        const supabase = (0, supabase_1.getSupabase)(req);
        const { data, error } = yield supabase.storage
            .from((_a = process.env.BUCKET_NAME) !== null && _a !== void 0 ? _a : "")
            .download(`certifications/${filename}`);
        if (error) {
            throw error;
        }
        const fileBuffer = yield data.arrayBuffer();
        const buffer = Buffer.from(fileBuffer);
        // Determinar el tipo de archivo basado en la extensión
        const fileExtension = (_b = filename.split(".").pop()) === null || _b === void 0 ? void 0 : _b.toLowerCase();
        if (fileExtension === "pdf") {
            // Configurar los encabezados para enviar el archivo como PDF
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
        }
        else if (fileExtension === "png") {
            // Configurar los encabezados para enviar el archivo como PNG
            res.setHeader("Content-Type", "image/png");
            res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
        }
        else {
            // Si el tipo de archivo no es soportado, enviar un error
            res.status(400).send("Tipo de archivo no soportado.");
            return;
        }
        res.status(200).send(buffer);
    }
    catch (error) {
        res.status(500).json({ error: "No existe el archivo solicitado" });
    }
}));
app.post("/uploadBeneficiaries", upload.single("beneficiariesFile"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!req.file) {
            return res.status(400).send("No file uploaded.");
        }
        const supabase = (0, supabase_1.getSupabase)(req);
        const { originalname, buffer } = req.file;
        // Generate a UUID for the file
        const fileExtension = originalname.split(".").pop();
        const uniqueFileName = `${(0, uuid_1.v4)()}.${fileExtension}`;
        // Sube el archivo a Supabase Storage
        const { data, error } = yield supabase.storage
            .from((_a = process.env.BUCKET_NAME) !== null && _a !== void 0 ? _a : "")
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
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "Error al subir el archivo.", message: error.message });
    }
}));
app.post("/uploadCertifications", upload.single("certificationFile"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!req.file) {
            return res.status(400).send("No file uploaded.");
        }
        const supabase = (0, supabase_1.getSupabase)(req);
        const { originalname, buffer } = req.file;
        // Generate a UUID for the file
        const fileExtension = originalname.split(".").pop();
        const uniqueFileName = `${(0, uuid_1.v4)()}.${fileExtension}`;
        // Sube el archivo a Supabase Storage
        const { data, error } = yield supabase.storage
            .from((_a = process.env.BUCKET_NAME) !== null && _a !== void 0 ? _a : "")
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
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "Error al subir el archivo.", message: error.message });
    }
}));
exports.default = app;
