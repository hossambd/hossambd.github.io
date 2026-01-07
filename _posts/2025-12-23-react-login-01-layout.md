---
layout: post
title: React Login Series - Design and Integrate Tailwind UI  | Part 2a
date: 2025-12-22 
description: Part 2, React Login Feature walks through creating and implementing the UI using tailwind components available online to source.
tags: [ react, login , authentication, auth, UI ]
categories: [ react-posts, auth, react-login-series ]
giscus_comments: false
related_posts: true
related_publications: false
featured: false
mermaid:
  enabled: true
  zoomable: true
code_diff: true

---

### Intro + Series Context 

This post covers the UI of the React Login Feature Series, where we incorporate Tailwind UI components, heroicons and the general signin/signup Authentication UI of our drop in feature. Building a drop in Feature like this is a critical re-use system component for most applications available on the app development market that is requiring logins. The start of this series takes you through installations of react app and the general structure and routing. In this part of the series we look at the UI components we will build for the feature pages and forms.

→ Series overview: /blog/react-login/

For this post we can access the github tree to have up-to-date code from our last post and branch post-1a-routing-branch creation [ github routing ](https://github.com/cryshansen/login-feature-react/tree/post/post-1a-routing-branch).

Our last post instructions created the shell layout routing and pages, your folder structure should look like this;

```text
src/
  ├─ app/
  │   ├─ App.jsx
  │   └─ Router.jsx

  └─ features/
      └─ auth/
        ├─ components/
        |    ├─ elements/
        |    |  ├─ AccountDropdown.jsx  
        |    |  └─ AuthBackground.jsx 
        |    |  └─ DarkModeButton.jsx 
        |    ├─ forms/
        |    |  ├─ LoginForm.jsx  <- new component we will create
        |    |  └─ SignupForm.jsx   <- new component we will create                            
        |    ├─ layout/
        |      ├─ AuthLayout.jsx
        |      ├─ AuthFacingHeader.jsx
        |      ├─ HeaderTopLevel.jsx        
        |      └─ AuthFacingFooter.jsx
        ├─ pages/
        │  ├─ ConfirmEmailPage.jsx
        │  ├─ ConfirmResetPage.jsx              
        │  ├─ LoginPage.jsx
        │  ├─ NotFoundPage.jsx  
        │  ├─ ProfilePage.jsx     
        │  ├─ RequestResetPage.jsx              
        │  └─ SignupPage.jsx
  └─ main.jsx
```

Next, we’ll:

- Build the Login & Signup UI and other components
- Introduce basic animation with Framer Motion
- Discuss JSX vs TSX (and when to switch)


This layout section will be Include:

  - Login
  - Signup
  - Confirm email
  - Password reset
  - Profile Page / update
  - Not Found Page for dead routes.


Key idea:
Pages compose components — components do not know about routes.

---

### The Auth Layout Concept
An aditional design concept offers a specific background using a gradient or background image. This is another design element that offers a few upgrades to branding necessary with a dropin.

Every auth screen shares:

  - Centered content
  - Soft background
  - Brand-safe visuals
  - Clear focus on the forms

Each page contains a Background component
Visual Diagram:
```text
┌────────────────────────────────────┐
│   gradient / ambient background    │
│                                    │
│        ┌─────────────────┐         │
│        │  Auth Card      │         │
│        │                 │         │
│        │  Form content   │         │
│        │                 │         │
│        └─────────────────┘         │
│                                    │
└────────────────────────────────────┘
```

This stays consistant across flows. What we can also do is define a background surface for any design elements and wrap each page within it.


```jsx 
export default function AuthBackground({ title, children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* ambient background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-600/30 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-pink-600/20 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950" />
      </div>

      {/* content */}
      <div className="relative flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-md rounded-2xl bg-slate-900/80 p-8 shadow-xl backdrop-blur">
          <h1 className="mb-6 text-center text-2xl font-semibold">
            {title}
          </h1>

          {children}
        </div>
      </div>
    </div>
  );
}
``` 

---

### Why This Matters

- Layout logic is centralized
- Auth pages stay thin
- Visual consistency is guaranteed
- No layout duplication
- No styling decisions here
- This page is purely compositional


In this section we now open the pages individually and copy the react code into these pages. Lets start with the LoginPage.jsx. Navigate to the tailwind demos and copy the signin code: 
https://tailwindcss.com/plus/ui-blocks/application-ui/forms/sign-in-forms

Select 
- Code, 
- React - Dropdown, 
- v3.4 and copy the code.

If you replace the entire code, you need to rename the export to LoginPage(){} under `export default function Example(){` 

---

### Layout LoginPage.jsx

This page handles the react layout components to display within the page. We can paste this copy into the LoginPage.jsx as is and carry on however the best architecture is to separate the page and form components. So, the form separate from the pages will look like this:

```jsx
//LoginPage.jsx

import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";


import AuthBackground from "../components/elements/AuthBackground";
import LoginForm from "../components/forms/LoginForm";


export default function LoginPage({ darkMode }) {

  const navigate = useNavigate();
return (

 <AuthBackground darkMode={darkMode}>
          <h1 className="text-3xl font-semibold text-center text-white mb-6">
            Welcome Back 🌿
          </h1>
        <div
          className={`p-8 rounded shadow-sm backdrop-blur-md border
            mt-10 sm:mx-auto sm:w-full sm:max-w-sm border border-gray-300 rounded-lg p-8 
          ${darkMode
            ? "bg-slate-900/60 border-slate-700"
            : "bg-gray-50/50 border-slate-200/70"
          }`}
        >
          <LoginForm darkMode={darkMode} />
          <div className="text-center mt-4 text-sm">
            <Link to="/reset" className="text-indigo-600 hover:underline">
              Forgot your password?
            </Link>
          </div>
        </div>
        <div className="text-center mt-4 text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-indigo-600 hover:underline">
              Create one
            </Link>
          </div>
      </AuthBackground>
);
}
```

---

#### Minimal LoginForm - For Layout Only

For this set in our series we will focus on the higher levels of our code. The walkthrough is intended to illustrate how to use template and include them in your app creation but you may choose to jump ahead to see the final form components separated by function in the 02 UI Tailwind but for now, we are using the code straight as a demo. At this point, there is No validation yet No API calls yet and we will be splitting the form up a lot in future posts. So for now grab the easiest Tailwind UI login form from [Tailwind UI Sign-in ](https://tailwindcss.com/plus/ui-blocks/application-ui/forms/sign-in-forms). We also add eye heroicons for showing and hiding passwords. if you need the install it is `npm install @heroicons/react`.

```jsx
import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";


export default function LoginForm({ darkMode }) {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

  };
 
  return (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
                  Email address
              </label>
              <div className="mt-2">
                  <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
              </div>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-100">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  autoComplete="on"
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 pr-10
                    text-base text-white outline outline-1 -outline-offset-1 outline-white/10
                    placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2
                    focus:outline-indigo-500 sm:text-sm/6"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 bg-transparent
                    text-gray-400 hover:text-gray-200"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center ">
                  <input  id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 border rounded border border-white/10 bg-white/5 text-indigo-500 accent-indigo-500 focus:-outline-offset-2 focus:outline-indigo-500 hover:bg-indigo-500"/>
                  <label htmlFor="checked-checkbox" className="select-none ms-2 text-sm font-medium text-heading text-white">Remember me.</label>
                  <div className="text-sm flex-1 text-right">
                      <Link to="/reset" className="font-semibold text-indigo-400 hover:text-indigo-300">
                          Forgot password?
                      </Link>
                  </div>
              </div>
            <div>
              <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                  Sign in
              </button>
              </div>
          </form>
  );
}
```


This form with be copied and some input fields later are pulled out to expand on components that have scale and non repetitive code.

---

#### Signup Page and Form 

We copy the Login layout of `LoginPage.jsx` into the `SignupPage.jsx` and `LoginForm.jsx` into `SignupForm.jsx`. The difference between these two forms is the double entry of passwords / confirm passwords and name fields. We will add these fields into the form. We will cover extracting some fields into components later in our series but for now, we will build the shell of these forms in this post. 

Open The SignupPage.jsx and Open the LoginPage.jsx and copy the content. 

```jsx
import React,{ useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignupForm from "../components/forms/SignupForm";

export default function SignupPage({ darkMode }) {
  return (
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-800">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                  alt="Your Company"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  className="mx-auto h-10 w-auto"
              />
              <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your account</h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border  border-white/10 rounded-lg p-8 bg-gray-900 backdrop-blur-sm">
              
              <SignupForm darkMode={darkMode} />

              <p className="mt-10 text-center text-sm/6 text-gray-400">
                 Already a member?{' '}
                  <Link to="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">
                      Login in
                  </Link>
              </p>

          </div>
      </div>
  );
}

```


#### Layout SignupForm.jsx

This page handles the react layout components to display within the page. We can paste this copy into the LoginPage.jsx as is and carry on however the best architecture is to separate the page and form components.  Under the SignupPage change the references and import to use the signupform.We change the reference of <LoginForm > tag for the <SignupForm >.So, the form separate from the pages will look like this: 

```jsx
import React,{ useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function SignupForm({ darkMode }) {
  
  const navigate = useNavigate();

  const user = { firstname:"Bob",lastName:"Smith", email:"test@test.com", password:1234 }
  const [firstName, setFirstName] = useState(user?.firstname || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState(user?.password || "");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState(null);
  darkMode = true; // temp for testing

  const passwordsMatch = password.length > 0 && confirm.length > 0 && password === confirm;
  //clearAuthMessage();

  const handleSubmit = async (e) => {
   
  };

  return (
  
        <form className="space-y-5 " onSubmit={handleSubmit}>

          {/* Name First, Last  */}
          <div>
            <label className="block mb-1 font-medium block text-sm/6 font-medium text-gray-100">Firstname</label>

            <input
                placeholder="Firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
  
                  ${darkMode
                    ? "bg-slate-700"
                    : "bg-white"
                  }     
                  `}
              />
          </div>          
          <div>
              <label className="block mb-1 font-medium block text-sm/6 font-medium text-gray-100">Lastname</label>
              <input
                placeholder="Lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={`block w-full rounded bg-white/5
                            px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 
  
                  ${darkMode
                    ? "bg-slate-700"
                    : "bg-white"
                  }   
                  `}
              />
          </div>
          {/* Email */}
          <div>
            <label className="block mb-1 font-medium block text-sm/6 font-medium text-gray-100">Email</label>
            <input
              type="email"
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              value={email}
              autoComplete="on"
              onChange={(e) => setEmail(e.target.value)}
               
            />
          </div>
           {/* Password */}
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-100">
                  Password
                </label>       
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    autoComplete="on"
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 pr-10
                      text-base text-white outline outline-1 -outline-offset-1 outline-white/10
                      placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2
                      focus:outline-indigo-500 sm:text-sm/6"
                  />       
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 bg-transparent
                      text-gray-400 hover:text-gray-200"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>

              </div>
            {/* Confirm Password */}
            <div className="mt-4">
              <label className="block mb-1 text-sm font-medium text-gray-100">
                Confirm Password
              </label>
   
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirm}
                  autoComplete="on"
                  onChange={(e) => setConfirm(e.target.value)}
                  className={`block w-full rounded-md bg-white/5 px-3 py-1.5 pr-10
                    text-base text-white outline outline-1 -outline-offset-1 outline-white/10
                    placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2
                    sm:text-sm/6
                    ${
                      confirm && !passwordsMatch
                        ? "outline-red-400 focus:outline-red-400"
                        : "focus:outline-indigo-500"
                    }`}
                />    
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 bg-transparent
                    text-gray-400 hover:text-gray-200"
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          <button
            type="submit"
            disabled={!passwordsMatch}
            className={`flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-400
                        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              ${
                    passwordsMatch
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }
              `}
          >
            Sign Up
          </button>
        </form>
  );
}

```

Also note the addition of firstname / last name fields and view password toggles `setShowPassword` and `setShowConfirmPassword`. In this form we need the passwords to equal each other so we place some flags `passwordsMatch` to manage it. 


---

#### Whats Built

At this stage:

- Inputs are uncontrolled
- State comes later
- Layout comes first

Why Layout Comes First

Starting with layout gives us:

- A shared visual system
- A reusable auth shell
- Fewer refactors later

Later when we add:

- Validation
- Loading states
- Error messages
- API calls

…the layout does not change.


--- 

This is the best moment to take out the passwords of these two forms and create one component for each field. Our next post covers extracting the fields and finalizing these two forms in terms of UI features. We will go to [Extracting Password Inputs]({% post_url 2026-01-03-react-login-extracting-password-inputs-components %})


This post is pushed to our github repo branch [Post 2a Design UI](https://github.com/cryshansen/login-feature-react/tree/post/post-2a-design-ui).




