// src/middleware/errorHandler.js
export class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = true;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';
    let errors = null;
  
    // Mongoose Validation Error
    if (err.name === 'ValidationError') {
      statusCode = 400;
      errors = Object.values(err.errors).map(e => ({
        field: e.path,
        message: e.message
      }));
      message = 'Validation Error';
    }
  
    // Mongoose Duplicate Key Error
    if (err.code === 11000) {
      statusCode = 400;
      const field = Object.keys(err.keyValue)[0];
      message = `Duplicate value for ${field}`;
    }
  
    // Mongoose Cast Error (Invalid ObjectId)
    if (err.name === 'CastError') {
      statusCode = 400;
      message = `Invalid ${err.path}: ${err.value}`;
    }
  
    // Response
    res.status(statusCode).json({
      success: false,
      message,
      ...(errors && { errors }),
      ...(process.env.NODE_ENV === 'development' && { 
        stack: err.stack 
      })
    });
  };
  
  export const notFound = (req, res, next) => {
    const error = new AppError(`Route ${req.originalUrl} not found`, 404);
    next(error);
  };
  