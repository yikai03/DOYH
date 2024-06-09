# System Setup

## Backend

1. Create an empty folder
2. git init
3. git clone https://github.com/yikai03/DOYH.git
4. cd backend
5. pip/pip3 install -r requirements.txt
6. run "uvicorn server:app" in terminal

## Frontend
1. create new terminal (Ctrl+Shift+`)
1. cd frontend
2. npm install
3. npm run dev

> [!IMPORTANT]
> Ensure both frontend and backend is running.

# Our System
## Challenge 2: Startup (Mentorship Matching)

Our system using Gemini-1.5-flash model from Google to provide functionality and mentorship matching as a core. By utilising Gemini-1.5-flash model API, mentee (people who planning for start-up) will be able to get a tag and so do mentor. Both parties, mentee and mentor will be able to get a summarization of their information.

### Mentee

**Problem**

1. Low efficiency for finding suitable mentor due to large volume of mentor profile
2. Need time to research for a specific mentor to be able to know if the mentor is suit for him

**Solution**
1. Using Gemini to provide a tag based on mentee's requirement 
2. Use the tag to perform matching with mentor

3. Provide a summarized version of business plan of mentee 


### Mentor

**Problem**
1. Low efficiecy in reading each mentee business plan

**Solution** 
1. Based on mentor's information, provide a tag from Gemini to be able to match with mentee
2. Based on mentor's information, provide a summarized version of mentor's story 




