import './App.css';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Movies from './components/Movies';
import Favourites from './components/Favourites';
import {BrowserRouter as Router, Switch, Route, BrowserRouter} from 'react-router-dom';
import './App.css';

function App() {
  return (
      <Router>
        <Navbar />
        <Switch>
        {/* <Banner /> */}
        <Route path='/' exact render={(props)=>(
          <>
            <Banner {...props}/>
            <Movies {...props}/>
          </>
        )}/>
        <Route path='/Favourites' component={Favourites} />
        </Switch>
      </Router>
  );
}

export default App;
