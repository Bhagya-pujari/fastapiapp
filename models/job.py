from sqlalchemy import Column,Integer,String,Enum,ForeignKey,relationship
from models.company import company
# from sqlalchemy.orm import declarative_base
from database import Base,engine,SessionLocal


#Base=declarative_base()


    


class Job(Base):
    __tablename__="jobs"
    
    id=Column(Integer,primary_key=True,index=True)
    title=Column(String,nullable=False)
    description=Column(String)
    salary=Column(Integer)
    company_id=Column(Integer,Foreign_Key=True("companies.id"))
    company=relationship("company",back_populates="jobs")