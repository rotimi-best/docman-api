# docman-api

1. Create a file called `.env` in the root folder.

2. Copy the content of `.env.example` and paste in the `.env` file.

3. Replace the variables with your PORT and database information
```
DB_PROVIDER=...      #Provider of the database. e.g: mongodb
DB_USER=...          #Username of your database. e.g: root
DB_PWORD=...         #Password of the username. e.g: root
DB_HOST=...          #Database host. e.g: localhost
DB_NAME=...          #Name of your database. e.g: my-database-name
DB_PORT=...          #Port of your database. e.g: 27017
```

4. Execute:
    ```
    npm i
    npm run start
    ```