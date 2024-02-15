from passlib.hash import bcrypt
import json
from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone
from fastapi import HTTPException, status
import logging
import os
from dotenv import load_dotenv
load_dotenv()
from models import User, Credentials

SECRET_KEY = os.environ.get("SECRET_KEY")
ALGORITHM = os.environ.get("ALGORITHM" , "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = os.environ.get("ACCESS_TOKEN_EXPIRE_MINUTES" , 30)

logger = logging.getLogger(__name__)

#TODO: replace the two queries with a join
def authenticated_user(email: str, password: str, session):
    user: User = session.query(User).filter(User.email == email).first()
    if user:
        credentials: Credentials = session.query(Credentials).where(Credentials.user_id == user.id).where(Credentials.method == 'PASSWORD').first()
        if credentials:
            payload = json.loads(json.dumps(credentials.payload))
            if bcrypt.verify(password, payload['hash']):
                return user
    return False
    
def create_access_token(user: User, expires_delta: timedelta = int(ACCESS_TOKEN_EXPIRE_MINUTES)):
    data = { "sub": str(user.id), "email": user.email}
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=expires_delta)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# If the token is missing or invalid, it will return None. Caller will decide what to do with it.
def get_user_id_from_valid_token(token: str):
    logger.debug(f"Token: {token}")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        logger.debug(f"Payload: {payload}") 
        user_id: str = payload.get("sub")
        return user_id
    except Exception as e:
        logger.error(f"Error validating token: {e}")
        return None
