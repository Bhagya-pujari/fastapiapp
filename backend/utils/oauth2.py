from fastapi.security import OAuth2PasswordBearer
from backend.database import get_db
from sqlalchemy.orm import Session
from sqlalchemy import text
from fastapi import Depends, HTTPException
from backend.utils.token import verify_token




oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    # Logic to decode the token and retrieve the current user from the database
    # This is a placeholder implementation; you would replace it with your actual logic
    current_user=verify_token(token)
    if  current_user is None:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    return current_user



def role_required(roles: list):
    def role_decorator(current_user=Depends(get_current_user)):
        if current_user.role not in roles:
            raise HTTPException(status_code=403, detail="access denied")
        return current_user
    return role_decorator

 


