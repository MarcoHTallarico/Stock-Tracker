from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from api.services.db import DBConnection
from api.models.models import LoginModel, PortfolioAddModel, PortfolioDeleteModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    DBConnection()
    DBConnection.test_connection()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/login")
def login(body: LoginModel):
    uid = body.uid
    if len(uid) == 0:
        raise HTTPException(status_code=400, detail="Invalid id")
    
    db_client = DBConnection.get_instance()
    db = db_client["stock_tracker"]
    users_col = db["users"]

    user = users_col.find_one({ "id": uid }, {'_id': 0})
    if user:
        return { "user": user}
    
    new_user = { "id": uid, "portfolio": [] }
    users_col.insert_one(new_user)
    del new_user["_id"]
    return { "msg": "new user created", "user": new_user }

@app.get("/users/{uid}/portfolio")
def get_portfolio(uid: str):
    db_client = DBConnection.get_instance()
    db = db_client["stock_tracker"]
    users_col = db["users"]

    user = users_col.find_one({ "id": uid }, {'_id': 0})
    if (user is None):
        raise HTTPException(status_code=400, detail="Invalid user")
    
    return { "portfolio": user["portfolio"] }

@app.post("/users/{uid}/portfolio")
def add_portfolio(uid: str, body: PortfolioAddModel):
    tickers = body.tickers
    db_client = DBConnection.get_instance()
    db = db_client["stock_tracker"]
    users_col = db["users"]

    user = users_col.find_one({ "id": uid }, {'_id': 0})
    if (user is None):
        raise HTTPException(status_code=400, detail="Invalid user")
    
    updated_portfolio = list(set(user["portfolio"] + tickers))
    users_col.update_one({ "id": uid }, { "$set": { "portfolio": updated_portfolio } })
    return { "user": users_col.find_one({ "id": uid }, {'_id': 0}) }

@app.post("/users/{uid}/portfolio/delete")
def delete_portfolio(uid: str, body: PortfolioDeleteModel):
    tickers = body.tickers
    db_client = DBConnection.get_instance()
    db = db_client["stock_tracker"]
    users_col = db["users"]

    user = users_col.find_one({ "id": uid }, {'_id': 0})
    if (user is None):
        raise HTTPException(status_code=400, detail="Invalid user")
    
    updated_portfolio = list(set(user["portfolio"]) - set(tickers))
    users_col.update_one({ "id": uid }, { "$set": { "portfolio": updated_portfolio } })
    return { "user": users_col.find_one({ "id": uid }, {'_id': 0}) }

@app.get("/users/{uid}/portfolio/{ticker}")
def in_portfolio(uid: str, ticker: str):
    db_client = DBConnection.get_instance()
    db = db_client["stock_tracker"]
    users_col = db["users"]

    user = users_col.find_one({ "id": uid }, {'_id': 0})
    if (user is None):
        raise HTTPException(status_code=400, detail="Invalid user")
    
    if (ticker in user["portfolio"]):
        return { "in_portfolio": True}
    
    return { "in_portfolio": False}