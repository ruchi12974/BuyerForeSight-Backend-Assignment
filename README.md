# User Management REST API

A robust Backend REST API built with Node.js, Express, and SQLite for managing user records. This project was developed as part of the Backend Engineer Assessment for BuyerForeSight.

# Features
Full CRUD Operations: Create, Read, Update, and Delete users.

Persistent Storage: Uses SQLite for data persistence (data remains after server restart).

Search & Filter: Search users by name or email using query parameters.

Sorting: Sort users by name or email in ascending or descending order.

Error Handling: Proper HTTP status codes (201, 404, 500, etc.) and validation.

## Tech Stack
Runtime: Node.js

Framework: Express.js

Database: SQLite3

Development: Nodemon

### Project Structure

├── db/
│   └── database.js    # Database connection & Schema
├── routes/
│   └── userRoutes.js  # API route definitions
├── controllers/
│   └── userController.js # Business logic & CRUD operations
├── server.js          # Entry point
└── users.db           # SQLite database file 

#### Installation & Setup
   # Clone the repository:
        git clone <your-repo-link>
        cd user-management-api
   ## Install dependencies: 
        npm install 
   ### Start the server: 
       npm start
               ( Or for development: )
       npx nodemon server.js  
    {{ The server will run at http://localhost:3000. }} 

##### API Endpoints

  User Endpoints

Method         Endpoint      Description          Query Params
GET            /users        List all users       search, sort, order
GET            /users/:id    Get user by ID        None
POST           /users        Create new user       None
PUT            /users/:id    Update user           None
DELETE         /users/:id    Delete user           None 


###### Example Queries

Search for a user: GET /users?search=Rachana

Sort by name (Z-A): GET /users?sort=name&order=desc

#### Sample Request Body (POST/PUT)
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "QA Engineer"
}