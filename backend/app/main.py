from fastapi import FastAPI
from backend.routers import company,job,auth
from backend.database import Base,engine
from backend.models import company as company_model,job as job_model,users as user_model
from fastapi.middleware.cors import CORSMiddleware

app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
print(engine)
Base.metadata.create_all(bind=engine)
app.include_router(auth.router)
app.include_router(company.router)
app.include_router(job.router)

@app.get("/")
def read_root():
    return {"hello":"world"}
@app.get("/about")
def read_about():
    return {"about":"this is about page"}

@app.get("/contact")
def read_contact():
    return {"contact":"this is contact page"}