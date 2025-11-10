import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ProjectModal from "./ProjectsModal";
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

  // detect touch devices
  useEffect(() => {
    isTouchRef.current =
      typeof window !== "undefined" && "ontouchstart" in window;
    if (isTouchRef.current) {
      cursorRef.current?.classList.add("cursor--hidden");
    }
  }, []);

  // cursor animation
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

  // pointer tracking
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

  // hover effects for cursor
  useEffect(() => {
    const cursor = cursorRef.current;
    const hoverTargets = document.querySelectorAll(
      ".projects-box, .view-project-btn"
    );

    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("cursor--hover");
        cursorState.current.scale = 1.8;
      });
      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("cursor--hover");
        cursorState.current.scale = 1;
      });
    });

    return () => {
      hoverTargets.forEach((el) => {
        el.removeEventListener("mouseenter", () => {});
        el.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);

  // sample projects
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A modern shopping experience with seamless checkout",
      image:
        "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
      category: "Web Development",
      why: "To create a fast, secure, and scalable shopping experience.",
      how: "Built with React, Node.js, and Stripe API for real payments.",
      tools: ["React", "Node.js", "Stripe", "MongoDB"],
      liveUrl: "https://your-ecommerce-demo-link.com",
    },
    {
      id: 2,
      title: "Portfolio Dashboard",
      description: "Analytics dashboard for creative professionals",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      category: "UI/UX Design",
      why: "To visualize project stats and client analytics beautifully.",
      how: "Used Next.js, TailwindCSS, and Framer Motion for animations.",
      tools: ["Next.js", "TailwindCSS", "Framer Motion"],
      liveUrl: "https://your-dashboard-demo-link.com",
    },
    {
      id: 3,
      title: "Fitness Tracking App",
      description: "Track workouts and achieve fitness goals",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop",
      category: "Mobile Design",
      why: "To help users stay motivated and monitor their progress.",
      how: "Developed with React Native and Firebase backend.",
      tools: ["React Native", "Firebase", "Expo"],
      liveUrl: "https://your-fitness-app-demo-link.com",
    },
    {
      id: 4,
      title: "Restaurant Booking System",
      description: "Streamlined reservation management",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
      category: "Web Development",
      why: "To simplify restaurant booking workflows.",
      how: "Created using MERN stack and integrated Google Calendar API.",
      tools: ["MongoDB", "Express", "React", "Node.js"],
      liveUrl: "https://your-restaurant-demo-link.com",
    },
  ];

  return (
    <section className="projects">
      {/* Custom Cursor */}
      <div ref={cursorRef} className="site-cursor" aria-hidden="true" />

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

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}