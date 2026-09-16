# 🎫 Full-Stack Support Ticket Management System

Welcome to my Helpdesk Management platform! I built this project to solve a real-world workflow problem: helping clients report technical issues smoothly while giving developers a clean, organized dashboard to manage, track, and resolve those issues without the chaos of direct emails or phone calls.

Instead of writing a traditional monolithic application, I challenged myself to build a **Decoupled Architecture**. The React frontend and the Core PHP backend live in entirely separate environments and talk to each other cleanly over the cloud using JSON data payloads.

---

## 🛠️ The Tech Stack

- **Frontend:** React (powered by Vite) for a lightning-fast Single Page Application (SPA).
- **Styling:** Bootstrap 5 for a clean, fully responsive UI that looks great on mobile, tablet, and desktop screens.
- **Icons & Alerts:** Lucide React for modern UI icons and React Hot Toast for slick, asynchronous notifications.
- **Backend:** Core PHP (Procedural Engine) serving as a headless REST API.
- **Database:** Aiven MySQL Cloud Instance holding our relational tables.
- **Deployment & DevOps:** Containerized via Docker, hosted on Render (Backend) and Vercel (Frontend), with GitHub Push Protection active to keep secrets secure.

---

## 🌟 Key Features I Engineered

### ⚡ Headless API & Decoupled Design
The React interface acts completely independently of the backend code. They cross paths safely over the network via asynchronous `fetch()` calls. This means the PHP backend is highly reusable—if I wanted to build a mobile app tomorrow, it could plug into this exact same API without rewriting any backend code!

### 🔒 Strict Role-Based Portal Isolation
I built a split login system. Users can toggle between the **Client Portal** and the **Admin Terminal**:
- **Clients** get an intuitive form to submit tickets and can only view their own past issue history.
- **Developers** sign into a master queue dashboard where they can see all open requests across the platform, modify ticket lifecycles (`Open` ➡️ `In Progress` ➡️ `Resolved`), and submit resolution notes back to the client.

### 🛡️ Parameterized Security (PDO)
To ensure production-grade security, I didn't mix raw variables into my database queries. I utilized **PHP Data Objects (PDO) with Prepared Statements** to safely isolate user inputs, completely neutralizing the risk of SQL Injection attacks.

### 👁️ Seamless User Experience
I integrated Lucide React visibility icons so users can toggle their password inputs (view/hide). Additionally, when developers commit status updates, the data updates instantly on the screen with real-time feedback spinners, skipping the annoying need for manual browser page refreshes.

---

## 🚀 What I Learned Building This

This project pushed me far past basic coding tutorials. By deploying it to production, I learned how to deal with real-world infrastructure challenges, including:
1. Configuring **CORS (Cross-Origin Resource Sharing)** rules so servers on completely different host domains can share resources securely.
2. Building custom **Dockerfiles** to deploy procedural PHP environments smoothly onto modern cloud platforms like Render.
3. Managing cloud relational databases securely over encrypted parameters.

---
## 📂 Project Structure

```text
ticket-system-portfolio/
│
├── frontend/          # React (Vite) Single Page Application UI
│   ├── src/           # Components (ClientLogin, AdminLogin, Dashboard, App)
│   └── package.json
│
└── backend/           # Headless PHP REST API & Database Scripts
    ├── Dockerfile     # Server container configurations
    ├── config.php     # Secure PDO Cloud database link
    ├── login.php      # User validation router
    └── tickets.php    # CRUD engine for ticket streams
```
