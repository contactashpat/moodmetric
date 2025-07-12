import { Router, Request, Response } from 'express';
import { MetricsData, ApiResponse, SubmitMetricsRequest } from '../types';

const router = Router();

// POST /metrics - Submit metrics data
router.post('/', (req: Request, res: Response) => {
  try {
    const { sessionId, metrics }: SubmitMetricsRequest = req.body;
    
    // TODO: Validate metrics data
    if (!sessionId || !metrics) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: sessionId and metrics'
      });
    }

    // TODO: Store in database
    // TODO: Process for analytics
    
    const response: ApiResponse = {
      success: true,
      data: { sessionId, received: true },
      message: 'Metrics received successfully'
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Invalid metrics data',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /metrics/:sessionId - Get metrics for a session
router.get('/:sessionId', (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    
    // TODO: Fetch metrics from database
    
    const response: ApiResponse = {
      success: true,
      data: {
        sessionId,
        metrics: [] // TODO: Return actual metrics
      }
    };

    res.json(response);
  } catch (error) {
    res.status(404).json({
      success: false,
      error: 'Session not found',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router; 