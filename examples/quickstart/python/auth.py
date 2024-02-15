from passlib.hash import bcrypt
import json
from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone
from fastapi import HTTPException, status
import logging
from models import User, Credentials

# TODO: move to environment variable
# to get a string like this run:
# openssl rand -hex 32
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

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
    
def create_access_token(user: User, expires_delta: timedelta = ACCESS_TOKEN_EXPIRE_MINUTES):
    data = { "sub": str(user.id), "email": user.email}
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=expires_delta)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# If the token is missing or invalid, it will return None
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
