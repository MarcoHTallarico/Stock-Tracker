from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

database_uri = f'mongodb+srv://jovanml:5GNUI20roWbEoxQH@cluster0.yhyfojs.mongodb.net/?retryWrites=true&w=majority'

class DBConnection:
    __client = None

    def __init__(self):
        if DBConnection.__client is not None:
            raise Exception("This class is a singleton")
        
        DBConnection.__client = MongoClient(database_uri)

    @staticmethod
    def get_instance():
        return DBConnection.__client
    
    @staticmethod
    def test_connection():
        try:
            DBConnection.__client.admin.command('ping')
            print("Database connection is successful")
        except Exception as e:
            print(e)
