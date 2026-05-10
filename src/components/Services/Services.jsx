import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiCode, FiMonitor, FiCpu } from 'react-icons/fi';
import { MdOutlineDesignServices } from 'react-icons/md';
import './Services.css';

const services = [
  {
    icon: FiMonitor,
    title: 'Web Development',
    description:
      'Building responsive, performant websites and web applications using modern technologies like HTML5, CSS3, and JavaScript. Clean code, great UX.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'React'],
  },
  {
    icon: MdOutlineDesignServices,
    title: 'Graphics Designing',
    description:
      'Creating visually appealing designs for digital and print media. From logos to UI mockups, I blend aesthetics with functionality.',
    tags: ['Figma', 'Photoshop', 'Canva', 'UI/UX'],
  },
  {
    icon: FiCpu,
    title: 'Software Development',
    description:
      'Developing applications and tools with modern languages and frameworks. Focused on writing efficient, maintainable, and scalable code.',
    tags: ['React.js', 'Next.js', 'Algorithms', 'OOP'],
  },
];

const Services = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="services" ref={ref}>
      <div className="container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="num">03.</span>
          <h2>What I Do</h2>
        </motion.div>

        <div className="services-grid">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.title}
                className="service-card"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 + 0.2 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <div className="card-top">
                  <FiCode className="card-folder" />
                </div>
                <div className="card-icon">
                  <Icon size={36} />
                </div>
                <h3 className="card-title">{svc.title}</h3>
                <p className="card-desc">{svc.description}</p>
                <div className="card-tags">
                  {svc.tags.map(tag => (
                    <span key={tag} className="card-tag">{tag}</span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
