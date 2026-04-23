# Auth

## 1. Overview

## 2. Base Configuration

## 3. Authentication Model

## 4. Global Conventions

## 5. Error Model

## 6. Endpoints

### 1. Login

Endpoint:

```http
POST /auth/login
```

Description: Authenticate user credentials and issue tokens
Authentication: Not required

Request:

```JSON
{
  "email": "string",
  "password": "string"
}
```

Response(201: Created):

```typescript
res.status(201).json({
  data: {
    accessToken: "jwt",
  },
  error: null,
});
```

Set-Cookie:

```typescript
res.cookie("refreshToken", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/auth/refresh",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});
```

Behavior:
Errors:

- 400 Bad Request: Missing Fields
- 409 Conflict: User already exists
- 500 Internal Server Error:

### 2. Register

Endpoint:

```http
POST /auth/register
```

Description: Create user account
Authentication: Not required

Request:

```JSON
{
  "email": "string",
  "password": "string"
}
```

Response(200):

```JSON
{
  "data": {
    "accessToken": "jwt",
  },
  "error": null
}
```

Set-Cookie:

```typescript
res.cookie("refreshToken", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/auth/refresh",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});
```

Behavior:
Errors:

- 401 Unauthorized: Invalid credentials
- 400 Bad Request: Missing Fields
- 500 Internal Server Error:

### 3. Refresh

## 7. Authentication Flow

## 8 .
