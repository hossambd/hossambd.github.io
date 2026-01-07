---
layout: post
title: "Getting Started with React: A Modern Step-by-Step Guide"
date: 2026-01-02
description: "A practical tutorial for creating a React app using modern tooling like Vite, hooks, and functional components."
tags: [react, javascript, frontend, vite, web-development]
categories: [frontend]
---

React has evolved significantly over the years. Today, building a React application is faster, simpler, and more enjoyable thanks to modern tooling and best practices.

In this guide, we’ll walk through creating a React app **from scratch**, using **Vite**, functional components, and hooks. This tutorial is ideal for developers who want a clean, modern setup without unnecessary complexity.

---

## Prerequisites

Before getting started, make sure you have:

- **Node.js (v18 or later)**
- **npm** (comes with Node)

Check your versions:

```bash
node -v
npm -v
```

If you need to install Node.js, download it from
👉 https://nodejs.org

### Creating a New React App with Vite

Vite is now the recommended way to scaffold React apps. It’s fast, lightweight, and aligns with the modern React ecosystem.


#### 🛠 Project Setup
1. Create the Vite App
```bash
  npm create vite@latest
```

Choose the following options:

- Project name: your-app-name
- Framework: React
- Variant: JavaScript + React Compiler
- Use rolldown-vite: No
- Install dependencies: Yes

```text
> npx
> create-vite

│
◇  Project name:
│  your-app-name
│
◇  Select a framework:
│  React
│
◇  Select a variant:
│  JavaScript + React Compiler
│
◇  Use rolldown-vite (Experimental)?:
│  No
│
◇  Install with npm and start now?
│  Yes
```

{: .note }
⚠️ Node engine warnings during Vite setup are expected if you’re on Node 18.
They do not block development for this series. try `nvm use 22` in this case.

Then run:

```bash
  npm create vite@latest  
  your-app-name
  cd your-app-name
  npm install
  npm run dev

```


Open the local URL shown in your terminal (usually http://localhost:5173).
Your React app is now running.

---


### Understanding the Project Structure

A fresh Vite + React project looks like this:
```text
my-react-app/
├── index.html
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   └── assets/
├── package.json
└── vite.config.js
```

#### Key Files Explained

| File	            | Purpose |
|------------------------------|
| index.html        | Single-page HTML entry |
| main.jsx          | React entry point |
| App.jsx           | Root component |
| package.json      | Dependencies & scripts |
|-------------------------------|

---

### How React Renders Your App 

React starts in main.jsx:
```jsx 
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

This tells React to render the <App /> component inside the #root element defined in index.html.

---

### Your First Component

Open App.jsx and replace its contents with:
```jsx
export default function App() {
  return (
    <div>
      <h1>Hello React 👋</h1>
      <p>This is my first React app.</p>
    </div>
  );
}
```

A few things to note:

- Components are functions

- JSX looks like HTML but is actually JavaScript

- Components must return one parent element

### Adding State with useState

State allows components to change over time.

```jsx
import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```
---

#### What’s happening here?

- count is the current state value
- setCount updates the value
- Updating state causes React to re-render the component

---

### Handling Events

React events are written in camelCase:
```jsx
function handleClick() {
  console.log("Button clicked");
}

<button onClick={handleClick}>Click me</button>
```
---

### Passing Data with Props

Props let you pass data into components.
```jsx
function Greeting({ name }) {
  return <h2>Hello {name}!</h2>;
}
```

Usage:
```jsx
<Greeting name="World" />
<Greeting name="React" />
```

Props are read-only and flow downward.

---

### Conditional Rendering

React lets you conditionally render UI easily:
```jsx
{isLoggedIn ? <Dashboard /> : <Login />}
```

Or:
```jsx
{items.length === 0 && <p>No items found</p>}
```

---

### Rendering Lists

```jsx
const fruits = ["Apple", "Banana", "Cherry"];

<ul>
  {fruits.map(fruit => (
    <li key={fruit}>{fruit}</li>
  ))}
</ul>

``` 

⚠️ Always include a unique key when rendering lists.

---

### Fetching Data with useEffect

```jsx
import { useEffect, useState } from "react";

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

```

- useEffect runs after render
- An empty dependency array ([]) means it runs once on mount

--- 

### Adding Routing with React Router

Install React Router:
```bash
npm install react-router-dom
```

Basic routing setup:
```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
```

Navigation links:
```jsx
import { Link } from "react-router-dom";

<Link to="/login">Login</Link>
```
--- 

### Styling Your App

React supports many styling approaches:

- Plain CSS
- CSS Modules
- Tailwind CSS
- Styled Components

Simple example:

```jsx
import "./App.css";
```

```css
h1 {
  color: rebeccapurple;
}
```

---

### Building for Production

When you’re ready to deploy:
```bash
npm run build

```

This creates a dist/ folder containing static assets that can be deployed to:

- Netlify
- Vercel
- AWS S3
- Spring Boot static resources
- Nginx

---

### Final Thoughts

React’s strength lies in its simplicity and composability. With modern tools like Vite and hooks, it’s never been easier to build fast, maintainable user interfaces.

