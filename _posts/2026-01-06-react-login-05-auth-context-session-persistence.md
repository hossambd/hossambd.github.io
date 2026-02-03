---
layout: post
title: React Login Series - Auth Context Session, Persistence & Logout | Part 5
date: 2026-01-10
description: Part 5 of this series walks through the authentication context, session state, persistence and login/logout functionality.
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

## Post 5: Auth Context: Session, Persistence & Logout

“Authentication is not a form. It’s application state.”

Next logical posts in the series:

Implementing the API Layers (Node / Express / Nest / etc.) [Part 4c Coding]({% post_url 2026-01-06-react-login-04-auth-api-code %}) the endpoints.

- Token storage strategies (cookies vs memory)
- Connecting the API to the AuthContext
- End-to-end login flow walkthrough

---

### Why Auth Context Exists

By now we have:

- UI components (Post 2)
- useAuth hook managing async state (Post 3)
- authApi abstracting the backend (Post 4)

What we still don’t have is a single source of truth for:

- whether the user is logged in
- who the user is
- how long the session lives
- how the app reacts to logout

That responsibility belongs to Auth Context.

---

### The Role of AuthContext

AuthContext is:

- the app’s authentication authority

- session state manager

- persistence coordinator

AuthContext is not:

- responsible for forms

- making network requests directly

- aware of UI layout

- tied to any one route

## Think of it as application infrastructure, not a feature component.

### Session State: What Do We Store?

At minimum:

- authentication status

- user info (if needed)

- token (or session id)

Example shape:

```js
{
  user: null | { id, email },
  token: null | string,
  isAuthenticated: boolean
}
```

#### Rule

If the app needs it globally → Context owns it.

---

### Memory vs localStorage (The Honest Tradeoff)

#### In-Memory State

- ✅ Secure against XSS persistence
- ❌ Lost on refresh
- ❌ Requires re-login

#### localStorage

- ✅ Survives reloads
- ✅ Simple to implement
- ❌ Accessible to JS

This series chooses localStorage intentionally, without pretending it’s more secure than it is.

---

### Diagram: Session Persistence Flow

```mermaid
flowchart TD
  LoginSuccess --> AuthContext
  AuthContext -->|save| localStorage
  AuthContext -->|update| MemoryState

  Reload --> AppInit
  AppInit -->|rehydrate| localStorage
  localStorage --> AuthContext
```

---

### Rehydration on Reload

On app start:

1. Context checks storage

2. Valid session restores state

3. UI updates immediately

No flicker. No guessing.

---

### Diagram: App Startup Rehydration

```mermaid
flowchart TD
  AppStart --> AuthContext
  AuthContext -->|check| localStorage

  localStorage -->|session exists| AuthContext
  AuthContext -->|set authenticated| UI

  localStorage -->|empty| AuthContext
  AuthContext -->|unauthenticated| UI
```

---

Logout Patterns (Simple, Predictable)

Logout should:

- clear storage
- reset memory state
- redirect user
- invalidate session hints

Nothing else.

---

🚪 Diagram: Logout Flow

```mermaid
flowchart TD
  User --> LogoutAction
  LogoutAction --> AuthContext

  AuthContext -->|clear| localStorage
  AuthContext -->|reset| MemoryState
  AuthContext -->|notify| UI

  UI -->|redirect| Login
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
│  └─ auth/
│     ├─ components/
│     │  ├─ LoginForm.jsx
│     │  ├─ PasswordInput.jsx
│     │  ├─ AuthError.jsx
│     │  └─ AuthCTA.jsx
│     ├─ hooks/
│     │  └─ useLogin.js
│     ├─ services/
│     │  └─ authApi.js
│     ├─ validators/
│     │  └─ loginSchema.js
│     ├─ tests/
│     │  ├─ LoginForm.test.jsx
│     │  └─ useLogin.test.js
│     └─ index.js
│
└─ main.jsx

```

---

### App-Level Integration

AuthContext should wrap everything that depends on session state.

Typically:

```jsx
<AuthProvider>
  <Router />
</AuthProvider>
```

This ensures:

- routes respond to auth changes

- logout works everywhere

- session is consistent

### Why Context (Not Props, Not Redux)

Context wins here because:

- scope is global
- updates are infrequent
- semantics are clear
- no external dependency needed

This is exactly what Context was built for.

---

### What You Have Now vs Cookie-Based Auth

Right now you have token-in-localStorage auth.
Cookie-based auth moves session ownership to the browser + server instead of JS.

With Context in place:

- protected routes are trivial
- logout is universal
- session persistence “just works”
- testing becomes straightforward

Both Authentication work. They solve different problems.

Review the code found in Github [Post 5 Session Persistence](https://github.com/cryshansen/login-feature-react/tree/post/post5-persistence)

### What You Have Now (LocalStorage Token Auth)

How it works (our app today)
If we review the [code](https://github.com/cryshansen/login-feature-react/tree/post/post5-persistence) from our last Github checked in branch, we can review how the code matches the below flow:

```mermaid
sequenceDiagram
  participant U as User
  participant F as Frontend
  participant API as Backend
  participant LS as localStorage

  U->>F: Submit login form
  F->>API: POST /login (credentials)
  API-->>F: { token, user, expiresAt }

  F->>LS: Store token + user + expiresAt
  F->>F: Determine isAuthenticated

  U->>F: Refresh / revisit app
  F->>LS: Rehydrate auth state
  F->>F: Check expiresAt > Date.now()

  F->>API: Request with Authorization header
  API->>API: Verify token signature & claims
  API-->>F: Protected response
```

##### In the code:

```js
localStorage.setItem(
  "auth_user",
  JSON.stringify({
    token,
    expiresAt,
    user,
  })
);

const isAuthenticated = !!authuser && authuser.expiresAt > Date.now();
```

```mermaid
flowchart LR
  Frontend -->|Stores| Token[JWT Token]
  Frontend -->|Stores| Meta[expiresAt + user]
  Frontend -->|Decides| AuthState[Authenticated?]

  Frontend -->|Sends token via header| Backend
  Backend -->|Verifies| Token
  Backend -->|Allows / Denies| APIAccess[API Access]

  Frontend:::frontend
  Backend:::backend

  classDef frontend fill:#E3F2FD,stroke:#1E88E5
  classDef backend fill:#FFF3E0,stroke:#FB8C00

```

---

** Pros (why this is popular)**

- Simple to understand
- Easy to debug
- Works without backend changes
- Fine for MVPs
- Works with mobile, desktop, SPAs

** Cons (important)**

- Vulnerable to XSS
- JS can read token
- Logout is “best effort”
- Refresh logic is manual
- Harder to rotate tokens securely

What weve built can be found on Github. Review the code branch found at [Post 5 Auth Persistence](https://github.com/cryshansen/login-feature-react/tree/post/post5-persistence)

---

### Post 5b Preview: Cookie-Based Auth

In the next post, we’ll shift authentication responsibility away from the frontend and into the browser and backend, using HTTP-only cookies and server-managed sessions.

We’ll walk through how cookie-based auth works end-to-end, why the frontend never needs to touch a token, and how this model simplifies state management while improving security by default. We’ll also look at what actually happens during a request, how sessions are validated, and where expiration logic truly belongs.

This post is especially useful if you’ve ever wondered “How am I logged in if I can’t see the token?” or if you’re comparing JWT-based approaches with a more traditional session model.

[Post 5b Cookie-Based Auth ]({% post_url 2026-01-10-react-login-05-auth-context-cookie-persistence %})
