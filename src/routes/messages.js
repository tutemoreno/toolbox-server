import { Router } from 'express';
import { postMessage, getMessages } from '../services/messages.js';

const router = Router();

router.get('/messages', getMessages);

router.get('', postMessage);

export default router;
