# API Documentation

This document provides a brief overview of the basic endpoints available in the leaderboard API. The base URL for the API is:

```
https://67afd011dffcd88a67879894.mockapi.io/api/v1
```

## Endpoints

### Leaderboard

#### Get All Users

**Endpoint:** `GET /leaderboard`

**Description:** Retrieves a list of all users.

#### Get User by ID

**Endpoint:** `GET /leaderboard/:id`

**Description:** Retrieves a user by their ID.

#### Create New User

**Endpoint:** `POST /leaderboard`

**Description:** Creates a new user.

**Request Body:**

```json
{
  "name": "New User",
  "points": 0,
  "age": 20,
  "address": {
    "street": "New Street",
    "suite": "Apt 106",
    "city": "New City",
    "zipcode": "1006"
  }
}
```

#### Update User

**Endpoint:** `PUT /leaderboard/:id`

**Description:** Updates an existing user's points by their ID.

**Request Body:**

```json
{
  "name": "Updated User",
  "points": 5,
  "age": 21,
  "address": {
    "street": "Updated Street",
    "suite": "Apt 107",
    "city": "Updated City",
    "zipcode": "1007"
  }
}
```

#### Delete User

**Endpoint:** `DELETE /leaderboard/:id`

**Description:** Deletes a user by their ID.

## Conclusion

This document provides a simple overview of the basic endpoints available in the leaderboard API which was created using https://mockapi.io/. Each endpoint allows you to perform CRUD operations on the leaderboard entries.
