# 📚 BookWise

BookWise is a **university library management solution** that enables students to borrow, return, and manage books online.  
It provides a clean interface, authentication system, and activity tracking to make library management more efficient.

---

## ✨ Features

- 🔐 **Authentication** with NextAuth (secure login/logout, sessions)   
- 📖 **Book Management** (browse, search, filter, borrow, onboarding workflow)  
- 👤 **Admin Dashboard** with activity logs (create, remove, edit books and users) 
- 📅 **Daily User Activity Tracking** (auto-updates last activity date)  
- 📱 **Responsive UI** (works across desktop and mobile)  

---

## 🛠 Tech Stack

- [Next.js 14](https://nextjs.org/) – App Router architecture  
- [React](https://react.dev/) – Frontend framework  
- [Radix UI](https://www.radix-ui.com/) – UI components  
- [Tailwind CSS](https://tailwindcss.com/) – Styling  
- [Drizzle ORM](https://orm.drizzle.team/) + PostgreSQL – Database
- [Image Kit](https://imagekit.io/) - Image and Video API  
- [Neon (PostgreSQL)](https://www.neon.com/) – Database hosting  
- [NextAuth](https://next-auth.js.org/) – Authentication  
- [Upstash Redis](https://upstash.com/) – Rate limiting  
- [Upstash QStash](https://upstash.com/) – Workflows and background jobs  
- [Resend](https://resend.com/) – Transactional email service  
- [Sonner](https://sonner.emilkowal.ski/) – Toast notifications  
- [Vercel](https://vercel.com/) – Deployment  

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/Icann09/my-library.git
cd my-library


Set up environment variables in .env.local:
  DATABASE_URL=your_postgres_connection
  AUTH_SECRET=your_auth_secret
  NEXTAUTH_URL=http://localhost:3000
  REDIS_URL=your_upstash_redis_url
  RESEND_API_KEY=your_resend_api_key
  QSTASH_URL=your_qstash_url
