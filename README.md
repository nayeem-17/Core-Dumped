# Core-Dumped
## How to run this project to your local machine
### Connecting to Oracle Database
1. **Create a user**
2. Grant the user the role of **DBA** or appropriate role.
3. Now pump the [sqldump file](./backend/src/database/schema/init.sql) into the database.
### Install all dependencies

You have to install pm2 globally to run this project.You can install it by running the following command:
```bash
npm i -g pm2 
```
Now,
```bash
cd ./backend && npm i && cd ../frontend && npm i && cd ..
```
### Now start the backend server
```bash
cd ./backend && pm2 start --name=backend npm -- start
```
### Now start the frontend 

```bash
cd ../frontend && pm2 start --name=frontend npm -- start
```


## Documentation

We have created api documentation for the backend of this project. After running this project, you can access the documentation by visiting the following link:
```
http://localhost:3000/api-docs
```
Here is the pdf version of the documentation: [Here](./backend_doc.pdf)

