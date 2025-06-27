import React from 'react';
import { Link } from 'react-router-dom';
import './FooterComponent.css';

function FooterComponent() {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      {/* <div className="container"> */}
        <div className="row">
          {/* Quick Links */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-white-50">Home</Link></li>
              <li><Link to="/login" className="text-white-50">Login</Link></li>
              <li><Link to="/register" className="text-white-50">Register</Link></li>
            </ul>
          </div>
          
          {/* Contact Us */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>📞 +91 9341059619</li>
              <li>📧 suppor@zieers.com</li>
              <li>📍Zieers Systems Pvt Ltd Bengaluru, India</li>
            </ul>
          </div>
          
          {/* Follow Us */}
          {/* <div className="col-md-4">
            <h5>Follow Us</h5>
            <div className="d-flex gap-3">
              <a href="https://facebook.com" className="text-white-50">Facebook</a>
              <a href="https://instagram.com" className="text-white-50">Instagram</a>
              <a href="https://linkedin.com" className="text-white-50">LinkedIn</a>
            </div>
          </div>
        </div> */}
        
        <div className="text-center mt-4 pt-3 border-top border-secondary">
          <small>© 2025 Business Proposal. All Rights Reserved.</small>
        </div>
      </div>
    </footer>
  );
}

export default FooterComponent;

