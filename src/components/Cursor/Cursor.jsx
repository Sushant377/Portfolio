import { useEffect, useRef } from 'react';
import './Cursor.css';

const Cursor = () => {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100, mouseY = -100;
    let ringX  = -100, ringY  = -100;
    let raf;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
      raf = requestAnimationFrame(animate);
    };

    const onOver = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea')) {
        dot.classList.add('hovering');
        ring.classList.add('hovering');
      }
    };

    const onOut = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea')) {
        dot.classList.remove('hovering');
        ring.classList.remove('hovering');
      }
    };

    const onDown = () => { dot.classList.add('clicking'); ring.classList.add('clicking'); };
    const onUp   = () => { dot.classList.remove('clicking'); ring.classList.remove('clicking'); };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout',  onOut);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup',   onUp);
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout',  onOut);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup',   onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
};

export default Cursor;
