import os
from sqlalchemy.ext.asyncio import create_async_engine,async_sessionmaker,AsyncSession
from dotenv import load_dotenv
from sqlalchemy.orm import declarative_base
load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:bhagya@localhost:5432/student_db"
)

if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+asyncpg://", 1)

if DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)

if "superbase.com" in DATABASE_URL:
    DATABASE_URL=DATABASE_URL.split("?")[0]
    engine=create_async_engine(DATABASE_URL,
    echo=False,connect_args={"ssl":"require"})
else:
    engine=create_async_engine(DATABASE_URL,
    echo=False)
SessionLocal=async_sessionmaker(autocommit=False,
autoflush=False,bind=engine,class_=AsyncSession)
Base=declarative_base()


async def get_db():
    async with SessionLocal() as db:
        try:
            yield db
        finally:
            await db.close()
