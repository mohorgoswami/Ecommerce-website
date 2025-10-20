import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useExpense, EXPENSE_CATEGORIES, PAYMENT_METHODS } from '../../context/ExpenseContext';
import LoadingSpinner from '../Common/LoadingSpinner';

const EditExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getExpense, updateExpense, currentExpense, loading } = useExpense();

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    description: '',
    date: '',
    paymentMethod: 'Cash',
    tags: ''
  });

  useEffect(() => {
    if (id) {
      getExpense(id);
    }
  }, [id]);

  useEffect(() => {
    if (currentExpense) {
      setFormData({
        title: currentExpense.title || '',
        amount: currentExpense.amount?.toString() || '',
        category: currentExpense.category || '',
        description: currentExpense.description || '',
        date: currentExpense.date ? new Date(currentExpense.date).toISOString().split('T')[0] : '',
        paymentMethod: currentExpense.paymentMethod || 'Cash',
        tags: currentExpense.tags ? currentExpense.tags.join(', ') : ''
      });
    }
  }, [currentExpense]);

  const { title, amount, category, description, date, paymentMethod, tags } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !amount || !category) {
      alert('Please fill in all required fields');
      return;
    }

    if (parseFloat(amount) <= 0) {
      alert('Amount must be greater than 0');
      return;
    }

    const expenseData = {
      ...formData,
      amount: parseFloat(amount),
      tags: tags ? tags.split(',').map(tag => tag.trim()) : []
    };

    const result = await updateExpense(id, expenseData);
    if (result.success) {
      navigate('/expenses');
    }
  };

  if (loading && !currentExpense) {
    return <LoadingSpinner message="Loading expense details..." />;
  }

  if (!currentExpense && !loading) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          <i className="fas fa-exclamation-triangle me-2"></i>
          Expense not found.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="expense-form">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>
                <i className="fas fa-edit me-2 text-primary"></i>
                Edit Expense
              </h2>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate('/expenses')}
              >
                <i className="fas fa-arrow-left me-2"></i>Back to Expenses
              </button>
            </div>

            <form onSubmit={onSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="title" className="form-label">
                    Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={title}
                    onChange={onChange}
                    placeholder="e.g., Lunch at restaurant"
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="amount" className="form-label">
                    Amount (₹) <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    className="form-control"
                    id="amount"
                    name="amount"
                    value={amount}
                    onChange={onChange}
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="category" className="form-label">
                    Category <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="category"
                    name="category"
                    value={category}
                    onChange={onChange}
                    required
                  >
                    <option value="">Select a category</option>
                    {EXPENSE_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="paymentMethod" className="form-label">
                    Payment Method
                  </label>
                  <select
                    className="form-select"
                    id="paymentMethod"
                    name="paymentMethod"
                    value={paymentMethod}
                    onChange={onChange}
                  >
                    {PAYMENT_METHODS.map((method) => (
                      <option key={method} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="date" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="date"
                    value={date}
                    onChange={onChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="tags" className="form-label">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tags"
                    name="tags"
                    value={tags}
                    onChange={onChange}
                    placeholder="e.g., work, lunch, team"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="3"
                  value={description}
                  onChange={onChange}
                  placeholder="Add any additional details about this expense..."
                ></textarea>
              </div>

              <div className="d-flex gap-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Updating...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save me-2"></i>Update Expense
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => navigate('/expenses')}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditExpense;