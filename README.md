# Job Management Application

This is a full-stack job management application that allows users to create and monitor jobs. The jobs simulate delayed execution by retrieving random Unsplash images from the food category.

## Features

- Create new jobs
- Display a list of jobs with their status
- Fetch and display the results of a job as soon as it's resolved
- Persist job data in a file

## Tech Stack

- Backend: Node.js, Express, WebSocket, fs-extra
- Frontend: React, Axios, Material-UI
- File Storage: JSON


## Getting Started

### Clone the Repository

```bash
git clone https://github.com/Ahmedkholaif/unspalsh-job-app.git

cd unspalsh-job-app
```

### Install Dependencies

```bash
cd frontend
npm install
cd ../backend
npm install
```
### Generate Unsplash API Key

1. Create an account on [Unsplash](https://unsplash.com/developers).
2. Create a new application to get an access key.
3. Copy the access key and replace the placeholder in the `backend/.env` file.

```bash
cd backend
cp .env.example .env
```


### Start the Application

```bash
cd frontend
npm start
cd ../backend
npm start 

# for dev mode
npm run dev
```

The frontend will be running on [http://localhost:3000](http://localhost:3000) and the backend on [http://localhost:8080](http://localhost:8080).


## Time Report

- Design & basic setup: 1 hour
- Backend: 1.5 hours
- Frontend: 1 hours
- Testing: 30 minutes
- Final Review & Enhancements: 1 hour
- Documentation: 20 minutes

- Total: ~5 hours



## Possible Enhancements

1. Queuing
   Implement a job queue to manage job execution more efficiently.
   Use a library like Bull or RMQ to handle job queuing.
2. Refreshing/Acknowledge
    Use WebSocket events to acknowledge the receipt of job status updates.

