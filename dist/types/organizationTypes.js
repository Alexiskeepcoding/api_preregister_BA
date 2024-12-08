"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdSchema = exports.OrganizationSchema = void 0;
const zod_1 = require("zod");
// Esquema Zod para validar la creación y actualización de organizaciones
exports.OrganizationSchema = zod_1.z.object({
    nameOrganization: zod_1.z.object({
        text: zod_1.z.string().min(1, "El nombre de la organización es requerido").optional(),
        state: zod_1.z.boolean(),
    }),
    ruc: zod_1.z.object({
        rucText: zod_1.z.string().min(10, "El RUC debe tener 13 dígitos"),
        state: zod_1.z.boolean(),
    }),
    phone: zod_1.z.object({
        text: zod_1.z.string().optional(),
        state: zod_1.z.boolean(),
    }),
    email: zod_1.z.object({
        text: zod_1.z.string().email("Correo electrónico no válido"),
        state: zod_1.z.boolean(),
    }),
    purpose: zod_1.z.object({
        text: zod_1.z.string().optional(),
        state: zod_1.z.boolean(),
    }),
    dependentsBenefit: zod_1.z.object({
        text: zod_1.z.number().optional(),
        state: zod_1.z.boolean(),
    }),
    motive: zod_1.z.object({
        text: zod_1.z.string().optional(),
        state: zod_1.z.boolean(),
    }),
    numPreRegister: zod_1.z.object({
        text: zod_1.z.number().optional(),
        state: zod_1.z.boolean(),
    }),
    address: zod_1.z.object({
        street: zod_1.z.object({
            text: zod_1.z.string().optional(),
            state: zod_1.z.boolean(),
        }),
        city: zod_1.z.object({
            text: zod_1.z.string().optional(),
            state: zod_1.z.boolean(),
        }),
        neighborhood: zod_1.z.object({
            text: zod_1.z.string().optional(),
            state: zod_1.z.boolean(),
        }),
        province: zod_1.z.object({
            text: zod_1.z.string().optional(),
            state: zod_1.z.boolean(),
        }),
        country: zod_1.z.object({
            text: zod_1.z.string().optional(),
            state: zod_1.z.boolean(),
        }),
    }).optional(),
    coordinates: zod_1.z.object({
        latitude: zod_1.z.string(),
        longitude: zod_1.z.string(),
    }).optional(),
    representative: zod_1.z.object({
        name: zod_1.z.object({
            text: zod_1.z.string().optional(),
            state: zod_1.z.boolean(),
        }),
        numDoc: zod_1.z.object({
            text: zod_1.z.string().optional(),
            state: zod_1.z.boolean(),
        }),
        role: zod_1.z.object({
            text: zod_1.z.string().optional(),
            state: zod_1.z.boolean(),
        }),
        emailRepresentative: zod_1.z.object({
            text: zod_1.z.string().email(),
            state: zod_1.z.boolean(),
        }),
        phoneRepresentative: zod_1.z.object({
            text: zod_1.z.string().optional(),
            state: zod_1.z.boolean(),
        }),
    }).optional(),
    stateRegistration: zod_1.z.enum(["PENDING", "REVIEW", "APPROVED", "REJECTED"]),
});
// Esquema para validar IDs
exports.IdSchema = zod_1.z.object({
    id: zod_1.z.string().regex(/^\d+$/, "ID incorrecto"), // Acepta solo dígitos
});
