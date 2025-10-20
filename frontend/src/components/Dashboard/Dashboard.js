import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useExpense } from '../../context/ExpenseContext';
import LoadingSpinner from '../Common/LoadingSpinner';

const Dashboard = () => {
  const { user } = useAuth();
  const { expenses, getExpenses, getAnalytics, analytics, loading } = useExpense();
  const [recentExpenses, setRecentExpenses] = useState([]);

  useEffect(() => {
    // Fetch recent expenses and analytics
    getExpenses(1, 5); // Get 5 most recent expenses
    getAnalytics(new Date().getFullYear(), new Date().getMonth() + 1); // Current month analytics
  }, []);

  useEffect(() => {
    setRecentExpenses(expenses.slice(0, 5));
  }, [expenses]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Food': 'fa-utensils',
      'Transportation': 'fa-car',
      'Entertainment': 'fa-film',
      'Shopping': 'fa-shopping-bag',
      'Bills': 'fa-file-invoice-dollar',
      'Healthcare': 'fa-heartbeat',
      'Education': 'fa-graduation-cap',
      'Travel': 'fa-plane',
      'Other': 'fa-ellipsis-h'
    };
    return icons[category] || 'fa-ellipsis-h';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Food': '#ff6b6b',
      'Transportation': '#4ecdc4',
      'Entertainment': '#45b7d1',
      'Shopping': '#f9ca24',
      'Bills': '#f0932b',
      'Healthcare': '#eb4d4b',
      'Education': '#6c5ce7',
      'Travel': '#a29bfe',
      'Other': '#74b9ff'
    };
    return colors[category] || '#74b9ff';
  };

  if (loading) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  return (
    <div className="container mt-4">
      {/* Welcome Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h3 mb-2">Welcome back, {user?.name}! 👋</h1>
              <p className="text-muted mb-0">Here's your expense overview for this month</p>
            </div>
            <Link to="/add-expense" className="btn btn-primary">
              <i className="fas fa-plus me-2"></i>Add Expense
            </Link>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card dashboard-card">
            <div className="card-body text-center">
              <i className="fas fa-calendar-alt fa-2x mb-3"></i>
              <h5>This Month</h5>
              <h3>{formatCurrency(analytics.totalAmount || 0)}</h3>
              <small>{analytics.totalCount || 0} expenses</small>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <div className="card dashboard-card">
            <div className="card-body text-center">
              <i className="fas fa-chart-line fa-2x mb-3"></i>
              <h5>Total Expenses</h5>
              <h3>{formatCurrency(user?.totalExpenses || 0)}</h3>
              <small>All time</small>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <div className="card dashboard-card">
            <div className="card-body text-center">
              <i className="fas fa-wallet fa-2x mb-3"></i>
              <h5>Budget</h5>
              <h3>{formatCurrency(user?.totalBudget || 0)}</h3>
              <small>
                {user?.totalBudget ? 
                  `${((analytics.totalAmount / user.totalBudget) * 100).toFixed(1)}% used` : 
                  'Not set'
                }
              </small>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <div className="card dashboard-card">
            <div className="card-body text-center">
              <i className="fas fa-tags fa-2x mb-3"></i>
              <h5>Categories</h5>
              <h3>{analytics.categoryBreakdown?.length || 0}</h3>
              <small>This month</small>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Recent Expenses */}
        <div className="col-lg-8 mb-4">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">
                <i className="fas fa-clock me-2"></i>Recent Expenses
              </h5>
              <Link to="/expenses" className="btn btn-sm btn-outline-primary">
                View All
              </Link>
            </div>
            <div className="card-body">
              {recentExpenses.length > 0 ? (
                <div className="list-group list-group-flush">
                  {recentExpenses.map((expense) => (
                    <div key={expense._id} className="list-group-item border-0 px-0">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div 
                            className="rounded-circle p-2 me-3"
                            style={{ backgroundColor: getCategoryColor(expense.category), opacity: 0.2 }}
                          >
                            <i className={`fas ${getCategoryIcon(expense.category)}`} style={{ color: getCategoryColor(expense.category) }}></i>
                          </div>
                          <div>
                            <h6 className="mb-1">{expense.title}</h6>
                            <small className="text-muted">
                              {expense.category} • {new Date(expense.date).toLocaleDateString()}
                            </small>
                          </div>
                        </div>
                        <div className="text-end">
                          <h6 className="mb-0">{formatCurrency(expense.amount)}</h6>
                          <small className="text-muted">{expense.paymentMethod}</small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <i className="fas fa-inbox"></i>
                  <h4>No expenses yet</h4>
                  <p>Start tracking your expenses by adding your first expense.</p>
                  <Link to="/add-expense" className="btn btn-primary">
                    <i className="fas fa-plus me-2"></i>Add Your First Expense
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="col-lg-4 mb-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="fas fa-chart-pie me-2"></i>Category Breakdown
              </h5>
            </div>
            <div className="card-body">
              {analytics.categoryBreakdown && analytics.categoryBreakdown.length > 0 ? (
                <div>
                  {analytics.categoryBreakdown.slice(0, 5).map((category) => (
                    <div key={category._id} className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex align-items-center">
                        <div 
                          className="rounded-circle p-1 me-2"
                          style={{ backgroundColor: getCategoryColor(category._id), opacity: 0.2 }}
                        >
                          <i className={`fas ${getCategoryIcon(category._id)} text-dark`} style={{ fontSize: '0.8rem' }}></i>
                        </div>
                        <span>{category._id}</span>
                      </div>
                      <div className="text-end">
                        <div>{formatCurrency(category.totalAmount)}</div>
                        <small className="text-muted">
                          {((category.totalAmount / analytics.totalAmount) * 100).toFixed(1)}%
                        </small>
                      </div>
                    </div>
                  ))}
                  <Link to="/reports" className="btn btn-sm btn-outline-primary w-100 mt-2">
                    View Detailed Reports
                  </Link>
                </div>
              ) : (
                <div className="text-center py-4">
                  <i className="fas fa-chart-pie fa-3x text-muted mb-3"></i>
                  <p className="text-muted">No category data available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="fas fa-bolt me-2"></i>Quick Actions
              </h5>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-md-3 mb-3">
                  <Link to="/add-expense" className="btn btn-outline-primary w-100">
                    <i className="fas fa-plus fa-2x mb-2 d-block"></i>
                    Add Expense
                  </Link>
                </div>
                <div className="col-md-3 mb-3">
                  <Link to="/expenses" className="btn btn-outline-success w-100">
                    <i className="fas fa-list fa-2x mb-2 d-block"></i>
                    View All
                  </Link>
                </div>
                <div className="col-md-3 mb-3">
                  <Link to="/reports" className="btn btn-outline-info w-100">
                    <i className="fas fa-chart-bar fa-2x mb-2 d-block"></i>
                    Reports
                  </Link>
                </div>
                <div className="col-md-3 mb-3">
                  <Link to="/profile" className="btn btn-outline-secondary w-100">
                    <i className="fas fa-user fa-2x mb-2 d-block"></i>
                    Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;