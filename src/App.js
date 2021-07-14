import { Redirect, Route, Switch } from 'react-router-dom'
import Dashboard from './components/dashboard';
import Footer from './components/Footer';
import Header from './components/Navbar';

function App() {
  return (
    <>
      <Header/>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route
            exact
            path="/"
            render={() => <Redirect to="/dashboard" />}
          />
        </Switch>
      <Footer/>
    </>
  );
}

export default App;
