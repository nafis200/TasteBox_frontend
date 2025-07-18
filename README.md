# 🍱 TasteBox – Personalized Meal Planning & Delivery

# ✨ Project Overview

TasteBox is a full-stack Meal Planning & Delivery Web Application that allows users to personalize their meal plans and receive timely deliveries based on dietary preferences and schedules. Customers can browse curated meal options, set preferences (vegan, keto, gluten-free, etc.), and schedule deliveries. Meal providers can efficiently manage menus, view and respond to customer orders, and tailor offerings to individual needs. The platform is designed with a clean, responsive UI and robust role-based access control to ensure a seamless experience for all users.



- [@🌐Live Site: TasteBox Frontend](https://meal-shop-frontend.vercel.app/) 
- [@🗃️Frontend GitHub: TasteBox Frontend Repo](https://github.com/nafis200/portfolio-backend) 
- [@🗃️Backend GitHub: TasteBox Backend Repo](https://github.com/nafis200/assignment-6-frontend) 


# 🔍 Key Features

1. 🔐 User Authentication

Custom login system using email/phone + password.

JWT (JSON Web Tokens) for session handling.

Password hashing with bcrypt for security.

2. 🧑‍🍳 Role-Based Dashboards

Customer Dashboard:

Select meal plans, track orders, manage preferences.

Meal Provider Dashboard:

Manage menus, respond to orders, track deliveries.

3. 🍽️ Meal Selection & Preferences

Customers can filter by dietary needs (vegan, keto, etc.).

Meal providers can define ingredients, pricing, portion sizes.

4. 🔍 Smart Search & Match

Customers can search meals by rating, preference, cuisine.

Providers see orders filtered by matching criteria.

5. 🛡️ Role-Based Access Control

Separate routes and views for customers and providers.

Protected routes for authentication-required pages.



# ⚖️ Authentication & Middleware

JWT for user session management

bcrypt for secure password encryption

Custom middleware.ts for protected route access based on roles

# 📱 UI/UX Design Principles

Responsive Design: Fully mobile-optimized

Modern UI: Tailwind CSS + Shadcn

User-Friendly: Simple forms, clean navigation, dark mode ready




# 🧪 Tech Stack Used

# Frontend

Framework: Next.js (with App Router)

Language: TypeScript

UI: React.js, Tailwind CSS, Shadcn/ui

State Management: Redux Toolkit

Routing & Forms: Next Navigation, React Hook Form

Authentication: JWT

# Backend (Connected via API)

Runtime: Node.js

Framework: Express.js

Database: MongoDB (via Mongoose)

Security: bcrypt, JWT

# 📂 Folder Structure Overview

/src
 ┣ 📁 app              # Next.js pages & routing (App Router)
 ┣ 📁 components       # All UI components
 ┣ 📁 constants        # Static constant values
 ┣ 📁 context          # Global context API usage
 ┣ 📁 hooks            # Custom React hooks
 ┣ 📁 lib              # Utility functions
 ┣ 📁 providers        # Context or layout providers
 ┣ 📁 redux            # Redux slices & store setup
 ┣ 📁 services         # API call services
 ┣ 📁 types            # TypeScript types
 ┗ 🔴 middleware.ts    # Route protection middleware

Root Directory:
 ┣ 🔴 .env.local       # Environment variables (NEXT_PUBLIC_BASE_API)
 ┣ 🔴 next.config.js   # Next.js configuration
 ┣ 🔴 tsconfig.json    # TypeScript configuration
 ┣ 🔴 next-env.d.ts    # Auto-generated for TS support

# 🚧 Project Setup & Installation

1. Clone the Repository

git clone https://github.com/nafis200/TasteBox_frontend.git
cd TasteBox_frontend

2. Install Dependencies

npm install

3. Set Up env varriables

Create a .env.local file in the root directory and add the following line

NEXT_PUBLIC_BASE_API=http://localhost:5000

4. Run the Development Server

npm run dev


# 👨‍💼 Author

Nafis Ahamed📧 Email: nafisahamed14@gmail.com🌐 Portfolio: https://portfoliouser.vercel.app/