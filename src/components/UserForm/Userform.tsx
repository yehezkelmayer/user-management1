import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './userform.css';

interface UserFormProps {
  userId?: string;
  onSave: () => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ userId, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(
            `https://server-n42x.onrender.com/api/users/${userId}`,
            {
              headers: { Authorization: `${token}` },
            }
          );
          setFormData({
            username: response.data.username,
            fullName: response.data.fullName,
            email: response.data.email,
            password: '', // לא מציגים את הסיסמה בתצוגה, רק מאחסנים אותה לטובת השמירה
          });
        } catch (err: any) {
          setError('Failed to load user data.');
        }
      };
      fetchUser();
    }
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (userId) {
        // במקרה של עריכה, לא נשלח סיסמה ריקה
        await axios.put(
          `https://server-n42x.onrender.com/api/users/${userId}`,
          formData,
          {
            headers: { Authorization: `${token}` },
          }
        );
      } else {
        // במקרה של הוספה, הסיסמה חייבת להיות חלק מהנתונים
        await axios.post('https://server-n42x.onrender.com/api/users', formData, {
          headers: { Authorization: `${token}` },
        });
      }
      onSave();
    } catch (err: any) {
      setError('Failed to save user. Please try again.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{userId ? 'Edit User' : 'Add User'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required={!userId} // אם אין userId, הסיסמה חובה
          />
          <div className="modal-actions">
            <button type="submit">{userId ? 'Save Changes' : 'Add User'}</button>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default UserForm;
