import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ProjectModal from "./ProjectsModal";
import iccmkenya from "../assets/iccmkenya.png";
import qikao from "../assets/qikao.png";
import harmony from "../assets/Harmony.png";
import qikaoo from "../assets/Qikaoo.png";
import portfolio from "../assets/Portfolio.png";
import "./Projects.css";

export default function Projects() {
  const cursorRef = useRef(null);
  const isTouchRef = useRef(false);
  const rafRef = useRef(null);
  const pointer = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const cursorState = useRef({
    x: pointer.current.x,
    y: pointer.current.y,
    scale: 1,
  });

  const [selectedProject, setSelectedProject] = useState(null);

  // Detect touch devices
  useEffect(() => {
    isTouchRef.current =
      typeof window !== "undefined" && "ontouchstart" in window;
    if (isTouchRef.current) {
      cursorRef.current?.classList.add("cursor--hidden");
    }
  }, []);

  // Animate cursor
  useEffect(() => {
    const cursorEl = cursorRef.current;
    if (!cursorEl) return;
    const lerp = (a, b, n) => (1 - n) * a + n * b;

    const animateCursor = () => {
      cursorState.current.x = lerp(cursorState.current.x, pointer.current.x, 0.15);
      cursorState.current.y = lerp(cursorState.current.y, pointer.current.y, 0.15);
      cursorEl.style.transform = `translate3d(${
        cursorState.current.x - 18
      }px, ${cursorState.current.y - 18}px, 0) scale(${
        cursorState.current.scale
      })`;
      rafRef.current = requestAnimationFrame(animateCursor);
    };

    rafRef.current = requestAnimationFrame(animateCursor);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Track pointer movement
  useEffect(() => {
    const move = (e) => {
      if (e.touches && e.touches[0]) {
        pointer.current.x = e.touches[0].clientX;
        pointer.current.y = e.touches[0].clientY;
      } else {
        pointer.current.x = e.clientX;
        pointer.current.y = e.clientY;
      }
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchmove", move);
    };
  }, []);

  // Magnetic hover cursor effect
  useEffect(() => {
    const cursor = cursorRef.current;
    const hoverTargets = document.querySelectorAll(
      ".projects-box, .view-project-btn"
    );

    const handleMouseEnter = () => {
      cursor.classList.add("cursor--hover");
      cursorState.current.scale = 1.8;
    };

    const handleMouseLeave = () => {
      cursor.classList.remove("cursor--hover");
      cursorState.current.scale = 1;
    };

    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      hoverTargets.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: "Qikao Restaurant",
      description:
        "A modern restaurant website built to showcase my ability to design and develop multi-page front-end applications.",
      image: qikaoo,
      category: "Web Development",
      why: "I created this project as a way to genuinely test myself beyond simple layouts and move into building a complete, realistic website experience...",
      how: "I built it using HTML, CSS, and JavaScript, focusing on clean design, responsive layouts, and smooth navigation across multiple pages...",
      tools: ["HTML", "CSS", "JavaScript"],
      liveUrl: "https://marshall-wayans.github.io/Qikao/",
    },
    {
      id: 2,
      title: "Personal Portfolio Website",
      description: "A portfolio website to showcase my projects, skills, and development journey",
      image: portfolio,
      category: "Web Development",
      why: "I built this portfolio to have a central place where I could showcase my work and track my growth as a developer...",
      how: "I built the portfolio using HTML, CSS, and JavaScript, focusing on clean layouts, responsive design, and interactive elements...",
      tools: ["HTML", "CSS", "JavaScript"],
      liveUrl: "https://marshall-wayans.github.io/My-Website/",
    },
    {
      id: 3,
      title: "Travel Explorer Website",
      description: "A modern, interactive website for discovering and planning trips",
      image: harmony,
      category: "Web Development",
      why: "I created this project because I wanted to challenge myself and practice JavaScript in a real and practical scenario...",
      how: "I built the website using HTML, CSS, and JavaScript, focusing on creating a clean layout and dynamic features that respond to user selections...",
      tools: ["HTML", "CSS", "JavaScript"],
      liveUrl: "https://marshall-wayans.github.io/HarmonyTravels/",
    },
    {
      id: 4,
      title: "Charity Organization",
      description: "A community-driven platform built to highlight the mission and impact of ICCM Kenya.",
      image: iccmkenya,
      category: "Web Development",
      why: "I wanted to create a meaningful project that wasn’t just about code, but about people...",
      how: "I built it using React and Vite to achieve a smooth, fast experience...",
      tools: ["React", "Vite", "React Router", "CSS"],
      liveUrl: "https://marshall-wayans.github.io/NGO-Website/",
    },
    {
      id: 5,
      title: "Qikao Restaurant App",
      description: "A modern React-based rebuild of my original Qikao Restaurant website.",
      image: qikao,
      category: "Web Development",
      why: "After building the first version of Qikao Restaurant, I realized I wanted to show the same experience in React...",
      how: "I recreated the project in React to experiment with component-based development, better code structure, and smoother navigation using routing...",
      tools: ["React", "Vite", "Routing", "UI / Icons / Styling", "Local Storage"],
      liveUrl: "https://marshall-wayans.github.io/Qikao-Restaurant/",
    },
  ];

  return (
    <section className="projects">
      {/* Custom Cursor */}
      <div ref={cursorRef} className="site-cursor" aria-hidden="true" />

      <div className="projects-wrapper">
        {/* Heading */}
        <motion.h2
          className="heading"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          My <span>Projects</span>
        </motion.h2>

        {/* Subtext matching theme */}
        <motion.p
          className="heading-subtext"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          style={{
            textAlign: "center",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "1.1rem",
            color: "var(--accent-primary)",
            marginBottom: "3rem",
          }}
        >
          Click to explore my creations
        </motion.p>

        {/* Projects Grid */}
        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="projects-box"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10, scale: 1.03 }}
              onClick={() => setSelectedProject(project)}
            >
              <img src={project.image} alt={project.title} />
              <div className="projects-info">
                <span className="category">{project.category}</span>
                <h4>{project.title}</h4>
                <p>{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}