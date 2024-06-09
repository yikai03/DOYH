import ast
import base64
import json
import PyPDF2
from fastapi import FastAPI, File, Form
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import tagGenerationAI as tagGenerationAI
from fastapi import UploadFile
import summarizationAI as summarizationAI

app = FastAPI()

origins = ["http://localhost:3000"]  # Assuming your frontend app runs on localhost:3000


# Add CORSMiddleware to the application
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows specified origins
    allow_credentials=True,  # Allows cookies to be included in cross-origin HTTP requests
    allow_methods=["*"],  # Allows all methods (e.g., GET, POST, PUT, DELETE)
    allow_headers=["*"],  # Allows all headers
)


@app.get("/")
async def read_root():
    return {"Hello": "World"}

#___________________Data Storage____________________
def storeMentorData(id: str, name: str, entitle: str, description: str, tags: str,image: str):
    # Process the image here
    toStoreMentorData={
        "id": id,
        "name": name,
        "entitle": entitle,
        "description": description,
        "tags": tags,
        "image": image
    }

    with open('mentorData.json', 'r') as file:
        data = json.load(file)
        data.append(toStoreMentorData)
    with open('mentorData.json', 'w') as file:
        json.dump(data, file)



#___________________Data Retrieval____________________
def getMentorData():
    with open('mentorData.json', 'r') as file:
        data = json.load(file)
    return data


#___________________PDF Parsing____________________
def formatResumeIntoJson(resumeFile):
    if resumeFile.filename.endswith(".pdf"):  # Check if the uploaded file is a PDF
        # Read the uploaded PDF file as binary data
        pdfData = resumeFile.file.read()
        
        return pdfData

def convertBinaryToPdf(data):
    filename = f'resume/resume_out/resume_live.pdf'
    with open(filename, 'wb') as f:
        f.write(data)
        
    return filename

# Extract text from PDFs
def extractTextFromPDF(pdfBinary):
    pdfReader = PyPDF2.PdfReader(pdfBinary)
    text = ""
    for page in pdfReader.pages:
        text += page.extract_text()
    return text

#___________________Tagging AI____________________
def generateTag(text: str):
    response = tagGenerationAI.main(text)
    return response

#___________________Summarization AI____________________
def generateSummary(text: str, wordCount: int):
    response = summarizationAI.main(text, wordCount)
    return response

#___________________API Endpoints____________________
@app.post("/generate-mentor")
async def generate_mentor(
    resume: UploadFile = File(...),
    image: UploadFile = File(...),
    id: str = Form(...),
    name: str = Form(...),
    entitle: str = Form(...)
):
    # Ensure that the uploaded file is a PDF
    print("Received and processing resume...")

    # Read the uploaded file as binary data
    resume_content = await resume.read()
    image_content = await image.read()
    
    # Convert the binary data to a PDF file
    pdf = convertBinaryToPdf(resume_content)

    # Extract text from the PDF
    text = extractTextFromPDF(pdf)
    
    # Generate tags
    response = generateTag(text)

    tags = ast.literal_eval(response.strip())

    # Generate summary
    description = generateSummary(text, 200)

    # Decode the image to base64
    decoded_image = base64.b64encode(image_content).decode('utf-8')
    
    # Store data
    storeMentorData(id=id, name=name, entitle=entitle, description=description, tags=tags, image=decoded_image)
    
    return {"tag": response}


@app.post ("/mentorship-matching-request")
async def mentorship_matching_request(
    businessPlan: UploadFile = File(...),
    mentorRequest: str = Form(...)
):
    # Ensure that the uploaded file is a PDF
    print("Received and processing resume.........")

    # Read the uploaded file as binary data
    businessPlanContent = await businessPlan.read()
    
    print("businessPlanContent", businessPlanContent)

    # Convert the binary data to a PDF file
    pdf = convertBinaryToPdf(businessPlanContent)

    # Extract text from the PDF
    text = extractTextFromPDF(pdf)
    
    # Generate tags
    response = generateTag(mentorRequest)

    tags = ast.literal_eval(response.strip())
    
    print("Tags", tags)

    # Generate summary
    businessPlanDescription = generateSummary(text, 100)

    # Mentor matching
    matching_mentors = mentorMatching(tags)
    
    print("Matching Mentors ", matching_mentors)
    
    with open('matchingMentor.json', 'w') as file:
        json.dump(matching_mentors, file)
        
    toStoreMenteeData = {
        "tags": tags,
        "description": businessPlanDescription
    }
    
    print("toStoreMenteeData", toStoreMenteeData)
    
    with open('menteeInfo.json', 'w') as file:
        json.dump(toStoreMenteeData, file)

    return {"tag": tags, "description": businessPlanDescription}


@app.get("/matching-mentors-data")
async def get_matching_mentors_data():
    with open('matchingMentor.json', 'r') as file:
        data = json.load(file)
    return data


@app.get("/mentor-data")
async def get_mentor_data():
    data = getMentorData()
    
    return data


def mentorMatching(tagOfUserRequest):
    data = getMentorData()
    matching_mentors = []

    for mentor in data:
        if any(tag in mentor['tags'] for tag in tagOfUserRequest):
            matching_mentors.append(mentor)
    
    return matching_mentors if matching_mentors else "No mentor found"

