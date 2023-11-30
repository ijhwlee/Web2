import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import logo from "./img/logo.png";
import logoReact from './logo.svg';
import "./App.css";

import Vacations from './Vacations'

function Home() {
  return (
    <div>
      <h2>Welcome to Meadowlark Travel</h2>
      <ul>
        <li>Check out our "<Link to="/about">About</Link>" page!</li>
        <li>And our <Link to="/vacations">vacations</Link>!</li>
      </ul>
    </div>
  )
}

function About() {
  return (<i>Meadowlark에 대한 설명</i>)
}

function NotFound() {
  return (<i>Not Found</i>)
}

function HelloMessage() {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setData(data.message + " by hwlee"));
  }, []);

  return (
    <>
      <div className="App">
        <img src={logoReact} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
      </div>
    </>
  );
}

function App() {

  return (
    <Router>
      <div className="container">
        <header>
          <h1>Meadowlark Travel</h1>
          <Link to="/"><img src={logo} alt="Meadowlark Travel Logo" /></Link>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hello" element={<HelloMessage />} />
          <Route path="/about" element={<About />} />
          <Route path="/vacations" element={<Vacations />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;