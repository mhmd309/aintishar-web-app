import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import Projects from './components/Projects';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingViewCounter from './components/FloatingViewCounter';

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSlider />
        <AboutUs />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <FloatingViewCounter />
    </div>
  );
}

export default App;
