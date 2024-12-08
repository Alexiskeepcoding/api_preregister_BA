"use strict";
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
exports.fetchInfoOrganization = void 0;
exports.fetchInfoOrganizationById = fetchInfoOrganizationById;
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
//Este servicio se encarga de obtener los datos de la organizacion beneficiaria
const fetchInfoOrganization = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prismaClient_1.default.organization.findMany({
            include: {
                address: {
                    include: {
                        city: true,
                        street: true,
                    }
                },
                representative: {
                    select: {
                        name: true,
                        role: true,
                        emailRepresentative: {
                            select: {
                                text: true
                            }
                        },
                    }
                },
            }
        });
    }
    catch (error) {
        console.error("Error al obtener los datos de la Organizacion beneficiaria", error);
        throw new Error("No se pudo obtener los datos de la Organizacion beneficiaria");
    }
});
exports.fetchInfoOrganization = fetchInfoOrganization;
function fetchInfoOrganizationById(id) {
    try {
        return prismaClient_1.default.organization.findUnique({
            where: {
                id: id
            },
            include: {
                address: {
                    include: {
                        city: true,
                        street: true,
                    }
                },
                representative: {
                    select: {
                        name: true,
                        role: true,
                        emailRepresentative: {
                            select: {
                                text: true
                            }
                        },
                    }
                },
            }
        });
    }
    catch (error) {
        console.error("Error al obtener los datos del personal de la Organizacion", error);
        throw new Error("No se pudo obtener los datos del personal de la Organizacion");
    }
}
