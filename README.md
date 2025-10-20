# 💰 Expense Tracker Project

A full-stack expense tracking application built with React.js (Context API), Node.js, Express, and MongoDB. Track your expenses in Indian Rupees (₹).

## 🎯 Project Overview

This project is divided into manageable tasks/modules that progressively build a complete expense tracking application:

### 📋 Task List & Progress

| Task | Description | Status | Max Score |
|------|-------------|--------|-----------|
| 1️⃣ | **User Authentication** - Signup & Login | ⏳ Pending | 100 |
| 2️⃣ | **Dashboard Setup** - Basic UI Structure | ⏳ Pending | 75 |
| 3️⃣ | **Add Expenses** - Create new expense entries | ⏳ Pending | 100 |
| 4️⃣ | **View Expenses** - List all expenses | ⏳ Pending | 75 |
| 5️⃣ | **Edit/Delete Expenses** - Manage existing expenses | ⏳ Pending | 100 |
| 6️⃣ | **Expense Categories** - Categorize expenses | ⏳ Pending | 75 |
| 7️⃣ | **Reports & Analytics** - Charts and insights | ⏳ Pending | 125 |
| 8️⃣ | **Data Export** - Download expense reports | 🔒 Locked | 50 |

**Total Score: 700 points**

## 🛠️ Tech Stack

- **Frontend**: React.js with Context API
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS/Bootstrap (simple and clean)

## 📁 Project Structure

```
Expense-Tracker/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Expense.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── expenses.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   ├── Dashboard/
│   │   │   ├── Expenses/
│   │   │   └── Layout/
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   └── ExpenseContext.js
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.js
│   └── package.json
└── README.md
```

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Expense-Tracker
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   # Create .env file with your MongoDB connection string
   npm start
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

## 📚 Task Implementation Guide

### Task 1: User Authentication System
- **Goal**: Create signup and login functionality
- **Features**: User registration, login, logout, JWT authentication
- **Files to work on**: `backend/routes/auth.js`, `frontend/components/Auth/`

### Task 2: Dashboard Setup
- **Goal**: Create the main dashboard layout
- **Features**: Navigation, user profile display, logout option
- **Files to work on**: `frontend/components/Dashboard/`, `frontend/context/AuthContext.js`

### Task 3: Add Expenses
- **Goal**: Allow users to add new expenses
- **Features**: Expense form, category selection, amount validation
- **Files to work on**: `backend/routes/expenses.js`, `frontend/components/Expenses/AddExpense.js`

### Task 4: View Expenses
- **Goal**: Display all user expenses in a list
- **Features**: Expense list, filtering, sorting
- **Files to work on**: `frontend/components/Expenses/ExpenseList.js`

### Task 5: Edit/Delete Expenses
- **Goal**: Manage existing expenses
- **Features**: Edit expense details, delete expenses
- **Files to work on**: `frontend/components/Expenses/EditExpense.js`

### Task 6: Expense Categories
- **Goal**: Categorize expenses for better organization
- **Features**: Category creation, expense categorization, category-wise filtering
- **Files to work on**: `backend/models/Expense.js`, frontend category components

### Task 7: Reports & Analytics
- **Goal**: Provide expense insights and charts
- **Features**: Monthly/yearly reports, category-wise breakdown, charts
- **Files to work on**: `frontend/components/Reports/`

### Task 8: Data Export
- **Goal**: Export expense data
- **Features**: CSV/PDF export, date range selection
- **Files to work on**: Backend export routes, frontend export components

## 🎨 Features Overview

### Core Features
- ✅ User authentication (signup/login)
- ✅ Add, edit, delete expenses
- ✅ Categorize expenses
- ✅ View expense history
- ✅ Search and filter expenses
- ✅ Expense analytics and reports

### Bonus Features
- 📊 Charts and graphs
- 📅 Date range filtering
- 💾 Data export (CSV/PDF)
- 🎯 Budget tracking
- 📱 Responsive design

## 🔧 Environment Variables

Create `.env` files in both frontend and backend directories:

**Backend (.env)**
```
MONGODB_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your-secret-key
PORT=5000
```

**Frontend (.env)**
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Expenses
- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Add new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**Happy Coding! 🚀** 

Start with Task 1 (User Authentication) and work your way through each task systematically.
