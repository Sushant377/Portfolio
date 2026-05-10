import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Skills.css';

const skills = [
  { name: 'HTML5', level: 90, icon: '🌐' },
  { name: 'CSS3', level: 60, icon: '🎨' },
  { name: 'JavaScript', level: 70, icon: '⚡' },
  { name: 'React.js', level: 80, icon: '⚛️' },
  { name: 'Next.js', level: 70, icon: '▲' },
  { name: 'Git', level: 70, icon: '🗂️' },
];

const tools = [
  'VS Code', 'Git & GitHub', 'Figma', 'Photoshop',
  'Linux', 'Android Studio', 'Canva',
];

const SkillBar = ({ name, level, icon, index, inView }) => (
  <div className="skill-item">
    <div className="skill-header">
      <span className="skill-name">
        <span className="skill-icon">{icon}</span>
        {name}
      </span>
      <span className="skill-pct">{level}%</span>
    </div>
    <div className="skill-track">
      <motion.div
        className="skill-fill"
        initial={{ width: 0 }}
        animate={inView ? { width: `${level}%` } : { width: 0 }}
        transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
      />
    </div>
  </div>
);

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" ref={ref}>
      <div className="container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="num">02.</span>
          <h2>Skills</h2>
        </motion.div>

        <div className="skills-grid">
          <div className="skills-bars">
            <motion.p
              className="skills-intro"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              A full-stack developer, stock trader, and technical analyst with 5+ years
              of hands-on experience. Currently running my own IT &amp; Investment company.
              Here&apos;s a snapshot of my current proficiency:
            </motion.p>
            <div className="bars-list">
              {skills.map((s, i) => (
                <SkillBar key={s.name} {...s} index={i} inView={inView} />
              ))}
            </div>
          </div>

          <div className="skills-tools">
            <motion.h3
              className="tools-title"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              Tools & Environments
            </motion.h3>
            <div className="tools-grid">
              {tools.map((tool, i) => (
                <motion.div
                  key={tool}
                  className="tool-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: i * 0.07 + 0.4 }}
                  whileHover={{ y: -3, borderColor: 'var(--accent)', color: 'var(--accent)' }}
                >
                  {tool}
                </motion.div>
              ))}
            </div>

            <motion.div
              className="skills-fact"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
            >
              <div className="fact-item">
                <span className="fact-num">5+</span>
                <span className="fact-label">Years Coding</span>
              </div>
              <div className="fact-divider" />
              <div className="fact-item">
                <span className="fact-num">45+</span>
                <span className="fact-label">Projects Built</span>
              </div>
              <div className="fact-divider" />
              <div className="fact-item">
                <span className="fact-num">5+</span>
                <span className="fact-label">Languages</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
