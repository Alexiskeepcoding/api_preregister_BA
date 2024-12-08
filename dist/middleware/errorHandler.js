"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerServer = exports.errorHandler = void 0;
const zod_1 = require("zod");
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    if (err instanceof zod_1.ZodError) {
        // Error de validación de Zod
        res.status(400).json({
            status: 400,
            message: "Error de validación",
            response: "Datos no válidos",
            errors: err.errors,
        });
        next(err);
    }
    const statusServer = res.statusCode || 500;
    let message;
    let response;
    switch (statusServer) {
        case 400:
            message = err.message || "Solicitud Incorrecta";
            response = err.response || `Datos no válidos: ${JSON.stringify(req.body)}`;
            break;
        case 404:
            message = err.message || "Recurso no encontrado";
            response = `URL inválida. Verifica el endpoint y los parámetros.`;
            break;
        default:
            message = err.message || "Error interno del servidor";
            response = `Error de Servidor`;
            break;
    }
    res.status(statusServer).json({
        status: statusServer,
        message: message,
        response: response,
    });
};
exports.errorHandler = errorHandler;
const errorHandlerServer = (error, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    if (error instanceof Error) {
        res.status(400).json({ error: "Ruta no encontrada" });
        next(error);
    }
    else {
        res.status(400).json({ error: "Unknown error" });
        next(error);
    }
};
exports.errorHandlerServer = errorHandlerServer;
