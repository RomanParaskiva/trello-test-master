import React from 'react';
import {useRoutes} from "./routes";
import {BrowserRouter as Router} from "react-router-dom";
import {AuthContext} from "./context/AuthContext";
import {useAuth} from "./hooks/auth.hook";
import 'materialize-css';
import './App.css';


function App() {
  const routes = useRoutes()
  const { login, logout, username, token} = useAuth();
  const  isAuthenticated = !!token;
  return (
      <AuthContext.Provider value={{
        login, logout, token, username, isAuthenticated }}>
        <Router>
          <div className="App">
            {routes}
          </div>
        </Router>
      </AuthContext.Provider>

  );
}

export default App;
