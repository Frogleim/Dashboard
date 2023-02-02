import datetime
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends, HTTPException, File, UploadFile, Header
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from pydantic import BaseModel
import secrets
from core import users_db
import base64

from users_auth import secure, verify_password, generate_token
from fastapi_socketio import SocketManager

app = FastAPI()



class UsersData(BaseModel):
    id: str


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/login")
async def login(body: users_db.User):
    user = users_db.retrieve_user(body.username, body.password)
    if not user:
        raise HTTPException(status_code=400, detail="Invalid username or password")

    access_token = generate_token({'sub': user.username})
    return {"access_token": access_token, "token_type": "bearer", "user": user.username}


@app.post("/register")
async def register(username: str, password: str):
    check_user = users_db.check_username(username)
    if check_user:
        raise HTTPException(status_code=400, detail="Username already exist")

    users_db.save_users(username, password)
    return {"Message": "Sign Up Successfully"}


@app.get("/read_marks")
async def get_marks(id, auth: str = Header(None)):
    if auth is None:
        raise HTTPException(status_code=400, detail=f"Unauthorized {auth}")
    # uid = body.id
    get_marks = users_db.get_marks(int(id))
    if not get_marks:
        raise HTTPException(status_code=400, detail="No mark for user")
    return {
        "mark": get_marks
    }
