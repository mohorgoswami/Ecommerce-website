import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useExpense, EXPENSE_CATEGORIES } from '../../context/ExpenseContext';
import LoadingSpinner from '../Common/LoadingSpinner';

const ExpenseList = () => {
  const {
    expenses,
    getExpenses,
    deleteExpense,
    loading,
    totalPages,
    currentPage,
    filters,
    setFilters
  } = useExpense();

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getExpenses(1, 10);
  }, [filters]);

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

  const handleFilterChange = (filterType, value) => {
    setFilters({ [filterType]: value });
  };

  const handlePageChange = (page) => {
    getExpenses(page, 10);
  };

  const handleDelete = async (id) => {
    await deleteExpense(id);
    getExpenses(currentPage, 10); // Refresh the current page
  };

  const filteredExpenses = expenses.filter(expense =>
    expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && expenses.length === 0) {
    return <LoadingSpinner message="Loading expenses..." />;
  }

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <i className="fas fa-list me-2 text-primary"></i>
          My Expenses
        </h2>
        <Link to="/add-expense" className="btn btn-primary">
          <i className="fas fa-plus me-2"></i>Add Expense
        </Link>
      </div>

      {/* Filters */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-3 mb-3">
              <label className="form-label">Search</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="col-md-3 mb-3">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="all">All Categories</option>
                {EXPENSE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div className="col-md-3 mb-3">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                className="form-control"
                value={filters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
              />
            </div>
            
            <div className="col-md-3 mb-3">
              <label className="form-label">End Date</label>
              <input
                type="date"
                className="form-control"
                value={filters.endDate}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6">
              <div className="d-flex gap-2">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => setFilters({
                    category: 'all',
                    startDate: '',
                    endDate: '',
                    sortBy: 'date',
                    sortOrder: 'desc'
                  })}
                >
                  <i className="fas fa-undo me-1"></i>Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expense List */}
      {filteredExpenses.length > 0 ? (
        <>
          <div className="row">
            {filteredExpenses.map((expense) => (
              <div key={expense._id} className="col-md-6 col-lg-4 mb-3">
                <div className="card expense-card h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div className="d-flex align-items-center">
                        <div 
                          className="rounded-circle p-2 me-2"
                          style={{ backgroundColor: getCategoryColor(expense.category), opacity: 0.2 }}
                        >
                          <i className={`fas ${getCategoryIcon(expense.category)}`} style={{ color: getCategoryColor(expense.category) }}></i>
                        </div>
                        <span className={`badge category-${expense.category.toLowerCase()}`}>
                          {expense.category}
                        </span>
                      </div>
                      <div className="dropdown">
                        <button
                          className="btn btn-sm btn-outline-secondary dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                        >
                          <i className="fas fa-ellipsis-v"></i>
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <Link
                              className="dropdown-item"
                              to={`/edit-expense/${expense._id}`}
                            >
                              <i className="fas fa-edit me-2"></i>Edit
                            </Link>
                          </li>
                          <li>
                            <button
                              className="dropdown-item text-danger"
                              onClick={() => handleDelete(expense._id)}
                            >
                              <i className="fas fa-trash me-2"></i>Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <h5 className="card-title">{expense.title}</h5>
                    <h4 className="text-primary mb-2">{formatCurrency(expense.amount)}</h4>
                    
                    {expense.description && (
                      <p className="card-text text-muted small mb-2">
                        {expense.description.substring(0, 100)}
                        {expense.description.length > 100 && '...'}
                      </p>
                    )}
                    
                    <div className="d-flex justify-content-between align-items-center text-muted small">
                      <span>
                        <i className="fas fa-credit-card me-1"></i>
                        {expense.paymentMethod}
                      </span>
                      <span>
                        <i className="fas fa-calendar me-1"></i>
                        {new Date(expense.date).toLocaleDateString()}
                      </span>
                    </div>
                    
                    {expense.tags && expense.tags.length > 0 && (
                      <div className="mt-2">
                        {expense.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="badge bg-light text-dark me-1">
                            #{tag}
                          </span>
                        ))}
                        {expense.tags.length > 3 && (
                          <span className="text-muted small">+{expense.tags.length - 3} more</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav aria-label="Expense pagination" className="mt-4">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
                
                {[...Array(totalPages)].map((_, index) => (
                  <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      ) : (
        <div className="empty-state">
          <i className="fas fa-receipt"></i>
          <h4>No expenses found</h4>
          <p>
            {searchTerm || filters.category !== 'all' || filters.startDate || filters.endDate
              ? 'Try adjusting your filters to see more results.'
              : 'Start tracking your expenses by adding your first expense.'
            }
          </p>
          <Link to="/add-expense" className="btn btn-primary">
            <i className="fas fa-plus me-2"></i>Add Your First Expense
          </Link>
        </div>
      )}

      {loading && (
        <div className="text-center mt-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;