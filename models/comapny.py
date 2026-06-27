from sqlalchemy import Column,Integer,String,Enum,realationship
#from sqlalchemy.orm import declarative_base
from database import Base,engine,SessionLocal


#Base=declarative_base()
class Company(Base):
    __tablename__="companies"
    id=Column(Integer,primary_key=True,index=True)
    name=Column(String,nullable=False,index=True)
    email=Column(String,unioque=True)
    phone=Column(String,unique=True)
    jobs=realationship("job",back_populates="company")
   