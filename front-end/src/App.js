import data from './data';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';

function App() {
  return (
    <BrowserRouter>
    <div className="grid-container">
  <header className="header">
  <div className="brand">
    <button>&#9776;</button>
    <Link to="/">foodZone</Link>
  </div>
  <div className="header-links">
    <a href="cart.html">Cart</a>
    <a href="signin">Sign In</a>
  </div>
  </header>
  <main className="main">
  <div className="content">
  <Route path="/product/:id" component={ProductScreen} />
  <Route path="/" component={HomeScreen} exact={true} />
  </div>
  </main>
  <footer className="footer">All right reserved</footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
