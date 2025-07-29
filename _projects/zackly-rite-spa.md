---
layout: page
title: Zackly-Rite Appointment Booking App Project
description: A React Based Single Page massage therapist booking application for small business exposure and engagement with clients.
img: assets/img/9.jpg
permalink: /projects/zackly-rite-spa/
importance: 3
category: work
related_publications: false
tags: ["frontend","react","backend", "PHP", "API"]
---


### General Websites Collection
##### Vanilla Site
- [Site A – vanilla](/projects/vanilla)

##### Angular Sites
- [Site B – studio-booker](/projects/studio-booker/)
- [Site C – flashcards](/projects/flashcards/)

##### Wordpress site
- [Site D – crystalhansenartographic.ca](/projects/wp-artographic/)

#### React SPA
- [Site E - zackly-rite-spa] (/projects/zackly-rite-spa/)
- [Site F – chartcom](/projects/chartcom/)
- [Site G – crystalhansenartographicv1 ](/projects/crystalhansenartographic/)


---


### Introduction

This is a React-based single-page application (SPA) designed to allow users to book massage therapy appointments with Zackly-Rite. The app provides a calendar interface to select dates, displays real-time available time slots from the PHP-API repo as a backend, and includes a secure booking form with validation. As this site is rather simplistic, SPA is the best approach. 

The front end utilizes clean Bootstrap styling while the back end is powered by a structured custom PHP API, which integrates with a Java-based Bookit system for seamless cross-platform coordination.

The booking system uses GET methods for simplicity, alongside front-end and back-end token validation to prevent duplicate bookings within the same session. For administration, a FullCalendar.js interface allows for real-time appointment management, with an optional Google Calendar integration in development to offer flexible syncing and alternate administrative access.

Additional tools include PHPMailer for transactional email handling and google-api-php-client for managing calendar synchronization. The system emphasizes clarity, reliability, and modularity—ideal for solo practitioners or small teams seeking a lightweight, custom booking solution. Please visit https://zackly-rite.ca



---

### 🔗 Live Demo

👉 [View Live Demo ](https://zackly-rite.ca)

---

## ✨ Features

- 📅 **Interactive Calendar**: Pick a booking date
- ⏰ **Real-Time Availability**: Fetches booked times from the backend and disables them
- 📋 **Client Form with Validation**: Form includes Yup + `react-hook-form` for first name, last name, phone, and email
- 🤖 **Google reCAPTCHA**: For spam protection (v2)
- ✅ **Booking Confirmation**: Stores booking and redirects to a confirmation page
- 🌐 **SEO-Ready**: `React Helmet` integration for better meta handling
- ⚙️ **Environment Config**: API URLs are set through `.env` for flexibility

---
## Project Image Gallery
The below screenshots capture some of the modules and components built that visually help relate the modules and features designed and implemented within the site. 
They represent some areas that are exclusive the the Artog.co ecosystem. The list and images are non-exhaustive. 

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/zackly-rite/zackly-rite-logo.png" title="Zackly-rite logo" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/zackly-rite/zackly-rite-calendar.png" title="Calendar View" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/zackly-rite/day-available.png" title="Day Availablity View" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The above set of images are front end displays relative to the code behind for the links to github repository.
  On the left we have the header and logo of the site, Middle image is the calendar display with first days available via greyout, todays date hightligted, Right image we have the day availability screen 
</div>

This site is a one page website that encompasess a booking interface for the bookit java spring boot implementation. 
<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/zackly-rite/booking-details.png" title="Booking Details" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/zackly-rite/booking-details-alert.png" title="Booking Details captured from form" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
   The most interesting thing about this website is the booking integration using a vanilla php api to connect the interface with the backend storage
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/zackly-rite/confirmation-screen.png" title="Confirmation Screen" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/zackly-rite/appointment-confirmation-number.png" title="Confirmation Number alert" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/zackly-rite/email-confirmation-view.png" title="Email Client Confirmation" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

### 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Routing**: React Router DOM
- **Form Handling**: react-hook-form + Yup
- **Backend API**: PHP with REST endpoints
- **Security**: Google reCAPTCHA v2
- **Meta Tags**: React Helmet
- **Deployment**: GitHub Pages

---

### 🚀 Getting Started

#### 1. Clone the Repo

```bash
git clone https://github.com/cryshansenn/zackly-rite-spa.git
cd zackly-rite-spa
