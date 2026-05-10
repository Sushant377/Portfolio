import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Intro.css';

const Intro = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(false), 2400);
    const t2 = setTimeout(onComplete, 3100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="intro-overlay"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="intro-logo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
          >
            <motion.span
              className="intro-bracket"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >&lt;</motion.span>

            <motion.span
              className="intro-letters"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
            >SL</motion.span>

            <motion.span
              className="intro-bracket"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
            >/&gt;</motion.span>
          </motion.div>

          <motion.div
            className="intro-bar-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.div
              className="intro-bar"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.9 }}
            />
          </motion.div>

          <motion.p
            className="intro-tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1.1 }}
          >
            developer · trader · creator
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Intro;
