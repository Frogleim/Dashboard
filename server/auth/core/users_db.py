import psycopg2
from pydantic import BaseModel
import bcrypt


class User(BaseModel):
    username: str
    password: str


def db_connect():
    conn = psycopg2.connect(host="localhost",
                            database="postgres",
                            user="postgres",
                            password="123456"
                            )

    return conn


def check_username(username):
    with db_connect() as conn:
        cursor = conn.cursor()
        cursor.execute(f"SELECT * FROM users WHERE username = '{username}'"),
        result = cursor.fetchone()
        if result is None:
            return False
        else:
            return True


def save_users(username, password):
    connection = db_connect()
    curs = connection.cursor()
    curs.execute("INSERT INTO users (username, password)"
                 " VALUES (%s, %s)",

                 (username, password))
    connection.commit()
    connection.close()
    print('Saved Successfully')


def get_marks(id):
    with db_connect() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT mark FROM users WHERE id=%s", (id, ))
        mark = cursor.fetchone()
        if not mark:
            return None
        return mark


def retrieve_user(username: str, password: str):
    with db_connect() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE username=%s AND password=%s", (username, password))
        user = cursor.fetchone()
        if not user:
            return None
        return User(username=user[0], password=user[1])

