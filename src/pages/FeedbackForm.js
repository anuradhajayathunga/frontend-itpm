import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/FeedbackForm.css';
import { Mic, Camera } from 'lucide-react';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    userType: '',
    category: '',
    description: '',
    rating: 0,
    picture: null,
  });

  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const speechRecognition = new window.webkitSpeechRecognition();
      speechRecognition.continuous = true;
      speechRecognition.interimResults = true;
      speechRecognition.lang = 'en-US';

      speechRecognition.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            setFormData((prevData) => ({
              ...prevData,
              description: prevData.description + event.results[i][0].transcript,
            }));
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
      };

      speechRecognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      setRecognition(speechRecognition);
    } else {
      console.warn('Speech recognition not supported in this browser.');
    }
  }, []);

  const handleSpeech = () => {
    if (!recognition) return;
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsListening(!isListening);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, picture: e.target.files[0] });
  };

  const handleRating = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('type', 'Feedback');
    data.append('userType', formData.userType);
    data.append('category', formData.category);
    data.append('description', formData.description);
    data.append('rating', formData.rating);
    if (formData.picture) {
      data.append('picture', formData.picture);
    }

    try {
      await axios.post('http://localhost:5000/api/submissions', data);
      alert('Feedback submitted successfully!');
      setFormData({ userType: '', category: '', description: '', rating: 0, picture: null });
      document.getElementById('picture-upload').value = '';
    } catch (err) {
      console.error('Error submitting feedback:', err);
      alert('Error submitting feedback. Please try again.');
    }
  };

  const handleCancel = () => {
    setFormData({ userType: '', category: '', description: '', rating: 0, picture: null });
    document.getElementById('picture-upload').value = '';
  };

  return (
    <div className="feedback-form-container">
      <div className="feedback-header">
        <h1>Share Your Feedback</h1>
        <p>Help us improve our services with your valuable input</p>
      </div>
      
      <div className="feedback-content">
        <h2>Rate Your Experience</h2>
        
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= formData.rating ? 'star filled' : 'star'}
              onClick={() => handleRating(star)}
            >
              ★
            </span>
          ))}
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
            <label htmlFor="description">Your Comment</label>
            <div className="comment-box">
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Share your thoughts with us..."
                required
              />
              <div className="input-actions">
                <button 
                  type="button" 
                  className="icon-button" 
                  onClick={handleSpeech} 
                  disabled={!recognition}
                >
                  <Mic size={20} />
                </button>
                <label htmlFor="picture-upload" className="icon-button">
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
          </div>
          
          <div className="form-actions">
            <button type="submit" className="submit-button">Submit Feedback</button>
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;