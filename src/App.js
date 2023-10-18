import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import Nav from "./nav/Nav";
import Routes from "./routes/Routes";
import Loading from "./common/Loading";
import Api from "./api/api";
import UserContext from "./auth/UserContext";
import jwt from "jsonwebtoken";
import './App.css';

export const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          Api.token = token;
          let currentUser = await Api.getCurrentUser(username);

          setCurrentUser(currentUser);
          setApplicationIds(new Set(currentUser.applications));
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setIsLoading(true);
    }

    setIsLoading(false);
    getCurrentUser();
  }, [token]);

  const signup = async (signupData) => {
    try {
      let token = await Api.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  const login = async (loginData) => {
    try {
      let token = await Api.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  }

  const hasAppliedToJob = (id) => {
    return applicationIds.has(id);
  }

  const applyToJob = (id) => {
    if (hasAppliedToJob(id)) return;
    Api.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  if(!isLoading) return <Loading />;

  return (
    <BrowserRouter>
        <UserContext.Provider
            value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}>
          <div className="App">
            <Nav logout={logout} />
            <Routes login={login} signup={signup} />
          </div>
        </UserContext.Provider>
      </BrowserRouter>
  );
}

export default App;
