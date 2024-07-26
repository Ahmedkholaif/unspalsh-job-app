import { Request, Response } from 'express';
import { Job } from '../models/db';
import { simulateJobExecution } from '../services/jobService';
import { randomUUID } from 'crypto';

export const createJob = async (req: Request, res: Response) => {
  try {
    const newJob = {
      id: randomUUID(),
      status: 'pending',
      result: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await Job.addJob(newJob);
    simulateJobExecution(newJob);

    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getJobs = async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.query;
    const jobs = await Job.getAllJobs({}, Number(limit), Number(page));
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getJobById = async (req: Request, res: Response) => {
  try {
    const job = Job.getJobById(Number(req.params.id));
    if (job) {
      res.status(200).json(job);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
