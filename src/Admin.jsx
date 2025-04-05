import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { database, ref, get, remove, update } from './firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Admin.css';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      loadUserData();
    }
  }, [isLoggedIn]);

  const handleLogin = async (event) => {
    event.preventDefault();
    const email = document.getElementById("adminEmail").value;
    const password = document.getElementById("adminPassword").value;

    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
    } catch (error) {
      alert("Invalid credentials!");
    }
  };

  const loadUserData = async () => {
    const submissionsRef = ref(database, 'formSubmissions');
    const snapshot = await get(submissionsRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      const formattedData = Object.entries(data).map(([id, value]) => ({ id, ...value }));
      setFormData(formattedData);
    } else {
      setFormData([]);
    }
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const handleDelete = async (id) => {
    try {
      await remove(ref(database, `formSubmissions/${id}`));
      setFormData(formData.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleMarkAsDone = async (id, done) => {
    try {
      await update(ref(database, `formSubmissions/${id}`), { done: !done });
      setFormData(formData.map(item => item.id === id ? { ...item, done: !done } : item));
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <a className="navbar-brand" href="/">Amuja Renovation</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#services">Services</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#portfolio">Portfolio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#contact">Contact</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin">Login</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        {!isLoggedIn ? (
          <div id="loginSection">
            <h2 className="text-center">Admin Login</h2>
            <form id="adminLoginForm" onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="adminEmail" className="form-label">Email</label>
                <input type="email" className="form-control" id="adminEmail" required />
              </div>
              <div className="mb-3">
                <label htmlFor="adminPassword" className="form-label">Password</label>
                <input type="password" className="form-control" id="adminPassword" required />
              </div>
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
          </div>
        ) : (
          <div id="dashboardSection">
            <h2 className="text-center">User Form Submissions</h2>
            <button className="btn btn-danger mb-3" onClick={logout}>Logout</button>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Service</th>
                    <th>Message</th>
                    <th>Mark as Done</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody id="userDataTable">
                  {formData.length > 0 ? (
                    formData.map((data) => (
                      <tr key={data.id} style={{ textDecoration: data.done ? 'line-through' : 'none' }}>
                        <td>{data.name}</td>
                        <td>{data.email}</td>
                        <td>{data.phone}</td>
                        <td>{data.service}</td>
                        <td>{data.message}</td>
                        <td>
                          <button className="btn btn-outline-success" onClick={() => handleMarkAsDone(data.id, data.done)}>
                            {data.done ? 'Undo' : 'Done'}
                          </button>
                        </td>
                        <td>
                          <button className="btn btn-outline-danger" onClick={() => handleDelete(data.id)}>Delete</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">No data found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;