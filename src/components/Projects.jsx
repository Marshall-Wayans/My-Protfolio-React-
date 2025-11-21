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

  
  useEffect(() => {
    isTouchRef.current =
      typeof window !== "undefined" && "ontouchstart" in window;
    if (isTouchRef.current) {
      cursorRef.current?.classList.add("cursor--hidden");
    }
  }, []);

  
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

  
  const projects = [

{
id: 1,
title: "Qikao Restaurant",
description: "A modern restaurant website built to showcase my ability to design and develop multi-page front-end applications.",
image: qikaoo,
category: "Web Development",
why: "I created this project as a way to genuinely test myself beyond simple layouts and move into building a complete, realistic website experience. I wanted something that felt like a real business site, where I could think about user flow, page structure, interaction, and design choices that matter in actual development. Building Qikao Restaurant allowed me to challenge myself, grow, and demonstrate to recruiters that I can turn an idea into a working product with visual polish and functionality.",
how: "I built it using HTML, CSS, and JavaScript, focusing on clean design, responsive layouts, and smooth navigation across multiple pages. The project includes a fully structured menu page, home page, contact page, and additional sections that reflect how real users would explore a restaurant’s website. Through this, I strengthened my core front-end skills and improved the way I think about experience, layout, and front-end problem solving.",
tools: ["HTML", "CSS", "JavaScript"],
liveUrl: "https://marshall-wayans.github.io/Qikao/",
},

{
  id: 2,
  title: "Personal Portfolio Website",
  description: "A portfolio website to showcase my projects, skills, and development journey",
  image: portfolio,
  category: "Web Development",
  why: "I built this portfolio to have a central place where I could showcase my work and track my growth as a developer. While the first version was okay, I wanted to keep improving and make a version that reflected my current skills, design sense, and understanding of interactive features. It was important to me that recruiters could see not just what I built, but also how I think about structure, design, and user experience. This project is a personal milestone showing my dedication to continual learning and improvement.",
  how: "I built the portfolio using HTML, CSS, and JavaScript, focusing on clean layouts, responsive design, and interactive elements. The site allows visitors to easily explore my projects and skills, while demonstrating my ability to create functional and visually appealing websites without relying on frameworks. This helped me strengthen my core front-end skills and showcase my development journey.",
  tools: ["HTML", "CSS", "JavaScript"],
  liveUrl: "https://marshall-wayans.github.io/My-Website/"
},

{
  id: 3,
  title: "Travel Explorer Website",
  description: "A modern, interactive website for discovering and planning trips",
  image: harmony,
  category: "Web Development",
  why: "I created this project because I wanted to challenge myself and practice JavaScript in a real and practical scenario. Instead of just building a static page, I wanted users to actually interact with the site—exploring destinations, making selections, and experiencing something that feels like a real travel platform. It was also a chance to focus on layout, design, and user flow, and to show recruiters that I can think about both code and user experience at the same time.",
  how: "I built the website using HTML, CSS, and JavaScript, focusing on creating a clean layout and dynamic features that respond to user selections. This project helped me strengthen my DOM manipulation, event handling, and UI development skills, while getting comfortable building something that feels alive and functional from start to finish.",
  tools: ["HTML", "CSS", "JavaScript"],
  liveUrl: "https://marshall-wayans.github.io/HarmonyTravels/"
},


{
  id: 4,
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
  id: 5,
  title: "Qikao Restaurant App",
  description: "A modern React-based rebuild of my original Qikao Restaurant website.",
  image: qikao,
  category: "Web Development",
  why: "After building the first version of Qikao Restaurant with HTML, CSS, and JavaScript, I realized that I wanted to take the project further and show that I could build the same experience using modern frameworks. Rebuilding it in React allowed me to demonstrate growth, write cleaner and more maintainable code, and work with components, props, and state—just like real production applications. It also shows recruiters that I don’t just repeat tutorials; I challenge myself to improve and build the same idea in more professional and scalable technologies.",
  how: "I recreated the project in React to experiment with component-based development, better code structure, and smoother navigation using routing. This version allows for easier future features, faster updates, and a more professional development workflow. It reflects how I would build a real client project in a modern environment, while still staying true to the functionality and style of the original website.",
  tools: ["React", "Vite", "Routing", "UI / Icons / Styling", "Local Storage"],
  liveUrl: "https://marshall-wayans.github.io/Qikao-Restaurant/"
},
// {
//   id: 5,
//   title: "Travel Explorer Website",
//   description: "A modern, interactive website for discovering and planning trips",
//   image: harmony,
//   category: "Web Development",
//   why: "I built this project because I love traveling and wanted to create a place where people can explore destinations easily and get inspired for their next trip. I wanted it to be simple to use, visually appealing, and make planning a trip fun rather than stressful.",
//   how: "I built it using React for a smooth and interactive interface, styled everything with TailwindCSS to make it responsive and clean, and added animations with Framer Motion to make the site feel lively and modern.",
//   tools: ["React", "TailwindCSS", "Framer Motion"],
//   liveUrl: "https://marshall-wayans.github.io/HarmonyTravels/"
// },
    // {
    //   id: 4,
    //   title: "Restaurant Booking System",
    //   description: "Streamlined reservation management",
    //   image:
    //     "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
    //   category: "Web Development",
    //   why: "To simplify restaurant booking workflows.",
    //   how: "Created using MERN stack and integrated Google Calendar API.",
    //   tools: ["MongoDB", "Express", "React", "Node.js"],
    //   liveUrl: "https://your-restaurant-demo-link.com",
    // },
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

                <motion.p
          className="heading-subtext"
          style={{ fontStyle: "italic" }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Click to view my Projects
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