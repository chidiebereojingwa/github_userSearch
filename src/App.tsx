import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

function App() {
 
  return (
    <div className="App">
      <h1>GitHub Viewer</h1>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/repositories">Repositories</Link>
            </li>
            <li>
              <Link to="/followers">Followers</Link>
            </li>
            <li>
              <Link to="/gists">Gist</Link>
            </li>
          </ul>
        </nav>
        <main>
          <switch>
            <Route exact path="/">
              <h1>Home</h1>
            </Route>
            <Route path="/repositories">
              <h1>Repositories</h1>
            </Route>
            <Route path="/followers">
              <h1>Followers</h1>
            </Route>
            <Route path="/gists">
              <h1>Gist</h1>
            </Route>
          </switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
