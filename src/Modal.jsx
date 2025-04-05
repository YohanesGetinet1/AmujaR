import React from 'react';
import { database, ref, push } from './firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './modal.css';

const ContactModal = ({ showModal, onClose }) => {
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const name = document.getElementById("modal-name").value;
    const email = document.getElementById("modal-email").value;
    const phone = document.getElementById("modal-phone").value;
    const service = document.getElementById("modal-service").value;
    const message = document.getElementById("modal-message").value;

    const formData = { name, email, phone, service, message };

    try {
      const submissionsRef = ref(database, 'formSubmissions');
      await push(submissionsRef, formData);
      toast.success("Your message has been sent successfully!");
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error saving to Firebase:", error);
      toast.error("There was an error sending your message. Please try again.");
    }
  };

  if (!showModal) return null;

  return (
    <div className='modal-container'>
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-button" onClick={onClose}>×</button>
          <h2 className='contacthead'>Contact Us</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <input type="text" id="modal-name" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" id="modal-email" placeholder="Email Address" required />
            </div>
            <div className="form-group">
              <input type="tel" id="modal-phone" placeholder="Phone Number" />
            </div>
            <div className="form-group">
              <select id="modal-service" required>
                <option value="" disabled selected>Select a Service</option>
                <option value="kitchen">Kitchen Renovation</option>
                <option value="bathroom">Bathroom Renovation</option>
                <option value="basement">Basement Finishing</option>
                <option value="addition">Rooftop Renovation</option>
                <option value="exterior">Exterior Renovation</option>
                <option value="commercial">Plumbing</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <textarea id="modal-message" rows="5" placeholder="Tell us about your project..." required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit Request</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;