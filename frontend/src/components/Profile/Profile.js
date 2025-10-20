import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user, updateProfile, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    totalBudget: user?.totalBudget || ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const { name, totalBudget } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    const result = await updateProfile({
      name: name.trim(),
      totalBudget: totalBudget ? parseFloat(totalBudget) : 0
    });
    
    if (result.success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      totalBudget: user?.totalBudget || ''
    });
    setIsEditing(false);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount || 0);
  };

  const calculateBudgetUsage = () => {
    if (!user?.totalBudget || user.totalBudget === 0) return 0;
    return ((user.totalExpenses || 0) / user.totalBudget) * 100;
  };

  const budgetUsage = calculateBudgetUsage();

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">
                  <i className="fas fa-user me-2 text-primary"></i>
                  Profile Settings
                </h4>
                {!isEditing && (
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => setIsEditing(true)}
                  >
                    <i className="fas fa-edit me-2"></i>Edit Profile
                  </button>
                )}
              </div>
            </div>
            
            <div className="card-body">
              {isEditing ? (
                <form onSubmit={onSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="name" className="form-label">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={name}
                        onChange={onChange}
                        required
                      />
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <label htmlFor="totalBudget" className="form-label">
                        Monthly Budget (₹)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        className="form-control"
                        id="totalBudget"
                        name="totalBudget"
                        value={totalBudget}
                        onChange={onChange}
                        placeholder="Enter your monthly budget"
                      />
                    </div>
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
                          Saving...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-save me-2"></i>Save Changes
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <h6 className="text-muted">Personal Information</h6>
                      
                      <div className="mb-3">
                        <label className="form-label fw-bold">Full Name</label>
                        <p className="mb-0">{user?.name}</p>
                      </div>
                      
                      <div className="mb-3">
                        <label className="form-label fw-bold">Email Address</label>
                        <p className="mb-0">{user?.email}</p>
                      </div>
                      
                      <div className="mb-3">
                        <label className="form-label fw-bold">Member Since</label>
                        <p className="mb-0">
                          {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <h6 className="text-muted">Financial Overview</h6>
                      
                      <div className="mb-3">
                        <label className="form-label fw-bold">Total Expenses</label>
                        <p className="mb-0 text-primary h5">
                          {formatCurrency(user?.totalExpenses)}
                        </p>
                      </div>
                      
                      <div className="mb-3">
                        <label className="form-label fw-bold">Monthly Budget</label>
                        <p className="mb-0 text-success h5">
                          {formatCurrency(user?.totalBudget)}
                        </p>
                        {!user?.totalBudget && (
                          <small className="text-muted">
                            Set a budget to track your spending
                          </small>
                        )}
                      </div>
                      
                      {user?.totalBudget > 0 && (
                        <div className="mb-3">
                          <label className="form-label fw-bold">Budget Usage</label>
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <span>{budgetUsage.toFixed(1)}% used</span>
                            <span>
                              {formatCurrency(user.totalExpenses)} / {formatCurrency(user.totalBudget)}
                            </span>
                          </div>
                          <div className="progress" style={{ height: '8px' }}>
                            <div 
                              className={`progress-bar ${budgetUsage > 90 ? 'bg-danger' : budgetUsage > 70 ? 'bg-warning' : 'bg-success'}`}
                              style={{ width: `${Math.min(budgetUsage, 100)}%` }}
                            ></div>
                          </div>
                          {budgetUsage > 100 && (
                            <small className="text-danger mt-1 d-block">
                              <i className="fas fa-exclamation-triangle me-1"></i>
                              You've exceeded your budget by {formatCurrency((user.totalExpenses || 0) - user.totalBudget)}
                            </small>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Account Statistics */}
          <div className="card mt-4">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-chart-line me-2 text-success"></i>
                Account Statistics
              </h5>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-md-3 mb-3">
                  <div className="card bg-light">
                    <div className="card-body">
                      <i className="fas fa-dollar-sign fa-2x text-primary mb-2"></i>
                      <h5>{formatCurrency(user?.totalExpenses)}</h5>
                      <small className="text-muted">Total Spent</small>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-3 mb-3">
                  <div className="card bg-light">
                    <div className="card-body">
                      <i className="fas fa-wallet fa-2x text-success mb-2"></i>
                      <h5>{formatCurrency(user?.totalBudget)}</h5>
                      <small className="text-muted">Total Budget</small>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-3 mb-3">
                  <div className="card bg-light">
                    <div className="card-body">
                      <i className="fas fa-percentage fa-2x text-warning mb-2"></i>
                      <h5>{budgetUsage.toFixed(1)}%</h5>
                      <small className="text-muted">Budget Used</small>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-3 mb-3">
                  <div className="card bg-light">
                    <div className="card-body">
                      <i className="fas fa-piggy-bank fa-2x text-info mb-2"></i>
                      <h5>
                        {user?.totalBudget > 0 
                          ? formatCurrency(Math.max(0, user.totalBudget - (user?.totalExpenses || 0)))
                          : '-'
                        }
                      </h5>
                      <small className="text-muted">Remaining</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="card mt-4">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-lightbulb me-2 text-warning"></i>
                Tips for Better Expense Tracking
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <i className="fas fa-check text-success me-2"></i>
                      Set a realistic monthly budget
                    </li>
                    <li className="mb-2">
                      <i className="fas fa-check text-success me-2"></i>
                      Track expenses immediately
                    </li>
                    <li className="mb-2">
                      <i className="fas fa-check text-success me-2"></i>
                      Review your spending weekly
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <i className="fas fa-check text-success me-2"></i>
                      Categorize expenses properly
                    </li>
                    <li className="mb-2">
                      <i className="fas fa-check text-success me-2"></i>
                      Use detailed descriptions
                    </li>
                    <li className="mb-2">
                      <i className="fas fa-check text-success me-2"></i>
                      Monitor budget regularly
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;