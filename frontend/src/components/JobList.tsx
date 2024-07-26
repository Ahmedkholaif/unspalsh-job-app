import React from 'react';
import { Job } from '../services/jobService';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link, Pagination } from '@mui/material';
import LazyImage from './Image';

interface JobListProps {
  jobs: Job[];
  totalPages: number;
  currentPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  handleGetJobDetails: (job: Job) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, totalPages, currentPage, onPageChange,handleGetJobDetails }) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Result</TableCell>
              <TableCell align='right'>Image</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.length > 0 ? jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.id}</TableCell>
                <TableCell>{job.status}</TableCell>
                <TableCell>
                  {job.result ? (
                    <Link href={job.result.urls?.full} target='_blank' rel='noopener'>
                      View
                    </Link>
                  ) : (
                    'N/A'
                  )}
                </TableCell>
                <TableCell align='right'>
                { job.result ? (
                    <LazyImage src={job.result.urls?.regular} alt={job.result.alt_description} />
                  ) :( 'Processing' )
                }
                </TableCell>
                {
                  job.status === 'pending' && (
                    <TableCell align='right'>
                      <Link href='#' onClick={() => handleGetJobDetails(job)}>
                        Refresh
                      </Link>
                    </TableCell>
                  )
                }
              </TableRow>
            )): (
              <TableRow>
                <TableCell colSpan={5} align='center'>
                  No Jobs Available
                </TableCell>
              </TableRow>
            )
            
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={totalPages} page={currentPage} onChange={onPageChange} />
    </>
  );
};

export default JobList;
