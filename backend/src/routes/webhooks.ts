import { Router, Request, Response } from 'express';
import { WebhookSubscription, ApiResponse } from '../types';

const router = Router();

// GET /webhooks - List webhooks
router.get('/', (req: Request, res: Response) => {
  try {
    // TODO: Fetch webhooks from database
    
    const response: ApiResponse = {
      success: true,
      data: {
        webhooks: []
      }
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch webhooks',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// POST /webhooks - Create webhook
router.post('/', (req: Request, res: Response) => {
  try {
    const { url, events } = req.body;
    
    if (!url || !events) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: url and events'
      });
    }

    // TODO: Validate webhook data
    // TODO: Store in database
    
    const response: ApiResponse = {
      success: true,
      data: {
        webhook: {
          id: 'webhook-123',
          url,
          events
        }
      },
      message: 'Webhook created successfully'
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Invalid webhook data',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router; 