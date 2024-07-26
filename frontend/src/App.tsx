import React from 'react';
// import { Job } from './services/jobService';
// import { fetchJobs, createJob } from './services/jobService';
// import { initWebSocket } from './services/websocketService';

import { Container } from '@mui/material';
import JobPage from './pages/jobsPage';

const App: React.FC = () => {
  return (
    <Container>
      <JobPage />
    </Container>
  );
};

export default App;
