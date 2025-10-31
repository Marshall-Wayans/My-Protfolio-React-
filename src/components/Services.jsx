import React from "react";
import { motion } from "framer-motion";
import "./Services.css";

const services = [
  {
    icon: "fa-laptop-code",
    title: "Responsive Website Development",
    desc: "I build responsive, mobile-friendly websites that adapt smoothly to all screen sizes while maintaining speed and usability.",
  },
  {
    icon: "fa-pencil-ruler",
    title: "Custom UI/UX Implementation",
    desc: "I transform modern UI/UX designs into clean, functional websites that deliver intuitive and engaging user experiences.",
  },
  {
    icon: "fa-bullseye",
    title: "Landing Page Development",
    desc: "I create conversion-focused landing pages that help businesses generate leads, increase sales, and grow their brand.",
  },
  {
    icon: "fa-gauge-high",
    title: "Web Performance Optimization",
    desc: "I boost website loading speed and optimize performance for a smoother and more efficient user experience.",
  },
  {
    icon: "fa-plug",
    title: "API Integration",
    desc: "I integrate third-party APIs and backend services to deliver functional and dynamic web applications.",
  },
  {
    icon: "fa-browser",
    title: "Cross-Browser Compatibility",
    desc: "I ensure websites work smoothly across all major browsers including Chrome, Firefox, Safari, and Edge.",
  },
  {
    icon: "fa-code",
    title: "Design to Code Conversion",
    desc: "I convert Figma or Adobe XD designs into fully functional, responsive websites using clean and semantic code.",
  },
];

export default function Services() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
    }),
  };

  return (
    <section className="services" id="services">
      <div className="services-container">
        <motion.h2
          className="heading"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          My <span>Services</span>
        </motion.h2>

        <div className="service-grid">
          {services.map((s, i) => (
            <motion.div
              className="services-box"
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="icon-container">
                <i className={`fa-solid ${s.icon}`}></i>
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <motion.a
                href="#"
                className="btn"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(255, 43, 43, 0.5)",
                }}
              >
                Learn More
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
