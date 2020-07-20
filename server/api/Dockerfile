FROM python:3.8.2

# Install dependencies
COPY Pipfile* ./
RUN pipenv install

EXPOSE 5000
CMD [ "python3", "manage.py", "run" ]