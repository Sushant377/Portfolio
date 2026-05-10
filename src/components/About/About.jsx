import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './About.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref}>
      <div className="container">
        <motion.div
          className="section-heading"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <span className="num">01.</span>
          <h2>About Me</h2>
        </motion.div>

        <div className="about-grid">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p>
              Hello! I&apos;m <span className="accent">Sushan Lamichhane</span>, a passionate
              IT student currently pursuing <span className="accent">BSc.CSIT</span> in Nepal.
            </p>
            <p>
              My journey in tech started with curiosity about how websites work, which
              quickly grew into a passion for building things from scratch. I enjoy
              crafting code that solves real problems and creates meaningful experiences.
            </p>
            <p>
              Beyond coding, I&apos;m deeply passionate about financial markets. I work as a{' '}
              <span className="accent">Stock Trader</span> and{' '}
              <span className="accent">Technical Analyst</span>, studying price action,
              chart patterns, and market psychology to make data-driven investment decisions.
              I combine my IT background with market analysis to build smarter trading strategies.
            </p>
            <p>
              I currently run my own <span className="accent">IT &amp; Investment company</span>,
              delivering software solutions and financial consulting — merging technology and
              capital markets to create real-world impact.
            </p>

            <div className="about-tech">
              <p className="tech-label">Technologies I&apos;ve been working with:</p>
              <ul className="tech-list">
                {['HTML5', 'CSS3', 'JavaScript', 'C / C++', 'React.js', 'Next.js', 'Flutter', 'Git'].map(t => (
                  <li key={t}>
                    <span className="tech-arrow">▹</span>{t}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            className="about-image-wrap"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <div className="image-container">
              <img src="/images/profile-1.jpg" alt="Sushan Lamichhane" loading="lazy" width="280" height="280" />
              <div className="image-border" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
