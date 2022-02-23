# Core Dumped
## Introduction

A simple question-answering website with blog posting feature, inspired by stackoverflow and quora(quora X stackOverflow).
Extensively uses the rich text editor [Quill](https://github.com/quilljs/quill) and [ReactQuill](https://github.com/zenoamaro/react-quill).

Submitted for CSE216-Database Sessional.  
## Development Stack
- Frontend
  - React
  - React-Quill
- Backend
  - Express
- Database
  - Oracle-12c
## How to run this project to your local machine
- ### Clone this repository and create `env` file
  1. First clone this repository to your local machine.
  2. Create a `.env` file in the backend directory of this repository. Now put these lines in the file:
      ```bash
      PORT=8000
      NODE_ENV=development
      JWT_SECRET=U~A^O8vk510OZs
      SECRET_TOKEN='abc'
      DB_USER=tommy
      DB_PASSWORD=tommy
      DB_CONNECTION_STRING=localhost:1521/ORCLCDB.localdomain
      MAIN_URL=http://0.0.0.0:8000
      ```
  3. Now, create a `.env` file in the frontend directory of this repository. Now put these lines in the file:
    ```bash
    REACT_APP_SERVER_URL=http://0.0.0.0:8000
    ```
- ### Connecting to Oracle Database

  If you're connecting to a remote database, you'll need to install instant client to your local machine. Here is [HOW](https://docs.oracle.com/en/database/oracle/machine-learning/oml4r/1.5.1/oread/installing-oracle-database-instant-client.html)

  1. **Create a user**  
     Log in as sysdba in sqlplus. Then run this following command in sqlplus:
    ```sqlplus
      create user c##coredumped identified by password
    ```
  2. Grant the user the role of **DBA** or appropriate role.
  ```sqlplus
    grant all privileges to c##coredumped
   ```
  3. Copy the [schema](./backend/src/database/schema/) directory and change directory. Then login to sqlplus 
  ```powershell
   sqlplus c##coredumped/password
  ```
  4. Now run the [tables](./backend/src/database/schema/DDL_tables.sql),[triggers](./backend/src/database/schema/DDL_triggers.sql) and [procedures](./backend/src/database/schema/DDL_procedures.sql) SQL files.
  ```sqlplus
   @DDL_tables.sql;
   @DDL_triggers.sql;
   @DDL_procedures.sql;
  ```
- ### Install all dependencies

  You have to install pm2 globally to run this project.You can install it by running the following command:
  ```bash
  npm i -g pm2 
  ```
  Now,
  ```bash
  cd ./backend && npm i && cd ../frontend && npm i && cd ..
  ```
- ### Now start the backend server
  ```bash
  cd ./backend && pm2 start --name=backend npm -- start
  ```
- ### Now start the frontend 

  ```bash
  cd ../frontend && pm2 start --name=frontend npm -- start && cd ..
  ```

## See the logs

### To see the logs you've to run the following command:
```
  pm2 logs
```

## Documentation
# Backend
We have created api documentation for the backend of this project. After running this project, you can access the documentation by visiting the following link:
```
http://localhost:3000/api-docs
```
Here is the pdf version of the documentation: [Here](./backend_doc.pdf)

# Frontend
Typescript template of [create-react-app](https://create-react-app.dev/) is used for displaying data.

1. [**Components**](./frontend/src/components/):
Code for all the components.

2. [**Pages**](./frontend/src/pages/)
Describes how the components will be displayed.

3. [**Utilities**](./frontend/src/utils/)
Used for fetching data from backend, uses [axios](https://axios-http.com/docs/intro).

4. [**App.tsx**](./frontend/src/App.tsx)
Primarily contains all the route declarations.


-----
**This project is supervised by** [Rifat Shahriar](https://github.com/rifatshahriyar).
**Authors:**
  - [Zannatul Naim](https://github.com/nayeem-17)
  - [Aszadur Rahman Rakin](https://github.com/rakin000)
