
# Getting Started
Run the following command on your local environment to clone the repository

    git clone https://github.com/Gaurav098766/airtribe.git
    cd airtribe

To spin up docker container for server and database

    docker-compose up

> **Note:** For mac/linux based users *docker compose up* .
 
To seed test data in database container 

    docker  exec  -it  airtribe-postgres-1  psql  -U  user  -d  database  -a  -f  /var/script

## Requirements
- Docker Desktop
- Postman

# API endpoints
    GET/api/v1/instructor/search/:instructor_id?name
    POST/api/v1/courses/create
    POST/api/v1/courses/register/:course_id
    POST/api/v1/comment/add/:lead_id
    PATCH/api/v1/courses/update/1/course/:instructor_id
    PATCH/api/v1/instructor/update/:lead_id

# Environment Variables
###  Database environment 
    POSTGRES_DB: database
    POSTGRES_USER: user
    POSTGRES_PASSWORD: password
### Server environment
    DATABASE_URL:  postgres://user:password@postgres:5432/database
    SERVER_PORT:  3002

## References 

All the API responses and endpoints can be accessed from this [Postman Collection](https://api.postman.com/collections/26285999-71156871-b9dd-488e-a32c-857c361d93b2?access_key=PMAT-01HFKY82A0CFMSJJR6ZQXG7GYV)



