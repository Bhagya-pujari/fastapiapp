from fastapi import APIRouter,HTTPException,Depends,status
from schemas.company import CompanyCreate, CompanyUpdate, CompanyResponse
from models.company import Company
from sqlalchemy.orm import Session
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from database import get_db,SessionLocal
from utils.oauth2 import role_required,get_current_user
router = APIRouter(prefix="/company",tags=["company"])

@router.post("/",status_code=status.HTTP_201_CREATED,response_model=CompanyResponse)
async def create_company(company: CompanyCreate,db:AsyncSession=Depends(get_db),current_user=Depends(role_required(["admin"]))):
    try:
        db_company=Company(**company.dict())
        db.add(db_company)
        db.commit()
        db.refresh(db_company)
        return db_company
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail=f"Database error during company creation: {str(e)}")


@router.get("/",status_code=status.HTTP_200_OK,response_model=list[CompanyResponse])
async def get_all_company(db:AsyncSession=Depends(get_db),current_user=Depends(get_current_user)):
    try:
        result=await db.execute(select(Company))
        companies=result.scalars().all()
        return companies
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail=f"Database error during fetching companies: {str(e)}")

@router.get("/{company_id}",status_code=status.HTTP_200_OK,response_model=CompanyResponse)
async def get_company(company_id: int,db:AsyncSession=Depends(get_db),current_user=Depends(get_current_user)):
    try:
        result=await db.execute(select(Company).filter(Company.id==company_id))
        company=result.scalars().first()
        if not company:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Company not found")
        return company
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,detail=f"Database error during fetching company: {str(e)}")
      

@router.put("/{company_id}",status_code=status.HTTP_201_CREATED)
def update_company(company_id: int, company: CompanyUpdate,db:Session=Depends(get_db),current_user=Depends(role_required(["admin"]))):
    db_company = db.query(Company).filter(Company.id == company_id).first()
    if not db_company:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Company not found")
    for key, value in company.dict().items():
        setattr(db_company, key, value)
    db.commit()
    db.refresh(db_company)
    return db_company

@router.delete("/{company_id}",status_code=status.HTTP_204_NO_CONTENT)
def delete_company(company_id: int,db:Session=Depends(get_db),current_user=Depends(role_required(["admin"]))):
    db_company = db.query(Company).filter(Company.id == company_id).first()
    if not db_company:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Company not found")
    db.delete(db_company)
    db.commit()
    return {"message": "Company deleted successfully"}

# @router.get("/")
# def read_company():
#     return {"company": "Company root"}

# @router.get("/{company_id}")
# def read_company(company_id: int):
#     return {"company_id": company_id}