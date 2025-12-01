'use client';

import React, { useState, useEffect } from 'react';
import { userRegister, userUpdate, userDelete } from '@/lib/services/apiService';
import { validateEmail, validateMobile, validatePassword } from '@/lib/validation';
import toast, { Toaster } from 'react-hot-toast';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editingUser?: any;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onSuccess, editingUser }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    mobile: '',
    role: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (editingUser) {
      setFormData({
        fullName: editingUser.username,
        email: editingUser.email,
        password: editingUser.password,
        mobile: editingUser.mobile,
        role: ''
      });
    } else {
      setFormData({ fullName: '', email: '', password: '', mobile: '', role: '' });
    }
  }, [editingUser, isOpen]);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!validateMobile(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }
    
    if (!editingUser && !validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      let response;
      if (editingUser) {
        response = await userUpdate(formData.fullName, formData.mobile, formData.email, formData.password, editingUser._id);
        toast.success(response.message || 'User updated successfully');
      } else {
        response = await userRegister(formData.fullName, formData.mobile, formData.email, formData.password);
        toast.success(response.message || 'User created successfully');
      }
      onSuccess();
      onClose();
      setFormData({ fullName: '', email: '', password: '', mobile: '', role: '' });
      setErrors({});
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(error?.response?.data?.error || 'Operation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!editingUser) return;
    
    setLoading(true);
    try {
      const response = await userDelete(editingUser._id);
      toast.success(response.message || 'User deleted successfully');
      onSuccess();
      onClose();
      setShowDeleteConfirm(false);
    } catch (error: any) {
      console.error('Error deleting user:', error);
      toast.error(error?.response?.data?.error || 'Failed to delete user.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Toaster position='top-right'/>
      <div className="bg-[#2A2A2A] rounded-3xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-2xl font-bold">{editingUser ? 'Edit User' : 'Add User'}</h2>
          <button onClick={onClose} className="text-white w-8 h-8 rounded-full border border-white flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-white text-sm mb-2 block">Full Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              className="w-full bg-black text-white placeholder-gray-500 rounded-full py-4 px-6 outline-none"
              required
            />
          </div>

          <div>
            <label className="text-white text-sm mb-2 block">User Name/Email ID</label>
            <input
              type="email"
              placeholder="Enter User Name / Email ID"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={`w-full bg-black text-white placeholder-gray-500 rounded-full py-4 px-6 outline-none ${errors.email ? 'border border-red-500' : ''}`}
              required
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 px-2">{errors.email}</p>}
          </div>

          {!editingUser && (
            <div>
              <label className="text-white text-sm mb-2 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className={`w-full bg-black text-white placeholder-gray-500 rounded-full py-4 px-6 pr-12 outline-none ${errors.password ? 'border border-red-500' : ''}`}
                  required
                />
                {errors.password && <p className="text-red-500 text-xs mt-1 px-2">{errors.password}</p>}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showPassword ? "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" : "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"} />
                  </svg>
                </button>
              </div>
            </div>
          )}

          <div>
            <label className="text-white text-sm mb-2 block">Mobile Number</label>
            <div className={`flex bg-black rounded-full ${errors.mobile ? 'border border-red-500' : ''}`}>
              <div className="flex items-center px-4 border-r border-gray-600">
                <span className="text-white">+971</span>
                <svg className="w-4 h-4 text-gray-400 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <input
                type="tel"
                placeholder="Enter Mobile Number"
                value={formData.mobile}
                onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                className="flex-1 bg-transparent text-white placeholder-gray-500 py-4 px-4 outline-none"
                required
              />
            </div>
            {errors.mobile && <p className="text-red-500 text-xs mt-1 px-2">{errors.mobile}</p>}
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#FC95E1] text-black py-4 rounded-full font-medium text-lg disabled:opacity-50"
            >
              {loading ? 'Saving...' : editingUser ? 'Update User' : 'Create User'}
            </button>
            {editingUser && (
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                disabled={loading}
                className="flex-1 bg-red-600 text-white py-4 rounded-full font-medium text-lg disabled:opacity-50"
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#2A2A2A] rounded-3xl p-6 w-full max-w-sm">
            <h3 className="text-white text-xl font-bold mb-4">Delete User</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to delete this user? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={loading}
                className="flex-1 bg-gray-600 text-white py-3 rounded-full font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 bg-red-600 text-white py-3 rounded-full font-medium disabled:opacity-50"
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUserModal;
