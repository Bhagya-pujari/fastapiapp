from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from database import get_db
from models.job import Job
from schemas.job import JobCreate, JobUpdate, JobResponse
from utils.oauth2 import get_current_user, role_required

router = APIRouter(prefix="/job", tags=["Job"])


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=JobResponse)
async def create_job(job: JobCreate, db: AsyncSession = Depends(get_db), current_user=Depends(role_required(["admin"]))):
    new_job = Job(**job.model_dump())
    db.add(new_job)
    await db.commit()
    await db.refresh(new_job)
    return new_job


@router.get("/", status_code=status.HTTP_200_OK, response_model=list[JobResponse])
async def get_all_jobs(db: AsyncSession = Depends(get_db), current_user=Depends(get_current_user)):
    result = await db.execute(select(Job))
    return result.scalars().all()


@router.get("/{job_id}", status_code=status.HTTP_200_OK, response_model=JobResponse)
async def get_job(job_id: int, db: AsyncSession = Depends(get_db), current_user=Depends(get_current_user)):
    result = await db.execute(select(Job).filter(Job.id == job_id))
    job = result.scalars().first()

    if job is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")
    return job


@router.put("/{job_id}", status_code=status.HTTP_200_OK, response_model=JobResponse)
async def update_job(job_id: int, updated_job: JobUpdate, db: AsyncSession = Depends(get_db), current_user=Depends(role_required(["admin"]))):
    result = await db.execute(select(Job).filter(Job.id == job_id))
    job = result.scalars().first()

    if job is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")
    for key, value in updated_job.model_dump(exclude_unset=True).items():
        setattr(job, key, value)
    await db.commit()
    await db.refresh(job)
    return job


@router.delete("/{job_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_job(job_id: int, db: AsyncSession = Depends(get_db), current_user=Depends(role_required(["admin"]))):
    result = await db.execute(select(Job).filter(Job.id == job_id))
    job = result.scalars().first()

    if job is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")

    await db.delete(job)
    await db.commit()
    return
