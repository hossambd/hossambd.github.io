---
layout: post
title: Login Series Adding a Password Strength Meter in React  | Part 2c
description: Layering password strength validation into reusable auth components
date: 2026-01-02
tags: [ react, auth, validation, ui-components, ux ] 
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

This post expands upon the password input components post[ Password Input Components ]({% post_url 2026-01-03-react-login-extracting-password-inputs-components %}) where we separate password fields from the base forms to scale our feature. Extract the github [ Login Feature Part 2b ](https://github.com/cryshansen/login-feature-react/tree/post/2b-extracting-passwords) to pick up where we left off in our series.


Once password inputs were properly abstracted, adding a **password strength indicator** became obvious and straightforward. 

The key decision was *where* this logic should live.

- ❌ Not in the login form
- ❌ Not in a shared password utility that runs everywhere
- ✅ Inside the **new password creation flow**

This post documents how I added a password strength feature without breaking component boundaries.

---

### Strength ≠ Validation

Before writing code, it helped to separate concerns:

| Concept | Purpose |
|------|------|
| Validation | Is the password acceptable? |
| Strength | How good is the password? |
| Matching | Do both inputs agree? |

Strength is **feedback**, not enforcement.

---

### The Rules (Simple, Explainable)

I intentionally avoided overcomplicated scoring.

Strength is based on:

- Length
- Uppercase letters
- Numbers
- Symbols

These same signals are already useful for validation.

---

### Step 1: Strength Utility (Pure Logic)

 `utils/passwordStrength.js`

```js
export function getPasswordStrength(password) {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  return {
    score,
    label: ["Weak", "Fair", "Good", "Strong", "Very Strong"][score],
  };
}
```

This function:

- Has no UI knowledge
- Is easy to test
- Can evolve independently

---

### Step 2: Strength Meter UI

components/forms/PasswordStrengthMeter.jsx
```jsx
export default function PasswordStrengthMeter({ strength }) {
  const colors = [
    "bg-red-400",
    "bg-orange-400",
    "bg-yellow-400",
    "bg-green-400",
    "bg-emerald-500",
  ];

  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded
              ${i < strength.score ? colors[strength.score] : "bg-gray-200"}
            `}
          />
        ))}
      </div>

      <p className="mt-1 text-xs text-gray-400">
        Strength: <span className="font-medium">{strength.label}</span>
      </p>
    </div>
  );
}

``` 
This component is:

- Stateless
- Reusable
- Visual-only

---

### Step 3: Integrate Into ConfirmPasswordFields

Strength applies only to new password creation.
```jsx
import { getPasswordStrength } from "../utils/passwordStrength";
import PasswordStrength from "./PasswordStrength";
```

Inside the component:
```jsx
const strength = getPasswordStrength(password);
```

Render it under the new password field:
```jsx
<PasswordStrength strength={strength} />

```

Open the `ConfirmPasswordFields.jsx` file to include our new component. 
The final file will look like this:

```jsx
//ConfirmPasswordFields.jsx
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import PasswordRules from "./PasswordRules";
import {getPasswordRules} from "../utils/passwordRules";

import PasswordStrengthMeter from "./PasswordStrengthMeter";
import {getPasswordStrength} from "../utils/passwordStrength";

export default function ConfirmPasswordFields({
  password,
  setPassword,
  confirm,
  setConfirm,
  showConfirm = true,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [touched, setTouched] = useState(false);

  const rules = getPasswordRules(password, confirm);
  const strength = getPasswordStrength(password);

  const passwordsMatch = password && confirm && password === confirm;

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
            onFocus={() => setTouched(true)}
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

Important:
This is not rendered for login or current-password fields.

---

### Step 4: Signup Form Enforcement (Optional)

Strength does not block input by default.

If you want to enforce minimum strength:
```js
//SigninForm.jsx

  const canSubmit = passwordsMatch && strength.score >=3 && firstName && lastName && email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(canSubmit){
       //do something
     }
  };

```

This allows:

- UX feedback without hard rejection
- Progressive enhancement later

---

### Why This Architecture Works

- Strength logic is isolated
- UI is composable
- No state duplication
- Login remains untouched
- Reset and signup benefit automatically

This feature was added without refactoring existing forms — a sign the abstraction was correct.

---

### UX Philosophy

I intentionally avoided:

- Aggressive red warnings
- Blocking keystrokes
- Overly strict rules

Password strength should guide, not punish.



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
        |    |  ├─ ConfirmPasswordFields.jsx  <- Adjust
        |    |  ├─ LoginForm.jsx 
        |    |  ├─ PasswordField.jsx  
        |    |  ├─ PasswordRules.jsx  
        |    |  ├─ PasswordStrengthMeter.jsx  <- new component we will create                         
        |    |  └─ SignupForm.jsx                         
        |    ├─ layout/
        |      ├─ AuthLayout.jsx
        |      ├─ AuthFacingHeader.jsx
        |      ├─ HeaderTopLevel.jsx        
        |      └─ AuthFacingFooter.jsx
        |    ├─ utils/
        |      ├─ passwordRules.jsx 
        |      └─ passwordStrength.jsx <- new component we will create   
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


---

### Final Thoughts

Adding password strength late in development usually causes pain. In this case, it didn’t — because the password inputs were already designed around clear responsibilities. That’s the payoff of good component boundaries. This post is pushed to our github Part 2c repo branch [Post Password Strength UI](https://github.com/cryshansen/login-feature-react/tree/post/2c-password-strength-meter).


The next post in this series [ UI Tailwind part 2d ]({% post_url 2025-12-23-react-login-02-UI-tailwind %}) will cover the remaining pages, forms  and links in greater detail and will finalize the UI components of the login feature. These pages and associated forms are covering this login application flow in production systems. We approached building components in the same way as the login/signup. 