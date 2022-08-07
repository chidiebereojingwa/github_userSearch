import './App.css';
import React, { FormEvent, useState } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { IGitHubUser } from "./interfaces/IGitHubUser";
import axios from 'axios';

function App() {
  const [userSearch, setUserSearch] = useState<string>('');
  const [foundUser, setFoundUser] = useState<IGitHubUser>();

 const handleSearchRequest = async () => {
   try {
     const response = await axios.get<IGitHubUser>(
       `https://api.github.com/users/${userSearch}`
     );
     setFoundUser(response.data);
   } catch (error) {
     console.log(error);
   }
 };

 const searchForUser = (event: FormEvent<HTMLFormElement>) => {
   event.preventDefault();
   handleSearchRequest();
 };
 
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
              <h2>Search for a user</h2>
              <form className="search-user" onSubmit={searchForUser}>
                <input
                  value={userSearch}
                  onChange={(event) => setUserSearch(event.target.value)}
                  placeholder="Enter a username..."
                />
                <button>Search</button>
              </form>
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
