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
exports.getSupabase = exports.supabaseMiddleWare = exports.idContextSupabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
exports.idContextSupabase = "supabase-context";
const supabaseMiddleWare = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_KEY;
        if (!supabaseUrl || !supabaseKey) {
            res.status(500).send('Supabase URL or Key is not defined');
            return;
        }
        const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
        req[exports.idContextSupabase] = supabase;
        next();
    }
    catch (error) {
        res.json("Error al obtener la información de la organización");
        next(error);
    }
});
exports.supabaseMiddleWare = supabaseMiddleWare;
const getSupabase = (req) => {
    return req[exports.idContextSupabase];
};
exports.getSupabase = getSupabase;
