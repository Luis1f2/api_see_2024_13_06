import { Router } from 'express';
import { handleWebhook } from '../controllers/webhookCotroller';

const router = Router();

router.post('/webhooks', handleWebhook);

export default router;
