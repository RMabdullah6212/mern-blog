import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Header from "./Components/Header";
import Footer from "./Components/foooter";
import PrivateRoute from "./Components/privateroute";
import OnlyAdminPrivateRoute from "./Components/onlyAdminPriveteRoute";
import CreatePost from "./pages/CreatePost";
function App() {
  return (
    <Router>
      < Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
        </Route>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <Footer />
    </Router>
  );
}


export default App;
