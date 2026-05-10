import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <motion.div
      className="footer-content"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <a href="#home" className="footer-logo">
        <span className="logo-bracket">&lt;</span>SL<span className="logo-bracket">/&gt;</span>
      </a>
      <p className="footer-text">
        Designed &amp; Built by{' '}
        <a
          href="https://sushanlamichhane.com.np"
          target="_blank"
          rel="noreferrer"
          className="footer-link"
        >
          Sushan Lamichhane
        </a>
      </p>
      <p className="footer-copy">© {new Date().getFullYear()} All rights reserved.</p>
    </motion.div>
  </footer>
);

export default Footer;
