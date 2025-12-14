import { HTTP_STATUS } from "../constants/httpStatus.js";
import { ERROR_MESSAGES } from "../constants/messages.js";

export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let message = err.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR;
  let errors = null;

  if (err.name === "ValidationError") {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    message = ERROR_MESSAGES.VALIDATION_ERROR;
  }

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    const field = Object.keys(err.keyValue)[0];
    message = ERROR_MESSAGES.DUPLICATE_VALUE(field);
  }

  // Mongoose Cast Error (Invalid ObjectId)
  if (err.name === "CastError") {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = ERROR_MESSAGES.INVALID_FIELD(err.path, err.value);
  }

  // Response
  res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};

export const notFound = (req, res, next) => {
  const error = new AppError(
    ERROR_MESSAGES.ROUTE_NOT_FOUND(req.originalUrl),
    HTTP_STATUS.NOT_FOUND
  );
  next(error);
};
