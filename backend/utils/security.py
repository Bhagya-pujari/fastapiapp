from passlib.context import CryptContext

pwd_content=CryptContext(schemes=["bcrypt"],deprecated="auto")

def hash_password(password:str):
    return pwd_content.hash(password)

def verify_password(password:str,hashed_password:str):
    return pwd_content.verify(password,hashed_password)

def get_password_hash(password:str):
    return pwd_content.hash(password)