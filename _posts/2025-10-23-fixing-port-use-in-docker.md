---
layout: post
title: Fixing Port 8080 Already In Use in Docker - A DevOps Walkthrough
date: 2025-10-23 01:59:00
description: this is what included image galleries could look like
tags: devops spring boot docker ports
categories: devops-posts
---


 🐳 Fixing “Port 8080 Already in Use” in Docker — A DevOps Walkthrough

## Introduction

If you’ve ever spun up a new Docker container for a Spring Boot app and hit the dreaded error:
Error response from daemon: ports are not available: exposing port TCP 0.0.0.0:8080 -> 127.0.0.1:0: listen tcp 0.0.0.0:8080: bind: address already in use


You’re not alone. This happens when another process—often a previously running Spring Boot or Mailhog container—is already using **port 8080**.  

In this quick DevOps walkthrough, we’ll cover how to diagnose, fix, and prevent this conflict — both for local development and when deploying multiple services via Docker Compose.

---

## ⚙️ Problem Overview

Docker containers expose internal application ports (like `8080` for Spring Boot) to your host system.  
When that port is already taken, Docker can’t bind it, and the build fails with a port conflict.

We’ll fix this using three main strategies:
1. Kill the process that’s using the port.  
2. Remap the container port in `docker-compose.yml`.  
3. Reassign your Spring Boot app to a different port in `application.properties`.

---

## 🔍 Step 1: Identify What’s Using Port 8080

Run this command to see which process is holding the port:

```bash
sudo lsof -i :8080
```
Example output:
```nginx
java     54123 crystalhansen   45u  IPv6 0x...  TCP *:8080 (LISTEN)
```

Take note of the PID (process ID).

## 🔪 Step 2: Kill the Conflicting Process

Stop it manually using:
```bash
kill -9 54123
```

Replace 54123 with the PID you saw above.
Once done, retry your Docker build:

docker compose up --build


✅ If everything starts cleanly, your container should now bind correctly to port 8080.

🔁 Step 3: Change the Port Mapping (Optional)

If you want to keep the other app running, just map your new container to a different external port in your docker-compose.yml.
```yaml
services:
  app:
    build: .
    ports:
      - "9090:8080"
```

This means:

Inside the container → app still listens on 8080

On your host → access it at http://localhost:9090

## 🧱 Step 4: Change the App Port in Spring Boot

You can also change the port directly in your application.properties:
```nginx
server.port=9090
```

This permanently moves your app off 8080, preventing future conflicts both locally and in CI/CD pipelines.

## 💡 Step 5: Pro Tip — Multi-Service Docker Compose Setup

If you’re running multiple microservices, give each one a dedicated external port in your Docker Compose file.
```yaml
services:
  user-service:
    build: ./user
    ports:
      - "8081:8080"

  email-service:
    build: ./email
    ports:
      - "8082:8080"

  gateway:
    build: ./gateway
    ports:
      - "8080:8080"
```

Now each container maps safely to a unique external port, even though they all use the same internal port (8080).

## 🧠 Summary Table
Scenario	Solution
Another app using port 8080	Kill the process with lsof and kill
You want to run multiple apps	Change the Docker port mapping
You want to change default app port	Set server.port in application.properties

## 🧩 Bonus: Add to Your DevOps Toolkit

When working with Docker-based microservices:

Standardize port mapping conventions (e.g., backend apps → 8080–8099, mail services → 8025)

Use .env variables for ports to avoid hardcoding values

Automate cleanups with docker compose down -v to free ports and remove volumes

## ✨ Conclusion

Port conflicts are one of the most common issues developers face when running multiple Docker containers locally.
By learning how to identify, kill, or remap conflicting processes, you can streamline your workflow and run multiple microservices side by side with zero friction.

🚀 Try applying this to your own Spring Boot or Mailhog setup to build a stable, reusable local DevOps environment.

Tags: Docker • DevOps • Spring Boot • Microservices • Troubleshooting




"""