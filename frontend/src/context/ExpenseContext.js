import React, { createContext, useContext, useReducer } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ExpenseContext = createContext();

// Initial state
const initialState = {
  expenses: [],
  currentExpense: null,
  loading: false,
  error: null,
  totalExpenses: 0,
  totalPages: 1,
  currentPage: 1,
  filters: {
    category: 'all',
    startDate: '',
    endDate: '',
    sortBy: 'date',
    sortOrder: 'desc'
  },
  analytics: {
    categoryBreakdown: [],
    totalAmount: 0,
    totalCount: 0
  }
};

// Categories list
export const EXPENSE_CATEGORIES = [
  'Food',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Bills',
  'Healthcare',
  'Education',
  'Travel',
  'Other'
];

export const PAYMENT_METHODS = [
  'Cash',
  'Credit Card',
  'Debit Card',
  'Bank Transfer',
  'Digital Wallet',
  'Other'
];

// Expense reducer
const expenseReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'GET_EXPENSES_SUCCESS':
      return {
        ...state,
        expenses: action.payload.expenses,
        totalExpenses: action.payload.totalExpenses,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        loading: false,
        error: null
      };
    case 'GET_EXPENSE_SUCCESS':
      return {
        ...state,
        currentExpense: action.payload,
        loading: false,
        error: null
      };
    case 'ADD_EXPENSE_SUCCESS':
      return {
        ...state,
        expenses: [action.payload, ...state.expenses],
        loading: false,
        error: null
      };
    case 'UPDATE_EXPENSE_SUCCESS':
      return {
        ...state,
        expenses: state.expenses.map(expense =>
          expense._id === action.payload._id ? action.payload : expense
        ),
        currentExpense: action.payload,
        loading: false,
        error: null
      };
    case 'DELETE_EXPENSE_SUCCESS':
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense._id !== action.payload),
        loading: false,
        error: null
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };
    case 'GET_ANALYTICS_SUCCESS':
      return {
        ...state,
        analytics: action.payload,
        loading: false,
        error: null
      };
    case 'EXPENSE_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'CLEAR_CURRENT_EXPENSE':
      return {
        ...state,
        currentExpense: null
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

// Expense provider component
export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  // Get all expenses
  const getExpenses = async (page = 1, limit = 10) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const { category, startDate, endDate, sortBy, sortOrder } = state.filters;
      
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sortBy,
        sortOrder
      });
      
      if (category && category !== 'all') {
        params.append('category', category);
      }
      
      if (startDate) {
        params.append('startDate', startDate);
      }
      
      if (endDate) {
        params.append('endDate', endDate);
      }

      const res = await axios.get(`/api/expenses?${params}`);
      
      if (res.data.success) {
        dispatch({
          type: 'GET_EXPENSES_SUCCESS',
          payload: res.data.data
        });
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch expenses';
      dispatch({
        type: 'EXPENSE_ERROR',
        payload: message
      });
      toast.error(message);
    }
  };

  // Get single expense
  const getExpense = async (id) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const res = await axios.get(`/api/expenses/${id}`);
      
      if (res.data.success) {
        dispatch({
          type: 'GET_EXPENSE_SUCCESS',
          payload: res.data.data.expense
        });
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch expense';
      dispatch({
        type: 'EXPENSE_ERROR',
        payload: message
      });
      toast.error(message);
    }
  };

  // Add expense
  const addExpense = async (expenseData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const res = await axios.post('/api/expenses', expenseData);
      
      if (res.data.success) {
        dispatch({
          type: 'ADD_EXPENSE_SUCCESS',
          payload: res.data.data.expense
        });
        toast.success('Expense added successfully!');
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add expense';
      dispatch({
        type: 'EXPENSE_ERROR',
        payload: message
      });
      toast.error(message);
      return { success: false, message };
    }
  };

  // Update expense
  const updateExpense = async (id, expenseData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const res = await axios.put(`/api/expenses/${id}`, expenseData);
      
      if (res.data.success) {
        dispatch({
          type: 'UPDATE_EXPENSE_SUCCESS',
          payload: res.data.data.expense
        });
        toast.success('Expense updated successfully!');
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update expense';
      dispatch({
        type: 'EXPENSE_ERROR',
        payload: message
      });
      toast.error(message);
      return { success: false, message };
    }
  };

  // Delete expense
  const deleteExpense = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      try {
        const res = await axios.delete(`/api/expenses/${id}`);
        
        if (res.data.success) {
          dispatch({
            type: 'DELETE_EXPENSE_SUCCESS',
            payload: id
          });
          toast.success('Expense deleted successfully!');
          return { success: true };
        }
      } catch (error) {
        const message = error.response?.data?.message || 'Failed to delete expense';
        dispatch({
          type: 'EXPENSE_ERROR',
          payload: message
        });
        toast.error(message);
        return { success: false, message };
      }
    }
  };

  // Get analytics
  const getAnalytics = async (year, month = null) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const params = new URLSearchParams({ year: year.toString() });
      if (month) {
        params.append('month', month.toString());
      }

      const res = await axios.get(`/api/expenses/analytics/summary?${params}`);
      
      if (res.data.success) {
        dispatch({
          type: 'GET_ANALYTICS_SUCCESS',
          payload: res.data.data
        });
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch analytics';
      dispatch({
        type: 'EXPENSE_ERROR',
        payload: message
      });
      toast.error(message);
    }
  };

  // Set filters
  const setFilters = (filters) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: filters
    });
  };

  // Clear current expense
  const clearCurrentExpense = () => {
    dispatch({ type: 'CLEAR_CURRENT_EXPENSE' });
  };

  // Clear errors
  const clearErrors = () => {
    dispatch({ type: 'CLEAR_ERRORS' });
  };

  const value = {
    ...state,
    getExpenses,
    getExpense,
    addExpense,
    updateExpense,
    deleteExpense,
    getAnalytics,
    setFilters,
    clearCurrentExpense,
    clearErrors
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};

// Custom hook to use expense context
export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
};