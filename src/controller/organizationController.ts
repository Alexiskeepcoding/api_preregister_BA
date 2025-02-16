import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import * as service from "../services/organization";
import { IdSchema, OrganizationSchema } from "../types/organizationTypes";
import { errorHandlerServer } from "../middleware/errorHandler";
import { text } from "stream/consumers";

const prisma = new PrismaClient();



// Crear nueva organización
export const createOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validación con Zod
    const parsedData = OrganizationSchema.parse(req.body);

    const newOrganization = await service.createOrganization(parsedData);

    res.status(201).json({
      status: 201,
      message: "Organización creada correctamente",
      response: newOrganization,
    });
  } catch (error) {
    errorHandlerServer(error, res, next);
    next(error);
  }
};

// Obtener todas las organizaciones
export const getAllOrganizations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const organizations = await service.fetchAllOrganizations();
    res.status(200).json({
      status: 200,
      message: "Todas las Organizaciones obtenidas correctamente",
      dataOnlyOrganizations: organizations,
    });
  } catch (error) {
    errorHandlerServer(error, res, next);
    next(error);
  }
};

// Obtener organización por ID con verificación de existencia
export const getOrganizationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    // Validación del ID con Zod
    const { id } = IdSchema.parse(req.params);

    const selectFields = {
      select: {
        text: true,
        state: true
      }
    }

    // Verificar si la organización existe en la base de datos
    const organization = await prisma.organization.findUnique({
      where: { id: Number(id) },
      select: {
        nameOrganization: selectFields,
        ruc: {
          select: {
            rucText: true,
            state: true
          }
        },
        phone: selectFields,
        email: selectFields,
        purpose: selectFields,
        dependentsBenefit: selectFields,
        motive: selectFields,
        numPreRegister: selectFields,
        address: {
          select: {
            street: selectFields,
            city: selectFields,
            neighborhood: selectFields,
            province: selectFields,
            country: selectFields,
          }
        },
        coordinates: {
          select: {
            latitude: true,
            longitude: true
          }
        },
        representative: {
          select: {
            name: selectFields,
            numDoc: selectFields,
            role: selectFields,
            emailRepresentative: selectFields,
            phoneRepresentative: selectFields,
          }
        },
        stateRegistration: true
      }
    });

    if (!organization) {
      return res.status(404).json({ message: "Organización no encontrada" });
    }

    res.json(organization);

  } catch (error) {
    errorHandlerServer(error, res, next);
    next(error);
  }
};

// Actualización parcial de una organización (PATCH)
export const updatePatchOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const idOrganization = Number(id);

    // Validación parcial con Zod
    const parsedData = OrganizationSchema.partial().parse(req.body);

    const onUpdateOrganization = await service.patchDataOrganization(idOrganization, parsedData);

    return res.status(200).json({
      message: "La organización ha sido actualizada correctamente",
      response: onUpdateOrganization,
    });

  } catch (error) {
    errorHandlerServer(error, res, next);
    next(error);
  }
};

// Actualización completa de una organización (PUT)
export const updatePutOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const productId = Number(id);

    // Validación completa con Zod
    const parsedData = OrganizationSchema.parse(req.body);

    const onUpdateOrganization = await service.putDataOrganization(productId, parsedData);
    
    res.status(200).json({
      message: "La organización ha sido actualizada correctamente",
      response: onUpdateOrganization,
    });
  } catch (error) {
    errorHandlerServer(error, res, next);
    next(error);
  }
};

// Eliminar una organización
export const deleteOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = IdSchema.parse(req.params); // Validación del ID

    const onDeleteOrganization = await service.deleteOrganizationData(Number(id));
    return res.status(200).json({
      status: 200,
      message: `La organización con el id ${id} sido eliminada correctamente`,
      response: onDeleteOrganization,
    });
  } catch (error) {
    errorHandlerServer(error, res, next);
    next(error);
  }
};


