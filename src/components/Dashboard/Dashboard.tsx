import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from '../UserForm/Userform';
import './Dashboard.css';


const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3N2JkNmYyN2VhMzdhMjE4NjAxOTMzZCIsImlhdCI6MTczNjc3MTQzMSwiZXhwIjoxNzM2Nzc1MDMxfQ.-KmKDnN8h8eqKvOLI8pXsOjjxAk1YeK8ZVWGGE9oZt8';

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false); 
  const [editingUserId, setEditingUserId] = useState<string | null>(null); // ID של המשתמש בעריכה

  // טען את רשימת המשתמשים
  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get('https://server-n42x.onrender.com/api/users', {
      headers: { Authorization: ` ${token}` },
    });
    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // מחיקת משתמש
  const handleDelete = async (userId: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://server-n42x.onrender.com/api/users/${userId}`, {
        headers: { Authorization: ` ${token}` },
      });
      fetchUsers(); // עדכון הרשימה לאחר מחיקה
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  return (
    <div>
      <h1>Users Table</h1>

      {/* כפתור להוספת משתמש */}
      <button onClick={() => {
        setIsEditing(true);
        setEditingUserId(null); // מצב הוספה
      }}>
        Add User
      </button>

      {/* טופס הוספה/עריכה */}
      {isEditing && (
        <UserForm
          userId={editingUserId}
          onSave={() => {
            setIsEditing(false); // סגור את הטופס לאחר שמירה
            fetchUsers(); // עדכן את רשימת המשתמשים
          }}
          onCancel={() => setIsEditing(false)} // סגור את הטופס בלחיצה על ביטול
        />
      )}

<table>
  <thead>
    <tr>
      <th>Username</th>
      <th>Full Name</th>
      <th>Email</th>
      <th>Created At</th> {/* הוספנו את העמודה */}
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {users.map((user: any) => (
      <tr key={user._id}>
        <td>{user.username}</td>
        <td>{user.fullName}</td>
        <td>{user.email}</td>
        <td>{new Date(user.createdAt).toLocaleString()}</td> {/* הצגת התאריך */}
        <td>
          <button
            onClick={() => {
              setIsEditing(true);
              setEditingUserId(user._id); // מצב עריכה
            }}
          >
            Edit
          </button>
          <button onClick={() => handleDelete(user._id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default Dashboard;
