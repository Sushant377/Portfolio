import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Interests.css';

/* ── SVG illustrations ── */

const CandlestickSvg = () => (
  <svg viewBox="0 0 260 120" className="finance-svg" preserveAspectRatio="xMidYMid meet">
    {[20,45,70,95].map(y => (
      <line key={y} x1="0" y1={y} x2="260" y2={y} stroke="rgba(100,255,218,0.07)" strokeWidth="1"/>
    ))}
    <polyline points="10,100 50,82 90,70 130,55 170,38 210,22 250,12"
      fill="none" stroke="rgba(100,255,218,0.3)" strokeWidth="1.5" strokeDasharray="4 2"/>
    {[
      {x:18,  open:95, close:78, high:70,  low:100, green:true },
      {x:42,  open:78, close:62, high:55,  low:82,  green:true },
      {x:66,  open:68, close:75, high:72,  low:80,  green:false},
      {x:90,  open:62, close:48, high:42,  low:66,  green:true },
      {x:114, open:50, close:38, high:32,  low:54,  green:true },
      {x:138, open:42, close:50, high:48,  low:56,  green:false},
      {x:162, open:35, close:22, high:16,  low:38,  green:true },
      {x:186, open:26, close:18, high:12,  low:30,  green:true },
      {x:210, open:20, close:28, high:26,  low:35,  green:false},
      {x:234, open:16, close:8,  high:4,   low:20,  green:true },
    ].map((c,i) => {
      const color = c.green ? '#64ffda' : '#ff6b6b';
      const bodyTop = Math.min(c.open, c.close);
      const bodyH   = Math.abs(c.open - c.close) || 3;
      return (
        <g key={i}>
          <line x1={c.x+5} y1={c.high} x2={c.x+5} y2={c.low} stroke={color} strokeWidth="1.2" opacity="0.7"/>
          <rect x={c.x} y={bodyTop} width="10" height={bodyH} fill={color} opacity="0.85" rx="1"/>
        </g>
      );
    })}
    {[18,42,66,90,114,138,162,186,210,234].map((x,i) => (
      <rect key={x} x={x} y={108-(i%3+1)*4} width="10" height={(i%3+1)*4}
        fill="rgba(100,255,218,0.18)" rx="1"/>
    ))}
  </svg>
);

const AnalystSvg = () => (
  <svg viewBox="0 0 260 120" className="finance-svg" preserveAspectRatio="xMidYMid meet">
    {[20,45,70,95].map(y => (
      <line key={y} x1="0" y1={y} x2="260" y2={y} stroke="rgba(130,120,255,0.08)" strokeWidth="1"/>
    ))}
    <defs>
      <linearGradient id="aG" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(100,255,218,0.22)"/>
        <stop offset="100%" stopColor="rgba(100,255,218,0)"/>
      </linearGradient>
    </defs>
    <path d="M0,90 Q30,75 60,60 T120,40 T180,28 T240,15 L260,15 L260,110 L0,110 Z" fill="url(#aG)"/>
    <path d="M0,90 Q30,75 60,60 T120,40 T180,28 T240,15" fill="none" stroke="#64ffda" strokeWidth="2"/>
    <path d="M0,85 Q40,72 80,65 T160,45 T240,25" fill="none" stroke="rgba(255,180,0,0.65)" strokeWidth="1.5" strokeDasharray="5 3"/>
    <path d="M0,80 Q50,78 100,72 T200,55 T260,40" fill="none" stroke="rgba(180,100,255,0.55)" strokeWidth="1.2" strokeDasharray="3 3"/>
    <line x1="0" y1="68" x2="260" y2="68" stroke="rgba(255,100,100,0.35)" strokeWidth="1" strokeDasharray="6 4"/>
    <rect x="0" y="103" width="260" height="14" fill="rgba(0,0,0,0.18)"/>
    <path d="M0,112 Q32,105 65,108 T130,106 T195,110 T260,107" fill="none" stroke="rgba(100,255,218,0.45)" strokeWidth="1.2"/>
    {[[60,60],[120,40],[180,28],[240,15]].map(([x,y],i) => (
      <circle key={i} cx={x} cy={y} r="3" fill="#64ffda" opacity="0.9"/>
    ))}
  </svg>
);

const HistorySvg = () => (
  <svg viewBox="0 0 260 120" className="finance-svg" preserveAspectRatio="xMidYMid meet">
    {/* Parchment background lines */}
    {[18,28,38,48,58,68,78].map(y => (
      <line key={y} x1="8" y1={y} x2="88" y2={y} stroke="rgba(212,170,80,0.12)" strokeWidth="1"/>
    ))}
    {/* Greek columns – right */}
    {[155,182,209].map(x => (
      <g key={x}>
        <rect x={x-5} y="22" width="18" height="5" fill="rgba(212,170,80,0.55)" rx="1"/>
        <rect x={x}   y="27" width="8"  height="56" fill="rgba(212,170,80,0.35)" rx="1"/>
        {[2,4,6].map(dx => (
          <line key={dx} x1={x+dx} y1="27" x2={x+dx} y2="83" stroke="rgba(212,170,80,0.15)" strokeWidth="0.6"/>
        ))}
        <rect x={x-4} y="83" width="16" height="5" fill="rgba(212,170,80,0.55)" rx="1"/>
      </g>
    ))}
    {/* Entablature */}
    <rect x="148" y="17" width="80" height="6" fill="rgba(212,170,80,0.5)" rx="1"/>
    {/* Pediment */}
    <polygon points="148,17 228,17 188,4" fill="none" stroke="rgba(212,170,80,0.4)" strokeWidth="1"/>
    {/* Scales of Justice */}
    <line x1="72" y1="18" x2="72" y2="90" stroke="rgba(212,170,80,0.65)" strokeWidth="2"/>
    <line x1="42" y1="35" x2="102" y2="35" stroke="rgba(212,170,80,0.65)" strokeWidth="1.5"/>
    <polygon points="72,18 67,35 77,35" fill="rgba(212,170,80,0.5)"/>
    {/* Left pan */}
    <line x1="45" y1="35" x2="45" y2="54" stroke="rgba(212,170,80,0.45)" strokeWidth="0.8"/>
    <path d="M35,54 Q45,62 55,54" fill="none" stroke="rgba(212,170,80,0.6)" strokeWidth="1.2"/>
    {/* Right pan (lower) */}
    <line x1="99" y1="35" x2="99" y2="62" stroke="rgba(212,170,80,0.45)" strokeWidth="0.8"/>
    <path d="M89,62 Q99,70 109,62" fill="none" stroke="rgba(212,170,80,0.6)" strokeWidth="1.2"/>
    {/* Base */}
    <polygon points="65,88 79,88 72,72" fill="rgba(212,170,80,0.4)"/>
    {/* Open book – bottom left */}
    <path d="M8,92 Q25,84 42,92 L42,114 Q25,106 8,114 Z" fill="rgba(212,170,80,0.15)" stroke="rgba(212,170,80,0.45)" strokeWidth="0.8"/>
    <path d="M42,92 Q59,84 76,92 L76,114 Q59,106 42,114 Z" fill="rgba(212,170,80,0.12)" stroke="rgba(212,170,80,0.4)" strokeWidth="0.8"/>
    {[96,101,106,111].map(y => (
      <g key={y}>
        <line x1="13" y1={y} x2="36" y2={y-1} stroke="rgba(212,170,80,0.2)" strokeWidth="0.6"/>
        <line x1="47" y1={y} x2="70" y2={y-1} stroke="rgba(212,170,80,0.2)" strokeWidth="0.6"/>
      </g>
    ))}
  </svg>
);

const PoliticsSvg = () => (
  <svg viewBox="0 0 260 120" className="finance-svg" preserveAspectRatio="xMidYMid meet">
    <defs>
      <radialGradient id="globeGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(60,120,255,0.18)"/>
        <stop offset="100%" stopColor="rgba(60,120,255,0)"/>
      </radialGradient>
    </defs>
    {/* Globe glow */}
    <ellipse cx="100" cy="60" rx="52" ry="52" fill="url(#globeGlow)"/>
    {/* Globe outline */}
    <circle cx="100" cy="60" r="46" fill="none" stroke="rgba(100,150,255,0.55)" strokeWidth="1.5"/>
    {/* Latitude lines */}
    {[-30,-15,0,15,30].map((dy,i) => {
      const rx = Math.sqrt(Math.max(0, 46*46 - dy*dy));
      const ry = Math.max(2, rx * 0.22);
      return <ellipse key={i} cx="100" cy={60+dy} rx={rx} ry={ry} fill="none" stroke="rgba(100,150,255,0.18)" strokeWidth="0.8"/>;
    })}
    {/* Longitude lines */}
    {[0,30,60,90,120,150].map((angle,i) => (
      <ellipse key={i} cx="100" cy="60" rx={Math.abs(Math.cos(angle*Math.PI/180))*46||2} ry="46"
        fill="none" stroke="rgba(100,150,255,0.14)" strokeWidth="0.8"
        transform={`rotate(${angle} 100 60)`}/>
    ))}
    {/* Continent blobs */}
    <path d="M75,38 Q82,30 92,33 T105,28 T112,35 T108,45 T95,48 T80,44 Z" fill="rgba(100,150,255,0.3)" stroke="rgba(100,150,255,0.5)" strokeWidth="0.6"/>
    <path d="M88,52 Q94,48 100,50 T108,56 T104,64 T95,66 T87,60 Z" fill="rgba(100,150,255,0.25)" stroke="rgba(100,150,255,0.4)" strokeWidth="0.6"/>
    <path d="M62,55 Q68,50 74,54 T76,63 T68,68 T61,63 Z" fill="rgba(100,150,255,0.2)" stroke="rgba(100,150,255,0.35)" strokeWidth="0.6"/>
    <path d="M104,68 Q112,64 118,68 T118,76 T110,79 T103,74 Z" fill="rgba(100,150,255,0.2)" stroke="rgba(100,150,255,0.35)" strokeWidth="0.6"/>
    {/* Connection lines from globe to right */}
    <line x1="146" y1="40" x2="175" y2="32" stroke="rgba(100,150,255,0.3)" strokeWidth="0.8" strokeDasharray="3 2"/>
    <line x1="146" y1="60" x2="175" y2="60" stroke="rgba(100,150,255,0.3)" strokeWidth="0.8" strokeDasharray="3 2"/>
    <line x1="146" y1="80" x2="175" y2="88" stroke="rgba(100,150,255,0.3)" strokeWidth="0.8" strokeDasharray="3 2"/>
    {/* Nodes */}
    {[[175,32],[175,60],[175,88],[210,22],[210,50],[210,78],[210,98]].map(([x,y],i)=>(
      <circle key={i} cx={x} cy={y} r="4" fill="rgba(100,150,255,0.5)" stroke="rgba(100,150,255,0.8)" strokeWidth="0.8"/>
    ))}
    {/* Connect nodes */}
    <polyline points="175,32 210,22" stroke="rgba(100,150,255,0.3)" strokeWidth="0.7"/>
    <polyline points="175,60 210,50 210,78" stroke="rgba(100,150,255,0.3)" strokeWidth="0.7"/>
    <polyline points="175,88 210,98" stroke="rgba(100,150,255,0.3)" strokeWidth="0.7"/>
    {/* Vote bars bottom right */}
    {[[220,70,30,'rgba(100,150,255,0.5)'],[232,55,45,'rgba(60,200,120,0.5)'],[244,80,20,'rgba(255,100,100,0.4)']].map(([x,y,h,c],i)=>(
      <rect key={i} x={x} y={y} width="8" height={h} fill={c} rx="2"/>
    ))}
    {/* Star accent */}
    <polygon points="100,14 102,19 107,19 103,22 105,27 100,24 95,27 97,22 93,19 98,19"
      fill="rgba(255,220,80,0.6)" stroke="rgba(255,220,80,0.3)" strokeWidth="0.5"/>
  </svg>
);

/* ── Data ── */

const allCards = [
  {
    type: 'svg', SvgComp: CandlestickSvg,
    gradient: 'linear-gradient(135deg,#051a10 0%,#0a2e1a 50%,#0a192f 100%)',
    glowColor: 'rgba(100,255,218,0.14)', badge: '📈 Markets',
    title: 'Stock Trader',
    desc: 'An active stock trader analyzing market trends, price action, and candlestick patterns to execute high-probability trades and grow capital.',
  },
  {
    type: 'svg', SvgComp: AnalystSvg,
    gradient: 'linear-gradient(135deg,#0a0a2e 0%,#111240 50%,#0a192f 100%)',
    glowColor: 'rgba(130,100,255,0.14)', badge: '📊 Analysis',
    title: 'Technical Analyst',
    desc: 'Studying chart patterns, support/resistance, moving averages, and RSI to predict price movements and identify high-value entry & exit points.',
  },
  { type: 'photo', img: '/images/profile-6.jpg', emoji: '🏍️', title: 'Riding',        desc: "A licensed rider who loves the freedom of the open road on two wheels." },
  { type: 'photo', img: '/images/profile-3.jpg', emoji: '🎵', title: 'Music',         desc: 'Singing and playing musical instruments — music feeds the soul.' },
  { type: 'photo', img: '/images/profile-4.jpg', emoji: '💪', title: 'Body Building', desc: 'An intermediate bodybuilder who hits the gym every day. Discipline is key.' },
  { type: 'photo', img: '/images/profile-5.jpg', emoji: '🎤', title: 'Beatbox',       desc: 'An intermediate beatboxer with 40+ sounds. The human voice is an instrument.' },
  {
    type: 'svg', SvgComp: HistorySvg,
    gradient: 'linear-gradient(135deg,#1a0e00 0%,#2a1a00 45%,#0a192f 100%)',
    glowColor: 'rgba(212,170,80,0.14)', badge: '📜 History & Law',
    title: 'History & Law',
    desc: 'Fascinated by ancient civilisations, constitutional law, and how legal frameworks shape modern societies.',
  },
  {
    type: 'svg', SvgComp: PoliticsSvg,
    gradient: 'linear-gradient(135deg,#050e2a 0%,#0c1a40 45%,#0a192f 100%)',
    glowColor: 'rgba(100,130,255,0.14)', badge: '🌏 Politics',
    title: 'Politics',
    desc: 'Keenly interested in national and international politics, geopolitics, and current global affairs.',
  },
  { type: 'photo', img: '/images/profile-8.jpg', emoji: '✈️', title: 'Travel', desc: 'Love exploring new places, cultures, and perspectives around the world.' },
];

/* ── Component ── */

const Interests = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="interests" ref={ref} className="interests-section">
      <div className="container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="num">04.</span>
          <h2>Beyond Code</h2>
        </motion.div>

        <motion.p
          className="interests-intro"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          I believe a developer&apos;s best ideas come from a life lived fully. Here&apos;s
          what keeps me inspired outside the terminal:
        </motion.p>

        <div className="hobbies-grid">
          {allCards.map((card, i) => (
            <motion.div
              key={card.title}
              className={`hobby-card${card.type === 'svg' ? ' finance-card' : ''}`}
              style={card.type === 'svg' ? { '--glow': card.glowColor } : {}}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 + 0.2 }}
              whileHover={{ y: -8 }}
            >
              {card.type === 'svg' ? (
                <div className="finance-img-wrap" style={{ background: card.gradient }}>
                  <card.SvgComp />
                  <span className="finance-badge">{card.badge}</span>
                </div>
              ) : (
                <div className="hobby-img-wrap">
                  <img src={card.img} alt={card.title} loading="lazy" />
                  <div className="hobby-overlay">
                    <span className="hobby-emoji">{card.emoji}</span>
                  </div>
                </div>
              )}
              <div className="hobby-body">
                <h3 className="hobby-title">{card.title}</h3>
                <p className="hobby-desc">{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Interests;
