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
import RepositoriesList from './components/RepositoriesList';

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

              {foundUser && (
                <div>
                  <h3>{foundUser.login}</h3>
                  <div className="user-details">
                    <div>
                      <p>
                        <strong>Name: </strong>
                        {foundUser.name}
                      </p>
                      <p>
                        <strong>Company: </strong>
                        {foundUser.company}
                      </p>
                      <p>
                        <strong>Location: </strong>
                        {foundUser.location}
                      </p>
                      <p>
                        <strong>Followers: </strong>
                        {foundUser.followers}
                      </p>
                    </div>
                    <img src={foundUser.avatar_url} alt={foundUser.name} />
                  </div>
                </div>
              )}
            </Route>
            <Route path="/repositories">
              <h2>Repositories</h2>
              {foundUser ? (
                <RepositoriesList
                  repositoriesUrl={foundUser.repos_url}
                ></RepositoriesList>
              ) : (
                <Redirect to="/"></Redirect>
              )}
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
