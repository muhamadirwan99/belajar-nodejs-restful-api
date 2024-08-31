# User API Specification

## Register User API

Endpoint : POST /api/users

Request Body:
```json
{
    "username": "pzn",
    "password": "rahasia",
    "name": "Muhamad Irwan"
}
```

Response Body Success:
```json
{
  "data" : {
    "username": "pzn",
    "name": "Muhamad Irwan"
  }
}
```

Response Body Error:
```json
{
  "errors":  "Username already registered"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body:
```json
{
    "username": "pzn",
    "password": "rahasia"
}
```

Response Body Success:
```json
{
    "data" : {
      "token": "unique-token"
    }
}
```

Response Body Error:
```json
{
  "errors":  "Invalid username or password"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Headers : 
 - Authorization: token

Request Body:
```json
{
    "name": "Muhamad Ramadhan", // optional
    "password": "new password" // optional
}
```

Response Body Success:
```json
{
  "data" : {
    "username": "pzn",
    "name": "Muhamad Ramadhan"
  }
}
```

Response Body Error:
```json
{
  "errors":  "Name length max 100"
}
```

## Get User API

Endpoint : GET /api/users/current

Headers :
- Authorization: token

Response Body Success:
```json
{
  "data": {
    "username": "pzn",
    "name": "Muhamad Ramadhan"
  }
}
```

Response Body Error:
```json
{
  "errors":  "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Headers :
- Authorization: token

Response Body Success:
```json
{
  "data": "Logout success"
}
```

Response Body Error:
```json
{
  "errors":  "Unauthorized"
}
```