# Table of Content

- [Table of Content](#table-of-content)
- [Description](#description)
- [Folder Structuring](#folder-structuring)
- [Setup Project](#setup-project)
  - [Development](#development)
  - [Production](#production)
- [API Documentations](#api-documentations)

# Description

This project is created to filled Bukit Vista test for MBKM intern as Backend Engineer Intern. This project will let you find the movie based on the title and save the movie.

# Folder Structuring

I am using **Clean Architecture** for this project. This architecture will help improve maintainability, and scalability of code base. Besides of that to make this project testable, because i have plan to make unit testing but have little time to working on it i am not implement testing yet, i implements **Dependency Injection**, this method is allow us to make relations for each object is become more loose couple.

# Setup Project

## Development

1. Requirement
   1. MySQL Database
   2. Node.JS
2. Instal dependencies
   `npm install`
3. Copy and fill the env value
   `cp .env.example .env`
4. Migrate the database
   `npm run migrate
5. Run the server
   `npm run dev`

## Production

1. Requirement
   1. MySQL Database
   2. Node.JS
2. Instal dependencies
   `npm install --production`
3. Copy and fill the env value
   `cp .env.example .env`
4. Migrate the database
   `npm run migrate
5. Run the server
   `npm run prod`

# API Documentations

- **`GET`** **`/ping`**
  This endpoint will be use to check the server is

  **Response**

  - Code: `200 OK`
  - Header:
    - `Content-type: applicaton-json`
    - `Set-Cookies: <random-string>`
  - Payload
    ```json
    {
      "data": "pong",
      "error": null
    }
    ```

- **`POST`** **`/auth/register`**
  This endpoint will be use to regist new user

  **Request**

  - Header:
    - `Content-type: applicaton-json`

  ```json
  {
    "username": "string",
    "password": "string" # minimal 8 characters
  }
  ```

  **Response**

  - Sucess:

    - Code: `201 CREATED`
    - Header:
      - `Content-type: applicaton-json`
      - `Set-Cookies: <random-string>`
    - Payload
      ```json
      {
        "data": {
          "user_id": 0,
          "name": "string",
          "created_at": "string"
        },
        "error": null
      }
      ```

  - Bad Request:

    - Code: `400 BAD REQUEST`
    - Header:
      - `Content-type: applicaton-json`
      - `Set-Cookies: <random-string>`
    - Payload

      ```json
      {
        "data": null,
        "error": {
          "message": "bad request",
          "detail": ["password must be at least 8 characters"]
        }
      }
      ```

  - Bad Request:

    - Code: `400 BAD REQUEST`
    - Header:
      - `Content-type: applicaton-json`
      - `Set-Cookies: <random-string>`
    - Payload
      ```json
      {
        "data": null,
        "error": {
          "message": "bad request",
          "detail": ["username has taken"]
        }
      }
      ```

  - Internal Server Error
    - Code: `500 INTERNAL SERVER ERROR`
    - Header:
      - `Content-type: applicaton-json`
      - `Set-Cookies: <random-string>`
    - Payload
      ```json
      {
        "data": null,
        "error": {
          "message": "internal server error"
        }
      }
      ```

- **`POST`** **`/auth/login`**
  This endpoint will be used for login and get access token that will be use later on authorization header

  **Request**

  - Header:
    - `Content-type: applicaton-json`

  ```json
  {
    "username": "string",
    "password": "string" # minimal 8 characters
  }
  ```

  **Response**

  - Sucess:

    - Code: `200 OK`
    - Header:
      - `Content-type: applicaton-json`
      - `Set-Cookies: <random-string>`
    - Payload
      ```json
      {
        "data": {
          "access_token:": "string"
        },
        "error": null
      }
      ```

  - Bad Request:

    - Code: `400 BAD REQUEST`
    - Header:
      - `Content-type: applicaton-json`
      - `Set-Cookies: <random-string>`
    - Payload

      ```json
      {
        "data": null,
        "error": {
          "message": "bad request",
          "detail": ["password must be at least 8 characters"]
        }
      }
      ```

  - Unauthorized:

    - Code: `401 UNAUTHORIZED`
    - Header:
      - `Content-type: applicaton-json`
      - `Set-Cookies: <random-string>`
    - Payload

      ```json
      {
        "data": null,
        "error": {
          "message": "unauthorized",
          "detail": ["username or password is wrong"]
        }
      }
      ```

  - Internal Server Error
    - Code: `500 INTERNAL SERVER ERROR`
    - Header:
      - `Content-type: applicaton-json`
      - `Set-Cookies: <random-string>`
    - Payload
      ```json
      {
        "data": null,
        "error": {
          "message": "internal server error"
        }
      }
      ```

- **`GET`** **`/movies`**

  **Response**

  - Forbidden
    - Code: `403 FORBIDDEN`
    - Header:
      - `Content-type: applicaton-json`
      - `Set-Cookies: <random-string>`
    - Payload:
      ```json
      {
        "data": null,
        "error": {
          "message": "forbidden"
        }
      }
      ```

- **`GET`** **`/movies/favorite`**
  Get all saved favorite movie from logged in user

  **Request**

  - Header:
    - `Authorization: Bearer <access-token>`

  **Response**

  - Success

    - Code: `200 OK`
    - Header
      - `Content-type: applicaton-json`
      - `Set-Cookies: <random-string>`
    - Payload:

      ```json
      {
        "data": [
          {
            "title": "string",
            "poster": "string"
          }
        ],
        "error": null
      }
      ```

  - Forbidden

    - Code: `403 FORBIDDEN`
    - Header:
      - `Content-type: applicaton-json`
      - `Set-Cookies: <random-string>`
    - Payload:

      ```json
      {
        "data": null,
        "error": {
          "message": "forbidden"
        }
      }
      ```

  - Internal Server Error
    - Code: `500 INTERNAL SERVER ERROR`
    - Header:
      - `Content-type: applicaton-json`
      - `Set-Cookies: <random-string>`
    - Payload
      ```json
      {
        "data": null,
        "error": {
          "message": "internal server error"
        }
      }
      ```

- **`POST`** **`/movies/favorite`**
  Saved the favorites movies title

  **Request**

  - Header:
    - `Content-type: applicaton-json`
    - `Authorization: Bearer <access-token>`
  - Payload:
    ```json
    {
      "title": "string"
    }
    ```

  **Response**

  - Success

    - Code: `200 OK`
    - Header
      - `Content-type: applicaton-json`
      - `Set-Cookies: <random-string>`
    - Payload:

      ```json
      {
        "data": [
          {
            "id": 14,
            "title": "avatar",
            "user_id": 3
          }
        ],
        "error": null
      }
      ```

  - Bad Request

    - code: `400 BAD REQUEST`
    - Payload:

      ```json
      {
        "data": null,
        "error": {
          "message": "bad request",
          "detail": ["title is a required field"]
        }
      }
      ```

  - Forbidden

    - Code: `403 FORBIDDEN`
    - Header:
      - `Content-type: applicaton-json`
      - `Set-Cookies: <random-string>`
    - Payload:

      ```json
      {
        "data": null,
        "error": {
          "message": "forbidden"
        }
      }
      ```

  - Internal Server Error
    - Code: `500 INTERNAL SERVER ERROR`
    - Header:
      - `Content-type: applicaton-json`
      - `Set-Cookies: <random-string>`
    - Payload
      ```json
      {
        "data": null,
        "error": {
          "message": "internal server error"
        }
      }
      ```

- **`GET`** **`/movies/:movieTitle`**
  Get poster url from given `movieTitle`

  **Request**

  - Header:
    - `Authorization: Bearer <access-token>`

  **Response**

  - Success

    - Code: `400 BAD REQUEST`
    - Header:
      - `Content-type: applicaton-json`
      - `Set-Cookies: <random-string>`
    - Payload
      ```json
      {
        "data": {
          "title": "string",
          "poster": "string"
        },
        "error": null
      }
      ```

  - Bad Request

    - code: `400 BAD REQUEST`
    - Payload:

      ```json
      {
        "data": null,
        "error": {
          "message": "bad request",
          "detail": ["theres no film with that title or no poster on that film"]
        }
      }
      ```

  - Forbidden

    - Code: `403 FORBIDDEN`
    - Header:
      - `Content-type: applicaton-json`
      - `Set-Cookies: <random-string>`
    - Payload:

      ```json
      {
        "data": null,
        "error": {
          "message": "forbidden"
        }
      }
      ```

  - Internal Server Error
    - Code: `500 INTERNAL SERVER ERROR`
    - Header:
      - `Content-type: applicaton-json`
      - `Set-Cookies: <random-string>`
    - Payload
      ```json
      {
        "data": null,
        "error": {
          "message": "internal server error"
        }
      }
      ```
