import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./Skills.css";

export default function SkillsSection() {
  const cursorRef = useRef(null);
  const rafRef = useRef(null);
  const pointer = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const cursorState = useRef({
    x: pointer.current.x,
    y: pointer.current.y,
    scale: 1,
  });

  const skills = [
    { name: "React & TypeScript", level: 95 },
    { name: "UI / UX Design", level: 90 },
    { name: "Creative Development", level: 88 },
    { name: "Animation & Motion", level: 85 },
  ];

  
  useEffect(() => {
    const move = (e) => {
      pointer.current.x = e.clientX;
      pointer.current.y = e.clientY;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

 
  useEffect(() => {
    const cursorEl = cursorRef.current;
    const lerp = (a, b, n) => (1 - n) * a + n * b;

    const animateCursor = () => {
      cursorState.current.x = lerp(cursorState.current.x, pointer.current.x, 0.15);
      cursorState.current.y = lerp(cursorState.current.y, pointer.current.y, 0.15);
      cursorEl.style.transform = `
        translate3d(${cursorState.current.x - 18}px, ${cursorState.current.y - 18}px, 0)
        scale(${cursorState.current.scale})
      `;
      rafRef.current = requestAnimationFrame(animateCursor);
    };
    rafRef.current = requestAnimationFrame(animateCursor);

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  
  useEffect(() => {
    const cursor = cursorRef.current;
    const hoverTargets = document.querySelectorAll(".skill-row");

    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorState.current.scale = 1.7;
      });
      el.addEventListener("mouseleave", () => {
        cursorState.current.scale = 1;
      });
    });
  }, []);

  return (
    <section className="skills-section">
      
      <div ref={cursorRef} className="skill-cursor" aria-hidden="true" />

      <div className="skills-wrapper">
        <motion.h2
          className="skills-heading"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Skills <span>& Expertise</span>
        </motion.h2>

        <div className="skills-list">
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              className="skill-row"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="skill-info">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-value">{skill.level}%</span>
              </div>

              <div className="skill-bar-container">
                <motion.div
                  className="skill-bar"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}