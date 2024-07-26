import fs from 'fs-extra';
import path from 'path';

const dataDir = path.join(__dirname, '../..', 'data');

const jobsFilePath = path.join(dataDir, 'jobs.json');

if (!fs.existsSync(jobsFilePath)) {
  fs.ensureFileSync(jobsFilePath);
  fs.writeJsonSync(jobsFilePath, []);
}


let isWritingInProgress = false;

const acquireLock = async () => {
  while (isWritingInProgress) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  console.log('Waiting for lock...');
  }

  console.log('Lock acquired');
  isWritingInProgress = true;
};

const releaseLock = () => {
  console.log('Lock released');
  isWritingInProgress = false;
};

export const writeToJobsFile = async (jobs: any[]) => {
  try {
    await acquireLock();
    await fs.writeJson(jobsFilePath, jobs);
    releaseLock();
  } catch (error) {
    releaseLock();
    console.error('Error writing jobs file:', error);
  }
}

export const readJobsFile = async () => {
  try {
    await acquireLock();
    const jobs = await fs.readJson(jobsFilePath);
    releaseLock();
    return jobs;
  } catch (error) {
    releaseLock();
    console.error('Error reading jobs file:', error);
    return [];
  }
}

export const getAllJobs = async (
  filter?: Record<string, string>,
  limit?: number,
  page?: number
): Promise<{
  jobs: any[];
  count: number;
}> => {
  try {
    
    let allRecords = await readJobsFile();
    let count = allRecords.length;
    if (filter) {
      allRecords = allRecords.filter((record: any) =>
        Object.entries(filter).every(([key, value]) => record[key] === value)
      );
      count = allRecords.length;
    }

    if (limit && page) {
      allRecords = allRecords.slice((page - 1) * limit, page * limit);
    }

    return {
      jobs: allRecords,
      count,
    };
  } catch (error) {
    console.error('Error reading jobs file:', error);
    return { jobs: [], count: 0 };
  }
};

export const addJob = async (job: any) => {
  try {
    let jobs  = await readJobsFile();

    jobs = [job, ...jobs];

    await writeToJobsFile(jobs);
  } catch (error) {
    console.error('Error writing jobs file:', error);
  }
};

export const updateJob = async (job: any) => {
  try {
    const jobs = await readJobsFile();

    const jobIndex = jobs.findIndex((j: any) => j.id === job.id);

    jobs[jobIndex] = { ...job, updatedAt: new Date() };

    await writeToJobsFile(jobs);

  } catch (error) {
    console.error('Error updating jobs file:', error);
  }
};

export const deleteJob = async (jobId: number) => {
  try {
    const jobs  = await readJobsFile();

    const filteredJobs = jobs.filter((j: any) => j.id !== jobId);

        await writeToJobsFile(filteredJobs);

  } catch (error) {
    console.error('Error deleting job from file:', error);
  }
};

export const getJobById = async (jobId: number) => {
  try {
    const jobs = await readJobsFile();

    return jobs.find((j: any) => j.id === jobId);
  } catch (error) {
    console.error('Error getting job by id:', error);
  }
};
