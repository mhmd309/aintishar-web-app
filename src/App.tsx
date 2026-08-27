import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import Projects from './components/Projects';
import AboutUs from './components/AboutUs';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSlider />
        <AboutUs />
        <Team />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
