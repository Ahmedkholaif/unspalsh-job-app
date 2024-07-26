import axiosInstance from './apiV1Instance';

export interface Job {
  id: string;
  status: string;
  result: any | null;
  title?: string;
}

export const fetchJobs = async (page?: number, limit?:number) => {
  const response = await axiosInstance.get(`/jobs`, {
    params: { page, limit }
  });

  return {
    jobs: response.data.jobs,
    count: response.data.count,
  };
};

export const createJob = async (): Promise<Job> => {
  const response = await axiosInstance.post('/jobs');
  return response.data;
};

export const getJobDetails = async (taskId:string): Promise<Job> => {
  const response = await axiosInstance.get(`/jobs/${taskId}`);
  return response.data;
};
