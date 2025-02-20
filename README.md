# Leaderboard Application

This is a React-based leaderboard application that allows users to manage a list of users, including adding new users, incrementing and decrementing points, sorting, and searching.

## Table of Contents

- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)

## Installation

To get started with the application, follow these steps:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/pal7/spring-leaderboard.git
   cd spring-leaderboard
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

## Running the Application

To run the application in development mode, use the following command:

```sh
npm run dev
```

This will start the development server and open the application in your default web browser. The application will automatically reload if you make any changes to the code.

## Running Tests

To run the unit tests for the application, use the following command:

```sh
npm test
```

This will execute the tests and display the results in the terminal.

## Project Structure

The project structure is organized as follows:

```
leaderboard-app/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── AddUserDialog/
│   │   │   ├── AddNewUserForm.jsx
│   │   │   ├── AddUserDialog.jsx
│   │   │   └── ...
│   │   ├── UsersTable/
│   │   │   ├── UserRow.jsx
│   │   │   ├── UsersTable.jsx
│   │   │   ├── UsersTable.test.jsx
│   │   │   └── ...
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   └── ...
│   │   ├── UserDetailsDialog/
│   │   │   ├── UserDetailsDialog.jsx
│   │   │   └── ...
│   │   └── ...
│   ├── helpers/
│   │   ├── fetchData.js
│   │   ├── updateUserPoints.js
│   │   ├── deleteUser.js
│   │   ├── addUser.js
│   │   └── ...
│   ├── App.jsx
│   ├── App.test.jsx
│   ├── index.jsx
│   └── ...
├── .gitignore
├── package.json
├── README.md
└── ...
```
