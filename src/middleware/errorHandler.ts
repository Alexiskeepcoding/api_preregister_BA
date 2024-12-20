import { ZodError } from "zod";
import { NextFunction, Request, Response } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  
  if (err instanceof ZodError) {
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
  let message: string;
  let response: any;

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

export const errorHandlerServer = (error: unknown, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }

  if(error instanceof Error) {
    res.status(400).json({ error: "Ruta no encontrada"}); 
    next(error);
  }else{
    res.status(400).json({ error: "Unknown error"});
    next(error);
  }

}