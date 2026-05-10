import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

const navLinks = [
  { name: 'About',    href: '#about',     num: '01.', id: 'about'     },
  { name: 'Skills',   href: '#skills',    num: '02.', id: 'skills'    },
  { name: 'Services', href: '#services',  num: '03.', id: 'services'  },
  { name: 'Hobbies',  href: '#interests', num: '04.', id: 'interests' },
  { name: 'Contact',  href: '#contact',   num: '05.', id: 'contact'   },
];

const ThemeToggle = ({ mobile = false }) => {
  const { theme, themeIndex, cycleTheme, themes } = useTheme();
  return (
    <button
      className={`theme-toggle${mobile ? ' mobile-theme-toggle' : ''}`}
      onClick={cycleTheme}
      title={`Theme: ${theme.name} — click to change`}
      aria-label="Change theme"
    >
      <span className="theme-dots">
        {themes.map((t, i) => (
          <span
            key={t.name}
            className={`theme-dot${i === themeIndex ? ' active' : ''}`}
            style={{ background: t.accent }}
          />
        ))}
      </span>
      <span className="theme-icon">{theme.icon}</span>
    </button>
  );
};

const Navbar = () => {
  const [scrolled,       setScrolled]       = useState(false);
  const [menuOpen,       setMenuOpen]       = useState(false);
  const [activeSection,  setActiveSection]  = useState('home');

  /* Scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Active section via IntersectionObserver */
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3, rootMargin: '-60px 0px -40% 0px' }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <motion.header
        className={`navbar${scrolled ? ' scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <a href="#home" className="logo">
          <span className="logo-bracket">&lt;</span>SL<span className="logo-bracket">/&gt;</span>
        </a>

        <nav className="nav-links">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              className={activeSection === link.id ? 'active' : ''}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.4 }}
            >
              <span className="num">{link.num}</span>{link.name}
            </motion.a>
          ))}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
            <ThemeToggle />
          </motion.div>
        </nav>

        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div className="mobile-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeMenu} />
            <motion.aside className="mobile-menu" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.3 }}>
              <nav>
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={closeMenu}
                    className={activeSection === link.id ? 'active' : ''}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i + 0.1 }}
                  >
                    <span className="num">{link.num}</span>{link.name}
                  </motion.a>
                ))}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
                  <ThemeToggle mobile />
                </motion.div>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
