import { Router } from 'express';
import { createJob, getJobs, getJobById } from '../controllers/jobController';

const router = Router();

router.post('/', createJob);
router.get('/', getJobs);
router.get('/:id', getJobById);

export default router;
