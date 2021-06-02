import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import About from './components/About/About';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HowTo from './components/HowTo/HowTo';
import Login from './components/Login/Login';
import ProblemSets from './components/ProblemSets/ProblemSets';
import UploadSolutions from './components/UploadSolutions/UploadSolutions';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="main-content">
          <Switch>
            <Route exact path={"/login"} component={Login} />
            <Route exact path={"/"} component={About} />
            <Route exact path={"/ProblemSets"} component={ProblemSets} />
            <Route exact path={"/HowTo"} component={HowTo} />
            <Route path={"/UploadSolutions"} component={UploadSolutions} />
          </Switch>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;
