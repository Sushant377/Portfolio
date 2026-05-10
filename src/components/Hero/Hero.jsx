import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiGithub, FiLinkedin, FiYoutube, FiInstagram } from 'react-icons/fi';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';
import './Hero.css';

const socialLinks = [
  { icon: FaFacebookF, href: 'https://www.facebook.com/sushant.lam/', label: 'Facebook' },
  { icon: FaTwitter, href: 'https://twitter.com/sushantnp7', label: 'Twitter' },
  { icon: FiInstagram, href: 'https://www.instagram.com/sushan__official_/', label: 'Instagram' },
  { icon: FiYoutube, href: 'https://www.youtube.com/channel/UCjjQkbcK6njkdaNPQMsB-9g', label: 'YouTube' },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.4 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Hero = () => (
  <section id="home" className="hero-section">
    <div className="hero-bg">
      <div className="hero-grid" />
      <div className="hero-blob blob-1" />
      <div className="hero-blob blob-2" />
    </div>

    <div className="side-links left">
      {socialLinks.map(({ icon: Icon, href, label }) => (
        <motion.a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
          whileHover={{ y: -3, color: 'var(--accent)' }}
        >
          <Icon size={20} />
        </motion.a>
      ))}
      <span className="side-line" />
    </div>

    <div className="side-links right">
      <motion.a
        href="mailto:sushanlamichhane07@gmail.com"
        className="email-link"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
        whileHover={{ y: -3, color: 'var(--accent)' }}
      >
        sushanlamichhane07@gmail.com
      </motion.a>
      <span className="side-line" />
    </div>

    <div className="container hero-content">
      <motion.div
        className="hero-text"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p className="hero-greeting" variants={item}>
          Hi, my name is
        </motion.p>

        <motion.h1 className="hero-name" variants={item}>
          Sushan Lamichhane.
        </motion.h1>

        <motion.h2 className="hero-tagline" variants={item}>
          I&apos;m a{' '}
          <TypeAnimation
            sequence={[
              'Developer.', 2000,
              'Designer.', 2000,
              'Beatboxer.', 2000,
              'Freelancer.', 2000,
              'Stock Trader.', 2000,
              'Technical Analyst.', 2000,
            ]}
            repeat={Infinity}
            speed={50}
            deletionSpeed={60}
            wrapper="span"
            className="typing-text"
          />
        </motion.h2>

        <motion.p className="hero-desc" variants={item}>
          I&apos;m a BSc.CSIT student passionate about building impactful digital
          experiences. Currently focused on web development, software engineering,
          and making my mark on the world through technology.
        </motion.p>

        <motion.div className="hero-cta" variants={item}>
          <a href="#contact" className="btn-primary">Get In Touch</a>
          <a href="#about" className="btn-ghost">Learn More</a>
        </motion.div>
      </motion.div>
    </div>

    <motion.div
      className="scroll-hint"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8 }}
    >
      <span className="scroll-text">scroll</span>
      <span className="scroll-bar" />
    </motion.div>
  </section>
);

export default Hero;
