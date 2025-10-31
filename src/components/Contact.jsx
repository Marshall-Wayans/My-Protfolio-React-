import React from "react";
import { motion } from "framer-motion";
import "./Contact.css";

const Contact = () => {
  // Copy text to clipboard and show toast
  const copyToClipboard = (text) => {
    navigator.clipboard
      ?.writeText(text)
      .then(() => showToast("Copied: " + text))
      .catch(() => showToast("Unable to copy"));
  };

  // Open email app
  const openMail = () => {
    const email = "wayansmarshalls18@gmail.com";
    window.location.href =
      "mailto:" +
      encodeURIComponent(email) +
      "?subject=Message%20from%20your%20portfolio";
  };

  // Open links in new tab
  const openInNew = (url) => {
    window.open(url, "_blank", "noopener");
  };

  // Toast message handler
  const showToast = (msg) => {
    const t = document.getElementById("contact-toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2200);
  };

  return (
    <section id="contact-section">
      <div className="contact-inner">
        <motion.h2
          className="heading"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Contact <span>Me</span>
        </motion.h2>

        <div className="wrap">
          <motion.div
            className="panel"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2>Contact Information</h2>

            {/* Email */}
            <div className="info-row">
              <div className="info-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>
              <div className="info-text">
                <p className="info-title">Email</p>
                <p className="info-sub" id="contact-email">
                  wayansmarshalls18@gmail.com
                </p>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn" onClick={openMail}>
                  Email
                </button>
                <button
                  className="btn ghost"
                  onClick={() =>
                    copyToClipboard("wayansmarshalls18@gmail.com")
                  }
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Phone */}
            <div className="info-row">
              <div className="info-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.02l-2.2 2.19z" />
                </svg>
              </div>
              <div className="info-text">
                <p className="info-title">Phone</p>
                <p className="info-sub">+254704683150</p>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <a className="btn" href="tel:+254704683150">
                  Call
                </a>
                <button
                  className="btn ghost"
                  onClick={() => copyToClipboard("+254704683150")}
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Location */}
            <div className="info-row" style={{ marginBottom: 8 }}>
              <div className="info-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z" />
                </svg>
              </div>
              <div className="info-text">
                <p className="info-title">Location</p>
                <p className="info-sub">Nairobi, Kenya</p>
              </div>
            </div>

            {/* Actions */}
            <div className="actions">
              <a
                className="btn"
                href="mailto:wayansmarshalls18@gmail.com?subject=Opportunity%20from%20Portfolio"
              >
                Email me
              </a>
              <a
                className="btn ghost"
                href="/Marshal-1(RESUME).pdf"
                target="_blank"
                rel="noreferrer"
              >
                Download CV
              </a>
            </div>
          </motion.div>

          {/* Socials */}
          <motion.aside
            className="socials"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12 }}
          >
            <div className="social-card">
              <div className="info-icon small">
                <svg
                  viewBox="0 0 24 24"
                  style={{ width: 22, height: 22, fill: "#ff2b2b" }}
                >
                  <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.92.58.1.79-.25.79-.56v-2.1c-3.2.7-3.87-1.4-3.87-1.4-.53-1.36-1.29-1.72-1.29-1.72-1.06-.72.08-.7.08-.7 1.18.08 1.8 1.21 1.8 1.21 1.04 1.78 2.73 1.27 3.4.97.11-.76.41-1.28.75-1.57-2.55-.29-5.23-1.28-5.23-5.72 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.52.11-3.17 0 0 .98-.31 3.2 1.18a11.14 11.14 0 012.92-.39c.99 0 1.99.13 2.92.39 2.22-1.49 3.2-1.18 3.2-1.18.63 1.65.23 2.87.11 3.17.75.81 1.2 1.84 1.2 3.1 0 4.45-2.69 5.42-5.25 5.7.42.36.8 1.08.8 2.18v3.23c0 .31.21.67.8.56A11.52 11.52 0 0023.5 12C23.5 5.73 18.27.5 12 .5z" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <a
                  href="https://github.com/Marshall-Wayans?tab=repositories"
                  target="_blank"
                  rel="noreferrer"
                >
                  Github
                </a>
                <p className="social-desc">
                  Code samples & security projects
                </p>
              </div>
              <div>
                <button
                  className="btn ghost"
                  onClick={() =>
                    openInNew("https://github.com/Marshall-Wayans")
                  }
                >
                  Open
                </button>
              </div>
            </div>
          </motion.aside>
        </div>

        <div id="contact-toast" className="toast">
          Copied to clipboard
        </div>
      </div>
    </section>
  );
};

export default Contact;