import React from 'react';
import '../styles.css'; // Ensure you import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} QED. All rights reserved.</p>
    </footer>
  );
};

export default Footer;