import './App.css';
import About from './components/About/About';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <About />
      </div>
      <Footer />
    </div>
  );
}

export default App;
