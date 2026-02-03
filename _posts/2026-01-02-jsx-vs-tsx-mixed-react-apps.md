---
layout: post
title: JSX vs TSX — When to Use Each (and Why We Often Mix Them)
description: Understanding why modern React apps mix JS, JSX, and TSX — and when TypeScript actually pays off.
date: 2026-01-02
tags: react javascript typescript frontend
---

When you first start working in React, the file extensions can feel confusing. Some files are plain `.js`, others are `.jsx`, and then suddenly you see `.tsx` appear in a codebase that already works. It raises reasonable questions: _Why are we mixing these? Why not just pick one? And what do we actually gain by switching?_

This post walks through those questions using a real example — password validation rules — to explain not just the _differences_, but the _intentional design decisions_ behind mixing JavaScript, JSX, and TSX in a modern React app.

## JavaScript vs JSX: Logic vs Presentation

At its core, JSX is not a different language — it is still JavaScript. JSX simply allows you to write HTML-like syntax inside JavaScript, which React then transforms into function calls. Because of that, JSX files (`.jsx`) are typically used **only when a file renders UI**.

In contrast, plain JavaScript files (`.js`) are ideal for **pure logic**. Utility functions, helpers, validators, and configuration objects don’t benefit from JSX at all. Keeping them in `.js` files communicates intent: _this file does not render anything_.

That distinction is why a password validation setup often looks like this:

- `passwordRules.js` → defines validation rules, regexes, and helper functions
- `PasswordRules.jsx` → renders UI feedback based on those rules

The utility file is focused on _what makes a password valid_. The JSX file is focused on _how we explain that to the user_. Mixing JSX into the rules file would blur that boundary and make the logic harder to reuse or test.

## Why We Don’t Put Everything in JSX

It’s tempting to think, “If React supports JSX, why not just use it everywhere?” The answer is separation of concerns.

A file like `passwordRules.js` might be used:

- In a login form
- In a signup form
- In a password reset flow
- In unit tests
- Potentially even on the backend

Because it is written in plain JavaScript, it stays portable and framework-agnostic. JSX, on the other hand, ties a file directly to React rendering. By keeping business rules in `.js` files, we protect them from unnecessary coupling to the UI layer.
If you want to see the working implementation, check out
[ react login series ]({% post_url 2025-12-23-react-login-02-UI-tailwind %}) where we implement passwordRules.js and jsx files.

This is why _mixing file types is not inconsistency — it’s architecture_.

## Enter TypeScript: Why TSX Exists at All

So where does `.tsx` come in?

TypeScript adds a static type system on top of JavaScript. TSX is simply **TypeScript + JSX**. It exists because the moment you start typing props, state, hooks, or context — you need both JSX _and_ types in the same file.

In a login flow, this becomes especially valuable.

A login form deals with:

- User input
- Validation states
- Error responses
- Auth APIs
- Redirect logic

These are all places where bugs tend to hide. Using TSX allows you to _encode expectations directly into the code_. For example, a login component can explicitly state what shape its props have, what kind of error objects it expects, and what values are allowed for form state.

Instead of discovering mistakes at runtime, TypeScript surfaces them while you are coding.

## Why Login Files Are Strong Candidates for TSX

Not every component needs to be TypeScript, but authentication flows are a sweet spot.

Login and password reset files tend to:

- Pass props across multiple components
- Share data with context providers
- Handle API responses with specific shapes
- Change frequently as requirements evolve

Switching these files from `.jsx` to `.tsx` makes the system more resilient. When you update a password rule or change the auth response format, TypeScript forces you to update every affected usage. That may feel strict at first, but it prevents silent breakage.

In contrast, a simple presentational component — a button or a static banner — gains very little from being converted to TSX.

## Why We Still Keep `passwordRules.js` in JavaScript

Even in a TypeScript-heavy codebase, it’s common to keep utility files in plain JavaScript, especially early on.

Your `passwordRules.js` file is:

- Stateless
- Deterministic
- Easy to test
- Unlikely to change frequently

Adding TypeScript there may not provide enough value to justify the extra syntax. In fact, many teams gradually migrate: UI components go TSX first, shared logic later (or never).

This incremental approach avoids “TypeScript paralysis” while still capturing the biggest benefits where they matter most.

## Mixing File Types Is a Signal, Not a Smell

A healthy React codebase often contains:

- `.js` for shared logic and utilities
- `.jsx` for simple UI components
- `.tsx` for complex, stateful, or critical flows

Each extension communicates intent to future developers. When you open a TSX file, you know correctness matters. When you open a JS utility, you know it’s focused logic. When you open JSX, you expect rendering.

The mix is not accidental — it’s a map of complexity.

## Final Thoughts

JSX and TSX are not competing choices; they are tools with different costs and benefits. By keeping password rules in JavaScript, rendering feedback in JSX, and moving login flows to TSX, you’re making deliberate decisions about safety, reuse, and clarity.

The real goal isn’t to “use TypeScript everywhere.” The goal is to **use stronger tools exactly where mistakes are most expensive**.

And authentication is one of those places.

---
