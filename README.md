# LifeLog API

The LifeLog API is a backend service for a blogging platform. This document outlines how to set up and run the project and provides an overview of its key features.

---

## Table of Contents
1. [Project Setup](#project-setup)
2. [Environment Variables](#environment-variables)
3. [Scripts](#scripts)
4. [API Key Features](#api-key-features)
5. [Tech Stack](#tech-stack)

---

## Project Setup

1. Clone the repository:
   ```bash
   git clone <REPOSITORY_URL>
   cd LifeLog-API
   ```
   
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database. Use MySQL and configure the database name, username, and password in the .env file.

4. Run migrations:
   ```bash
   npm run migrate
   ```

5. Add seed data (optional):
   ```bash
   npm run seed
   ```

6. Start the server:
   ```bash
   npm start
   ```

## Environment Variables
Create a `.env` file in the root directory of the project and use the following example as a guide:

   ```bash
   PORT=8081
   DB_HOST=127.0.0.1
   DB_NAME=lifelog
   DB_USER=<YOUR_USER_NAME>
   DB_PASSWORD=<YOUR_DB_PASSWORD>
   IMG_PATH=http://localhost:8081/imgs/
   JWT_SECRET_KEY=<YOUR-JWT_SECRET_KEY>
   AWS_ACCESS_KEY_ID=<YOUR_AWS_ACCESS_KEY_ID>
   AWS_SECRET_ACCESS_KEY=<YOUR_AWS_SECRET_ACCESS_KEY>
   AWS_REGION=<YOUR_AWS_REGION>
   AWS_BUCKET_NAME=<YOUR_AWS_BUCKET_NAME>
   ```

Refer to the provided `.env.example` file for more details.

---

## Scripts

The following scripts are defined in `package.json`:

- **Start the server**:

    ```bash
    npm start
    ```
    
- Starts the server from index.js and watches for file changes.

-  **Run Migrations**:
  

     ```bash
      npm run migrate
    ```

- **Rollback migrations**:

    ```bash
   npm run migrate:rollback
    ```
   
- **Add seed data**:
  
    ```bash
    npm run seed 
    ```

---

## API Key Features

1. User Authentication:   
- Sign up, log in, and JWT-based authentication.

2. Post Management:
- Create, read, update, and delete posts.

3. Comment Management:   
- Add, view, and delete comments.

4. Image Upload:
- Store images using AWS S3.

5. Like Functionality:
- Allow users to like posts.

---

## Tech Stack

- **Backend Framework**: Express.js
- **Database**: MySQL, Knex.js
- **Authentication**: JWT (jsonwebtoken)
- **File Upload**: Multer, AWS S3
- **Environment Variable Management**: dotenv
- **Password Encryption**: bcrypt

---

Thank you :)
