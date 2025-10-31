import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import coding from "../assets/coding.jpg";
import website from "../assets/website.jpg";
import server from "../assets/server.jpg";
import "./Projects.css";

const projects = [
  {
    img: coding,
    title: "Web & Application Development",
    desc:
      "Creating seamless user experiences through stunning and responsive web interfaces using the latest technologies.",
    details:
      "This project focused on building a fast, fully responsive portfolio website using React, Vite, and TailwindCSS. I chose this project to showcase my front-end expertise and modern UI/UX implementation. It demonstrates dynamic animations and performance-optimized React components.",
    tools: ["React", "Vite", "Framer Motion", "TailwindCSS"],
    live: "https://github.com/yourusername/webapp-project",
  },
  {
    img: website,
    title: "Cyber Security Analysis",
    desc:
      "Designing and implementing security solutions that protect websites and applications from cyber threats.",
    details:
      "This cybersecurity dashboard visualizes network vulnerability metrics using React and Chart.js. I built it to help users identify potential breaches and strengthen web defenses.",
    tools: ["React", "Chart.js", "Node.js", "Express"],
    live: "https://github.com/yourusername/cyber-security-dashboard",
  },
  {
    img: server,
    title: "Network Administrator",
    desc:
      "Managing and optimizing networks using Cisco technologies, ensuring reliable performance and security.",
    details:
      "This project simulates a scalable enterprise network infrastructure. I chose this to highlight my knowledge in configuring routers, switches, and secure connections for efficient communication.",
    tools: ["Cisco Packet Tracer", "Networking Fundamentals", "Linux"],
    live: "https://github.com/yourusername/network-admin-sim",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], ["-40%", "120%"]);

  // Modal state
  const [activeProject, setActiveProject] = useState(null);

  // Touch handling: first tap reveals overlay, second tap opens modal
  const [isTouch, setIsTouch] = useState(false);
  const [tappedIndex, setTappedIndex] = useState(null);
  const tappedTimerRef = useRef(null);

  // Focus trap refs
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);
  const lastFocusedRef = useRef(null);

  useEffect(() => {
    setIsTouch(typeof window !== "undefined" && "ontouchstart" in window);
  }, []);

  // Clean tapped timer on unmount
  useEffect(() => {
    return () => {
      if (tappedTimerRef.current) clearTimeout(tappedTimerRef.current);
    };
  }, []);

  // Modal open/close side effects: focus trap, ESC, scroll lock
  useEffect(() => {
    if (!activeProject) {
      // restore focus and body scroll when modal closes
      if (lastFocusedRef.current) lastFocusedRef.current.focus?.();
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", handleKeyDown);
      return;
    }

    // Save last focused element and focus the close button
    lastFocusedRef.current = document.activeElement;
    document.body.classList.add("modal-open");

    // small delay to ensure element exists
    setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setActiveProject(null);
      } else if (e.key === "Tab") {
        // trap focus inside modal
        const modal = modalRef.current;
        if (!modal) return;
        const focusable = modal.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeProject]);

  // Click handler for cards (desktop vs touch behavior)
  function handleCardClick(idx, project, e) {
    if (isTouch) {
      // if tapped before, open modal
      if (tappedIndex === idx) {
        setTappedIndex(null);
        setActiveProject(project);
        return;
      }
      // otherwise show overlay for this card first
      setTappedIndex(idx);
      if (tappedTimerRef.current) clearTimeout(tappedTimerRef.current);
      tappedTimerRef.current = setTimeout(() => setTappedIndex(null), 2800); // auto clear after 2.8s
      return;
    }

    // Desktop: open immediately
    setActiveProject(project);
  }

  // When tapping elsewhere, remove tapped overlay
  useEffect(() => {
    function clearTapOnOutside(e) {
      // if click/touch not inside a projects-box, clear
      if (!e.target.closest?.(".projects-box")) {
        setTappedIndex(null);
      }
    }
    window.addEventListener("touchstart", clearTapOnOutside, { passive: true });
    window.addEventListener("pointerdown", clearTapOnOutside);
    return () => {
      window.removeEventListener("touchstart", clearTapOnOutside);
      window.removeEventListener("pointerdown", clearTapOnOutside);
    };
  }, []);

  return (
    <section className="projects" id="projects" ref={ref}>
      <motion.div
        className="scroll-glow"
        style={{ top: glowY }}
        aria-hidden="true"
      />
      <div className="projects-wrapper">
        <motion.h2
          className="heading"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          My <span>Projects</span>
        </motion.h2>

        <div className="projects-grid">
          {projects.map((p, idx) => (
            <motion.div
              key={idx}
              className={`projects-box ${tappedIndex === idx ? "tapped" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: "easeOut" }}
              whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(255,43,43,0.45)" }}
              onClick={(e) => handleCardClick(idx, p, e)}
              onTouchStart={() => setTappedIndex(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCardClick(idx, p, e);
              }}
            >
              <img src={p.img} alt={p.title} />
              <div className="projects-info">
                {/* overlay appears on hover (desktop) or when tapped (mobile) */}
                <div className="overlay" aria-hidden="true" />
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <>
            <motion.div
              className="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
            />
            <motion.div
              className="project-modal"
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-title"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <button
                className="close-btn"
                ref={closeBtnRef}
                onClick={() => setActiveProject(null)}
                aria-label="Close preview"
              >
                &times;
              </button>

              <img src={activeProject.img} alt={activeProject.title} />

              <div className="modal-content">
                <h3 id="project-title">{activeProject.title}</h3>
                <p className="details">{activeProject.details}</p>

                <div className="tools" aria-hidden={false}>
                  {activeProject.tools.map((tool, i) => (
                    <span key={i}>{tool}</span>
                  ))}
                </div>

                <motion.a
                  href={activeProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="live-btn"
                  whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(255, 43, 43, 0.45)" }}
                >
                  View Live Site
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
