"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const organization_routes_1 = __importDefault(require("./routes/organization.routes"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = require("./middleware/errorHandler");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./swagger/swagger"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3005;
// Configuracion del rate limit
const limitRateMinites = 10;
const requestLimit = 10;
// const limiter = rateLimit({
//   windowMs: limitRateMinites * 60 * 1000, // 15 minutos
//   max: requestLimit, // Límite de 100 solicitudes por ventana por IP
//   standardHeaders: true, // Devolver info en los headers 'RateLimit-*'
//   legacyHeaders: false, // Deshabilitar los headers 'X-RateLimit-*'
//   message: 'Demasiadas solicitudes desde esta IP, por favor intente de nuevo después de 15 minutos'
// })
// app.use(limiter);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
app.use("/api/organization", organization_routes_1.default);
app.use(errorHandler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`Server started on: http://localhost:${PORT}`);
    console.log(`Docs📃 started on: http://localhost:${PORT}/api-docs`);
});
