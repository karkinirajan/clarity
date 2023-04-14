# To run the project

## Prerequisites

- Python 3.8 or higher
- Django 3.1.7 or higher
- PostgresSQL 12 or higher
- Create a database named `django` and a user named `django` with password `django` and grant all privileges to the database.
- You can change the database name, user and password in `settings.py` file.
- You can also change the database engine to `sqlite3` if you want to use sqlite3 instead of PostgreSQL.

## Installation

- Clone the repository

```bash
git clone project_url
```

- `cd`  into the project directory

```bash
cd django_project
```

- Create a virtual environment and activate it

```bash
python -m venv venv
```

```bash
source venv/bin/activate
```

- Install the requirements using

```bash
pip install -r requirements.txt
```

- Run the migrations using

```bash
python manage.py migrate
```

- Create a superuser using

```python manage.py createsuperuser
```

and follow the instructions

-Run the development server using

```bash
python manage.py runserver
```

- Open `http://localhost:8000` in your browser

## Running the tests

```bash
python manage.py test
```

or with pytest

```bash
pytest
```
