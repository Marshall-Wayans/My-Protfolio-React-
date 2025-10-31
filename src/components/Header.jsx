import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Header.css";

export default function Header({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <header className="header">
      <div className="nav-container">
        <div className="logo" onClick={() => handleScroll("home")}>
          <span>Marshal</span> Wayans
        </div>

        {/* Desktop Nav */}
        <nav className="nav-links">
          {links.map((link) => (
            <motion.div
              key={link.id}
              whileHover={{ scale: 1.1 }}
              className={`nav-item ${
                activeSection === link.id ? "active" : ""
              }`}
              onClick={() => handleScroll(link.id)}
            >
              {link.label}
            </motion.div>
          ))}
        </nav>

        {/* Mobile Menu Icon */}
        <div
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-menu"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {links.map((link) => (
              <div
                key={link.id}
                className={`mobile-item ${
                  activeSection === link.id ? "active" : ""
                }`}
                onClick={() => handleScroll(link.id)}
              >
                {link.label}
              </div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
