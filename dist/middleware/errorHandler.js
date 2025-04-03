"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerServer = exports.errorHandler = void 0;
const zod_1 = require("zod");
const errorHandler = (err, req, res, next) => {
    var _a;
    if (res.headersSent) {
        return next(err);
    }
    // Manejar error de método HTTP incorrecto
    if (err.statusCode === 405 || ((_a = err.message) === null || _a === void 0 ? void 0 : _a.includes("method"))) {
        return res.status(405).json({
            status: 405,
            message: "Método no permitido",
            response: `El método ${req.method} no está permitido para esta ruta`,
        });
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
    const statusServer = res.statusCode !== 200 ? res.statusCode : 500;
    let message;
    let response;
    switch (statusServer) {
        case 400:
            message = err.message || "Solicitud Incorrecta";
            response =
                err.response || `Datos no válidos: ${JSON.stringify(req.body)}`;
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
    return res.status(statusServer).json({
        status: statusServer,
        message: message,
        response: response,
    });
};
exports.errorHandler = errorHandler;
// Controlador del servidor por ZOD, para manejar errores de validación
const errorHandlerServer = (error, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    if (error instanceof zod_1.ZodError) {
        const errores = error.errors;
        const erroresFiltrados = errores.map(err => {
            var _a;
            return {
                // received: err.message.split("received ")[1]?.replace(/['"]/g, "") || "unknown",
                // path: err.path.join("."),
                message: err.message.includes("Invalid enum value")
                    ? `Invalid value. Expected 'PENDING', received '${(_a = err.message.split("received ")[1]) === null || _a === void 0 ? void 0 : _a.replace(/['"]/g, "")}'`
                    : err.message,
            };
        });
        return res.status(400).json({
            status: 400,
            message: `Error de Syntaxis en la petición`,
            errors: erroresFiltrados,
            response: "El servidor no pudo procesar la solicitud",
        });
    }
    next(error);
};
exports.errorHandlerServer = errorHandlerServer;
