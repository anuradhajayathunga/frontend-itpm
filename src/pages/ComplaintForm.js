import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ComplaintForm.css';
import { AlertCircle, Camera } from 'lucide-react';

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    userType: '',
    category: '',
    urgency: 'Low',
    description: '',
    picture: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, picture: file });
    }
  };

  const handleUrgencySelect = (urgency) => {
    setFormData({ ...formData, urgency });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('type', 'Complaint');
    data.append('userType', formData.userType);
    data.append('category', formData.category);
    data.append('urgency', formData.urgency);
    data.append('description', formData.description);
    if (formData.picture) {
      data.append('picture', formData.picture);
    }

    try {
      await axios.post('http://localhost:5000/api/submissions', data);
      alert('Complaint submitted successfully!');
      setFormData({ userType: '', category: '', urgency: 'Low', description: '', picture: null });
      document.getElementById('picture-upload').value = '';
    } catch (err) {
      console.error('Error submitting complaint:', err);
      alert('Error submitting complaint. Please try again.');
    }
  };

  const handleCancel = () => {
    setFormData({ userType: '', category: '', urgency: 'Low', description: '', picture: null });
    document.getElementById('picture-upload').value = '';
  };

  return (
    <div className="complaint-form-container">
      <div className="complaint-header">
        <h1>Submit a Complaint</h1>
        <p>We're sorry to hear you had an issue. Let us know what happened.</p>
      </div>
      
      <div className="complaint-content">
        <div className="alert-box">
          <AlertCircle size={20} className="alert-icon" />
          <p>Please provide as much detail as possible so we can address your complaint effectively.</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userType">User Type</label>
            <select 
              id="userType"
              name="userType" 
              value={formData.userType} 
              onChange={handleChange} 
              required
            >
              <option value="">Select User Type</option>
              <option value="Resident">Resident</option>
              <option value="Collector">Collector</option>
              <option value="Company">Recycling Company</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select 
              id="category"
              name="category" 
              value={formData.category} 
              onChange={handleChange} 
              required
            >
              <option value="">Select Category</option>
              <option value="Operational">Operational (Pickup & Material)</option>
              <option value="Technical">Technical (App Usability)</option>
              <option value="Interpersonal">Interpersonal (Stakeholder Coordination)</option>
              <option value="Environmental">Environmental Impact & Awareness</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Urgency Level</label>
            <div className="urgency-options">
              <div 
                className={`urgency-option low ${formData.urgency === 'Low' ? 'selected' : ''}`}
                onClick={() => handleUrgencySelect('Low')}
              >
                <span className="urgency-dot"></span>
                Low Urgency
              </div>
              <div 
                className={`urgency-option medium ${formData.urgency === 'Medium' ? 'selected' : ''}`}
                onClick={() => handleUrgencySelect('Medium')}
              >
                <span className="urgency-dot"></span>
                Medium Urgency
              </div>
              <div 
                className={`urgency-option high ${formData.urgency === 'High' ? 'selected' : ''}`}
                onClick={() => handleUrgencySelect('High')}
              >
                <span className="urgency-dot"></span>
                High Urgency
              </div>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Complaint Details</label>
            <div className="complaint-textarea-container">
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Please describe your complaint in detail..."
                required
              />
              <label htmlFor="picture-upload" className="upload-icon">
                <Camera size={20} />
                <input
                  id="picture-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="submit-button">Submit Complaint</button>
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;