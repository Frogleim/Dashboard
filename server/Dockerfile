FROM python:3.8
WORKDIR /auth
EXPOSE 80
COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY . ./
CMD ['uvicorn', 'main:app', '--port 5000', '--reload']