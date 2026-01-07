---
layout: post
title: React Login Series - Auth API Integrating a Java Authentication API | Part 4c
date: 2026-01-06 
description: A production-style authentication system built with React, Tailwind, localStorage, API ready, and full testing coverage.
tags: [ react, login , authentication, auth, UI ]
categories: [ react-posts, auth , react-login-series]
giscus_comments: false
related_posts: true
related_publications: false
featured: false
mermaid:
  enabled: true
  zoomable: true
code_diff: true


---

## Post 4c: Integrating a Java Authentication API

In the previous [post] ({% post_url 2026-01-06-react-login-04-auth-api-endpoints %})  of this Login Feature Series,we focused on UI, routing, guards, layouts, and client-side state management. 


Up to this point in the Login Feature Series, we’ve focused on the frontend architecture:

- Auth layouts vs route guards
- Form state and validation
- Password rules and UI feedback
- Authentication state management


In the API section the consideration of code is based on needs. If development is handled all inhouse we could code the API in the Express.js model 

###  Use Express Here

A common question is whether we need Express (or Node) to “connect” to the Java API.

We do not.

Express is a backend framework.
If Java already owns authentication, adding Express would only introduce:

- Extra latency
- Duplicate logic
- More infrastructure to maintain

in Express Our architecture would look like this:

```text
//2026-01-06 react-login-04-auth-api-decoupling
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
│     ├─ hooks/
│     │  └─ useLogin.js
│     ├─ services/
│     │  └─ authApi.js
│     ├─ validators/
│     │  └─ loginSchema.js
│     ├─ tests/
│     │  ├─ LoginForm.test.jsx
│     │  └─ useLogin.test.js
└─ main.jsx

```
## Mental Model Of Express.js setup
```text
UI → useAuth → AuthContext → Storage
                     ↓
                  authApi
```
See a future post of Express.js, Node stack. 

In this particulre Post we want to tie into expisting APIs and therefore our code structure looks thinner. Let's move to the this layer: integrating with an existing Java authentication API. In this post, we assume:

- Java owns users and authentication
- The frontend does not reimplement auth logic
- React communicates directly with Java over HTTP
- The frontend treats the API as a contract, not an implementation

Grab the code [Post 3a Route Guard](https://github.com/cryshansen/login-feature-react/tree/post/post3a-route-guard) before starting.

---

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
│     │  └─ auth.service.ts
│     ├─ schemas/
│     │  └─ auth.schema.ts
│
└─ main.jsx

```
This is the most common and correct setup in real-world systems.

---

### Treating the Java API as a Contract

Even though the backend is Java, we still want strong guarantees on the frontend. This is where TypeScript enters the picture — not to replace Java, but to mirror its contract.

#### Why TypeScript on the frontend API layer?

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

Instead of calling fetch directly inside components, we centralize API calls.
```ts
// auth.service.ts
import { LoginRequest, RegisterRequest, AuthResponse } from "./auth.types";

const BASE_URL = "/auth";

export async function login(
  data: LoginRequest
): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.json();
}
```

This gives us:

- A single integration point
- Typed responses
- Clean separation from UI logic

Mapping UI Screens to Java Endpoints
UI Screen	Java Endpoint
Login	POST /auth/login
Signup	POST /auth/register
Forgot Password	POST /auth/reset-request
Reset Password	POST /auth/reset-confirm

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

✅ Feature-based UI
✅ Route guards and layouts
✅ Centralized auth state
✅ Password validation UX
✅ Direct Java API integration
✅ Typed frontend API contracts

The frontend remains framework-agnostic, while the backend remains authoritative.

#### Key Takeaway

  When Java owns authentication,
  React integrates — it does not reimplement.

TypeScript on the frontend doesn’t compete with Java.
It complements it by enforcing correctness at the boundary.


Review the Github [code branch](https://github.com//post4-API-decoupling)   

---

#### Final Thought

A login system isn’t “done” when the form works.
It’s done when every endpoint has a clear job, a clear contract, and a clear owner.
This API design gives your Login Feature a backbone you can scale, test, and reuse. [Part 5 Session Persistence]({% post_url 2026-01-06-react-login-05-auth-context-session-persistence %})  the endpoints.


### What This Enables Next

After Post 4, we now have:

- clean boundaries
- replaceable backends
- testable hooks
- predictable behavior

Review the code found in Github [Post 4 API Decoupling](https://)

---

### Post 5 Preview: Auth Context & Session Persistence

Next, we’ll cover:

- rehydrating auth state on refresh
- session vs memory tradeoffs
- logout patterns
- protected route behavior

 [Post 5  Session Persistence ]({% post_url 2026-01-06-react-login-05-auth-context-session-persistence %}})

