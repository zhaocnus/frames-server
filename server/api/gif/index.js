import { Router } from 'express';
import * as controller from './gif.controller';

const router = Router();

// create new gif
router.post('/', controller.create);

export default router


