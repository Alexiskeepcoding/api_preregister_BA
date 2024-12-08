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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrganization = exports.updatePutOrganization = exports.updatePatchOrganization = exports.getOrganizationById = exports.getAllOrganizations = exports.createOrganization = void 0;
const client_1 = require("@prisma/client");
const service = __importStar(require("../services/organization"));
const organizationTypes_1 = require("../types/organizationTypes");
const errorHandler_1 = require("../middleware/errorHandler");
const prisma = new client_1.PrismaClient();
// Crear nueva organización
const createOrganization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validación con Zod
        const parsedData = organizationTypes_1.OrganizationSchema.parse(req.body);
        const newOrganization = yield service.createOrganization(parsedData);
        res.status(201).json({
            status: 201,
            message: "Organización creada correctamente",
            response: newOrganization,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerServer)(error, res, next);
        next(error);
    }
});
exports.createOrganization = createOrganization;
// Obtener todas las organizaciones
const getAllOrganizations = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const organizations = yield service.fetchAllOrganizations();
        res.status(200).json({
            status: 200,
            message: "Todas las Organizaciones obtenidas correctamente",
            response: organizations,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerServer)(error, res, next);
        next(error);
    }
});
exports.getAllOrganizations = getAllOrganizations;
// Obtener organización por ID con verificación de existencia
const getOrganizationById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validación del ID con Zod
        const { id } = organizationTypes_1.IdSchema.parse(req.params);
        // Verificar si la organización existe en la base de datos
        const organization = yield prisma.organization.findUnique({
            where: { id: Number(id) },
            select: {
                stateRegistration: true,
                address: {
                    select: {
                        city: true,
                    },
                },
                representative: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        if (!organization) {
            return res.status(404).json({ message: "Organización no encontrada" });
        }
        res.json(organization);
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerServer)(error, res, next);
        next(error);
    }
});
exports.getOrganizationById = getOrganizationById;
// Actualización parcial de una organización (PATCH)
const updatePatchOrganization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const idOrganization = Number(id);
        // Validación parcial con Zod
        const parsedData = organizationTypes_1.OrganizationSchema.partial().parse(req.body);
        const onUpdateOrganization = yield service.patchDataOrganization(idOrganization, parsedData);
        return res.status(200).json({
            message: "La organización ha sido actualizada correctamente",
            response: onUpdateOrganization,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerServer)(error, res, next);
        next(error);
    }
});
exports.updatePatchOrganization = updatePatchOrganization;
// Actualización completa de una organización (PUT)
const updatePutOrganization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const productId = Number(id);
        // Validación completa con Zod
        const parsedData = organizationTypes_1.OrganizationSchema.parse(req.body);
        const onUpdateOrganization = yield service.putDataOrganization(productId, parsedData);
        res.status(200).json({
            message: "La organización ha sido actualizada correctamente",
            response: onUpdateOrganization,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerServer)(error, res, next);
        next(error);
    }
});
exports.updatePutOrganization = updatePutOrganization;
// Eliminar una organización
const deleteOrganization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = organizationTypes_1.IdSchema.parse(req.params); // Validación del ID
        const onDeleteOrganization = yield service.deleteOrganizationData(Number(id));
        return res.status(200).json({
            status: 200,
            message: `La organización con el id ${id} sido eliminada correctamente`,
            response: onDeleteOrganization,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandlerServer)(error, res, next);
        next(error);
    }
});
exports.deleteOrganization = deleteOrganization;
