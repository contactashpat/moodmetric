import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err.message, err.stack);

  // Default error response
  const errorResponse: ApiResponse = {
    success: false,
    error: 'Internal server error',
    message: err.message
  };

  // Handle specific error types
  if (err.name === 'ValidationError') {
    errorResponse.error = 'Validation failed';
    return res.status(400).json(errorResponse);
  }

  if (err.name === 'UnauthorizedError') {
    errorResponse.error = 'Unauthorized';
    return res.status(401).json(errorResponse);
  }

  if (err.name === 'ForbiddenError') {
    errorResponse.error = 'Forbidden';
    return res.status(403).json(errorResponse);
  }

  if (err.name === 'NotFoundError') {
    errorResponse.error = 'Resource not found';
    return res.status(404).json(errorResponse);
  }

  // Generic error response
  res.status(500).json(errorResponse);
}; 