# Stock Tracker

Stock Projections Tracker Web Application for viewing and managing portfolio investments.

## Getting Started

### Prerequisites

1. [node](https://nodejs.org/en/download)
2. [python3](https://www.python.org/downloads/)

### Frontend
 
1. `cd client` to open the frontend client directory
2. Install requirements `npm install`
3. To start app in dev mode, run: `npm run dev`
4. **Note**: Frontend will not be able to authenticate without backend running

### Backend

1. `cd server` to open the backend server directory
2. Create a virtual environment with the command `python3 -m venv venv`
3. Start virtual environment\
    Mac: `source ./venv/bin/activate`\
    Windows: `.venv\Scripts\activate`
4. Install requirements `pip install -r requirements.txt`
5. Start server using `uvicorn api.main:app --reload`

