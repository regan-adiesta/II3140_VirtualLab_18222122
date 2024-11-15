# from flask import Flask , render_template, url_for, redirect
# from flask_sqlalchemy import SQLAlchemy
# from flask_login import UserMixin 
# from flask_wtf import FlaskForm
# from wtforms import StringField, PasswordField, SubmitField
# from wtforms.validators import InputRequired, Length, ValidationError
# from flask_bcrypt import Bcrypt
# from werkzeug.security import generate_password_hash, check_password_hash

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
# app.config['SECRET_KEY'] = 'thisisnotasecretkey' 

# bycrpt = Bcrypt(app)
# db = SQLAlchemy(app)

# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(20), nullable=False, unique=True)
#     # email = db.Column(db.String(150), nullable=False, unique=True)
#     password = db.Column(db.String(80), nullable=False)

#     def set_pass(self, password):
#         self.password_hash = generate_password_hash(password)

#     def check_pass(self, password):
#         return check_password_hash(self.password_hash, password)
    
# class Registerform(FlaskForm):
#     username = StringField(validators=[InputRequired(), Length(min=4, max=20)], render_kw={"placeholder": "Username"})
#     password = PasswordField(validators=[InputRequired(), Length(min=8, max=20)], render_kw={"placeholder": "Password"})
#     submit = SubmitField('Register')

#     def validate_username(self, username):
#         existing_user_username = User.query.filter_by(username=username.data).first()
#         if existing_user_username:
#             raise ValidationError("That username already taken. Try a different one")

# class Loginform(FlaskForm):
#     username = StringField(validators=[InputRequired(), Length(min=4, max=20)], render_kw={"placeholder": "Username"})
#     password = PasswordField(validators=[InputRequired(), Length(min=8, max=20)], render_kw={"placeholder": "Password"})
#     submit = SubmitField('Login')

# @app.route('/')
# def home():
#     return render_template('base.html')

# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     username = request.form['username']
#     password = request.form['password']
#     return render_template('login.html', form=form)

# @app.route('/register', methods=['GET', 'POST'])
# def register():
#     form = Registerform()

#     if form.validate_on_submit():
#         hashed_pass = bycrpt.generate_password_hash(form.password.data)
#         new_user = User(username=form.username.data, password=hashed_pass)
#         db.session.add(new_user)
#         db.session.commit()
#         print("New user added to the database.")
#         return redirect(url_for('login'))

#     return render_template('register.html', form=form)
from website import create_app, db
from flask import Flask, request, session, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = create_app()
CORS(app)
app.config['DEBUG'] = os.environ.get('FLASK_DEBUG')

if __name__ == '__main__':       
    app.run(debug=True)
