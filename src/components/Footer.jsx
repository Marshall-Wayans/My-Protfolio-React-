import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social">
          <a
            href="https://github.com/Marshall-Wayans"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <i className="fa-brands fa-github"></i>
          </a>
          <a href="#" aria-label="WhatsApp">
            <i className="fa-brands fa-whatsapp"></i>
          </a>
          <a href="#" aria-label="Twitter">
            <i className="fa-brands fa-twitter"></i>
          </a>
        </div>

        <ul className="list">
          <li><a href="#">FAQ</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#home">About Me</a></li>
          <li><a href="#contact-section">Contact</a></li>
        </ul>

        <p className="copyright">
          © {new Date().getFullYear()} Marshal Wayans | All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
