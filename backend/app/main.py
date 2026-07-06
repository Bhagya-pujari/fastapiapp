from fastapi import FastAPI
from routers import company, job, auth, chat, rag
from database import Base, engine
from models import company as company_model
from models import job as job_model
from models import users as user_model
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print(engine)

# Create tables (uncomment if needed)
# Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(auth.router)
app.include_router(company.router)
app.include_router(job.router)
app.include_router(chat.router)
app.include_router(rag.router)

@app.get("/")
def read_root():
    return {"hello": "world"}

@app.get("/about")
def read_about():
    return {"about": "this is about page"}

@app.get("/contact")
def read_contact():
    return {"contact": "this is contact page"}