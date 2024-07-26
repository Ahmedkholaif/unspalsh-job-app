import React from 'react';
import { Button, Box } from '@mui/material';

interface AddJobFormProps {
  onCreateJob: () => Promise<void>;
}

const AddJobForm: React.FC<AddJobFormProps> = ({ onCreateJob }) => {
  const [isDisabled, setDisabled] = React.useState(false);
  
  const handleCreateJob = async() => {
    setDisabled(true);
    await onCreateJob();
    setDisabled(false);
  };

  return (
    <Box display='flex' alignItems='center' gap={2}>
      <Button onClick={handleCreateJob} variant='contained' color='primary' disabled={isDisabled}>
        Create Job
      </Button>
    </Box>
  );
};

export default AddJobForm;
