import { Router, Request, Response } from 'express';
import { User, ApiResponse } from '../types';

const router = Router();

// GET /users - List users
router.get('/', (req: Request, res: Response) => {
  try {
    // TODO: Fetch users from database
    
    const response: ApiResponse = {
      success: true,
      data: {
        users: []
      }
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch users',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router; 