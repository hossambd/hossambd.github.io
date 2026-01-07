---
layout: post
title: Extracting Password Inputs in React (Login, Signup, Reset) | Part 2b
description: Designing reusable password components for different authentication flows
date: 2026-01-03
tags: [ react, login , signup,  authentication, auth, UI , tailwind UI, ui-components, architecture ] 
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
### Introduction

Building upon our Login Feature Series, we take this time to extract reusable components that we can easily drop into other pages use cases and app flows. Extract the github [ Login Feature part 2a ](https://github.com/cryshansen/login-feature-react/tree/post/post-2a-design-ui) to pick up where we left off in our [ last post ]({% post_url 2025-12-23-react-login-01-layout %}).

After completing our Login and Signup layouts and forms, we need now to split the form fields into components that are reusable and scaleable setting our code up for reuse in Reseting Passwords or rating the strength of a password. Here we will cover how we will assess and extract the passwords using the signup form specifically. 

---

#### Usage Examination 
When building authentication flows, **password inputs look similar but behave very differently** depending on context.

A login form needs *one* password.  
A signup form needs *two*.  
A reset password flow often needs *three*.

Trying to force all of these into a single component quickly leads to confusing state, broken visibility toggles, and validation bugs.

This post documents how I separated password concerns into **two reusable components** and how that decision simplified my Login, Signup, and Reset Password flows.

---

### The Problem: One Password Component Doesn’t Scale

Early on, I tried to reuse the same password component everywhere. That approach broke down fast:

- Show/hide toggles affected the wrong field
- Validation logic leaked across screens
- Reset password flows felt especially awkward

The core issue was **semantic overload** — one component was trying to represent too many workflows.

---

### The Abstraction: Two Components, Clear Roles

I ended up deciding on **two password components**, each with a single responsibility. `PasswordField.jsx` — Singular Password Input capturing non-conditional.

Used anywhere a **single password value** is required:

- Login
- Current password (reset/change)
- Admin re-auth prompts

**Responsibilities:**
- Owns its own show/hide toggle
- No cross-field validation
- Clean, predictable UX

This component is intentionally dumb. It does one thing well.

---

#### Signup Form: Where Separation Matters

Signup is where complexity belongs. Here it is intentionally use ConfirmPasswordFields, because:

- Password rules apply
- Matching matters
- UX feedback is expected


Useful architectural decisions:

- Why rules live here (not login)
- How validation is derived, not stored
- How UI state stays local to the component


---

####  Paired Password Inputs

Based on our abstraction of fields and their useage, we create the ConfirmPasswordFields file within the forms folder. The code will follow the rules and application flow of usability all in one place. The rules are what we need to observe below.

Used when a password must be set or confirmed:

- Signup
- Reset password
- Set password after invite

** Responsibilities:**

- New password + confirm password
- Independent visibility toggles
- Match validation
- Optional password rules UI

This component owns:

- Pair-level logic
- Cross-field validation
- Visual feedback

---

#### Build the Confirm Password Architecture

Open or create the below files. We need two subcomponents to handle password rules and interface handling so we set this up also. 

```jsx
//PasswordRules.jsx

function Rule({ valid, children }) {
  return (
    <li
      className={`flex items-center gap-2 text-sm
        ${valid ? "text-green-400" : "text-gray-400"}
      `}
    >
      <span>{valid ? "✓" : "•"}</span>
      {children}
    </li>
  );
}

export default function PasswordRules({ rules }) {
  return (
    <ul className="mt-2 space-y-1">
      <Rule valid={rules.length}>At least 8 characters</Rule>
      <Rule valid={rules.uppercase}>One uppercase letter</Rule>
      <Rule valid={rules.number}>One number</Rule>
      {"match" in rules && (
        <Rule valid={rules.match}>Passwords match</Rule>
      )}
    </ul>
  );
}

```

Create or open a file with the name of passwordRules.js save under the utilities folder `auth/components/utils` and copy the below code. 
```js
//utils/passwordRules.js
export function getPasswordRules(password, confirm) {
  return {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    match: confirm.length === 0 ? null : password === confirm
  };
}

export function isPasswordValid(rules) {
  return Object.values(rules).every(Boolean);
}

```

---

#### The Base Confirm Password Fields

This file is the predominant handler of all confirm Password form requirements. It covers some form use States which we have yet to cover however in the interest of copying additional pages and this section does not handle validation of submissions we are leaving the useState in at this stage. 

```jsx
//ConfirmPasswordFields.jsx
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import PasswordRules from "./PasswordRules";
import {getPasswordRules} from "../utils/passwordRules";


export default function ConfirmPasswordFields({
  password,
  setPassword,
  confirm,
  setConfirm,
  showConfirm = true,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const rules = getPasswordRules(password, confirm);

  const passwordsMatch =
    password && confirm && password === confirm;

  return (
    <>
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
        <PasswordStrengthMeter strength={strength} />
      </div>

      {/* Confirm Password */}
      {showConfirm && (
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

          {password && (

            <PasswordRules rules={rules} />

          )}
        </div>
      )}
    </>
  );
}


```

---

#### Login Form: Simpler and Safer

We also removed the password in the login form as discussed above, it is also a duplicated field in the reset password flow requiring the use of all three fields. Furthermore this particular field is non-conditional in validation nature in both the login and reset password pages. Lets abstract this field also.

```jsx
// PasswordField.jsx
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
/**
 * 
 * @param {darkMode="bolean", label="Password",value+"",onChange="{e.target.value}", error, autocomplete ="current-password"} param0 
 * @returns 
 */
export default function PasswordInput({
    darkMode,
    label,
    value,
    onChange,
    error,
    autoComplete,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="">
      {/* Label */}
      <label className="block mb-1 text-sm font-medium text-gray-100">
        {label}
      </label>
        <div className="relative">
            {/* Input */}
            <input
                type={showPassword ? "text" : "password"}
                value={value}
                autoComplete={autoComplete}
                onChange={(e) => onChange(e.target.value)}
                className={`block w-full rounded-md bg-white/5 px-3 py-1.5 pr-10
                text-base text-white outline outline-1 -outline-offset-1 outline-white/10
                placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2
                sm:text-sm/6
                ${
                    error
                    ? "outline-red-400 focus:outline-red-400"
                    : "focus:outline-indigo-500"
                }
                `}
            />

            {/* Eye toggle */}
            <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-1 right-0 flex items-center bg-transparent py-3 px-3 text-gray-400 hover:text-gray-200"
            >
                {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
                ) : (
                <EyeIcon className="h-5 w-5" />
                )}
            </button>
        </div>
      {/* Error text */}
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

```
--- 

#### Why this works better:

- No confirm logic
- No password rules
- No shared visibility state

The login UI became smaller and more robust. This change is documented in the Login blog post, which focuses on simplicity and correctness.

--- 

#### Repace Signup and Sign in 

Open the `LoginForm.jsx` and replace the password field with the below code:
```jsx
// LoginForm.jsx usage 
<PasswordField
  label="Password"
  value={password}
  onChange={setPassword}
  autoComplete="current-password"
/>
```
Open the `SignupForm.jsx` and replace the password/confirm password fields with the new components code:

```jsx
//SignupForm.jsx usage 
<ConfirmPasswordFields
  password={password}
  setPassword={setPassword}
  confirm={confirm}
  setConfirm={setConfirm}
  showConfirm
/>
```

---

#### Key Takeaway: Compose, Don’t Overload

Trying to make a single “do-everything” password component caused more bugs than it solved.

The winning approach was:

- Small, focused components
- Composition at the form level
- Derived validation, not shared state

This structure scales cleanly as auth requirements grow. Lets look at the architecture.

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
        |    |  ├─ ConfirmPasswordFields.jsx  <- new component we will create
        |    |  ├─ LoginForm.jsx  <- adjust 
        |    |  ├─ PasswordField.jsx  <- new component we will create
        |    |  ├─ PasswordRules.jsx  <- new component we will create                   
        |    |  └─ SignupForm.jsx   <- adjust                         
        |    ├─ layout/
        |      ├─ AuthLayout.jsx
        |      ├─ AuthFacingHeader.jsx
        |      ├─ HeaderTopLevel.jsx        
        |      └─ AuthFacingFooter.jsx
        |    ├─ utils/
        |      └─ passwordRules.jsx <- new component we will create         
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



Access to this posts code resides in [Github Part 2b](https://github.com/cryshansen/login-feature-react/tree/post/2b-extracting-passwords) 

---

#### What’s Next

Future improvement in User Centric implementations, signups also typically handle an Authentication [Password Strength Meter]({% post_url 2026-01-02-react-authentication-adding-password-strength-meter %}) to add to our user engagement responses and indicators. After this we will have a strong foundation of components. Sometimes the right abstraction isn’t fewer components — it’s clearer ones. 





