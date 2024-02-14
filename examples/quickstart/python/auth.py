from passlib.hash import bcrypt
import json
from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone
from models import User, Credentials

# to get a string like this run:
# openssl rand -hex 32
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

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
    
def create_access_token(data: dict, expires_delta: timedelta = ACCESS_TOKEN_EXPIRE_MINUTES):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=expires_delta)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt