import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';
import { FiInstagram, FiYoutube, FiMail, FiMapPin, FiSend, FiLoader } from 'react-icons/fi';
import { saveMessage } from '../../utils/messageStore';
import './Contact.css';

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const socials = [
  { icon: FaFacebookF, href: 'https://www.facebook.com/sushant.lam/',                         label: 'Facebook',  color: '#3B5999' },
  { icon: FaTwitter,   href: 'https://twitter.com/sushantnp7',                                label: 'Twitter',   color: '#46C1F6' },
  { icon: FiInstagram, href: 'https://www.instagram.com/sushan__official_/',                  label: 'Instagram', color: '#e1306c' },
  { icon: FiYoutube,   href: 'https://www.youtube.com/channel/UCjjQkbcK6njkdaNPQMsB-9g',     label: 'YouTube',   color: '#FF0000' },
];

const empty = { name: '', email: '', subject: '', message: '' };

const Contact = () => {
  const ref      = useRef(null);
  const formRef  = useRef(null);
  const inView   = useInView(ref, { once: true, margin: '-80px' });

  const [form,    setForm]    = useState(empty);
  const [status,  setStatus]  = useState('idle'); // idle | sending | success | error

  const handleChange = e => setForm(s => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');

    /* 1 ── Save to localStorage */
    saveMessage(form);

    /* 2 ── Send email via EmailJS if configured */
    const emailConfigured =
      SERVICE_ID  && SERVICE_ID  !== 'YOUR_SERVICE_ID' &&
      TEMPLATE_ID && TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' &&
      PUBLIC_KEY  && PUBLIC_KEY  !== 'YOUR_PUBLIC_KEY';

    if (emailConfigured) {
      try {
        await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
        setStatus('success');
      } catch {
        setStatus('saved');
      }
    } else {
      setStatus('saved');
    }

    setForm(empty);
    setTimeout(() => setStatus('idle'), 5000);
  };

  const btnLabel = () => {
    if (status === 'sending') return <><FiLoader className="spin" size={16}/>Sending…</>;
    if (status === 'success') return <>✓ Message Sent!</>;
    if (status === 'saved')   return <>✓ Message Saved!</>;
    return <><FiSend size={16}/>Send Message</>;
  };

  return (
    <section id="contact" ref={ref}>
      <div className="container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="num">05.</span>
          <h2>Get In Touch</h2>
        </motion.div>

        <div className="contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="contact-heading">Let&apos;s Work Together</h3>
            <p className="contact-text">
              I&apos;m currently open to new opportunities and collaborations. Whether
              you have a project in mind, a question, or just want to say hi —
              my inbox is always open!
            </p>

            <div className="contact-details">
              <div className="contact-detail">
                <FiMail className="detail-icon" />
                <div>
                  <span className="detail-label">Email</span>
                  <a href="mailto:sushanlamichhane07@gmail.com" className="detail-value">
                    sushanlamichhane07@gmail.com
                  </a>
                </div>
              </div>
              <div className="contact-detail">
                <FiMapPin className="detail-icon" />
                <div>
                  <span className="detail-label">Location</span>
                  <span className="detail-value">Bhaktapur, Nepal</span>
                </div>
              </div>
            </div>

            <div className="social-row">
              {socials.map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="social-btn"
                  whileHover={{ y: -4, backgroundColor: color, borderColor: color }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="contact-form-wrap"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" placeholder="Your name"
                    value={form.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="your@email.com"
                    value={form.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input id="subject" name="subject" type="text" placeholder="What's this about?"
                  value={form.subject} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={5} placeholder="Your message here…"
                  value={form.message} onChange={handleChange} required />
              </div>
              <motion.button
                type="submit"
                className={`submit-btn status-${status}`}
                disabled={status === 'sending'}
                whileHover={status === 'idle' ? { scale: 1.02 } : {}}
                whileTap={status === 'idle' ? { scale: 0.98 } : {}}
              >
                {btnLabel()}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
