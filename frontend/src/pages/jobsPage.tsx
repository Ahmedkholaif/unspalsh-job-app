import React, { useEffect, useState } from 'react';
import {
  Job,
  fetchJobs,
  createJob,
  getJobDetails,
} from '../services/jobService';
import { initWebSocket } from '../services/websocketService';
import { Container, Typography, Box } from '@mui/material';
import JobList from '../components/JobList';
import AddJobForm from '../components/AddJob';

const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const PAGE_SIZE: number = 0; // Set to 0 to disable pagination
  const loadJobs = async (page: number) => {
    setLoading(true);
    try {
      const { jobs, count } = await fetchJobs(
        page,
        PAGE_SIZE === 0 ? undefined : PAGE_SIZE
      );
      setJobs(jobs);
      setTotalPages(PAGE_SIZE === 0 ? 1 : Math.ceil(count / PAGE_SIZE));
    } catch (error) {
      console.error('Failed to fetch jobs', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs(page);
    initWebSocket((job: Job) => {
      setJobs((prevJobs) => prevJobs.map((j) => (j.id === job.id ? job : j)));
    });
  }, [page]);

  const handleCreateJob = async () => {
    await createJob();
    if (page === 1) {
      loadJobs(1);
    } else {
      setPage(1);
    }
  };

  const handleUpdateJob = async (job: Job) => {
    setJobs((prevJobs) => prevJobs.map((j) => (j.id === job.id ? job : j)));
  };

  const handleGetJobDetails = async (job: Job) => {
    const updatedJob = await getJobDetails(job.id);
    handleUpdateJob(updatedJob);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <Container>
      <Typography variant='h4' gutterBottom>
        Job List
      </Typography>
      <Box mb={2}>
        <AddJobForm onCreateJob={handleCreateJob} />
      </Box>
      <JobList
        jobs={jobs}
        totalPages={totalPages}
        currentPage={page}
        onPageChange={handlePageChange}
        handleGetJobDetails={handleGetJobDetails}
      />
    </Container>
  );
};

export default Jobs;
