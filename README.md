# Book App Website

This repository contains the source code and necessary files for a book app website. The website consists of a backend built with **Spring Boot** and a frontend built with **React**.

## Backend

The backend of the application is located in the `backend/Book` directory.

### Prerequisites

To run the backend, ensure that you have the following software installed on your system:

- Spring Tool Suite 4 (Version 4.14.0.RELEASE)
- Java Development Kit (JDK) 17

### Configuration

Before running the backend, you need to configure the database connection in the `application.properties` file. Follow the steps below:

1. Open the `application.properties` file located in `backend/Book/src/main/resources`.
2. Modify the following properties according to your database setup:

   + spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name
   + spring.datasource.username=your_username
   + spring.datasource.password=your_password

### Running the Backend

1. Open Spring Tool Suite 4 and import the `backend/Book` directory as a Maven project.
2. Build the project to resolve dependencies and compile the code.
3. Run the main application class to start the backend server.

Test API: `http://localhost:8081/books` for retrieving books. 

## Frontend

The frontend of the application is located in the `frontend/manage-book` directory. 

### Prerequisites

To run the frontend, ensure that you have the following software installed on your system:

- Node.js (version compatible with React 18)

### Running the Frontend

1. Open a terminal and navigate to the `frontend/manage-book` directory.
2. Install the project dependencies by running the command `npm install`.
3. Start the development server with the command `npm start`.


