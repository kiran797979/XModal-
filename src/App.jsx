
import { useState, useRef } from 'react';
import './App.css';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', phone: '', dob: '' });
  const modalRef = useRef(null);

  const handleOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setForm({ username: '', email: '', phone: '', dob: '' });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const validate = () => {
    let errors = [];
    if (!form.username) {
      errors.push('Please fill out the username field.');
    }
    if (!form.email) {
      errors.push('Please fill out the email field.');
    } else if (!form.email.includes('@')) {
      errors.push('Invalid email. Please check your email address.');
    }
    if (!form.phone) {
      errors.push('Please fill out the phone field.');
    } else if (!/^\d{10}$/.test(form.phone)) {
      errors.push('Invalid phone number. Please enter a 10-digit phone number.');
    }
    if (!form.dob) {
      errors.push('Please fill out the dob field.');
    } else {
      const dobDate = new Date(form.dob);
      const today = new Date();
      if (dobDate > today) {
        errors.push('Invalid date of birth. Please select a valid date.');
      }
    }
    if (errors.length > 0) {
      alert(errors[0]);
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      handleClose();
    }
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && e.target === modalRef.current) {
      handleClose();
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: showModal ? 'rgba(0,0,0,0.4)' : '#fff' }}>
      <h1 style={{ textAlign: 'center', marginTop: '2rem', fontFamily: 'serif', fontWeight: 'bold' }}>User Details Modal</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <button onClick={handleOpen} style={{ background: '#174ea6', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.5rem 1.5rem', fontSize: '1rem', cursor: 'pointer' }}>Open Form</button>
      </div>
      {showModal && (
        <div className="modal" ref={modalRef} onClick={handleOutsideClick}>
          <div className="modal-content">
            <h2 style={{ textAlign: 'center', fontFamily: 'serif', fontWeight: 'bold', marginBottom: '1.5rem' }}>Fill Details</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="username" style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Username:</label>
                <input id="username" value={form.username} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }} />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="email" style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Email Address:</label>
                <input id="email" value={form.email} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }} />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="phone" style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Phone Number:</label>
                <input id="phone" value={form.phone} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }} />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="dob" style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Date of Birth:</label>
                <input id="dob" type="date" value={form.dob} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button type="submit" className="submit-button" style={{ width: '120px', background: '#1976d2' }}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
