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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletedAndResignIds = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const deletedAndResignIds = (idToDelete) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.organization.delete({
            where: { id: idToDelete }
        });
        // Obtener todos los registros restantes ordenados
        const remainingRecords = yield prisma.organization.findMany({
            orderBy: { id: 'asc' }
        });
        // Reasignar los IDS
        const updatePromises = remainingRecords.map((record, index) => {
            const newId = index + 1;
            return prisma.organization.update({
                where: { id: record.id },
                data: { id: newId }
            });
        });
        yield Promise.all(updatePromises);
    }));
});
exports.deletedAndResignIds = deletedAndResignIds;
