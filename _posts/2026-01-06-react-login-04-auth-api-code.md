---
layout: post
title: React Login Series - Auth API Integrating an Authentication API | Part 4c
date: 2026-01-06
description: A production-style authentication system built with React, Tailwind, localStorage, API ready, and full testing coverage.
tags: [react, login, authentication, auth, UI]
categories: [react-posts, auth, react-login-series]
giscus_comments: false
related_posts: true
related_publications: false
featured: false
mermaid:
  enabled: true
  zoomable: true
code_diff: true
---

## Integrating an Authentication API

In the previous [post] ({% post_url 2026-01-06-react-login-04-auth-api-endpoints %}) of this Login Feature Series,we defined the authentication endpoint contract — what endpoints exist, what they accept, and what they return. How do I connect my React login feature to a real authentication API?

In this post, we implement the frontend integration layer that consumes those endpoints from a Java-backed authentication API.

### Using Black Box Endpoints

Although the backend is implemented in Java, it is still treated as a black box from the frontend’s perspective. We integrate only through HTTP endpoints, not Java internals.

In this particulre Post we want to tie into expisting APIs and therefore our code structure looks thinner. Let's move to the this layer: integrating with an existing Java authentication API. In this post, we assume:

- Java owns users and authentication
- The frontend does not reimplement auth logic
- React communicates directly with Java over HTTP
- The frontend treats the API as a contract, not an implementation

Grab the code [Post 3a Route Guard](https://github.com/cryshansen/login-feature-react/tree/post/post3a-route-guard) before starting.

### Backend Ownership Model

Our backend is a Java service exposing the following endpoints:

```text
POST /auth/login
POST /auth/register
POST /auth/reset-request
POST /auth/reset-confirm
```

This Java API is the single source of truth for:

- User credentials
- Password rules enforcement
- Token issuance
- Password reset workflows

The frontend’s responsibility is to:

- Collect input
- Call the correct endpoint
- React to success or failure
- Manage UI state and routing

---

Instead, React communicates directly with the Java API.

```text
React App
   ↓ HTTPS
Java Auth API
```

The file structure will look like this:

```text
src/
├─ app/
│  ├─ App.jsx
│  └─ Router.jsx
│
├─ context/
│  └─ AuthContext.jsx
│
├─ features/
│  └─ api/
│     ├─ services/
│     │  └─ auth.service.ts <-- api client
│     ├─ schemas/
│     │  └─ auth.types.ts <-- contracts
│
└─ main.jsx

```

This is the most common and correct setup in real-world systems.

---

#### Why TypeScript on the frontend API layer?

The code now switches to typescript to strongly type the boundaries for these reasons:

- Ensures request shapes are correct
- Prevents silent payload mismatches
- Makes refactors safe
- Keeps UI logic honest

We are not rewriting the backend — we are typing the boundary.

---

### Defining Auth API Types (Frontend)

These types represent what the Java API expects and returns.

```ts
// auth.types.ts
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken?: string;
}
```

This file becomes the frontend’s contract mirror of the Java API.

---

### API Client Layer (Frontend)

Instead of calling fetch directly inside components, we centralize API calls within the services file for authentications.

```ts
// features/api/services/auth.service.ts

import { LoginRequest, RegisterRequest, AuthResponse } from "../schemas/auth.types";

const BASE_URL = "/auth";

/**
 * Shared request helper
 */
async function request<T>(endpoint: string, options: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include",
    ...options,
  });

  if (!res.ok) {
    let message = "Authentication request failed";
    try {
      const data = await res.json();
      message = data.error || message;
    } catch {
      // ignore parse errors
    }
    throw new Error(message);
  }

  return res.json();
}

/**
 * POST /auth/login
 */
export function login(payload: LoginRequest): Promise<AuthResponse> {
  return request<AuthResponse>("/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * POST /auth/register
 */
export function register(payload: RegisterRequest): Promise<AuthResponse> {
  return request<AuthResponse>("/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * POST /auth/reset-request
 */
export function requestPasswordReset(email: string): Promise<void> {
  return request<void>("/reset-request", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

/**
 * POST /auth/reset-confirm
 */
export function confirmPasswordReset(token: string, newPassword: string): Promise<void> {
  return request<void>("/reset-confirm", {
    method: "POST",
    body: JSON.stringify({
      token,
      password: newPassword,
    }),
  });
}
```

This gives us:

- A single integration point
- One file touching fetch
- One place handles errors
- Typed boundary
- No backend assumptions
- Java/PHP interchangeable
- Typed responses
- Clean separation from UI logic

---

### Mapping UI Screens to Java Endpoints

| UI Screen       | Java Endpoint            |
| --------------- | ------------------------ |
| Login           | POST /auth/login         |
| Signup          | POST /auth/register      |
| Forgot Password | POST /auth/reset-request |
| Reset Password  | POST /auth/reset-confirm |

Each screen maps to exactly one backend responsibility. No endpoint does more than one job.

### Password Reset Flow (End-to-End)

#### 1. Reset Request

```text
POST /auth/reset-request
```

- User submits email
- Java generates reset token
- Email is sent
- Response is always generic (security)

Frontend response handling:

- Show “Check your email” message
- No account existence leaks

---

#### 2. Reset Confirmation

```text
POST /auth/reset-confirm
```

Payload includes:

- Reset token
- New password

Java:

- Validates token
- Enforces password rules
- Updates credentials

Frontend:

- Uses existing password rules UI
- Redirects on success

#### Error Handling Strategy

The frontend should expect structured errors from Java.

Example:

```json
{
  "error": "Invalid credentials",
  "code": "AUTH_INVALID"
}
```

This allows:

- Clear UI messaging
- Consistent handling across screens
- Future i18n support

---

#### How This Fits the Login Feature Architecture

At this stage in the series, we now have:

- Feature-based UI
- Route guards and layouts
- Centralized auth state
- Password validation UX
- Direct Java API integration
- Typed frontend API contracts

The frontend remains framework-agnostic, while the backend remains authoritative.

---

### Connecting the Auth API to AuthContext

At this point in the Login Feature Series, we have a fully typed, environment-decoupled Auth API layer. What we have not yet shown is **where that API is actually consumed**.

This is intentional.

The Auth API (`auth.service.ts`) is **never called directly by UI components**.  
It is integrated **exclusively through AuthContext**.

This preserves a clean separation of responsibilities:

```text
UI → useAuth → AuthContext → authApi → Backend
```

#### Why AuthContext Is the Integration Point

AuthContext owns authentication state, not networking details.

Its responsibilities are to:

orchestrate login and logout

manage user and token state

expose semantic actions (login, logout, register)

hide backend behavior from the UI

The API service, by contrast, has a single job:

communicate with the backend

#### Integrating the API Inside AuthContext

AuthContext imports the API functions and wraps them in meaningful actions.

```ts
// context/AuthContext.tsx
import { login as loginApi, register as registerApi } from "@/features/api/services/auth.service";
```

A login action then becomes:

```ts
const login = async (credentials) => {
  setLoading(true);

  try {
    const response = await loginApi(credentials);

    setUser(response.user);
    setToken(response.accessToken);

    return response;
  } finally {
    setLoading(false);
  }
};
```

Key observations:

AuthContext decides what login means

The API only returns data

State updates happen in one place

#### Exposing Auth Actions to the App

AuthContext exposes these actions through its provider:

```ts
const value = {
  user,
  token,
  loading,
  login,
  logout,
  register,
};
```

The rest of the application consumes them via useAuth.

```ts
const { login } = useAuth();
await login({ email, password });
```

No endpoints.
No fetch logic.
No backend assumptions.

#### Why This Matters

This final connection completes the architecture:

Components express intent

Context orchestrates state

Services handle communication

Backends remain replaceable

The frontend stays stable even if the backend changes from Java to PHP — or anything else.

#### Key Takeaway

When Backends owns authentication,
React integrates — it does not reimplement.
AuthContext orchestrates.
Services communicate.
Components request intent.

TypeScript on the frontend doesn’t compete with Java. It complements it by enforcing correctness at the boundary.
After Post 4, we now have:

- clean boundaries
- replaceable backends
- testable hooks
- predictable behavior

Review the Github [4c Auth Api Code](https://github.com/cryshansen/login-feature-react/tree/post/post4c-auth-api-code) branch to compare working code to your build if you need it.

---

#### Final Thought

A login system isn’t “done” when the form works.
It’s done when every endpoint has a clear job, a clear contract, and a clear owner.
This API design gives your Login Feature a backbone you can scale, test, and reuse.

---

### Post 5 Preview: Auth Context & Session Persistence

Next, we’ll cover:

- rehydrating auth state on refresh
- session vs memory tradeoffs
- logout patterns
- protected route behavior

[Post 5 Session Persistence ]({% post_url 2026-01-06-react-login-05-auth-context-session-persistence %})
