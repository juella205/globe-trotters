import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import '../Footer/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-icons">
        <a
          href="https://github.com/alimomin7861"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="icon" />
        </a>
        <a
          href="https://linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="icon" />
        </a>
        <a
          href="https://twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter className="icon" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
