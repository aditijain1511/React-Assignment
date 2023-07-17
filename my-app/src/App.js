import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./MyComponents/loginPage.tsx";
import SearchTable from "./MyComponents/searchTable.tsx";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (email, password) => {
    if (email.trim() !== "" && password.trim() !== "") {
      setIsLoggedIn(true);
      console.log("Login successful!");
    } else {
      console.log("Login failed! email and password cannot be empty.");
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/searchTable" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/searchTable"
          element={isLoggedIn ? <SearchTable /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
