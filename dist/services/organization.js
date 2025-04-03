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
exports.deleteOrganizationData = exports.patchDataOrganization = exports.putDataOrganization = exports.createOrganization = exports.fetchAllOrganizations = void 0;
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const fetchAllOrganizations = () => __awaiter(void 0, void 0, void 0, function* () {
    const selectFields = {
        select: {
            text: true,
            state: true
        }
    };
    try {
        const organizations = yield prismaClient_1.default.organization.findMany({
            select: {
                id: true,
                nameOrganization: selectFields,
                ruc: selectFields,
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
        return organizations;
    }
    catch (error) {
        console.error("Error al obtener las organizaciones", error);
        return [];
    }
});
exports.fetchAllOrganizations = fetchAllOrganizations;
const createNestedField = (field) => ({
    create: {
        text: field.text,
        state: field.state,
    },
});
const createAddressField = (field) => ({
    create: {
        text: field.text,
        state: field.state,
    },
});
const createOrganization = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nameOrganization, ruc, phone, email, purpose, dependentsBenefit, motive, numPreRegister, address, coordinates, representative, stateRegistration, } = data;
        const newOrganization = yield prismaClient_1.default.organization.create({
            data: {
                nameOrganization: createNestedField(nameOrganization),
                ruc: createAddressField(ruc),
                phone: createNestedField(phone),
                email: createNestedField(email),
                purpose: createNestedField(purpose),
                dependentsBenefit: createNestedField(dependentsBenefit),
                motive: createNestedField(motive),
                numPreRegister: {
                    create: {
                        text: parseInt(numPreRegister.text),
                        state: numPreRegister.state,
                    },
                },
                address: {
                    create: {
                        street: createAddressField(address.street),
                        city: createAddressField(address.city),
                        neighborhood: createAddressField(address.neighborhood),
                        province: createAddressField(address.province),
                        country: createAddressField(address.country),
                    },
                },
                coordinates: {
                    create: {
                        latitude: coordinates.latitude,
                        longitude: coordinates.longitude,
                    },
                },
                representative: {
                    create: {
                        name: createNestedField(representative.name),
                        numDoc: createNestedField(representative.numDoc),
                        role: createNestedField(representative.role),
                        emailRepresentative: createNestedField(representative.emailRepresentative),
                        phoneRepresentative: createNestedField(representative.phoneRepresentative),
                    },
                },
                stateRegistration,
            },
        });
        return newOrganization;
    }
    catch (error) {
        throw new Error("No se pudo crear la organización, verifique los campos completos");
    }
});
exports.createOrganization = createOrganization;
const updateNestedField = (field) => ({
    update: {
        text: field.text,
        state: field.state,
    },
});
const updateAddressField = (field) => ({
    update: {
        text: field.text,
        state: field.state,
    },
});
const putDataOrganization = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nameOrganization, ruc, phone, email, purpose, dependentsBenefit, motive, numPreRegister, address, coordinates, representative, stateRegistration, } = data;
        const updatedOrganization = yield prismaClient_1.default.organization.update({
            where: {
                id: id, // Aquí puedes usar la variable id para actualizar la organización específica
            },
            data: {
                nameOrganization: updateNestedField(nameOrganization),
                ruc: updateNestedField(ruc),
                phone: updateNestedField(phone),
                email: updateNestedField(email),
                purpose: updateNestedField(purpose),
                dependentsBenefit: updateNestedField(dependentsBenefit),
                motive: updateNestedField(motive),
                numPreRegister: {
                    update: {
                        text: parseInt(numPreRegister.text),
                        state: numPreRegister.state,
                    },
                },
                address: {
                    update: {
                        street: updateAddressField(address.street),
                        city: updateAddressField(address.city),
                        neighborhood: updateAddressField(address.neighborhood),
                        province: updateAddressField(address.province),
                        country: updateAddressField(address.country),
                    },
                },
                coordinates: {
                    update: {
                        latitude: coordinates.latitude,
                        longitude: coordinates.longitude,
                    },
                },
                representative: {
                    update: {
                        name: updateNestedField(representative.name),
                        numDoc: updateNestedField(representative.numDoc),
                        role: updateNestedField(representative.role),
                        emailRepresentative: updateNestedField(representative.emailRepresentative),
                        phoneRepresentative: updateNestedField(representative.phoneRepresentative),
                    },
                },
                stateRegistration,
            }
        });
        return updatedOrganization;
    }
    catch (error) {
        throw new Error("No se pudo actualizar la organización");
    }
});
exports.putDataOrganization = putDataOrganization;
const patchDataOrganization = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const organization = yield prismaClient_1.default.organization.findUnique({
            where: { id },
        });
        if (!organization) {
            throw new Error("Organización no encontrada para actualizar");
        }
        const updatedData = createPrismaUpdateObject(data);
        if (!updatedData) {
            throw new Error("Datos no validos para actualizar");
        }
        const updatedOrganization = yield prismaClient_1.default.organization.update({
            where: { id },
            data: updatedData,
        });
        return updatedOrganization;
    }
    catch (error) {
        console.error("Error al actualizar la organización", error);
        throw new Error("No se pudo actualizar la organización");
    }
});
exports.patchDataOrganization = patchDataOrganization;
function createPrismaUpdateObject(data) {
    const updateData = {};
    for (const key in data) {
        if (data[key] &&
            typeof data[key] === "object" &&
            !Array.isArray(data[key])) {
            if (key === "nameOrganization" ||
                key === "ruc" ||
                key === "phone" ||
                key === "email" ||
                key === "purpose" ||
                key === "dependentsBenefit" || // Asegúrate de que el nombre del campo sea correcto
                key === "motive" ||
                key === "numPreRegister" ||
                key === "address" ||
                key === "coordinates" ||
                key === "representative") {
                updateData[key] = {
                    upsert: {
                        create: createPrismaUpdateObject(data[key]), // Llamada recursiva para objetos anidados
                        update: createPrismaUpdateObject(data[key]),
                    },
                };
            }
            else {
                updateData[key] = {
                    upsert: {
                        create: data[key],
                        update: data[key],
                    },
                };
            }
        }
        else if (data[key] !== undefined && data[key] !== null) {
            updateData[key] = data[key];
        }
    }
    return Object.keys(updateData).length ? updateData : undefined;
}
const deleteOrganizationData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedOrganization = yield prismaClient_1.default.organization.delete({
            where: { id },
        });
        return deletedOrganization;
    }
    catch (error) {
        console.error("Error al eliminar la organización", error);
        throw new Error("No se pudo eliminar la organización");
    }
});
exports.deleteOrganizationData = deleteOrganizationData;
