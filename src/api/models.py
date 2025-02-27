from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Integer,String, Boolean, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(Integer,primary_key=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(255),nullable=False)
    created_at: Mapped[DateTime] = mapped_column(DateTime, server_default=func.now())
    update_at: Mapped[DateTime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "created_at": self.created_at,
            "update_at": self.update_at
            # do not serialize the password, its a security breach
        }