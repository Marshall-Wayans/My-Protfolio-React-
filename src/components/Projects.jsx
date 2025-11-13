import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ProjectModal from "./ProjectsModal";
import iccmkenya from "../assets/iccmkenya.png";
import qikao from "../assets/qikao.png";
import harmony from "../assets/harmony.png";
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
  title: "Charity Organization",
  description: "A community-driven platform built to highlight the mission and impact of ICCM Kenya.",
  image: iccmkenya,
  category: "Web Development",
  why: "I wanted to create a meaningful project that wasn’t just about code, but about people. ICCM Kenya’s mission to uplift communities inspired me to design a website that gives their work visibility and encourages support.",
  how: "I built it using React and Vite to achieve a smooth, fast experience. The website features dynamic routing with React Router, a clean modern UI, scroll animations, and dark mode support. It’s responsive, light, and tells a story with every section.",
  tools: ["React", "Vite", "React Router", "CSS"],
  liveUrl: "https://marshall-wayans.github.io/NGO-Website/",
},
{
  "id": 2,
  "title": "Qikao Restaurant App",
  "description": "Analytics dashboard for creative professionals",
  "image": qikao,
  "category": "Web Development",
  "why": "I built this project because I wanted to give restaurant owners and creative professionals an easy way to see their project stats and client data. A lot of dashboards out there are either too messy or boring, so I wanted to make something that looks clean and is easy to use.",
  "how": "I used Next.js to make the app fast and smooth, TailwindCSS for a responsive design that works on any device, and Framer Motion to add some cool animations. My goal was to make the dashboard easy to read and enjoyable to use.",
  "tools": ["React", "Vite", "Routing", "UI / Icons / Styling", "Local Storage"],
  "liveUrl": "https://marshall-wayans.github.io/Qikao-Restaurant/"
},
{
  "id": 2,
  "title": "Travel Explorer Website",
  "description": "A modern, interactive website for discovering and planning trips",
  "image": harmony,
  "category": "Web Development",
  "why": "I built this project because I love traveling and wanted to create a place where people can explore destinations easily and get inspired for their next trip. I wanted it to be simple to use, visually appealing, and make planning a trip fun rather than stressful.",
  "how": "I built it using React for a smooth and interactive interface, styled everything with TailwindCSS to make it responsive and clean, and added animations with Framer Motion to make the site feel lively and modern.",
  "tools": ["React", "TailwindCSS", "Framer Motion"],
  "liveUrl": "https://marshall-wayans.github.io/HarmonyTravels/"
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

      
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}