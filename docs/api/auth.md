# Auth

## Flow

LOGIN (email, password)
↓
JWT access and refresh token
access=jwt.sign
refresh=crypto
↓
Create Session IF NOT EXISTS (DB)
↓ Response access
Frontend stores cookies
↓
Request → send access token
↓
Backend middleware verifies → returns data
↓
Access expires (401)
↓
Use refresh token
↓
Backend checks session → new access token
↓
Repeat

## Endpoints

### - [x] POST /auth/register

#### Request

```JSON
{
  "email": "user@example.com",
  "password": "password"
}
```

#### Response

```JSON
{
  "success": true,
  "statusCode": 201,
  "data": {
  }
}
```

#### Errors

| Code | Meaning                                     |
| ---- | ------------------------------------------- |
| 400  | Validation error                            |
| 401  | Invalid credentials (wrong email, password) |

### - [x] POST /auth/login

Authenticates user and returns access token.

#### Request

```JSON
{
  "email": "user@example.com",
  "password": "password"
}
```

#### Response

```JSON
{
  "success": true,
  "statusCode": 201,
  "data": {
    "accessToken": "JWT"
  }
}
```

#### Errors

| Code | Meaning             |
| ---- | ------------------- |
| 401  | Invalid credentials |
| 429  | Too many attemps    |

### - [ ] POST /auth/verify

Checks if token is valid.

#### Headers

Authorization: Bearer <token>

#### Response

```JSON
{
  "success": true,
  "statusCode": 201,
  "data": {
    "valid": true,
    "userId": "123"
  }
}
```

#### Errors

| Code | Meaning       |
| ---- | ------------- |
| 401  | Invalid token |
| 401  | Token expired |

### - [ ] POST /auth/refresh

#### Request

```JSON
{
  "email": "user@example.com",
  "password": "password"
}
```

#### Response

```JSON
{
  "success": true,
  "statusCode": 201,
  "data": {
    "accessToken": "JWT"
  }
}
```

#### Errors

| Code | Meaning             |
| ---- | ------------------- |
| 400  | Validation error    |
| 409  | User already exists |

### - [ ] POST /auth/logout

#### Request

```JSON
{
  "email": "user@example.com",
  "password": "password"
}
```

#### Response

```JSON
{
  "success": true,
  "statusCode": 201,
  "data": {
    "accessToken": "JWT"
  }
}
```

#### Errors

| Code | Meaning             |
| ---- | ------------------- |
| 400  | Validation error    |
| 409  | User already exists |
