import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeroImage from "../assets/My best Edit.png";
import "./Hero.css";

const texts = [
  "I'm a Web And App Designer",
  "I'm a Front-End Developer",
  "I Optimise SEO",
  "I Deploy Web Apps",
];

export default function Hero() {
  const [textIndex, setTextIndex] = useState(0);
  const [gradientPos, setGradientPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMove = (e) => {
      let x, y;
      if (e.touches && e.touches[0]) {
        x = (e.touches[0].clientX / window.innerWidth) * 100;
        y = (e.touches[0].clientY / window.innerHeight) * 100;
      } else {
        x = (e.clientX / window.innerWidth) * 100;
        y = (e.clientY / window.innerHeight) * 100;
      }
      setGradientPos({ x, y });
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
    };
  }, []);

  return (
    <section
      className="home"
      id="home"
      style={{
        background: `
          radial-gradient(
            circle at ${gradientPos.x}% ${gradientPos.y}%,
            rgba(255, 43, 43, 0.35) 0%,
            rgba(255, 43, 43, 0.05) 20%,
            transparent 50%
          ),
          radial-gradient(
            circle at 70% 80%,
            rgba(255, 43, 43, 0.1) 0%,
            transparent 60%
          )
        `,
        filter: "blur(0px)",
      }}
    >
      <div className="home-container">
        <motion.div
          className="home-content"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1>
            Hi, I'm <span>Marshal Wayans</span>
          </h1>

          <div className="text-animation">
            <motion.div
              key={textIndex}
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              {texts[textIndex]}
            </motion.div>
          </div>

          <p>
            I'm a passionate software engineer crafting elegant and optimized solutions
            with precision and creativity.
          </p>

          <div className="social-icons">
            <motion.a
              whileHover={{ scale: 1.15, boxShadow: "0 0 20px rgba(255,43,43,0.7)" }}
              href="https://github.com/Marshall-Wayans"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-github"></i>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.15, boxShadow: "0 0 20px rgba(255,43,43,0.7)" }}
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-twitter"></i>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.15, boxShadow: "0 0 20px rgba(255,43,43,0.7)" }}
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-linkedin"></i>
            </motion.a>
          </div>

          <motion.a
            href="#contact"
            className="btn"
            whileHover={{ scale: 1.08, boxShadow: "0 0 25px rgba(255,43,43,0.8)" }}
          >
            HIRE ME <i className="fa-solid fa-arrow-right"></i>
          </motion.a>
        </motion.div>

        <motion.div
          className="home-img"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        >
          <img src={HeroImage} alt="Marshal Wayans" />
        </motion.div>
      </div>
    </section>
  );
}