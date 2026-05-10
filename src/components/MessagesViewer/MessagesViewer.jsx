import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiDownload, FiTrash2, FiMail, FiClock, FiMessageSquare, FiLock, FiUser, FiEye, FiEyeOff, FiLogOut } from 'react-icons/fi';
import { getMessages, deleteMessage, exportMessages } from '../../utils/messageStore';
import './MessagesViewer.css';

const CREDS = { username: 'sushan', password: 'me7@Sushan' };

const MessagesViewer = () => {
  const [open,      setOpen]      = useState(false);
  const [authed,    setAuthed]    = useState(false);
  const [messages,  setMessages]  = useState([]);
  const [username,  setUsername]  = useState('');
  const [password,  setPassword]  = useState('');
  const [showPass,  setShowPass]  = useState(false);
  const [error,     setError]     = useState('');
  const [shake,     setShake]     = useState(false);

  const refresh = useCallback(() => setMessages(getMessages()), []);

  /* Ctrl + Shift + M */
  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'M') {
        setOpen(prev => !prev);
        if (!authed) { setUsername(''); setPassword(''); setError(''); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [authed]);

  useEffect(() => { if (open && authed) refresh(); }, [open, authed, refresh]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === CREDS.username && password === CREDS.password) {
      setAuthed(true);
      setError('');
      refresh();
    } else {
      setError('Invalid username or password');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleLogout = () => {
    setAuthed(false);
    setUsername('');
    setPassword('');
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    if (!authed) { setUsername(''); setPassword(''); setError(''); }
  };

  const handleDelete = (id) => { deleteMessage(id); refresh(); };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="mv-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="mv-panel"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
          >
            {!authed ? (
              /* ── Login screen ── */
              <motion.div
                className="mv-login"
                animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
                transition={{ duration: 0.4 }}
              >
                <button className="mv-close mv-close-abs" onClick={handleClose}>
                  <FiX size={18} />
                </button>

                <div className="mv-login-icon">
                  <FiLock size={28} />
                </div>
                <h2 className="mv-login-title">Admin Access</h2>
                <p className="mv-login-sub">Enter your credentials to view messages</p>

                <form className="mv-login-form" onSubmit={handleLogin}>
                  <div className="mv-field">
                    <FiUser className="mv-field-icon" size={15} />
                    <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      autoFocus
                      required
                    />
                  </div>
                  <div className="mv-field">
                    <FiLock className="mv-field-icon" size={15} />
                    <input
                      type={showPass ? 'text' : 'password'}
                      placeholder="Password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="mv-eye"
                      onClick={() => setShowPass(p => !p)}
                      tabIndex={-1}
                    >
                      {showPass ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                    </button>
                  </div>

                  {error && (
                    <motion.p
                      className="mv-error"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {error}
                    </motion.p>
                  )}

                  <button type="submit" className="mv-login-btn">
                    Sign In
                  </button>
                </form>

                <p className="mv-footer-hint">
                  <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd> to toggle
                </p>
              </motion.div>
            ) : (
              /* ── Messages panel ── */
              <>
                <div className="mv-header">
                  <div className="mv-title">
                    <FiMessageSquare size={18} />
                    <span>Inbox <span className="mv-count">{messages.length}</span></span>
                  </div>
                  <div className="mv-actions">
                    {messages.length > 0 && (
                      <button className="mv-btn" onClick={exportMessages} title="Download as JSON">
                        <FiDownload size={15} /> Export
                      </button>
                    )}
                    <button className="mv-btn mv-btn-logout" onClick={handleLogout} title="Sign out">
                      <FiLogOut size={15} /> Logout
                    </button>
                    <button className="mv-close" onClick={handleClose}>
                      <FiX size={18} />
                    </button>
                  </div>
                </div>

                <div className="mv-body">
                  {messages.length === 0 ? (
                    <div className="mv-empty">
                      <FiMail size={40} />
                      <p>No messages yet</p>
                    </div>
                  ) : (
                    messages.map(msg => (
                      <div key={msg.id} className="mv-card">
                        <div className="mv-card-header">
                          <div>
                            <span className="mv-name">{msg.name}</span>
                            <span className="mv-email">{msg.email}</span>
                          </div>
                          <button className="mv-delete" onClick={() => handleDelete(msg.id)}>
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                        {msg.subject && <div className="mv-subject">{msg.subject}</div>}
                        <p className="mv-message">{msg.message}</p>
                        <div className="mv-time">
                          <FiClock size={11} />
                          {new Date(msg.timestamp).toLocaleString()}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="mv-footer">
                  Press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd> to close
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MessagesViewer;
