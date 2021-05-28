import { Router } from 'express';
import messagesRouter from './messages';

const router = Router();

router.use('/iecho', messagesRouter);

export default router;
