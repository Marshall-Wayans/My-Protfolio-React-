import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import "./ProjectsModal.css";

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <>
          {/*== Overlay Background ==*/}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="modal-overlay"
          />

          {/* == Modal Container == */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="modal-container"
          >
            {/* == Close Button == */}
            <button onClick={onClose} className="close-btn">
              <X className="close-icon" />
            </button>

            {/* == Modal Content == */}
            <div className="modal-content">
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={project.image}
                alt={project.title}
                className="modal-image"
              />

              <h2 className="modal-title">{project.title}</h2>
              <p className="modal-description">{project.description}</p>

              {/* == Project Details == */}
              <div className="modal-sections">
                <div>
                  <h3 className="modal-subtitle">Why I Created It</h3>
                  <p className="modal-text">{project.why}</p>
                </div>

                <div>
                  <h3 className="modal-subtitle">How I Built It</h3>
                  <p className="modal-text">{project.how}</p>
                </div>

                <div>
                  <h3 className="modal-subtitle">Tools & Technologies</h3>
                  <div className="tools-container">
                    {project.tools.map((tool, index) => (
                      <span key={index} className="tool-tag">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* == Live Project Button == */}
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="view-project-btn"
              >
                <span>View Live Project</span>
                <ExternalLink className="external-icon" />
              </motion.a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;