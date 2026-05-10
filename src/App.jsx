import { useState, useCallback } from 'react';
import './App.css';
import Intro          from './components/Intro/Intro';
import Cursor         from './components/Cursor/Cursor';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import Navbar         from './components/Navbar/Navbar';
import Hero           from './components/Hero/Hero';
import About          from './components/About/About';
import Skills         from './components/Skills/Skills';
import Services       from './components/Services/Services';
import Interests      from './components/Interests/Interests';
import Contact        from './components/Contact/Contact';
import Footer         from './components/Footer/Footer';
import ScrollTop      from './components/ScrollTop/ScrollTop';
import MessagesViewer from './components/MessagesViewer/MessagesViewer';

function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const onIntroComplete = useCallback(() => setIntroComplete(true), []);

  return (
    <>
      <Cursor />
      <Intro onComplete={onIntroComplete} />

      {introComplete && (
        <>
          <ScrollProgress />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Services />
            <Interests />
            <Contact />
          </main>
          <Footer />
          <ScrollTop />
          <MessagesViewer />
        </>
      )}
    </>
  );
}

export default App;
