"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.success = void 0;
const success = function (req, res, message, status) {
    let statusCode = status || 200;
    let statusMessage = message || '';
    res.status(statusCode).send({
        error: false,
        status: status,
        body: statusMessage
    });
};
exports.success = success;
const error = function (req, res, message, status, details) {
    let statusCode = status || 500;
    let statusMessage = message || 'Internal Server Error';
    res.status(statusCode).send({
        error: true,
        status: statusCode,
        body: statusMessage,
    });
};
exports.error = error;
