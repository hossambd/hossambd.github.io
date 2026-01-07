---
layout: post
title: React Login Series -  Route Guards Auth Flow | Part 3b
date: 2026-01-06
description: In this Part of the series we look at guarding routes in a feature-based react auth flow
tags: [ react, login , authentication, auth, react-router, layouts, guards ]
categories: [ react-posts, auth ,routing, architecture, react-login-series ]
giscus_comments: false
related_posts: true
related_publications: false
featured: false
mermaid:
  enabled: true
  zoomable: true
code_diff: true

---

## Introduction

After our last post [Post 3 State Hooks]({% post_url 2025-12-29-react-login-03-state-hooks %}) on `State Hooks` we set up our `authContext` for our different login form submissions. 

## Why Route Guards Are a Separate Concern

By the time an authentication flow reaches this point, most of the *visible* work is done:

- Forms validate correctly
- Password strength is enforced
- Success and error messages render as expected

But none of that actually prevents a user from typing a URL directly into the address bar.

If `/profile` is publicly accessible, the app **looks** authenticated — but it isn’t.

This is where **route guarding** comes in.

Route guards answer one question:

> **Who is allowed to access this route?**

They are not:
- Form logic
- UI state
- Feature behavior

They are **navigation policy**.

---

## Layouts vs Guards (The Mental Model)

This distinction is critical.

### Layout
- Controls **how a page looks**
- Wraps UI
- Has *no authority* over access

Examples:
- Auth background
- Centered card
- Dark mode toggle

### Guard
- Controls **who may access a route**
- Wraps navigation
- Has *no concern* for styling

Examples:
- Redirect unauthenticated users to `/login`
- Prevent logged-in users from seeing `/signup`

> **Layouts wrap UI. Guards wrap access.**

Once you separate these concerns, routing becomes composable instead of confusing.

---

## The Three Route Types in an Auth System

Every auth flow naturally divides into three categories:

### 1. Public-only routes
Accessible **only when logged out**

- `/login`
- `/signup`
- `/reset`
- `/reset/confirm`

### 2. Protected routes
Accessible **only when authenticated**

- `/profile`
- `/settings`

### 3. Token-based routes
Accessible without auth, but validated **inside the page**

- `/confirm-email`
- `/reset/confirm?token=...`

These routes should not be protected by auth state — they are guarded by **tokens**, not sessions.

---

## Guard Components

Before moving further, lets grab the branch we checked in to get started from here. [Post 3 State Hooks ](https://github.com/cryshansen/login-feature-react/tree/post/post3-state-hooks)


### ProtectedRoute (Auth Required)

```jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * 🔒 ProtectedRoute
 *
 * Allows access ONLY when the user is authenticated.
 * Redirects unauthenticated users to /login.
 */
export default function ProtectedRoute() {
  const { isAuthenticated, authReady } = useAuth();

  // Prevent redirect flicker while auth initializes
  if (!authReady) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

```

---
 
### PublicOnlyRoute (Auth NOT Allowed)

```jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * 🚫 PublicOnlyRoute
 *
 * Allows access ONLY when the user is NOT authenticated.
 * Redirects logged-in users to /profile.
 */
export default function PublicOnlyRoute() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
}
```

These components do one thing each.
They don’t render pages — they enforce policy.

---

### Feature-Based AuthLayout (Drop-In Design)

This project treats authentication as a feature, not a global concern.

That means:

- Auth pages bring their own layout
- The rest of the app is unaffected
- The feature can be dropped into another app cleanly

**AuthLayout responsibility**

- Background
- Card container
- Dark mode toggle
- Visual consistency for auth screens

It does not decide access.

---

### Composing Layouts and Guards

React Router allows stacking behavior through nesting.

Here’s the final routing structure.
```jsx
<Routes>
  {/* AUTH FEATURE (public-only) */}
  <Route
    element={
      <AuthLayout darkMode={darkMode} setDarkMode={setDarkMode} />
    }
  >
    <Route element={<PublicOnlyRoute />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/reset" element={<RequestResetPage />} />
      <Route path="/reset/confirm" element={<ConfirmResetPage />} />
      <Route path="/confirm-email" element={<ConfirmEmailPage />} />
    </Route>
  </Route>

  {/* APPLICATION (protected) */}
  <Route element={<ProtectedRoute />}>
    <Route path="/profile" element={<ProfilePage />} />
  </Route>

  {/* Fallback */}
  <Route path="*" element={<Navigate to="/login" replace />} />
</Routes>
```

---

### Route Tree Diagram

This diagram shows how access flows through the app:
```text
Routes
│
├─ AuthLayout
│   └─ PublicOnlyRoute
│       ├─ /login
│       ├─ /signup
│       ├─ /reset
│       ├─ /reset/confirm
│       └─ /confirm-email
│
├─ ProtectedRoute
│   └─ /profile
│
└─ * → /login
```

Each layer has exactly one responsibility.

---

### Why This Architecture Scales

This approach makes future changes easy:
```text
Add roles → AdminRoute

Add verification → VerifiedEmailRoute

Add new auth pages → no router rewrite

Remove auth feature → no app-wide refactor
```

It also mirrors how production teams structure large React apps.

---

### Key Takeaways

- Route guards are navigation policy, not UI
- Layouts and guards should never be mixed
- Auth features can (and should) own their own layout
- Nesting routes is more powerful than conditional rendering
- Clean naming (ProtectedRoute, PublicOnlyRoute) matters

At this point, the app doesn’t just look authenticated — it behaves like one.

We have fully covered everything we need and layered the feature correctly before moving forwad with our next post. We hit our milestoe and can checkoff these items:


✅ UI composition (forms, fields, layouts)
✅ State hooks (derived state, guards, submit conditions)
✅ Auth context integration
✅ Route guards (public-only + protected)
✅ Layout vs guard separation
✅ Feature-based drop-in auth design


Review this code found in Github [Post 3a Route Guard](https://github.com/cryshansen/login-feature-react/tree/post/post3a-route-guard) 


#### Coming Next

In [Post 4 API Decoupling]({% post_url 2025-12-31-react-login-04-auth-api-decoupling %}) , we’ll discuss the 

- Why service layers matter
- API abstraction
- Environment decoupling
- Mocking backend behavior in tests

This is where frontend code starts to feel production-ready.

