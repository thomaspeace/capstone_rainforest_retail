import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './styles/TermsPrivacyPopup.css';

const TermsPrivacyPopup = ({ onAccept }) => {
  const [agreed, setAgreed] = useState(false);

  const handleAgree = () => {
    if (agreed) {
      localStorage.setItem('termsAccepted', 'true');
      onAccept();
    }
  };

  return (
    <Modal show={true} backdrop="static" keyboard={false} size="lg">
      <Modal.Header>
        <Modal.Title>Terms & Conditions and Privacy Policy</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="scrollable-content">
          <div className="terms-and-conditions">
            <h2>Terms and Conditions</h2>
            <ol>
              <li>By using Rainforest Retail, you agree to abide by these terms and conditions.</li>
              <li>Users must be at least 18 years old to use this service.</li>
              <li>All data provided by users must be accurate and up-to-date.</li>
              <li>Users are responsible for maintaining the confidentiality of their account information.</li>
              <li>Rainforest Retail reserves the right to modify or terminate the service at any time.</li>
              <li>Users agree not to use the service for any illegal or unauthorized purpose.</li>
              <li>Any abuse or misuse of the service may result in account termination.</li>
            </ol>
          </div>
          
          <div className="privacy-policy">
            <h2>Privacy Policy</h2>
            <ol>
              <li>We collect personal information such as name, email, and delivery address.</li>
              <li>Your data is stored securely and is only used for service-related purposes.</li>
              <li>We use cookies to enhance your experience and analyze our traffic.</li>
              <li>We do not sell or share your personal information with third parties.</li>
              <li>You have the right to request access to or deletion of your personal data.</li>
              <li>We may send you service-related emails and notifications.</li>
              <li>Our website may contain links to third-party sites not governed by this policy.</li>
              <li>We reserve the right to update this policy, and will notify users of any changes.</li>
            </ol>
          </div>
        </div>
        <Form.Check 
          type="checkbox" 
          label="I have read and agree to the Terms & Conditions and Privacy Policy" 
          onChange={(e) => setAgreed(e.target.checked)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleAgree} disabled={!agreed}>
          Accept
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TermsPrivacyPopup;
