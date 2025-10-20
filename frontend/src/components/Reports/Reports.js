import React, { useEffect, useState } from 'react';
import { useExpense } from '../../context/ExpenseContext';
import LoadingSpinner from '../Common/LoadingSpinner';

const Reports = () => {
  const { getAnalytics, analytics, loading } = useExpense();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [viewType, setViewType] = useState('monthly'); // 'monthly' or 'yearly'

  useEffect(() => {
    if (viewType === 'monthly') {
      getAnalytics(selectedYear, selectedMonth);
    } else {
      getAnalytics(selectedYear);
    }
  }, [selectedYear, selectedMonth, viewType]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
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

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  if (loading) {
    return <LoadingSpinner message="Loading reports..." />;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <i className="fas fa-chart-bar me-2 text-primary"></i>
          Expense Reports
        </h2>
      </div>

      {/* Filter Controls */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row align-items-end">
            <div className="col-md-3 mb-3">
              <label className="form-label">View Type</label>
              <select
                className="form-select"
                value={viewType}
                onChange={(e) => setViewType(e.target.value)}
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            <div className="col-md-3 mb-3">
              <label className="form-label">Year</label>
              <select
                className="form-select"
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {viewType === 'monthly' && (
              <div className="col-md-3 mb-3">
                <label className="form-label">Month</label>
                <select
                  className="form-select"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                >
                  {months.map((month, index) => (
                    <option key={index} value={index + 1}>{month}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="col-md-3 mb-3">
              <button
                className="btn btn-outline-primary w-100"
                onClick={() => {
                  if (viewType === 'monthly') {
                    getAnalytics(selectedYear, selectedMonth);
                  } else {
                    getAnalytics(selectedYear);
                  }
                }}
              >
                <i className="fas fa-sync me-2"></i>Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card dashboard-card">
            <div className="card-body text-center">
              <i className="fas fa-dollar-sign fa-2x mb-3"></i>
              <h5>Total Amount</h5>
              <h3>{formatCurrency(analytics.totalAmount || 0)}</h3>
              <small>
                {viewType === 'monthly' 
                  ? `${months[selectedMonth - 1]} ${selectedYear}`
                  : selectedYear
                }
              </small>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-3">
          <div className="card dashboard-card">
            <div className="card-body text-center">
              <i className="fas fa-receipt fa-2x mb-3"></i>
              <h5>Total Expenses</h5>
              <h3>{analytics.totalCount || 0}</h3>
              <small>Number of transactions</small>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-3">
          <div className="card dashboard-card">
            <div className="card-body text-center">
              <i className="fas fa-calculator fa-2x mb-3"></i>
              <h5>Average per Expense</h5>
              <h3>
                {analytics.totalCount > 0 
                  ? formatCurrency(analytics.totalAmount / analytics.totalCount)
                  : formatCurrency(0)
                }
              </h3>
              <small>Per transaction</small>
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="row">
        <div className="col-lg-8 mb-4">
          <div className="chart-container">
            <h5 className="mb-4">
              <i className="fas fa-chart-pie me-2"></i>Category Breakdown
            </h5>
            
            {analytics.categoryBreakdown && analytics.categoryBreakdown.length > 0 ? (
              <div className="row">
                {analytics.categoryBreakdown.map((category, index) => (
                  <div key={category._id} className="col-md-6 mb-3">
                    <div className="card h-100">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-2">
                          <div 
                            className="rounded-circle p-2 me-3"
                            style={{ backgroundColor: getCategoryColor(category._id), opacity: 0.2 }}
                          >
                            <i 
                              className={`fas ${getCategoryIcon(category._id)}`} 
                              style={{ color: getCategoryColor(category._id) }}
                            ></i>
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="mb-0">{category._id}</h6>
                            <small className="text-muted">{category.count} expenses</small>
                          </div>
                        </div>
                        
                        <div className="mb-2">
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="fw-bold">{formatCurrency(category.totalAmount)}</span>
                            <span className="text-muted">
                              {((category.totalAmount / analytics.totalAmount) * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="progress mt-1" style={{ height: '6px' }}>
                            <div 
                              className="progress-bar" 
                              style={{ 
                                width: `${(category.totalAmount / analytics.totalAmount) * 100}%`,
                                backgroundColor: getCategoryColor(category._id)
                              }}
                            ></div>
                          </div>
                        </div>
                        
                        <small className="text-muted">
                          Avg: {formatCurrency(category.avgAmount || 0)}
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5">
                <i className="fas fa-chart-pie fa-3x text-muted mb-3"></i>
                <h5>No Data Available</h5>
                <p className="text-muted mb-0">
                  No expenses found for the selected period.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="col-lg-4 mb-4">
          <div className="chart-container">
            <h5 className="mb-4">
              <i className="fas fa-info-circle me-2"></i>Summary
            </h5>
            
            <div className="list-group list-group-flush">
              <div className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  <i className="fas fa-calendar me-2 text-primary"></i>
                  Period
                </span>
                <strong>
                  {viewType === 'monthly' 
                    ? `${months[selectedMonth - 1]} ${selectedYear}`
                    : selectedYear
                  }
                </strong>
              </div>
              
              <div className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  <i className="fas fa-tags me-2 text-success"></i>
                  Categories
                </span>
                <strong>{analytics.categoryBreakdown?.length || 0}</strong>
              </div>
              
              <div className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  <i className="fas fa-receipt me-2 text-info"></i>
                  Total Expenses
                </span>
                <strong>{analytics.totalCount || 0}</strong>
              </div>
              
              <div className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  <i className="fas fa-dollar-sign me-2 text-warning"></i>
                  Total Amount
                </span>
                <strong>{formatCurrency(analytics.totalAmount || 0)}</strong>
              </div>
            </div>

            {analytics.categoryBreakdown && analytics.categoryBreakdown.length > 0 && (
              <div className="mt-4">
                <h6 className="mb-3">Top Category</h6>
                <div className="card">
                  <div className="card-body text-center">
                    <div 
                      className="rounded-circle p-3 mx-auto mb-2"
                      style={{ 
                        backgroundColor: getCategoryColor(analytics.categoryBreakdown[0]._id), 
                        opacity: 0.2,
                        width: '60px',
                        height: '60px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <i 
                        className={`fas ${getCategoryIcon(analytics.categoryBreakdown[0]._id)} fa-lg`}
                        style={{ color: getCategoryColor(analytics.categoryBreakdown[0]._id) }}
                      ></i>
                    </div>
                    <h6>{analytics.categoryBreakdown[0]._id}</h6>
                    <p className="text-primary mb-0">
                      {formatCurrency(analytics.categoryBreakdown[0].totalAmount)}
                    </p>
                    <small className="text-muted">
                      {analytics.categoryBreakdown[0].count} expenses
                    </small>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;