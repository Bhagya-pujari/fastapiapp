import os
from dotenv import load_dotenv

from sqlalchemy.orm import declarative_base
from sqlalchemy.ext.asyncio import (
    create_async_engine,
    async_sessionmaker,
    AsyncSession,
)

load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+asyncpg://postgres:bhagya@localhost:5432/student_db"
)

# Convert old postgres:// URL to asyncpg
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace(
        "postgres://",
        "postgresql+asyncpg://",
        1
    )

# Convert normal PostgreSQL URL to asyncpg
if DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace(
        "postgresql://",
        "postgresql+asyncpg://",
        1
    )

# Convert sslmode=require to ssl=require for asyncpg
DATABASE_URL = DATABASE_URL.replace(
    "sslmode=require",
    "ssl=require"
)

# Create async engine
engine = create_async_engine(
    DATABASE_URL,
    echo=False,
)

# Create async session
SessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    autoflush=False,
    autocommit=False,
)

Base = declarative_base()


async def get_db():
    async with SessionLocal() as db:
        try:
            yield db
        finally:
            await db.close()