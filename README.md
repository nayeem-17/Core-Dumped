# Core-Dumped
## How to run this project to your local machine
### Connecting to Oracle Database
1. **Create a user**
 ```sqlplus
   create user c##coredumped identified by password
 ```
2. Grant the user the role of **DBA** or appropriate role.
```sqlplus
  grant all privileges to c##coredumped
 ```
3. Copy the [schema]('./backend/src/database/schema/) directory and change directory. Then login to sqlplus 
```powershell
 sqlplus c##coredumped/password
```
4. Now run the [tables](./backend/src/database/schema/DDL_tables.sql),[triggers](./backend/src/database/schema/DDL_triggers.sql) and [procedures](./backend/src/database/schema/procedures.sql) SQL files.
```sqlplus
 @DDL_tables.sql;
 @DDL_triggers.sql;
 @procedures.sql;
```
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

