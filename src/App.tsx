import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import Projects from './components/Projects';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSlider />
        <Projects />
        <AboutUs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
