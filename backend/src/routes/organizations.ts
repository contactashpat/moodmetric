import { Router, Request, Response } from 'express';
import { Organization, ApiResponse } from '../types';

const router = Router();

// GET /organizations - Get organization details
router.get('/', (req: Request, res: Response) => {
  try {
    // TODO: Fetch organization from database
    
    const response: ApiResponse = {
      success: true,
      data: {
        organization: {
          id: 'org-123',
          name: 'Example Org',
          plan: 'pro'
        }
      }
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch organization',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router; 