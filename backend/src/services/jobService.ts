import { notifyClients } from './webSocketService';
import { Job } from '../models/db';
import { getRandomSplashImage } from './unsplashService';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const executeJobWithRetry = async (
  job: any,
  retries: number,
  delayMs: number
) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log('Executing job:', job.id);

      const result = await getRandomSplashImage();
      job.status = 'resolved';
      job.result = result;
      await Job.updateJob(job);
      notifyClients(job);
      console.log('Job execution completed:', job.id);
      return;
    } catch (error) {
      console.log(`Attempt ${attempt} failed:`);
      if (attempt < retries) {
        console.log(`Retrying job execution in ${delayMs / 1000} seconds...`);
        await delay(delayMs);
      } else {
        job.status = 'failed';
        await Job.updateJob(job);
        notifyClients(job);
        console.log('Job execution ultimately failed:', job.id);
      }
    }
  }
};

export const simulateJobExecution = async (job: any) => {
  const delay = Math.floor(Math.random() * 60 + 1) * 5000;
  console.log(`Simulating job execution for ${delay / 1000} seconds...`);
  setTimeout(() => {
    executeJobWithRetry(job, 3, 5000);
  }, delay);
};

export const completeUnresolvedJobs = async () => {
  const { jobs: unresolvedJobs } = await Job.getAllJobs({ status: 'pending' });
  console.log('Completing unresolved jobs:', unresolvedJobs.length);
  unresolvedJobs.forEach(simulateJobExecution);
};
