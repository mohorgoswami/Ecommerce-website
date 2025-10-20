# 🚀 Quick Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

**Note**: This application uses Indian Rupees (₹) as the default currency.

## 📥 Installation Steps

### 1. Clone & Setup
```bash
git clone <your-repo-url>
cd Expense-Tracker
```

### 2. Backend Setup
```bash
cd backend
npm install
copy .env.example .env
# Edit .env file with your MongoDB connection string
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
copy .env.example .env
npm start
```

## 🗄️ Database Setup

### Option 1: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service
3. Use default connection: `mongodb://localhost:27017/expense-tracker`

### Option 2: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/atlas
2. Create a free cluster
3. Get connection string
4. Update `MONGODB_URI` in backend/.env

## 🔑 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your-secret-key
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
```

## 🎯 Default Users for Testing

Create a user through the signup form or use these for testing:

**Test User:**
- Email: demo@example.com
- Password: password123

## 📱 Application URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000

## 🚀 Quick Start Commands

```bash
# Start Backend (Terminal 1)
cd backend && npm start

# Start Frontend (Terminal 2)  
cd frontend && npm start
```

## 📋 Task Progress Tracking

| Task | Status | Description |
|------|--------|-------------|
| ✅ 1 | Complete | User Authentication (Signup/Login) |
| ✅ 2 | Complete | Dashboard & Navigation |
| ✅ 3 | Complete | Add Expense Functionality |
| ✅ 4 | Complete | View & List Expenses |
| ✅ 5 | Complete | Edit & Delete Expenses |
| ✅ 6 | Complete | Expense Categories |
| ✅ 7 | Complete | Reports & Analytics |
| 🔄 8 | In Progress | Testing & Documentation |

## 🎯 Learning Objectives Completed

✅ **React.js with Context API** - State management across components  
✅ **Node.js & Express** - RESTful API development  
✅ **MongoDB Integration** - Database operations with Mongoose  
✅ **JWT Authentication** - Secure user authentication  
✅ **CRUD Operations** - Complete expense management  
✅ **Responsive Design** - Bootstrap integration  
✅ **Data Visualization** - Charts and reports  

## 🏆 Features Implemented

### Core Features
- ✅ User registration and login
- ✅ JWT-based authentication
- ✅ Add, edit, delete expenses
- ✅ Expense categorization
- ✅ Date-based filtering
- ✅ Search functionality
- ✅ Dashboard with summary cards
- ✅ Expense analytics and reports
- ✅ Budget tracking
- ✅ Responsive design

### Technical Features
- ✅ Context API for state management
- ✅ Protected routes
- ✅ Form validation
- ✅ Error handling
- ✅ Loading states
- ✅ Toast notifications
- ✅ Pagination
- ✅ Data formatting

## 🐛 Troubleshooting

### Common Issues

**Backend not starting:**
- Check MongoDB connection
- Verify .env file exists
- Check port 5000 is available

**Frontend not connecting:**
- Verify backend is running
- Check REACT_APP_API_URL in .env
- Check browser console for errors

**Database errors:**
- Ensure MongoDB is running
- Check connection string format
- Verify database permissions

## 📚 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Expenses
- `GET /api/expenses` - Get all expenses (with pagination/filters)
- `POST /api/expenses` - Add new expense
- `GET /api/expenses/:id` - Get single expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
- `GET /api/expenses/analytics/summary` - Get expense analytics

## 🎨 Tech Stack Summary

**Frontend:**
- React.js 18
- Context API
- React Router
- Bootstrap 5
- Axios
- React Toastify

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs
- express-validator

## 💡 Next Steps for Enhancement

1. **Data Export** - CSV/PDF export functionality
2. **Budget Alerts** - Email notifications for budget limits
3. **Recurring Expenses** - Automatic expense creation
4. **Multi-currency** - Support for different currencies
5. **Mobile App** - React Native version
6. **Team Expenses** - Shared expense tracking
7. **Receipt Upload** - Image upload for receipts
8. **Advanced Analytics** - More detailed charts and insights

---

**Happy Coding! 🎉** Start with the authentication flow and work through each feature systematically.