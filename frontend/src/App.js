import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './App.css';
import About from './components/About/About';
import Admin from './components/Admin/Admin';
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
            {/* <Route path={"/Admin"} component={AdminView} /> */}
            <Route path={"/Admin"} component={Admin} />
          </Switch>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;
