from pydantic import BaseModel

class LoginModel(BaseModel):
    uid: str

class PortfolioAddModel(BaseModel):
    tickers: list[str]

class PortfolioDeleteModel(BaseModel):
    tickers: list[str]