# 🛒 MyLibrary — Scalable Digital Library System

A production-ready full-stack application built with Next.js App Router, focusing on server-first architecture, performance, and concurrency safety.


## 🔗 Live Demo
https://my-library-dun.vercel.app

## 📦 Repository
https://github.com/Icann09/my-library


## 🚀 Key Highlights

- ⚡ Server-first architecture using React Server Components (RSC)
- 🔐 Secure RBAC enforced at server, layout, and database levels
- 🧠 Concurrency-safe borrowing system (prevents race conditions)
- ⏱ Reliable background jobs with Upstash Workflows (QStash)
- 📉 Reduced client bundle & hydration cost


## 🧠 Engineering Impact

- Eliminated race conditions using database-level constraints + insert-first strategy
- Reduced client-side complexity by moving logic to Server Actions
- Designed serverless-safe background jobs without cron dependency
- Optimized large UI interactions using server/client separation


## 🚩 Problem

- Digital library systems require:
- Secure authentication & role management
- Reliable tracking of borrowing & overdue books
- Background processing for time-based events
- Concurrency safety for simultaneous actions


## ✅ Solution

Built a server-first system that:
- Handles authentication securely via session cookies
- Enforces RBAC entirely on the server
- Uses Server Components & Server Actions for data integrity
- Runs background workflows via QStash for reliability


## 🧩 Key Challenges & Solutions

🔁 Race Condition in Borrowing
- Problem: Multiple users borrowing the same book simultaneously
- Solution:
  - UNIQUE(user_id, book_id) constraint
  - PostgreSQL error handling (23505)
  - Insert-first strategy

⏱ Serverless Scheduling
- Problem: No reliable cron jobs in serverless
- Solution:
  - Upstash QStash workflows
  - Event-driven background execution


## ✨ Features

👤 User
- Authentication (sign up / sign in / sign out)
- Browse & search books
- Borrow books
- Track borrowing activity
- Receive email notifications

🛠 Admin
- Admin dashboard
- Manage books & users
- Approve/reject accounts
- Manage borrow records
- Generate receipts


## 🧱 Architecture

- Server Components → data fetching & protected UI
- Client Components → interactivity
- Server Actions → mutations (no API routes)
- Workflows (QStash) → background jobs


## 🔑 Core Decisions

Server Actions over API Routes
Why:
- Less boilerplate
- Built-in auth
- Type safety
Trade-off:
- Tight coupling to Next.js

RBAC Enforcement
Applied at:
- Layout level
- Server Actions
- Database layer


## 🛠 Tech Stack

- Next.js 14 (App Router)
- React
- Tailwind CSS + Radix UI
- Drizzle ORM + PostgreSQL (Neon)
- NextAuth (Auth)
- Upstash Redis + QStash
- Resend (Emails)
- ImageKit
- Vercel (Deployment)


## 📸 Previews

### 🏠 Home Page
<p align="center">
  <img src="./public/assets/home-page.webp" alt="Home Page" width="800" />
</p>

### 📚 BookId, Search & Profile Pages
<p align="center">
  <img src="./public/assets/booksId-page.webp" alt="Book Id Page" width="380" />
  <img src="./public/assets/search-page.webp" alt="Search Page" width="380" />
  <img src="./public/assets/profile-page.webp" alt="Profile  Page" width="380" />
</p>

### 🧑🏻‍💻 Admin Pages
<p align="center">
  <img src="./public/assets/admin/accounts.webp" alt="Admin Accounts Page" width="380" />
  <img src="./public/assets/admin/books.webp" alt="Admin Books Page" width="380" />
  <img src="./public/assets/admin/borrows.webp" alt="Admin Borrows Page" width="380" />
  <img src="./public/assets/admin/home.webp" alt="Admin Home Page" width="380" />
  <img src="./public/assets/admin/users.webp" alt="Admin Users Page" width="380" />
</p>

### 📧 Emails 
<p align="center">
  <img src="./public/assets/emails/account-approve.webp" alt="Accoint Approve" width="380" />
  <img src="./public/assets/emails/borrow-book.webp" alt="Borrow Book" width="380" />
  <img src="./public/assets/emails/borrow-receipt.webp" alt="Borrow Receipt" width="380" />
  <img src="./public/assets/emails/welcomeback.webp" alt="Welcome Back" width="380" />
</p>


## 🧪 Testing

- Unit tests for core logic
- Manual QA for critical flows

## 🧠 Engineering Highlights

- Implemented database-level concurrency safety using unique constraints (user_id, book_id)
- Prevented race conditions with insert-first pattern and PostgreSQL error handling (23505)
- Enforced RBAC at layout, server action, and database levels
- Optimized data fetching with server components to reduce client bundle size
- Designed background job architecture using QStash for reliable serverless scheduling


## 🚩 Problem Statement
- Managing a digital library requires:
- Clear separation of responsibilities between users and administrators
- Secure authentication and authorization
- Reliable tracking of borrowed books and overdue items
- Time-based notifications that work even when users are inactive
- Traditional client-driven solutions and cron-based jobs are unreliable in serverless environments.


## ✅ Solution Overview
- This application solves these challenges by providing:
- Secure user authentication with session-based cookies
- Role-based access control (RBAC) enforced entirely on the server
- Server-first data fetching and mutations using Server Components and Server Actions
- Background workflows for overdue reminders using Upstash Workflows, enabling reliable, serverless email notifications


## 🧩 Challenges & Solutions

### Handling Duplicate Borrow Requests
Implemented a database-level unique constraint and graceful error handling to prevent race conditions when users attempt to borrow the same book simultaneously.

### Serverless Background Scheduling
Used Upstash QStash to reliably trigger overdue reminder workflows without relying on traditional cron jobs.


## ✨ User Roles & Features
👤 Users
- Sign up / sign in / sign out
- Browse and search books
- Borrow books
- View borrowed books and due dates
- Receive overdue reminder emails
- Track borrowing activity
🛠️ Administrators
- Admin-only dashboard
- Create, edit, and manage books
- Manage users and permissions
- Approve or reject account requests
- Edit borrowing records and statuses
- Generate receipts for borrowed books


## 🛠 Tech Stack
- Next.js 14 – App Router architecture
- React – Frontend framework
- Radix UI – UI components
- Tailwind CSS – Styling
- Drizzle ORM + PostgreSQL – Database
- Image Kit - Image and Video API
- Neon (PostgreSQL) – Database hosting
- NextAuth – Authentication
- Upstash Redis – Rate limiting
- Upstash QStash – Workflows and background jobs
- Resend – Transactional email service
- Sonner – Toast notifications
- Vercel – Deployment


## 🧪 Testing
- Unit testing for utility functions and business logic
- Manual QA for critical user flows (authentication, borrowing)


## 🧱 Architecture Overview
The application is built using a layered, server-first architecture with Next.js App Router.
High-level design:
- Server Components handle data fetching and protected rendering
- Client Components handle UI interactions and local state
- Server Actions manage all mutations (create/update/delete)
- Upstash Workflows handle background tasks (email reminders)


## 🔑 Core Architectural Decisions
1. App Router + Server Components (Server-First)
- Authentication and sensitive data never leave the server
- Reduced client bundle size
- Improved performance and security
2. Session-Based Authentication
- Sessions stored in HttpOnly cookies
- Secure user identification on every request
- No token exposure to the client
3. Role-Based Access Control (RBAC)
- Role validation enforced at:
- Layout level
- Server Actions
- UI checks used only for UX, never security
4. Server Actions for Mutations
- All create/update/delete logic lives on the server
- No API routes required
- Type-safe mutations colocated with business logic
5. URL-Based State & Search
- Filters and search parameters stored in the URL
- Shareable and bookmarkable pages
- Server-rendered data always stays in sync


## 🗄 Database Design
Core tables:
- users
- books
- borrow_records

Key constraint:
UNIQUE (user_id, book_id)


## 🛡 Error Handling
- Graceful server-side error handling in Server Actions
- User-friendly error feedback via toast notifications
- Centralized logging for debugging production issues


## 🔍 Trade-offs & Technical Decisions
Server Actions vs API Routes
Why Server Actions
- Reduced boilerplate
- Automatic server-side authentication
- Type-safe mutations
- Better alignment with App Router
Trade-offs
- Tighter coupling to Next.js
- Less reusable for external consumers (e.g. mobile apps)
- Requires careful optimistic UI handling
Decision
- Server Actions were chosen to prioritize security, maintainability, and developer productivity for a web-only application.


## 📂 Project Structure
app/  
  ├── (public)      → Public routes  
  ├── admin/        → Protected admin routes  
  ├── api/          → Webhooks & integrations  
components/         → UI components (client & server)  
lib/  
  ├── db/           → Drizzle schema & queries  
  ├── auth/         → Authentication logic  
  └── workflows/    → Background job handlers  

 

## 👨‍💻 About Me

I’m Muhammad Kaisan Farasdag, a front-end developer transitioning into full-stack engineering.

I focus on building scalable, performance-oriented applications using modern web technologies.
- GitHub: https://github.com/Icann09
- LinkedIn: https://www.linkedin.com/in/muhammad-kaisan-35a103211
